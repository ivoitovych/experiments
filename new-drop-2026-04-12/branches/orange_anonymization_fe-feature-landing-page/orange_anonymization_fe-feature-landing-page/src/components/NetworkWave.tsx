import { useMemo } from 'react';
import { Box } from '@mui/material';

export interface NetworkWaveProps {
  seed?: number;
  idPrefix?: string;
}

const SVG_WIDTH = 1440;
const SVG_HEIGHT = 460;
const X_PADDING = 180;
const NODE_COUNT = 55;
const LINE_COLOR_RGB = '255,255,255';
const TOTAL_LINES = 38;
const STEPS = 80;
const Y_CLAMP_MARGIN = 8;
const EDGE_MARGIN = 25;
const DISTRIBUTION_POWER = 0.7;
const MAX_DISPLACEMENT = 75;
const MIN_DISPLACEMENT = 18;
const NOISE_SCALE_X = 3.2;
const NOISE_SCALE_Y = 4.0;
const SPLINE_TENSION = 0.33;

const HASH_PRIME_A = 374761393;
const HASH_PRIME_B = 668265263;
const HASH_PRIME_C = 1274126177;
const HASH_MAX = 0x7fffffff;

const FBM_WEIGHT_PRIMARY = 0.65;
const FBM_WEIGHT_SECONDARY = 0.35;
const FBM_SEED_OFFSET = 100;

const PRNG_MULTIPLIER = 16807;
const PRNG_MODULUS = 2147483647;
const PRNG_MAX = PRNG_MODULUS - 1;

interface LineData {
  d: string;
  opacity: number;
  width: number;
  glow: boolean;
}

interface NodeData {
  cx: number;
  cy: number;
  r: number;
  opacity: number;
}

/* ── Seeded hash for noise lattice ── */
function hash(ix: number, iy: number, seed: number): number {
  let h = (ix * HASH_PRIME_A + iy * HASH_PRIME_B + seed * HASH_PRIME_C) | 0;
  h = (h ^ (h >> 13)) * HASH_PRIME_C;
  h = h ^ (h >> 16);
  return (h & HASH_MAX) / HASH_MAX;
}

/* ── Smooth interpolation ── */
function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

/* ── 2D value noise — organic displacement field ── */
function noise2D(x: number, y: number, seed: number): number {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = smoothstep(x - ix);
  const fy = smoothstep(y - iy);

  const v00 = hash(ix, iy, seed);
  const v10 = hash(ix + 1, iy, seed);
  const v01 = hash(ix, iy + 1, seed);
  const v11 = hash(ix + 1, iy + 1, seed);

  const a = v00 + (v10 - v00) * fx;
  const b = v01 + (v11 - v01) * fx;
  return a + (b - a) * fy;
}

/* ── Fractal noise (2 octaves) — smooth yet detailed ── */
function fbm(x: number, y: number, seed: number): number {
  return (
    noise2D(x, y, seed) * FBM_WEIGHT_PRIMARY +
    noise2D(x * 2, y * 2, seed + FBM_SEED_OFFSET) * FBM_WEIGHT_SECONDARY
  );
}

