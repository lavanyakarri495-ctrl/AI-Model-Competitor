const questionInput =
  document.getElementById("question");

const compareBtn =
  document.getElementById("compareBtn");

const validation =
  document.getElementById("validation");

const results =
  document.getElementById("results");

const loading =
  document.getElementById("loading");

const loadingText =
  document.getElementById("loadingText");

const cards =
  document.getElementById("cards");

const ranking =
  document.getElementById("ranking");

const rankingList =
  document.getElementById("rankingList");

const winner =
  document.getElementById("winner");

const questionBadge =
  document.getElementById("questionBadge");


const AIs = [

  {
    name: "ChatGPT",
    icon: "✦",
    style: "clear and conversational"
  },

  {
    name: "Gemini",
    icon: "✦",
    style: "structured and explanatory"
  },

  {
    name: "Claude",
    icon: "◈",
    style: "detailed and thoughtful"
  },

  {
    name: "Copilot",
    icon: "⌁",
    style: "practical and concise"
  },

  {
    name: "Perplexity",
    icon: "◉",
    style: "factual and concise"
  }

];


/* EXAMPLE QUESTIONS */

document
  .querySelectorAll(".chip")
  .forEach(chip => {

    chip.addEventListener("click", () => {

      questionInput.value =
        chip.textContent;

      questionInput.focus();

    });

  });


/* ENTER KEY */

questionInput.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {

      event.preventDefault();

      compare();

    }

  }
);


/* COMPARE BUTTON */

compareBtn.addEventListener(
  "click",
  compare
);


/* CLEAN QUESTION */

function cleanQuestion(question) {

  return question
    .trim()
    .replace(/\s+/g, " ");

}


/* QUESTION ANALYSIS */

function analyzeQuestion(question) {

  const lower =
    question.toLowerCase();

  let type = "general";


  if (
    /^what is|^what are|^define|^explain/
      .test(lower)
  ) {

    type = "definition";

  }

  else if (
    /^who|who invented|who discovered/
      .test(lower)
  ) {

    type = "person";

  }

  else if (
    /^why/.test(lower)
  ) {

    type = "why";

  }

  else if (
    /^how/.test(lower)
  ) {

    type = "how";

  }

  else if (
    /^when/.test(lower)
  ) {

    type = "when";

  }

  else if (
    /^where/.test(lower)
  ) {

    type = "where";

  }

  else if (
    /difference between|compare/
      .test(lower)
  ) {

    type = "comparison";

  }

  else if (
    /advantage|benefit/
      .test(lower)
  ) {

    type = "benefits";

  }


  return {

    type: type,

    topic: extractTopic(question)

  };

}


/* EXTRACT TOPIC */

function extractTopic(question) {

  let topic =
    question
      .replace(/[?!.]/g, "")
      .trim();


  topic =
    topic.replace(
      /^(what is|what are|define|explain|why is|why are|how does|how do|how is|who is|who invented|who discovered|when was|where is)\s+/i,
      ""
    );


  return topic || question;

}


/* GENERATE ANSWER */

function makeAnswer(question, ai) {

  const analysis =
    analyzeQuestion(question);

  const topic =
    analysis.topic;

  const type =
    analysis.type;

  const topicLower =
    topic.toLowerCase();


  /* AI */

  if (
    topicLower.includes(
      "artificial intelligence"
    ) ||
    topicLower === "ai"
  ) {

    return `
Artificial Intelligence (AI) is the field of computing focused on creating systems that can perform tasks that normally require human intelligence, such as learning, reasoning, recognizing patterns, understanding language, and making decisions.

A simple way to understand AI is that computer systems use data and algorithms to produce useful predictions, decisions, or generated content.

Examples include recommendation systems, voice assistants, image recognition, translation systems, robotics, and AI chatbots.
`;

  }


  /* MACHINE LEARNING */

  if (
    topicLower.includes(
      "machine learning"
    )
  ) {

    return `
Machine learning is a branch of artificial intelligence in which computers learn patterns from data and use those patterns to make predictions or decisions.

Instead of programming every rule manually, a machine-learning model is trained using examples.

Common applications include spam detection, recommendation systems, image recognition, speech recognition, and forecasting.
`;

  }


  /* PHOTOSYNTHESIS */

  if (
    topicLower.includes(
      "photosynthesis"
    )
  ) {

    return `
Photosynthesis is the process by which green plants, algae, and some bacteria use light energy to convert water and carbon dioxide into chemical energy stored in glucose.

Oxygen is released as a by-product.

In simple terms, plants use sunlight to make food from water and carbon dioxide.
`;

  }


  /* EXERCISE */

  if (
    topicLower.includes(
      "exercise"
    )
  ) {

    return `
Regular exercise supports physical fitness, heart health, muscle and bone strength, energy levels, and overall well-being.

Activities can include walking, cycling, sports, stretching, or other age-appropriate movement.

A balanced routine should be safe, enjoyable, and suitable for the person's age and abilities.
`;

  }


  /* DEFINITION */

  if (
    type === "definition"
  ) {

    return `
${topic} can be understood as a concept, process, object, or idea that has a specific meaning within its subject area.

In simple terms, the question is asking for a clear explanation of ${topic}.

A good explanation should describe what it is, its main characteristics, and, when useful, give a relevant example.
`;

  }


  /* WHY */

  if (
    type === "why"
  ) {

    return `
${topic} is important because its effects depend on the context in which it is used or studied.

A useful explanation is to look at its main purpose, the benefits or consequences involved, and a simple real-world example.
`;

  }


  /* HOW */

  if (
    type === "how"
  ) {

    return `
${topic} can be explained as a process with a sequence of steps.

First, the relevant conditions or inputs are identified. Then the main process takes place. Finally, the expected result is produced.

The exact steps depend on the subject and the specific context of the question.
`;

  }


  /* COMPARISON */

  if (
    type === "comparison"
  ) {

    return `
The difference between the concepts in your question can be understood by comparing their purpose, characteristics, and typical uses.

They may share some similarities, but their key distinction comes from how and where each one is used.
`;

  }


  /* PERSON */

  if (
    type === "person"
  ) {

    return `
Your question asks about a person connected with ${topic}.

A useful answer should identify the relevant person, explain what they are known for, and provide the historical or professional context connected with the question.
`;

  }


  /* GENERAL */

  return `
Your question is about ${topic}.

A useful answer should focus directly on that subject, explain the main idea in clear language, and include relevant context or an example where helpful.

Because this is a standalone frontend demo, this answer is generated by the local demo engine rather than claiming live access to an external AI service.
`;

}


