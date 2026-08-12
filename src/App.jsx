import { useState, useCallback, useEffect } from "react";
import {
  Ear,
  Eye,
  MousePointer2,
  Sparkles,
  Search,
  ArrowRight,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  RotateCcw,
  Hand,
  Film,
} from "lucide-react";

/* =========================================================
   THEME
========================================================= */

const T = {
  ink: "#14213D",
  paper: "#FAF7F2",
  amber: "#FFB100",
  slate: "#5C6B73",
  teal: "#2A9D8F",
  line: "#E4DFD3",
  danger: "#C1502E",
};

const display = {
  fontFamily: "'Fraunces', Georgia, serif",
};

const mono = {
  fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
};

/* =========================================================
   DEMO AI FUNCTION
   ---------------------------------------------------------
   For now this is a MOCK AI function.

   Later:
   React → n8n → Groq → React

   We are deliberately NOT putting an API key in React.
========================================================= */

async function askAI(prompt) {
  console.log("AI prompt:", prompt);

  // Simulate AI delay
  await new Promise((resolve) => setTimeout(resolve, 1200));

  return JSON.stringify({
    keyConcept:
      "Plants use sunlight to make their own food. They use sunlight, water, and carbon dioxide to make glucose and release oxygen.",
    bulletPoints: [
      "Photosynthesis happens mainly in the leaves of green plants.",
      "Chlorophyll helps plants capture sunlight.",
      "Plants use water and carbon dioxide during the process.",
      "Oxygen is released as a result.",
    ],
  });
}

/* =========================================================
   LESSON SIMPLIFICATION
========================================================= */

async function simplifyLesson(topicText) {
  const prompt = `
Simplify this for a middle school student.

Use:
- short sentences
- everyday words
- concrete examples
- no unnecessary jargon

Content:
${topicText}
`;

  try {
    return JSON.parse(await askAI(prompt));
  } catch {
    return {
      keyConcept: "Couldn't generate the lesson.",
      bulletPoints: [],
    };
  }
}

/* =========================================================
   QUIZ GENERATION
========================================================= */

async function generateQuiz(topic, level) {
  console.log("Generating quiz:", topic, level);

  await new Promise((resolve) => setTimeout(resolve, 1200));

  const quizzes = {
    photosynthesis: [
      {
        question: "What do plants use to make food?",
        options: [
          "Sunlight",
          "Sound",
          "Plastic",
          "Metal",
        ],
        answer: "Sunlight",
      },
      {
        question: "Which gas do plants take in?",
        options: [
          "Carbon dioxide",
          "Helium",
          "Hydrogen",
          "Neon",
        ],
        answer: "Carbon dioxide",
      },
      {
        question: "Where does most photosynthesis happen?",
        options: [
          "Leaves",
          "Roots",
          "Flowers only",
          "Seeds only",
        ],
        answer: "Leaves",
      },
      {
        question: "What gas is released during photosynthesis?",
        options: [
          "Oxygen",
          "Helium",
          "Nitrogen",
          "Hydrogen",
        ],
        answer: "Oxygen",
      },
    ],

    "newtons-laws": [
      {
        question: "What does Newton's First Law describe?",
        options: [
          "Inertia",
          "Electricity",
          "Photosynthesis",
          "Heat",
        ],
        answer: "Inertia",
      },
      {
        question: "What happens when a force acts on an object?",
        options: [
          "Its motion can change",
          "It disappears",
          "It becomes invisible",
          "Nothing can happen",
        ],
        answer: "Its motion can change",
      },
      {
        question: "Newton's Second Law connects force with what?",
        options: [
          "Mass and acceleration",
          "Colour and light",
          "Heat and sound",
          "Water and air",
        ],
        answer: "Mass and acceleration",
      },
      {
        question: "Newton's Third Law describes what?",
        options: [
          "Action and reaction",
          "Photosynthesis",
          "Gravity only",
          "Electric current",
        ],
        answer: "Action and reaction",
      },
    ],

    "cell-structure": [
      {
        question: "What is a cell?",
        options: [
          "The basic unit of life",
          "A type of planet",
          "A type of rock",
          "A chemical only",
        ],
        answer: "The basic unit of life",
      },
      {
        question: "Which organelle controls many cell activities?",
        options: [
          "Nucleus",
          "Ribosome",
          "Cell wall",
          "Vacuole",
        ],
        answer: "Nucleus",
      },
      {
        question: "Which organelle helps produce energy?",
        options: [
          "Mitochondria",
          "Nucleus",
          "Cell wall",
          "Chlorophyll",
        ],
        answer: "Mitochondria",
      },
      {
        question: "Where are cells found?",
        options: [
          "Living organisms",
          "Only rocks",
          "Only clouds",
          "Only water",
        ],
        answer: "Living organisms",
      },
    ],
  };

  return quizzes[topic] || quizzes.photosynthesis;
}

