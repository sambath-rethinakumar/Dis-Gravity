# Changelog

## [1.0.0] — 2026-10-20

### Added
- 🧠 **AI Reasoning Effort Switcher (Low / Medium / High)**: Full remote control for models with dedicated thinking/reasoning effort levels (such as Gemini 3.8 Flash, Claude Opus, and Claude Sonnet). Added `/effort <level>` slash command with autocomplete choices (`Low`, `Medium`, `High`), expanded `/models` dropdown menu with individual model+effort variations, added 1-tap quick action buttons (`[ 🟢 Low Effort ]`, `[ 🟡 Medium Effort ]`, `[ 🔴 High Effort ]`) to `/status` and `/models`, and supported text command shortcuts (`!effort high`, `!low`, `!medium`, `!high`, `!model <name> <effort>`).
- ⚡ **Native Discord Slash Commands (`/`) & IDE Actions Bridge**: Registered Discord application commands (`/plan`, `/goal`, `/grill`, `/stop`, `/status`, `/models`, `/model`, `/effort`, `/new`, `/help`) that appear in Discord's native `/` autocomplete command picker with instant guild registration.
- 🛑 **Emergency Agent Cancellation**: Added `/stop` slash command and text shortcut (`!stop`, `cancel`) that triggers CDP to immediately click the IDE's cancel button (`input-send-button-cancel-tooltip`), stopping long-running or runaway agent tasks remotely.
- ⚡ **Interactive Model Switcher Dropdown**: Attached a Discord `StringSelectMenu` to `/models` commands allowing one-tap AI model switching directly from Discord desktop and mobile.
- 📊 **Rich Status & Control Panel**: Added `/status` command displaying real-time CDP bridge connection, active AI model, token usage, agent busy/idle state, and quick action buttons (`[ 🛑 Stop Agent ]`, `[ 🔄 New Chat ]`, `[ ⚡ Models ]`).
- 💬 **Text-Command Fallbacks**: Full support for typing `/cmd` or `!cmd` in regular chat messages and threads (`!plan`, `!goal`, `!grill`, `!stop`, `!status`, `!models`, `!new`, `!help`).
- 📋 Native Discord interactive components for IDE prompts: tap options directly via Discord Buttons (color-coded for Yes/No/Options), native Modal popup for custom write-in responses, and Skip button with instant double-click protection.
- 📋 Interactive prompt support: forward selection and confirmation prompts to Discord and submit choices back to IDE

### Fixed
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
