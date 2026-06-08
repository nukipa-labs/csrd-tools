// The 12 European Sustainability Reporting Standards (ESRS), Set 1.
// Plain-English first, accurate to mid-2026 (post-Omnibus).
// Grounded in research/01-regulation.md section 5 and research/02-topics.md.
//
// First set adopted as Delegated Regulation (EU) 2023/2772 (applicable FY2024).
// A REVISED set ("ESRS 2.0") is in flux: EFRAG technical advice 3 Dec 2025; EC draft
// revised delegated act in public consultation 6 May to 3 June 2026; adoption target
// around 17 Sep 2026; applies FY2027 (voluntary early use FY2026). It cuts mandatory
// datapoints by roughly 60-70% and removes voluntary datapoints. Sector-specific ESRS
// were dropped. Disclosure-requirement codes below follow the original Set 1; the
// revised standards restructure and renumber some of them.
//
// Used by /esrs (hub), /esrs/[slug] (detail pages) and the sitemap.

export type EsrsStandard = {
  slug: string;          // e.g. 'e1-climate-change', 's1-own-workforce', 'esrs-2-general-disclosures'
  code: string;          // 'ESRS E1', 'ESRS 2', 'ESRS G1'
  name: string;          // 'Climate change'
  pillar: 'Cross-cutting' | 'Environment' | 'Social' | 'Governance';
  icon: string;          // Material Symbols name, e.g. 'co2','water_drop','recycling','groups','gavel'
  tagline: string;       // one-line what it is
  intro: string;         // 2-3 sentence GEO answer-capsule for the detail hero
  covers: string[];      // bullets: what this standard requires/discloses
  whyMaterial?: string;  // when/why it tends to be material (esp. E1)
  faqs: { q: string; a: string }[];   // 2-4 each
};

