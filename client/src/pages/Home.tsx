/**
 * Ma France — الدفتر الباريسي الحي: واجهة تحريرية دافئة، غير متماثلة، ثنائية اللغة.
 * تلتزم هذه الصفحة بورق عاجي، أزرق الحبر، وختم تقدّم أحمر بدل نمط البطاقات العامة.
 */
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Check,
  ChevronRight,
  Compass,
  Flame,
  Globe2,
  Library,
  MessageCircle,
  Moon,
  PenLine,
  Play,
  Sparkles,
  Sun,
  Volume2,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Language = "fr" | "ar";
type View = "home" | "dashboard";

const ASSETS = {
  logo: "/manus-storage/ma-france-logo-mark_eaa9b32c.png",
  hero: "/manus-storage/ma-france-hero-paris-study_0afce971.jpg",
  cafe: "/manus-storage/ma-france-conversation-cafe_00a76eb6.jpg",
  culture: "/manus-storage/ma-france-cultural-postcard_38cd4d13.jpg",
  words: "/manus-storage/ma-france-vocabulary-objects_930f5388.jpg",
};

const lessons = [
  {
    id: "salutations",
    stamp: "01",
    level: "A1",
    titleFr: "Dire bonjour, naturellement",
    titleAr: "التحية بثقة وطبيعية",
    eyebrowFr: "Première page",
    eyebrowAr: "الصفحة الأولى",
    duration: "12 min",
    phrase: "Bonjour, je m'appelle Lina. Enchantée.",
    translation: "مرحباً، اسمي لينا. تشرفت بلقائك.",
  },
  {
    id: "cafe",
    stamp: "02",
    level: "A1",
    titleFr: "Commander au café",
    titleAr: "الطلب في المقهى",
    eyebrowFr: "Parler dehors",
    eyebrowAr: "تحدث خارج الصف",
    duration: "16 min",
    phrase: "Je voudrais un café, s'il vous plaît.",
    translation: "أود قهوة من فضلك.",
  },
  {
    id: "etre",
    stamp: "03",
    level: "A1",
    titleFr: "Être, la phrase essentielle",
    titleAr: "Être، أساس الجملة",
    eyebrowFr: "Grammaire utile",
    eyebrowAr: "قواعد مفيدة",
    duration: "14 min",
    phrase: "Nous sommes prêts à apprendre.",
    translation: "نحن مستعدون للتعلم.",
  },
];

