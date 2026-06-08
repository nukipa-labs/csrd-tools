// Pure logic + content for the "Am I in scope?" CSRD applicability checker.
// No React here. The client component consumes these shapes.
// Post-Omnibus (Directive (EU) 2026/470). Every steer is honest and caveated:
// this is guidance, not a legal determination. National transposition is pending
// (deadline 19 March 2027) and the revised ESRS delegated act is not yet adopted.

export type AnswerValue = string;

export type Option = {
  value: AnswerValue;
  label: string;
  // optional one-line helper under the option label
  hint?: string;
};

export type Question = {
  id: QuestionId;
  // the heading (short mono step caption is derived from position)
  heading: string;
  // plain-English subtext under the heading
  subtext?: string;
  options: Option[];
  optional?: boolean;
};

export type QuestionId =
  | 'where'
  | 'eu_employees'
  | 'eu_turnover'
  | 'eu_wave1'
  | 'noneu_group_turnover'
  | 'noneu_presence';

export type Answers = Partial<Record<QuestionId, AnswerValue>>;

// ---------------------------------------------------------------------------
// The questions. Branching is computed in nextStep() below, not hard-wired in
// each option, so the flow stays honest and easy to reason about.
// ---------------------------------------------------------------------------

export const QUESTIONS: Record<QuestionId, Question> = {
  where: {
    id: 'where',
    heading: 'Where does your business sit relative to the EU?',
    subtext:
      'CSRD scope after the Omnibus turns first on what kind of entity you are. An EU undertaking is tested on its own size; a non-EU parent is tested on its EU footprint; a smaller supplier is usually out of mandatory scope but may be asked for data.',
    options: [
      {
        value: 'eu',
        label: 'We are an EU undertaking (a company established in an EU Member State)',
        hint: 'Tested on your own (or your EU group) employee and turnover thresholds.'
      },
      {
        value: 'non-eu',
        label: 'We are a non-EU parent or group with activity in the EU',
        hint: 'Tested on EU-generated turnover plus a qualifying EU subsidiary or branch.'
      },
      {
        value: 'supplier',
        label: 'We are a smaller company being asked for sustainability data',
        hint: 'A supplier or value-chain partner that a larger customer is requesting data from.'
      }
    ]
  },

  eu_employees: {
    id: 'eu_employees',
    heading: 'Does your business have more than 1,000 employees?',
    subtext:
      'Post-Omnibus, the EU employee gate is more than 1,000 employees (average over the financial year), measured at individual or group level. This is one of the two cumulative tests; both must be met.',
    options: [
      {
        value: 'over',
        label: 'Yes, more than 1,000 employees',
        hint: 'Counted as an average headcount over the financial year, at group level if you consolidate.'
      },
      {
        value: 'under',
        label: 'No, 1,000 employees or fewer',
        hint: 'At or below the headcount gate.'
      },
      {
        value: 'unsure',
        label: 'I am not sure',
        hint: 'We will show you how the test works either way.'
      }
    ]
  },

  eu_turnover: {
    id: 'eu_turnover',
    heading: 'Is your net turnover more than EUR 450 million?',
    subtext:
      'The second cumulative gate is net turnover above EUR 450 million, again at individual or group level. The old balance-sheet criterion was dropped: only employees and turnover decide the in-scope test now.',
    options: [
      {
        value: 'over',
        label: 'Yes, net turnover above EUR 450 million',
        hint: 'Group-level turnover if you prepare consolidated accounts.'
      },
      {
        value: 'under',
        label: 'No, EUR 450 million or less',
        hint: 'At or below the turnover gate.'
      },
      {
        value: 'unsure',
        label: 'I am not sure',
        hint: 'We will show you how the test works either way.'
      }
    ]
  },

  eu_wave1: {
    id: 'eu_wave1',
    optional: true,
    heading: 'Did your company already report under CSRD for FY2024 (former Wave 1)?',
    subtext:
      'Large public-interest entities with more than 500 employees (the old NFRD population) were "Wave 1" and reported for financial year 2024 in 2025. If you are above the new thresholds you keep reporting; if you have fallen below, the timing differs.',
    options: [
      {
        value: 'wave1-yes',
        label: 'Yes, we reported a sustainability statement for FY2024',
        hint: 'You are an existing reporter.'
      },
      {
        value: 'wave1-no',
        label: 'No, this would be our first time in scope',
        hint: 'Newly defined in-scope company.'
      },
      {
        value: 'wave1-unsure',
        label: 'I am not sure',
        hint: 'We will assume you are newly in scope and flag the alternative.'
      }
    ]
  },

  noneu_group_turnover: {
    id: 'noneu_group_turnover',
    heading: 'Does your group generate more than EUR 450 million net turnover in the EU?',
    subtext:
      'For a non-EU (third-country) parent, the first gate is EU-generated net turnover above EUR 450 million for two consecutive financial years (raised from EUR 150 million by the Omnibus).',
    options: [
      {
        value: 'over',
        label: 'Yes, more than EUR 450 million EU net turnover',
        hint: 'Measured for two consecutive years.'
      },
      {
        value: 'under',
        label: 'No, EUR 450 million or less in the EU',
        hint: 'Below the EU-turnover gate.'
      },
      {
        value: 'unsure',
        label: 'I am not sure',
        hint: 'We will show you how the test works either way.'
      }
    ]
  },

  noneu_presence: {
    id: 'noneu_presence',
    heading: 'Do you have a qualifying EU subsidiary or branch?',
    subtext:
      'The second gate for a non-EU parent is having either an EU subsidiary that is a large undertaking, or an EU branch with net turnover above EUR 200 million (raised from EUR 40 million by the Omnibus).',
    options: [
      {
        value: 'subsidiary',
        label: 'Yes, we have an EU subsidiary that is a large undertaking',
        hint: 'A large EU subsidiary inside the group.'
      },
      {
        value: 'branch',
        label: 'Yes, we have an EU branch with turnover above EUR 200 million',
        hint: 'A branch (not a subsidiary) above the EUR 200 million gate.'
      },
      {
        value: 'neither',
        label: 'No, neither of these applies',
        hint: 'No qualifying EU subsidiary or large EU branch.'
      },
      {
        value: 'unsure',
        label: 'I am not sure',
        hint: 'We will assume the gate is met and flag it to confirm.'
      }
    ]
  }
};