/* KEYWORD SCORE */

function keywordScore(
  question,
  answer
) {

  const words =
    extractTopic(question)
      .toLowerCase()
      .split(/\W+/)
      .filter(
        word => word.length > 3
      );


  if (!words.length) {

    return 75;

  }


  const hits =
    words.filter(
      word =>
        answer
          .toLowerCase()
          .includes(word)
    ).length;


  return Math.min(
    98,
    72 +
    Math.round(
      (hits / words.length) * 22
    )
  );

}


/* EVALUATION */

function evaluate(
  question,
  answer,
  index
) {

  const relevance =
    keywordScore(
      question,
      answer
    );


  const completeness =
    Math.min(
      96,
      76 +
      Math.min(
        20,
        Math.round(
          answer.length / 120
        )
      )
    );


  const clarity =
    90 - (index % 3) * 2;


  const score =
    Math.round(
      relevance * 0.45 +
      completeness * 0.30 +
      clarity * 0.25
    );


  return {

    relevance,
    completeness,
    clarity,
    score

  };

}


/* BUILD RESULTS */

function buildResults(question) {

  return AIs.map(
    (ai, index) => {

      const answer =
        makeAnswer(
          question,
          ai
        );


      const metrics =
        evaluate(
          question,
          answer,
          index
        );


      return {

        ...ai,

        answer,

        ...metrics

      };

    }
  );

}


/* MAIN COMPARE FUNCTION */

async function compare() {

  const question =
    cleanQuestion(
      questionInput.value
    );


  validation.textContent = "";


  if (!question) {

    validation.textContent =
      "Please enter a question first.";

    questionInput.focus();

    return;

  }


  if (question.length < 3) {

    validation.textContent =
      "Please enter a little more detail so the AI comparison can work.";

    return;

  }


  results.classList.remove(
    "hidden"
  );


  ranking.classList.add(
    "hidden"
  );


  cards.innerHTML = "";


  questionBadge.textContent =
    question;


  loading.classList.remove(
    "hidden"
  );


  const steps = [

    "Analyzing your question...",

    "Generating five AI-style answers...",

    "Evaluating relevance and clarity...",

    "Calculating rankings..."

  ];


  for (
    const step of steps
  ) {

    loadingText.textContent =
      step;

    await wait(420);

  }


  const data =
    buildResults(question);


  renderCards(data);

  renderRanking(data);


  loading.classList.add(
    "hidden"
  );


  ranking.classList.remove(
    "hidden"
  );


  results.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

}


/* RENDER CARDS */

function renderCards(data) {

  cards.innerHTML =
    data.map(
      (ai, index) => `

      <article
        class="ai-card"
        style="animation-delay:${index * 70}ms"
      >

        <div class="ai-head">

          <div class="ai-icon">
            ${ai.icon}
          </div>

          <div>

            <div class="ai-name">
              ${ai.name}
            </div>

            <div class="ai-type">
              ${ai.style}
            </div>

          </div>

        </div>


        <div class="answer">

          ${escapeHTML(
            ai.answer
          )}

        </div>


        <div class="score-row">

          <span>
            Estimated score
          </span>

          <span class="score">
            ${ai.score}%
          </span>

        </div>


        <div class="bar">

          <div
            class="fill"
            style="width:${ai.score}%"
          ></div>

        </div>


        <span class="rank">
          Response #${index + 1}
        </span>

      </article>

    `
    ).join("");

}


/* RANKING */

function renderRanking(data) {

  const sorted =
    [...data].sort(
      (a, b) =>
        b.score - a.score
    );


  rankingList.innerHTML =
    sorted.map(
      (ai, index) => `

      <div class="ranking-item">

        <div class="rank-num">

          ${
            index === 0
              ? "🥇"
              : index === 1
              ? "🥈"
              : index === 2
              ? "🥉"
              : index + 1
          }

        </div>

        <div class="rank-name">
          ${ai.name}
        </div>

        <div class="rank-score">
          ${ai.score}%
        </div>

      </div>

    `
    ).join("");


  const top =
    sorted[0];


  winner.innerHTML = `

    <h3>
      🏆 BEST AI FOR THIS QUESTION
    </h3>

    <strong>
      ${top.name} — ${top.score}%
    </strong>

    <p>
      This result is based on the demo evaluation
      of relevance, completeness and clarity
      for the question you entered.
    </p>

  `;

}


/* SECURITY */

function escapeHTML(text) {

  return text.replace(
    /[&<>"']/g,

    character => ({

      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"

    })[character]

  );

}


/* WAIT */

function wait(milliseconds) {

  return new Promise(
    resolve =>
      setTimeout(
        resolve,
        milliseconds
      )
  );

}