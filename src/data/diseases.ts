import { Disease } from '../types';

export const DISEASES_DATA: Disease[] = [
  {
    id: 'hashimotos-thyroiditis',
    name: "Hashimoto's Thyroiditis",
    shortName: "Hashimoto's",
    category: 'Thyroid & Endocrine',
    tagline: 'Chronic autoimmune inflammation causing progressive underactive thyroid (hypothyroidism).',
    overview: "Hashimoto's Thyroiditis is the most common cause of hypothyroidism in developed countries. The immune system generates antibodies (TPOAb and TgAb) that mistakenly attack and damage thyroid follicular cells, impairing the gland's ability to produce vital thyroid hormones (T4 and T3).",
    prevalence: 'Affects approx. 5 in 100 people; ~8x more frequent in females.',
    primaryOrgans: ['Thyroid Gland', 'Metabolism', 'Cardiovascular System', 'Skin & Hair'],
    hallmarkSymptoms: [
      'Profound, unrefreshing fatigue',
      'Unexplained weight gain / difficulty losing weight',
      'Cold intolerance (feeling cold when others are warm)',
      'Dry skin, brittle nails, thinning hair / outer third of eyebrows',
      'Brain fog, memory lapses, and sluggish cognition',
      'Constipation and sluggish gut motility',
      'Muscle weakness and joint aches',
      'Puffy face / periorbital edema',
      'Depression or low mood'
    ],
    diagnosticTests: [
      {
        name: 'TPOAb',
        fullName: 'Thyroid Peroxidase Antibodies',
        purpose: 'Detects autoimmune attack on thyroid peroxidase enzyme.',
        significance: 'Elevated in >90% of Hashimoto patients; confirms autoimmune etiology.'
      },
      {
        name: 'TgAb',
        fullName: 'Thyroglobulin Antibodies',
        purpose: 'Measures antibodies attacking thyroglobulin protein.',
        significance: 'Positive in ~70-80% of Hashimoto cases.'
      },
      {
        name: 'TSH',
        fullName: 'Thyroid Stimulating Hormone',
        purpose: 'Pituitary signal stimulating thyroid production.',
        normalRange: '0.45 – 4.5 mIU/L (Functional target often 1.0 – 2.5)',
        significance: 'Elevated TSH indicates underactive thyroid gland output.'
      },
      {
        name: 'Free T4 & Free T3',
        fullName: 'Free Thyroxine & Free Triiodothyronine',
        purpose: 'Measures active, unbound circulating thyroid hormones.',
        significance: 'Low or low-normal Free T3/T4 often explains ongoing fatigue and coldness.'
      }
    ],
    treatmentClasses: [
      {
        name: 'Levothyroxine (Synthroid, Tirosint)',
        description: 'Synthetic T4 hormone replacement therapy to restore physiological hormone levels.',
        examples: ['Levothyroxine sodium', 'Tirosint (hypoallergenic liquid gel)']
      },
      {
        name: 'Combination T4 + T3 Therapy',
        description: 'Adjunctive synthetic Liothyronine (Cytomel) or Natural Desiccated Thyroid for poor T4 to T3 converters.',
        examples: ['Liothyronine', 'Armour Thyroid']
      },
      {
        name: 'Nutrient Optimization',
        description: 'Addressing co-factors required for deiodinase conversion and immune modulation.',
        examples: ['Selenium (100-200 mcg)', 'Zinc', 'Vitamin D3/K2', 'Ferritin optimization']
      }
    ],
    commonTriggers: [
      'High psychological or physical stress',
      'Gluten consumption (molecular mimicry with thyroid tissue)',
      'Postpartum hormonal fluctuations',
      'Viral infections (EBV, CMV, COVID)',
      'Excessive unmonitored iodine supplementation',
      'Severe sleep deprivation'
    ],
    evidenceBasedLifestyle: {
      diet: 'Gluten-free diet (studies demonstrate reduction in TPO antibodies and improved T4 absorption). Consider Autoimmune Protocol (AIP) or anti-inflammatory Mediterranean framework rich in selenium (Brazil nuts), wild salmon, and leafy greens.',
      exercise: 'Low-to-moderate intensity strength training and zone-2 walking; avoid excessive high-intensity chronic cardio that spikes cortisol and impairs T3 conversion.',
      stressPacing: 'Vagal nerve stimulation, 8+ hours restorative sleep, scheduled rest pauses before hitting exhaustion.',
      supplementsToDiscuss: ['Selenium (selenomethionine)', 'Myo-inositol', 'Vitamin D3 + K2', 'Omega-3 Fatty Acids', 'Magnesium glycinate']
    },
    flareWarningSigns: [
      'Sudden drop in body temperature and severe shivering',
      'Crushing mental exhaustion and memory slips',
      'Swelling/tenderness in the front of neck (goiter sensation)',
      'Sudden surge in joint puffiness and water retention'
    ],
    questionsForDoctor: [
      'Can we test my complete thyroid panel including Free T3, Free T4, Reverse T3, and TPO/Tg antibodies rather than just TSH?',
      'What is my optimal target TSH range where I feel functionally well, not just statistically in-range?',
      'Should we check my Ferritin, Vitamin D, Vitamin B12, and Selenium levels?',
      'Could a brand change (e.g. Tirosint with fewer fillers) help my absorption?'
    ]
  },
  {
    id: 'systemic-lupus-erythematosus',
    name: 'Systemic Lupus Erythematosus (SLE)',
    shortName: 'Lupus',
    category: 'Systemic & Vascular',
    tagline: 'Complex multi-system autoimmune disease characterized by widespread inflammation and autoantibodies.',
    overview: 'Systemic Lupus Erythematosus (Lupus) is a prototypical autoimmune disorder where the immune system loses tolerance to nuclear antigens, forming immune complexes that deposit in blood vessels, kidneys, skin, joints, brain, and serosal membranes.',
    prevalence: 'Approx. 20-70 per 100,000; 90% of adult patients are women of childbearing age.',
    primaryOrgans: ['Skin', 'Joints', 'Kidneys (Lupus Nephritis)', 'Lungs / Pleura', 'Heart / Pericardium', 'Brain'],
    hallmarkSymptoms: [
      'Malar "butterfly" rash across bridge of nose and cheeks sparing nasolabial folds',
      'Photosensitivity (sunlight triggers rashes, severe fatigue, or flares)',
      'Symmetrical inflammatory joint pain and morning stiffness',
      'Unexplained low-grade fevers and extreme fatigue',
      'Painless oral or nasal ulcers',
      'Pleuritic chest pain (pleuritis or pericarditis)',
      'Hair loss (alopecia), especially along hairline',
      'Raynaud phenomenon (fingers turning white/blue in cold)',
      'Swollen lymph nodes and proteinuria'
    ],
    diagnosticTests: [
      {
        name: 'ANA (IFA)',
        fullName: 'Antinuclear Antibody (Immunofluorescence)',
        purpose: 'Primary screening test for systemic autoimmune connective tissue disease.',
        significance: 'Positive in >98% of active SLE patients with high titer (e.g. >= 1:160).'
      },
      {
        name: 'Anti-dsDNA',
        fullName: 'Anti-Double Stranded DNA Antibodies',
        purpose: 'Specific biomarker for SLE; correlates with disease activity and renal involvement.',
        significance: 'Highly specific for Lupus; titers fluctuate with flare severity.'
      },
      {
        name: 'Anti-Smith (Sm)',
        fullName: 'Anti-Smith Antibodies',
        purpose: 'Antigenic marker targeting snRNPs.',
        significance: 'Near 100% specific for SLE, though present in only 20-30% of patients.'
      },
      {
        name: 'Complement C3 & C4',
        fullName: 'Complement Component 3 and 4',
        purpose: 'Measures immune system consumption of complement proteins.',
        significance: 'Decreased levels signify active immune complex deposition and impending flare.'
      },
      {
        name: 'Urinalysis & Protein/Creatinine Ratio',
        fullName: 'Renal Screening Panel',
        purpose: 'Screens for cellular casts and proteinuria indicating Lupus Nephritis.',
        significance: 'Essential regular monitor to preserve renal function.'
      }
    ],
    treatmentClasses: [
      {
        name: 'Antimalarials (Cornerstone)',
        description: 'Reduces flare frequency, protects organs, and improves long-term survival.',
        examples: ['Hydroxychloroquine (Plaquenil)']
      },
      {
        name: 'Targeted Biologics',
        description: 'Monoclonal antibodies inhibiting B-lymphocyte stimulator (BLyS) or type I interferon.',
        examples: ['Belimumab (Benlysta)', 'Anifrolumab (Saphnelo)']
      },
      {
        name: 'Immunosuppressants & DMARDs',
        description: 'Steroid-sparing agents for moderate to severe organ-threatening disease.',
        examples: ['Mycophenolate Mofetil (CellCept)', 'Methotrexate', 'Azathioprine (Imuran)']
      },
      {
        name: 'Corticosteroids',
        description: 'Rapid control of acute inflammatory flares, tapered to lowest effective dose.',
        examples: ['Prednisone', 'Methylprednisolone']
      }
    ],
    commonTriggers: [
      'UV light / sun exposure (induces keratinocyte apoptosis and antigen presentation)',
      'Physical or emotional stress surges',
      'Infections (viral or bacterial)',
      'Hormonal shifts (estrogen surges, pregnancy)',
      'Certain medications (sulfa antibiotics, alfalfa sprouts)'
    ],
    evidenceBasedLifestyle: {
      diet: 'Anti-inflammatory Mediterranean dietary pattern with abundant colorful vegetables, omega-3 rich fish, olive oil, and turmeric. Strictly avoid alfalfa sprouts (contains L-canavanine which stimulates immune flare).',
      exercise: 'Low-impact swimming, recumbent cycling, and gentle yoga; strict UV protection during outdoor activities (UPF 50+ clothing and mineral sunscreen SPF 50+).',
      stressPacing: 'Rigorous spoon pacing, daily afternoon horizontal rest, stress reduction via meditation.',
      supplementsToDiscuss: ['Vitamin D3 (essential due to sun avoidance)', 'Omega-3 EPA/DHA', 'Curcumin/Turmeric', 'CoQ10']
    },
    flareWarningSigns: [
      'New or worsening skin rash, redness, or hives after sun exposure',
      'Unexplained fever, severe night sweats, and sudden joint heat',
      'Foamy urine or swelling in ankles/feet (early kidney signs)',
      'Pleuritic chest pain when taking a deep breath'
    ],
    questionsForDoctor: [
      'Are my complement levels (C3/C4) and Anti-dsDNA titers showing active disease?',
      'Is my current Hydroxychloroquine dose optimized based on my body weight, and when is my next annual retinal screening?',
      'Would I be a candidate for targeted biologics (e.g. Benlysta or Saphnelo) to reduce steroid dependency?',
      'How frequently should we monitor my urine protein-to-creatinine ratio to protect my kidneys?'
    ]
  },
  {
    id: 'rheumatoid-arthritis',
    name: 'Rheumatoid Arthritis (RA)',
    shortName: 'RA',
    category: 'Joints & Musculoskeletal',
    tagline: 'Systemic autoimmune disease causing symmetrical erosive synovitis and joint destruction.',
    overview: 'Rheumatoid Arthritis is a chronic autoimmune condition where the immune system attacks the synovium—the delicate lining of membranes surrounding your joints. This causes painful swelling, cartilage breakdown, bone erosion, and systemic fatigue.',
    prevalence: 'Affects ~1% of the global population; 3x more common in women.',
    primaryOrgans: ['Joint Synovium (Hands, Wrists, Feet, Knees)', 'Tendons & Bursae', 'Cardiovascular System', 'Lungs'],
    hallmarkSymptoms: [
      'Symmetrical joint pain, warmth, and swelling (especially MCP and PIP finger joints)',
      'Morning stiffness lasting longer than 45 to 60 minutes',
      'Rheumatoid nodules under the skin over bony pressure points',
      'Systemic low-grade fever, malaise, and heavy fatigue',
      'Decreased grip strength and morning hand clumsiness',
      'Sjögren overlap (dry eyes and dry mouth)'
    ],
    diagnosticTests: [
      {
        name: 'Anti-CCP / ACPA',
        fullName: 'Anti-Cyclic Citrullinated Peptide Antibodies',
        purpose: 'Specific biomarker for Rheumatoid Arthritis.',
        significance: '95-98% specificity; predicts aggressive erosive joint progression.'
      },
      {
        name: 'RF',
        fullName: 'Rheumatoid Factor',
        purpose: 'Autoantibody directed against the Fc portion of IgG.',
        significance: 'Positive in ~70-80% of RA cases (seropositive RA).'
      },
      {
        name: 'ESR & CRP',
        fullName: 'Erythrocyte Sedimentation Rate & C-Reactive Protein',
        purpose: 'Measures systemic acute-phase inflammation.',
        significance: 'Tracks disease activity and response to DMARD therapy.'
      },
      {
        name: 'Joint Ultrasound / MRI',
        fullName: 'High-Resolution Synovial Imaging',
        purpose: 'Detects early subclinical synovial power Doppler hyperemia and bone erosion.',
        significance: 'Guides early intervention before irreversible structural joint changes.'
      }
    ],
    treatmentClasses: [
      {
        name: 'Conventional Synthetic DMARDs',
        description: 'First-line disease-modifying antirheumatic drugs to halt joint damage.',
        examples: ['Methotrexate (first-line gold standard)', 'Leflunomide', 'Sulfasalazine', 'Hydroxychloroquine']
      },
      {
        name: 'Biologic DMARDs (bDMARDs)',
        description: 'Targeted proteins neutralizing TNF-alpha, IL-6, or B-cells.',
        examples: ['Adalimumab (Humira)', 'Etanercept (Enbrel)', 'Tocilizumab (Actemra)', 'Rituximab']
      },
      {
        name: 'Targeted Synthetic DMARDs (JAK Inhibitors)',
        description: 'Oral small molecules inhibiting Janus kinase intracellular signaling pathways.',
        examples: ['Tofacitinib (Xeljanz)', 'Upadacitinib (Rinvoq)', 'Baricitinib (Olumiant)']
      }
    ],
    commonTriggers: [
      'Weather and barometric pressure drops (cold/damp conditions)',
      'Physical overexertion or joint trauma',
      'Emotional stress and sleep disturbances',
      'Gingivitis / Periodontal infections (Porphyromonas gingivalis)',
      'Highly inflammatory processed foods, trans fats, and excess sugar'
    ],
    evidenceBasedLifestyle: {
      diet: 'Mediterranean or Anti-inflammatory diet high in extra virgin olive oil (contains oleocanthal, a natural COX inhibitor), wild-caught fatty fish (EPA/DHA), walnuts, berries, and dark greens.',
      exercise: 'Non-impact joint mobility: warm water hydrotherapy/swimming, tai chi, recumbent elliptical, and isometric strengthening.',
      stressPacing: 'Joint protection ergonomics (large grip tools, wrist braces during flares, compression gloves).',
      supplementsToDiscuss: ['High-dose Omega-3 (2-3g EPA/DHA)', 'Curcumin phytosome', 'Boswellia serrata', 'Vitamin D3']
    },
    flareWarningSigns: [
      'Morning stiffness expanding past 2 hours',
      'Spike in joint warmth, redness, and visible synovial swelling',
      'Inability to make a tight fist or open jars',
      'Deep, flu-like muscular ache and exhaustion'
    ],
    questionsForDoctor: [
      'What is my current CDAI / DAS28 disease activity score?',
      'Am I achieving true clinical remission, or do we need to escalate to a biologic or JAK inhibitor?',
      'Should we get updated baseline X-rays or ultrasound of my hands and feet?',
      'How can we minimize methotrexate gastrointestinal side effects (e.g. optimized Folate timing)?'
    ]
  },
  {
    id: 'multiple-sclerosis',
    name: 'Multiple Sclerosis (MS)',
    shortName: 'MS',
    category: 'Neurological & Neuromuscular',
    tagline: 'Demyelinating autoimmune disease of the central nervous system (brain and spinal cord).',
    overview: 'In Multiple Sclerosis, autoreactive T and B lymphocytes cross the blood-brain barrier and attack the myelin sheath insulating nerve axons in the brain and spinal cord, causing focal demyelinating lesions (plaques), impaired nerve conduction, and neurodegeneration.',
    prevalence: 'Affects approx. 2.8 million people globally; 3x more common in women.',
    primaryOrgans: ['Central Nervous System (Brain, Spinal Cord, Optic Nerves)'],
    hallmarkSymptoms: [
      'Numbness, tingling ("pins and needles"), or electric shock sensation down spine on neck flexion (Lhermitte sign)',
      'Optic Neuritis (blurred vision, eye pain with movement, color desaturation)',
      'Motor weakness, heavy limbs, foot drop, and spasticity',
      'Ataxia, loss of balance, vertigo, and tremors',
      'Uhthoff phenomenon (symptoms temporarily worsen with elevated body temperature/heat)',
      'Neurogenic bladder urgency, frequency, or retention',
      'Profound, sudden neurological fatigue',
      'Cognitive changes ("cog fog", processing speed slowdown)'
    ],
    diagnosticTests: [
      {
        name: 'Brain & Spine MRI with Contrast',
        fullName: 'Magnetic Resonance Imaging with Gadolinium',
        purpose: 'Identifies demyelinating hyperintense T2/FLAIR lesions disseminated in space and time.',
        significance: 'Gold standard for diagnosis and monitoring disease progression.'
      },
      {
        name: 'Lumbar Puncture (CSF)',
        fullName: 'Cerebrospinal Fluid Oligoclonal Bands (OCBs)',
        purpose: 'Detects intrathecal IgG synthesis.',
        significance: 'Positive oligoclonal bands in CSF (and absent in serum) in >90% of MS patients.'
      },
      {
        name: 'Visual Evoked Potentials (VEP)',
        fullName: 'Optic Nerve Conduction Latency',
        purpose: 'Measures electrical response time from retina to occipital cortex.',
        significance: 'Detects subclinical demyelination in the optic pathways.'
      }
    ],
    treatmentClasses: [
      {
        name: 'High-Efficacy Disease-Modifying Therapies (DMTs)',
        description: 'B-cell depleting monoclonal antibodies and S1P receptor modulators.',
        examples: ['Ocrelizumab (Ocrevus)', 'Ofatumumab (Kesimpta)', 'Natalizumab (Tysabri)', 'Siponimod']
      },
      {
        name: 'Oral Immunomodulators',
        description: 'First and second line oral agents modifying immune cell trafficking and oxidative stress.',
        examples: ['Dimethyl Fumarate (Tecfidera)', 'Teriflunomide (Aubagio)', 'Fingolimod']
      },
      {
        name: 'Acute Relapse Rescue',
        description: 'High-dose intravenous corticosteroids to rapidly decrease central inflammation.',
        examples: ['IV Methylprednisolone (1000mg/day for 3-5 days)']
      }
    ],
    commonTriggers: [
      'Heat exposure (hot baths, saunas, fever, humid weather — Uhthoff phenomenon)',
      'Acute infections (UTIs, viral illnesses, pneumonia)',
      'Chronic sleep deprivation and circadian disruption',
      'Severe psychological trauma or burnout',
      'Postpartum hormonal drop'
    ],
    evidenceBasedLifestyle: {
      diet: 'Mediterranean or Swank/Wahls-adapted plant-rich diet low in saturated animal fats and rich in colorful phytonutrients, leafy greens, wild fish, and prebiotics for gut-brain axis support.',
      exercise: 'Neurological physical therapy, aquatic exercise in cool water (<82°F / 28°C), resistance training with active cooling vests.',
      stressPacing: 'Cooling strategies (ice vests, cold water sips, air conditioning), scheduled 20-minute daily cognitive rests.',
      supplementsToDiscuss: ['Vitamin D3 (target high-normal 50-80 ng/mL blood levels)', 'CoQ10', 'Alpha-Lipoic Acid', 'Omega-3 DHA']
    },
    flareWarningSigns: [
      'New vision dimming or retrobulbar eye pain lasting >24 hours',
      'Sudden weakness in one leg causing stumbling or scuffing toe',
      'Ascending sensory loss / numbness traveling up torso or legs',
      'Severe sudden loss of coordination or balance'
    ],
    questionsForDoctor: [
      'Are there new active enhancing T1 lesions or new T2 lesions on my recent MRI?',
      'Does my current DMT provide optimal NEDA (No Evident Disease Activity)?',
      'What is my JC Virus antibody index if I am considering or taking Tysabri?',
      'What symptomatic management options are available for spasticity, bladder urgency, or neuro-fatigue?'
    ]
  },
  {
    id: 'crohns-disease',
    name: "Crohn's Disease",
    shortName: "Crohn's",
    category: 'Gastrointestinal & Liver',
    tagline: 'Transmural inflammatory bowel disease capable of affecting any segment of the GI tract.',
    overview: "Crohn's Disease is a chronic inflammatory bowel disease (IBD) featuring transmural (full thickness) inflammation. It can affect any part of the gastrointestinal tract from mouth to anus, typically in a 'skip lesion' pattern, leading to strictures, fistulas, and malabsorption.",
    prevalence: 'Affects approx. 3.2 per 1,000 people in North America and Europe.',
    primaryOrgans: ['Ileum & Colon (Ileocolic)', 'Small Intestine', 'Perianal Region', 'Nutrient Absorption'],
    hallmarkSymptoms: [
      'Persistent crampy abdominal pain (frequently right lower quadrant)',
      'Chronic watery or urgent diarrhea (sometimes with mucus or blood)',
      'Unintended weight loss and nutrient malabsorption (Iron, B12, D)',
      'Perianal fistulas, fissures, or abscesses',
      'Mouth ulcers / Aphthous stomatitis',
      'Fever, systemic fatigue, and growth failure in adolescents',
      'Extra-intestinal manifestations (erythema nodosum, peripheral arthritis, uveitis)'
    ],
    diagnosticTests: [
      {
        name: 'Fecal Calprotectin',
        fullName: 'Stool Calprotectin Biomarker',
        purpose: 'Non-invasive quantitative measure of neutrophilic intestinal mucosal inflammation.',
        normalRange: '< 50 mcg/g (Flares often > 250-1000 mcg/g)',
        significance: 'Distinguishes active IBD flares from non-inflammatory IBS.'
      },
      {
        name: 'Ileocolonoscopy with Biopsies',
        fullName: 'Endoscopic Mucosal Evaluation',
        purpose: 'Visualizes cobblestoning, deep aphthous ulcers, skip lesions, and granulomas.',
        significance: 'Definitive diagnostic modality for mucosal healing assessment.'
      },
      {
        name: 'MR Enterography / CT Enterography',
        fullName: 'Cross-Sectional Small Bowel Imaging',
        purpose: 'Evaluates transmural bowel wall thickening, strictures, and penetrating fistulas.',
        significance: 'Assesses disease extent in unreachable areas of the jejunum and ileum.'
      }
    ],
    treatmentClasses: [
      {
        name: 'Anti-TNF & Integrin Biologics',
        description: 'First-line advanced targeted therapy to induce and sustain deep endoscopic mucosal healing.',
        examples: ['Infliximab (Remicade)', 'Adalimumab (Humira)', 'Vedolizumab (Entyvio - gut selective)']
      },
      {
        name: 'IL-12/23 and IL-23 Inhibitors',
        description: 'Cytokine antagonists targeting the p40 and p19 interleukin subunits.',
        examples: ['Ustekinumab (Stelara)', 'Risankizumab (Skyrizi)']
      },
      {
        name: 'Targeted Small Molecules (JAK/S1P)',
        description: 'Oral targeted options for moderate to severe refractory disease.',
        examples: ['Upadacitinib (Rinvoq)']
      },
      {
        name: 'Immunomodulators & Corticosteroids',
        description: 'Induction bridging (Budesonide, Prednisone) and maintenance adjunctive therapy.',
        examples: ['Budesonide (Entocort EC)', 'Azathioprine', 'Methotrexate']
      }
    ],
    commonTriggers: [
      'NSAID pain relievers (Ibuprofen, Naproxen directly erode gut barrier)',
      'Smoking (significant trigger worsening Crohn recurrence and surgical risk)',
      'Dietary triggers during active flares (high-insoluble fiber, seeds, raw roughage, spicy foods)',
      'Gastrointestinal infections or antibiotics disrupting microbiome balance',
      'Acute emotional stress'
    ],
    evidenceBasedLifestyle: {
      diet: 'During active inflammation: low-residue/low-fiber, easily digestible cooked purees, bone broths, lean proteins, and specific carbohydrate diets (SCD) or Crohn\'s Disease Exclusion Diet (CDED). During remission: slowly expand fiber with soluble prebiotics.',
      exercise: 'Low-impact walking, gentle core stabilization, and restorative yoga; avoid strenuous jarring abdominal impact during flares.',
      stressPacing: 'Gut-directed hypnotherapy, diaphragmatic breathing before meals to optimize parasympathetic digestive tone.',
      supplementsToDiscuss: ['Curcumin (with biologic)', 'Vitamin D3 (maintain >40 ng/mL)', 'Sublingual Vitamin B12', 'Iron bisglycinate / IV Iron']
    },
    flareWarningSigns: [
      'Spike in Fecal Calprotectin (>250 mcg/g)',
      'Severe crampy post-prandial pain with nausea and abdominal distension',
      'Multiple nighttime bowel movements waking from sleep',
      'Persistent perianal throbbing pain or drainage'
    ],
    questionsForDoctor: [
      'What is my current Fecal Calprotectin level, and is my mucosal lining achieving endoscopic healing?',
      'Are my therapeutic biologic drug trough levels and antibody levels in target range?',
      'Should we evaluate for malabsorption of Vitamin B12, Iron/Ferritin, and fat-soluble vitamins (A, D, E, K)?',
      'Do I have any fibrostenotic strictures that require tailored dietary fiber modification?'
    ]
  },
  {
    id: 'celiac-disease',
    name: 'Celiac Disease',
    shortName: 'Celiac',
    category: 'Gastrointestinal & Liver',
    tagline: 'Autoimmune enteropathy triggered by dietary gluten in genetically susceptible individuals.',
    overview: 'Celiac Disease is a systemic autoimmune disorder where ingestion of gluten (storage proteins found in wheat, rye, and barley) triggers an immune reaction damaging the small intestinal villi, resulting in villous atrophy, crypt hyperplasia, and severe nutrient malabsorption.',
    prevalence: 'Affects approx. 1% of the global population (many remain undiagnosed).',
    primaryOrgans: ['Small Intestine (Duodenum/Jejunum Villi)', 'Skin (Dermatitis Herpetiformis)', 'Bones', 'Nervous System'],
    hallmarkSymptoms: [
      'Chronic diarrhea, foul-smelling fatty stools (steatorrhea), or severe constipation',
      'Abdominal bloating, flatulence, and distension after meals',
      'Refractory iron-deficiency anemia unresponsive to oral iron',
      'Dermatitis Herpetiformis (intensely itchy, blistering skin rash on elbows, knees, buttocks)',
      'Unexplained bone loss / early osteoporosis or osteopenia',
      'Peripheral neuropathy (tingling in extremities), ataxia, or migraines',
      'Recurrent aphthous stomatitis (canker sores) and dental enamel defects',
      'Elevated unexplained liver enzymes (celiac hepatitis)'
    ],
    diagnosticTests: [
      {
        name: 'tTG-IgA',
        fullName: 'Tissue Transglutaminase IgA',
        purpose: 'Primary serological screening test (patient MUST be consuming gluten for accuracy).',
        significance: 'High sensitivity (>95%) and specificity for active celiac disease.'
      },
      {
        name: 'Total Serum IgA',
        fullName: 'Total Immunoglobulin A',
        purpose: 'Identifies selective IgA deficiency (which occurs in 2-3% of celiac patients and causes false-negative tTG-IgA).',
        significance: 'If deficient, DGP-IgG or tTG-IgG must be tested.'
      },
      {
        name: 'EMA-IgA',
        fullName: 'Endomysial Antibodies IgA',
        purpose: 'Confirmatory antibody assay.',
        significance: 'Extremely high specificity (~99%).'
      },
      {
        name: 'Upper Endoscopy with Duodenal Biopsy',
        fullName: 'Esophagogastroduodenoscopy (EGD) with Marsh Staging',
        purpose: 'Microscopic examination of 4-6 biopsies from duodenal bulb and second part.',
        significance: 'Gold standard confirming blunted villi and intraepithelial lymphocytosis.'
      }
    ],
    treatmentClasses: [
      {
        name: 'Strict 100% Gluten-Free Diet (Lifelong)',
        description: 'Complete elimination of all gluten cross-contact (<20 ppm) to allow villous regeneration.',
        examples: ['Dedicated gluten-free cookware', 'Certified GF foods', 'Eliminating hidden wheat/barley derivatives']
      },
      {
        name: 'Nutritional Rehabilitation',
        description: 'Replenishing micronutrient stores lost during malabsorption phase.',
        examples: ['Iron bisglycinate', 'Methylcobalamin B12', 'Vitamin D3 + Calcium', 'Zinc']
      }
    ],
    commonTriggers: [
      'Inadvertent gluten cross-contact in restaurants, shared toasters, fryer oil, cutting boards',
      'Hidden gluten in sauces, soy sauce, beer, oats without purity protocol, medications, and cosmetics',
      'Secondary lactose intolerance during initial villous recovery (lactase enzyme is made on villi tips)'
    ],
    evidenceBasedLifestyle: {
      diet: 'Naturally gluten-free whole food diet: fresh vegetables, fruits, poultry, fish, eggs, legumes, certified gluten-free grains (quinoa, wild rice, millet, buckwheat). Verify medications and supplements are certified GF.',
      exercise: 'Weight-bearing resistance exercise to build bone mineral density after malabsorption.',
      stressPacing: 'Dining out safety strategies (Nima sensor/testing tools, dedicated GF certified establishments, pre-travel planning).',
      supplementsToDiscuss: ['Vitamin D3 + K2', 'Bioavailable Iron', 'Digestive enzymes during transition', 'Probiotics']
    },
    flareWarningSigns: [
      'Sudden onset diarrhea, nausea, and cramping within 1-4 hours of accidental gluten ingestion ("glutened")',
      'Intense brain fog, mood irritability, and extreme lethargy lasting 3-7 days',
      'Outbreak of itchy fluid-filled vesicles (Dermatitis Herpetiformis)',
      'Recurrent mouth ulcers'
    ],
    questionsForDoctor: [
      'Have my tTG-IgA antibody titers normalized to baseline after initiating a gluten-free diet?',
      'Should we order a DEXA bone density scan to screen for osteopenia/osteoporosis?',
      'Do we need to re-check my Iron/Ferritin, Vitamin D, Zinc, and Folate levels?',
      'Should my first-degree family members (parents, siblings, children) undergo genetic HLA-DQ2/DQ8 or serology testing?'
    ]
  },
  {
    id: 'sjogrens-syndrome',
    name: "Sjögren's Syndrome",
    shortName: "Sjögren's",
    category: 'Dermatological & Connective',
    tagline: 'Autoimmune exocrinopathy targeting salivary and lacrimal moisture-producing glands.',
    overview: "Sjögren's Syndrome is a systemic autoimmune disorder characterized by lymphocytic infiltration of moisture-producing exocrine glands (primarily lacrimal and salivary glands), leading to severe dry eyes (keratoconjunctivitis sicca), dry mouth (xerostomia), and systemic multi-organ manifestations.",
    prevalence: 'Affects approx. 0.5% to 1% of population; 9:1 female to male ratio.',
    primaryOrgans: ['Salivary Glands', 'Lacrimal Glands (Eyes)', 'Joints', 'Peripheral Nerves', 'Lungs & Kidneys'],
    hallmarkSymptoms: [
      'Severe dry mouth (xerostomia), difficulty swallowing dry food without liquids',
      'Gritty, burning, "sand in eyes" sensation (keratoconjunctivitis sicca)',
      'Rapidly accelerated dental decay / cavities despite good hygiene',
      'Swollen parotid or submandibular salivary glands',
      'Profound, incapacitating systemic fatigue ("Sjögren\'s fatigue")',
      'Joint aches and morning stiffness without severe erosions',
      'Vaginal dryness, dry skin, and chronic non-productive dry cough',
      'Small fiber neuropathy (burning feet/numbness)'
    ],
    diagnosticTests: [
      {
        name: 'Anti-SSA (Ro) & Anti-SSB (La)',
        fullName: 'Sjögren\'s Specific Autoantibodies',
        purpose: 'Detects hallmark ribonucleoprotein autoantibodies.',
        significance: 'Positive in ~60-70% of primary Sjögren patients.'
      },
      {
        name: 'Schirmer Test',
        fullName: 'Ocular Tear Production Measurement',
        purpose: 'Evaluates reflex tear production using standardized filter paper strip over 5 minutes.',
        significance: '< 5 mm wetting confirms severe aqueous tear deficiency.'
      },
      {
        name: 'Ocular Surface Staining (Lissamine Green / Fluorescein)',
        fullName: 'Corneal & Conjunctival Epithelial Integrity',
        purpose: 'Identifies dry damaged spots on the corneal and conjunctival epithelium.',
        significance: 'Provides objective scoring for keratoconjunctivitis sicca.'
      },
      {
        name: 'Minor Salivary Gland Lip Biopsy',
        fullName: 'Histopathological Focus Score',
        purpose: 'Microscopic examination of lymphocytic focus score (>= 1 focus of >= 50 lymphocytes / 4mm²).',
        significance: 'Gold standard diagnostic criterion, especially for seronegative patients.'
      }
    ],
    treatmentClasses: [
      {
        name: 'Secretagogues (Gland Stimulators)',
        description: 'Muscarinic agonists stimulating residual functional salivary and tear flow.',
        examples: ['Pilocarpine (Salagen)', 'Cevimeline (Evoxac)']
      },
      {
        name: 'Preservative-Free Ophthalmic Solutions & Punctal Plugs',
        description: 'Topical lubricants, autologous serum drops, and tear duct occlusion.',
        examples: ['Cyclosporine eye drops (Restasis)', 'Lifitegrast (Xiidra)', 'Silicone punctal plugs']
      },
      {
        name: 'Systemic Immunomodulators',
        description: 'Treats joint pain, systemic vasculitis, and organ involvement.',
        examples: ['Hydroxychloroquine (Plaquenil)', 'Methotrexate', 'Rituximab (for severe systemic flares)']
      }
    ],
    commonTriggers: [
      'Dry, low-humidity environments, wind, air conditioning, and heating',
      'Medications with anticholinergic side effects (antihistamines, decongestants, TCAs)',
      'Prolonged screen time reducing blink frequency',
      'Acidic or sugary foods and beverages accelerating dental erosion',
      'Overexertion and sleep loss'
    ],
    evidenceBasedLifestyle: {
      diet: 'Moisture-rich culinary strategies: soups, stews, sauces, extra virgin olive oil; strictly avoid dry crunchy crackers or acidic sodas. Chew xylitol-sweetened gums to stimulate salivary flow.',
      exercise: 'Consistent low-impact walking and swimming (with protective swim goggles).',
      stressPacing: 'Home ultrasonic cool mist humidifiers (maintain 45-55% relative humidity), nighttime moisture chamber goggles.',
      supplementsToDiscuss: ['Omega-7 (Sea Buckthorn oil - clinically proven for mucous membranes)', 'High-dose Omega-3 (EPA/DHA)', 'Vitamin D3']
    },
    flareWarningSigns: [
      'Corneal abrasion or intense acute eye pain and redness (requires emergency ophthalmologist review)',
      'Severe tender swelling and heat in parotid cheek gland (suppurative parotitis risk)',
      'Rapid tooth decay or broken teeth',
      'Burning numbness spreading in toes or feet'
    ],
    questionsForDoctor: [
      'Should we perform a Schirmer test or refer to a dry eye corneal specialist for ocular staining and punctal plugs?',
      'Would prescription secretagogues (Cevimeline or Pilocarpine) help my mouth and eye dryness?',
      'Can you prescribe high-fluoride remineralizing toothpaste (e.g. Prevident 5000) to protect my teeth?',
      'Are we monitoring for rare systemic risks such as B-cell lymphoma (palpable lymph nodes/gland enlargement)?'
    ]
  },
  {
    id: 'psoriasis-and-psoriatic-arthritis',
    name: 'Psoriasis & Psoriatic Arthritis (PsA)',
    shortName: 'Psoriasis / PsA',
    category: 'Joints & Musculoskeletal',
    tagline: 'Immune-mediated dermatological and musculoskeletal disease involving IL-17/23 signaling.',
    overview: 'Psoriasis is a chronic autoimmune condition causing rapid keratinocyte proliferation, resulting in erythematous, scaly plaques. Approximately 30% of psoriasis patients develop Psoriatic Arthritis (PsA), characterized by enthesitis (inflammation where tendons attach to bone), dactylitis ("sausage digits"), and axial spine involvement.',
    prevalence: 'Psoriasis affects 2-3% of global population; PsA develops in ~30% of those with skin disease.',
    primaryOrgans: ['Skin (Extensor surfaces, Scalp, Nails)', 'Entheses & Tendons', 'Joints (DIP, Knees, Spine)', 'Metabolic System'],
    hallmarkSymptoms: [
      'Well-demarcated erythematous plaques covered with silvery-white scales',
      'Dactylitis: diffuse, tender, sausage-like swelling of an entire finger or toe',
      'Enthesitis: intense pain and tenderness at Achilles tendon or plantar fascia',
      'Nail changes: pitting, onycholysis (lifting), and subungual oil drop discoloration',
      'Asymmetric joint swelling, especially distal interphalangeal (DIP) joints of fingers',
      'Morning stiffness and inflammatory lower back / sacroiliac pain',
      'Eye inflammation (anterior uveitis)'
    ],
    diagnosticTests: [
      {
        name: 'CASPAR Criteria Scoring',
        fullName: 'Classification Criteria for Psoriatic Arthritis',
        purpose: 'Clinical diagnostic scoring system incorporating skin history, nail lesions, dactylitis, and negative RF.',
        significance: 'Score >= 3 points confirms high sensitivity/specificity for PsA.'
      },
      {
        name: 'CRP & ESR',
        fullName: 'Inflammatory Markers',
        purpose: 'Assesses systemic inflammation (elevated in ~50% of active PsA; normal in others).',
        significance: 'Helps track systemic burden.'
      },
      {
        name: 'Musculoskeletal Ultrasound / MRI',
        fullName: 'Entheseal High-Resolution Imaging',
        purpose: 'Detects cortical irregularity, bone erosion, and power Doppler signal at tendon insertions.',
        significance: 'Catches early enthesitis before irreversible radiographic damage.'
      },
      {
        name: 'HLA-B27',
        fullName: 'Human Leukocyte Antigen B27',
        purpose: 'Genetic marker associated with spondyloarthritis family.',
        significance: 'Positive in ~50% of PsA patients with axial spine/sacroiliac involvement.'
      }
    ],
    treatmentClasses: [
      {
        name: 'IL-17 & IL-23 Inhibitors',
        description: 'Highly effective biologics clearing both skin plaques and arresting joint/entheseal erosion.',
        examples: ['Secukinumab (Cosentyx)', 'Ixekizumab (Taltz)', 'Guselkumab (Tremfya)', 'Risankizumab (Skyrizi)']
      },
      {
        name: 'Anti-TNF Biologics',
        description: 'Established biologic class for combined peripheral and axial psoriatic disease.',
        examples: ['Adalimumab (Humira)', 'Certolizumab (Cimzia)', 'Golimumab (Simponi)']
      },
      {
        name: 'PDE4 Inhibitors & JAK Inhibitors',
        description: 'Oral targeted therapies suppressing intracellular phosphodiesterase-4 or Janus kinase.',
        examples: ['Apremilast (Otezla)', 'Upadacitinib (Rinvoq)', 'Tofacitinib']
      },
      {
        name: 'Topical Therapies & Phototherapy',
        description: 'Targeted skin management with vitamin D analogues, topical steroids, and Narrowband UVB.',
        examples: ['Calcipotriene', 'Clobetasol', 'Narrowband UVB']
      }
    ],
    commonTriggers: [
      'Skin trauma or friction (Koebner phenomenon — plaques forming at injury sites)',
      'Streptococcal pharyngeal infections (classic trigger for guttate psoriasis flares)',
      'Psychological stress surges',
      'Alcohol consumption and smoking',
      'Cold, dry winter weather'
    ],
    evidenceBasedLifestyle: {
      diet: 'Anti-inflammatory Mediterranean framework; weight loss interventions (adipose tissue secretes pro-inflammatory adipokines that impair biologic response). Limit alcohol and refined sugars.',
      exercise: 'Low-impact cycling, swimming, and resistance bands; gentle stretching for entheses (avoid aggressive sudden ballistic tendon loading).',
      stressPacing: 'Daily barrier repair emollient application (within 3 minutes of bathing), phototherapy pacing.',
      supplementsToDiscuss: ['Vitamin D3 (essential regulator of keratinocytes)', 'High-dose Omega-3', 'Zinc', 'Probiotics']
    },
    flareWarningSigns: [
      'Rapid spread of new scaly guttate or plaque lesions',
      'Sudden swelling of entire finger ("sausage digit") or excruciating heel pain on morning first step',
      'Joint redness and warmth in finger tips (DIP joints)',
      'Sudden eye redness and photophobia (uveitis emergency)'
    ],
    questionsForDoctor: [
      'Am I a candidate for an IL-17 or IL-23 biologic that addresses both my skin plaques and entheseal joint pain?',
      'Can we perform an ultrasound of my Achilles tendons and finger joints to evaluate subclinical enthesitis?',
      'How does my cardiovascular and metabolic risk profile look, and should we monitor lipids and blood pressure closely?'
    ]
  },
  {
    id: 'type-1-diabetes',
    name: 'Type 1 Diabetes Mellitus',
    shortName: 'T1D',
    category: 'Thyroid & Endocrine',
    tagline: 'Autoimmune destruction of insulin-producing beta cells in the pancreatic islets of Langerhans.',
    overview: 'Type 1 Diabetes is an autoimmune endocrinopathy where autoantibodies and cytotoxic T lymphocytes target pancreatic beta cells, causing near-complete insulin deficiency, metabolic dysregulation, and dependence on exogenous insulin.',
    prevalence: 'Affects approx. 9 million people worldwide; onset peaks in childhood/young adulthood but can occur at any age.',
    primaryOrgans: ['Pancreatic Beta Cells', 'Glucose Metabolism', 'Cardiovascular System', 'Microvasculature (Eyes, Kidneys, Nerves)'],
    hallmarkSymptoms: [
      'Polyuria (excessive, frequent urination, especially nocturia)',
      'Polydipsia (insatiable, unquenchable thirst)',
      'Polyphagia with unintended rapid weight loss',
      'Severe exhaustion, weakness, and ketone breath (fruity odor)',
      'Blurred vision due to lens osmotic fluid shifts',
      'Recurrent candidal infections (thrush or yeast infections)',
      'Diabetic Ketoacidosis (DKA) symptoms: nausea, vomiting, abdominal pain, Kussmaul breathing'
    ],
    diagnosticTests: [
      {
        name: 'Autoantibody Panel (GAD65, IA-2, ZnT8)',
        fullName: 'Glutamic Acid Decarboxylase, Islet Antigen 2, Zinc Transporter 8',
        purpose: 'Differentiates autoimmune T1D (including LADA) from Type 2 Diabetes.',
        significance: 'Positive in >90% of newly diagnosed autoimmune diabetes patients.'
      },
      {
        name: 'C-Peptide',
        fullName: 'Connecting Peptide',
        purpose: 'Byproduct of endogenous insulin synthesis; measures residual beta cell function.',
        significance: 'Low or undetectable C-peptide confirms absolute insulin deficiency.'
      },
      {
        name: 'HbA1c & Fasting Glucose',
        fullName: 'Glycated Hemoglobin & Plasma Glucose',
        purpose: 'Quantifies 90-day glycemic average.',
        significance: 'HbA1c >= 6.5% or fasting plasma glucose >= 126 mg/dL confirms diabetes.'
      }
    ],
    treatmentClasses: [
      {
        name: 'Basal-Bolus Exogenous Insulin Therapy',
        description: 'Life-sustaining physiological replacement via multiple daily injections (MDI) or Continuous Subcutaneous Insulin Infusion (CSII / Insulin Pump).',
        examples: ['Rapid-acting analogues (Lispro, Aspart)', 'Ultra-long acting basal (Degludec, Glargine)']
      },
      {
        name: 'Automated Insulin Delivery (AID) / Hybrid Closed Loop',
        description: 'Algorithms modulating basal insulin continuously based on real-time CGM readings.',
        examples: ['Tandem Control-IQ', 'Omnipod 5', 'Medtronic 780G']
      },
      {
        name: 'Continuous Glucose Monitoring (CGM)',
        description: 'Sensor measuring interstitial glucose every 1-5 minutes with predictive hypo/hyper alarms.',
        examples: ['Dexcom G7', 'Abbott FreeStyle Libre 3']
      }
    ],
    commonTriggers: [
      'Acute infections, fever, or viral illness (causes profound insulin resistance and ketone risk)',
      'Severe emotional stress or adrenaline spikes (triggers hepatic glucose dumping)',
      'High-glycemic processed carbohydrates without accurate bolus timing',
      'Infusion site failure / cannula bent under skin (rapid risk of DKA)',
      'Unplanned strenuous anaerobic vs aerobic exercise'
    ],
    evidenceBasedLifestyle: {
      diet: 'Nutrient-dense consistent carbohydrate meal composition, high in soluble fiber, healthy fats, and adequate protein to blunt glycemic velocity and postprandial spikes. Pre-bolusing insulin 15-20 minutes before meals.',
      exercise: 'Understanding glycemic effects of aerobic exercise (lowers glucose) vs high-intensity anaerobic sprints (transiently raises glucose due to cortisol/adrenaline).',
      stressPacing: 'Managing diabetes distress and burnout; regular backup supply kits for pump/sensor/rapid-acting insulin.',
      supplementsToDiscuss: ['Vitamin D3 (frequent co-deficiency)', 'Magnesium', 'Alpha-Lipoic Acid (for neuropathy prevention)', 'Thiamine']
    },
    flareWarningSigns: [
      'Blood glucose > 250 mg/dL with blood ketones > 1.5 mmol/L (impending DKA warning)',
      'Severe hypoglycemia (< 54 mg/dL) with confusion or inability to swallow fast carbs',
      'Persistent unexplained hyperglycemia unresponsive to correction boluses (check pump site)',
      'Nausea and vomiting during illness'
    ],
    questionsForDoctor: [
      'What is my Time-in-Range (TIR 70-180 mg/dL) and standard deviation over the last 90 days?',
      'Would I benefit from upgrading to a tubeless or tubed Automated Insulin Delivery (AID) system?',
      'Are we screening annually for autoimmune co-occurrences like Celiac disease (tTG-IgA) and Hashimoto’s thyroiditis (TSH)?',
      'Do we have an updated sick-day management protocol and ketone testing strips on hand?'
    ]
  },
  {
    id: 'myasthenia-gravis',
    name: 'Myasthenia Gravis (MG)',
    shortName: 'MG',
    category: 'Neurological & Neuromuscular',
    tagline: 'Neuromuscular junction disorder causing fluctuating fatigable skeletal muscle weakness.',
    overview: 'Myasthenia Gravis is an antibody-mediated autoimmune disease where autoantibodies block, alter, or destroy acetylcholine receptors (AChR) or MuSK at the neuromuscular junction, preventing normal nerve impulses from triggering muscle contraction.',
    prevalence: 'Affects approx. 14-20 per 100,000 people.',
    primaryOrgans: ['Neuromuscular Junctions', 'Ocular Muscles', 'Bulbar (Swallowing/Speech)', 'Respiratory Muscles'],
    hallmarkSymptoms: [
      'Ptosis (drooping of one or both eyelids), worse at the end of the day',
      'Diplopia (double vision), improving after resting eyes',
      'Bulbar weakness: dysarthria (slurred nasal speech), dysphagia (difficulty swallowing)',
      'Fatigable weakness in neck, shoulders, arms, and legs that worsens with activity and improves with rest',
      'Weakness of facial expression muscles ("myasthenic snarl")',
      'Shortness of breath on exertion or when lying flat (diaphragmatic weakness)'
    ],
    diagnosticTests: [
      {
        name: 'AChR-Ab',
        fullName: 'Acetylcholine Receptor Binding, Blocking & Modulating Antibodies',
        purpose: 'Primary diagnostic blood serology.',
        significance: 'Positive in ~85% of generalized MG and ~50% of purely ocular MG.'
      },
      {
        name: 'Anti-MuSK',
        fullName: 'Muscle-Specific Kinase Antibodies',
        purpose: 'Diagnostic for MuSK-positive seronegative MG patients.',
        significance: 'Often presents with prominent bulbar, neck, and respiratory weakness.'
      },
      {
        name: 'Repetitive Nerve Stimulation / Single-Fiber EMG',
        fullName: 'Electrophysiological Neuromuscular Testing',
        purpose: 'Measures decrement in compound muscle action potential (CMAP) with repetitive stimulation.',
        significance: 'Single-fiber EMG has >95% sensitivity for detecting neuromuscular transmission defect.'
      },
      {
        name: 'Chest CT with Contrast',
        fullName: 'Thymus Imaging',
        purpose: 'Screens for thymoma (thymus tumor present in 10-15% of patients) or thymic hyperplasia.',
        significance: 'Guides evaluation for surgical thymectomy.'
      }
    ],
    treatmentClasses: [
      {
        name: 'Cholinesterase Inhibitors',
        description: 'Symptomatic first-line agent prolonging acetylcholine availability at the synapse.',
        examples: ['Pyridostigmine (Mestinon)']
      },
      {
        name: 'Targeted Biologics (FcRn & Complement Inhibitors)',
        description: 'Advanced therapy blocking neonatal Fc receptor to clear IgG or inhibiting C5 complement.',
        examples: ['Efgartigimod (Vyvgart)', 'Ravulizumab (Ultomiris)', 'Rozanolixizumab (Rystiggo)']
      },
      {
        name: 'Immunosuppression & Thymectomy',
        description: 'Surgical removal of thymus gland and maintenance steroid-sparing immunosuppressants.',
        examples: ['Thymectomy', 'Mycophenolate Mofetil', 'Prednisone', 'Azathioprine']
      },
      {
        name: 'Emergency Rescue (Crisis)',
        description: 'Rapid removal or neutralization of circulating antibodies during myasthenic crisis.',
        examples: ['Plasmapheresis (PLEX)', 'Intravenous Immunoglobulin (IVIG)']
      }
    ],
    commonTriggers: [
      'Infections, fever, or respiratory viruses',
      'Medications that worsen neuromuscular block (Fluoroquinolones, Macrolides, Beta-blockers, Magnesium, Aminoglycosides)',
      'Heat, hot baths, hot summer temperatures',
      'Emotional stress and physical exhaustion',
      'Surgery and general anesthesia'
    ],
    evidenceBasedLifestyle: {
      diet: 'Soft, moist, nutrient-dense foods (purees, smoothies, soft fish) during periods of peak Mestinon effectiveness (typically 30-45 minutes after taking dose). Eat smaller, frequent meals to avoid chewing fatigue.',
      exercise: 'Carefully paced low-resistance exercise; stop immediately at first sign of muscle fatigue (do not "push through" muscle fatigue in MG).',
      stressPacing: 'Strict energy conservation, cooling packs, scheduled resting intervals before speech/meals.',
      supplementsToDiscuss: ['Vitamin D3', 'CoQ10 (Check all supplements with neurologist to avoid neuromuscular blockers like high-dose magnesium)']
    },
    flareWarningSigns: [
      'Myasthenic Crisis Warning: difficulty swallowing saliva, choking on liquids, or shortness of breath',
      'Inability to count to 20 on a single breath (single-breath count test)',
      'Severe weakness holding head up ("dropped head syndrome")',
      'Severe bilateral ptosis obstructing pupil'
    ],
    questionsForDoctor: [
      'Would I be a candidate for newer targeted FcRn antagonists (like Vyvgart) to reduce long-term prednisone use?',
      'Has my chest CT been evaluated for thymoma or thymic hyperplasia, and would thymectomy be beneficial for me?',
      'Do I have an up-to-date printed wallet card listing all contraindicated medications for Myasthenia Gravis?'
    ]
  }
];

