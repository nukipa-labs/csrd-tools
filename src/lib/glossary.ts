// CSRD / ESG glossary terms. Plain-English first, then the precise/legal phrasing.
// Grounded in research/01-regulation.md and research/02-topics.md, reflecting the
// post-Omnibus picture as of mid-2026 (final Omnibus I = Directive (EU) 2026/470).
// Used by /glossary (DefinedTerm schema) and linkable from the /csrd pillar.

export type GlossaryTerm = {
  slug: string;
  term: string;
  /** Plain-English definition, shown first. */
  plain: string;
  /** The precise / legal phrasing, shown in muted text below. Optional. */
  formal?: string;
  /** Related term slugs. */
  seeAlso?: string[];
};

export const GLOSSARY: GlossaryTerm[] = [
  {
    slug: 'csrd',
    term: 'CSRD',
    plain:
      'The Corporate Sustainability Reporting Directive. The EU law that makes large companies report standardised, audited information about their environmental, social and governance impacts, risks and opportunities - alongside their financial statements.',
    formal:
      'Directive (EU) 2022/2464, in force 5 January 2023. It replaced the Non-Financial Reporting Directive (NFRD) and amends the Accounting Directive (2013/34/EU). Companies report using the ESRS, based on a double materiality assessment, with limited assurance and digital tagging.',
    seeAlso: ['nfrd', 'esrs', 'double-materiality', 'omnibus', 'accounting-directive']
  },
  {
    slug: 'esrs',
    term: 'ESRS',
    plain:
      'The European Sustainability Reporting Standards. The detailed rulebook companies use to report under the CSRD - it sets out exactly what to disclose and how. There are 12 standards: 2 cross-cutting plus 10 topical.',
    formal:
      'European Sustainability Reporting Standards developed by EFRAG and adopted by the Commission. The first set is Delegated Regulation (EU) 2023/2772 (applicable FY2024): ESRS 1 and 2 (cross-cutting) plus E1-E5, S1-S4 and G1. A revised set is in consultation (draft 6 May 2026), cutting datapoints by roughly 60-70%.',
    seeAlso: ['csrd', 'n-esrs', 'vsme', 'datapoint', 'efrag', 'double-materiality']
  },
  {
    slug: 'nfrd',
    term: 'NFRD',
    plain:
      'The Non-Financial Reporting Directive, the older EU law that the CSRD replaced. It covered fewer companies (large public-interest entities with more than 500 employees) and required only high-level, largely unstandardised disclosure.',
    formal:
      'Directive 2014/95/EU. It covered around 11,700 large public-interest entities and was repealed and dramatically expanded by the CSRD, which added the ESRS, mandatory assurance and digital tagging.',
    seeAlso: ['csrd', 'pie', 'accounting-directive']
  },
  {
    slug: 'double-materiality',
    term: 'Double materiality',
    plain:
      'The core principle of CSRD reporting. You report a sustainability topic if it matters from either of two angles: how your business affects people and the planet (impact), or how sustainability issues affect your business financially (financial). Either one is enough.',
    formal:
      'The requirement to assess each sustainability matter from an impact perspective ("inside-out") and a financial perspective ("outside-in"), and to disclose it if it is material under either. The defining methodological feature of the ESRS, retained by the Omnibus.',
    seeAlso: ['impact-materiality', 'financial-materiality', 'dma', 'iro', 'esrs']
  },
  {
    slug: 'impact-materiality',
    term: 'Impact materiality',
    plain:
      'The "inside-out" half of double materiality: how your business affects people and the environment, for better or worse, across your own operations and your value chain.',
    formal:
      'A sustainability matter is material from an impact perspective when it relates to the company actual or potential, positive or negative impacts on people or the environment over the short, medium or long term, including through its value chain.',
    seeAlso: ['double-materiality', 'financial-materiality', 'value-chain', 'iro']
  },
  {
    slug: 'financial-materiality',
    term: 'Financial materiality',
    plain:
      'The "outside-in" half of double materiality: how sustainability issues create financial risks and opportunities for your business - things that could affect cash flow, performance, position or access to finance.',
    formal:
      'A sustainability matter is material from a financial perspective when it triggers or could trigger material financial effects on the company - risks and opportunities affecting development, performance, position, cost of capital or access to finance over the short, medium or long term.',
    seeAlso: ['double-materiality', 'impact-materiality', 'iro']
  },
  {
    slug: 'dma',
    term: 'Double materiality assessment (DMA)',
    plain:
      'The mandatory first step of CSRD reporting. You work out which sustainability topics matter - by impact, finance or both - and that result decides which ESRS topical disclosures you actually have to make.',
    formal:
      'The process of identifying sustainability matters relevant to the business and value chain, engaging stakeholders, translating matters into impacts, risks and opportunities (IROs), scoring them against thresholds, and determining the material topics that drive disclosure scope. ESRS 2 disclosures apply regardless of the result.',
    seeAlso: ['double-materiality', 'iro', 'materiality-matrix', 'esrs', 'value-chain']
  },
  {
    slug: 'iro',
    term: 'IRO (impacts, risks and opportunities)',
    plain:
      'The building blocks of a materiality assessment. You translate each candidate topic into concrete impacts (on people and planet), risks and opportunities (for your business), then score them to decide what is material.',
    formal:
      'Impacts, Risks and Opportunities. Impacts feed impact materiality; risks and opportunities feed financial materiality. ESRS distinguishes actual vs potential, positive vs negative, and where in the value chain each IRO sits.',
    seeAlso: ['dma', 'double-materiality', 'impact-materiality', 'financial-materiality']
  },
  {
    slug: 'materiality-matrix',
    term: 'Materiality matrix',
    plain:
      'The visual output of a materiality assessment - a chart plotting topics by importance. Under CSRD double materiality, one axis is impact materiality and the other is financial materiality. It is a helpful presentation aid, not a CSRD requirement.',
    formal:
      'An optional visualisation that plots sustainability topics by impact score and financial score. CSRD requires a documented, IRO-based assessment, not a matrix; many companies now use ranked tables or heat maps instead, because a quadrant can imply a topic is "not material" when it crosses a threshold on one axis.',
    seeAlso: ['dma', 'double-materiality', 'iro']
  },
  {
    slug: 'vsme',
    term: 'VSME',
    plain:
      'The Voluntary standard for SMEs. A lighter, optional reporting standard for smaller companies that are not required to report under the CSRD - and the ceiling on what large companies can demand from small value-chain partners.',
    formal:
      'The Voluntary SME standard developed by EFRAG, adopted as a Commission Recommendation in late 2025 with a delegated act expected around mid-2026. It acts as the cap for sustainability data requests to value-chain partners with fewer than 1,000 employees.',
    seeAlso: ['value-chain-cap', 'esrs', 'omnibus', 'efrag']
  },
  {
    slug: 'n-esrs',
    term: 'N-ESRS (non-EU group standard)',
    plain:
      'A separate ESRS being developed for non-EU (third-country) parent companies that fall into CSRD scope through their EU business. It tailors the reporting to a group whose head office sits outside the EU.',
    formal:
      'The sustainability reporting standard for third-country undertakings under the CSRD, being developed by EFRAG. It applies to non-EU groups exceeding the EU turnover threshold with a qualifying EU subsidiary or branch; first reporting for those groups is FY2028 (reports in 2029).',
    seeAlso: ['esrs', 'csrd', 'efrag']
  },
  {
    slug: 'pie',
    term: 'Public-interest entity (PIE)',
    plain:
      'A company whose activities make it of significant public interest - typically listed companies, banks and insurers. PIEs with more than 500 employees were the first wave to report under the CSRD (for FY2024).',
    formal:
      'An undertaking defined as a public-interest entity under the Accounting Directive (2013/34/EU): EU-listed companies, credit institutions, insurance undertakings, and others designated by Member States. Large PIEs with more than 500 employees (the former NFRD population) reported first, for FY2024.',
    seeAlso: ['csrd', 'nfrd', 'accounting-directive']
  },
  {
    slug: 'limited-assurance',
    term: 'Limited assurance',
    plain:
      'The level of independent checking your sustainability statement must pass. The assurer reviews the report and concludes nothing has come to their attention suggesting it is materially misstated - a lighter check than a full financial audit.',
    formal:
      'The assurance level required on the CSRD sustainability statement, provided by a statutory auditor or, where a Member State allows, an independent assurance services provider. The Omnibus made limited assurance the permanent ceiling; the planned move to reasonable assurance was removed.',
    seeAlso: ['reasonable-assurance', 'csrd', 'omnibus']
  },
  {
    slug: 'reasonable-assurance',
    term: 'Reasonable assurance',
    plain:
      'A higher level of independent checking, closer to a financial audit, where the assurer gives a positive opinion that the report is fairly stated. The CSRD once envisaged moving up to this - but the Omnibus dropped that plan.',
    formal:
      'The higher assurance standard (positive opinion) the original CSRD flagged as a possible future step beyond limited assurance. The Omnibus I Directive removed the escalation; limited assurance is now the fixed ceiling. An EU assurance standard (ISSA 5000-aligned) is expected around 1 July 2027.',
    seeAlso: ['limited-assurance', 'omnibus', 'csrd']
  },
  {
    slug: 'xbrl-esef',
    term: 'XBRL / ESEF',
    plain:
      'The digital format the CSRD report must use. The statement is prepared in XHTML and "tagged" with Inline XBRL so machines can read the data, under the EU single electronic format rules.',
    formal:
      'The European Single Electronic Format (ESEF): the sustainability statement is prepared in XHTML and digitally tagged using Inline XBRL. EFRAG published the ESRS XBRL taxonomy; ESMA embeds it into ESEF technical standards. A separate Article 8 taxonomy handles EU Taxonomy tagging.',
    seeAlso: ['esap', 'esrs', 'eu-taxonomy', 'efrag']
  },
  {
    slug: 'esap',
    term: 'ESAP',
    plain:
      'The European Single Access Point - a planned EU-wide public database where the digitally tagged sustainability (and financial) information companies file will be gathered in one searchable place.',
    formal:
      'The European Single Access Point, a centralised EU platform for public financial and sustainability information. The machine-readable CSRD statements tagged under ESEF / Inline XBRL are intended to feed ESAP.',
    seeAlso: ['xbrl-esef', 'csrd']
  },
  {
    slug: 'eu-taxonomy',
    term: 'EU Taxonomy',
    plain:
      'The EU classification system for which economic activities count as environmentally sustainable. CSRD companies report the share of their turnover, capital spending and operating spending that is Taxonomy-eligible and Taxonomy-aligned.',
    formal:
      'Regulation (EU) 2020/852. It sets six environmental objectives and, via Article 8, requires in-scope companies to disclose the proportion of turnover, CapEx and OpEx associated with eligible and aligned activities. The Omnibus simplified Taxonomy reporting (higher thresholds, fewer templates).',
    seeAlso: ['eligibility-vs-alignment', 'dnsh', 'minimum-safeguards', 'technical-screening-criteria', 'csrd']
  },
  {
    slug: 'eligibility-vs-alignment',
    term: 'Eligibility vs alignment',
    plain:
      'Two stages of the EU Taxonomy. "Eligible" just means an activity is on the Taxonomy list. "Aligned" means it also meets the bar: it substantially contributes to an objective, does no significant harm to the others, and respects minimum safeguards.',
    formal:
      'Eligible = the activity is described in the Taxonomy delegated acts (it has technical screening criteria). Aligned = the activity meets its technical screening criteria, satisfies the Do No Significant Harm test on the other objectives, and complies with the minimum safeguards.',
    seeAlso: ['eu-taxonomy', 'technical-screening-criteria', 'dnsh', 'minimum-safeguards']
  },
  {
    slug: 'dnsh',
    term: 'DNSH (Do No Significant Harm)',
    plain:
      'A test inside the EU Taxonomy. To count as sustainable, an activity that helps one environmental objective must not seriously damage any of the other five - for example a wind farm that harms biodiversity would fail.',
    formal:
      'The Do No Significant Harm criterion under the EU Taxonomy: an activity that substantially contributes to one of the six environmental objectives must not significantly harm any of the others, per the conditions in the delegated acts. One of the three tests for Taxonomy alignment.',
    seeAlso: ['eu-taxonomy', 'eligibility-vs-alignment', 'technical-screening-criteria', 'minimum-safeguards']
  },
  {
    slug: 'minimum-safeguards',
    term: 'Minimum safeguards',
    plain:
      'The social condition for EU Taxonomy alignment. Even a green activity only counts as sustainable if the company runs proper due diligence on human rights, labour, anti-corruption, tax and fair competition.',
    formal:
      'The minimum (social) safeguards under Article 18 of the EU Taxonomy: due-diligence processes aligned with the OECD Guidelines for Multinational Enterprises and the UN Guiding Principles on Business and Human Rights, covering human rights, labour, anti-corruption and bribery, taxation, and fair competition.',
    seeAlso: ['eu-taxonomy', 'eligibility-vs-alignment', 'dnsh']
  },
  {
    slug: 'technical-screening-criteria',
    term: 'Technical screening criteria',
    plain:
      'The detailed, activity-by-activity rules in the EU Taxonomy that say exactly how well an activity must perform to count as substantially contributing to an environmental objective.',
    formal:
      'Technical Screening Criteria (TSC): the quantitative and qualitative thresholds set out in the Taxonomy delegated acts that define substantial contribution to an environmental objective (and the related DNSH conditions) for each economic activity.',
    seeAlso: ['eu-taxonomy', 'eligibility-vs-alignment', 'dnsh']
  },
  {
    slug: 'ghg-protocol',
    term: 'GHG Protocol',
    plain:
      'The world most widely used carbon-accounting framework. It provides the standard method for measuring corporate greenhouse-gas emissions and defines the three "scopes". ESRS E1 is built on it.',
    formal:
      'The Greenhouse Gas Protocol, developed by the World Resources Institute (WRI) and the World Business Council for Sustainable Development (WBCSD). Its Corporate Standard, Scope 3 Standard and Scope 2 Guidance underpin ESRS E1-6, which requires emissions measured in line with the GHG Protocol (or ISO 14064-1).',
    seeAlso: ['scope-1', 'scope-2', 'scope-3', 'greenhouse-gas-inventory']
  },
  {
    slug: 'scope-1',
    term: 'Scope 1 emissions',
    plain:
      'Direct emissions from sources a company owns or controls - fuel burned in its boilers, furnaces and vehicles, process emissions, and refrigerant or fugitive leaks.',
    formal:
      'Direct greenhouse-gas emissions from sources owned or controlled by the company, under the GHG Protocol. Disclosed gross under ESRS E1-6.',
    seeAlso: ['scope-2', 'scope-3', 'ghg-protocol', 'greenhouse-gas-inventory']
  },
  {
    slug: 'scope-2',
    term: 'Scope 2 emissions',
    plain:
      'Indirect emissions from the energy a company buys and uses - electricity, steam, heating and cooling. CSRD requires it reported two ways: location-based (the local grid mix) and market-based (the energy you contractually buy).',
    formal:
      'Indirect emissions from purchased electricity, steam, heating and cooling. Location-based uses the average grid emission factor for the region; market-based reflects contractual instruments (PPAs, RECs/GOs, green tariffs). ESRS E1-6 requires both.',
    seeAlso: ['scope-1', 'scope-3', 'ghg-protocol']
  },
  {
    slug: 'scope-3',
    term: 'Scope 3 emissions',
    plain:
      'All other indirect emissions across the value chain, upstream and downstream - usually the biggest part of a company footprint (often 70 to 90 percent). Split into 15 categories such as purchased goods, business travel and use of sold products.',
    formal:
      'Indirect value-chain emissions under the GHG Protocol Corporate Value Chain (Scope 3) Standard, across 15 categories (8 upstream, 7 downstream). ESRS E1-6 requires Scope 3 across the relevant categories where climate is material; phase-in reliefs allow deferral in the first year and for companies under 750 employees.',
    seeAlso: ['scope-1', 'scope-2', 'ghg-protocol', 'value-chain', 'greenhouse-gas-inventory']
  },
  {
    slug: 'greenhouse-gas-inventory',
    term: 'Greenhouse gas inventory',
    plain:
      'A structured account of all the greenhouse-gas emissions a company is responsible for in a reporting period. It is the foundation behind every climate target and the ESRS E1-6 emissions disclosure.',
    formal:
      'A GHG inventory built per the GHG Protocol Corporate Standard: set organisational boundaries (operational control, financial control or equity share), set operational boundaries (Scopes 1/2/3), choose a base year, collect activity data, apply emission factors, and calculate emissions = activity data x emission factor.',
    seeAlso: ['ghg-protocol', 'scope-1', 'scope-2', 'scope-3']
  },
  {
    slug: 'transition-plan',
    term: 'Transition plan',
    plain:
      'A company plan to align its business model and strategy with the climate transition - cutting emissions in line with limiting warming to 1.5 degrees C and reaching climate neutrality by 2050. ESRS E1 asks whether you have one; if not, you must say so.',
    formal:
      'A climate transition plan under ESRS E1-1: disclosure of whether the company has a plan to align its business model and strategy with limiting global warming to 1.5 degrees C and reaching climate neutrality by 2050 in line with EU climate law, including decarbonisation levers and targets.',
    seeAlso: ['scope-1', 'scope-2', 'scope-3', 'esrs']
  },
  {
    slug: 'value-chain',
    term: 'Value chain',
    plain:
      'Everything connected to your business beyond your own four walls - your suppliers upstream and your customers and product use downstream. CSRD reporting and materiality must look across the whole chain, not just your own operations.',
    formal:
      'The full range of activities, resources and relationships related to a company business model and external environment, upstream and downstream. ESRS requires impacts, risks and opportunities to be assessed across the value chain, subject to the value-chain cap.',
    seeAlso: ['value-chain-cap', 'scope-3', 'double-materiality', 'dma']
  },
  {
    slug: 'value-chain-cap',
    term: 'Value-chain cap',
    plain:
      'A protection for smaller suppliers. An in-scope company may not demand sustainability data beyond the voluntary VSME standard from value-chain partners that have fewer than 1,000 employees - so small suppliers cannot be buried in reporting requests.',
    formal:
      'The Omnibus limit ("trickle-down" protection): companies in CSRD scope may not require sustainability information beyond what the VSME standard specifies from value-chain partners with fewer than 1,000 employees.',
    seeAlso: ['vsme', 'value-chain', 'omnibus']
  },
  {
    slug: 'omnibus',
    term: 'Omnibus',
    plain:
      'The EU simplification package that amended the CSRD, the EU Taxonomy and the due-diligence directive to cut reporting burden. It sharply narrowed who has to report and made the standards lighter. Beware: "Omnibus" can mean three different things.',
    formal:
      'The final Omnibus I Directive (EU) 2026/470 (OJ 26 Feb 2026; in force 18 March 2026; CSRD transposition deadline 19 March 2027). Distinct from the February 2025 proposal and from the "stop-the-clock" Directive (EU) 2025/794. It set the new scope (more than 1,000 employees AND more than EUR 450m turnover), removed listed SMEs, capped value-chain requests and fixed limited assurance.',
    seeAlso: ['stop-the-clock', 'csrd', 'value-chain-cap', 'vsme', 'limited-assurance']
  },
  {
    slug: 'stop-the-clock',
    term: 'Stop-the-clock',
    plain:
      'The quick EU fix that pressed pause on CSRD deadlines while the bigger simplification was negotiated. It delayed the not-yet-reporting waves by two years - it did not change the thresholds, only the timing.',
    formal:
      'Directive (EU) 2025/794 (OJ 16 April 2025; in force 17 April 2025). It postponed CSRD Waves 2 and 3 (and the CSDDD) by two years to buy time for the substantive Omnibus. It changed timing only, not scope or content.',
    seeAlso: ['omnibus', 'csrd']
  },
  {
    slug: 'efrag',
    term: 'EFRAG',
    plain:
      'The body that writes the ESRS for the EU. EFRAG develops the standards as the Commission technical adviser; the Commission then turns them into law. EFRAG proposes, the Commission enacts.',
    formal:
      'The European Financial Reporting Advisory Group, the Commission technical adviser on sustainability reporting. EFRAG developed the ESRS, the VSME standard and the ESRS XBRL taxonomy, and delivered technical advice (3 Dec 2025) for the revised, simplified ESRS.',
    seeAlso: ['esrs', 'vsme', 'xbrl-esef']
  },
  {
    slug: 'issb',
    term: 'ISSB / IFRS S1 & S2',
    plain:
      'The global investor-focused sustainability standards from the IFRS Foundation. S1 covers general sustainability and S2 covers climate. They use single (financial) materiality, unlike the CSRD double materiality, but the two are designed to interoperate.',
    formal:
      'The International Sustainability Standards Board and its standards IFRS S1 (general) and IFRS S2 (climate). Financial-materiality only. EFRAG and the ISSB published interoperability guidance, and the ESRS XBRL taxonomy was built to be compatible with IFRS S1/S2.',
    seeAlso: ['tcfd', 'gri', 'esrs', 'financial-materiality']
  },
  {
    slug: 'gri',
    term: 'GRI',
    plain:
      'The Global Reporting Initiative - the longest-established, most widely used voluntary sustainability standard. It focuses on impact materiality and a broad stakeholder audience, and was a major input to the ESRS.',
    formal:
      'The Global Reporting Initiative standards: voluntary, impact-oriented, multi-stakeholder. EFRAG and GRI worked toward high interoperability, so GRI reporters find significant overlap with ESRS impact disclosures.',
    seeAlso: ['issb', 'esrs', 'impact-materiality']
  },
  {
    slug: 'tcfd',
    term: 'TCFD',
    plain:
      'The Task Force on Climate-related Financial Disclosures - a climate framework built on four pillars (governance, strategy, risk management, metrics and targets). It has been disbanded and absorbed into ISSB IFRS S2 and reflected in the ESRS structure.',
    formal:
      'The Task Force on Climate-related Financial Disclosures. Its four-pillar recommendations are absorbed into ISSB IFRS S2 and reflected in ESRS 2 and E1. The TCFD was wound down and its monitoring transferred to the ISSB.',
    seeAlso: ['issb', 'esrs']
  },
  {
    slug: 'sfdr',
    term: 'SFDR',
    plain:
      'The Sustainable Finance Disclosure Regulation - the EU rules that make financial-market players (fund managers, advisers) disclose how sustainable their products are. It is the financial-product leg that sits alongside CSRD and the EU Taxonomy.',
    formal:
      'Regulation (EU) 2019/2088 on sustainability-related disclosures in the financial services sector. Part of the EU sustainable-finance framework alongside the CSRD (corporate disclosure) and the EU Taxonomy (defining "green").',
    seeAlso: ['eu-taxonomy', 'csrd', 'the-green-deal']
  },
  {
    slug: 'accounting-directive',
    term: 'Accounting Directive',
    plain:
      'The core EU law on company financial statements. Both the NFRD and the CSRD work by amending it - which is why CSRD reporting sits inside the management report rather than in a separate document.',
    formal:
      'Directive 2013/34/EU on the annual financial statements of certain types of undertakings. The CSRD (and previously the NFRD) operate as amendments to it; the sustainability statement forms part of the management report.',
    seeAlso: ['csrd', 'nfrd', 'pie']
  },
  {
    slug: 'the-green-deal',
    term: 'The Green Deal',
    plain:
      'The EU overarching plan to make Europe climate-neutral by 2050. The CSRD is one of its cornerstones: reliable, comparable sustainability data is meant to help steer money toward sustainable activities.',
    formal:
      'The European Green Deal, the EU growth strategy for climate neutrality by 2050. The CSRD supplies the corporate-disclosure leg of the sustainable-finance framework, alongside the EU Taxonomy and the SFDR.',
    seeAlso: ['csrd', 'eu-taxonomy', 'sfdr']
  },
  {
    slug: 'datapoint',
    term: 'Datapoint',
    plain:
      'A single piece of information you report under an ESRS disclosure requirement - it can be narrative, a number, a money figure or a percentage. The original ESRS had over 1,100; the revised standards cut mandatory datapoints by roughly 60 to 70 percent.',
    formal:
      'The smallest unit of disclosure within an ESRS Disclosure Requirement (DR). Datapoints may be qualitative or quantitative (narrative, numeric, monetary, percentage). The revised ESRS (draft 6 May 2026) cut mandatory datapoints by around 60-70% and removed voluntary datapoints.',
    seeAlso: ['esrs', 'phase-in', 'omnibus']
  },
  {
    slug: 'phase-in',
    term: 'Phase-in',
    plain:
      'Transitional relief that lets first-time reporters leave out some of the heaviest disclosures in their early years, easing them into full reporting. For example, Scope 3 and anticipated financial effects can be phased.',
    formal:
      'Transitional reliefs under ESRS 1 Appendix C: first-time reporters may omit certain disclosures (e.g. Scope 3, anticipated financial effects) in early years; companies under 750 employees may omit Scope 3 and certain S1 and other topics in year one. The revised ESRS reinforce this trajectory.',
    seeAlso: ['datapoint', 'scope-3', 'esrs']
  }
];