export const ESRS_STANDARDS: EsrsStandard[] = [
  {
    slug: 'esrs-1-general-requirements',
    code: 'ESRS 1',
    name: 'General requirements',
    pillar: 'Cross-cutting',
    icon: 'architecture',
    tagline: 'The rulebook for how you report - concepts, not disclosures.',
    intro:
      'ESRS 1 sets out the architecture of CSRD reporting: the core concepts and the "how". It defines double materiality, the value-chain scope, time horizons, and how to structure the sustainability statement. ESRS 1 contains no disclosure requirements of its own - it tells you how to apply every other standard.',
    covers: [
      'The double materiality principle: report a topic if it is material from an impact OR a financial perspective.',
      'Value-chain scope: your own operations plus upstream and downstream value chain.',
      'Time horizons (short, medium, long term) and how to apply them.',
      'Structure of the sustainability statement and where it sits in the management report.',
      'Phase-in reliefs (Appendix C) that let first-time reporters omit certain heavy disclosures in early years.'
    ],
    faqs: [
      {
        q: 'Does ESRS 1 contain any disclosures?',
        a: 'No. ESRS 1 sets out the general requirements, concepts and structure. The actual disclosures live in ESRS 2 (mandatory baseline) and the topical standards E1-E5, S1-S4 and G1.'
      },
      {
        q: 'What does ESRS 1 say about the value chain?',
        a: 'It requires you to consider your own operations and your upstream and downstream value chain when assessing materiality and reporting impacts, risks and opportunities. The Omnibus value-chain cap then limits what you can demand from smaller partners.'
      },
      {
        q: 'Are the phase-in reliefs still available?',
        a: 'Yes. ESRS 1 Appendix C lets first-time reporters phase in heavier disclosures such as Scope 3 and anticipated financial effects. The revised ESRS reinforce this "less is more" direction.'
      }
    ]
  },
  {
    slug: 'esrs-2-general-disclosures',
    code: 'ESRS 2',
    name: 'General disclosures',
    pillar: 'Cross-cutting',
    icon: 'dashboard',
    tagline: 'The baseline every company reports, whatever its materiality result.',
    intro:
      'ESRS 2 sets the mandatory baseline disclosures every CSRD reporter must make, regardless of which topics turn out to be material. It is organised around four pillars - Governance, Strategy, Impact/Risk/Opportunity (IRO) management, and Metrics & Targets - the same architecture as the former TCFD recommendations.',
    covers: [
      'Governance: board and management oversight of sustainability matters.',
      'Strategy: business model, value chain, and how sustainability matters interact with strategy.',
      'IRO management: how you identify and manage impacts, risks and opportunities - including your double materiality assessment process.',
      'Metrics & Targets: the general approach to metrics and target-setting.',
      'It applies to every reporter even when no topical standard is material.'
    ],
    whyMaterial:
      'ESRS 2 is always mandatory - it does not depend on the materiality assessment. Every CSRD reporter discloses it.',
    faqs: [
      {
        q: 'Is ESRS 2 always required?',
        a: 'Yes. ESRS 2 is the mandatory baseline for every company in scope, regardless of the double materiality assessment outcome. The topical standards (E1-E5, S1-S4, G1) apply only where material.'
      },
      {
        q: 'What are the four pillars of ESRS 2?',
        a: 'Governance, Strategy, Impact/Risk/Opportunity management, and Metrics & Targets. The same four-pillar structure runs through the topical standards too.'
      }
    ]
  },
  {
    slug: 'e1-climate-change',
    code: 'ESRS E1',
    name: 'Climate change',
    pillar: 'Environment',
    icon: 'co2',
    tagline: 'The climate standard: GHG emissions, transition plan, energy and climate risk.',
    intro:
      'ESRS E1 is the climate-disclosure heart of the CSRD and the standard that is material for the overwhelming majority of companies. It covers your transition plan, greenhouse gas emissions across Scopes 1, 2 and 3, energy use, climate targets, and the financial effects of physical and transition risk. It carried the most datapoints of any topical standard (around 220 in the original version).',
    covers: [
      'E1-1 Transition plan: whether you have a plan to align with limiting warming to 1.5 degrees C and reaching climate neutrality by 2050; if not, you must say so and when you expect to adopt one.',
      'E1-2 / E1-3 Policies and actions for climate mitigation and adaptation, with the resources behind them.',
      'E1-4 Targets: GHG reduction targets (absolute or intensity), ideally science-based, with base year and milestones.',
      'E1-5 Energy: total consumption and mix, split renewable vs non-renewable.',
      'E1-6 Gross Scope 1, 2 and 3 and total GHG emissions - the core inventory. Scope 2 is disclosed both location-based and market-based; Scope 3 across the relevant of the 15 categories.',
      'E1-7 GHG removals and carbon credits; E1-8 internal carbon pricing.',
      'E1-9 Anticipated financial effects from material physical and transition risks and opportunities.'
    ],
    whyMaterial:
      'E1 is material for almost every company. Under double materiality a topic is material if it crosses the threshold on EITHER the impact or the financial side - and nearly every business either emits GHGs (impact) or faces transition risk (carbon pricing, regulation, demand shifts) or physical risk (heat, flood, supply disruption), so the financial lens usually triggers. ESRS 1 also requires any company that concludes climate is NOT material to give a detailed explanation - a high bar that pushes almost everyone to report E1.',
    faqs: [
      {
        q: 'What does ESRS E1 require?',
        a: 'A climate transition plan, climate policies, actions and targets, total energy consumption and mix, gross Scope 1, 2 and 3 greenhouse gas emissions, GHG removals and carbon credits, internal carbon pricing, and the anticipated financial effects of climate risks and opportunities.'
      },
      {
        q: 'Does ESRS E1 require Scope 3 emissions?',
        a: 'Yes, where climate is material, E1-6 requires gross Scope 3 emissions across the relevant of the 15 GHG Protocol categories. Phase-in reliefs let first-time reporters and companies under 750 employees defer Scope 3 in the first year.'
      },
      {
        q: 'What is the E1 transition plan?',
        a: 'Under E1-1 you disclose whether you have a plan to align your business model and strategy with limiting warming to 1.5 degrees C and reaching climate neutrality by 2050, in line with EU climate law. If you have no plan, you must state that and say when you expect to adopt one.'
      },
      {
        q: 'When is climate "not material" under E1?',
        a: 'Rarely. If you conclude climate is not material, ESRS 1 requires a detailed explanation of how you reached that conclusion. In practice the financial-materiality lens (transition and physical risk) makes E1 material for almost all companies.'
      }
    ]
  },
  {
    slug: 'e2-pollution',
    code: 'ESRS E2',
    name: 'Pollution',
    pillar: 'Environment',
    icon: 'masks',
    tagline: 'Air, water and soil pollution and substances of concern.',
    intro:
      'ESRS E2 covers pollution of air, water and soil, plus substances of concern and substances of very high concern. It applies where pollution is material under your double materiality assessment - typically manufacturing, chemicals, energy and other industrial activities.',
    covers: [
      'Policies, actions and targets to prevent and control pollution.',
      'Pollutants emitted to air, water and soil.',
      'Substances of concern and substances of very high concern produced, used or generated.',
      'Microplastics where relevant.',
      'Anticipated financial effects from pollution-related impacts, risks and opportunities.'
    ],
    faqs: [
      {
        q: 'Who needs to report ESRS E2?',
        a: 'Companies for which pollution is material under double materiality - most often industrial, chemical, energy and manufacturing businesses. If pollution is not material, you do not report E2 but should be able to explain why.'
      },
      {
        q: 'Does E2 cover substances of concern?',
        a: 'Yes. E2 requires disclosure of substances of concern and substances of very high concern that you produce, use or generate, alongside pollutants emitted to air, water and soil.'
      }
    ]
  },
  {
    slug: 'e3-water-marine-resources',
    code: 'ESRS E3',
    name: 'Water and marine resources',
    pillar: 'Environment',
    icon: 'water_drop',
    tagline: 'Water consumption, withdrawals and impacts on marine resources.',
    intro:
      'ESRS E3 covers how your business uses and affects water and marine resources. It applies where water and marine resources are material - especially for water-intensive operations or those in water-stressed areas. Disclosures focus on consumption, withdrawals and discharges.',
    covers: [
      'Policies, actions and targets on water and marine resources.',
      'Water consumption, withdrawals and discharges, with attention to areas of water stress.',
      'Impacts on marine resources where relevant.',
      'Anticipated financial effects from water-related impacts, risks and opportunities.'
    ],
    faqs: [
      {
        q: 'When is ESRS E3 material?',
        a: 'When water or marine resources are material under your double materiality assessment - common for agriculture, food and drink, textiles, mining, utilities and any operation in a water-stressed region.'
      },
      {
        q: 'What does E3 ask you to measure?',
        a: 'Primarily water consumption, withdrawals and discharges, with particular focus on operations in areas of high water stress, plus policies, actions and targets.'
      }
    ]
  },
  {
    slug: 'e4-biodiversity-ecosystems',
    code: 'ESRS E4',
    name: 'Biodiversity and ecosystems',
    pillar: 'Environment',
    icon: 'forest',
    tagline: 'Impacts on and dependencies upon nature and ecosystems.',
    intro:
      'ESRS E4 covers your impacts on, and dependencies upon, biodiversity and ecosystems - including land-use change, species and habitats. It applies where nature is material, and is closely linked to emerging nature frameworks such as the TNFD and to the EU biodiversity agenda.',
    covers: [
      'Policies, actions and targets on biodiversity and ecosystems.',
      'Material impacts on species, habitats and ecosystems, including land-use and sea-use change.',
      'Dependencies on ecosystem services.',
      'A transition plan for biodiversity where relevant.',
      'Anticipated financial effects from nature-related impacts, risks and opportunities.'
    ],
    faqs: [
      {
        q: 'Who reports ESRS E4?',
        a: 'Companies for which biodiversity and ecosystems are material - especially agriculture, forestry, food, construction, mining and any business with significant land or sea footprint or supply-chain dependence on nature.'
      },
      {
        q: 'How does E4 relate to the TNFD?',
        a: 'E4 follows the same impacts-and-dependencies logic as the Taskforce on Nature-related Financial Disclosures (TNFD). A company using TNFD will find significant overlap with E4 disclosures.'
      }
    ]
  },
  {
    slug: 'e5-circular-economy',
    code: 'ESRS E5',
    name: 'Resource use and circular economy',
    pillar: 'Environment',
    icon: 'recycling',
    tagline: 'Material inflows and outflows, waste and circularity.',
    intro:
      'ESRS E5 covers resource use and the circular economy: the materials flowing into and out of your business, and how you keep resources in use and reduce waste. It applies where resource use and circular economy are material - common for manufacturing, packaging, construction and consumer goods.',
    covers: [
      'Policies, actions and targets on resource use and circular economy.',
      'Resource inflows (materials and products entering the business).',
      'Resource outflows, including products, materials and waste.',
      'Waste generated, diverted and disposed of.',
      'Anticipated financial effects from resource-related impacts, risks and opportunities.'
    ],
    faqs: [
      {
        q: 'What does ESRS E5 cover?',
        a: 'Resource inflows, resource outflows (including products and materials), and waste - plus policies, actions and targets aimed at keeping resources in use and reducing waste.'
      },
      {
        q: 'Who needs ESRS E5?',
        a: 'Companies for which resource use and the circular economy are material - typically manufacturers, packaging-intensive businesses, construction, and consumer-goods companies.'
      }
    ]
  },
  {
    slug: 's1-own-workforce',
    code: 'ESRS S1',
    name: 'Own workforce',
    pillar: 'Social',
    icon: 'groups',
    tagline: 'Working conditions, pay, diversity and health and safety for your own people.',
    intro:
      'ESRS S1 covers your own workforce: working conditions, equal treatment and opportunity, pay, diversity, collective bargaining, and health and safety. It is material for the large majority of companies, since almost every business has employees whose conditions and treatment matter under the impact lens.',
    covers: [
      'Working conditions: secure employment, working time, adequate wages, social dialogue and collective bargaining.',
      'Equal treatment and opportunities: gender pay gap, diversity, training and skills, and measures against violence and harassment.',
      'Health and safety.',
      'Other work-related rights, including child labour and forced labour in your own operations.',
      'How you engage with your own workforce and provide channels to raise concerns.'
    ],
    whyMaterial:
      'S1 is material for most companies with a workforce of any size, because the way you treat your own people is an impact that almost always crosses the materiality threshold. Phase-in reliefs let companies under 750 employees defer S1 in the first year.',
    faqs: [
      {
        q: 'Is ESRS S1 mandatory?',
        a: 'S1 applies where your own workforce is material, which is the case for most companies. ESRS 2 governance and process disclosures always apply; S1 topical disclosures follow from the double materiality assessment.'
      },
      {
        q: 'Does S1 require a gender pay gap figure?',
        a: 'Yes, where own workforce is material. S1 includes equal-treatment metrics such as the gender pay gap, diversity, and training, alongside working conditions and health and safety.'
      }
    ]
  },
  {
    slug: 's2-value-chain-workers',
    code: 'ESRS S2',
    name: 'Workers in the value chain',
    pillar: 'Social',
    icon: 'diversity_3',
    tagline: 'Labour conditions for workers across your supply and downstream chain.',
    intro:
      'ESRS S2 covers workers in your value chain - the people in your upstream supply chain and downstream operations who are not your own employees. It applies where their working conditions and rights are material, and overlaps closely with human-rights due diligence under the CSDDD.',
    covers: [
      'Material impacts on value-chain workers: working conditions, equal treatment, and other work-related rights.',
      'Risks of child labour, forced labour and human-rights abuses in the value chain.',
      'Policies, actions and targets to address those impacts.',
      'How affected value-chain workers can raise concerns and seek remedy.'
    ],
    faqs: [
      {
        q: 'How is S2 different from S1?',
        a: 'S1 is about your own employees; S2 is about workers in your value chain who are not your employees - for example workers at suppliers and contractors. Both follow the same rights-based structure.'
      },
      {
        q: 'How does S2 relate to due diligence?',
        a: 'S2 overlaps heavily with human-rights due diligence under the Corporate Sustainability Due Diligence Directive (CSDDD). The value-chain cap limits what data you can demand from smaller partners.'
      }
    ]
  },
  {
    slug: 's3-affected-communities',
    code: 'ESRS S3',
    name: 'Affected communities',
    pillar: 'Social',
    icon: 'cottage',
    tagline: 'Impacts on local and indigenous communities.',
    intro:
      'ESRS S3 covers your impacts on affected communities - local and indigenous communities affected by your operations or value chain. It applies where those impacts are material, and is most relevant for businesses with a significant land, infrastructure or extractive footprint.',
    covers: [
      'Material impacts on communities: economic, social and cultural rights; civil and political rights; and the rights of indigenous peoples.',
      'Land and resource impacts, including free, prior and informed consent where relevant.',
      'Policies, actions and targets to address community impacts.',
      'How affected communities can raise concerns and seek remedy.'
    ],
    faqs: [
      {
        q: 'Who needs to report ESRS S3?',
        a: 'Companies for which impacts on affected communities are material - especially those with extractive, infrastructure, energy, agriculture or large land-use operations, or value chains touching indigenous lands.'
      },
      {
        q: 'Does S3 cover indigenous peoples?',
        a: 'Yes. S3 includes the rights of indigenous peoples, and concepts such as free, prior and informed consent where land and resources are affected.'
      }
    ]
  },
  {
    slug: 's4-consumers-end-users',
    code: 'ESRS S4',
    name: 'Consumers and end-users',
    pillar: 'Social',
    icon: 'support_agent',
    tagline: 'Product safety, data privacy and inclusion for consumers.',
    intro:
      'ESRS S4 covers your impacts on consumers and end-users: product and service safety, data privacy, responsible marketing, and access and inclusion. It applies where these impacts are material, and is most relevant for consumer-facing businesses and any company handling personal data.',
    covers: [
      'Information-related impacts: data privacy, freedom of expression, and responsible marketing.',
      'Personal safety: product and service safety and security.',
      'Social inclusion: access to products and services and non-discrimination.',
      'Policies, actions and targets to address consumer impacts.',
      'How consumers and end-users can raise concerns and seek remedy.'
    ],
    faqs: [
      {
        q: 'What does ESRS S4 require?',
        a: 'Disclosure of material impacts on consumers and end-users across information (data privacy, marketing), personal safety (product safety), and social inclusion (access, non-discrimination), plus the policies, actions and targets that address them.'
      },
      {
        q: 'Is data privacy part of S4?',
        a: 'Yes. Data privacy sits under the information-related impacts in S4, alongside responsible marketing and freedom of expression.'
      }
    ]
  },
  {
    slug: 'g1-business-conduct',
    code: 'ESRS G1',
    name: 'Business conduct',
    pillar: 'Governance',
    icon: 'gavel',
    tagline: 'Anti-corruption, lobbying, payment practices and whistleblowing.',
    intro:
      'ESRS G1 is the single governance standard. It covers business conduct: corporate culture, anti-corruption and anti-bribery, the protection of whistleblowers, political engagement and lobbying, and payment practices toward suppliers. It applies where business conduct is material - which is common across most sectors.',
    covers: [
      'Corporate culture and business-conduct policies.',
      'Prevention and detection of corruption and bribery, and incidents.',
      'Protection of whistleblowers.',
      'Political engagement and lobbying activities.',
      'Payment practices, including time-to-pay and late-payment behaviour toward suppliers.'
    ],
    faqs: [
      {
        q: 'What does ESRS G1 cover?',
        a: 'Business conduct: corporate culture, anti-corruption and anti-bribery, whistleblower protection, political engagement and lobbying, and payment practices toward suppliers.'
      },
      {
        q: 'Is G1 the only governance standard?',
        a: 'Yes. G1 is the only topical governance standard in ESRS Set 1. Broader governance of sustainability (board oversight) is captured in the ESRS 2 general disclosures.'
      }
    ]
  }
];

export function getStandard(slug: string): EsrsStandard | undefined {
  return ESRS_STANDARDS.find((s) => s.slug === slug);
}