export const SYMPTOM_CHECKER_PRESETS = [
  { id: 'fatigue', label: 'Chronic Unrefreshing Fatigue', category: 'General' },
  { id: 'joint_pain', label: 'Symmetrical Joint Pain / Swelling', category: 'Musculoskeletal' },
  { id: 'morning_stiffness', label: 'Morning Stiffness > 45 minutes', category: 'Musculoskeletal' },
  { id: 'brain_fog', label: 'Brain Fog / Cognitive Sluggishness', category: 'Neurological' },
  { id: 'butterfly_rash', label: 'Facial Butterfly Rash (Malar)', category: 'Dermatological' },
  { id: 'photosensitivity', label: 'Sunlight Sensitivity / Flare', category: 'Dermatological' },
  { id: 'cold_intolerance', label: 'Extreme Cold Intolerance', category: 'Endocrine' },
  { id: 'heat_intolerance', label: 'Extreme Heat Sensitivity / Uhthoff', category: 'Neurological' },
  { id: 'dry_eyes_mouth', label: 'Severe Dry Eyes / Gritty Mouth', category: 'Sicca' },
  { id: 'hair_loss', label: 'Diffuse Hair Loss / Thinning', category: 'Dermatological' },
  { id: 'diarrhea_cramps', label: 'Chronic Diarrhea / Abdominal Cramps', category: 'Gastrointestinal' },
  { id: 'gluten_reaction', label: 'Severe Bloating / Reaction to Gluten', category: 'Gastrointestinal' },
  { id: 'tingling_numbness', label: 'Tingling / Numbness in Limbs', category: 'Neurological' },
  { id: 'sausage_digits', label: 'Swollen "Sausage" Fingers / Dactylitis', category: 'Musculoskeletal' },
  { id: 'heel_pain', label: 'Achilles / Plantar Heel Pain (Enthesitis)', category: 'Musculoskeletal' },
  { id: 'eyelid_droop', label: 'Eyelid Droop / Fatigable Weakness', category: 'Neuromuscular' },
  { id: 'raynauds', label: 'Fingers Turning White/Blue in Cold', category: 'Vascular' },
  { id: 'unexplained_weight', label: 'Unexplained Weight Shifts', category: 'Endocrine' }
];