/* =========================================================
   FUTURE n8n CONFIGURATION
   ---------------------------------------------------------
   Keep these EMPTY for now.

   Later you will put your n8n webhook URLs here.
========================================================= */

const N8N_ISL_WEBHOOK_URL = "";
const N8N_GEMINI_VIDEO_WEBHOOK_URL = "";

/* =========================================================
   SIGN LANGUAGE VIDEO
========================================================= */

async function generateISLVideo(text) {
  if (!N8N_ISL_WEBHOOK_URL) {
    throw new Error(
      "ISL video service is not connected yet. Add your n8n webhook later."
    );
  }

  const response = await fetch(N8N_ISL_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
    }),
  });

  const data = await response.json();

  if (!data.videoUrl) {
    throw new Error("No video URL was returned.");
  }

  return data.videoUrl;
}

/* =========================================================
   AI VIDEO
========================================================= */

async function generateGeminiVideo(prompt) {
  if (!N8N_GEMINI_VIDEO_WEBHOOK_URL) {
    throw new Error(
      "AI video service is not connected yet. Add your n8n webhook later."
    );
  }

  const response = await fetch(N8N_GEMINI_VIDEO_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
    }),
  });

  const data = await response.json();

  if (!data.videoUrl) {
    throw new Error("No video URL was returned.");
  }

  return data.videoUrl;
}

/* =========================================================
   DEMO VIDEO DATA
========================================================= */

const HOSTED_VIDEOS = {
  // Later:
  // photosynthesis: "https://your-video-url.mp4"
};

const YOUTUBE_VIDEOS = {
  photosynthesis: "_XY7_MR9kxU",
};

/* =========================================================
   TOPICS
========================================================= */

const TOPICS = {
  photosynthesis: {
    label: "Photosynthesis",
    raw: `
      Photosynthesis is the process by which green plants use sunlight,
      water, and carbon dioxide to produce glucose and release oxygen.
      It mainly happens in the chloroplasts of leaf cells.
      Chlorophyll captures the light energy needed for the process.
    `,
  },

  "newtons-laws": {
    label: "Newton's Laws",
    raw: `
      Newton's three laws of motion describe the relationship between
      objects and the forces acting on them.
      The first law explains inertia.
      The second law connects force, mass, and acceleration.
      The third law describes action and reaction.
    `,
  },

  "cell-structure": {
    label: "Cell Structure",
    raw: `
      A cell is the basic structural and functional unit of life.
      Cells contain organelles such as the nucleus, mitochondria,
      and ribosomes. Each organelle performs a specific role.
    `,
  },
};

/* =========================================================
   ACCESSIBILITY MODES
========================================================= */

const MODES = [
  {
    id: "hearing",
    title: "Captions & Text",
    subtitle: "Everything captioned and text-based",
    icon: Ear,
    ready: true,
  },

  {
    id: "visual",
    title: "Audio & Voice",
    subtitle: "Read aloud to me",
    icon: Eye,
    ready: true,
  },

  {
    id: "motor",
    title: "Simplified Navigation",
    subtitle: "Larger buttons and simpler controls",
    icon: MousePointer2,
    ready: true,
  },

  {
    id: "standard",
    title: "Standard Experience",
    subtitle: "The regular EduBridge experience",
    icon: Sparkles,
    ready: true,
  },
];

/* =========================================================
   SHARED COMPONENTS
========================================================= */

function CaptionBar({ children }) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 px-4 py-2 text-center text-xs tracking-wide"
      style={{
        ...mono,
        background: T.ink,
        color: T.amber,
        borderTop: `2px solid ${T.amber}`,
      }}
    >
      {children}
    </div>
  );
}

