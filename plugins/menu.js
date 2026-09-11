const fs = require('fs');
const path = require('path');
const MENU_SOUND_PATH = path.join(__dirname, '../assets/Tiktok_1789531902965.mp3');
const MENU_VIDEO_PATH = path.join(__dirname, '../assets/35843.mp4');
/*****************************************************************************
 *                                                                           *
 *                     Developed By JUNAID↣³⁰²                     *
 *                     & JUNAID↣³⁰²                                        *
 *                                                                           *
 *  🌐  GitHub   : https://github.com/AbdulRehman19721986/redxbot302          *
 *  ▶️  YouTube  : https://youtube.com/@HAMZA-302-bot                         *
 *  💬  WhatsApp : https://whatsapp.com/channel/0029Vb7dmVQ6rsQt3kJY131f     *
 *  🔗  Telegram : https://t.me/Hamza302bot                              *
 *                                                                           *
 *    © 2026 JUNAID↣³⁰². All rights reserved.                      *
 *                                                                           *
 *  ✅ NEW: 5 professional menu styles (.menustyle 1-5) + animated render    *
 *  ✅ SPEED: menu image cached in memory (no re-download per .menu)         *
 *****************************************************************************/

const settings = require('../settings');
const commandHandler = require('../lib/commandHandler');
const store = require('../lib/lightweight_store');
const { sendInteractiveMessage } = require('gifted-btns');

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// ───────────────────────── 5 MENU STYLES ─────────────────────────
const STYLES = {
    1: {
        name: 'JUNAID↣³⁰²',
        emoji: '⚔️',
        header: (i) =>
            `╭┈┄───【 *${i.botName}* 】───┄┈╮\n` +
            `├■ 🤖 *Owner:* ${i.owner}\n` +
            `├■ 📜 *Commands:* ${i.total}\n` +
            `├■ ⏱️ *Runtime:* ${i.uptime}\n` +
            `├■ ☁️ *Platform:* ${i.platform}\n` +
            `├■ 📦 *Prefix:* ${i.prefix}\n` +
            `├■ ⚙️ *Mode:* ${i.mode}\n` +
            `├■ 🖼️ *Version:* ${i.version}\n` +
            `╰───────────────┄┈╯\n\n`,
        catOpen: (c) => `『 *${c}* 』\n╭───────────────┄┈╮\n`,
        cmd: (c) => `┋ ➜ *${c}*\n`,
        catClose: () => `╰───────────────┄┈╯\n\n`,
        footer: `> 🔗 *Group Join* *JUNAID↣³⁰² *`,
    },
    2: {
        name: 'JUNAID↣³⁰²',
        emoji: '🔮',
        header: (i) =>
            `▄▀▄▀▄ *${i.botName}* ▄▀▄▀▄\n\n` +
            `┏━━⟪ ⚡ *SYSTEM* ⟫━━┓\n` +
            `┃ 👑 Owner   : ${i.owner}\n` +
            `┃ 🧩 Commands: ${i.total}\n` +
            `┃ ⏳ Uptime  : ${i.uptime}\n` +
            `┃ 🌐 Platform: ${i.platform}\n` +
            `┃ 🔑 Prefix  : ${i.prefix}\n` +
            `┃ 🛰️ Mode    : ${i.mode}\n` +
            `┃ 💠 Version : ${i.version}\n` +
            `┗━━━━━━━━━━━━━━┛\n\n`,
        catOpen: (c) => `◢◤ *${c}* ◥◣\n┏━━━━━━━━━━━┓\n`,
        cmd: (c) => `┃ ⟡ ${c}\n`,
        catClose: () => `┗━━━━━━━━━━━┛\n\n`,
        footer: `▄▀▄▀ *🔗 Group Join · JUNAID↣³⁰²* ▀▄▀▄`,
    },
    3: {
        name: 'MINIMAL CLEAN',
        emoji: '🤍',
        header: (i) =>
            `*${i.botName}*\n` +
            `─────────────────\n` +
            `owner    : ${i.owner}\n` +
            `commands : ${i.total}\n` +
            `uptime   : ${i.uptime}\n` +
            `platform : ${i.platform}\n` +
            `prefix   : ${i.prefix}\n` +
            `mode     : ${i.mode}\n` +
            `version  : ${i.version}\n` +
            `─────────────────\n\n`,
        catOpen: (c) => `• *${c.toLowerCase()}*\n`,
        cmd: (c) => `   ${c}\n`,
        catClose: () => `\n`,
        footer: `— 🔗 Group Join · JUNAID↣³⁰²`,
    },
    4: {
        name: 'JUNAID↣³⁰²',
        emoji: '👑',
        header: (i) =>
            `✦•┈๑⋅⋯ ⋯⋅๑┈•✦\n` +
            `   ♛ *${i.botName}* ♛\n` +
            `✦•┈๑⋅⋯ ⋯⋅๑┈•✦\n\n` +
            `╔═══ ❖ *JUNAID↣³⁰²* ❖ ═══╗\n` +
            `║ ♔ Owner    ﾒ ${i.owner}\n` +
            `║ ♜ Commands ﾒ ${i.total}\n` +
            `║ ⌛ Uptime   ﾒ ${i.uptime}\n` +
            `║ 🏰 Platform ﾒ ${i.platform}\n` +
            `║ ✒️ Prefix   ﾒ ${i.prefix}\n` +
            `║ ⚜️ Mode     ﾒ ${i.mode}\n` +
            `║ 💎 Version  ﾒ ${i.version}\n` +
            `╚═══════ ❖ ═══════╝\n\n`,
        catOpen: (c) => `❖─── *${c}* ───❖\n`,
        cmd: (c) => `  ⚜️ ${c}\n`,
        catClose: () => `❖──────────❖\n\n`,
        footer: `♛ *🔗 Group Join · JUNAID↣³⁰²* ♛`,
    },
    5: {
        name: 'MATRIX HACKER',
        emoji: '🟢',
        header: (i) =>
            '```' + `\n[root@redx ~]# ./launch ${String(i.botName).replace(/\s+/g, '_')}\n` +
            `[OK] identity  -> ${i.owner}\n` +
            `[OK] commands  -> ${i.total} loaded\n` +
            `[OK] uptime    -> ${i.uptime}\n` +
            `[OK] platform  -> ${i.platform}\n` +
            `[OK] prefix    -> "${i.prefix}"\n` +
            `[OK] mode      -> ${i.mode}\n` +
            `[OK] version   -> ${i.version}\n` +
            `[OK] status    -> ONLINE\n` + '```\n\n',
        catOpen: (c) => '```# ' + c + '```\n',
        cmd: (c) => `> ${c}\n`,
        catClose: () => `\n`,
        footer: '```[🔗 Group Join · JUNAID↣³⁰²] session secured — 0 errors```',
    },
    6: {
        name: 'FIRE BLAZE',
        emoji: '🔥',
        header: (i) =>
            `🔥🔥🔥 *${i.botName}* 🔥🔥🔥\n\n` +
            `╔═🔥═════════════╗\n` +
            `║ 👑 Owner   » ${i.owner}\n` +
            `║ 🔢 Commands » ${i.total}\n` +
            `║ ⏱️ Uptime   » ${i.uptime}\n` +
            `║ 🌐 Platform » ${i.platform}\n` +
            `║ 📛 Prefix   » ${i.prefix}\n` +
            `║ ⚙️ Mode     » ${i.mode}\n` +
            `║ 🏷️ Version  » ${i.version}\n` +
            `╚═════════════🔥═╝\n\n`,
        catOpen: (c) => `🔥━━❰ *${c}* ❱━━🔥\n`,
        cmd: (c) => `🔸 ${c}\n`,
        catClose: () => `━━━━━━━━━━━━━\n\n`,
        footer: `🔥 *🔗 Group Join · JUNAID↣³⁰²* 🔥`,
    },
    7: {
        name: 'OCEAN WAVE',
        emoji: '🌊',
        header: (i) =>
            `🌊〜〜 *${i.botName}* 〜〜🌊\n\n` +
            `╭┈┈┈┈ 🐚 *INFO* 🐚 ┈┈┈┈╮\n` +
            `┊ 👑 Owner   ~ ${i.owner}\n` +
            `┊ 🔢 Commands ~ ${i.total}\n` +
            `┊ ⏱️ Uptime  ~ ${i.uptime}\n` +
            `┊ 🌐 Platform ~ ${i.platform}\n` +
            `┊ 📛 Prefix  ~ ${i.prefix}\n` +
            `┊ ⚙️ Mode    ~ ${i.mode}\n` +
            `┊ 🏷️ Version ~ ${i.version}\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈╯\n\n`,
        catOpen: (c) => `🌊 *${c}*\n╭┈┈┈┈┈┈┈┈┈┈╮\n`,
        cmd: (c) => `┊ 💧 ${c}\n`,
        catClose: () => `╰┈┈┈┈┈┈┈┈┈┈╯\n\n`,
        footer: `🌊 *🔗 Group Join · JUNAID↣³⁰²* 🌊`,
    },
    8: {
        name: 'GALAXY STAR',
        emoji: '🌌',
        header: (i) =>
            `✦ ⋆ ˚｡⋆ *${i.botName}* ⋆｡˚ ⋆ ✦\n\n` +
            `┌─────『 🌌 *COSMOS* 🌌 』─────┐\n` +
            `│ ⭐ Owner    : ${i.owner}\n` +
            `│ ☄️ Commands : ${i.total}\n` +
            `│ 🌠 Uptime   : ${i.uptime}\n` +
            `│ 🛸 Platform : ${i.platform}\n` +
            `│ 🔭 Prefix   : ${i.prefix}\n` +
            `│ 🪐 Mode     : ${i.mode}\n` +
            `│ 🌟 Version  : ${i.version}\n` +
            `└──────────────────────┘\n\n`,
        catOpen: (c) => `☄️ *${c}* ☄️\n`,
        cmd: (c) => `✧ ${c}\n`,
        catClose: () => `⋆｡˚ ⋆｡˚ ⋆｡˚\n\n`,
        footer: `🌌 *🔗 Group Join · JUNAID↣³⁰²* 🌌`,
    },
};
const STYLE_COUNT = Object.keys(STYLES).length;

