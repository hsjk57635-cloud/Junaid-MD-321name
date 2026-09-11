/* .me — rotating 10 user-provided sounds
 * Each .me sends the next bundled sound (1 -> 10 -> 1).
 */
const fs = require('fs');
const path = require('path');

const SOUND_DIR = path.join(__dirname, '..', 'data', 'me_sounds_ogg');
const ME_SOUNDS = Array.from({ length: 10 }, (_, i) => ({
  name: `Sound ${i + 1}`,
  file: path.join(SOUND_DIR, `me-${i + 1}.ogg`),
}));

let nextIndex = 0;

module.exports = {
  command: 'me',
  aliases: ['mesound', 'me-sound'],
  category: 'fun',
  description: 'Play a different custom sound on every .me command',
  usage: '.me',

  async handler(sock, message, args, context = {}) {
    const { chatId, channelInfo } = context;
    try {
      const index = nextIndex % ME_SOUNDS.length;
      nextIndex = (nextIndex + 1) % ME_SOUNDS.length;
      const sound = ME_SOUNDS[index];

      if (!fs.existsSync(sound.file)) {
        throw new Error(`Bundled sound ${index + 1} is missing`);
      }

      const audio = fs.readFileSync(sound.file);
      await sock.sendMessage(chatId, {
        audio,
        mimetype: 'audio/ogg; codecs=opus',
        ptt: true,
        ...channelInfo,
      }, { quoted: message });
    } catch (error) {
      console.error('[ME] Sound error:', error.message);
      await sock.sendMessage(chatId, {
        text: `❌ .me sound failed: ${error.message}`,
        ...channelInfo,
      }, { quoted: message });
    }
  },
};
