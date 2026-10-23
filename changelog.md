# Changelog

## [1.1.0] — 2026-10-23

### Added
- 🚀 **Standalone CLI Daemon (`npx dis-gravity` / `bin/dis-gravity.js`) (Gaps M-01 & M-02)**: Run Dis-Gravity outside of VS Code as an independent background daemon! Seamlessly bridges Discord to JetBrains IDEs (IntelliJ IDEA, PyCharm, WebStorm, CLion), Neovim, Emacs, Zed, and headless remote servers with full remote shell execution, git inspection, file exploration, and CLI AI agents (`agy`, `claude`, `aider`, `shell`).
- 🧠 **Autonomous ReAct Agent Loop for VS Code Copilot (Gap M-03)**: In standard VS Code, `CopilotAgentProvider` runs a full autonomous ReAct agent loop (`view_file`, `edit_file`, `run_command`, `git_diff`, `list_dir`) with live step streaming and interactive Discord action buttons (`[ 🟢 Allow ]`, `[ 🔴 Deny ]`) for sensitive modifications!
- 🖥️ **Host Health & Workspace Dashboard (`/info`, `/workspace`, `!info`) (Gap G-10)**: Real-time host hardware and project health dashboard in Discord: active project, git branch, dirty files count, open editor tabs, host OS, CPU specs, memory utilization, and system uptime with 1-click action buttons.
- 🖼️ **Headless Table PNG Rendering Fallback (Gap M-07)**: Headless browser (Edge / Chrome) rasterizer fallback ensuring high-resolution visual table PNG cards render reliably even in environments without an open CDP port (VS Code LM, CLI, and Standalone Daemon).
- 🌐 **Cursor Mode Chips & Codebase Mentions (Gap M-04)**: Cursor Composer mode switching (`/plan`, `/edit`) and codebase context mention integration.
- 🌐 **Windsurf Cascade Webview & Iframe Discovery (Gap M-05)**: Deep iframe and webview traversal to discover Cascade input in Windsurf.
- ⚙️ **Multi-IDE Settings & Port Discovery (Gaps M-08 & M-09)**: Dedicated configuration keys for `cursorPort`, `windsurfPort`, `cliAgentPath`, `enableCopilotReAct`, and `copilotMaxToolSteps`.
- 🌐 **Multi-IDE Full Feature Parity (`agentProvider: auto | antigravity | cursor | windsurf | copilot | cli`)**: Upgraded placeholder provider stubs to full production-grade autonomous implementations across all major IDEs (Cursor AI, Windsurf, VS Code Copilot, Universal Terminal / CLI Agent).
- 🖼️ **High-Resolution Visual Table Image Rendering & Mobile Cards (`/table`, `!table`)**: Eliminates the mobile Discord codeblock line-wrapping problem that scrambles multi-column ASCII tables. Dynamically renders Markdown tables into crisp, high-DPI (2x retina) PNG image cards via Chromium's HTML5 Canvas, styled with Discord's dark palette, rounded containers, bold headers, and colored status chips.
- ⏳ **Live Step Streaming & Tool Observability (G-05)**: Replaced static timer with dynamic, real-time step streaming in Discord status messages. Automatically inspects DOM tool blocks, active spinners, task cards, and thinking containers to display active tool execution steps.
- 🛡️ **Tool Approvals & Action Confirmation Dialogs (G-08)**: Full remote bridging for tool execution approvals, permission prompts, and executable plan proceed cards. Renders native color-coded Discord action rows (`[ 🟢 Proceed / Allow ]`, `[ 🔴 Cancel / Deny ]`, `[ 🛡️ Always Allow ]`).
- 📦 **Artifact Discovery & Asset Delivery (`/artifact`, `/get`, `!artifact`, `!get`) (G-09)**: Discover and download AI-generated artifacts (plans, walkthroughs, patches, diagrams, logs) directly in Discord.
- 🛡️ **Security Whitelist Alerts**: Clear on-boot warnings and `/status` notifications when `allowedUsers` is unconfigured.
- 📖 **Comprehensive 3-Minute Quickstart Guide**: Detailed Discord Bot setup with Privileged Gateway Intents (Message Content Intent) troubleshooting and platform-specific shortcut launch guides.