export const INITIAL_FORUM_POSTS = [
  {
    id: 'post-1',
    title: 'Just diagnosed with Hashimoto’s & elevated TPO (1,240 IU/mL). Feeling overwhelmed—where do I start?',
    content: 'Hi everyone 💜 After 2 years of doctors telling me my fatigue and brain fog were "just stress", a new functional endocrinologist finally ran a full thyroid antibody panel. My TPO is over 1,200. I feel relieved to finally have an answer, but terrified of what comes next. How did you handle the first few months after diagnosis? Any tips on starting Levothyroxine vs diet changes?',
    category: 'Newly Diagnosed' as const,
    authorName: 'Sarah Jenkins',
    authorHandle: 'sarah_j_spoonie',
    authorCondition: "Hashimoto's Thyroiditis",
    isAnonymous: false,
    timestamp: Date.now() - 1000 * 60 * 60 * 4, // 4 hours ago
    tags: ['Hashimotos', 'NewlyDiagnosed', 'TPOAntibodies', 'ThyroidSupport'],
    reactions: {
      strength: 24,
      spoons: 18,
      helpful: 31,
      hug: 15
    },
    comments: [
      {
        id: 'c-1',
        postId: 'post-1',
        authorName: 'Elena Rostova',
        authorHandle: 'elena_wellness',
        isAnonymous: false,
        conditionTag: "Hashimoto's (8 yrs)",
        timestamp: Date.now() - 1000 * 60 * 60 * 3,
        content: 'Welcome to our community, Sarah! First rule: breathe. Having a diagnosis is the turning point because now you can take targeted action. Take your Levo on an empty stomach with a full glass of water and wait at least 45-60 min before coffee or food. Going gluten-free dropped my TPO antibodies by half over a year. You got this!',
        likes: 14
      },
      {
        id: 'c-2',
        postId: 'post-1',
        authorName: 'Anonymous Warrior',
        authorHandle: 'spoonie_anon',
        isAnonymous: true,
        conditionTag: "Autoimmune Overlap",
        timestamp: Date.now() - 1000 * 60 * 60 * 2,
        content: 'Check your Ferritin and Vitamin D levels too! Many of us with Hashis are deficient, and optimal ferritin is needed for your body to actually convert T4 into active T3. Sending you extra spoons today 🥄💜',
        likes: 9
      }
    ],
    isPinned: true
  },
  {
    id: 'post-2',
    title: 'Rainy barometric pressure drop is triggering a massive RA flare. What is your go-to Flare SOS routine?',
    content: 'A huge low-pressure rain front just rolled in, and my hands feel like they are packed with broken glass and swelling twice their normal size. I am at 2 spoons for the day. Would love to hear your comforting, low-energy flare hacks. What helps you survive days when every joint screams?',
    category: 'Flare SOS & Coping' as const,
    authorName: 'Marcus Rivera',
    authorHandle: 'marcus_ra_runner',
    authorCondition: 'Rheumatoid Arthritis',
    isAnonymous: false,
    timestamp: Date.now() - 1000 * 60 * 60 * 12,
    tags: ['RheumatoidArthritis', 'FlareSOS', 'WeatherTriggers', 'PainManagement'],
    reactions: {
      strength: 42,
      spoons: 38,
      helpful: 27,
      hug: 19
    },
    comments: [
      {
        id: 'c-3',
        postId: 'post-2',
        authorName: 'David K.',
        authorHandle: 'dave_lupus_warrior',
        isAnonymous: false,
        conditionTag: 'Lupus & RA',
        timestamp: Date.now() - 1000 * 60 * 60 * 9,
        content: 'Compression gloves infused with copper + heated paraffin wax bath for hands! Also, give yourself total permission to order delivery soup and leave all chores undone. Pacing is medicine.',
        likes: 18
      }
    ]
  },
  {
    id: 'post-3',
    title: 'Humira (Adalimumab) vs Skyrizi experiences for Crohn’s / Psoriatic Arthritis?',
    content: 'My gastroenterologist is recommending we step up to a biologic after my Fecal Calprotectin came back at 420 mcg/g. I am a bit nervous about self-injections. How was your experience transitioning to biologics, and how long did it take before you felt your energy and gut start recovering?',
    category: 'Medications & Biologics' as const,
    authorName: 'Anonymous Member',
    authorHandle: 'crohns_fighter',
    authorCondition: "Crohn's Disease",
    isAnonymous: true,
    timestamp: Date.now() - 1000 * 60 * 60 * 24,
    tags: ['Crohns', 'Biologics', 'Humira', 'GutHealth', 'MedicationReview'],
    reactions: {
      strength: 19,
      spoons: 14,
      helpful: 45,
      hug: 8
    },
    comments: [
      {
        id: 'c-4',
        postId: 'post-3',
        authorName: 'Rachel Green',
        authorHandle: 'rachel_guthealer',
        isAnonymous: false,
        conditionTag: "Crohn's in Remission",
        timestamp: Date.now() - 1000 * 60 * 60 * 18,
        content: 'I was terrified of the autoinjector at first, but honestly it takes 10 seconds and the pen needles are so tiny you barely feel a pinch (letting it warm to room temp for 30 min first is key!). By week 8 my calprotectin dropped under 50 and I got my life back.',
        likes: 22
      }
    ]
  },
  {
    id: 'post-4',
    title: 'Celebrating 1 Year in Endoscopic Remission with AIP + Low-dose Naltrexone 🎉',
    content: 'Exactly one year ago I was bedbound, losing weight, and feeling like my body was fighting a war against itself. Today my follow-up colonoscopy showed 100% mucosal healing! I wanted to share this win to remind everyone currently in the dark trenches of a flare: healing is possible. Don’t lose hope.',
    category: 'Wins & Milestones' as const,
    authorName: 'Chloe Bennett',
    authorHandle: 'chloe_thriving',
    authorCondition: 'IBD & Celiac',
    isAnonymous: false,
    timestamp: Date.now() - 1000 * 60 * 60 * 36,
    tags: ['Remission', 'Hope', 'AIPSuccess', 'Celebration', 'SpoonieWins'],
    reactions: {
      strength: 88,
      spoons: 76,
      helpful: 52,
      hug: 41
    },
    comments: []
  }
];

