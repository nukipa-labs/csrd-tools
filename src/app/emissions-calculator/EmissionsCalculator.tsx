'use client';

import { useMemo, useState, type FormEvent } from 'react';
import { Button, Callout } from '@/components/ui';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WORKBOOK_URL = '/downloads/csrd-ghg-inventory-workbook.xlsx';

// ---------------------------------------------------------------------------
// Emission factors. INDICATIVE rough defaults only, for a first-pass estimate.
// Not audit-grade. A real GHG inventory uses dated, source-specific factors
// (DEFRA, IEA, EPA, EXIOBASE). Values chosen as round, defensible mid-2020s
// ballparks; units are noted per line.
// ---------------------------------------------------------------------------

type Line = {
  id: string;
  label: string;
  unitLabel: string; // shown after the input
  factor: number; // kg CO2e per unit
  note?: string;
};

type ScopeBlock = {
  key: 'scope1' | 'scope2' | 'scope3';
  title: string;
  blurb: string;
  lines: Line[];
};

const BLOCKS: ScopeBlock[] = [
  {
    key: 'scope1',
    title: 'Scope 1 - direct emissions',
    blurb:
      'Fuel you burn in sources you own or control: gas for heating, diesel and petrol in company vehicles.',
    lines: [
      {
        id: 's1_gas',
        label: 'Natural gas for heating',
        unitLabel: 'kWh / year',
        factor: 0.183, // kg CO2e per kWh (gross CV, approx)
        note: 'Roughly 0.18 kg CO2e per kWh of natural gas.'
      },
      {
        id: 's1_diesel',
        label: 'Diesel in company vehicles or plant',
        unitLabel: 'litres / year',
        factor: 2.51, // kg CO2e per litre
        note: 'Roughly 2.5 kg CO2e per litre of diesel.'
      },
      {
        id: 's1_petrol',
        label: 'Petrol in company vehicles',
        unitLabel: 'litres / year',
        factor: 2.31, // kg CO2e per litre
        note: 'Roughly 2.3 kg CO2e per litre of petrol.'
      }
    ]
  },
  {
    key: 'scope2',
    title: 'Scope 2 - purchased energy',
    blurb:
      'Electricity, heat and steam you buy and consume. ESRS E1 asks for both a location-based and a market-based figure; this estimate is location-based (grid average).',
    lines: [
      {
        id: 's2_elec',
        label: 'Purchased electricity',
        unitLabel: 'kWh / year',
        factor: 0.3, // kg CO2e per kWh (illustrative EU grid average)
        note: 'Around 0.30 kg CO2e per kWh on an illustrative EU grid average. Your real grid factor varies a lot by country.'
      },
      {
        id: 's2_heat',
        label: 'Purchased heat or steam (district heating)',
        unitLabel: 'kWh / year',
        factor: 0.17,
        note: 'Around 0.17 kg CO2e per kWh for district heat.'
      }
    ]
  },
  {
    key: 'scope3',
    title: 'Scope 3 - value-chain emissions',
    blurb:
      'All other indirect emissions, up and down your value chain. This is usually the largest share (often 70 to 90 percent). Below are a few common categories using rough spend- and activity-based factors.',
    lines: [
      {
        id: 's3_goods',
        label: 'Purchased goods and services (Cat. 1)',
        unitLabel: 'EUR spend / year',
        factor: 0.4, // kg CO2e per EUR spend (very rough average)
        note: 'Spend-based: roughly 0.4 kg CO2e per EUR of general procurement spend. Highly sector-dependent.'
      },
      {
        id: 's3_travel',
        label: 'Business travel - air (Cat. 6)',
        unitLabel: 'passenger-km / year',
        factor: 0.18, // kg CO2e per passenger-km (short/medium haul avg)
        note: 'Roughly 0.18 kg CO2e per air passenger-km.'
      },
      {
        id: 's3_commute',
        label: 'Employee commuting (Cat. 7)',
        unitLabel: 'car-km / year',
        factor: 0.17, // kg CO2e per km
        note: 'Roughly 0.17 kg CO2e per car-km commuted.'
      },
      {
        id: 's3_freight',
        label: 'Upstream transport - road freight (Cat. 4)',
        unitLabel: 'tonne-km / year',
        factor: 0.11, // kg CO2e per tonne-km
        note: 'Roughly 0.11 kg CO2e per tonne-km by HGV.'
      }
    ]
  }
];

