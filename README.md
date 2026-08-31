# Lock Screen Widget Setup — tutorial

Small standalone web tutorial (HTML/CSS/JS, no build step, no dependencies) for the "Lock Widget Setup" screen. Opens inside a webview in the app when the user taps that entry point.

## What's in here
```
index.html      the screen itself
style.css       styling — accent color is set once, at the top
script.js       the 10 steps (image + instruction text) and next/back logic
assets/         step-1.png ... step-10.png (currently placeholders — swap these)
```

## 1. Swap the placeholder images
`assets/step-1.png` through `step-10.png` are placeholders. Replace each with the real screenshot for that step, using the same filenames. Keep the same crop/resolution for all 10 so the screen doesn't jump when the user taps Next.

If you want to rename or reorder steps, edit the `STEPS` array at the top of `script.js` — each entry is just `{ img, text }`.

## 2. Set the accent color
In `style.css`, `--accent` and `--accent-text` are defined once at the top (`:root`). Set these to the app's real brand color — right now they're a placeholder green.

## 3. Publish to GitHub

```bash
cd lockscreen-tutorial
git init
git add .
git commit -m "Lock screen widget tutorial"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

Then turn on GitHub Pages:
1. On the repo page, go to **Settings → Pages**
2. Under **Branch**, pick `main` and `/ (root)`, then **Save**
3. GitHub gives you a URL like `https://<your-username>.github.io/<repo-name>/`

That URL is what you hand to the developer.

## 4. What the developer needs to do
Just point a webview at the published URL when the user taps "Lock Widget Setup." Nothing else to wire up unless you also want the tutorial to tell the app when it's done (see below).

**iOS (WKWebView), typical case:**
```swift
let webView = WKWebView(frame: view.bounds)
webView.load(URLRequest(url: URL(string: "https://<your-username>.github.io/<repo-name>/")!))
view.addSubview(webView)
```
If the screen has its own close/back button in the app's native chrome (not inside the webview), that's all that's needed — the developer just dismisses the webview like any other screen.

**Optional — let the tutorial tell the app when the user finishes:**
`script.js` has a `finishTutorial()` function with a commented example using `WKScriptMessageHandler`. If the developer registers a message handler named `tutorialClosed` on the `WKUserContentController`, the page will call it automatically when the user finishes or taps Skip. Not required — only needed if the app wants to auto-close the webview or mark the tutorial as seen.

## Notes carried over from review
- Steps 7 and 8 are both "tap Close" back to back. This is a real UX friction point (not just a copy issue) — worth confirming with the team whether these can be merged into one tap before this ships, since onboarding friction reduction is the current priority.
- Progress dots, numbered badge, and instruction card all use the single `--accent` color — no more mixed green/red annotation.