async function getStyleNumber() {
    const raw = await store.getSetting('global', 'menuStyle');
    const n = parseInt(raw, 10);
    return (n >= 1 && n <= STYLE_COUNT) ? n : 1;
}

function buildMenuText(styleNo, info) {
    const s = STYLES[styleNo] || STYLES[1];
    let text = s.header(info);
    const categories = Array.from(commandHandler.categories.keys()).sort();
    for (const cat of categories) {
        const cmdList = commandHandler.getCommandsByCategory(cat);
        if (!cmdList.length) continue;
        text += s.catOpen(cat.toUpperCase());
        for (const cmd of cmdList) text += s.cmd(cmd);
        text += s.catClose();
    }
    text += s.footer;
    return text;
}

const menuCommand = {
    command: 'menu',
    aliases: ['help', 'cmd'],
    category: 'main',
    description: 'Show the command menu (8 styles — see .menustyle)',
    usage: '.menu [1-8]',

    async handler(sock, message, args, context) {
        const { chatId, channelInfo } = context;
        try {
            // React only to the original .menu shortcut message (not the generated menu card/video/audio).
            try {
                if (message?.key) {
                    await sock.sendMessage(chatId, { react: { text: '🐍', key: message.key } });
                }
            } catch (reactionError) {
                console.warn('[MENU] Shortcut reaction skipped:', reactionError.message);
            }

            // Optional one-shot style override: .menu 3
            let styleNo = parseInt(args?.[0], 10);
            if (!(styleNo >= 1 && styleNo <= STYLE_COUNT)) styleNo = await getStyleNumber();
            const style = STYLES[styleNo];

            const [prefix, botName, botDesc, botDp, botMode] = await Promise.all([
                store.getSetting('global', 'prefix'),
                store.getSetting('global', 'botName'),
                store.getSetting('global', 'botDesc'),
                store.getSetting('global', 'botDp'),
                store.getBotMode(),
            ]);

            const up = process.uptime();
            const info = {
                botName: botName || settings.botName,
                owner: `${settings.botOwner}${settings.secondOwner ? ' & ' + settings.secondOwner : ''}`,
                total: commandHandler.commands.size,
                uptime: `${Math.floor(up / 3600)}h ${Math.floor((up % 3600) / 60)}m ${Math.floor(up % 60)}s`,
                platform: (settings.platform || 'cloud').toUpperCase(),
                prefix: prefix || settings.prefixes[0],
                mode: botMode,
                version: settings.version,
                desc: botDesc || settings.botDesc,
            };

            let menuText = buildMenuText(styleNo, info);

            // Menu sequence:
            // 1) circular PTV/video-note style video
            // 2) menu text (the old menu picture is removed)
            // 3) voice-note style MP3 audio underneath
            if (fs.existsSync(MENU_VIDEO_PATH)) {
                await sock.sendMessage(chatId, {
                    video: fs.readFileSync(MENU_VIDEO_PATH),
                    mimetype: 'video/mp4',
                    fileName: 'JUNAID-MD-321.mp4',
                    caption: '',
                    gifPlayback: false,
                    ptv: true,
                    isAnimated: false,
                    ...channelInfo,
                }, { quoted: message });
            }

            // Send the full menu as an interactive card with the same
            // WhatsApp-style "View channel" CTA shown in the reference menu.
            // The button is attached directly under the menu instead of using
            // a separate JOIN OUR COMMUNITIES box.
            const channelUrl = await resolveChannelUrl(sock);
            let menuMessage;
            try {
                menuMessage = await sendInteractiveMessage(sock, chatId, {
                    text: menuText,
                    footer: 'JUNAID↣³⁰²',
                    interactiveButtons: [
                        {
                            name: 'cta_url',
                            buttonParamsJson: JSON.stringify({
                                display_text: 'Join Channel',
                                url: channelUrl,
                            }),
                        },
                    ],
                }, { quoted: message });
            } catch (interactiveError) {
                console.warn('[MENU] Interactive channel button unavailable, sending plain menu:', interactiveError.message);
                menuMessage = await sock.sendMessage(chatId, { text: menuText, ...channelInfo }, { quoted: message });
            }

            if (fs.existsSync(MENU_SOUND_PATH)) {
                await sock.sendMessage(chatId, {
                    audio: fs.readFileSync(MENU_SOUND_PATH),
                    mimetype: 'audio/mpeg',
                    fileName: 'Tiktok_1789531902965.mp3',
                    ptt: true,
                    ...channelInfo,
                }, { quoted: message });
            }

        } catch (error) {
            console.error('Error in menu command:', error);
            await sock.sendMessage(chatId, { text: '❌ An error occurred while displaying the menu.', ...channelInfo }, { quoted: message });
        }
    },
};

