const TOTAL_ROUNDS = 8;

const princessSkinPalettes = [
  { name: "pearl", skin: "#ffe0cc", shade: "#e9ad96", nose: "#d99082", blush: "#ee7890", brow: "#754643" },
  { name: "peach", skin: "#f5c4a6", shade: "#d99778", nose: "#c67d70", blush: "#df6680", brow: "#704139" },
  { name: "honey", skin: "#d99a68", shade: "#b9754f", nose: "#a86750", blush: "#d25e70", brow: "#61382f" },
  { name: "caramel", skin: "#b9784f", shade: "#925737", nose: "#864c3c", blush: "#cb5f69", brow: "#4d2b28" },
  { name: "chestnut", skin: "#8b553d", shade: "#663b2c", nose: "#63382f", blush: "#c95e67", brow: "#3e2524" },
  { name: "cocoa", skin: "#633b31", shade: "#452822", nose: "#9a6759", blush: "#ce6972", brow: "#2e1d1d" }
];

const villainStates = [
  { mood: "Feeling smug", speech: "They'll never solve my clues!" },
  { mood: "Slightly startled", speech: "Hmph. That was lucky!" },
  { mood: "Glancing around", speech: "Again? How did they do that?" },
  { mood: "Knees beginning to wobble", speech: "This helper is clever..." },
  { mood: "Hiding behind his cape", speech: "I should have hidden them better!" },
  { mood: "Very nervous", speech: "My knees are knocking!" },
  { mood: "Trembling in his boots", speech: "Please stop finding jewels!" },
  { mood: "Ready to run", speech: "One more and I'm finished!" },
  { mood: "Completely defeated", speech: "I surrender! Keep the crown!" }
];

const chapters = [
  {
    title: "The Whispering Meadow",
    symbol: "✦",
    add: "At the meadow, {name} spots {a} glowing fireflies. {b} more float out of the daisies. How many fireflies light the hidden path?",
    subtract: "At the meadow, {name} sees {a} glowing fireflies. {b} fly ahead to show the path. How many stay by the daisies?",
    success: "The fireflies swirl into an arrow. The first crown jewel is sparkling in the grass!"
  },
  {
    title: "The Butterfly Bridge",
    symbol: "❀",
    add: "By the bridge, {a} blue butterflies greet {name}. Then {b} pink butterflies join them. How many butterflies dance together?",
    subtract: "On the bridge, {a} butterflies dance around {name}. Then {b} flutter toward the river. How many remain?",
    success: "The butterflies lift a silver leaf. A moon-bright jewel was hiding underneath!"
  },
  {
    title: "The Singing Garden",
    symbol: "♪",
    add: "The garden flowers sing when {name} waters them. {a} roses and {b} tulips open. How many flowers are singing?",
    subtract: "There are {a} singing flowers in the garden. {b} close for a tiny nap. How many keep singing?",
    success: "The flowers sing their highest note, and a jewel pops from a golden sunflower!"
  },
  {
    title: "The Royal Bakery",
    symbol: "♥",
    add: "The baker gives {name} {a} berry tarts and {b} lemon tarts for the journey. How many tarts are there altogether?",
    subtract: "The baker made {a} tiny tarts. A hungry breeze carries {b} away. How many tarts are safely left?",
    success: "A warm tart cracks open with a shimmer. The fourth jewel smells faintly of strawberries!"
  },
  {
    title: "The Dragon's Bell Tower",
    symbol: "♬",
    add: "A friendly dragon has polished {a} silver bells. {name} polishes {b} golden bells. How many bells are ready to ring?",
    subtract: "The tower holds {a} ringing bells. The dragon gently quiets {b}. How many bells are still ringing?",
    success: "Ding-dong! The bells shake loose another jewel, and the dragon cheers for {name}!"
  },
  {
    title: "The Shimmering Lake",
    symbol: "≈",
    add: "At the lake, {a} little boats wait by the reeds and {b} more sail in. How many boats can {name} count?",
    subtract: "There are {a} little boats on the lake. {b} sail behind the waterfall. How many can {name} still see?",
    success: "The boats make a star shape on the water. At its centre floats the sixth jewel!"
  },
  {
    title: "The Moonbeam Gate",
    symbol: "☾",
    add: "The gate needs starlight to open. {name} catches {a} little stars, then {b} more. How many stars glow in the lantern?",
    subtract: "The lantern holds {a} little stars. {b} leap up into the sky. How many stars stay to open the gate?",
    success: "The moonbeam gate swings open. Jewel number seven hums a silvery song!"
  },
  {
    title: "The Starlight Ballroom",
    symbol: "♦",
    add: "Inside the ballroom, Princess Poppy finds {a} crown jewels and {name} brings {b} more. How many jewels sparkle together?",
    subtract: "On a velvet cushion lie {a} sparkling jewels. Poppy places {b} into the crown. How many remain on the cushion?",
    success: "The final jewel flies into place. The Moonpetal Crown glows brighter than the moon!"
  }
];

