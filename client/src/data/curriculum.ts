import type { CefrLevel } from "@shared/learning";

export type CurriculumLesson = {
  id: string;
  stamp: string;
  level: CefrLevel;
  titleFr: string;
  titleAr: string;
  eyebrowFr: string;
  eyebrowAr: string;
  duration: string;
  phrase: string;
  translation: string;
  questionId: string;
  questionFr: string;
  questionAr: string;
  options: string[];
  answer: string;
  writingPromptFr: string;
  writingPromptAr: string;
};

export type VocabularyItem = {
  id: string;
  level: CefrLevel;
  category: "quotidien" | "voyage" | "travail" | "culture" | "opinion" | "liaisons";
  fr: string;
  ar: string;
};

export const levelLabels: Record<CefrLevel, { fr: string; ar: string }> = {
  A1: { fr: "Premiers pas", ar: "البدايات" },
  A2: { fr: "Vie quotidienne", ar: "الحياة اليومية" },
  B1: { fr: "Autonomie", ar: "الاستقلالية" },
  B2: { fr: "Nuance", ar: "التعبير الدقيق" },
  C1: { fr: "Expression fine", ar: "الطلاقة المتقدمة" },
};

export const curriculumLessons: CurriculumLesson[] = [
  { id: "a1-salutations", stamp: "01", level: "A1", titleFr: "Dire bonjour, naturellement", titleAr: "التحية بثقة وطبيعية", eyebrowFr: "Première page", eyebrowAr: "الصفحة الأولى", duration: "12 min", phrase: "Bonjour, je m'appelle Lina. Enchantée.", translation: "مرحباً، اسمي لينا. تشرفت بلقائك.", questionId: "a1-etre-nous", questionFr: "Choisissez la bonne forme : Nous ___ à Paris.", questionAr: "اختر التصريف الصحيح: Nous ___ à Paris.", options: ["sommes", "êtes", "sont"], answer: "sommes", writingPromptFr: "Composez une phrase simple avec « je suis ».", writingPromptAr: "اكتب جملة بسيطة تستخدم فيها « je suis »." },
  { id: "a1-cafe", stamp: "02", level: "A1", titleFr: "Commander au café", titleAr: "الطلب في المقهى", eyebrowFr: "Parler dehors", eyebrowAr: "تحدث خارج الصف", duration: "16 min", phrase: "Je voudrais un café, s'il vous plaît.", translation: "أود قهوة من فضلك.", questionId: "a1-cafe-polite", questionFr: "Quelle formule est la plus polie ?", questionAr: "ما العبارة الأكثر لباقة؟", options: ["Je voudrais", "Donne-moi", "Tu veux"], answer: "Je voudrais", writingPromptFr: "Commandez une boisson et une pâtisserie.", writingPromptAr: "اطلب مشروباً وقطعة حلوى." },
  { id: "a1-etre", stamp: "03", level: "A1", titleFr: "Être, la phrase essentielle", titleAr: "Être، أساس الجملة", eyebrowFr: "Grammaire utile", eyebrowAr: "قواعد مفيدة", duration: "14 min", phrase: "Nous sommes prêts à apprendre.", translation: "نحن مستعدون للتعلم.", questionId: "a1-etre-vous", questionFr: "Vous ___ très gentil.", questionAr: "Vous ___ très gentil.", options: ["êtes", "sommes", "suis"], answer: "êtes", writingPromptFr: "Présentez deux qualités de votre personnalité.", writingPromptAr: "عرّف عن صفتين من شخصيتك." },
  { id: "a2-routine", stamp: "04", level: "A2", titleFr: "Raconter sa routine", titleAr: "وصف الروتين اليومي", eyebrowFr: "Vie quotidienne", eyebrowAr: "الحياة اليومية", duration: "18 min", phrase: "Le matin, je prends le métro avant de travailler.", translation: "في الصباح، أستقل المترو قبل العمل.", questionId: "a2-routine-frequency", questionFr: "Je vais au marché ___ samedi.", questionAr: "Je vais au marché ___ samedi.", options: ["chaque", "depuis", "pendant"], answer: "chaque", writingPromptFr: "Décrivez votre matinée en trois phrases.", writingPromptAr: "صِف صباحك في ثلاث جمل." },
  { id: "a2-voyage", stamp: "05", level: "A2", titleFr: "Préparer un week-end", titleAr: "التحضير لعطلة قصيرة", eyebrowFr: "Voyager léger", eyebrowAr: "سفر خفيف", duration: "20 min", phrase: "Nous allons réserver une chambre près de la gare.", translation: "سنحجز غرفة قرب المحطة.", questionId: "a2-futur-proche", questionFr: "Demain, ils ___ visiter le musée.", questionAr: "Demain, ils ___ visiter le musée.", options: ["vont", "ont", "étaient"], answer: "vont", writingPromptFr: "Écrivez un petit plan pour votre week-end.", writingPromptAr: "اكتب خطة قصيرة لعطلة نهاية الأسبوع." },
  { id: "a2-souvenirs", stamp: "06", level: "A2", titleFr: "Partager un souvenir", titleAr: "مشاركة ذكرى", eyebrowFr: "Passé composé", eyebrowAr: "الماضي القريب", duration: "19 min", phrase: "Hier, j'ai découvert un quartier plein de couleurs.", translation: "بالأمس، اكتشفت حياً مليئاً بالألوان.", questionId: "a2-passe-compose", questionFr: "Elle ___ une photo hier.", questionAr: "Elle ___ une photo hier.", options: ["a pris", "prend", "prendra"], answer: "a pris", writingPromptFr: "Racontez un souvenir récent en deux phrases.", writingPromptAr: "احكِ ذكرى حديثة في جملتين." },
  { id: "b1-opinion", stamp: "07", level: "B1", titleFr: "Donner son avis", titleAr: "إبداء الرأي", eyebrowFr: "Nuancer", eyebrowAr: "إبداء التفاصيل", duration: "22 min", phrase: "À mon avis, cette idée mérite qu'on en discute.", translation: "برأيي، تستحق هذه الفكرة أن نناقشها.", questionId: "b1-opinion", questionFr: "___ je comprends ton idée, je ne suis pas d'accord.", questionAr: "___ je comprends ton idée, je ne suis pas d'accord.", options: ["Même si", "Parce que", "Depuis"], answer: "Même si", writingPromptFr: "Donnez votre avis sur l'apprentissage en ligne.", writingPromptAr: "أبدِ رأيك في التعلم عبر الإنترنت." },
  { id: "b1-projets", stamp: "08", level: "B1", titleFr: "Parler de ses projets", titleAr: "الحديث عن الخطط", eyebrowFr: "Hypothèses", eyebrowAr: "الافتراضات", duration: "23 min", phrase: "Si j'avais plus de temps, je voyagerais davantage.", translation: "لو كان لدي وقت أكثر، لسافرت أكثر.", questionId: "b1-conditionnel", questionFr: "Si nous étions à Lyon, nous ___ les quais.", questionAr: "Si nous étions à Lyon, nous ___ les quais.", options: ["visiterions", "visiterons", "visitons"], answer: "visiterions", writingPromptFr: "Imaginez un projet que vous aimeriez réaliser.", writingPromptAr: "تخيّل مشروعاً تود إنجازه." },
  { id: "b1-travail", stamp: "09", level: "B1", titleFr: "Collaborer au travail", titleAr: "التعاون في العمل", eyebrowFr: "Communication", eyebrowAr: "التواصل", duration: "21 min", phrase: "Je vous envoie le document dès que je le termine.", translation: "سأرسل لك المستند حالما أنهيه.", questionId: "b1-temps", questionFr: "Dès qu'il ___, nous commencerons.", questionAr: "Dès qu'il ___, nous commencerons.", options: ["arrive", "arrivera", "arrivait"], answer: "arrive", writingPromptFr: "Rédigez un message professionnel de trois lignes.", writingPromptAr: "اكتب رسالة مهنية من ثلاثة أسطر." },
  { id: "b2-debat", stamp: "10", level: "B2", titleFr: "Construire un débat", titleAr: "بناء نقاش", eyebrowFr: "Argumenter", eyebrowAr: "الحِجاج", duration: "26 min", phrase: "Bien que le sujet soit complexe, il faut agir maintenant.", translation: "رغم أن الموضوع معقد، يجب التصرف الآن.", questionId: "b2-subjonctif", questionFr: "Il faut que vous ___ votre point de vue.", questionAr: "Il faut que vous ___ votre point de vue.", options: ["exprimiez", "exprimez", "exprimerez"], answer: "exprimiez", writingPromptFr: "Présentez un argument et une réserve sur un sujet actuel.", writingPromptAr: "قدّم حجة وتحفّظاً حول موضوع معاصر." },
  { id: "b2-medias", stamp: "11", level: "B2", titleFr: "Lire entre les lignes", titleAr: "قراءة ما بين السطور", eyebrowFr: "Médias", eyebrowAr: "الإعلام", duration: "25 min", phrase: "Cette analyse met en lumière les enjeux du récit.", translation: "يسلط هذا التحليل الضوء على رهانات السرد.", questionId: "b2-linker", questionFr: "Le texte est clair ; ___, sa conclusion reste discutable.", questionAr: "Le texte est clair ; ___, sa conclusion reste discutable.", options: ["cependant", "donc", "puisque"], answer: "cependant", writingPromptFr: "Résumez un article et ajoutez votre regard critique.", writingPromptAr: "لخّص مقالاً وأضف نظرتك النقدية." },
  { id: "c1-register", stamp: "12", level: "C1", titleFr: "Maîtriser le registre", titleAr: "إتقان مستوى اللغة", eyebrowFr: "Précision", eyebrowAr: "الدقة", duration: "28 min", phrase: "Le ton employé doit s'adapter au contexte et à l'interlocuteur.", translation: "يجب أن تتكيف النبرة المستخدمة مع السياق والمخاطَب.", questionId: "c1-register", questionFr: "Cette formule est la plus ___ dans un courrier officiel.", questionAr: "Cette formule est la plus ___ dans un courrier officiel.", options: ["appropriée", "familier", "spontanée"], answer: "appropriée", writingPromptFr: "Reformulez un message familier dans un registre soutenu.", writingPromptAr: "أعد صياغة رسالة غير رسمية بأسلوب رفيع." },
  { id: "c1-ideas", stamp: "13", level: "C1", titleFr: "Relier des idées complexes", titleAr: "ربط الأفكار المعقدة", eyebrowFr: "Discours", eyebrowAr: "خطاب متماسك", duration: "30 min", phrase: "À supposer même que cette hypothèse soit exacte, elle ne suffit pas.", translation: "حتى لو افترضنا صحة هذه الفرضية، فهي لا تكفي.", questionId: "c1-concession", questionFr: "___ cette difficulté, la proposition reste cohérente.", questionAr: "___ cette difficulté, la proposition reste cohérente.", options: ["Malgré", "Grâce à", "Depuis"], answer: "Malgré", writingPromptFr: "Développez une idée nuancée en quatre phrases liées.", writingPromptAr: "طوّر فكرة دقيقة في أربع جمل مترابطة." },
];