function Shell({ children, caption, onHome }) {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center pb-16 px-4 pt-10"
      style={{
        background: T.paper,
        color: T.ink,
      }}
    >
      <div className="w-full max-w-md">
        {onHome && (
          <button
            onClick={onHome}
            className="mb-4 flex items-center gap-1 text-sm"
            style={{ color: T.slate }}
          >
            <ArrowLeft size={15} />
            Home
          </button>
        )}

        {children}
      </div>

      {caption && <CaptionBar>{caption}</CaptionBar>}
    </div>
  );
}

function Brand() {
  return (
    <div className="mb-8 flex items-center gap-2">
      <div
        className="w-2 h-6"
        style={{ background: T.amber }}
      />

      <span
        className="text-lg font-semibold"
        style={display}
      >
        EduBridge
      </span>
    </div>
  );
}

function PrimaryButton({
  onClick,
  children,
  disabled = false,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full rounded-xl py-3 flex items-center justify-center gap-2 font-medium transition-opacity disabled:opacity-50"
      style={{
        background: T.ink,
        color: T.paper,
      }}
    >
      {children}
    </button>
  );
}

/* =========================================================
   ONBOARDING
========================================================= */

function Onboarding({ onPick }) {
  return (
    <Shell caption="[ CAPTIONS ON — CHOOSE HOW YOU WANT TO LEARN ]">
      <Brand />

      <h1
        className="text-2xl mb-2"
        style={display}
      >
        How would you like to explore your lessons?
      </h1>

      <p
        className="text-sm mb-6"
        style={{ color: T.slate }}
      >
        This shapes how every lesson and quiz is shown to you.
      </p>

      <div className="grid grid-cols-1 gap-3">
        {MODES.map((mode) => {
          const Icon = mode.icon;

          return (
            <button
              key={mode.id}
              onClick={() => onPick(mode)}
              className="text-left rounded-2xl p-4 flex items-start gap-3"
              style={{
                border: `1px solid ${T.line}`,
                background: "white",
              }}
            >
              <Icon
                size={20}
                color={T.teal}
                className="mt-0.5 shrink-0"
              />

              <div>
                <div className="font-medium">
                  {mode.title}
                </div>

                <div
                  className="text-sm"
                  style={{ color: T.slate }}
                >
                  {mode.subtitle}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </Shell>
  );
}

/* =========================================================
   LOGIN
========================================================= */

function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const submit = () => {
    if (!name.trim()) return;

    onLogin(name.trim());
  };

  return (
    <Shell>
      <Brand />

      <h1
        className="text-2xl mb-6"
        style={display}
      >
        Welcome back
      </h1>

      <div className="space-y-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && submit()
          }
          placeholder="Name or email"
          className="w-full rounded-xl px-4 py-3 outline-none"
          style={{
            border: `1px solid ${T.line}`,
          }}
        />

        <input
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          onKeyDown={(e) =>
            e.key === "Enter" && submit()
          }
          type="password"
          placeholder="Password"
          className="w-full rounded-xl px-4 py-3 outline-none"
          style={{
            border: `1px solid ${T.line}`,
          }}
        />

        <PrimaryButton onClick={submit}>
          Log in
          <ArrowRight size={16} />
        </PrimaryButton>

        <p
          className="text-xs text-center pt-1"
          style={{ color: T.slate }}
        >
          Demo mode: any name logs you in.
          Firebase authentication will be added later.
        </p>
      </div>
    </Shell>
  );
}

/* =========================================================
   DASHBOARD
========================================================= */

function Dashboard({
  userName,
  onOpenTopic,
  onHome,
}) {
  const [query, setQuery] = useState("");

  const entries = Object.entries(TOPICS).filter(
    ([, topic]) =>
      topic.label
        .toLowerCase()
        .includes(query.toLowerCase())
  );

  return (
    <Shell onHome={onHome}>
      <Brand />

      <h1
        className="text-2xl mb-1"
        style={display}
      >
        Hi {userName} 👋
      </h1>

      <p
        className="text-sm mb-6"
        style={{ color: T.slate }}
      >
        What do you want to learn today?
      </p>

      <div className="relative mb-4">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2"
          color={T.slate}
        />

        <input
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
          placeholder="Search a topic..."
          className="w-full rounded-xl pl-9 pr-4 py-3 outline-none"
          style={{
            border: `1px solid ${T.line}`,
          }}
        />
      </div>

      <div className="space-y-2">
        {entries.map(([id, topic]) => (
          <button
            key={id}
            onClick={() => onOpenTopic(id)}
            className="w-full text-left rounded-2xl p-4 flex items-center justify-between"
            style={{
              border: `1px solid ${T.line}`,
              background: "white",
            }}
          >
            <span className="font-medium">
              {topic.label}
            </span>

            <ArrowRight
              size={16}
              color={T.slate}
            />
          </button>
        ))}

        {entries.length === 0 && (
          <p
            className="text-sm"
            style={{ color: T.slate }}
          >
            No topics match "{query}".
          </p>
        )}
      </div>
    </Shell>
  );
}

/* =========================================================
   LESSON
========================================================= */

function Lesson({
  topicId,
  onTakeQuiz,
  onHome,
}) {
  const [simplified, setSimplified] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [ran, setRan] =
    useState(false);

  const [videoSource, setVideoSource] =
    useState("static");

  const [videoUrl, setVideoUrl] =
    useState(null);

  const [videoLoading, setVideoLoading] =
    useState(false);

  const [videoError, setVideoError] =
    useState(null);

  const topic = TOPICS[topicId];

  const run = useCallback(async () => {
    setLoading(true);
    setRan(true);

    const result =
      await simplifyLesson(topic.raw);

    setSimplified(result);
    setLoading(false);
  }, [topic]);

  const handleVideoSource = async (source) => {
    setVideoSource(source);
    setVideoUrl(null);
    setVideoError(null);

    if (source === "static") return;

    setVideoLoading(true);

    try {
      let url;

      if (source === "isl") {
        url = await generateISLVideo(
          topic.raw
        );
      } else {
        url = await generateGeminiVideo(
          `Create a classroom-friendly educational video for middle school students about ${topic.label}. ${topic.raw}`
        );
      }

      setVideoUrl(url);
    } catch (error) {
      setVideoError(error.message);
    }

    setVideoLoading(false);
  };

  return (
    <Shell
      onHome={onHome}
      caption={
        loading
          ? "[ AI IS SIMPLIFYING THIS LESSON... ]"
          : "[ ACCESSIBLE LEARNING MODE ]"
      }
    >
      <Brand />

      <h1
        className="text-2xl mb-4"
        style={display}
      >
        {topic.label}
      </h1>

      {/* VIDEO OPTIONS */}

      <div className="flex gap-2 mb-3 flex-wrap">
        <button
          onClick={() =>
            handleVideoSource("static")
          }
          className="text-xs px-3 py-1.5 rounded-full"
          style={{
            border: `1px solid ${T.line}`,
            background:
              videoSource === "static"
                ? T.ink
                : "white",
            color:
              videoSource === "static"
                ? T.paper
                : T.ink,
          }}
        >
          Video
        </button>

        <button
          onClick={() =>
            handleVideoSource("isl")
          }
          className="text-xs px-3 py-1.5 rounded-full flex items-center gap-1"
          style={{
            border: `1px solid ${T.line}`,
            background:
              videoSource === "isl"
                ? T.ink
                : "white",
            color:
              videoSource === "isl"
                ? T.paper
                : T.ink,
          }}
        >
          <Hand size={12} />
          Sign Language
        </button>

        <button
          onClick={() =>
            handleVideoSource("gemini")
          }
          className="text-xs px-3 py-1.5 rounded-full flex items-center gap-1"
          style={{
            border: `1px solid ${T.line}`,
            background:
              videoSource === "gemini"
                ? T.ink
                : "white",
            color:
              videoSource === "gemini"
                ? T.paper
                : T.ink,
          }}
        >
          <Film size={12} />
          AI Video
        </button>
      </div>

      {/* VIDEO */}

      <div
        className="rounded-2xl mb-4 aspect-video flex items-center justify-center text-sm overflow-hidden relative"
        style={{
          background: T.ink,
          color: T.paper,
        }}
      >
        {videoLoading && (
          <span
            className="flex items-center gap-2"
            style={mono}
          >
            <Loader2
              size={16}
              className="animate-spin"
            />

            generating video...
          </span>
        )}

        {!videoLoading && videoError && (
          <span
            className="px-4 text-center text-xs"
            style={{
              ...mono,
              color: T.amber,
            }}
          >
            {videoError}
          </span>
        )}

        {!videoLoading &&
          !videoError &&
          videoUrl && (
            <video
              src={videoUrl}
              controls
              className="w-full h-full object-cover"
            />
          )}

        {!videoLoading &&
          !videoError &&
          !videoUrl &&
          videoSource === "static" &&
          HOSTED_VIDEOS[topicId] && (
            <video
              src={HOSTED_VIDEOS[topicId]}
              controls
              className="w-full h-full object-cover"
            />
          )}

        {!videoLoading &&
          !videoError &&
          !videoUrl &&
          videoSource === "static" &&
          !HOSTED_VIDEOS[topicId] &&
          YOUTUBE_VIDEOS[topicId] && (
            <a
              href={`https://youtu.be/${YOUTUBE_VIDEOS[topicId]}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-2 w-full h-full"
              style={{
                color: T.paper,
              }}
            >
              <img
                src={`https://img.youtube.com/vi/${YOUTUBE_VIDEOS[topicId]}/hqdefault.jpg`}
                alt={`${topic.label} video thumbnail`}
                className="w-full h-full object-cover absolute inset-0 opacity-40"
              />

              <span
                className="relative z-10 text-sm font-medium px-4 py-2 rounded-full"
                style={{
                  background: T.amber,
                  color: T.ink,
                }}
              >
                ▶ Watch on YouTube
              </span>
            </a>
          )}

        {!videoLoading &&
          !videoError &&
          !videoUrl &&
          videoSource !== "static" && (
            <span
              style={mono}
              className="text-center px-4"
            >
              Connect the n8n workflow to enable
              this feature.
            </span>
          )}

        {!videoLoading &&
          !videoError &&
          !videoUrl &&
          videoSource === "static" &&
          !HOSTED_VIDEOS[topicId] &&
          !YOUTUBE_VIDEOS[topicId] && (
            <span style={mono}>
              ▶ lesson video placeholder
            </span>
          )}
      </div>

      {/* AI SUMMARY */}

      {!ran && (
        <PrimaryButton onClick={run}>
          <Sparkles size={16} />
          Generate simplified summary
        </PrimaryButton>
      )}

      {loading && (
        <div
          className="flex items-center gap-2 text-sm mt-4"
          style={{ color: T.slate }}
        >
          <Loader2
            size={16}
            className="animate-spin"
          />

          Generating your personalized explanation...
        </div>
      )}

      {simplified && !loading && (
        <div
          className="mt-4 rounded-2xl p-4"
          style={{
            border: `1px solid ${T.line}`,
            background: "white",
          }}
        >
          <div
            className="text-xs mb-1 uppercase tracking-wide"
            style={{
              ...mono,
              color: T.teal,
            }}
          >
            Key concept
          </div>

          <p className="mb-3">
            {simplified.keyConcept}
          </p>

          <div
            className="text-xs mb-1 uppercase tracking-wide"
            style={{
              ...mono,
              color: T.teal,
            }}
          >
            Important points
          </div>

          <ul className="list-disc pl-5 space-y-1">
            {simplified.bulletPoints.map(
              (point, index) => (
                <li key={index}>
                  {point}
                </li>
              )
            )}
          </ul>
        </div>
      )}

      {simplified && !loading && (
        <div className="mt-4">
          <PrimaryButton
            onClick={onTakeQuiz}
          >
            Take quiz
            <ArrowRight size={16} />
          </PrimaryButton>
        </div>
      )}
    </Shell>
  );
}

/* =========================================================
   QUIZ
========================================================= */

function recommendLevel(performance) {
  if (!performance) return "easy";

  if (performance.hard >= 60)
    return "hard";

  if (performance.medium >= 60)
    return "medium";

  return "easy";
}

function Quiz({
  topicId,
  performance,
  onScored,
  onBack,
  onHome,
}) {
  const topic = TOPICS[topicId];

  const [level] = useState(() =>
    recommendLevel(performance[topicId])
  );

  const [loading, setLoading] =
    useState(true);

  const [questions, setQuestions] =
    useState([]);

  const [answers, setAnswers] =
    useState({});

  const [score, setScore] =
    useState(null);

  useEffect(() => {
    async function loadQuiz() {
      const questions =
        await generateQuiz(
          topicId,
          level
        );

      setQuestions(questions);
      setLoading(false);
    }

    loadQuiz();
  }, [topicId, level]);

  const submit = () => {
    const correct =
      questions.filter(
        (question, index) =>
          answers[index] ===
          question.answer
      ).length;

    const percentage =
      questions.length
        ? Math.round(
            (correct /
              questions.length) *
              100
          )
        : 0;

    setScore(percentage);

    onScored(
      topicId,
      level,
      percentage
    );
  };

  return (
    <Shell
      onHome={onHome}
      caption={
        loading
          ? "[ GENERATING YOUR QUIZ... ]"
          : `[ LEVEL: ${level.toUpperCase()} ]`
      }
    >
      <Brand />

      <h1
        className="text-2xl mb-1"
        style={display}
      >
        Quiz: {topic.label}
      </h1>

      <p
        className="text-xs mb-6 uppercase tracking-wide"
        style={{
          ...mono,
          color: T.teal,
        }}
      >
        Difficulty: {level}
      </p>

      {loading && (
        <div
          className="flex items-center gap-2 text-sm"
          style={{ color: T.slate }}
        >
          <Loader2
            size={16}
            className="animate-spin"
          />

          Preparing your questions...
        </div>
      )}

      {!loading &&
        questions.map(
          (question, index) => (
            <div
              key={index}
              className="rounded-2xl p-4 mb-3"
              style={{
                border: `1px solid ${T.line}`,
                background: "white",
              }}
            >
              <p className="font-medium mb-3">
                {index + 1}.{" "}
                {question.question}
              </p>

              <div className="space-y-2">
                {question.options.map(
                  (option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 text-sm"
                    >
                      <input
                        type="radio"
                        name={`q${index}`}
                        checked={
                          answers[index] ===
                          option
                        }
                        onChange={() =>
                          setAnswers({
                            ...answers,
                            [index]:
                              option,
                          })
                        }
                      />

                      {option}
                    </label>
                  )
                )}
              </div>
            </div>
          )
        )}

      {!loading &&
        questions.length > 0 &&
        score === null && (
          <PrimaryButton
            onClick={submit}
            disabled={
              Object.keys(answers)
                .length <
              questions.length
            }
          >
            Submit answers
          </PrimaryButton>
        )}

      {score !== null && (
        <div
          className="rounded-2xl p-5 text-center mt-2"
          style={{
            background: T.ink,
            color: T.paper,
          }}
        >
          <CheckCircle2
            className="mx-auto mb-2"
            color={T.amber}
          />

          <div
            className="text-3xl"
            style={display}
          >
            {score}%
          </div>

          <p className="text-sm mt-1">
            Your score has been recorded
            for this demo.
          </p>

          <button
            onClick={onBack}
            className="mt-4 text-sm underline flex items-center gap-1 mx-auto"
            style={{ color: T.amber }}
          >
            <RotateCcw size={14} />
            Back to dashboard
          </button>
        </div>
      )}
    </Shell>
  );
}

/* =========================================================
   MAIN APP
========================================================= */

export default function EduBridgeApp() {
  const [screen, setScreen] =
    useState("onboarding");

  const [mode, setMode] =
    useState(null);

  const [user, setUser] =
    useState(null);

  const [topicId, setTopicId] =
    useState(null);

  const [performance, setPerformance] =
    useState({});

  const handlePick = (selectedMode) => {
    setMode(selectedMode.id);
    setScreen("login");
  };

  const handleScored = (
    topicId,
    level,
    percentage
  ) => {
    setPerformance((previous) => ({
      ...previous,

      [topicId]: {
        ...previous[topicId],
        [level]: percentage,
      },
    }));
  };

  if (screen === "onboarding") {
    return (
      <Onboarding
        onPick={handlePick}
      />
    );
  }

  if (screen === "login") {
    return (
      <Login
        onLogin={(name) => {
          setUser(name);
          setScreen("dashboard");
        }}
      />
    );
  }

  if (screen === "dashboard") {
    return (
      <Dashboard
        userName={user}
        onOpenTopic={(id) => {
          setTopicId(id);
          setScreen("lesson");
        }}
        onHome={() =>
          setScreen("onboarding")
        }
      />
    );
  }

  if (screen === "lesson") {
    return (
      <Lesson
        topicId={topicId}
        onTakeQuiz={() =>
          setScreen("quiz")
        }
        onHome={() =>
          setScreen("onboarding")
        }
      />
    );
  }

  if (screen === "quiz") {
    return (
      <Quiz
        topicId={topicId}
        performance={performance}
        onScored={handleScored}
        onBack={() =>
          setScreen("dashboard")
        }
        onHome={() =>
          setScreen("onboarding")
        }
      />
    );
  }

  return null;
}