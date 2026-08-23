import Jimp from 'jimp';
import axios from 'axios';
import GameSession from "../../lib/ulartangga.js"

let handler = async (m, { args, conn, usedPrefix, command }) => {
    conn.ulartangga = conn.ulartangga || {};
    const sessions = (conn.ulartangga_ = conn.ulartangga_ || {});
    const sessionId = m.chat;
    const session = sessions[sessionId] || (sessions[sessionId] = new GameSession(sessionId, conn));
    const game = session.game;
    const { state } = conn.ulartangga[m.chat] || { state: false };

    switch (args[0]) {
        case 'join':
            if (state) return m.reply('🛑 *Permainan sudah dimulai.*\nTidak dapat bergabung.');
            const playerName = m.sender;
            const joinSuccess = game.addPlayer(playerName);
            joinSuccess ? m.reply(`👋 ${game.formatPlayerName(playerName)} *bergabung ke dalam permainan.*`, null, { mentions: [playerName] }) : m.reply('*Anda sudah bergabung atau permainan sudah penuh.*\nTidak dapat bergabung.');
            break;

        case 'start':
            if (state) return m.reply('🛑 *Permainan sudah dimulai.*\nTidak dapat memulai ulang.');
            conn.ulartangga[m.chat] = {
                ...conn.ulartangga[m.chat],
                state: true
            };
            if (game.players.length === 2) {
                await game.startGame(m, game.players[0], game.players[1]);
                return;
            } else {
                await m.reply('👥 *Tidak cukup pemain untuk memulai permainan.*\nDiperlukan minimal 2 pemain.');
                return;
            }
            break;

        case 'roll':
            if (!state) return m.reply(`🛑 *Permainan belum dimulai.*\nKetik *${usedPrefix + command} start* untuk memulai.`);
            if (game.isGameStarted()) {
                const currentPlayer = game.players[game.currentPlayerIndex];
                if (m.sender !== currentPlayer) {
                    await m.reply(`🕒 *Bukan giliranmu.* \n\nSekarang giliran ${game.formatPlayerName(currentPlayer)}`, null, { mentions: [currentPlayer] });
                    return;
                } else {
                    await game.playTurn(m, currentPlayer);
                    return;
                }
            } else {
                await m.reply(`🛑 *Permainan belum dimulai.*\nKetik *${usedPrefix + command} start* untuk memulai.`);
                return;
            }
            break;

        case 'reset':
            conn.ulartangga[m.chat] = {
                ...conn.ulartangga[m.chat],
                state: false
            };
            session.game.resetSession();
            delete sessions[sessionId];
            await m.reply('🔄 *Sesi permainan direset.*');
            break;

        case 'help':
            await m.reply(`🎲🐍 *Permainan Ular Tangga* 🐍🎲\n\n*Commands:*\n- *${usedPrefix + command} join :* Bergabung ke dalam permainan.\n- *${usedPrefix + command} start :* Memulai permainan.\n- *${usedPrefix + command} roll :* Melempar dadu untuk bergerak.\n- *${usedPrefix + command} reset :* Mereset sesi permainan.`);
            break;

        default:
            m.reply(`❓ *Perintah tidak valid.*\nGunakan *${usedPrefix + command} help* untuk melihat daftar perintah.`);
    }
};

handler.help = ['ulartangga'];
handler.tags = ['game'];
handler.command = /^(ular(tangga)?|ladders|snak(e)?)$/i;
handler.game = true
export default handler;