const copy = {
  fr: {
    nav: ["Parcours", "Méthode", "Culture"],
    dashboard: "Mon carnet",
    language: "العربية",
    heroKicker: "Le carnet d'apprentissage du français",
    heroTitle: "Le français,\npage après page.",
    heroText:
      "Une expérience bilingue pour apprendre les phrases qui vous accompagnent vraiment — avec du rythme, du contexte et du plaisir.",
    start: "Ouvrir mon carnet",
    placement: "Trouver mon niveau",
    note: "Aujourd'hui, commencez par une phrase que vous direz demain.",
    progressLabel: "Votre fil du jour",
    progressText: "Une courte pratique, un vrai réflexe.",
    day: "Jour",
    startToday: "Continuer la page 01",
    overviewKicker: "Un parcours qui vous ressemble",
    overviewTitle: "Des petites pages, des progrès visibles.",
    overviewText:
      "Chaque séance alterne écoute, parole, vocabulaire et culture. Votre carnet garde la trace de ce qui devient instinctif.",
    lessonLabel: "Leçon active",
    viewLesson: "Voir la leçon",
    methodKicker: "Notre méthode",
    methodTitle: "Apprendre en situation, retenir dans la durée.",
    cultureKicker: "La France, au-delà des mots",
    cultureTitle: "Une langue se vit aussi entre les lignes.",
    cultureText:
      "Chaque étape ouvre une porte sur un geste, un lieu ou une habitude. Parce que comprendre le contexte rend les mots plus faciles à garder.",
    cultureCta: "Explorer la note culturelle",
    finalTitle: "Votre prochaine conversation commence ici.",
    finalText: "Ouvrez le carnet, choisissez une page, et faites de la place à votre français.",
    finalCta: "Commencer maintenant",
    footer: "Un carnet bilingue pour pratiquer le français au quotidien.",
    placementTitle: "Quel est votre point de départ ?",
    placementText: "Trois questions courtes pour vous proposer votre première page.",
    next: "Suivant",
    result: "Votre point de départ",
    resultText: "Nous avons préparé un carnet adapté à votre rythme.",
    begin: "Commencer avec ce niveau",
    backHome: "Retour à l'accueil",
    dashEyebrow: "Votre carnet de bord",
    dashTitle: "Bonjour, votre français avance.",
    dashText: "Reprenez là où l'élan est encore frais.",
    xp: "points d'élan",
    streak: "jours de suite",
    complete: "Marquer la page terminée",
    completed: "Page terminée",
    activePage: "Page ouverte",
    listen: "Écouter",
    nextStep: "Étape suivante",
    warmup: "Échauffement",
    grammar: "Structure",
    practice: "Pratique",
    culture: "Note culturelle",
    question: "Choisissez la bonne forme : Nous ___ à Paris.",
    validate: "Vérifier",
    correct: "Exact — « nous sommes » est la bonne forme.",
    incorrect: "Presque. Essayez encore : le verbe être avec « nous ».",
    speakingTitle: "Parler, même doucement",
    speakingText: "Lisez la phrase après l'avoir écoutée. Le micro reste votre choix, sans score artificiel.",
    speakCta: "Réécouter la phrase",
    wordsTitle: "Trois mots à garder",
    wordsText: "Retournez les cartes mentalement avant de révéler la traduction.",
    reveal: "Voir l'arabe",
    hide: "Masquer l'arabe",
    writingTitle: "Une ligne dans votre carnet",
    writingText: "Composez une phrase simple avec « je suis ».",
    writingPlaceholder: "Ex. Je suis curieux et je parle un peu français.",
    saved: "Ajouté à votre carnet",
    saveLine: "Garder cette phrase",
  },
  ar: {
    nav: ["المسار", "المنهج", "الثقافة"],
    dashboard: "دفتر تقدمي",
    language: "FR",
    heroKicker: "دفتر تعلّم الفرنسية اليومي",
    heroTitle: "الفرنسية،\nصفحة بعد صفحة.",
    heroText:
      "تجربة ثنائية اللغة لتتعلم العبارات التي ستستخدمها فعلاً، بإيقاع واضح وسياق ثقافي ممتع.",
    start: "افتح دفتري",
    placement: "اكتشف مستواي",
    note: "ابدأ اليوم بعبارة ستقولها غداً.",
    progressLabel: "خيط يومك",
    progressText: "تدريب قصير، وارتياح حقيقي في الكلام.",
    day: "اليوم",
    startToday: "أكمل الصفحة 01",
    overviewKicker: "مسار يشبهك",
    overviewTitle: "صفحات قصيرة، وتقدّم تراه بنفسك.",
    overviewText:
      "كل جلسة تجمع الاستماع والكلام والمفردات والثقافة. ويحفظ دفترُك ما أصبح تلقائياً لديك.",
    lessonLabel: "الدرس النشط",
    viewLesson: "افتح الدرس",
    methodKicker: "منهجنا",
    methodTitle: "تعلّم داخل الموقف، واحتفظ به لفترة أطول.",
    cultureKicker: "فرنسا، أبعد من الكلمات",
    cultureTitle: "اللغة تُعاش بين السطور أيضاً.",
    cultureText:
      "كل خطوة تفتح نافذة على عادة أو مكان أو لفتة. ففهم السياق يجعل الكلمات أسهل في التذكّر.",
    cultureCta: "اكتشف الملاحظة الثقافية",
    finalTitle: "محادثتك الفرنسية القادمة تبدأ من هنا.",
    finalText: "افتح الدفتر، اختر صفحة، واترك مساحة للفرنسية في يومك.",
    finalCta: "ابدأ الآن",
    footer: "دفتر ثنائي اللغة لممارسة الفرنسية كل يوم.",
    placementTitle: "من أين تبدأ؟",
    placementText: "ثلاثة أسئلة قصيرة لنقترح لك صفحتك الأولى.",
    next: "التالي",
    result: "نقطة انطلاقك",
    resultText: "جهّزنا لك دفترًا يناسب وتيرتك.",
    begin: "ابدأ بهذا المستوى",
    backHome: "العودة للرئيسية",
    dashEyebrow: "دفتر رحلتك",
    dashTitle: "مرحباً، فرنسيتك تتقدّم.",
    dashText: "تابع من حيث كان الحماس لا يزال حاضرًا.",
    xp: "نقطة زخم",
    streak: "أيام متتالية",
    complete: "علّم الصفحة كمكتملة",
    completed: "اكتملت الصفحة",
    activePage: "الصفحة المفتوحة",
    listen: "استمع",
    nextStep: "الخطوة التالية",
    warmup: "تهيئة",
    grammar: "تركيب",
    practice: "تطبيق",
    culture: "ملاحظة ثقافية",
    question: "اختر التصريف الصحيح: Nous ___ à Paris.",
    validate: "تحقّق",
    correct: "صحيح — « nous sommes » هي الصيغة المناسبة.",
    incorrect: "قريب. حاول مجدداً: تصريف être مع « nous ».",
    speakingTitle: "تحدّث، ولو بهدوء",
    speakingText: "استمع للجملة ثم اقرأها بصوتك. الميكروفون خيارك، من دون تقييم مصطنع.",
    speakCta: "أعد الاستماع",
    wordsTitle: "ثلاث كلمات لتحتفظ بها",
    wordsText: "حاول تذكّر البطاقات قبل كشف المعنى العربي.",
    reveal: "أظهر العربية",
    hide: "أخفِ العربية",
    writingTitle: "سطر في دفترك",
    writingText: "اكتب جملة بسيطة تستخدم فيها « je suis ».",
    writingPlaceholder: "مثال: Je suis curieux et je parle un peu français.",
    saved: "تمت إضافتها إلى دفترك",
    saveLine: "احتفظ بهذه الجملة",
  },
} as const;