const state = {
  mode: "mixed",
  round: 1,
  score: 0,
  answered: false,
  current: null,
  playerName: "Royal Helper",
  musicOn: true
};

const els = {
  welcomeScreen: document.querySelector("#welcomeScreen"),
  gameScreen: document.querySelector("#gameScreen"),
  playerName: document.querySelector("#playerName"),
  nameHint: document.querySelector("#nameHint"),
  startButton: document.querySelector("#startButton"),
  playerGreeting: document.querySelector("#playerGreeting"),
  musicButton: document.querySelector("#musicButton"),
  musicIcon: document.querySelector("#musicIcon"),
  scoreText: document.querySelector("#scoreText"),
  chapterNumber: document.querySelector("#chapterNumber"),
  chapterTitle: document.querySelector("#chapterTitle"),
  sceneSymbol: document.querySelector("#sceneSymbol"),
  villain: document.querySelector("#villain"),
  villainSpeech: document.querySelector("#villainSpeech"),
  villainStatus: document.querySelector("#villainStatus"),
  villainMood: document.querySelector("#villainMood"),
  fearDots: document.querySelectorAll(".fear-meter span"),
  storyText: document.querySelector("#storyText"),
  progressLabel: document.querySelector("#progressLabel"),
  roundText: document.querySelector("#roundText"),
  leftNumber: document.querySelector("#leftNumber"),
  operator: document.querySelector("#operator"),
  rightNumber: document.querySelector("#rightNumber"),
  equalSign: document.querySelector("#equalSign"),
  mysteryMark: document.querySelector("#mysteryMark"),
  itemRow: document.querySelector("#itemRow"),
  answerGrid: document.querySelector("#answerGrid"),
  feedback: document.querySelector("#feedback"),
  nextButton: document.querySelector("#nextButton"),
  restartButton: document.querySelector("#restartButton"),
  modeButtons: document.querySelectorAll(".mode-button"),
  progressDots: document.querySelectorAll(".progress-dot")
};

let audioContext;
let musicTimer;
let melodyIndex = 0;
const melody = [523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 880, 698.46];