### Fixed
- 🖼️ **Fixed Missing Visual Table Images in Discord**: Resolved premature table string replacement before image extraction and relaxed CDP target evaluation requirements.
- 🧠 **Fixed `/plan`, `/goal`, and `/grill` Not Activating IDE Modes**: Automatically selects and inserts native Lexical `contextScopeItemMention` command chips into the editor before prompt submission.

## [1.0.0] — 2026-10-20

### Added
- 🌿 **Git Status & Review (`/git status`, `!git status`)**: Remote inspection of working tree branches, ahead/behind status, staged changes, unstaged changes, and untracked files with interactive action buttons (`[ 🔍 View Diff ]`, `[ ✅ Stage All ]`, `[ 🚀 Push ]`, `[ 📊 Status ]`).
- 🔍 **Colored Git Diff Inspector (`/diff`, `/git diff`, `!diff`)**: Full git diff inspection with Discord `diff` syntax highlighting (`+` green, `-` red). Includes diffstat summary, targeted file diffs (`/diff <file>`), staged change support (`staged: true`), and automatic `.patch` file generation and attachment for diffs exceeding message length limits.
- 📜 **Git Commit Log (`/git log`, `!git log`)**: View recent commit hashes, summaries, author names, and relative timestamps directly from Discord.
- 📁 **Remote File Inspection (`/cat`, `!cat`)**: Inspect workspace files remotely with language-specific syntax highlighting, line numbers, and optional line range slicing (`/cat <path> [startLine] [endLine]`). Automatically detects binary files and attaches oversized text files.
- 🌳 **Workspace Directory Tree (`/tree`, `!tree`)**: Visual ASCII directory tree generator with customizable depth (`depth: 1-5`, default: 2), directory/file counters, and automated noise filtering (`node_modules`, `.git`, `.disgravity`, `dist`, build caches).
- 📂 **Remote File Opener (`/open`, `!open`)**: Open any file in the active editor tab of Antigravity IDE directly from Discord.
- 📎 **Inbound Attachment Downloader & Multimodal Prompt Ingestion**: Automatically downloads image screenshots, crash logs, and code files sent in Discord messages directly into `.disgravity/attachments/` in the workspace root, tagging them into the agent prompt (`[Attached Image: ...]`, `[Attached File: ...]`) for full vision and context analysis.
- 💻 **Remote Terminal & Shell Runner (`/sh`, `!sh`, `$`)**: Execute any shell command directly in the host workstation workspace root from Discord. Outputs command exit code, execution duration, and formatted stdout/stderr code blocks with auto-truncation for Discord message limits.
- 🛡️ **User Authorization Whitelist (`allowedUsers`)**: Protect your IDE from unauthorized server members. Only configured Discord user IDs can execute commands, trigger actions, or interact with the AI assistant. Unregistered users receive an explicit ephemeral rejection.
- 🧵 **Persistent Conversation Thread Mapping**: Thread-to-conversation bindings are now automatically saved to VS Code `workspaceState` and restored on extension launch, surviving window reloads (`!reload`), IDE restarts, and crashes.
- ⚙️ **Allowed Users Sidebar Setting**: Added Allowed Users configuration to both `package.json` settings and the Dis-Gravity webview sidebar panel with auto-save.
- 🎮 **1-Click IDE Command Palette Dashboard (`/palette`)**: Complete remote control for triggering any VS Code / Antigravity command from Discord with 1-click native buttons. Includes 25 interactive buttons per view across Featured, Developer (`Reload Window`, `Restart Host`, `DevTools`, `Settings`, `Keybindings`, `Process Explorer`), Terminal (`New Terminal`, `Toggle Term`, `Clear Term`, `Kill Term`, `Split Term`), Files (`Save All`, `Close All`, `Reopen Closed`, `New File`, `Save File`), Git (`Sync`, `Pull`, `Push`, `Stage All`, `Unstage All`), and View categories. Features instant window reload notice before restarting.
- ⚡ **Live Command Palette Autocomplete & Action Execution (`/action`)**: Registered `/action <command>` slash command with live real-time Discord autocomplete querying both curated friendly titles and all live registered commands (`vscode.commands.getCommands()`) in the IDE.
- 🔍 **Interactive Command Search Modal**: Added `[ 🔍 Search Any... ]` button that opens a native Discord modal popup to search across all ~1,000+ IDE commands by keyword and dynamically generates 1-click buttons for the matching search results.
- 🚀 **Command Palette Text Shortcuts**: Instant chat shortcuts for `!palette [category]`, `!reload` / `!restart` (Reload Window), `!save` (Save All), `!terminal` (New Terminal), and `!run <commandId>` / `!cmd <commandId>` (arbitrary command ID execution).
- 🧠 **AI Reasoning Effort Switcher (Low / Medium / High)**: Full remote control for models with dedicated thinking/reasoning effort levels (such as Gemini 3.8 Flash, Claude Opus, and Claude Sonnet). Added `/effort <level>` slash command with autocomplete choices (`Low`, `Medium`, `High`), expanded `/models` dropdown menu with individual model+effort variations, added 1-tap quick action buttons (`[ 🟢 Low Effort ]`, `[ 🟡 Medium Effort ]`, `[ 🔴 High Effort ]`) to `/status` and `/models`, and supported text command shortcuts (`!effort high`, `!low`, `!medium`, `!high`, `!model <name> <effort>`).
- ⚡ **Native Discord Slash Commands (`/`) & IDE Actions Bridge**: Registered Discord application commands (`/plan`, `/goal`, `/grill`, `/stop`, `/status`, `/models`, `/model`, `/effort`, `/new`, `/help`) that appear in Discord's native `/` autocomplete command picker with instant guild registration.
- 🛑 **Emergency Agent Cancellation**: Added `/stop` slash command and text shortcut (`!stop`, `cancel`) that triggers CDP to immediately click the IDE's cancel button (`input-send-button-cancel-tooltip`), stopping long-running or runaway agent tasks remotely.
- ⚡ **Interactive Model Switcher Dropdown**: Attached a Discord `StringSelectMenu` to `/models` commands allowing one-tap AI model switching directly from Discord desktop and mobile.
- 📊 **Rich Status & Control Panel**: Added `/status` command displaying real-time CDP bridge connection, active AI model, token usage, agent busy/idle state, and quick action buttons (`[ 🛑 Stop Agent ]`, `[ 🔄 New Chat ]`, `[ ⚡ Models ]`).
- 💬 **Text-Command Fallbacks**: Full support for typing `/cmd` or `!cmd` in regular chat messages and threads (`!plan`, `!goal`, `!grill`, `!stop`, `!status`, `!models`, `!new`, `!help`).
- 📋 Native Discord interactive components for IDE prompts: tap options directly via Discord Buttons (color-coded for Yes/No/Options), native Modal popup for custom write-in responses, and Skip button with instant double-click protection.
- 📋 Interactive prompt support: forward selection and confirmation prompts to Discord and submit choices back to IDE

