# Changelog

## [1.0.0] — 2026-10-20

### Added
- 📋 Native Discord interactive components for IDE prompts: tap options directly via Discord Buttons (color-coded for Yes/No/Options), native Modal popup for custom write-in responses, and Skip button with instant double-click protection.
- 📋 Interactive prompt support: forward selection and confirmation prompts to Discord and submit choices back to IDE

### Fixed
- 🔄 Added background task & autonomous watchdog: automatically captures and delivers completion responses and follow-up turns (e.g. after background terminal tasks or reactive agent wakeups) to the active Discord thread.
- 📋 Added idle prompt detection: automatically discovers and forwards interactive question prompts to Discord even when triggered outside direct Discord message turns.
- 🐛 Fixed prompt question text missing in Discord by properly stripping style, script, and SVG noise and correctly targeting rich-text question containers.
- 🐛 Fixed missing file paths, directory chips, and symbol links in Discord responses caused by dropping `<button>` elements during HTML-to-Markdown conversion.
- 🎨 Added table markdown parsing and preserved code block syntax highlighting language.
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