const menuStyleCommand = {
    command: 'menustyle',
    aliases: ['setmenu', 'menutheme'],
    category: 'main',
    description: 'Choose your menu style (1-8)',
    usage: '.menustyle <1-8>',

    async handler(sock, message, args, context) {
        const { chatId, channelInfo } = context;
        try {
            const n = parseInt(args?.[0], 10);
            if (n >= 1 && n <= STYLE_COUNT) {
                await store.saveSetting('global', 'menuStyle', String(n));
                const s = STYLES[n];
                await sock.sendMessage(chatId, {
                    text: `✅ Menu style set to *${n} — ${s.emoji} ${s.name}*\n\nType *.menu* to see it in action!`,
                    ...channelInfo,
                }, { quoted: message });
                return;
            }
            const current = await getStyleNumber();
            let text = `🎨 *MENU STYLE SELECTOR*\n\nReply with *.menustyle <number>*\n\n`;
            for (const [no, s] of Object.entries(STYLES)) {
                text += `${Number(no) === current ? '▶️' : '▫️'} *${no}.* ${s.emoji} ${s.name}${Number(no) === current ? '  _(current)_' : ''}\n`;
            }
            text += `\n💡 Tip: *.menu 3* previews a style once without saving.`;
            await sock.sendMessage(chatId, { text, ...channelInfo }, { quoted: message });
        } catch (error) {
            console.error('Error in menustyle command:', error);
            await sock.sendMessage(chatId, { text: '❌ Failed to set menu style.', ...channelInfo }, { quoted: message });
        }
    },
};



