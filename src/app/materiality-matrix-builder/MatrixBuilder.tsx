'use client';

import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Button, Callout } from '@/components/ui';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WORKBOOK_URL = '/downloads/csrd-double-materiality-workbook.xlsx';
const STORAGE_KEY = 'csrd-materiality-matrix-v1';

type Topic = {
  id: string;
  code: string; // e.g. 'E1'
  name: string;
  impact: number; // 0-5
  financial: number; // 0-5
};

// The ESRS topical list (E1-E5, S1-S4, G1) as a prefill starting point.
const ESRS_PREFILL: Omit<Topic, 'id' | 'impact' | 'financial'>[] = [
  { code: 'E1', name: 'Climate change' },
  { code: 'E2', name: 'Pollution' },
  { code: 'E3', name: 'Water & marine resources' },
  { code: 'E4', name: 'Biodiversity & ecosystems' },
  { code: 'E5', name: 'Resource use & circular economy' },
  { code: 'S1', name: 'Own workforce' },
  { code: 'S2', name: 'Workers in the value chain' },
  { code: 'S3', name: 'Affected communities' },
  { code: 'S4', name: 'Consumers & end-users' },
  { code: 'G1', name: 'Business conduct' }
];

function makeId(): string {
  return `t_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

function defaultTopics(): Topic[] {
  // Prefill with a sensible default: climate scored, others at a neutral 2.5.
  return ESRS_PREFILL.map((t, i) => ({
    id: makeId() + i,
    code: t.code,
    name: t.name,
    impact: t.code === 'E1' ? 4 : 2,
    financial: t.code === 'E1' ? 4 : 2
  }));
}

// Material if it crosses the threshold on EITHER axis (double materiality).
const THRESHOLD = 3;
function isMaterial(t: Topic): boolean {
  return t.impact >= THRESHOLD || t.financial >= THRESHOLD;
}

export function MatrixBuilder() {
  const [topics, setTopics] = useState<Topic[]>(defaultTopics);
  const [hydrated, setHydrated] = useState(false);

  // Optional localStorage persistence.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Topic[];
        if (Array.isArray(parsed) && parsed.length > 0) setTopics(parsed);
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(topics));
    } catch {
      /* ignore */
    }
  }, [topics, hydrated]);

  const update = (id: string, patch: Partial<Topic>) =>
    setTopics((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));

  const remove = (id: string) =>
    setTopics((prev) => prev.filter((t) => t.id !== id));

  const addRow = () =>
    setTopics((prev) => [
      ...prev,
      { id: makeId(), code: '', name: 'New topic', impact: 0, financial: 0 }
    ]);

  const resetToEsrs = () => setTopics(defaultTopics());

  const materialCount = useMemo(
    () => topics.filter(isMaterial).length,
    [topics]
  );

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <Callout variant="info" title="A presentation aid, not a CSRD requirement">
        Under CSRD double materiality, a topic is material if it crosses your threshold on the impact
        axis or the financial axis, not necessarily both. The matrix is an optional way to visualise
        a double materiality assessment; the actual requirement is a documented, IRO-based assessment.
        Score each topic from 0 to 5 on each axis below.
      </Callout>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        {/* Editable topic table */}
        <div>
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-display font-semibold text-xl text-ink">Topics and scores</h3>
            <span className="font-mono text-xs text-muted">
              {materialCount} of {topics.length} material
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {topics.map((t) => (
              <div
                key={t.id}
                className={`rounded-card border bg-card p-4 ${
                  isMaterial(t) ? 'border-primary' : 'border-line'
                }`}
              >
                <div className="flex items-start gap-2">
                  <input
                    aria-label="Topic code"
                    value={t.code}
                    onChange={(e) => update(t.id, { code: e.target.value })}
                    placeholder="E1"
                    className="min-h-[40px] w-16 rounded-md border border-line bg-paper px-2 text-center font-mono text-sm text-ink focus:outline focus:outline-2 focus:outline-accent focus:outline-offset-2"
                  />
                  <input
                    aria-label="Topic name"
                    value={t.name}
                    onChange={(e) => update(t.id, { name: e.target.value })}
                    placeholder="Topic name"
                    className="min-h-[40px] flex-1 rounded-md border border-line bg-paper px-3 font-body text-sm text-ink focus:outline focus:outline-2 focus:outline-accent focus:outline-offset-2"
                  />
                  <button
                    type="button"
                    onClick={() => remove(t.id)}
                    aria-label={`Remove ${t.name}`}
                    className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-md border border-line text-muted transition-colors hover:border-danger hover:text-danger focus:outline focus:outline-2 focus:outline-accent focus:outline-offset-2"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                    </svg>
                  </button>
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <ScoreSlider
                    label="Impact materiality"
                    value={t.impact}
                    onChange={(v) => update(t.id, { impact: v })}
                    id={`${t.id}-impact`}
                  />
                  <ScoreSlider
                    label="Financial materiality"
                    value={t.financial}
                    onChange={(v) => update(t.id, { financial: v })}
                    id={`${t.id}-financial`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={addRow}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-md border-[1.5px] border-primary bg-transparent px-4 font-body text-sm font-semibold text-primary transition-colors hover:bg-primary/[0.06] focus:outline focus:outline-2 focus:outline-accent focus:outline-offset-2"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              Add topic
            </button>
            <button
              type="button"
              onClick={resetToEsrs}
              className="font-body text-sm font-medium text-muted link-underline"
            >
              Reset to ESRS list
            </button>
          </div>
        </div>

        {/* The matrix */}
        <div>
          <h3 className="font-display font-semibold text-xl text-ink">Your matrix</h3>
          <p className="mt-1 text-sm text-muted">
            Impact materiality (vertical) against financial materiality (horizontal). The shaded
            top-right band is high on both; topics past the threshold on either axis are material.
          </p>
          <Matrix topics={topics} />
        </div>
      </div>

      {/* Soft email upgrade */}
      <MatrixCapture topics={topics} materialCount={materialCount} />

      {/* Cross-link */}
      <div className="flex flex-wrap gap-2">
        <Button as="a" href="/double-materiality" variant="secondary" className="text-sm">
          Double materiality, explained
        </Button>
        <Button as="a" href="/esrs" variant="secondary" className="text-sm">
          The 12 ESRS standards
        </Button>
      </div>

      <p className="text-sm text-muted leading-relaxed">
        This is a working aid to help you visualise a double materiality assessment, not a CSRD
        deliverable or legal advice. The formal requirement is a documented, IRO-based assessment.
      </p>
    </div>
  );
}

function ScoreSlider({
  label,
  value,
  onChange,
  id
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  id: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="font-body text-xs font-semibold text-ink">
          {label}
        </label>
        <span className="font-mono text-xs text-accent-deep">{value} / 5</span>
      </div>
      <input
        id={id}
        type="range"
        min={0}
        max={5}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1.5 w-full accent-[#0E4D54]"
      />
    </div>
  );
}

function Matrix({ topics }: { topics: Topic[] }) {
  // Convert a 0-5 score to a percentage position inside the plotting square.
  const pos = (v: number) => (v / 5) * 100;

  return (
    <div className="mt-4">
      <div className="flex">
        {/* Y axis label */}
        <div className="flex w-8 items-center justify-center">
          <span className="-rotate-90 whitespace-nowrap font-body text-xs font-semibold uppercase tracking-wide text-muted">
            Impact materiality
          </span>
        </div>

        {/* Plot square */}
        <div className="relative aspect-square flex-1 rounded-card border border-line bg-card">
          {/* High-on-both shaded quadrant (top-right) */}
          <div className="absolute right-0 top-0 h-1/2 w-1/2 rounded-tr-card bg-low/70" />

          {/* Threshold gridlines at 60% (score 3 of 5) */}
          <div
            className="absolute left-0 right-0 border-t border-dashed border-primary/40"
            style={{ bottom: `${pos(THRESHOLD)}%` }}
          />
          <div
            className="absolute bottom-0 top-0 border-l border-dashed border-primary/40"
            style={{ left: `${pos(THRESHOLD)}%` }}
          />

          {/* Plotted dots */}
          {topics.map((t) => {
            const material = isMaterial(t);
            const left = pos(t.financial);
            const bottom = pos(t.impact);
            return (
              <div
                key={t.id}
                className="group absolute -translate-x-1/2 translate-y-1/2"
                style={{ left: `${left}%`, bottom: `${bottom}%` }}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full border-2 font-mono text-[0.6rem] font-semibold shadow-sm ${
                    material
                      ? 'border-primary bg-accent text-ink'
                      : 'border-line bg-paper text-muted'
                  }`}
                  title={`${t.code ? t.code + ' - ' : ''}${t.name}: impact ${t.impact}, financial ${t.financial}`}
                >
                  {t.code || '?'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* X axis label */}
      <div className="ml-8 mt-2 text-center font-body text-xs font-semibold uppercase tracking-wide text-muted">
        Financial materiality
      </div>

      {/* Legend */}
      <div className="ml-8 mt-4 flex flex-wrap gap-4 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full border-2 border-primary bg-accent" />
          Material (past threshold on either axis)
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full border-2 border-line bg-paper" />
          Below threshold
        </span>
      </div>
    </div>
  );
}