function cleanName(value) {
  return value.trim().replace(/[^\p{L}\p{M}' -]/gu, "").slice(0, 18);
}

function fillStory(template, problem) {
  return template
    .replaceAll("{name}", state.playerName)
    .replaceAll("{a}", problem.a)
    .replaceAll("{b}", problem.b);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickPrincessSkin() {
  const palette = princessSkinPalettes[randomInt(0, princessSkinPalettes.length - 1)];
  document.documentElement.dataset.princessSkin = palette.name;
  document.querySelectorAll(".princess").forEach((princess) => {
    princess.style.setProperty("--skin", palette.skin);
    princess.style.setProperty("--skin-shade", palette.shade);
    princess.style.setProperty("--nose", palette.nose);
    princess.style.setProperty("--blush", palette.blush);
    princess.style.setProperty("--brow", palette.brow);
  });
}

function shuffle(values) {
  return [...values].sort(() => Math.random() - 0.5);
}

function getOperation() {
  if (state.mode === "mixed") return Math.random() > 0.48 ? "add" : "subtract";
  return state.mode;
}

function makeProblem() {
  const operation = getOperation();
  let a = randomInt(1, 9);
  let b = randomInt(1, 6);

  if (operation === "subtract") {
    a = randomInt(3, 10);
    b = randomInt(1, Math.min(6, a));
  }

  const answer = operation === "add" ? a + b : a - b;
  const options = new Set([answer]);

  while (options.size < 3) {
    const guess = Math.max(0, answer + randomInt(-3, 3));
    if (guess !== answer && guess <= 15) options.add(guess);
  }

  return { a, b, answer, operation, options: shuffle([...options]) };
}

function playNote(frequency, duration = 0.34, volume = 0.035) {
  if (!audioContext || !state.musicOn) return;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const now = audioContext.currentTime;

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(frequency, now);
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(volume, now + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  oscillator.connect(gain).connect(audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + duration + 0.03);
}

function startMusic() {
  const AudioEngine = window.AudioContext || window.webkitAudioContext;
  if (!AudioEngine) {
    state.musicOn = false;
    updateMusicButton();
    return;
  }
  if (!audioContext) audioContext = new AudioEngine();
  audioContext.resume();
  clearInterval(musicTimer);
  if (!state.musicOn) return;
  playNote(melody[melodyIndex]);
  musicTimer = window.setInterval(() => {
    playNote(melody[melodyIndex]);
    melodyIndex = (melodyIndex + 1) % melody.length;
  }, 620);
}

function playSparkle() {
  if (!audioContext || !state.musicOn) return;
  [783.99, 987.77, 1174.66].forEach((note, index) => {
    window.setTimeout(() => playNote(note, 0.24, 0.055), index * 90);
  });
}

function updateMusicButton() {
  els.musicIcon.textContent = state.musicOn ? "♫" : "♪";
  els.musicButton.setAttribute("aria-pressed", String(state.musicOn));
  els.musicButton.setAttribute("aria-label", state.musicOn ? "Mute music" : "Play music");
  els.musicButton.title = state.musicOn ? "Mute music" : "Play music";
  els.musicButton.classList.toggle("muted", !state.musicOn);
}

function updateVillain() {
  const fear = Math.min(state.score, TOTAL_ROUNDS);
  const reaction = villainStates[fear];
  els.villain.dataset.fear = fear;
  els.villainSpeech.textContent = reaction.speech;
  els.villainMood.textContent = reaction.mood;
  els.villainStatus.setAttribute(
    "aria-label",
    `Lord Fumble is ${reaction.mood.toLowerCase()}. Fear level ${fear} of ${TOTAL_ROUNDS}.`
  );
  els.fearDots.forEach((dot, index) => dot.classList.toggle("scared", index < fear));
}

function renderItems(problem) {
  els.itemRow.innerHTML = "";
  const count = problem.operation === "add" ? problem.answer : problem.a;

  for (let index = 0; index < count; index += 1) {
    const gem = document.createElement("span");
    gem.className = "gem";
    if (problem.operation === "subtract" && index >= problem.answer) gem.classList.add("removed");
    els.itemRow.appendChild(gem);
  }
}

function renderAnswers(problem) {
  els.answerGrid.innerHTML = "";
  problem.options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.textContent = option;
    button.setAttribute("aria-label", `Answer ${option}`);
    button.addEventListener("click", () => chooseAnswer(option, button));
    els.answerGrid.appendChild(button);
  });
}

function renderProgress() {
  els.progressDots.forEach((dot, index) => {
    dot.classList.toggle("active", index < state.round);
    dot.classList.toggle("found", index < state.round - 1);
  });
  els.progressLabel.textContent = `${state.round} of ${TOTAL_ROUNDS} jewel trails`;
}

function renderProblem() {
  const problem = makeProblem();
  const chapter = chapters[state.round - 1];
  state.current = problem;
  state.answered = false;

  els.chapterNumber.textContent = `Chapter ${state.round}`;
  els.chapterTitle.textContent = chapter.title;
  els.sceneSymbol.textContent = chapter.symbol;
  els.storyText.textContent = fillStory(chapter[problem.operation], problem);
  els.roundText.textContent = `Jewel challenge ${state.round} of ${TOTAL_ROUNDS}`;
  els.leftNumber.textContent = problem.a;
  els.operator.textContent = problem.operation === "add" ? "+" : "−";
  els.rightNumber.textContent = problem.b;
  els.equalSign.hidden = false;
  els.mysteryMark.hidden = false;
  els.feedback.textContent = `What should ${state.playerName} choose?`;
  els.feedback.className = "feedback";
  els.nextButton.disabled = true;
  els.nextButton.textContent = state.round === TOTAL_ROUNDS ? "Return to the castle" : "Follow the trail";
  els.scoreText.textContent = `${state.score} ${state.score === 1 ? "jewel" : "jewels"}`;

  renderItems(problem);
  renderAnswers(problem);
  renderProgress();
  updateVillain();
}

function chooseAnswer(option, button) {
  if (state.answered) return;
  state.answered = true;
  const buttons = els.answerGrid.querySelectorAll(".answer-button");
  buttons.forEach((choice) => {
    choice.disabled = true;
    if (Number(choice.textContent) === state.current.answer) choice.classList.add("correct");
  });

  if (option === state.current.answer) {
    state.score += 1;
    button.classList.add("correct");
    const chapterEnding = fillStory(chapters[state.round - 1].success, state.current);
    const villainReaction = villainStates[state.score].speech;
    els.feedback.textContent = `${chapterEnding} Lord Fumble gasps, “${villainReaction}”`;
    els.feedback.className = "feedback good";
    updateVillain();
    playSparkle();
  } else {
    button.classList.add("incorrect");
    els.feedback.textContent = `So close, ${state.playerName}! The magic number is ${state.current.answer}. The jewel still joins your quest.`;
    els.feedback.className = "feedback try";
  }

  els.scoreText.textContent = `${state.score} ${state.score === 1 ? "jewel" : "jewels"}`;
  els.nextButton.disabled = false;
}

function finishQuest() {
  const perfect = state.score === TOTAL_ROUNDS;
  els.chapterNumber.textContent = "The End";
  els.chapterTitle.textContent = "The Starlight Ball";
  els.sceneSymbol.textContent = "♛";
  els.storyText.textContent = `Princess Poppy places the last jewel in the Moonpetal Crown. “We did it, ${state.playerName}!” she cheers. The ballroom fills with music, moonbeams, and a grand dance in your honour.`;
  els.roundText.textContent = "Quest complete";
  els.leftNumber.textContent = state.score;
  els.operator.textContent = "of";
  els.rightNumber.textContent = TOTAL_ROUNDS;
  els.equalSign.hidden = true;
  els.mysteryMark.hidden = true;
  els.itemRow.innerHTML = "";
  els.answerGrid.innerHTML = "";
  els.feedback.textContent = perfect
    ? `${state.playerName}, you earned every jewel. A perfectly magical score!`
    : `${state.playerName}, your brave counting brought the crown home!`;
  els.feedback.className = "feedback good finale";
  els.nextButton.disabled = true;
  els.progressLabel.textContent = "The crown is complete";
  els.progressDots.forEach((dot) => dot.classList.add("active", "found"));
  updateVillain();
  playSparkle();
}

function restart() {
  state.round = 1;
  state.score = 0;
  renderProblem();
}

function beginAdventure() {
  const name = cleanName(els.playerName.value);
  if (!name) {
    els.nameHint.textContent = "Please tell Princess Poppy your name first.";
    els.playerName.focus();
    return;
  }

  state.playerName = name;
  els.playerGreeting.textContent = `${name}'s`;
  els.welcomeScreen.hidden = true;
  els.gameScreen.hidden = false;
  startMusic();
  renderProblem();
  els.chapterTitle.focus({ preventScroll: true });
}

els.startButton.addEventListener("click", beginAdventure);
els.playerName.addEventListener("keydown", (event) => {
  if (event.key === "Enter") beginAdventure();
});

els.musicButton.addEventListener("click", () => {
  state.musicOn = !state.musicOn;
  updateMusicButton();
  if (state.musicOn) startMusic();
  else clearInterval(musicTimer);
});

els.nextButton.addEventListener("click", () => {
  if (state.round >= TOTAL_ROUNDS) {
    finishQuest();
    return;
  }
  state.round += 1;
  renderProblem();
});

els.restartButton.addEventListener("click", restart);

els.modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.mode = button.dataset.mode;
    els.modeButtons.forEach((item) => item.classList.toggle("active", item === button));
    restart();
  });
});

pickPrincessSkin();
updateMusicButton();