- 🖼️ **Fixed Missing Visual Table Images in Discord**: Resolved a dual-issue bug that prevented Markdown tables from attaching their PNG image cards. Previously, `cleanResponse` prematurely called `formatMarkdownTablesForDiscord` before passing the text to `sendToThread`/`sendMessage`, replacing markdown table syntax with placeholder text before table extraction could run. Additionally, fixed the CDP table renderer (`renderTableToPng`) by removing strict execution-context restrictions (evaluating in default context first), correcting WebSocket target discovery, waiting strictly for response message ID 9911, and adding defensive fallback to mobile cards (`renderTableAsCards`) so missing image promises are never made if image generation fails.
- 🧠 **Fixed `/plan`, `/goal`, and `/grill` Not Activating IDE Modes**: Previously sent slash commands as raw text strings without creating Antigravity's Lexical decorator chips, leaving the IDE in default execution mode. Now automatically drives the Lexical typeahead to select and insert the native `contextScopeItemMention` command chip (attaching the IDE's full system prompt instructions for Planning Mode, Goal Mode, etc.) before inserting the prompt and submitting.
- 🐛 Fixed `/models` failure ("Model dialog did not open"): updated selector to target Antigravity IDE's Base-UI `[data-testid="model-selector-panel"]` and `[role="menu"]` container, added detection for `div[role="menuitem"]` items and effort submenus (High/Medium/Low), prevented dropdown toggling when already open, and improved model alias resolution.
- 🐛 Fixed model dialog prematurely opening and closing on `/models`: prevented double-click toggle race condition by polling for panel visibility (6 attempts @ 100ms) after DOM trigger click before falling back to CDP mouse clicks, stripped trailing badge text from model names, provided explicit error diagnostics when parsing items, and packaged/installed the updated extension directly into Antigravity IDE.
- 🔄 Added background task & autonomous watchdog: automatically captures and delivers completion responses and follow-up turns (e.g. after background terminal tasks or reactive agent wakeups) to the active Discord thread.
- 📋 Added idle prompt detection: automatically discovers and forwards interactive question prompts to Discord even when triggered outside direct Discord message turns.
- 🐛 Fixed prompt question text missing in Discord by properly stripping style, script, and SVG noise and correctly targeting rich-text question containers.
- 🐛 Fixed missing file paths, directory chips, and symbol links in Discord responses caused by dropping `<button>` elements during HTML-to-Markdown conversion.
- 🎨 Added table markdown parsing and preserved code block syntax highlighting language.
- 🐛 Fixed assistant status messages (analyzing, completed, queue, error, and webview typing messages) to display in English instead of Italian.
- 🎨 Enhanced Discord visual fidelity to match IDE chat: normalized H1–H3 headings and adapted H4+ subheadings for Discord markdown, converted horizontal dividers to clean visual rules (`────────────────────────────`), preserved task list checkboxes (`✅` / `⬜`), and formatted GitHub alert blockquotes (`> ℹ️ **NOTE:**`, `> ⚠️ **WARNING:**`).
- 🛡️ Hardened noise filter (`cleanResponse` / `RC`): strictly scoped system status patterns to prevent dropping bulleted list items and status translation arrows (`⏳`, `✅`).
- ✂️ Markdown-aware message chunking (`sU`): balanced unclosed code block fences across 2000-character chunks to prevent broken syntax highlighting.
- 🔍 Multi-attempt chat DOM extraction: prioritized conversation turn traversal to reliably extract Markdown without falling back to plain text `innerText`.
- 🛡️ Resolved duplicate extension conflict with legacy `anonk.antigravity-discord-custom` and protected `registerWebviewViewProvider` against collision crashes.

### Removed
- ❌ Removed auto-click / auto-accept background clicking mechanism

## [0.1.0] — 2026-02-26

### Added

- 🤖 Discord ↔ AI agent bridge via Chrome DevTools Protocol (CDP)
- ✅ Auto-accept: automatically clicks Accept / Run / Always Allow buttons (always-on when CDP is connected)
- 📋 Message queue: concurrent Discord messages are queued (up to 5) instead of rejected
- 🎨 Rich markdown formatting on Discord: code blocks with syntax highlighting, bold, italic, inline code, lists, blockquotes
- ⚙️ Settings GUI in the sidebar panel with tabbed interface (Chat / Settings)
- 📡 Live connection status indicators (Discord + CDP + Auto-Accept) with green/red dots
- 🧵 Reasoning threads on Discord for each processed message
- ✂️ Smart message splitting for Discord's 2000-character limit
- 🎨 VS Code theme integration for chat and settings panels
- 🔄 Reconnect command and button
- 🔇 Noise filtering: strips Antigravity UI chrome and auto-accept scan logs from responses
- 🔁 First-message retry: automatically retries if the agent doesn't start processing
- Auto-save settings with debounce