const placementQuestions = [
  { q: "Je ___ heureux de vous rencontrer.", options: ["suis", "es", "sommes"], answer: "suis" },
  { q: "Nous ___ un café, s'il vous plaît.", options: ["voudrions", "voudrais", "voulez"], answer: "voudrions" },
  { q: "Hier, elle ___ au musée.", options: ["est allée", "va", "ira"], answer: "est allée" },
];

function playFrench(text: string) {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fr-FR";
    utterance.rate = 0.82;
    window.speechSynthesis.speak(utterance);
  }
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [lang, setLang] = useState<Language>(() => (localStorage.getItem("ma-france-lang") as Language) || "fr");
  const [view, setView] = useState<View>("home");
  const [dark, setDark] = useState(() => localStorage.getItem("ma-france-theme") === "dark");
  const [showPlacement, setShowPlacement] = useState(false);
  const [placementIndex, setPlacementIndex] = useState(0);
  const [placementScore, setPlacementScore] = useState(0);
  const [placementResult, setPlacementResult] = useState<string | null>(null);
  const [activeLesson, setActiveLesson] = useState(lessons[0]);
  const [completed, setCompleted] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("ma-france-completed") || "[]") as string[];
    } catch {
      return [];
    }
  });
  const [xp, setXp] = useState(() => Number(localStorage.getItem("ma-france-xp") || 180));
  const [chosenExercise, setChosenExercise] = useState("");
  const [exerciseFeedback, setExerciseFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [showTranslations, setShowTranslations] = useState(false);
  const [writing, setWriting] = useState("");
  const [lineSaved, setLineSaved] = useState(false);

  const t = copy[lang];
  const isAr = lang === "ar";
  const progress = useMemo(() => Math.round((completed.length / lessons.length) * 100), [completed]);

  useEffect(() => {
    document.documentElement.dir = isAr ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    localStorage.setItem("ma-france-lang", lang);
  }, [isAr, lang]);

  useEffect(() => {
    localStorage.setItem("ma-france-theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    localStorage.setItem("ma-france-completed", JSON.stringify(completed));
    localStorage.setItem("ma-france-xp", String(xp));
  }, [completed, xp]);

  const goToDashboard = (lesson = activeLesson) => {
    setActiveLesson(lesson);
    setView("dashboard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const completeActiveLesson = () => {
    if (!completed.includes(activeLesson.id)) {
      setCompleted((current) => [...current, activeLesson.id]);
      setXp((current) => current + 120);
    }
  };

  const selectPlacementAnswer = (answer: string) => {
    const nextScore = placementScore + (answer === placementQuestions[placementIndex].answer ? 1 : 0);
    if (placementIndex === placementQuestions.length - 1) {
      setPlacementScore(nextScore);
      setPlacementResult(nextScore === 3 ? "A2" : "A1");
      return;
    }
    setPlacementScore(nextScore);
    setPlacementIndex((current) => current + 1);
  };

  const resetPlacement = () => {
    setPlacementIndex(0);
    setPlacementScore(0);
    setPlacementResult(null);
  };

  const closePlacement = () => {
    setShowPlacement(false);
    resetPlacement();
  };

  return (
    <div className={`ma-france-shell ${dark ? "dark" : ""}`}>
      <header className="site-header">
        <button className="brand" onClick={() => setView("home")} aria-label="Ma France">
          <img src={ASSETS.logo} alt="" className="brand-mark" />
          <span className="brand-lockup">
            <strong>Ma France</strong>
            <small>{isAr ? "دفتر اللغة اليومي" : "Le carnet de langue"}</small>
          </span>
        </button>

        <nav className="main-nav" aria-label={isAr ? "التنقل الرئيسي" : "Navigation principale"}>
          {t.nav.map((item, index) => (
            <button key={item} onClick={() => scrollTo(["parcours", "methode", "culture"][index])}>
              <span>0{index + 1}</span>{item}
            </button>
          ))}
        </nav>

        <div className="header-actions">
          <button className="icon-button" onClick={() => setDark((current) => !current)} aria-label={dark ? "Light mode" : "Dark mode"}>
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button className="language-button" onClick={() => setLang((current) => (current === "fr" ? "ar" : "fr"))}>
            <Globe2 size={15} /> {t.language}
          </button>
          <button className="outline-action desktop-only" onClick={() => goToDashboard()}>{t.dashboard}</button>
        </div>
      </header>

      {view === "home" ? (
        <main>
          <section className="hero-section" aria-labelledby="hero-title">
            <div className="hero-copy reveal-up">
              <p className="eyebrow"><span className="route-dot" /> {t.heroKicker}</p>
              <h1 id="hero-title">{t.heroTitle.split("\n").map((part) => <span key={part}>{part}</span>)}</h1>
              <p className="hero-text">{t.heroText}</p>
              <p className="margin-note hero-margin" dir={isAr ? "ltr" : "rtl"}>{isAr ? "ابدأ بجملة ستستخدمها حقاً." : "ابدأ بعبارة ستستخدمها حقاً."}</p>
              <div className="hero-actions">
                <button className="primary-action" onClick={() => goToDashboard()}>
                  {t.start} <ArrowRight className={isAr ? "flip" : ""} size={18} />
                </button>
                <button className="text-action" onClick={() => setShowPlacement(true)}>{t.placement} <ChevronRight className={isAr ? "flip" : ""} size={17} /></button>
              </div>
              <p className="hero-note"><PenLine size={16} /> {t.note}</p>
            </div>

            <div className="hero-visual reveal-up delay-1">
              <img src={ASSETS.hero} alt={isAr ? "مكتب دراسي أنيق في أجواء باريسية" : "Atelier d'étude parisien"} />
              <div className="hero-card top-card">
                <span className="stamp">A1</span>
                <div><small>{isAr ? "دليل اليوم" : "Repère du jour"}</small><strong>Bonjour</strong></div>
              </div>
              <div className="hero-card bottom-card">
                <span className="card-number">01</span>
                <div><small>{isAr ? "بداية هادئة" : "Une entrée douce"}</small><strong>{isAr ? "عبارة واحدة كافية" : "Une phrase suffit"}</strong></div>
              </div>
              <div className="paper-tab" aria-hidden="true">Ma France · 2026</div>
            </div>
          </section>

          <section id="parcours" className="daily-strip">
            <div className="daily-meta">
              <p className="eyebrow"><span className="route-dot red" /> {t.progressLabel}</p>
              <p>{t.progressText}</p>
            </div>
            <div className="daily-progress" aria-label={isAr ? "تقدّم اليوم" : "Progression du jour"}>
              <div className="progress-line"><span style={{ width: "38%" }} /></div>
              <div className="progress-points"><b>01</b><b className="active">02</b><b>03</b><b>04</b></div>
            </div>
            <div className="daily-cta">
              <span className="mini-stamp">{t.day} 04</span>
              <button onClick={() => goToDashboard(lessons[0])}>{t.startToday} <ArrowRight className={isAr ? "flip" : ""} size={16} /></button>
            </div>
          </section>

          <section className="journey-section">
            <div className="journey-intro">
              <p className="eyebrow"><span className="route-dot" /> {t.overviewKicker}</p>
              <h2>{t.overviewTitle}</h2>
              <p>{t.overviewText}</p>
              <p className="margin-note" dir={isAr ? "ltr" : "rtl"}>{isAr ? "Écoutez, répétez, puis gardez la phrase." : "استمع، كرّر، ثم احتفظ بالعبارة."}</p>
            </div>
            <div className="lesson-stack">
              {lessons.map((lesson, index) => (
                <article className={`lesson-preview preview-${index + 1}`} key={lesson.id}>
                  <div className="preview-index"><span>{lesson.stamp}</span><i /></div>
                  <div className="preview-main">
                    <div className="preview-meta"><span>{lesson.level}</span><small>{isAr ? lesson.eyebrowAr : lesson.eyebrowFr}</small></div>
                    <h3>{isAr ? lesson.titleAr : lesson.titleFr}</h3>
                    <p>{lesson.duration} · {isAr ? lesson.translation : lesson.phrase}</p>
                  </div>
                  <button onClick={() => goToDashboard(lesson)} aria-label={isAr ? `فتح ${lesson.titleAr}` : `Ouvrir ${lesson.titleFr}`}><ArrowRight className={isAr ? "flip" : ""} size={20} /></button>
                </article>
              ))}
            </div>
          </section>

          <section id="methode" className="method-section">
            <div className="method-image"><img src={ASSETS.words} alt={isAr ? "أدوات ورقية لتعلّم المفردات" : "Objets d'étude et cartes de vocabulaire"} /></div>
            <div className="method-copy">
              <p className="eyebrow"><span className="route-dot red" /> {t.methodKicker}</p>
              <h2>{t.methodTitle}</h2>
              <div className="method-steps">
                <div><span>01</span><div><h3>{isAr ? "اسمع في السياق" : "Écouter en contexte"}</h3><p>{isAr ? "جمل عملية بنطق هادئ وواضح." : "Des phrases utiles, avec une prononciation posée."}</p></div></div>
                <div><span>02</span><div><h3>{isAr ? "أجب بصوتك" : "Répondre avec vos mots"}</h3><p>{isAr ? "تدرّب على رد قصير، خطوة صغيرة في كل مرة." : "Une réponse courte, un pas à la fois."}</p></div></div>
                <div><span>03</span><div><h3>{isAr ? "راجع وقت الحاجة" : "Revoir au bon moment"}</h3><p>{isAr ? "بطاقات بسيطة تعود قبل أن تنسى الكلمة." : "Des cartes qui reviennent avant que le mot ne s'efface."}</p></div></div>
              </div>
              <p className="margin-note on-ink" dir={isAr ? "ltr" : "rtl"}>{isAr ? "Trois gestes simples pour parler sans bloquer." : "ثلاث حركات بسيطة لتتحدث من دون تردد."}</p>
              <button className="underline-action" onClick={() => goToDashboard()}>{t.viewLesson} <ArrowRight className={isAr ? "flip" : ""} size={16} /></button>
            </div>
          </section>

          <section id="culture" className="culture-section">
            <div className="culture-copy">
              <p className="eyebrow"><span className="route-dot" /> {t.cultureKicker}</p>
              <h2>{t.cultureTitle}</h2>
              <p>{t.cultureText}</p>
              <p className="margin-note" dir={isAr ? "ltr" : "rtl"}>{isAr ? "Comprendre le geste aide le mot à rester." : "فهم اللفتة يساعد الكلمة على البقاء."}</p>
              <button className="primary-action small" onClick={() => playFrench("En France, on dit souvent bonjour avant de commencer une conversation.")}>{t.cultureCta} <Volume2 size={17} /></button>
            </div>
            <div className="culture-art"><img src={ASSETS.culture} alt={isAr ? "قصاصات ورقية مستوحاة من رحلة فرنسية" : "Collage éditorial inspiré d'un carnet de voyage français"} /><span className="culture-caption">Note 07 — Bonjour, d'abord.</span></div>
          </section>

          <section className="closing-section">
            <div className="closing-stamp">MF</div>
            <div><p className="eyebrow">À votre rythme</p><h2>{t.finalTitle}</h2><p className="margin-note closing-margin" dir={isAr ? "ltr" : "rtl"}>{isAr ? "Une page aujourd’hui suffit." : "صفحة واحدة اليوم تكفي."}</p></div>
            <div className="closing-action"><p>{t.finalText}</p><button className="primary-action" onClick={() => goToDashboard()}>{t.finalCta} <ArrowRight className={isAr ? "flip" : ""} size={18} /></button></div>
          </section>
        </main>
      ) : (
        <Dashboard
          lang={lang}
          activeLesson={activeLesson}
          completed={completed}
          xp={xp}
          progress={progress}
          chosenExercise={chosenExercise}
          exerciseFeedback={exerciseFeedback}
          showTranslations={showTranslations}
          writing={writing}
          lineSaved={lineSaved}
          onHome={() => setView("home")}
          onLesson={setActiveLesson}
          onExerciseChoice={(choice) => { setChosenExercise(choice); setExerciseFeedback(null); }}
          onValidate={() => setExerciseFeedback(chosenExercise === "sommes" ? "correct" : "incorrect")}
          onComplete={completeActiveLesson}
          onTranslation={() => setShowTranslations((current) => !current)}
          onWriting={setWriting}
          onSaveLine={() => { setLineSaved(true); if (writing.trim()) setXp((current) => current + 20); }}
        />
      )}

      <footer className="site-footer"><img src={ASSETS.logo} alt="" /><p>{t.footer}</p><span>© 2026 Ma France</span></footer>

      {showPlacement && (
        <div className="modal-layer" role="dialog" aria-modal="true" aria-labelledby="placement-title">
          <div className="placement-modal">
            <button className="modal-close" onClick={closePlacement} aria-label="Close"><X size={20} /></button>
            {!placementResult ? (
              <>
                <p className="eyebrow"><span className="route-dot red" /> {isAr ? "تقييم قصير" : "Évaluation courte"}</p>
                <h2 id="placement-title">{t.placementTitle}</h2>
                <p>{t.placementText}</p>
                <div className="quiz-progress"><span style={{ width: `${((placementIndex + 1) / placementQuestions.length) * 100}%` }} /></div>
                <small>{placementIndex + 1} / {placementQuestions.length}</small>
                <h3>{placementQuestions[placementIndex].q}</h3>
                <div className="answer-list">{placementQuestions[placementIndex].options.map((answer) => <button key={answer} onClick={() => selectPlacementAnswer(answer)}>{answer}<ChevronRight size={18} /></button>)}</div>
              </>
            ) : (
              <div className="placement-result">
                <span className="result-stamp">{placementResult}</span>
                <p className="eyebrow"><span className="route-dot" /> {t.result}</p>
                <h2>{placementResult === "A2" ? "Une base déjà solide." : "Une première page pleine de promesses."}</h2>
                <p>{t.resultText}</p>
                <button className="primary-action" onClick={() => { closePlacement(); goToDashboard(); }}>{t.begin} <ArrowRight className={isAr ? "flip" : ""} size={18} /></button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

type DashboardProps = {
  lang: Language;
  activeLesson: (typeof lessons)[number];
  completed: string[];
  xp: number;
  progress: number;
  chosenExercise: string;
  exerciseFeedback: "correct" | "incorrect" | null;
  showTranslations: boolean;
  writing: string;
  lineSaved: boolean;
  onHome: () => void;
  onLesson: (lesson: (typeof lessons)[number]) => void;
  onExerciseChoice: (choice: string) => void;
  onValidate: () => void;
  onComplete: () => void;
  onTranslation: () => void;
  onWriting: (value: string) => void;
  onSaveLine: () => void;
};

function Dashboard(props: DashboardProps) {
  const { lang, activeLesson, completed, xp, progress, chosenExercise, exerciseFeedback, showTranslations, writing, lineSaved } = props;
  const t = copy[lang];
  const isAr = lang === "ar";
  const isComplete = completed.includes(activeLesson.id);
  const deck = [
    { fr: "Bonjour", ar: "مرحباً" },
    { fr: "Merci", ar: "شكراً" },
    { fr: "À bientôt", ar: "إلى اللقاء قريباً" },
  ];

  return (
    <main className="dashboard-page">
      <section className="dashboard-intro">
        <button className="back-button" onClick={props.onHome}><ArrowLeft className={isAr ? "flip" : ""} size={17} /> {t.backHome}</button>
        <div className="dashboard-title-row">
          <div><p className="eyebrow"><span className="route-dot red" /> {t.dashEyebrow}</p><h1>{t.dashTitle}</h1><p>{t.dashText}</p></div>
          <div className="score-stack"><div><Sparkles size={17} /><strong>{xp}</strong><span>{t.xp}</span></div><div><Flame size={17} /><strong>4</strong><span>{t.streak}</span></div></div>
        </div>
      </section>

      <section className="dashboard-grid">
        <aside className="progress-rail">
          <div className="rail-header"><span>{isAr ? "المسار" : "Parcours"}</span><strong>A1</strong></div>
          <div className="ring-wrap"><div className="progress-ring" style={{ "--progress": `${progress * 3.6}deg` } as React.CSSProperties}><div><strong>{progress}%</strong><small>{isAr ? "مكتمل" : "fait"}</small></div></div><p>{isAr ? "ثلاث صفحات صغيرة نحو بداية واثقة." : "Trois petites pages vers des débuts sûrs."}</p></div>
          <div className="rail-lessons">{lessons.map((lesson) => <button key={lesson.id} className={lesson.id === activeLesson.id ? "selected" : ""} onClick={() => props.onLesson(lesson)}><span className="rail-stamp">{completed.includes(lesson.id) ? <Check size={14} /> : lesson.stamp}</span><span><small>{lesson.level}</small><strong>{isAr ? lesson.titleAr : lesson.titleFr}</strong></span></button>)}</div>
        </aside>

        <section className="lesson-workspace">
          <div className="workspace-heading"><div><p className="eyebrow"><span className="route-dot" /> {t.activePage}</p><h2>{isAr ? activeLesson.titleAr : activeLesson.titleFr}</h2><p className="margin-note workspace-note" dir={isAr ? "ltr" : "rtl"}>{isAr ? "Concentrez-vous sur une phrase, pas sur la perfection." : "ركّز على عبارة واحدة، لا على الكمال."}</p></div><span className="time-chip"><Compass size={15} />{activeLesson.duration}</span></div>
          <div className="lesson-steps"><span className="is-active"><b>01</b>{t.warmup}</span><span><b>02</b>{t.grammar}</span><span><b>03</b>{t.practice}</span><span><b>04</b>{t.culture}</span></div>
          <div className="phrase-panel"><div><span className="phrase-label">ÉCOUTER · RÉPÉTER</span><h3>{activeLesson.phrase}</h3><p>{activeLesson.translation}</p></div><button className="listen-button" onClick={() => playFrench(activeLesson.phrase)}><Volume2 size={20} /><span>{t.listen}</span></button></div>
          <div className="exercise-panel"><div className="exercise-number">02</div><div><p className="eyebrow">Structure utile</p><h3>{t.question}</h3><div className="choice-row">{["sommes", "êtes", "sont"].map((option) => <button key={option} className={chosenExercise === option ? "selected" : ""} onClick={() => props.onExerciseChoice(option)}>{option}</button>)}</div>{exerciseFeedback && <p className={`feedback ${exerciseFeedback}`}>{exerciseFeedback === "correct" ? <BadgeCheck size={17} /> : <Sparkles size={17} />}{exerciseFeedback === "correct" ? t.correct : t.incorrect}</p>}<button className="validate-button" disabled={!chosenExercise} onClick={props.onValidate}>{t.validate} <ChevronRight className={isAr ? "flip" : ""} size={16} /></button></div></div>
          <div className="completion-row"><p>{isComplete ? t.completed : isAr ? "في نهاية الصفحة، احفظها كختم في رحلتك." : "À la fin de la page, ajoutez-lui votre cachet."}</p><button className={isComplete ? "complete-button done" : "complete-button"} onClick={props.onComplete} disabled={isComplete}>{isComplete ? <><Check size={17} /> {t.completed}</> : <><BadgeCheck size={17} /> {t.complete}</>}</button></div>
        </section>

        <aside className="practice-column">
          <article className="speaking-card"><img src={ASSETS.cafe} alt="" /><div className="card-overlay" /><div className="speaking-content"><span className="mini-stamp white">PARLER</span><h3>{t.speakingTitle}</h3><p>{t.speakingText}</p><button onClick={() => playFrench("Bonjour, je voudrais un café, s'il vous plaît.")}><Play size={15} fill="currentColor" /> {t.speakCta}</button></div></article>
          <article className="word-card"><div className="word-card-heading"><div><p className="eyebrow"><span className="route-dot red" /> {t.wordsTitle}</p><p>{t.wordsText}</p></div><Library size={21} /></div><div className="word-list">{deck.map((word) => <button key={word.fr} onClick={props.onTranslation}><strong>{word.fr}</strong><span>{showTranslations ? word.ar : "••••••"}</span></button>)}</div><button className="reveal-button" onClick={props.onTranslation}>{showTranslations ? t.hide : t.reveal} <ChevronRight className={isAr ? "flip" : ""} size={15} /></button></article>
        </aside>
      </section>

      <section className="writing-section"><div className="writing-illustration"><PenLine size={27} /><span>MF</span></div><div><p className="eyebrow"><span className="route-dot" /> {t.writingTitle}</p><h2>{t.writingText}</h2><textarea value={writing} onChange={(event) => { props.onWriting(event.target.value); }} placeholder={t.writingPlaceholder} aria-label={t.writingTitle} /><div className="writing-bottom"><span>{lineSaved ? <><Check size={15} /> {t.saved}</> : `${writing.trim().split(/\s+/).filter(Boolean).length} mots`}</span><button disabled={!writing.trim()} onClick={props.onSaveLine}>{t.saveLine} <ArrowRight className={isAr ? "flip" : ""} size={16} /></button></div></div></section>
    </main>
  );
}
