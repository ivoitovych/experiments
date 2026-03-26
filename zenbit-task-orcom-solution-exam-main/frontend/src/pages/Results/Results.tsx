/**
 * Results Page — displays de-identification output with 7 interactive features:
 *
 * 1. **Entity Toggle** — filter chips per entity type (PERSON, US_SSN, …) to show/hide
 *    highlights and dim corresponding table rows.
 * 2. **Sync Scroll** — left (original) and right (anonymized) panels scroll in lockstep
 *    using a shared `isSyncing` guard to prevent infinite recursion.
 * 3. **Copy Cell** — hover any highlighted entity to reveal a copy-to-clipboard icon;
 *    success feedback via MUI Snackbar.
 * 4. **Export PDF** — generates a jsPDF document with anonymized text; non-Latin-1
 *    characters are sanitized to avoid Helvetica encoding issues.
 * 5. **Compliance Audit Trail** — expandable accordion showing framework, method,
 *    entity breakdown, strategy used, processing time, and a separate compliance PDF.
 * 6. **Re-run with Tweaks** — "Adjust Settings" navigates back to the de-identify wizard
 *    at step 3, pre-filling the current jobId.
 * 7. **Navigation** — "New Analysis", "Generate Synthetic Data", and "Go to Dashboard"
 *    buttons; dashboard button resets Redux workflow state to prevent stale data.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  Add as AddIcon,
  ContentCopy as CopyIcon,
  Dashboard as DashboardIcon,
  Download as DownloadIcon,
  ExpandMore as ExpandMoreIcon,
  PictureAsPdf as PdfIcon,
  Science as ScienceIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { jsPDF } from 'jspdf';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { fetchJob } from '@/store/slices/jobsSlice';
import { fetchDocumentById, resetWorkflow, clearCurrentDocument } from '@/store/slices/deIdentificationSlice';
import { ROUTES } from '@/constants';
import { downloadAsFile, entityColor, formatScore } from '@/utils';
import type { PresidioEntity } from '@/types';

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Build highlighted React nodes from plain text + Presidio entities.
 *
 * Only entities whose `entity_type` is in `activeTypes` are rendered as coloured
 * `<span>` elements wrapped in a MUI `<Tooltip>` with a copy button. Overlapping
 * entities are skipped (first-wins after sorting by `start`).
 *
 * @param text         - The original (or anonymized) plain text.
 * @param entities     - Array of Presidio entity detections with start/end offsets.
 * @param activeTypes  - Set of entity types currently toggled ON by the user.
 * @param onCopy       - Callback invoked with the entity text when the user clicks
 *                       the copy icon inside the tooltip.
 * @returns An array of React nodes ready to be rendered inside a `<pre>` block.
 */
