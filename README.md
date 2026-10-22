<p align="center">
  <img src="media/icon.png" width="150" alt="Dis-Gravity Logo" />
</p>

# Dis-Gravity

> **Bridge your VS Code AI chat with a Discord channel.** Messages from Discord are auto-processed by the Language Model in your IDE, and responses are sent back — all in real-time.

## Features

- 🤖 **Auto-processing** — Discord messages are automatically sent to the IDE Language Model (Gemini, Copilot, etc.) and responses are posted back
- 🚀 **Standalone CLI Daemon (`npx dis-gravity`)** — Run Dis-Gravity outside of VS Code as an independent background daemon! Seamlessly bridges Discord to JetBrains IDEs (IntelliJ, PyCharm, WebStorm, CLion), Neovim, Emacs, Zed, and headless Linux/Windows servers with full remote shell execution, git inspection, file exploration, and CLI AI agents (`agy`, `claude`, `aider`, `shell`)
- 🌐 **Multi-IDE Full Parity (`agentProvider: auto | antigravity | cursor | windsurf | copilot | cli`)** — Full feature parity across all major IDEs! Seamlessly bridges Discord with **Google Antigravity** (CDP :9000), **Cursor AI** (CDP Composer & Chat with `/plan`, `/edit`, `@Codebase`), **Windsurf** (CDP Cascade Agent with iframe discovery), **Visual Studio Code** (Native `vscode.lm` Language Model API & Copilot), and **Universal Terminal / CLI Agents** (Google Antigravity CLI `agy`, Claude Code `claude`, Aider `aider`, and system shells)
- 🧠 **Autonomous ReAct Agent Loop for VS Code Copilot** — In standard VS Code, `CopilotAgentProvider` runs a full autonomous ReAct tool loop (`view_file`, `edit_file`, `run_command`, `git_diff`, `list_dir`) with live step streaming and interactive Discord action buttons (`[ 🟢 Allow ]`, `[ 🔴 Deny ]`) for sensitive modifications!
- 🖥️ **Host Health & Workspace Dashboard (`/info`, `/workspace`, `!info`)** — View a real-time host hardware and project health dashboard in Discord: active project, git branch, dirty files count, open editor tabs, host OS, CPU specs, memory utilization, and system uptime with 1-click action buttons
- 🎮 **1-Click IDE Command Palette (`/palette`)** — Execute any VS Code / Antigravity command directly from Discord with 1-click buttons! Features preconfigured buttons for Reload Window, Restart Extension Host, DevTools, Settings, New/Toggle/Clear/Kill Terminal, Save All, Close All Editors, Git Sync/Pull/Push/Stage, and category browsing (Developer, Terminal, Files, Git, View)
- ⚡ **Native Slash Commands (`/`) & Live Action Autocomplete (`/action`)** — Native autocomplete picker in Discord for `/palette` (1-click buttons), `/action` (search & trigger any VS Code action with live autocomplete), `/plan` (planning mode), `/goal` (goal mode), `/grill` (alignment interview), `/stop` (remote cancel agent), `/status` (bridge health & model status), `/info` (system & workspace health), `/models` (model & effort selector), `/effort` (dedicated Low/Medium/High switcher), and `/new` (fresh chat)
- 🧠 **Model & Reasoning Effort Switching** — Switch reasoning effort (Low, Medium, High) on Gemini, Claude, and other models directly from Discord using 1-tap quick buttons (`[ 🟢 Low ]`, `[ 🟡 Medium ]`, `[ 🔴 High ]`), the `/models` interactive dropdown, the `/effort <level>` command, or text shortcuts (`!effort high`, `!low`, `!medium`, `!high`, `!model flash high`)
- 💬 **Multi-conversation** — Each Discord message creates a thread; replies in threads continue the same Antigravity conversation
- 🔧 **CDP Bridge** — Uses Chrome DevTools Protocol to interact with the Antigravity chat editor, preferring the Manager window for stability
- 📋 **Interactive Buttons & Prompts** — Selection and confirmation prompts in the IDE are forwarded as native Discord buttons and modal dialogs, allowing choices to be made with a single tap
- 📋 **Message Queue** — Concurrent Discord messages are queued (up to 5) instead of rejected, with position feedback
- 🔒 **Single-instance** — Leader election via VS Code `globalState` ensures only one extension host connects to Discord, even with multiple windows open
- 🎨 **Visual Tables & Headless Table Cards (`/table`, `!table`)** — Resolves Discord mobile text-wrapping distortion! Automatically renders Markdown tables into stunning, high-resolution visual PNG table cards natively displayed in Discord messages with dark theme styling, retina crispness, colored status chips, and pinch-to-zoom support. Features headless browser fallback to ensure table PNG cards render reliably even without open CDP ports! Also supports zero-wrap mobile record cards (`cards`), monospaced Unicode boxes (`rounded`, `boxed`), ASCII, and 1-tap button switching (`[ 🖼️ Visual Image ]`, `[ 📱 Mobile Cards ]`, `[ ╭─╮ Rounded ]`)
- 💻 **Remote Shell Runner (`/sh`, `!sh`, `$`)** — Execute terminal commands in your workspace root directly from Discord (e.g. `npm test`, `git status`, `cargo check`) and inspect stdout/stderr in syntax-highlighted code blocks with exit code and duration metrics
- 🌿 **Git Review & Colored Diff Inspector (`/git`, `/diff`, `!git`, `!diff`)** — Full remote Git workflow away from your desk. Inspect repository status (`/git status`), view colored syntax-highlighted diffs (`/diff`, `/git diff [file]`), browse recent commits (`/git log`), and stage/push changes with 1-tap interactive buttons (`[ 🔍 View Diff ]`, `[ ✅ Stage All ]`, `[ 🚀 Push ]`). Large diffs automatically generate and attach a downloadable `.patch` file
- 📁 **Remote File Explorer & Slicer (`/cat`, `/tree`, `/open`, `!cat`, `!tree`, `!open`)** — Inspect files remotely with syntax highlighting and line numbers (`/cat <path> [startLine] [endLine]`), generate clean visual directory tree structure (`/tree [dir] [depth]`), and open files directly into active IDE editor tabs (`/open <path>`)
- 📎 **Inbound Attachment & Screenshot Ingestion** — Drop mobile screenshots of UI bugs, crash logs, error snippets, or code files directly into Discord. Dis-Gravity automatically downloads them into `.disgravity/attachments/` and passes the local paths and file contexts directly into the AI agent prompt
- ⏳ **Live Step Streaming & Tool Observability** — Replaces opaque timers with real-time active step streaming in Discord (e.g. `⏳ Working (18s): 🔍 Viewing file package.json`, `⚡ Running command npm test`, `✏️ Editing dist/extension.js`, `💭 Thinking...`)
- 🛡️ **Tool Approvals & Action Confirmation Dialogs** — Approves tool executions and executable plans remotely. Surfaces confirmation dialogs directly to Discord with interactive action buttons (`[ 🟢 Proceed / Allow ]`, `[ 🔴 Cancel / Deny ]`, `[ 🛡️ Always Allow ]`)
- 📦 **Artifact Discovery & Asset Delivery (`/artifact`, `/get`)** — Download generated plans, walkthroughs, patch files, diagrams, or workspace files directly in Discord with interactive select menus, search filtering, and automatic attachment delivery upon task completion
- 🛡️ **User Access Whitelist (`allowedUsers`)** — Secure your IDE from unauthorized Discord users. Whitelist specific Discord User IDs so only you can execute commands, trigger actions, or interact with the AI assistant
- 🧵 **Persistent Conversation Mapping** — Thread-to-conversation bindings are stored in VS Code `workspaceState`, surviving window reloads, extension reboots, and crashes without losing thread context
- ⚙️ **Settings GUI** — Tabbed sidebar panel with built-in settings form (Bot Token, Channel ID, Debug Port, Allowed Users)
- 📡 **Live Status** — Green/red connection indicators for Discord and CDP right in the sidebar
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