// Order of the *potential* full flow. Actual visible steps depend on branching.
export const FLOW_ORDER: QuestionId[] = [
  'where',
  'eu_employees',
  'eu_turnover',
  'eu_wave1',
  'noneu_group_turnover',
  'noneu_presence'
];

// ---------------------------------------------------------------------------
// Branching. Given the answers so far and the current question, return the next
// question id, or null when we have enough to show a result.
// ---------------------------------------------------------------------------

export function nextStep(current: QuestionId, answers: Answers): QuestionId | null {
  switch (current) {
    case 'where':
      if (answers.where === 'eu') return 'eu_employees';
      if (answers.where === 'non-eu') return 'noneu_group_turnover';
      // supplier path -> straight to result.
      return null;

    case 'eu_employees':
      // A clear "under" on either gate ends the EU mandatory test early.
      if (answers.eu_employees === 'under') return null;
      return 'eu_turnover';

    case 'eu_turnover':
      if (answers.eu_turnover === 'under') return null;
      // Both gates met (or unsure) -> ask the optional Wave 1 refiner.
      return 'eu_wave1';

    case 'eu_wave1':
      return null;

    case 'noneu_group_turnover':
      if (answers.noneu_group_turnover === 'under') return null;
      return 'noneu_presence';

    case 'noneu_presence':
      return null;

    default:
      return null;
  }
}

// The total number of steps the user will actually see, given their answers.
// Used for the "Step X of N" caption and the progress route line.
export function plannedSteps(answers: Answers): QuestionId[] {
  const steps: QuestionId[] = ['where'];
  let cur: QuestionId = 'where';
  for (;;) {
    const nxt = nextStep(cur, answers);
    if (nxt === null) break;
    steps.push(nxt);
    cur = nxt;
    if (steps.length > FLOW_ORDER.length) break; // safety
  }
  return steps;
}

// ---------------------------------------------------------------------------
// Result computation.
// ---------------------------------------------------------------------------

export type Segment =
  | 'eu-in'
  | 'eu-out'
  | 'eu-unsure'
  | 'noneu-in'
  | 'noneu-out'
  | 'supplier';