function buildHighlightedText(
  text: string,
  entities: PresidioEntity[],
  activeTypes: Set<string>,
  onCopy: (value: string) => void,
) {
  // Sort entities by start position, then merge overlapping
  const sorted = [...entities]
    .filter((e) => activeTypes.has(e.entity_type))
    .sort((a, b) => a.start - b.start);

  const nodes: React.ReactNode[] = [];
  let cursor = 0;

  for (const entity of sorted) {
    if (entity.start < cursor) continue; // skip overlapping
    if (entity.start > cursor) {
      nodes.push(<span key={`t-${cursor}`}>{text.slice(cursor, entity.start)}</span>);
    }
    const color = entityColor(entity.entity_type);
    const spanText = text.slice(entity.start, entity.end);
    nodes.push(
      <Tooltip
        key={`e-${entity.start}-${entity.end}`}
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant="caption">{entity.entity_type}</Typography>
            <IconButton
              size="small"
              sx={{ color: 'inherit', p: 0.25 }}
              onClick={(e) => {
                e.stopPropagation();
                onCopy(spanText);
              }}
            >
              <CopyIcon sx={{ fontSize: 14 }} />
            </IconButton>
          </Box>
        }
        arrow
      >
        <span
          style={{
            backgroundColor: `${color}22`,
            color,
            borderRadius: 3,
            padding: '0 2px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {spanText}
        </span>
      </Tooltip>,
    );
    cursor = entity.end;
  }
  if (cursor < text.length) {
    nodes.push(<span key={`t-${cursor}`}>{text.slice(cursor)}</span>);
  }
  return nodes;
}

/**
 * Sanitize text for jsPDF's default Helvetica font.
 *
 * jsPDF's built-in fonts only support the Latin-1 range (U+0000–U+00FF).
 * Any character outside that range (e.g. Cyrillic, CJK) is replaced with `?`
 * to prevent garbled output in the generated PDF.
 */
function sanitizeForPdf(text: string): string {
  return text.replace(/[^\u0000-\u00FF]/g, '?');
}

/**
 * Count detected entities grouped by type.
 *
 * @returns A Map where keys are entity type strings (e.g. "PERSON") and values
 *          are occurrence counts. Used for chip labels and audit trail breakdown.
 */
function entityCounts(entities: PresidioEntity[]): Map<string, number> {
  const map = new Map<string, number>();
  for (const e of entities) {
    map.set(e.entity_type, (map.get(e.entity_type) ?? 0) + 1);
  }
  return map;
}

export default function Results() {
  const { t } = useTranslation();
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Local loading flag — prevents stale document from previous job flashing in
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Entity toggle state
  const [activeEntityTypes, setActiveEntityTypes] = useState<Set<string>>(new Set());
  // Snackbar for copy feedback
  const [snackOpen, setSnackOpen] = useState(false);

  // Refs for sync scroll
  const leftPanelRef = useRef<HTMLPreElement>(null);
  const rightPanelRef = useRef<HTMLPreElement>(null);
  const isSyncing = useRef(false);

  const currentJob = useAppSelector((s) => s.jobs.currentJob);
  const currentDocument = useAppSelector((s) => s.deIdentification.currentDocument);

  useEffect(() => {
    if (!jobId) return;
    // Clear stale document from a previous job immediately
    dispatch(clearCurrentDocument());
    setIsLoading(true);
    setLoadError(null);

    dispatch(fetchJob(jobId)).then((jobResult) => {
      if (!fetchJob.fulfilled.match(jobResult)) {
        setLoadError('Failed to load job');
        setIsLoading(false);
        return;
      }
      const job = jobResult.payload;
      if (!job.documentId) {
        setLoadError('Job has no associated document');
        setIsLoading(false);
        return;
      }
      dispatch(fetchDocumentById(job.documentId)).then((docResult) => {
        if (!fetchDocumentById.fulfilled.match(docResult)) {
          setLoadError('Failed to load document');
        }
        setIsLoading(false);
      });
    });
  }, [jobId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Initialize active entity types when document loads
  const analysisResult = currentDocument?.analysisResult ?? [];
  const counts = useMemo(() => entityCounts(analysisResult), [analysisResult]);
  useEffect(() => {
    if (analysisResult.length > 0) {
      setActiveEntityTypes(new Set(counts.keys()));
    }
  }, [counts]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Sync Scroll handler ─────────────────────────────────────────────────
  // When one panel scrolls, the other mirrors its scrollTop.
  // `isSyncing` guard prevents the mirrored assignment from re-triggering
  // the handler on the target panel (which would cause infinite recursion).
  // The flag is cleared on the next animation frame to allow natural user scrolling.
  const handleScroll = useCallback((source: 'left' | 'right') => {
    if (isSyncing.current) return;
    isSyncing.current = true;
    const src = source === 'left' ? leftPanelRef.current : rightPanelRef.current;
    const tgt = source === 'left' ? rightPanelRef.current : leftPanelRef.current;
    if (src && tgt) {
      tgt.scrollTop = src.scrollTop;
    }
    requestAnimationFrame(() => {
      isSyncing.current = false;
    });
  }, []);

  // ── Copy to clipboard ──────────────────────────────────────────────────
  const handleCopy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback for insecure contexts – not expected in production
    }
    setSnackOpen(true);
  }, []);

  // ── Entity toggle ─────────────────────────────────────────────────────
  // Toggles the given entity type in the activeEntityTypes Set.
  // When a type is removed, buildHighlightedText skips its spans and the
  // entity table rows receive reduced opacity (0.35) via inline style.
  const toggleEntityType = useCallback((type: string) => {
    setActiveEntityTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) {
        next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
  }, []);

  const handleNewAnalysis = () => {
    dispatch(resetWorkflow());
    navigate(ROUTES.DE_IDENTIFY);
  };

  const handleDownload = () => {
    if (!currentDocument) return;
    const content = JSON.stringify(
      {
        original: currentDocument.originalText,
        anonymized: currentDocument.anonymizedText,
        entities: currentDocument.analysisResult ?? [],
        framework: currentDocument.framework,
        processingTimeMs: currentDocument.processingTimeMs,
      },
      null,
      2,
    );
    downloadAsFile(content, 'de-identified-result.json', 'application/json');
  };

  // ── Export PDF ─────────────────────────────────────────────────────────
  // Generates a single-page (auto-paginates if text overflows) PDF containing
  // report metadata + the full anonymized text. Uses sanitizeForPdf() to avoid
  // encoding issues with the built-in Helvetica font.
  const handleExportPdf = useCallback(() => {
    if (!currentDocument) return;
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 14;
    const maxWidth = pageWidth - margin * 2;
    let y = 20;

    doc.setFontSize(18);
    doc.text('De-Identification Report', margin, y);
    y += 12;

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Date: ${new Date().toISOString()}`, margin, y);
    y += 6;
    if (currentDocument.framework) {
      doc.text(`Framework: ${currentDocument.framework.toUpperCase()}`, margin, y);
      y += 6;
    }
    doc.text(`Entities detected: ${currentDocument.entityCount}`, margin, y);
    y += 10;

    doc.setTextColor(0);
    doc.setFontSize(12);
    doc.text('Anonymized Text', margin, y);
    y += 8;

    doc.setFontSize(9);
    const anonText = sanitizeForPdf(currentDocument.anonymizedText ?? '');
    const lines = doc.splitTextToSize(anonText, maxWidth);
    for (const line of lines) {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, margin, y);
      y += 5;
    }

    doc.save('de-identified-report.pdf');
  }, [currentDocument]);

  // ── Download Compliance Report PDF ─────────────────────────────────────
  // Separate compliance-oriented PDF with framework, method, entity breakdown,
  // the anonymization strategy (from the job's wizard state), and a timestamp.
  const handleComplianceReportPdf = useCallback(() => {
    if (!currentDocument) return;
    const doc = new jsPDF();
    const margin = 14;
    let y = 20;

    doc.setFontSize(18);
    doc.text(sanitizeForPdf(t('results.reportTitle')), margin, y);
    y += 14;

    const pTimeSec = currentDocument.processingTimeMs
      ? (currentDocument.processingTimeMs / 1000).toFixed(1)
      : 'N/A';

    // Strategy from job wizard state (if available)
    const strategy = currentJob?.wizardState?.strategy ?? 'replace';

    const rows = [
      [t('results.framework'), (currentDocument.framework ?? 'N/A').toUpperCase()],
      [t('results.method'), 'Automated de-identification via Microsoft Presidio'],
      [t('results.entitiesDetected'), String(currentDocument.entityCount)],
      [t('results.strategiesApplied'), `${strategy.charAt(0).toUpperCase() + strategy.slice(1)}: ${currentDocument.entityCount}`],
      [t('results.processingTime'), `${pTimeSec}s`],
      [t('results.timestamp'), currentDocument.createdAt ?? new Date().toISOString()],
    ];

    doc.setFontSize(10);
    for (const [label, value] of rows) {
      doc.setFont('helvetica', 'bold');
      doc.text(sanitizeForPdf(`${label}:`), margin, y);
      doc.setFont('helvetica', 'normal');
      doc.text(sanitizeForPdf(value), margin + 60, y);
      y += 7;
    }

    y += 6;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Entity Breakdown', margin, y);
    y += 7;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    for (const [type, count] of counts) {
      doc.text(`${type}: ${count}`, margin + 4, y);
      y += 5;
    }

    doc.save('compliance-report.pdf');
  }, [currentDocument, currentJob, counts, t]);

  // ── Adjust Settings (Re-run with tweaks) ───────────────────────────────
  // Navigates back to the de-identify wizard at step 3 (Configuration),
  // pre-filling the current jobId so the wizard can re-load the job's settings.
  const handleAdjustSettings = useCallback(() => {
    if (!jobId) return;
    navigate(`${ROUTES.DE_IDENTIFY}?jobId=${jobId}&step=3`);
  }, [jobId, navigate]);

  // ── Loading ─────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>{t('deIdentify.resultsPage.loading')}</Typography>
      </Box>
    );
  }

  // ── Error ───────────────────────────────────────────────────────────────
  if (loadError || !currentDocument) {
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 8 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {loadError ?? 'Failed to load results'}
        </Alert>
        <Button
          variant="outlined"
          startIcon={<DashboardIcon />}
          onClick={() => navigate(ROUTES.DASHBOARD)}
        >
          {t('deIdentify.resultsPage.goToDashboard')}
        </Button>
      </Box>
    );
  }

  const originalText = currentDocument.originalText;
  const anonymizedText = currentDocument.anonymizedText ?? '';
  const processingTimeSec = currentDocument.processingTimeMs
    ? (currentDocument.processingTimeMs / 1000).toFixed(1)
    : null;

  // ── Results UI ──────────────────────────────────────────────────────────
  return (
    <Box>
      {/* Header row */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight={700}>
            {t('results.title')}
          </Typography>
          {currentDocument.processingTimeMs !== null && (
            <Typography variant="caption" color="text.secondary">
              {t('deIdentify.results.stats.entitiesFound', { count: currentDocument.entityCount })}
              {' · '}
              {t('deIdentify.results.stats.processingTime', { time: currentDocument.processingTimeMs })}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Button variant="outlined" size="small" startIcon={<DownloadIcon />} onClick={handleDownload}>
            {t('deIdentify.results.download')}
          </Button>
          <Button variant="outlined" size="small" startIcon={<PdfIcon />} onClick={handleExportPdf}>
            {t('results.downloadPdf')}
          </Button>
          <Button variant="outlined" size="small" startIcon={<SettingsIcon />} onClick={handleAdjustSettings}>
            {t('results.adjustSettings')}
          </Button>
        </Box>
      </Box>

      {/* ── Entity Toggle Chips ─────────────────────────────────────────── */}
      {counts.size > 0 && (
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ py: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              {t('results.entityToggle')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {[...counts.entries()].map(([type, count]) => {
                const active = activeEntityTypes.has(type);
                const color = entityColor(type);
                return (
                  <Chip
                    key={type}
                    label={`${type} (${count})`}
                    size="small"
                    onClick={() => toggleEntityType(type)}
                    sx={{
                      bgcolor: active ? `${color}22` : 'transparent',
                      color: active ? color : 'text.disabled',
                      border: `1px solid ${active ? color : 'transparent'}`,
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      textDecoration: active ? 'none' : 'line-through',
                    }}
                  />
                );
              })}
            </Box>
          </CardContent>
        </Card>
      )}

      {/* ── Side-by-side text with sync scroll & highlighted entities ──── */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                {t('deIdentify.results.original')}
              </Typography>
              <Box
                ref={leftPanelRef}
                component="pre"
                onScroll={() => handleScroll('left')}
                sx={{
                  p: 2,
                  bgcolor: 'background.default',
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 2,
                  fontFamily: 'monospace',
                  fontSize: '0.82rem',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all',
                  minHeight: 160,
                  maxHeight: 400,
                  overflow: 'auto',
                }}
              >
                {buildHighlightedText(originalText, analysisResult, activeEntityTypes, handleCopy)}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                {t('deIdentify.results.anonymized')}
              </Typography>
              <Box
                ref={rightPanelRef}
                component="pre"
                onScroll={() => handleScroll('right')}
                sx={{
                  p: 2,
                  bgcolor: '#F0FFF4',
                  border: 1,
                  borderColor: 'success.light',
                  borderRadius: 2,
                  fontFamily: 'monospace',
                  fontSize: '0.82rem',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all',
                  minHeight: 160,
                  maxHeight: 400,
                  overflow: 'auto',
                  color: 'success.dark',
                }}
              >
                {anonymizedText}
              </Box>
            </Grid>
          </Grid>

          {/* Entities table */}
          {analysisResult.length > 0 && (
            <>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                {t('deIdentify.results.entities')}
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>{t('deIdentify.results.entityColumns.type')}</TableCell>
                      <TableCell>{t('deIdentify.results.entityColumns.text')}</TableCell>
                      <TableCell align="right">{t('deIdentify.results.entityColumns.confidence')}</TableCell>
                      <TableCell align="right">{t('deIdentify.results.entityColumns.position')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {analysisResult.map((entity, i) => (
                      <TableRow
                        key={i}
                        sx={{
                          opacity: activeEntityTypes.has(entity.entity_type) ? 1 : 0.35,
                        }}
                      >
                        <TableCell>
                          <Chip
                            label={entity.entity_type}
                            size="small"
                            sx={{
                              bgcolor: `${entityColor(entity.entity_type)}22`,
                              color: entityColor(entity.entity_type),
                              fontWeight: 600,
                              fontSize: '0.7rem',
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                          {originalText.slice(entity.start, entity.end)}
                        </TableCell>
                        <TableCell align="right">{formatScore(entity.score)}</TableCell>
                        <TableCell align="right" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                          {entity.start}–{entity.end}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </CardContent>
      </Card>

      {/* ── Compliance Audit Trail ─────────────────────────────────────── */}
      <Accordion sx={{ mb: 3 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" fontWeight={600}>
            {t('results.auditTrail')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">{t('results.framework')}</Typography>
              <Typography variant="body1" fontWeight={500}>
                {(currentDocument.framework ?? 'N/A').toUpperCase()}
                {currentDocument.framework === 'hipaa' && ' (Safe Harbor)'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">{t('results.method')}</Typography>
              <Typography variant="body1" fontWeight={500}>
                {t('results.methodValue')}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">{t('results.entitiesDetected')}</Typography>
              <Typography variant="body1" fontWeight={500}>
                {currentDocument.entityCount}
                {counts.size > 0 && (
                  <Typography component="span" variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                    ({[...counts.entries()].map(([type, c]) => `${type}: ${c}`).join(', ')})
                  </Typography>
                )}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">{t('results.processingTime')}</Typography>
              <Typography variant="body1" fontWeight={500}>
                {processingTimeSec ? t('results.seconds', { time: processingTimeSec }) : 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">{t('results.strategiesApplied')}</Typography>
              <Typography variant="body1" fontWeight={500}>
                {(currentJob?.wizardState?.strategy ?? 'replace').charAt(0).toUpperCase() + (currentJob?.wizardState?.strategy ?? 'replace').slice(1)}: {currentDocument.entityCount}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">{t('results.timestamp')}</Typography>
              <Typography variant="body1" fontWeight={500}>
                {currentDocument.createdAt ?? new Date().toISOString()}
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Button
            variant="outlined"
            startIcon={<PdfIcon />}
            onClick={handleComplianceReportPdf}
          >
            {t('results.downloadReport')}
          </Button>
        </AccordionDetails>
      </Accordion>

      {/* ── Navigation Buttons ─────────────────────────────────────────── */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleNewAnalysis}
          >
            {t('results.newAnalysis')}
          </Button>
          <Button
            variant="outlined"
            startIcon={<ScienceIcon />}
            onClick={() => navigate(`${ROUTES.SYNTHETIC_DATA}?documentId=${currentDocument.id}`)}
          >
            {t('results.generateSynthetic')}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<DashboardIcon />}
            onClick={() => {
              dispatch(resetWorkflow());
              navigate(ROUTES.DASHBOARD);
            }}
          >
            {t('results.goToDashboard')}
          </Button>
        </CardContent>
      </Card>

      {/* Job info */}
      {currentJob && (
        <Typography variant="caption" color="text.secondary">
          Job ID: {currentJob.id}
          {currentDocument.framework && ` · Framework: ${currentDocument.framework.toUpperCase()}`}
        </Typography>
      )}

      {/* ── Snackbar for copy feedback ─────────────────────────────────── */}
      <Snackbar
        open={snackOpen}
        autoHideDuration={2000}
        onClose={() => setSnackOpen(false)}
        message={t('results.copied')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
}