const SCOPE_COLORS: Record<ScopeBlock['key'], { bar: string; chip: string }> = {
  scope1: { bar: 'bg-primary', chip: 'bg-primary' },
  scope2: { bar: 'bg-accent', chip: 'bg-accent' },
  scope3: { bar: 'bg-ink', chip: 'bg-ink' }
};

type Inputs = Record<string, string>;

function fmt(t: number): string {
  if (t === 0) return '0';
  if (t < 0.1) return t.toFixed(3);
  if (t < 10) return t.toFixed(2);
  if (t < 100) return t.toFixed(1);
  return Math.round(t).toLocaleString('en-US');
}

export function EmissionsCalculator() {
  const [inputs, setInputs] = useState<Inputs>({});

  const totals = useMemo(() => {
    const byScope: Record<ScopeBlock['key'], number> = {
      scope1: 0,
      scope2: 0,
      scope3: 0
    };
    for (const block of BLOCKS) {
      for (const line of block.lines) {
        const raw = parseFloat(inputs[line.id] ?? '');
        if (!isFinite(raw) || raw <= 0) continue;
        // kg -> tonnes
        byScope[block.key] += (raw * line.factor) / 1000;
      }
    }
    const grand = byScope.scope1 + byScope.scope2 + byScope.scope3;
    return { byScope, grand };
  }, [inputs]);

  const setLine = (id: string, value: string) =>
    setInputs((prev) => ({ ...prev, [id]: value }));

  const reset = () => setInputs({});

  const hasAny = totals.grand > 0;

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <Callout variant="warn" title="Indicative only, not audit-grade">
        This calculator uses rough default emission factors to give you a first-pass estimate of your
        carbon footprint. It is not a substitute for a proper greenhouse-gas inventory. A
        CSRD-grade E1 disclosure needs dated, source-specific factors (DEFRA, IEA, EPA, EXIOBASE),
        documented boundaries, and Scope 2 reported both location-based and market-based. Treat these
        numbers as a screening estimate, not a reportable figure.
      </Callout>

      {/* Input blocks */}
      <div className="space-y-6">
        {BLOCKS.map((block) => (
          <fieldset
            key={block.key}
            className="rounded-card border border-line bg-card p-5 lg:p-6"
          >
            <legend className="flex items-center gap-2 px-1">
              <span
                aria-hidden="true"
                className={`inline-block h-3 w-3 rounded-sm ${SCOPE_COLORS[block.key].chip}`}
              />
              <span className="font-display font-semibold text-xl text-ink">{block.title}</span>
            </legend>
            <p className="mt-2 text-sm text-muted leading-relaxed">{block.blurb}</p>

            <div className="mt-5 grid gap-4">
              {block.lines.map((line) => (
                <div key={line.id} className="grid gap-1.5">
                  <label
                    htmlFor={line.id}
                    className="font-body text-sm font-semibold text-ink"
                  >
                    {line.label}
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      id={line.id}
                      type="number"
                      min="0"
                      inputMode="decimal"
                      value={inputs[line.id] ?? ''}
                      onChange={(e) => setLine(line.id, e.target.value)}
                      placeholder="0"
                      className="min-h-[44px] w-40 rounded-md border border-line bg-paper px-3 text-ink placeholder:text-muted/60 focus:outline focus:outline-2 focus:outline-accent focus:outline-offset-2"
                    />
                    <span className="font-mono text-xs text-muted">{line.unitLabel}</span>
                  </div>
                  {line.note && (
                    <p className="font-mono text-[0.7rem] leading-relaxed text-muted">
                      {line.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      {/* Results */}
      <div
        role="status"
        aria-live="polite"
        className="rounded-card bg-low border-l-[3px] border-primary p-5 lg:p-6"
      >
        <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          Your indicative footprint
        </p>
        <p className="mt-2 font-display font-semibold text-3xl lg:text-4xl text-ink">
          {fmt(totals.grand)}{' '}
          <span className="font-body text-lg font-normal text-muted">tCO2e / year</span>
        </p>

        {/* Stacked bar (CSS divs, no chart lib) */}
        <div className="mt-5">
          <div
            className="flex h-6 w-full overflow-hidden rounded-md border border-line bg-sand-tint"
            role="img"
            aria-label={`Stacked emissions by scope: Scope 1 ${fmt(
              totals.byScope.scope1
            )}, Scope 2 ${fmt(totals.byScope.scope2)}, Scope 3 ${fmt(
              totals.byScope.scope3
            )} tonnes CO2e`}
          >
            {(['scope1', 'scope2', 'scope3'] as const).map((k) => {
              const pct = hasAny ? (totals.byScope[k] / totals.grand) * 100 : 0;
              if (pct <= 0) return null;
              return (
                <div
                  key={k}
                  className={`${SCOPE_COLORS[k].bar} h-full`}
                  style={{ width: `${pct}%` }}
                  title={`${k}: ${pct.toFixed(0)}%`}
                />
              );
            })}
          </div>

          <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {(
              [
                ['scope1', 'Scope 1'],
                ['scope2', 'Scope 2'],
                ['scope3', 'Scope 3']
              ] as const
            ).map(([k, label]) => (
              <div
                key={k}
                className="rounded-md border border-line bg-card p-3"
              >
                <dt className="flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-wide text-muted">
                  <span
                    aria-hidden="true"
                    className={`inline-block h-2.5 w-2.5 rounded-sm ${SCOPE_COLORS[k].chip}`}
                  />
                  {label}
                </dt>
                <dd className="mt-1 font-mono text-lg text-ink">
                  {fmt(totals.byScope[k])}{' '}
                  <span className="text-xs text-muted">tCO2e</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {hasAny && (
          <p className="mt-4 text-sm text-ink/80 leading-relaxed">
            If your Scope 3 share looks small, that usually means you have not yet captured your
            largest categories (purchased goods, use of sold products, investments). For most
            organisations Scope 3 dominates the total once fully measured.
          </p>
        )}

        <div className="mt-5">
          <button
            type="button"
            onClick={reset}
            className="font-body text-sm font-medium text-muted link-underline"
          >
            Reset all inputs
          </button>
        </div>
      </div>

      {/* Soft email upgrade */}
      <WorkbookCapture totals={totals} />

      {/* Cross-links */}
      <div className="flex flex-wrap gap-2">
        <Button as="a" href="/scope-1-2-3-emissions" variant="secondary" className="text-sm">
          Scope 1, 2 and 3 explained
        </Button>
        <Button as="a" href="/ghg-protocol" variant="secondary" className="text-sm">
          The GHG Protocol
        </Button>
        <Button as="a" href="/esrs/e1-climate-change" variant="secondary" className="text-sm">
          ESRS E1 Climate
        </Button>
      </div>

      <p className="text-sm text-muted leading-relaxed">
        This is a screening estimate to help you orient, not a reportable figure or legal advice.
        Confirm against the GHG Protocol and dated emission factors, or with a qualified adviser.
      </p>
    </div>
  );
}

function WorkbookCapture({
  totals
}: {
  totals: { byScope: Record<'scope1' | 'scope2' | 'scope3', number>; grand: number };
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  function triggerDownload() {
    const a = document.createElement('a');
    a.href = WORKBOOK_URL;
    a.download = 'csrd-ghg-inventory-workbook.xlsx';
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
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: 'emissions-calculator',
          email,
          result: `Indicative total ${fmt(totals.grand)} tCO2e (S1 ${fmt(
            totals.byScope.scope1
          )}, S2 ${fmt(totals.byScope.scope2)}, S3 ${fmt(totals.byScope.scope3)})`
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
          Get the full GHG-inventory workbook and factor library
        </h3>
        <p className="mt-2 text-paper/80 leading-relaxed">
          Enter your email to download the workbook instantly: an Excel GHG-inventory template with
          scope tabs, the 15 Scope 3 categories, an auto-calculating summary and a starter factor
          library. You will also join The CSRD Brief so you hear when ESRS E1 and the factor guidance
          change. Unsubscribe in one click.
        </p>

        {status === 'done' ? (
          <div
            role="status"
            className="mt-5 rounded-md bg-paper/10 px-4 py-3 font-medium text-accent"
          >
            <p>Your download has started. Check your downloads folder for the workbook.</p>
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
            <label className="sr-only" htmlFor="ec-email">
              Email address
            </label>
            <input
              id="ec-email"
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