export const INITIAL_SAMPLE_LOGS = [
  {
    id: 'log-1',
    date: new Date(Date.now() - 86400000 * 4).toISOString().split('T')[0],
    timestamp: Date.now() - 86400000 * 4,
    overallEnergy: 4,
    painLevel: 6,
    fatigueLevel: 7,
    brainFogLevel: 6,
    jointStiffnessLevel: 7,
    gutDistressLevel: 4,
    sleepHours: 6.5,
    sleepQuality: 'Poor' as const,
    mood: 'Struggling' as const,
    activeSymptoms: ['Morning stiffness > 45 minutes', 'Joint pain', 'Brain fog', 'Fatigue'],
    identifiedTriggers: ['Weather pressure drop', 'High work stress'],
    medications: [
      { name: 'Levothyroxine', dose: '88mcg', taken: true },
      { name: 'Hydroxychloroquine', dose: '200mg', taken: true },
      { name: 'Vitamin D3/K2', dose: '5000 IU', taken: true }
    ],
    spoonsUsedToday: 11,
    spoonsBudget: 12,
    notes: 'Rainstorm hit. Woke up with stiff fingers and heavy brain fog. Took a warm Epsom bath.',
    flareUpActive: true
  },
  {
    id: 'log-2',
    date: new Date(Date.now() - 86400000 * 3).toISOString().split('T')[0],
    timestamp: Date.now() - 86400000 * 3,
    overallEnergy: 5,
    painLevel: 5,
    fatigueLevel: 6,
    brainFogLevel: 4,
    jointStiffnessLevel: 5,
    gutDistressLevel: 3,
    sleepHours: 7.5,
    sleepQuality: 'Fair' as const,
    mood: 'Low' as const,
    activeSymptoms: ['Joint pain', 'Fatigue'],
    identifiedTriggers: ['Poor sleep previous night'],
    medications: [
      { name: 'Levothyroxine', dose: '88mcg', taken: true },
      { name: 'Hydroxychloroquine', dose: '200mg', taken: true },
      { name: 'Vitamin D3/K2', dose: '5000 IU', taken: true }
    ],
    spoonsUsedToday: 9,
    spoonsBudget: 12,
    notes: 'Paced carefully today. Took a 30 min nap at lunch. Stiffness reduced by afternoon.',
    flareUpActive: true
  },
  {
    id: 'log-3',
    date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
    timestamp: Date.now() - 86400000 * 2,
    overallEnergy: 7,
    painLevel: 3,
    fatigueLevel: 4,
    brainFogLevel: 2,
    jointStiffnessLevel: 3,
    gutDistressLevel: 2,
    sleepHours: 8.5,
    sleepQuality: 'Good' as const,
    mood: 'Stable' as const,
    activeSymptoms: ['Mild fatigue'],
    identifiedTriggers: [],
    medications: [
      { name: 'Levothyroxine', dose: '88mcg', taken: true },
      { name: 'Hydroxychloroquine', dose: '200mg', taken: true },
      { name: 'Vitamin D3/K2', dose: '5000 IU', taken: true }
    ],
    spoonsUsedToday: 7,
    spoonsBudget: 12,
    notes: 'Felt much more clearheaded. Cooked anti-inflammatory salmon and sweet potato.',
    flareUpActive: false
  },
  {
    id: 'log-4',
    date: new Date(Date.now() - 86400000 * 1).toISOString().split('T')[0],
    timestamp: Date.now() - 86400000 * 1,
    overallEnergy: 8,
    painLevel: 2,
    fatigueLevel: 3,
    brainFogLevel: 2,
    jointStiffnessLevel: 2,
    gutDistressLevel: 1,
    sleepHours: 8,
    sleepQuality: 'Restful' as const,
    mood: 'Energized' as const,
    activeSymptoms: [],
    identifiedTriggers: [],
    medications: [
      { name: 'Levothyroxine', dose: '88mcg', taken: true },
      { name: 'Hydroxychloroquine', dose: '200mg', taken: true },
      { name: 'Vitamin D3/K2', dose: '5000 IU', taken: true }
    ],
    spoonsUsedToday: 8,
    spoonsBudget: 12,
    notes: 'Great day. Did a 25-minute gentle walk and 10 minutes of somatic breathing.',
    flareUpActive: false
  }
];
