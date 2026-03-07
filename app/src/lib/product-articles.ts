import { getAllArticleSummaries, type ArticleSummary } from "./articles";

// Maps product slugs to search keywords for finding related articles
const PRODUCT_KEYWORDS: Record<string, string[]> = {
  semaglutide: ["semaglutide", "glp-1", "wegovy", "ozempic"],
  tirzepatide: ["tirzepatide", "zepbound", "mounjaro", "glp-1"],
  liraglutide: ["liraglutide", "saxenda", "victoza", "glp-1"],
  retatrutide: ["retatrutide", "triple-agonist", "glp-1"],
  cagrilintide: ["cagrilintide", "amylin", "cagrisema"],
  tesofensine: ["tesofensine", "weight-loss", "appetite"],
  "aod-9604": ["aod-9604", "fragment", "fat-loss", "hgh"],
  "bpc-157": ["bpc-157", "bpc157", "gut-health", "healing"],
  "tb-500": ["tb-500", "tb500", "thymosin-beta", "recovery"],
  "bpc-157-tb-500-blend": ["bpc-157", "tb-500", "blend", "recovery"],
  "tb-500-fragment": ["tb-500", "ac-sdkp", "anti-fibrotic"],
  "pentadecapeptide-bpc": ["bpc-157", "oral", "gut-health", "arginate"],
  ghk: ["ghk", "wound-healing", "tripeptide"],
  "cjc-1295-ipamorelin": ["cjc-1295", "ipamorelin", "growth-hormone"],
  "cjc-1295-dac": ["cjc-1295", "dac", "growth-hormone"],
  sermorelin: ["sermorelin", "ghrh", "growth-hormone"],
  tesamorelin: ["tesamorelin", "egrifta", "growth-hormone", "visceral"],
  "mk-677": ["mk-677", "ibutamoren", "growth-hormone"],
  "igf-1-lr3": ["igf-1", "igf", "growth-factor"],
  "igf-1-des": ["igf-1", "igf", "des", "growth-factor"],
  hexarelin: ["hexarelin", "growth-hormone", "secretagogue"],
  "ghrp-2": ["ghrp-2", "ghrp", "growth-hormone"],
  "ghrp-6": ["ghrp-6", "ghrp", "growth-hormone"],
  "follistatin-344": ["follistatin", "myostatin", "muscle"],
  epithalon: ["epithalon", "epitalon", "telomerase", "anti-aging"],
  "ghk-cu": ["ghk-cu", "copper-peptide", "anti-aging", "skin"],
  "nad-plus": ["nad", "nad+", "longevity", "anti-aging"],
  "nad-nasal": ["nad", "nad+", "nasal", "longevity"],
  "foxo4-dri": ["foxo4", "senolytic", "senescent", "anti-aging"],
  "ss-31": ["ss-31", "elamipretide", "mitochondria", "anti-aging"],
  humanin: ["humanin", "mitochondria", "longevity"],
  "5-amino-1mq": ["5-amino-1mq", "nnmt", "nad", "metabolic"],
  semax: ["semax", "nootropic", "cognitive", "bdnf"],
  selank: ["selank", "anxiety", "cognitive", "gaba"],
  dihexa: ["dihexa", "cognitive", "nootropic", "bdnf"],
  "n-acetyl-semax-amidate": ["semax", "nasa", "nootropic", "cognitive"],
  "n-acetyl-selank-amidate": ["selank", "anxiolytic", "cognitive"],
  p21: ["p21", "p021", "neurogenesis", "cognitive"],
  "thymosin-alpha-1": ["thymosin-alpha", "immune", "thymus"],
  "ll-37": ["ll-37", "antimicrobial", "immune"],
  kpv: ["kpv", "alpha-msh", "anti-inflammatory", "immune"],
  "ta1-thymalin": ["thymalin", "thymus", "immune"],
  vip: ["vip", "vasoactive", "cirs", "anti-inflammatory"],
  "ace-031": ["ace-031", "myostatin", "activin", "muscle"],
  "ghk-cu-topical": ["ghk-cu", "copper-peptide", "skin", "topical"],
  "melanotan-ii": ["melanotan", "tanning", "skin"],
  "copper-peptide-ahk-cu": ["ahk-cu", "hair", "copper", "follicle"],
  "snap-8": ["snap-8", "wrinkle", "skin", "argireline"],
  matrixyl: ["matrixyl", "collagen", "wrinkle", "skin"],
  "pt-141": ["pt-141", "bremelanotide", "sexual"],
  dsip: ["dsip", "delta-sleep", "sleep"],
  "kisspeptin-10": ["kisspeptin", "gnrh", "sexual", "reproductive"],
  gonadorelin: ["gonadorelin", "gnrh", "testosterone", "fertility"],
  oxytocin: ["oxytocin", "bonding", "sexual"],
  larazotide: ["larazotide", "tight-junction", "celiac", "gut"],
  "bpc-157-kpv-blend": ["bpc-157", "kpv", "gut", "inflammation"],
  epithalamin: ["epithalon", "epitalon", "telomerase", "bioregulator"],
  pinealon: ["pinealon", "bioregulator", "neuroprotection"],
  vesilute: ["vesilute", "vascular", "bioregulator"],
  adipotide: ["adipotide", "ftpp", "fat-loss"],
  aicar: ["aicar", "ampk", "exercise", "metabolic"],
  "fragment-176-191": ["fragment-176", "hgh-fragment", "fat-loss"],
  epitalon: ["epitalon", "epithalon", "melatonin", "sleep", "pineal"],
  "selank-nasal": ["selank", "nasal", "anxiety", "stress"],
  "mots-c": ["mots-c", "mitochondria", "metabolic", "exercise"],
};

export function getRelatedArticlesForProduct(
  productSlug: string,
  limit = 4
): { hub: string; slug: string; title: string }[] {
  const keywords = PRODUCT_KEYWORDS[productSlug];
  if (!keywords || keywords.length === 0) return [];

  let articles: ArticleSummary[];
  try {
    articles = getAllArticleSummaries();
  } catch {
    return [];
  }

  if (!articles || articles.length === 0) return [];

  // Score articles by keyword overlap
  const scored = articles.map((a) => {
    const slugWords = a.slug.toLowerCase();
    const titleWords = a.title.toLowerCase();
    let score = 0;
    for (const kw of keywords) {
      if (slugWords.includes(kw)) score += 3;
      if (titleWords.includes(kw)) score += 2;
    }
    return { article: a, score };
  });

  scored.sort((a, b) => b.score - a.score);

  return scored
    .filter((s) => s.score >= 3)
    .slice(0, limit)
    .map((s) => ({
      hub: s.article.hub,
      slug: s.article.slug,
      title: s.article.title,
    }));
}
