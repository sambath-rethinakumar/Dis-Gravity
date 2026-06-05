<p align="center">
  <img src="media/icon.png" width="150" alt="Dis-Gravity Logo" />
</p>

# Dis-Gravity

> **Bridge your VS Code AI chat with a Discord channel.** Messages from Discord are auto-processed by the Language Model in your IDE, and responses are sent back — all in real-time.

## Features

- 🤖 **Auto-processing** — Discord messages are automatically sent to the IDE Language Model (Gemini, Copilot, etc.) and responses are posted back
- 💬 **Multi-conversation** — Each Discord message creates a thread; replies in threads continue the same Antigravity conversation
- 🔧 **CDP Bridge** — Uses Chrome DevTools Protocol to interact with the Antigravity chat editor, preferring the Manager window for stability
- ✅ **Auto-Accept** — Automatically clicks Accept / Run / Always Allow buttons, always-on when CDP is connected
- 📋 **Message Queue** — Concurrent Discord messages are queued (up to 5) instead of rejected, with position feedback
- 🔒 **Single-instance** — Leader election via VS Code `globalState` ensures only one extension host connects to Discord, even with multiple windows open
- 🎨 **Rich Markdown** — Code blocks, bold, italic, inline code, lists, and blockquotes are preserved on Discord
- ⚙️ **Settings GUI** — Tabbed sidebar panel with built-in settings form (Bot Token, Channel ID, Debug Port, Auto-Accept toggle)
- 📡 **Live Status** — Green/red connection indicators for Discord, CDP, and Auto-Accept right in the sidebar
- ✂️ **Smart message splitting** — Automatically splits long responses to respect Discord's 2000-character limit
- 🔇 **Noise filtering** — Strips Antigravity UI chrome and diagnostic logs from responses automatically
- 💭 **Thinking spoilers** — AI reasoning/thinking content is sent as Discord spoiler text
- 🎨 **VS Code theming** — Chat and settings panels follow your IDE theme

## Installation

### From VS Code Marketplace

Search for **"Dis-Gravity"** in the Extensions panel (`Ctrl+Shift+X`) and click **Install**.

### From .vsix (Releases)

1. Download the latest `.vsix` from [Releases](https://github.com/h4ck3r420/Dis-Gravity/releases)
2. In VS Code: `Ctrl+Shift+P` → **Extensions: Install from VSIX...** → select the file

### From source

```bash
git clone https://github.com/h4ck3r420/Dis-Gravity.git
cd Dis-Gravity
npm install
npm run compile
npm run package
```

Then install the generated `.vsix` file as described above.