/* ── Catmull-Rom spline ── */
function catmullRomPath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return '';
  const tension = SPLINE_TENSION;
  let d = `M${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1x = p1.x + (p2.x - p0.x) * tension;
    const c1y = p1.y + (p2.y - p0.y) * tension;
    const c2x = p2.x - (p3.x - p1.x) * tension;
    const c2y = p2.y - (p3.y - p1.y) * tension;
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
  }
  return d;
}

function generate(seed: number) {
  const lines: LineData[] = [];
  const nodes: NodeData[] = [];
  const allPts: { x: number; y: number }[][] = [];

  const xSpan = SVG_WIDTH + X_PADDING * 2;
  const CY = SVG_HEIGHT / 2;

  /*
   * Each line has a base Y position. Lines denser near center (Gaussian).
   * The noise field displaces each line vertically — because noise is
   * continuous, nearby lines get similar displacements, forming natural
   * cohesive flows that split and merge organically.
   *
   * Noise amplitude is larger near center (±80px) and smaller at edges
   * (±20px) — this creates the dramatic weaving center and calm edges
   * matching the Figma design.
   */

  // Distribute lines: denser in center, sparser at edges
  const baseYs: number[] = [];
  for (let i = 0; i < TOTAL_LINES; i++) {
    const t = (i + 0.5) / TOTAL_LINES; // 0..1
    // Push toward center using smoothstep-like distribution
    const centered = (t - 0.5) * 2; // -1..1
    const sign = centered >= 0 ? 1 : -1;
    const shaped = sign * Math.pow(Math.abs(centered), DISTRIBUTION_POWER);
    baseYs.push(CY + shaped * (CY - EDGE_MARGIN));
  }

  for (let i = 0; i < TOTAL_LINES; i++) {
    const baseY = baseYs[i];
    const distFromCenter = Math.abs(baseY - CY) / (CY - EDGE_MARGIN);
    const proximity = 1 - Math.min(distFromCenter, 1);

    // Center lines: big displacement. Edge lines: small displacement.
    const amplitude = MIN_DISPLACEMENT + (MAX_DISPLACEMENT - MIN_DISPLACEMENT) * proximity;

    const pts: { x: number; y: number }[] = [];
    for (let s = 0; s <= STEPS; s++) {
      const x = -X_PADDING + (s / STEPS) * xSpan;
      const nx = (s / STEPS) * NOISE_SCALE_X;
      const ny = (i / TOTAL_LINES) * NOISE_SCALE_Y;

      // fbm returns 0..1, remap to -1..1
      const displacement = (fbm(nx, ny, seed) - 0.5) * 2 * amplitude;

      const y = Math.max(
        Y_CLAMP_MARGIN,
        Math.min(SVG_HEIGHT - Y_CLAMP_MARGIN, baseY + displacement),
      );
      pts.push({ x, y });
    }

    allPts.push(pts);
    const d = catmullRomPath(pts);

    // Opacity: center lines brighter
    const opacity = Math.min(0.06 + proximity * 0.22, 0.28);
    const w = 0.35 + proximity * 0.5;

    lines.push({ d, opacity, width: w, glow: true });

    // Subtle glow halo on brighter lines
    if (opacity > 0.12) {
      lines.push({ d, opacity: opacity * 0.12, width: w * 5, glow: false });
    }
  }

  // Nodes placed on lines — seeded PRNG for placement only
  let ns = seed;
  const nextRand = () => {
    ns = (ns * PRNG_MULTIPLIER) % PRNG_MODULUS;
    return (ns - 1) / PRNG_MAX;
  };

  for (let i = 0; i < NODE_COUNT; i++) {
    const li = Math.floor(nextRand() * allPts.length);
    const pts = allPts[li];
    const seg = Math.floor(nextRand() * (pts.length - 1));
    const t = nextRand();
    const cx = pts[seg].x + (pts[seg + 1].x - pts[seg].x) * t;
    const cy = pts[seg].y + (pts[seg + 1].y - pts[seg].y) * t;
    if (cx < 0 || cx > SVG_WIDTH) continue;
    nodes.push({
      cx: +cx.toFixed(1),
      cy: +cy.toFixed(1),
      r: +(1.0 + nextRand() * 1.8).toFixed(1),
      opacity: +(0.35 + nextRand() * 0.5).toFixed(2),
    });
  }

  return { lines, nodes };
}

const NetworkWave = ({ seed = 42, idPrefix = 'nw' }: NetworkWaveProps) => {
  const { lines, nodes } = useMemo(() => generate(seed), [seed]);

  const gId = `${idPrefix}-g`;
  const nId = `${idPrefix}-n`;

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <Box
        component="svg"
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        sx={{ width: '100%', height: '100%' }}
      >
        <defs>
          <filter id={gId} x="-10%" y="-100%" width="120%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id={nId} x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {lines.map((l, i) => (
          <path
            key={i}
            d={l.d}
            stroke={`rgba(${LINE_COLOR_RGB},${l.opacity.toFixed(2)})`}
            strokeWidth={l.width.toFixed(1)}
            fill="none"
            filter={l.glow ? `url(#${gId})` : undefined}
          />
        ))}

        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.cx}
            cy={n.cy}
            r={n.r}
            fill={`rgba(${LINE_COLOR_RGB},${n.opacity.toFixed(2)})`}
            filter={`url(#${nId})`}
          />
        ))}
      </Box>
    </Box>
  );
};

export { NetworkWave };