function MatrixCapture({
  topics,
  materialCount
}: {
  topics: Topic[];
  materialCount: number;
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  function triggerDownload() {
    const a = document.createElement('a');
    a.href = WORKBOOK_URL;
    a.download = 'csrd-double-materiality-workbook.xlsx';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setStatus('error');
      setError("That doesn't look like a valid email address. Mind checking it?");
      return;
    }
    setStatus('loading');
    setError('');
    try {
      const material = topics
        .filter((t) => t.impact >= THRESHOLD || t.financial >= THRESHOLD)
        .map((t) => `${t.code || '?'} ${t.name}`)
        .join('; ');
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: 'materiality-matrix',
          email,
          result: `${materialCount} material of ${topics.length} topics. Material: ${
            material || 'none above threshold'
          }`
        })
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok) {
        setStatus('done');
        setEmail('');
        triggerDownload();
      } else {
        setStatus('error');
        setError(data?.error || 'Something went wrong on our end. Please try again in a moment.');
      }
    } catch {
      setStatus('error');
      setError('Something went wrong on our end. Please try again in a moment.');
    }
  }

  return (
    <div className="relative overflow-hidden rounded-card bg-ink p-6 lg:p-8">
      <div className="relative z-10">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          The CSRD Brief
        </p>
        <h3 className="mt-2 font-display font-semibold text-xl lg:text-2xl text-paper">
          Download the Double Materiality Assessment workbook
        </h3>
        <p className="mt-2 text-paper/80 leading-relaxed">
          Enter your email to download our DMA workbook instantly: an Excel template that mirrors this
          matrix (ESRS topics, impact and financial scoring, an auto materiality verdict and a scoring
          guide) so you can take your assessment from screen to documented, auditable evidence. You
          will also join The CSRD Brief. Unsubscribe in one click.
        </p>

        {status === 'done' ? (
          <div
            role="status"
            className="mt-5 rounded-md bg-paper/10 px-4 py-3 font-medium text-accent"
          >
            <p>Your download has started. Check your downloads folder for the DMA workbook.</p>
            <p className="mt-1 text-sm font-normal text-paper/80">
              Did not start?{' '}
              <a
                href={WORKBOOK_URL}
                download
                className="font-semibold text-accent underline underline-offset-2"
              >
                Download it here
              </a>
              .
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="mm-email">
              Email address
            </label>
            <input
              id="mm-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="min-h-[48px] flex-1 rounded-md border border-ink bg-ink-dark px-4 text-paper placeholder:text-paper/40 focus:outline focus:outline-2 focus:outline-accent focus:outline-offset-2"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="min-h-[48px] rounded-md bg-accent px-6 font-body font-semibold text-ink transition-[transform,box-shadow] duration-[var(--duration-base)] ease-[var(--ease-out)] hover:[transform:translateY(-2px)] hover:shadow-[var(--shadow-cta-hover)] active:scale-[0.97] disabled:opacity-50"
            >
              {status === 'loading' ? 'Preparing...' : 'Email me + download'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p role="alert" className="mt-3 text-sm text-accent">
            {error}
          </p>
        )}
        <p className="mt-4 text-sm text-paper/70">No spam. Unsubscribe anytime.</p>
      </div>
    </div>
  );
}