// ───────────────────────── ALL COMMANDS MENU ─────────────────────────
// .allmenu always prints the complete currently-loaded command list.
const allMenuCommand = {
    command: 'allmenu',
    aliases: ['allcommands', 'allcmds'],
    category: 'main',
    description: 'Show every loaded command grouped by category',
    usage: '.allmenu',

    async handler(sock, message, args, context) {
        const { chatId, channelInfo } = context;
        try {
            const prefix = (await store.getSetting('global', 'prefix')) || settings.prefixes[0] || '.';
            const categories = Array.from(commandHandler.categories.entries())
                .map(([cat, list]) => [cat, Array.from(new Set(list)).sort((a, b) => a.localeCompare(b))])
                .filter(([, list]) => list.length)
                .sort(([a], [b]) => a.localeCompare(b));

            let text = `╭━━━〔 *ALL COMMANDS* 〕━━━╮\n`;
            text += `┃ 📦 *Total:* ${commandHandler.commands.size}\n`;
            text += `┃ 🔑 *Prefix:* ${prefix}\n`;
            text += `╰━━━━━━━━━━━━━━━━━━━━━━╯\n\n`;

            for (const [category, commands] of categories) {
                text += `╭─〔 *${category.toUpperCase()}* 〕\n`;
                for (const command of commands) {
                    text += `│ ➜ ${prefix}${command}\n`;
                }
                text += `╰──────────────\n\n`;
            }
            text += `> *JUNAID-MD_³⁰² — All commands loaded*`;

            // WhatsApp can truncate very long messages. Send in safe chunks so
            // .allmenu really shows every command instead of cutting the list off.
            const maxLen = 3500;
            const chunks = [];
            let current = '';
            for (const line of text.split('\n')) {
                if (current && (current.length + line.length + 1) > maxLen) {
                    chunks.push(current);
                    current = '';
                }
                current += (current ? '\n' : '') + line;
            }
            if (current) chunks.push(current);

            // Keep .allmenu visually consistent with .menu: send the menu video first.
            if (fs.existsSync(MENU_VIDEO_PATH)) {
                await sock.sendMessage(chatId, {
                    video: fs.readFileSync(MENU_VIDEO_PATH),
                    mimetype: 'video/mp4',
                    fileName: 'JUNAID-MD-321.mp4',
                    caption: '',
                    gifPlayback: false,
                    ptv: true,
                    isAnimated: false,
                    ...channelInfo,
                }, { quoted: message });
            }

            // Send all command-list chunks, with the View channel CTA on the last card.
            const channelUrl = await resolveChannelUrl(sock);
            for (let i = 0; i < chunks.length; i++) {
                const chunk = chunks[i];
                if (i === chunks.length - 1) {
                    try {
                        await sendInteractiveMessage(sock, chatId, {
                            text: chunk,
                            footer: 'JUNAID↣³⁰²',
                            interactiveButtons: [{
                                name: 'cta_url',
                                buttonParamsJson: JSON.stringify({
                                    display_text: 'Join Channel',
                                    url: channelUrl,
                                }),
                            }],
                        }, { quoted: message });
                    } catch (interactiveError) {
                        console.warn('[ALLMENU] Channel button unavailable:', interactiveError.message);
                        await sock.sendMessage(chatId, { text: chunk, ...channelInfo }, { quoted: message });
                    }
                } else {
                    await sock.sendMessage(chatId, { text: chunk, ...channelInfo }, { quoted: message });
                }
            }

            // Finish .allmenu with the same voice-note style sound used by .menu.
            if (fs.existsSync(MENU_SOUND_PATH)) {
                await sock.sendMessage(chatId, {
                    audio: fs.readFileSync(MENU_SOUND_PATH),
                    mimetype: 'audio/mpeg',
                    fileName: 'Tiktok_1789531902965.mp3',
                    ptt: true,
                    ...channelInfo,
                }, { quoted: message });
            }
        } catch (error) {
            console.error('Error in allmenu command:', error);
            await sock.sendMessage(chatId, {
                text: '❌ Failed to display all commands.',
                ...channelInfo,
            }, { quoted: message });
        }
    },
};


// Resolve the real WhatsApp Channel invite URL from the supplied newsletter JID.
// A newsletter JID itself is not a public invite URL, so we ask WhatsApp for
// its metadata at runtime instead of inventing a channel link from the JID.
async function resolveChannelUrl(sock) {
    try {
        const jid = settings.newsletterJid || process.env.NEWSLETTER_JID;
        if (jid && /@newsletter$/i.test(jid) && typeof sock.newsletterMetadata === 'function') {
            const meta = await sock.newsletterMetadata('jid', jid);
            if (meta?.invite) return `https://whatsapp.com/channel/${meta.invite}`;
        }
    } catch (e) {
        console.warn('[MENU] Could not resolve channel invite:', e.message);
    }
    return settings.whatsappGroup || null;
}

module.exports = [menuCommand, menuStyleCommand, allMenuCommand];
