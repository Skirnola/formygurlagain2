const startBtn = document.getElementById("start-btn");
const welcomeScreen = document.getElementById("welcome-screen");
const quizContainer = document.getElementById("quiz-container");
const resultScreen = document.getElementById("result-screen");
const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const questionImage = document.getElementById("question-image");
const resultMessage = document.getElementById("result-message");
const scoreDisplay = document.getElementById("score");
const welcomeGif = document.getElementById("welcome-gif");

const loveEmotes = ["❤️", "💖", "💕", "💘", "💝", "💗", "💓", "💞", "💌"];

const questions = [
  {
    question: "Kapan tanggal lahir ibay?",
    image: "assets/tanggalibay.jpeg",
    answers: [
      "1 Desember 2005",
      "2 Agustus 2007",
      "1 Februari 2005",
      "26 Maret 2005",
    ],
    correct: "1 Februari 2005",
  },
  {
    question: "Kapan Tanggal Jadian Kita Duluu?",
    image: "assets/tgljadian.jpeg",
    answers: ["17 Agustus 2022", "19 Mei 2022", "21 Mei 2022", "1 April 2022"],
    correct: "21 Mei 2022",
  },
  {
    question: "Apa Warna Favorit Ibay? Eheheh",
    image: "assets/warnaibay.jpeg",
    answers: ["Merah", "Hitam", "Ungu", "Kuning"],
    correct: "Ungu",
  },
  {
    question: "Dimana kita foto inii?",
    image: "assets/winskie.jpeg",
    answers: ["Gamemaster", "Kotabaru", "Seblak R.A", "Di Rumah Winwin"],
    correct: "Gamemaster",
  },
  {
    question: "Apa Makanan kesukaan ibay?",
    image: "assets/makananibay.jpeg",
    answers: ["Telor", "Nasi Goreng", "Sosis", "Tahu"],
    correct: "Telor",
  },
  {
    question: "Siapa yang paling sayang sama windi?",
    image: "assets/sygwindi.jpeg",
    answers: ["ibay", "Iqbal", "ibal", "iballe"],
    correct: "ibay",
  },
  {
    question: "Kita paling sering date kemanaa?",
    image: "assets/palingseringmamdimana.jpeg",
    answers: ["Mie Gacoan", "Seblak", "Ramen", "Nasi Katsu"],
    correct: "Seblak",
  },
  {
    question: 'Siapa yang paling suka ngomong "terserah"?',
    image: "assets/terserah.jpeg",
    answers: ["Winwin", "Siapa yaa", "Ibay", "Hantu"],
    correct: "Winwin",
  },
  {
    question: "Siapa orang yang paling benci sama ibay?",
    image: "assets/benci.jpeg",
    answers: ["Windi", "Windi", "WINDI", "WINDI LAH SIAPA LAGI"],
    correct: "WINDI LAH SIAPA LAGI",
  },
  {
    question: "dah ah cape, sini aku hug",
    image: "assets/hug.jpeg",
    answers: ["Mauu", "Iyaaa", "Gamau (aslinya mau)", "g (aslinya mau juga)"],
    correct: "Iyaaa",
  },
];

let currentQuestion = 0;
let score = 0;

// Display the welcome GIF
startBtn.addEventListener("click", () => {
  welcomeScreen.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  showQuestion();
  welcomeGif.classList.remove("hidden");
  welcomeGif.src =
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXZjcXJzMjF5NDA5eXR0ZGlqNGJ4ZHlkNWJhMGs0dnNyMHM1bndzdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/c76IJLufpNwSULPk77/giphy.gif";

  const audio = document.getElementById("background-music");
  audio.play().catch((error) => {
    console.log("Autoplay blocked:", error);
  });
});

function showQuestion() {
  resetState();
  const q = questions[currentQuestion];
  questionText.textContent = q.question;

  if (q.image) {
    questionImage.src = q.image;
    questionImage.classList.remove("hidden");
    if (q.imageStyle) {
      Object.assign(questionImage.style, q.imageStyle);
    } else {
      questionImage.style.width = "";
      questionImage.style.height = "";
    }
  } else {
    questionImage.classList.add("hidden");
  }

  q.answers.forEach((answer) => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.addEventListener("click", () => selectAnswer(answer));
    answerButtons.appendChild(btn);
  });
}

function resetState() {
  answerButtons.innerHTML = "";
  const feedback = document.getElementById("answer-feedback");
  if (feedback) feedback.remove();
}

function selectAnswer(answer) {
  const correct = questions[currentQuestion].correct;
  const feedback = document.createElement("p");
  feedback.id = "answer-feedback";
  feedback.style.color = "white";

  if (answer === correct) {
    score++;
    feedback.textContent = "YAPP BETULL 💖";
    feedback.classList.add("correct"); // Tambah kelas untuk jawaban benar
  } else {
    feedback.textContent = "YAHH SALAH 😣";
    feedback.classList.add("incorrect"); // Tambah kelas untuk jawaban salah
  }

  quizContainer.appendChild(feedback);

  const buttons = answerButtons.getElementsByTagName("button");
  for (let btn of buttons) {
    btn.disabled = true;
  }

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 3000);
}

function showResult() {
  quizContainer.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  scoreDisplay.textContent = score;

  const resultGif = document.getElementById("result-gif");
  const loveSection = document.getElementById("love-button-section");

  if (score >= 7) {
    resultMessage.textContent = "Yayyy berarti masi sayang sama aku 💖";
    resultGif.src =
      "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHVleDhhMnlhdzVucjV4d2FnczlhcWUxNGgyaWhiZnEwNW45end0NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RLEdq1A9PT0BZo27s3/giphy.gif";
    loveSection.classList.remove("hidden");
  } else {
    resultMessage.textContent = "DIHHH UDA GA SAYANG INIMA, ULANG LAGI 😤";
    resultGif.src =
      "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2Jra2Q4bGhndjByNzJ4ZG4zYjJpNThhM2JvMG4xNjQyODl4ZzJsNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aNFT7eG2rIKK715uLk/giphy.gif";
  }

  if (score <= 7) {
    resultScreen.classList.add("vertical-result");
  }

  document.getElementById("love-button").addEventListener("click", () => {
    const loveMessage = document.getElementById("love-message");
    loveMessage.classList.remove("hidden");
  });
}

// Updated Floating Hearts Animation
function createHearts() {
  const heartsContainer = document.getElementById("hearts-container");
  setInterval(() => {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.textContent =
      loveEmotes[Math.floor(Math.random() * loveEmotes.length)]; // Random love emote
    heart.style.left = `${Math.random() * 100}vw`; // Random horizontal position
    heart.style.setProperty("--drift", Math.random() > 0.5 ? 1 : -1); // Random drift direction (left or right)
    heartsContainer.appendChild(heart);
    setTimeout(() => {
      heart.remove(); // Remove heart after animation completes
    }, 10000); // Match the animation duration (10s)
  }, 500); // Create a new heart every 500ms for a steady flow
}

document.addEventListener("DOMContentLoaded", createHearts);
