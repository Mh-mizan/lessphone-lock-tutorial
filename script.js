// Drop your final screenshots into /assets as step-1.jpg ... step-10.jpg
// Keep the same crop/resolution for all 10 so the frame doesn't jump between steps.

const STEPS = [
  { img: "assets/step-1.jpg",  text: "Tap and hold the lock screen" },
  { img: "assets/step-2.jpg",  text: "Tap Customize" },
  { img: "assets/step-3.jpg",  text: "Tap on Lock Screen" },
  { img: "assets/step-4.jpg",  text: "Tap Add Widget" },
  { img: "assets/step-5.jpg",  text: "Find and tap LessPhone" },
  { img: "assets/step-6.jpg",  text: "Choose the widget you want" },
  { img: "assets/step-7.jpg",  text: "Tap Close" },
  { img: "assets/step-8.jpg",  text: "Tap Close again" },
  { img: "assets/step-9.jpg",  text: "Tap Done" },
  { img: "assets/step-10.jpg", text: "Your widget is set up" },
];

let current = 0;

const dotsEl = document.getElementById("dots");
const badgeEl = document.getElementById("badge");
const imgEl = document.getElementById("screenshot");
const instructionEl = document.getElementById("instruction");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");
const skipBtn = document.getElementById("skipBtn");

STEPS.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.id = "dot-" + i;
  dotsEl.appendChild(dot);
});

function render() {
  const step = STEPS[current];

  imgEl.src = step.img;
  instructionEl.textContent = step.text;
  badgeEl.textContent = current + 1;

  STEPS.forEach((_, i) => {
    document.getElementById("dot-" + i).classList.toggle("active", i <= current);
  });

  backBtn.disabled = current === 0;
  nextBtn.textContent = current === STEPS.length - 1 ? "Done" : "Next";
}

function goNext() {
  if (current === STEPS.length - 1) {
    finishTutorial();
    return;
  }
  current++;
  render();
}

function goBack() {
  if (current === 0) return;
  current--;
  render();
}

function finishTutorial() {
  // Called when the user finishes or skips the tutorial.
  // Wire this to whatever your app expects when the webview should close.
  //
  // WKWebView (iOS native bridge) example, if you add a script message handler
  // named "tutorialClosed" on the WKUserContentController:
  //
  //   if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.tutorialClosed) {
  //     window.webkit.messageHandlers.tutorialClosed.postMessage({ completed: true });
  //   }
  //
  // If you're not using a native bridge and this is just a plain webview
  // with a close button in your app's own chrome, you don't need to do
  // anything here — leave this function as a no-op.
  console.log("Tutorial finished");
}

nextBtn.addEventListener("click", goNext);
backBtn.addEventListener("click", goBack);
skipBtn.addEventListener("click", finishTutorial);

render();
