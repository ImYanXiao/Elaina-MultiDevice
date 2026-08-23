import { Chess } from 'chess.js'

const handler = async (m, { conn, args }) => {
    const key = m.chat
    conn.chess = conn.chess || {}
    let chessData = conn.chess[key] || {
        gameData: null,
        fen: null,
        currentTurn: null,
        players: [],
        hasJoined: []
    }
    conn.chess[key] = chessData
    const { gameData, fen, currentTurn, players, hasJoined } = chessData
    const feature = args[0]?.toLowerCase()

    if (feature === 'delete') {
        delete conn.chess[key]
        return conn.reply(m.chat, '🏳️ *Permainan catur dihentikan.*', m)
    }

    if (feature === 'create') {
        if (gameData) {
            return conn.reply(m.chat, '⚠️ *Permainan sudah dimulai.*', m)
        }
        chessData.gameData = {
            status: 'waiting',
            black: null,
            white: null
        }
        return conn.reply(m.chat, '🎮 *Permainan catur dimulai.*\nMenunggu pemain lain untuk bergabung.', m)
    }

    if (feature === 'join') {
        const senderId = m.sender
        if (players.includes(senderId)) {
            return conn.reply(m.chat, '🙅‍♂️ *Anda sudah bergabung dalam permainan ini.*', m)
        }
        if (!gameData || gameData.status !== 'waiting') {
            return conn.reply(m.chat, '⚠️ *Tidak ada permainan catur yang sedang menunggu.*', m)
        }
        if (players.length >= 2) {
            return conn.reply(m.chat, '👥 *Pemain sudah mencukupi.*\nPermainan otomatis dimulai.', m)
        }
        players.push(senderId)
        hasJoined.push(senderId)
        if (players.length === 2) {
            gameData.status = 'ready'
            const [black,
                white] = Math.random() < 0.5 ? [players[1],
                players[0]]: [players[0],
                players[1]]
            gameData.black = black
            gameData.white = white
            chessData.currentTurn = white
            return conn.reply(m.chat, `🙌 *Pemain yang telah bergabung:*\n${hasJoined.map(playerId => `- @${playerId.split('@')[0]}`).join('\n')}\n\n*Hitam:* @${black.split('@')[0]}\n*Putih:* @${white.split('@')[0]}\n\nSilakan gunakan *'chess start'* untuk memulai permainan.`, m, {
                mentions: hasJoined
            })
        } else {
            return conn.reply(m.chat, '🙋‍♂️ *Anda telah bergabung dalam permainan catur.*\nMenunggu pemain lain untuk bergabung.', m)
        }
    }

    if (feature === 'start') {
        if (gameData.status !== 'ready') {
            return conn.reply(m.chat, '⚠️ *Tidak dapat memulai permainan. Tunggu hingga dua pemain bergabung.*', m)
        }
        gameData.status = 'playing'
        const senderId = m.sender
        if (players.length === 2) {
            const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
            chessData.fen = fen
            const encodedFen = encodeURIComponent(fen)
            const giliran = `🎲 *Giliran:* Putih @${gameData.white.split('@')[0]}`
            const flipParam = senderId === gameData.black ? '': '&flip=true'
            const flipParam2 = senderId === gameData.black ? '': '-flip'
            const boardUrl = `https://www.chess.com/dynboard?fen=${encodedFen}&board=graffiti&piece=graffiti&size=3&coordinates=inside${flipParam}`
            try {
                await conn.sendFile(m.chat, boardUrl, '', giliran, m, false, {
                    mentions: [gameData.white]
                })
            } catch (error) {
                const boardUrl2 = `https://chessboardimage.com/${encodedFen + flipParam2}.png`
                await conn.sendFile(m.chat, boardUrl2, '', giliran, m, false, {
                    mentions: [gameData.black]
                })
            }
            return
        } else {
            return conn.reply(m.chat, '🙋‍♂️ *Anda telah bergabung dalam permainan catur.*\nMenunggu pemain lain untuk bergabung.', m)
        }
    }

    if (args[0] && args[1]) {
        const senderId = m.sender
        if (!gameData || gameData.status !== 'playing') {
            return conn.reply(m.chat, '⚠️ *Permainan belum dimulai.*', m)
        }
        if (currentTurn !== senderId) {
            return conn.reply(m.chat, `⏳ *Sekarang giliran ${chessData.currentTurn === gameData.white ? 'Putih': 'Hitam'} untuk bergerak.*`, m, {
                contextInfo: {
                    mentionedJid: [currentTurn]
                }
            })
        }
        const chess = new Chess(fen)
        if (chess.isCheckmate()) {
            delete conn.chess[key]
            return conn.reply(m.chat, `⚠️ *Game Checkmate.*\n🏳️ *Permainan catur dihentikan.*\n*Pemenang:* @${m.sender.split('@')[0]}`, m, {
                contextInfo: {
                    mentionedJid: [m.sender]
                }
            })
        }
        if (chess.isDraw()) {
            delete conn.chess[key]
            return conn.reply(m.chat, `⚠️ *Game Draw.*\n🏳️ *Permainan catur dihentikan.*\n*Pemain:* ${hasJoined.map(playerId => `- @${playerId.split('@')[0]}`).join('\n')}`, m, {
                contextInfo: {
                    mentionedJid: hasJoined
                }
            })
        }
        const [from, to] = args
        try {
            chess.move({ from, to, promotion: 'q' })
        } catch (e) {
            return conn.reply(m.chat, '❌ *Langkah tidak valid.*', m)
        }
        chessData.fen = chess.fen()
        const currentTurnIndex = players.indexOf(currentTurn)
        const nextTurnIndex = (currentTurnIndex + 1) % 2
        chessData.currentTurn = players[nextTurnIndex]
        const encodedFen = encodeURIComponent(chess.fen())
        const currentColor = chessData.currentTurn === gameData.white ? 'Putih': 'Hitam'
        const giliran = `🎲 *Giliran:* ${currentColor} @${chessData.currentTurn.split('@')[0]}\n\n${chess.getComment() || ''}`
        const flipParam = senderId === gameData.black ? '': '&flip=true'
        const flipParam2 = senderId === gameData.black ? '': '-flip'
        const boardUrl = `https://www.chess.com/dynboard?fen=${encodedFen}&board=graffiti&piece=graffiti&size=3&coordinates=inside${flipParam}`
        try {
            await conn.sendFile(m.chat, boardUrl, '', giliran, m, false, {
                mentions: [chessData.currentTurn]
            })
        } catch (error) {
            const boardUrl2 = `https://chessboardimage.com/${encodedFen + flipParam2}.png`
            await conn.sendFile(m.chat, boardUrl2, '', giliran, m, false, {
                mentions: [chessData.currentTurn]
            })
        }
        chess.deleteComment()
        return
    }

    if (feature === 'help') {
        return conn.reply(m.chat, `
🌟 *Perintah Permainan Catur:*

*chess create* - Mulai permainan catur
*chess join* - Bergabung dalam permainan catur yang sedang menunggu
*chess start* - Memulai permainan catur jika ada dua pemain yang sudah bergabung
*chess delete* - Menghentikan permainan catur
*chess [dari] [ke]* - Melakukan langkah dalam permainan catur

*Contoh:*
Ketik *chess create* untuk memulai permainan catur.
Ketik *chess join* untuk bergabung dalam permainan catur yang sedang menunggu.
`, m)
    }
    return conn.reply(m.chat, '❓ Perintah tidak valid. Gunakan *"chess help"* untuk melihat bantuan.', m)
}

handler.help = ['chess']
handler.tags = ['game']
handler.command = /^(chess|catur)$/i
handler.game = true
export default handler