export const vocabularyItems: VocabularyItem[] = [
  { id: "daily-bonjour", level: "A1", category: "quotidien", fr: "bonjour", ar: "مرحباً" }, { id: "daily-rendezvous", level: "A2", category: "quotidien", fr: "rendez-vous", ar: "موعد" }, { id: "travel-billet", level: "A1", category: "voyage", fr: "billet", ar: "تذكرة" }, { id: "travel-quai", level: "B1", category: "voyage", fr: "quai", ar: "رصيف المحطة" }, { id: "work-reunion", level: "A2", category: "travail", fr: "réunion", ar: "اجتماع" }, { id: "work-echance", level: "B2", category: "travail", fr: "échéance", ar: "موعد نهائي" }, { id: "culture-exposition", level: "A2", category: "culture", fr: "exposition", ar: "معرض" }, { id: "culture-patrimoine", level: "C1", category: "culture", fr: "patrimoine", ar: "تراث" }, { id: "opinion-pourtant", level: "B1", category: "opinion", fr: "pourtant", ar: "مع ذلك" }, { id: "opinion-nuance", level: "B2", category: "opinion", fr: "nuance", ar: "تفصيل دقيق" }, { id: "linkers-dabord", level: "A2", category: "liaisons", fr: "d'abord", ar: "أولاً" }, { id: "linkers-neanmoins", level: "C1", category: "liaisons", fr: "néanmoins", ar: "ومع ذلك" },
];

export const vocabularyCategoryLabels = {
  quotidien: { fr: "Quotidien", ar: "اليومي" },
  voyage: { fr: "Voyage", ar: "السفر" },
  travail: { fr: "Travail", ar: "العمل" },
  culture: { fr: "Culture", ar: "الثقافة" },
  opinion: { fr: "Opinion", ar: "الرأي" },
  liaisons: { fr: "Liaisons", ar: "الروابط" },
} as const;
