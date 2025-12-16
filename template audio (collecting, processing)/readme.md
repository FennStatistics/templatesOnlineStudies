# Audio template (what it shows)

A **lab.js + JATOS audio-recording experiment skeleton** that demonstrates:

- **Audio capture:** browser-based microphone recording via `MediaRecorder` (start/stop, preview, overwrite-on-continue).
- **Audio validation:** mandatory test recording before the main task; recording required to proceed.
- **Question loop:** repeated open-ended questions, each answered via a separate audio recording.
- **Data handling:** audio converted to Base64, size-checked, and uploaded as separate result files to **JATOS**.
- **Participant handling:** Prolific PID enforcement vs. expert mode with generated IDs.
- **Study flow:** greetings → informed consent → audio test → audio question loop → feedback → ending/redirect.
- **Frontend:** minimal lab.js HTML forms with a fixed bottom **progress bar**.