export type Result = {
  segment: Segment;
  // The plain-English verdict shown in the verdict box.
  verdict: string;
  // Short label used for the email payload + result heading.
  headline: string;
  // Tailored checklist of next steps.
  nextSteps: string[];
  // A "when do you report" line, when one applies.
  deadline?: string;
  // A one-line caveat specific to this branch (rendered as a warn callout).
  caveat?: string;
  // A compact summary string sent to /api/lead as `result`.
  summary: string;
};

// Shared closing caveat steps for every branch.
const TRANSPOSITION_NOTE =
  'Confirm against your Member State. CSRD is a directive; the new thresholds must be transposed into national law by 19 March 2027, and penalties and any transition options are set country by country.';
const ESRS_FLUX_NOTE =
  'Watch the moving parts. The revised "ESRS 2.0" delegated act (with roughly 60 to 70 percent fewer mandatory datapoints) is still in consultation and not yet adopted. Subscribe to The CSRD Brief so you hear when it lands.';

export function computeResult(answers: Answers): Result {
  const {
    where,
    eu_employees,
    eu_turnover,
    eu_wave1,
    noneu_group_turnover,
    noneu_presence
  } = answers;

  // ---------------------------------------------------------------------
  // 1. Supplier path: usually out of mandatory scope, but asked for data.
  // ---------------------------------------------------------------------
  if (where === 'supplier') {
    return {
      segment: 'supplier',
      headline: 'You are likely out of mandatory CSRD scope, but data requests still reach you',
      verdict:
        'Smaller companies are not in mandatory CSRD scope after the Omnibus. If a larger customer asks you for sustainability data, the value-chain cap protects you: an in-scope company may not demand information beyond the voluntary VSME standard from value-chain partners with fewer than 1,000 employees.',
      nextSteps: [
        'Use the value-chain cap. If a request goes beyond the VSME data points, you can decline the excess and point the customer to the cap. You only have to provide VSME-level information at most.',
        'Consider reporting voluntarily with VSME. The Voluntary SME standard is a lighter, proportionate format that satisfies most customer and lender requests in one place.',
        'See our suppliers hub for copy-paste response templates you can send when a customer asks for more than VSME allows.',
        ESRS_FLUX_NOTE
      ],
      caveat:
        'If you are part of a larger group that itself exceeds 1,000 employees and EUR 450 million turnover, the group may be in scope even though your entity is small. Run the EU path with your group numbers to check.',
      summary:
        'Smaller supplier: out of mandatory CSRD scope. Value-chain cap limits data requests to VSME level. Advised to consider voluntary VSME and use response templates.'
    };
  }

  // ---------------------------------------------------------------------
  // 2. Non-EU parent path.
  // ---------------------------------------------------------------------
  if (where === 'non-eu') {
    // Clear "out": group EU turnover at or below 450m.
    if (noneu_group_turnover === 'under') {
      return {
        segment: 'noneu-out',
        headline: 'CSRD likely does not apply to your group',
        verdict:
          'Based on your answers, the third-country (non-EU) reporting rules likely do not apply, because your group does not generate more than EUR 450 million of net turnover in the EU. Without that EU-turnover threshold, the non-EU parent obligation is not triggered.',
        nextSteps: [
          'Re-check if your EU turnover is close to EUR 450 million or growing. The test looks at two consecutive financial years, so a borderline group can move into scope.',
          'Remember individual EU subsidiaries are tested separately. A large EU subsidiary in your group could still be in scope in its own right on the EU thresholds (more than 1,000 employees and EUR 450 million turnover).',
          TRANSPOSITION_NOTE,
          ESRS_FLUX_NOTE
        ],
        summary:
          'Non-EU parent: likely out of scope (EU net turnover at or below EUR 450m). Advised to test EU subsidiaries separately on the EU thresholds.'
      };
    }

    // Clear "out": no qualifying EU subsidiary or branch.
    if (noneu_presence === 'neither') {
      return {
        segment: 'noneu-out',
        headline: 'CSRD likely does not apply to your group',
        verdict:
          'Based on your answers, the non-EU parent rule likely does not apply, because you do not have a qualifying EU presence: neither an EU subsidiary that is a large undertaking nor an EU branch with net turnover above EUR 200 million. Both the EU-turnover gate and a qualifying presence are needed.',
        nextSteps: [
          'Re-check your EU structure. A subsidiary that grows into a large undertaking, or a branch that passes EUR 200 million turnover, would bring the group into scope.',
          'Individual large EU subsidiaries can still be in scope on their own EU thresholds even where the group rule does not bite.',
          TRANSPOSITION_NOTE,
          ESRS_FLUX_NOTE
        ],
        summary:
          'Non-EU parent: likely out of scope (no qualifying EU subsidiary or branch above EUR 200m). Advised to monitor EU presence.'
      };
    }

    // In scope (both gates met, or unsure on a gate we treat as met).
    const unsureGate =
      noneu_group_turnover === 'unsure' || noneu_presence === 'unsure';
    const presenceWord =
      noneu_presence === 'branch'
        ? 'an EU branch with turnover above EUR 200 million'
        : 'a large EU subsidiary';
    return {
      segment: 'noneu-in',
      headline: 'Your group is likely in scope under the non-EU parent rule',
      verdict: `Based on your answers, the third-country reporting rules likely apply: your group generates more than EUR 450 million of net turnover in the EU and has ${presenceWord}. You would report a consolidated sustainability statement at group level under the dedicated standards for non-EU groups (N-ESRS).`,
      deadline:
        'First reporting for non-EU groups is for financial year 2028, with the first report published in 2029.',
      nextSteps: [
        'Plan for FY2028 reporting (first report in 2029) under the non-EU group rules, using the N-ESRS once they are finalised. This gives you lead time to build data systems now.',
        'Decide who reports. The obligation is met at group level, typically published by, or on behalf of, a designated EU subsidiary or branch.',
        'Start the double materiality work early. Run a double materiality assessment to scope which topics you must disclose, and build a GHG inventory for the climate (E1) numbers. Use our materiality matrix builder and emissions calculator to get going.',
        TRANSPOSITION_NOTE,
        ESRS_FLUX_NOTE
      ],
      caveat: unsureGate
        ? 'You were not certain on one of the gates. The non-EU rule needs both more than EUR 450 million EU net turnover (two consecutive years) and a qualifying EU subsidiary or branch. Confirm both before you act on this steer.'
        : undefined,
      summary: `Non-EU parent: likely in scope (EU net turnover above EUR 450m plus ${presenceWord}). First report FY2028 (published 2029) via N-ESRS.`
    };
  }

  // ---------------------------------------------------------------------
  // 3. EU undertaking path.
  // ---------------------------------------------------------------------
  // Clear "out" if either gate is answered "under".
  if (eu_employees === 'under' || eu_turnover === 'under') {
    const gate =
      eu_employees === 'under'
        ? 'you have 1,000 employees or fewer'
        : 'your net turnover is EUR 450 million or less';
    return {
      segment: 'eu-out',
      headline: 'You are likely out of mandatory CSRD scope',
      verdict: `Based on your answers, mandatory CSRD likely does not apply, because ${gate}. The post-Omnibus test is cumulative: you are only in scope if you exceed both more than 1,000 employees and more than EUR 450 million net turnover. Missing either gate keeps you out.`,
      nextSteps: [
        'Consider reporting voluntarily with VSME. The Voluntary SME standard is a proportionate way to answer investor, lender and customer requests without the full ESRS burden.',
        'You can push back on oversized data requests. Under the value-chain cap, an in-scope customer may not demand more than VSME-level data from value-chain partners with fewer than 1,000 employees.',
        'Re-check if you are near a threshold or growing. Crossing both gates in two consecutive years would bring you into mandatory scope from the following financial year.',
        TRANSPOSITION_NOTE,
        ESRS_FLUX_NOTE
      ],
      caveat:
        'If you prepare consolidated group accounts, apply the test at group level, not just the single entity. A small parent of a large group can still be in scope.',
      summary: `EU undertaking: likely out of mandatory scope (${gate}; the test needs both gates). Advised to consider voluntary VSME and use the value-chain cap.`
    };
  }

  // Unsure on a gate: we cannot give a clean verdict, so explain the test.
  if (eu_employees === 'unsure' || eu_turnover === 'unsure') {
    return {
      segment: 'eu-unsure',
      headline: 'You are on the boundary: confirm both thresholds to be sure',
      verdict:
        'You were not certain on at least one gate, so we cannot give a clean verdict. The post-Omnibus test is simple but cumulative: an EU undertaking is in mandatory CSRD scope only if it exceeds both more than 1,000 employees (average over the year) and more than EUR 450 million net turnover, measured at individual or group level.',
      nextSteps: [
        'Confirm your average employee count over the financial year, at group level if you consolidate. The gate is more than 1,000.',
        'Confirm your net turnover, again at group level if you prepare consolidated accounts. The gate is more than EUR 450 million.',
        'If you exceed both, you are likely in scope and would first report for financial year 2027 (published 2028). If you miss either, you are likely out and can use voluntary VSME.',
        TRANSPOSITION_NOTE,
        ESRS_FLUX_NOTE
      ],
      summary:
        'EU undertaking: borderline (employee or turnover figure unconfirmed). In scope only if both gates exceeded (more than 1,000 employees AND more than EUR 450m turnover).'
    };
  }

  // Both gates met -> in scope. Refine timing by Wave 1 status.
  const wasWave1 = eu_wave1 === 'wave1-yes';
  if (wasWave1) {
    return {
      segment: 'eu-in',
      headline: 'You are in scope and continue reporting',
      verdict:
        'Based on your answers, you exceed both thresholds (more than 1,000 employees and more than EUR 450 million net turnover) and you already reported for FY2024 as a former Wave 1 entity. You stay in scope and continue to publish a sustainability statement under the ESRS, based on your double materiality assessment, with limited assurance.',
      deadline:
        'You already report annually. Apply the simplified ESRS once adopted: from FY2027, with voluntary early use for FY2026.',
      nextSteps: [
        'Keep reporting under the ESRS. Refresh your double materiality assessment and your GHG inventory (Scopes 1, 2 and 3) each cycle.',
        'Plan to adopt the revised ESRS. The simplified set applies from FY2027, and you may apply it voluntarily for FY2026, which can cut your datapoint load substantially.',
        'Maintain limited assurance. The planned move to reasonable assurance was removed by the Omnibus, so limited assurance remains the ceiling.',
        'Keep your tooling current. Use our materiality matrix builder and emissions calculator to keep the double materiality and E1 numbers moving between cycles.',
        TRANSPOSITION_NOTE,
        ESRS_FLUX_NOTE
      ],
      summary:
        'EU undertaking, former Wave 1, still above thresholds: in scope and continuing. Adopt simplified ESRS from FY2027 (optional FY2026). Limited assurance.'
    };
  }

  // Newly in-scope (or unsure about Wave 1, treated as new).
  const unsureWave1 = eu_wave1 === 'wave1-unsure' || eu_wave1 === undefined;
  return {
    segment: 'eu-in',
    headline: 'You are likely in scope under CSRD',
    verdict:
      'Based on your answers, mandatory CSRD likely applies: you exceed both thresholds, more than 1,000 employees and more than EUR 450 million net turnover. You would prepare a sustainability statement under the ESRS, scoped by a double materiality assessment, digitally tagged, and subject to limited assurance.',
    deadline:
      'As a newly defined in-scope company, your first reporting is for financial year 2027, with the first report published in 2028.',
    nextSteps: [
      'Run a double materiality assessment first. It decides which topical ESRS (E1 to E5, S1 to S4, G1) you must disclose. ESRS 2 general disclosures apply regardless. Our materiality matrix builder helps you plot and prioritise topics.',
      'Build a GHG inventory for ESRS E1. Climate is material for almost everyone, so start measuring Scopes 1, 2 and 3 now. Our emissions calculator gives you a first indicative estimate.',
      'Plan the format and assurance. Reports are digitally tagged (Inline XBRL under ESEF) and need limited assurance; the planned move to reasonable assurance was dropped.',
      'Use the FY2027 lead time. You report first for financial year 2027 (published 2028), so the time to build data foundations is now, and you can apply the simplified ESRS from FY2027 (voluntarily for FY2026).',
      TRANSPOSITION_NOTE,
      ESRS_FLUX_NOTE
    ],
    caveat: unsureWave1
      ? 'If your company already reported for FY2024 (former Wave 1), you are an existing reporter rather than newly in scope, and you simply continue. Either way the substantive work, double materiality, GHG inventory and E1, is the same.'
      : undefined,
    summary:
      'EU undertaking, newly in scope (both gates exceeded): first report FY2027 (published 2028). Double materiality assessment, GHG inventory/E1, Inline XBRL, limited assurance.'
  };
}
