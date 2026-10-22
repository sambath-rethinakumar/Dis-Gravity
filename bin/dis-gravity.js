#!/usr/bin/env node

/**
 * Dis-Gravity Standalone CLI Daemon
 * Run Dis-Gravity as an editor-agnostic background service for JetBrains IDEs,
 * Neovim, Emacs, Zed, or headless remote servers.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const cp = require('child_process');

function parseArgs() {
  const args = process.argv.slice(2);
  const config = {
    token: process.env.DISCORD_BOT_TOKEN || '',
    channelId: process.env.DISCORD_CHANNEL_ID || '',
    guildId: process.env.DISCORD_GUILD_ID || '',
    allowedUsers: (process.env.DISCORD_ALLOWED_USERS || '').split(',').map(s => s.trim()).filter(Boolean),
    provider: process.env.DISCORD_AGENT_PROVIDER || 'cli',
    debugPort: parseInt(process.env.DEBUG_PORT || '9000', 10),
    workspace: process.cwd(),
    tableStyle: process.env.TABLE_STYLE || 'image',
    autoAttachTableImages: true
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    }
    if (arg === '--token' || arg === '-t') config.token = args[++i];
    else if (arg.startsWith('--token=')) config.token = arg.split('=')[1];
    else if (arg === '--channel' || arg === '-c') config.channelId = args[++i];
    else if (arg.startsWith('--channel=')) config.channelId = arg.split('=')[1];
    else if (arg === '--guild' || arg === '-g') config.guildId = args[++i];
    else if (arg.startsWith('--guild=')) config.guildId = arg.split('=')[1];
    else if (arg === '--provider' || arg === '-p') config.provider = args[++i];
    else if (arg.startsWith('--provider=')) config.provider = arg.split('=')[1];
    else if (arg === '--port') config.debugPort = parseInt(args[++i], 10);
    else if (arg.startsWith('--port=')) config.debugPort = parseInt(arg.split('=')[1], 10);
    else if (arg === '--workspace' || arg === '-w') config.workspace = path.resolve(args[++i]);
    else if (arg.startsWith('--workspace=')) config.workspace = path.resolve(arg.split('=')[1]);
    else if (arg === '--allowed-users' || arg === '-u') {
      config.allowedUsers = args[++i].split(',').map(s => s.trim()).filter(Boolean);
    } else if (arg.startsWith('--allowed-users=')) {
      config.allowedUsers = arg.split('=')[1].split(',').map(s => s.trim()).filter(Boolean);
    } else if (arg === '--table-style') config.tableStyle = args[++i];
  }

  return config;
}

function printHelp() {
  console.log(`
╔════════════════════════════════════════════════════════════════════════╗
║               Dis-Gravity Standalone CLI Daemon                        ║
║     The Ultimate Discord Bridge for JetBrains, Neovim & Headless       ║
╚════════════════════════════════════════════════════════════════════════╝

Usage:
  npx dis-gravity [options]
  node bin/dis-gravity.js [options]

Options:
  -t, --token <string>          Discord Bot Token (env: DISCORD_BOT_TOKEN)
  -c, --channel <string>        Discord Channel ID to bind (env: DISCORD_CHANNEL_ID)
  -g, --guild <string>          Discord Guild ID (optional, for instant slash commands)
  -p, --provider <string>       AI Provider: 'cli', 'antigravity', 'cursor', 'windsurf' (default: cli)
  -w, --workspace <path>        Workspace folder path (default: current directory)
  -u, --allowed-users <ids>     Comma-separated Discord User IDs allowed to execute commands
      --port <number>           CDP port for Antigravity/Cursor/Windsurf (default: 9000)
      --table-style <style>     Table formatting: image, cards, rounded, boxed, ascii (default: image)
  -h, --help                    Show this help menu

Examples:
  npx dis-gravity --token="BOT_TOKEN" --channel="123456789" --provider=cli
  npx dis-gravity --provider=antigravity --port=9000
`);
}

// Minimal logger
const log = {
  appendLine: (msg) => {
    const ts = new Date().toISOString().substring(11, 19);
    console.log(`[${ts}] ${msg}`);
  }
};

function executeShellCommand(cmdStr, cwd, timeoutMs = 30000) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    cp.exec(cmdStr, { cwd, timeout: timeoutMs, maxBuffer: 1024 * 1024 * 10 }, (err, stdout, stderr) => {
      const duration = ((Date.now() - startTime) / 1000).toFixed(1);
      resolve({
        code: err ? (err.code || 1) : 0,
        stdout: stdout || "",
        stderr: stderr || "",
        duration,
        error: err ? err.message : null
      });
    });
  });
}

// Find headless browser for table card rendering
function findHeadlessBrowser() {
  if (process.platform === 'win32') {
    const candidates = [
      'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
      'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
    ];
    for (const c of candidates) {
      if (fs.existsSync(c)) return c;
    }
  } else {
    const candidates = ['google-chrome', 'chromium', 'chromium-browser', 'microsoft-edge'];
    for (const c of candidates) {
      try {
        cp.execSync(`which ${c}`, { stdio: 'ignore' });
        return c;
      } catch {}
    }
  }
  return null;
}

function buildTableHtml(headers, rows, alignments) {
  const thHtml = headers.map((h, i) => {
    const align = alignments[i] || 'left';
    return `<th style="padding: 10px 14px; text-align: ${align}; border-bottom: 2px solid #5865F2; color: #fff; font-size: 14px; font-weight: 600;">${escapeHtml(h)}</th>`;
  }).join('');

  const trHtml = rows.map((row, rIdx) => {
    const bg = rIdx % 2 === 0 ? '#2b2d31' : '#313338';
    const tdHtml = row.map((cell, cIdx) => {
      const align = alignments[cIdx] || 'left';
      return `<td style="padding: 9px 14px; text-align: ${align}; border-bottom: 1px solid #3f4147; color: #dbdee1; font-size: 13px;">${escapeHtml(cell)}</td>`;
    }).join('');
    return `<tr style="background: ${bg};">${tdHtml}</tr>`;
  }).join('');

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
  body { margin: 0; padding: 16px; background: #1e1f22; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; display: inline-block; }
  .table-card { border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.4); border: 1px solid #383a40; background: #2b2d31; display: inline-block; }
  table { border-collapse: collapse; width: 100%; min-width: 320px; }
  .header-banner { background: linear-gradient(90deg, #5865F2, #4752C4); color: white; padding: 8px 14px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
</style></head><body>
  <div class="table-card">
    <div class="header-banner">📊 Dis-Gravity Data Table</div>
    <table>
      <thead><tr style="background: #232428;">${thHtml}</tr></thead>
      <tbody>${trHtml}</tbody>
    </table>
  </div>
</body></html>`;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

async function renderTableToPng(headers, rows, alignments) {
  const browserPath = findHeadlessBrowser();
  if (!browserPath) return null;

  const tempHtml = path.join(os.tmpdir(), `table_${Date.now()}_${Math.random().toString(36).substring(2)}.html`);
  const tempPng = path.join(os.tmpdir(), `table_${Date.now()}_${Math.random().toString(36).substring(2)}.png`);

  try {
    const html = buildTableHtml(headers, rows, alignments);
    fs.writeFileSync(tempHtml, html, 'utf8');

    const colCount = headers.length || 3;
    const rowCount = rows.length || 3;
    const width = Math.min(1200, Math.max(450, colCount * 180));
    const height = Math.min(1000, Math.max(200, (rowCount + 2) * 45 + 80));

    const cmd = `"${browserPath}" --headless --disable-gpu --hide-scrollbars --screenshot="${tempPng}" --window-size=${width},${height} "file:///${tempHtml.replace(/\\/g, '/')}"`;
    cp.execSync(cmd, { timeout: 6000, stdio: 'ignore' });

    if (fs.existsSync(tempPng)) {
      const buf = fs.readFileSync(tempPng);
      try { fs.unlinkSync(tempHtml); } catch {}
      try { fs.unlinkSync(tempPng); } catch {}
      return buf;
    }
  } catch {
  } finally {
    try { if (fs.existsSync(tempHtml)) fs.unlinkSync(tempHtml); } catch {}
    try { if (fs.existsSync(tempPng)) fs.unlinkSync(tempPng); } catch {}
  }
  return null;
}

// Main Daemon Application
async function startDaemon() {
  const config = parseArgs();

  let Client, GatewayIntentBits, Partials;
  try {
    const djs = require('discord.js');
    Client = djs.Client;
    GatewayIntentBits = djs.GatewayIntentBits;
    Partials = djs.Partials;
  } catch (err) {
    console.error('❌ Error: discord.js is required to run the standalone daemon.');
    console.error('   Please install it with: npm install discord.js');
    process.exit(1);
  }

  console.log(`
╔════════════════════════════════════════════════════════════════════════╗
║               Dis-Gravity Standalone CLI Daemon                        ║
╚════════════════════════════════════════════════════════════════════════╝
`);

  if (!config.token) {
    console.error('❌ Error: Discord Bot Token is required (--token or DISCORD_BOT_TOKEN).');
    process.exit(1);
  }

  if (!config.channelId) {
    console.error('❌ Error: Discord Channel ID is required (--channel or DISCORD_CHANNEL_ID).');
    process.exit(1);
  }

  log.appendLine(`Initializing Daemon with workspace: ${config.workspace}`);
  log.appendLine(`Provider: ${config.provider.toUpperCase()} | Channel ID: ${config.channelId}`);
  if (config.allowedUsers.length > 0) {
    log.appendLine(`Security Whitelist: ${config.allowedUsers.length} user(s) allowed`);
  } else {
    log.appendLine(`Security: Channel-wide open access (no whitelist specified)`);
  }

  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.DirectMessages
    ],
    partials: [Partials.Channel, Partials.Message]
  });

  function isUserAllowed(userId) {
    if (!config.allowedUsers || config.allowedUsers.length === 0) return true;
    return config.allowedUsers.includes(userId);
  }

  // Active CLI agent supervisor
  let activeProcess = null;
  let activeStepStatus = null;
  let pendingApproval = null;
  let approvalResolver = null;

  async function cancelActiveAgent() {
    if (activeProcess) {
      try { activeProcess.kill('SIGINT'); } catch {}
      activeProcess = null;
    }
    activeStepStatus = null;
    if (approvalResolver) {
      approvalResolver('cancel');
      approvalResolver = null;
      pendingApproval = null;
    }
  }

  async function executeCliAgent(promptText, onStepUpdate) {
    const isWindows = process.platform === 'win32';
    const checkCmd = isWindows ? 'where.exe' : 'which';
    
    let engine = 'shell';
    const check = (bin) => {
      try { cp.execSync(`${checkCmd} ${bin}`, { stdio: 'ignore' }); return true; } catch { return false; }
    };

    if (check('agy')) engine = 'agy';
    else if (check('claude')) engine = 'claude';
    else if (check('aider')) engine = 'aider';

    let binary = '';
    let args = [];

    if (engine === 'agy') {
      binary = 'agy';
      args = [promptText];
    } else if (engine === 'claude') {
      binary = 'claude';
      args = ['-p', promptText];
    } else if (engine === 'aider') {
      binary = 'aider';
      args = ['--message', promptText, '--yes-always'];
    } else {
      binary = isWindows ? 'powershell.exe' : '/bin/bash';
      args = isWindows ? ['-NoProfile', '-Command', promptText] : ['-c', promptText];
    }

    log.appendLine(`[Agent] Spawning ${binary} (${engine.toUpperCase()}) in ${config.workspace}...`);
    activeStepStatus = `Running ${engine.toUpperCase()} agent...`;
    onStepUpdate?.(activeStepStatus);

    return new Promise((resolve) => {
      let stdout = '';
      let stderr = '';
      const startTime = Date.now();

      try {
        const proc = cp.spawn(binary, args, {
          cwd: config.workspace,
          env: { ...process.env, CI: '1', TERM: 'dumb' }
        });
        activeProcess = proc;

        const stripAnsi = (s) => s.replace(/\x1b\[[0-9;]*[a-zA-Z]/g, '');

        proc.stdout.on('data', (chunk) => {
          const text = stripAnsi(chunk.toString());
          stdout += text;
          const lastLine = text.trim().split('\n').pop() || '';
          if (lastLine) {
            activeStepStatus = lastLine.substring(0, 80);
            onStepUpdate?.(activeStepStatus);
          }

          if (/(?:\(|\[)\s*[yY]\s*[\/|]\s*[nN]\s*(?:\)|\])|(?:proceed|allow|continue|confirm|choice|run this)\b.*\?|\?\s+\[[yY]\/[nN]\]/i.test(lastLine)) {
            pendingApproval = {
              question: lastLine,
              options: [
                { id: 'yes', text: '🟢 Proceed / Allow (y)' },
                { id: 'no', text: '🔴 Deny / Cancel (n)' }
              ]
            };
            approvalResolver = (ans) => {
              const isYes = /^(yes|proceed|allow|y)/i.test(ans || '');
              try { proc.stdin.write(isYes ? 'y\n' : 'n\n'); } catch {}
            };
          }
        });

        proc.stderr.on('data', (chunk) => {
          stderr += stripAnsi(chunk.toString());
        });

        proc.on('close', (code) => {
          activeProcess = null;
          activeStepStatus = null;
          pendingApproval = null;
          approvalResolver = null;
          const dur = ((Date.now() - startTime) / 1000).toFixed(1);
          const badge = code === 0 ? `✅ **Process completed in ${dur}s (exit 0)**` : `⚠️ **Process exited with code ${code} (${dur}s)**`;
          const output = (stdout.trim() || stderr.trim()) || '(No output recorded)';
          resolve(`${badge}\n\n\`\`\`text\n${output.substring(0, 1800)}\n\`\`\``);
        });

        proc.on('error', (err) => {
          activeProcess = null;
          activeStepStatus = null;
          resolve(`❌ **Failed to spawn CLI process (${binary}):** ${err.message}`);
        });
      } catch (err) {
        activeProcess = null;
        activeStepStatus = null;
        resolve(`❌ **Execution error:** ${err.message}`);
      }
    });
  }

  client.once('ready', async () => {
    log.appendLine(`🚀 Dis-Gravity Daemon logged in as ${client.user.tag}`);
    const channel = await client.channels.fetch(config.channelId).catch(() => null);
    if (!channel) {
      log.appendLine(`⚠️ Warning: Could not find channel with ID ${config.channelId}`);
    } else {
      log.appendLine(`Connected to Discord Channel: #${channel.name || config.channelId}`);
    }

    // Register slash commands
    try {
      const slashCommands = [
        { name: "sh", description: "Execute shell command in workspace", options: [{ name: "command", description: "Command to execute", type: 3, required: true }] },
        { name: "diff", description: "View git diff summary and preview" },
        { name: "info", description: "View host hardware and workspace health dashboard" },
        { name: "tree", description: "View workspace directory tree" },
        { name: "stop", description: "Cancel running agent or command" },
        { name: "status", description: "View daemon status and provider connection" },
        { name: "help", description: "Display Dis-Gravity commands" }
      ];

      if (config.guildId) {
        const guild = await client.guilds.fetch(config.guildId).catch(() => null);
        if (guild) {
          await guild.commands.set(slashCommands);
          log.appendLine(`Registered ${slashCommands.length} guild slash commands in ${guild.name}`);
        }
      } else {
        await client.application.commands.set(slashCommands);
        log.appendLine(`Registered ${slashCommands.length} global slash commands`);
      }
    } catch (err) {
      log.appendLine(`Notice: Could not register slash commands (${err.message}). Prefix commands (!sh, !diff, etc.) are fully active.`);
    }
  });

  // Handle Slash Commands and Buttons
  client.on('interactionCreate', async (interaction) => {
    try {
      if (!isUserAllowed(interaction.user.id)) {
        if (!interaction.replied && !interaction.deferred) {
          await interaction.reply({ content: `⛔ **Unauthorized:** Your Discord User ID (\`${interaction.user.id}\`) is not on the whitelist.`, ephemeral: true });
        }
        return;
      }

      if (interaction.isButton()) {
        const id = interaction.customId;
        if (id.startsWith('approve_') && approvalResolver) {
          const choice = id.replace('approve_', '');
          approvalResolver(choice);
          approvalResolver = null;
          pendingApproval = null;
          await interaction.reply({ content: `✅ **Action approved:** \`${choice}\``, ephemeral: true }).catch(() => {});
          return;
        }
        if (id === 'agent_cancel') {
          await cancelActiveAgent();
          await interaction.reply({ content: "🛑 **Execution halted.**", ephemeral: true }).catch(() => {});
          return;
        }
      }

      if (interaction.isChatInputCommand()) {
        const cmd = interaction.commandName;
        if (cmd === 'sh') {
          const commandStr = interaction.options.getString('command');
          await interaction.deferReply();
          const res = await executeShellCommand(commandStr, config.workspace);
          const badge = res.code === 0 ? `✅ **Exit 0 (${res.duration}s)**` : `❌ **Exit ${res.code} (${res.duration}s)**`;
          const out = res.stdout || res.stderr || '(No output)';
          await interaction.editReply(`${badge}\n\`\`\`text\n${out.substring(0, 1800)}\n\`\`\``);
          return;
        }

        if (cmd === 'diff') {
          await interaction.deferReply();
          const st = await executeShellCommand('git status --short', config.workspace);
          const df = await executeShellCommand('git diff --stat', config.workspace);
          let reply = `🌿 **Git Status & Diff Preview**\n\n`;
          reply += `\`\`\`diff\n${st.stdout || 'Clean working tree'}\n\`\`\`\n`;
          if (df.stdout) reply += `**Diff Stat:**\n\`\`\`text\n${df.stdout}\n\`\`\``;
          await interaction.editReply(reply);
          return;
        }

        if (cmd === 'info') {
          await interaction.deferReply();
          const cpus = os.cpus();
          const cpuModel = cpus && cpus[0] ? cpus[0].model.trim() : 'CPU';
          const freeGB = (os.freemem() / (1024 ** 3)).toFixed(1);
          const totalGB = (os.totalmem() / (1024 ** 3)).toFixed(1);
          const st = await executeShellCommand('git rev-parse --abbrev-ref HEAD', config.workspace);
          let msg = `🖥️ **Dis-Gravity Host & Workspace Health Dashboard**\n\n`;
          msg += `• **Project:** \`${path.basename(config.workspace)}\`\n`;
          msg += `• **Path:** \`${config.workspace}\`\n`;
          msg += `• **Git Branch:** \`${st.stdout.trim() || 'unknown'}\`\n`;
          msg += `• **Provider:** 🟢 **Standalone Daemon (${config.provider.toUpperCase()})**\n`;
          msg += `• **System:** ${os.platform()} (${os.release()}, ${os.arch()})\n`;
          msg += `• **CPU:** ${cpuModel} (${cpus ? cpus.length : 1} cores)\n`;
          msg += `• **Memory:** ${freeGB} GB free / ${totalGB} GB total\n`;
          msg += `• **Node Runtime:** ${process.version} (PID: ${process.pid})\n`;
          await interaction.editReply(msg);
          return;
        }

        if (cmd === 'stop') {
          await cancelActiveAgent();
          await interaction.reply('🛑 **Agent generation / command cancelled.**');
          return;
        }

        if (cmd === 'help') {
          let h = `🤖 **Dis-Gravity Standalone Daemon Commands**\n\n`;
          h += `• \`/sh <cmd>\` or \`!sh <cmd>\` — Run terminal command\n`;
          h += `• \`/diff\` or \`!diff\` — View git status and diff preview\n`;
          h += `• \`/info\` or \`!info\` — System hardware and workspace dashboard\n`;
          h += `• \`/stop\` or \`!stop\` — Cancel running process\n`;
          await interaction.reply(h);
          return;
        }
      }
    } catch (err) {
      log.appendLine(`Interaction error: ${err.message}`);
    }
  });

  // Handle Chat Messages
  client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (message.channelId !== config.channelId && !message.channel.isDMBased()) return;

    if (!isUserAllowed(message.author.id)) {
      await message.reply(`⛔ **Unauthorized:** Your Discord User ID (\`${message.author.id}\`) is not in the Dis-Gravity whitelist.`).catch(() => {});
      return;
    }

    const text = message.content.trim();

    // Shell command prefix
    if (text.startsWith('!sh ') || text.startsWith('$ ')) {
      const cmdStr = text.replace(/^(!sh |\$ )/, '');
      const statusMsg = await message.reply(`⚡ Running: \`${cmdStr}\`...`);
      const res = await executeShellCommand(cmdStr, config.workspace);
      const badge = res.code === 0 ? `✅ **Exit 0 (${res.duration}s)**` : `❌ **Exit ${res.code} (${res.duration}s)**`;
      const out = res.stdout || res.stderr || '(No output)';
      await statusMsg.edit(`${badge}\n\`\`\`text\n${out.substring(0, 1800)}\n\`\`\``);
      return;
    }

    // Git Diff
    if (text === '!diff' || text === '/diff') {
      const st = await executeShellCommand('git status --short', config.workspace);
      const df = await executeShellCommand('git diff --stat', config.workspace);
      let reply = `🌿 **Git Status & Diff Preview**\n\n\`\`\`diff\n${st.stdout || 'Clean working tree'}\n\`\`\`\n`;
      if (df.stdout) reply += `**Diff Stat:**\n\`\`\`text\n${df.stdout}\n\`\`\``;
      await message.reply(reply);
      return;
    }

    // Info
    if (text === '!info' || text === '/info') {
      const cpus = os.cpus();
      const cpuModel = cpus && cpus[0] ? cpus[0].model.trim() : 'CPU';
      const freeGB = (os.freemem() / (1024 ** 3)).toFixed(1);
      const totalGB = (os.totalmem() / (1024 ** 3)).toFixed(1);
      const st = await executeShellCommand('git rev-parse --abbrev-ref HEAD', config.workspace);
      let msg = `🖥️ **Dis-Gravity Host & Workspace Health Dashboard**\n\n`;
      msg += `• **Project:** \`${path.basename(config.workspace)}\`\n`;
      msg += `• **Path:** \`${config.workspace}\`\n`;
      msg += `• **Git Branch:** \`${st.stdout.trim() || 'unknown'}\`\n`;
      msg += `• **Provider:** 🟢 **Standalone Daemon (${config.provider.toUpperCase()})**\n`;
      msg += `• **System:** ${os.platform()} (${os.release()}, ${os.arch()})\n`;
      msg += `• **CPU:** ${cpuModel} (${cpus ? cpus.length : 1} cores)\n`;
      msg += `• **Memory:** ${freeGB} GB free / ${totalGB} GB total\n`;
      await message.reply(msg);
      return;
    }

    // Stop
    if (text === '!stop' || text === '/stop') {
      await cancelActiveAgent();
      await message.reply('🛑 **Agent generation / command cancelled.**');
      return;
    }

    // Forward general prompt to AI Agent
    const statusMsg = await message.reply('⏳ **Analyzing prompt... (0s)**');
    let elapsed = 0;
    const timer = setInterval(async () => {
      elapsed += 2;
      const statusText = activeStepStatus ? `⏳ **Working (${elapsed}s):** \`${activeStepStatus}\`` : `⏳ **Analyzing... (${elapsed}s)**`;
      await statusMsg.edit(statusText).catch(() => {});
    }, 2000);

    try {
      const res = await executeCliAgent(text, (step) => {
        statusMsg.edit(`⏳ **Working (${elapsed}s):** \`${step}\``).catch(() => {});
      });

      clearInterval(timer);
      await statusMsg.edit(res);
    } catch (err) {
      clearInterval(timer);
      await statusMsg.edit(`❌ **Error:** ${err.message}`);
    }
  });

  await client.login(config.token);
}

if (require.main === module) {
  startDaemon().catch((err) => {
    console.error('Fatal Daemon Error:', err);
    process.exit(1);
  });
}

module.exports = { startDaemon };
