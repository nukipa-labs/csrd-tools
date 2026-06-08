'use client';

import { useState, useRef, useEffect, useCallback, type FormEvent } from 'react';
import { Button } from '@/components/ui';
import {
  QUESTIONS,
  nextStep,
  plannedSteps,
  computeResult,
  type Answers,
  type QuestionId,
  type AnswerValue,
  type Result
} from './questions';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMAIL_COPY = {
  heading: 'Email me my result and scope-change alerts',
  subcopy:
    "We'll send this steer plus a short plain-English summary, and add you to The CSRD Brief so you hear the moment the rules move (national transposition, the revised ESRS). Unsubscribe in one click.",
  placeholder: 'you@company.com',
  button: 'Send me my result',
  microtrust: 'No spam. Unsubscribe anytime.',
  success: 'On its way. Check your inbox for your result and scope-change alerts.',
  errorGeneric: 'Something went wrong on our end. Please try again in a moment.',
  errorEmail: "That doesn't look like a valid email address. Mind checking it?"
};

// A small inline warning glyph (no emoji), matching the Callout style.
function WarnGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0 text-accent-deep"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.29 3.86 1.82 18a1.5 1.5 0 0 0 1.29 2.25h17.78A1.5 1.5 0 0 0 22.18 18L13.71 3.86a1.5 1.5 0 0 0-2.42 0Z" />
      <path d="M12 9v4M12 17h.01" />
    </svg>
  );
}

function CheckGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="mt-0.5 h-5 w-5 shrink-0 text-primary"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

