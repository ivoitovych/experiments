/**
 * Dashboard Page
 *
 * Shows:
 *   - 4 metric cards (total documents, entities, anonymization rate, synthetic records)
 *   - Line chart: processing activity over last 30 days (Recharts)
 *   - Bar chart: entity type distribution (Recharts)
 *   - Recent documents table
 *
 * Data is fetched via Redux thunk (fetchDashboard) on mount.
 */
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import {
  Description as DescriptionIcon,
  FindInPage as FindInPageIcon,
  VerifiedUser as VerifiedUserIcon,
  DataObject as DataObjectIcon,
  PlayArrow as PlayArrowIcon,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { fetchDashboard } from '@/store/slices/dashboardSlice';
import { formatDate } from '@/utils';
import { DocumentDetailDialog } from '@/components/DocumentDetailDialog';

// ─── Metric card ──────────────────────────────────────────────────────────────
interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  isLoading: boolean;
}

function MetricCard({ title, value, icon, color, isLoading }: MetricCardProps) {
  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              {title}
            </Typography>
            {isLoading ? (
              <Skeleton width={80} height={40} />
            ) : (
              <Typography variant="h4" fontWeight={700}>
                {value}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              bgcolor: `${color}22`,
              color,
              display: 'flex',
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

// ─── Empty chart placeholder ──────────────────────────────────────────────────
function EmptyChartPlaceholder({ message }: { message: string }) {
  return (
    <Box
      sx={{
        height: 280,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography color="text.secondary">{message}</Typography>
    </Box>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data, isLoading } = useAppSelector((s) => s.dashboard);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);

  useEffect(() => {
    void dispatch(fetchDashboard());
  }, [dispatch]);

  // Determine dashboard state
  const isFirstTime = !isLoading && (data?.metrics.realDocumentCount ?? 0) === 0;
  const hasDrafts =
    !isLoading &&
    !isFirstTime &&
    (data?.recentDocuments ?? []).some((doc) => doc.status !== 'completed');

  const metrics = useMemo(
    () => [
      {
        title: t('dashboard.metrics.totalDocuments'),
        value: data?.metrics.totalDocuments ?? 0,
        icon: <DescriptionIcon />,
        color: '#1565C0',
      },
      {
        title: t('dashboard.metrics.entitiesDetected'),
        value: (data?.metrics.entitiesDetected ?? 0).toLocaleString(),
        icon: <FindInPageIcon />,
        color: '#00897B',
      },
      {
        title: t('dashboard.metrics.anonymizationRate'),
        value: `${data?.metrics.anonymizationRate ?? 0}%`,
        icon: <VerifiedUserIcon />,
        color: '#2E7D32',
      },
      {
        title: t('dashboard.metrics.syntheticRecords'),
        value: data?.metrics.syntheticRecords ?? 0,
        icon: <DataObjectIcon />,
        color: '#F57F17',
      },
    ],
    [data, t],
  );

  const entityDistribution = data?.entityDistribution ?? [];
  const activityChart = data?.activityChart ?? [];
  const recentDocuments = data?.recentDocuments ?? [];

  return (
    <Box>
      {/* Page header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="h4" fontWeight={700}>
            {t('dashboard.title')}
          </Typography>
          <Typography color="text.secondary">{t('dashboard.subtitle')}</Typography>
        </Box>
        <Button
          variant="contained"
          onClick={() => navigate('/app/de-identify')}
          sx={{ whiteSpace: 'nowrap' }}
        >
          {t('dashboard.startDeIdentification')}
        </Button>
      </Box>

      {/* First-time user banner */}
      {isFirstTime && (
        <Alert
          severity="info"
          sx={{ mb: 3 }}
          action={
            <Button
              color="inherit"
              size="small"
              startIcon={<PlayArrowIcon />}
              onClick={() => navigate('/app/de-identify')}
            >
              {t('dashboard.firstTimeCta')}
            </Button>
          }
        >
          {t('dashboard.firstTimeTitle')}
        </Alert>
      )}

      {/* Resume drafts banner */}
      {hasDrafts && (
        <Alert
          severity="warning"
          sx={{ mb: 3 }}
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => navigate('/app/de-identify')}
            >
              {t('dashboard.resumeButton')}
            </Button>
          }
        >
          {t('dashboard.resumeBanner')}
        </Alert>
      )}

      {/* Metric cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {metrics.map((m) => (
          <Grid item xs={12} sm={6} lg={3} key={m.title}>
            <MetricCard {...m} isLoading={isLoading} />
          </Grid>
        ))}
      </Grid>

      {/* Charts row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Activity line chart */}
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
                {t('dashboard.chart.activityTitle')}
              </Typography>
              {isLoading ? (
                <Skeleton variant="rectangular" height={280} />
              ) : activityChart.length === 0 ? (
                <EmptyChartPlaceholder message={t('dashboard.emptyChart')} />
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={activityChart}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="documents"
                      stroke="#1565C0"
                      strokeWidth={2}
                      dot={false}
                      name={t('dashboard.chart.documents')}
                    />
                    <Line
                      type="monotone"
                      dataKey="entities"
                      stroke="#00897B"
                      strokeWidth={2}
                      dot={false}
                      name={t('dashboard.chart.entities')}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Entity distribution bar chart */}
        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
                {t('dashboard.chart.entityDistribution')}
              </Typography>
              {isLoading ? (
                <Skeleton variant="rectangular" height={280} />
              ) : entityDistribution.length === 0 ? (
                <EmptyChartPlaceholder message={t('dashboard.emptyChart')} />
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart
                    data={entityDistribution}
                    layout="vertical"
                    margin={{ left: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis type="number" tick={{ fontSize: 11 }} />
                    <YAxis dataKey="entityType" type="category" tick={{ fontSize: 11 }} width={110} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#1565C0" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent documents table */}
      <Card>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
            {t('dashboard.recentActivity.title')}
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('dashboard.recentActivity.columns.document')}</TableCell>
                  <TableCell>{t('dashboard.recentActivity.columns.status')}</TableCell>
                  <TableCell align="right">{t('dashboard.recentActivity.columns.entities')}</TableCell>
                  <TableCell align="right">{t('dashboard.recentActivity.columns.date')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell><Skeleton /></TableCell>
                        <TableCell><Skeleton /></TableCell>
                        <TableCell><Skeleton /></TableCell>
                        <TableCell><Skeleton /></TableCell>
                      </TableRow>
                    ))
                  : recentDocuments.map((doc) => (
                      <TableRow
                        key={doc.id}
                        hover
                        onClick={() => !doc.id.startsWith('mock-') && setSelectedDocId(doc.id)}
                        sx={{ cursor: doc.id.startsWith('mock-') ? 'default' : 'pointer' }}
                      >
                        <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                          {doc.id.slice(0, 8)}…
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={doc.status}
                            size="small"
                            color={
                              doc.status === 'completed'
                                ? 'success'
                                : doc.status === 'failed'
                                ? 'error'
                                : 'default'
                            }
                          />
                        </TableCell>
                        <TableCell align="right">{doc.entityCount}</TableCell>
                        <TableCell align="right">{formatDate(doc.createdAt)}</TableCell>
                      </TableRow>
                    ))}
                {!isLoading && recentDocuments.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      <Typography color="text.secondary" py={3}>
                        {t('dashboard.recentActivity.noActivity')}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Document detail dialog */}
      <DocumentDetailDialog
        documentId={selectedDocId}
        onClose={() => setSelectedDocId(null)}
      />
    </Box>
  );
}