// Progress route line: completed = teal, current = amber, upcoming = hollow.
function RouteProgress({
  steps,
  currentIndex,
  total
}: {
  steps: QuestionId[];
  currentIndex: number;
  total: number;
}) {
  return (
    <div>
      <p className="font-mono text-xs text-accent-deep">
        Step {Math.min(currentIndex + 1, total)} of {total}
      </p>
      <div
        className="mt-3 flex items-center"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={Math.min(currentIndex + 1, total)}
        aria-label={`Step ${Math.min(currentIndex + 1, total)} of ${total}`}
      >
        {steps.map((id, i) => {
          const done = i < currentIndex;
          const current = i === currentIndex;
          return (
            <div key={id} className="flex flex-1 items-center last:flex-none">
              <span
                className={[
                  'h-2.5 w-2.5 shrink-0 rounded-full border',
                  done
                    ? 'bg-primary border-primary'
                    : current
                      ? 'bg-accent border-accent'
                      : 'bg-transparent border-line'
                ].join(' ')}
              />
              {i < steps.length - 1 && (
                <span
                  className={[
                    'mx-1 h-px flex-1',
                    i < currentIndex ? 'bg-primary' : 'bg-line'
                  ].join(' ')}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ScopeChecker() {
  const [answers, setAnswers] = useState<Answers>({});
  const [history, setHistory] = useState<QuestionId[]>(['where']);
  const [finished, setFinished] = useState(false);
  // direction drives the slide: 1 = forward, -1 = back. Used for the enter animation.
  const [direction, setDirection] = useState<1 | -1>(1);

  const liveRef = useRef<HTMLDivElement>(null);

  const currentId = history[history.length - 1];
  const planned = plannedSteps(answers);
  // Index of the current question within the planned route (for the progress line).
  const plannedIndex = Math.max(0, planned.indexOf(currentId));
  const total = Math.max(planned.length, history.length);

  const select = useCallback(
    (qid: QuestionId, value: AnswerValue) => {
      const updated: Answers = { ...answers, [qid]: value };
      setAnswers(updated);
      const nxt = nextStep(qid, updated);
      setDirection(1);
      if (nxt === null) {
        setFinished(true);
      } else {
        setHistory((h) => [...h, nxt]);
      }
    },
    [answers]
  );

  const goBack = useCallback(() => {
    setDirection(-1);
    if (finished) {
      setFinished(false);
      return;
    }
    if (history.length > 1) {
      const last = history[history.length - 1];
      // Clear the answer to the step we are leaving so branching recomputes cleanly.
      setAnswers((a) => {
        const copy = { ...a };
        delete copy[last];
        return copy;
      });
      setHistory((h) => h.slice(0, -1));
    }
  }, [finished, history]);

  const restart = useCallback(() => {
    setAnswers({});
    setHistory(['where']);
    setFinished(false);
    setDirection(1);
  }, []);

  // Move focus / announce on step change for keyboard + screen-reader users.
  useEffect(() => {
    if (liveRef.current) {
      liveRef.current.focus({ preventScroll: true });
    }
  }, [currentId, finished]);

  const slideClass = direction === 1 ? 'sc-enter-right' : 'sc-enter-left';

  return (
    <div className="mx-auto max-w-2xl">
      {/* Scoped, reduced-motion-friendly slide keyframes. */}
      <style>{`
        @keyframes sc-slide-from-right {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes sc-slide-from-left {
          from { opacity: 0; transform: translateX(-24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .sc-enter-right { animation: sc-slide-from-right var(--duration-base, 220ms) var(--ease-out, ease) both; }
        .sc-enter-left  { animation: sc-slide-from-left  var(--duration-base, 220ms) var(--ease-out, ease) both; }
        @media (prefers-reduced-motion: reduce) {
          .sc-enter-right, .sc-enter-left { animation: none; }
        }
      `}</style>

      {!finished ? (
        <Step
          key={currentId}
          qid={currentId}
          slideClass={slideClass}
          plannedSteps={planned}
          plannedIndex={plannedIndex}
          total={total}
          selected={answers[currentId]}
          onSelect={select}
          onBack={goBack}
          canGoBack={history.length > 1}
          liveRef={liveRef}
        />
      ) : (
        <ResultView
          key="result"
          slideClass={slideClass}
          answers={answers}
          onBack={goBack}
          onRestart={restart}
          liveRef={liveRef}
        />
      )}
    </div>
  );
}

function Step({
  qid,
  slideClass,
  plannedSteps: planned,
  plannedIndex,
  total,
  selected,
  onSelect,
  onBack,
  canGoBack,
  liveRef
}: {
  qid: QuestionId;
  slideClass: string;
  plannedSteps: QuestionId[];
  plannedIndex: number;
  total: number;
  selected?: AnswerValue;
  onSelect: (qid: QuestionId, value: AnswerValue) => void;
  onBack: () => void;
  canGoBack: boolean;
  liveRef: React.RefObject<HTMLDivElement | null>;
}) {
  const q = QUESTIONS[qid];

  return (
    <div className={slideClass}>
      <RouteProgress steps={planned} currentIndex={plannedIndex} total={total} />

      <div
        ref={liveRef}
        tabIndex={-1}
        className="mt-6 rounded-card border border-line bg-card p-6 lg:p-8 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
      >
        <fieldset>
          <legend className="font-display font-semibold text-2xl lg:text-3xl text-ink leading-tight">
            {q.heading}
          </legend>
          {q.subtext && (
            <p className="mt-3 text-muted leading-relaxed">{q.subtext}</p>
          )}

          <div className="mt-6 grid gap-3">
            {q.options.map((opt) => {
              const isSel = selected === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onSelect(qid, opt.value)}
                  aria-pressed={isSel}
                  className={[
                    'group min-h-[56px] w-full rounded-md border-[1.5px] px-5 py-4 text-left',
                    'transition-[transform,background-color,border-color,color] duration-[var(--duration-fast)] ease-[var(--ease-out)]',
                    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2',
                    'active:scale-[0.99]',
                    isSel
                      ? 'border-primary bg-primary text-paper'
                      : 'border-primary/30 bg-transparent text-ink hover:bg-sand-tint hover:border-primary'
                  ].join(' ')}
                >
                  <span className="block font-body font-semibold">{opt.label}</span>
                  {opt.hint && (
                    <span
                      className={[
                        'mt-1 block text-sm',
                        isSel ? 'text-paper/80' : 'text-muted'
                      ].join(' ')}
                    >
                      {opt.hint}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </fieldset>
      </div>

      <div className="mt-5 flex items-center justify-between">
        {canGoBack ? (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 font-body font-medium text-primary link-underline"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back
          </button>
        ) : (
          <span />
        )}
        {q.optional && (
          <button
            type="button"
            onClick={() => onSelect(qid, lastOptionValue(qid))}
            className="font-body text-sm text-muted link-underline"
          >
            Skip this step
          </button>
        )}
      </div>
    </div>
  );
}

// For optional steps, "skip" is treated as the "I am not sure" answer.
function lastOptionValue(qid: QuestionId): AnswerValue {
  const opts = QUESTIONS[qid].options;
  return opts[opts.length - 1].value;
}

function ResultView({
  slideClass,
  answers,
  onBack,
  onRestart,
  liveRef
}: {
  slideClass: string;
  answers: Answers;
  onBack: () => void;
  onRestart: () => void;
  liveRef: React.RefObject<HTMLDivElement | null>;
}) {
  const result: Result = computeResult(answers);

  return (
    <div className={slideClass}>
      <div ref={liveRef} tabIndex={-1} role="status" className="outline-none">
        {/* Verdict box (teal tint, 3px left accent). */}
        <div className="rounded-card bg-low border-l-[3px] border-primary p-5 lg:p-6">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            Your result
          </p>
          <h2 className="mt-2 font-display font-semibold text-2xl lg:text-3xl text-ink leading-tight">
            {result.headline}
          </h2>
          <p className="mt-3 text-ink text-lg leading-relaxed">{result.verdict}</p>
          {result.deadline && (
            <p className="mt-3 text-ink/90 leading-relaxed">{result.deadline}</p>
          )}
        </div>
      </div>

      {/* Branch-specific caveat as a warn callout (no emoji glyph). */}
      {result.caveat && (
        <div className="mt-5 rounded-card border-l-[3px] border-accent bg-warn p-5">
          <div className="flex gap-3">
            <WarnGlyph />
            <div className="min-w-0">
              <p className="font-display font-semibold text-base text-accent-deep">
                One thing to double-check
              </p>
              <p className="mt-1 text-ink leading-relaxed">{result.caveat}</p>
            </div>
          </div>
        </div>
      )}

      {/* Tailored next steps. */}
      <div className="mt-6">
        <h3 className="font-display font-semibold text-xl text-ink">What to do next</h3>
        <ul className="mt-4 space-y-3">
          {result.nextSteps.map((step, i) => (
            <li
              key={i}
              className="flex gap-3 rounded-card border border-line bg-card p-4"
            >
              <CheckGlyph />
              <span className="text-ink leading-relaxed">{step}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Cross-links. */}
      <div className="mt-6 flex flex-wrap gap-2">
        <CrossLink href="/csrd" label="What is CSRD?" />
        <CrossLink href="/omnibus" label="The Omnibus changes" />
        <CrossLink href="/deadlines" label="Deadlines and status" />
        <CrossLink href="/double-materiality" label="Double materiality" />
        <CrossLink href="/suppliers" label="For suppliers" />
      </div>

      {/* Email-my-result capture -> POST /api/lead. */}
      <div className="mt-8">
        <ResultEmailCapture result={result} />
      </div>

      {/* Honest, muted caveat below the result. */}
      <p className="mt-6 text-sm text-muted leading-relaxed">
        This is guidance to help you orient, not a legal determination. CSRD is a
        directive transposed country by country, and some parts are still in flux.
        Confirm against the official sources we link or a qualified adviser.
      </p>

      <div className="mt-6 flex items-center gap-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 font-body font-medium text-primary link-underline"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="font-body font-medium text-muted link-underline"
        >
          Start over
        </button>
      </div>
    </div>
  );
}

function CrossLink({ href, label }: { href: string; label: string }) {
  return (
    <Button as="a" href={href} variant="secondary" className="text-sm">
      {label}
    </Button>
  );
}

// The result-emailing capture. POSTs to /api/lead with slug 'scope-checker'.
function ResultEmailCapture({ result }: { result: Result }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setStatus('error');
      setError(EMAIL_COPY.errorEmail);
      return;
    }
    setStatus('loading');
    setError('');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: 'scope-checker',
          email,
          result: result.summary,
          segment: result.segment
        })
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok) {
        setStatus('done');
        setEmail('');
      } else {
        setStatus('error');
        setError(data?.error || EMAIL_COPY.errorGeneric);
      }
    } catch {
      setStatus('error');
      setError(EMAIL_COPY.errorGeneric);
    }
  }

  return (
    <div className="relative overflow-hidden rounded-card bg-ink p-6 lg:p-8">
      <div className="relative z-10">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          The CSRD Brief
        </p>
        <h3 className="mt-2 font-display font-semibold text-xl lg:text-2xl text-paper">
          {EMAIL_COPY.heading}
        </h3>
        <p className="mt-2 text-paper/80 leading-relaxed">{EMAIL_COPY.subcopy}</p>

        {status === 'done' ? (
          <p
            role="status"
            className="mt-5 inline-flex items-center gap-2 rounded-md bg-paper/10 px-4 py-3 font-medium text-accent"
          >
            {EMAIL_COPY.success}
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="sc-email">
              Email address
            </label>
            <input
              id="sc-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={EMAIL_COPY.placeholder}
              className="min-h-[48px] flex-1 rounded-md border border-ink bg-ink-dark px-4 text-paper placeholder:text-paper/40 focus:outline focus:outline-2 focus:outline-accent focus:outline-offset-2"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="min-h-[48px] rounded-md bg-accent px-6 font-body font-semibold text-ink transition-[transform,box-shadow] duration-[var(--duration-base)] ease-[var(--ease-out)] hover:[transform:translateY(-2px)] hover:shadow-[var(--shadow-cta-hover)] active:scale-[0.97] disabled:opacity-50"
            >
              {status === 'loading' ? 'Sending...' : EMAIL_COPY.button}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p role="alert" className="mt-3 text-sm text-accent">
            {error}
          </p>
        )}
        <p className="mt-4 text-sm text-paper/70">{EMAIL_COPY.microtrust}</p>
      </div>
    </div>
  );
}
