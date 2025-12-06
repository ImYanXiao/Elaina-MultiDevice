import { format } from 'util'

let debugMode = false

let winScore = 10000
let playScore = 100

export async function before(m) {
    let ok
    let isWin = false
    let isTie = false
    let isSurrender = false
    this.game = this.game ? this.game : {}
    let room = Object.values(this.game).find(room => room.id && room.game && room.state && room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender) && room.state == 'PLAYING')
    if (room) {
        if (!/^([1-9]|(me)?nyerah|surr?ender)$/i.test(m.text))
            return false
        isSurrender = !/^[1-9]$/.test(m.text)
        if (m.sender !== room.game.currentTurn) {
            if (!isSurrender)
                return false
        }
        if (debugMode)
            m.reply('[DEBUG]\n' + require('util').format({
                isSurrender,
                text: m.text
            }))
        if (!isSurrender && 1 > (ok = room.game.turn(m.sender === room.game.playerO, parseInt(m.text) - 1))) {
            m.reply({
                '-3': 'Game telah berakhir',
                '-2': 'Invalid',
                '-1': 'Posisi Invalid',
                0: 'Posisi Invalid',
            }[ok])
            return false
        }
        if (m.sender === room.game.winner)
            isWin = true
        else if (room.game.board === 511)
            isTie = true
        let arr = room.game.render().map(v => {
            return {
                X: '❌',
                O: '⭕',
                1: '1️⃣',
                2: '2️⃣',
                3: '3️⃣',
                4: '4️⃣',
                5: '5️⃣',
                6: '6️⃣',
                7: '7️⃣',
                8: '8️⃣',
                9: '9️⃣',
            }[v]
        })
        if (isSurrender) {
            room.game._currentTurn = m.sender === room.game.playerX
            isWin = true
        }
        let winner = isSurrender ? room.game.currentTurn : room.game.winner
        let str = `
${arr.slice(0, 3).join('')}
${arr.slice(3, 6).join('')}
${arr.slice(6).join('')}
${isWin ? `@${winner.split('@')[0]} Menang! (+${winScore} XP)` : isTie ? `Game berakhir (+${playScore} XP)` : `Giliran ${['❌', '⭕'][1 * room.game._currentTurn]} (@${room.game.currentTurn.split('@')[0]})`}
❌: @${room.game.playerX.split('@')[0]}
⭕: @${room.game.playerO.split('@')[0]}
Ketik *nyerah* untuk nyerah
Room ID: ${room.id}
`.trim()
        let users = global.db.data.users
        if ((room.game._currentTurn ^ isSurrender ? room.x : room.o) !== m.chat)
            room[room.game._currentTurn ^ isSurrender ? 'x' : 'o'] = m.chat
        const btn = isTie ? ['TicTacToe', '/ttt'] : ['Nyerah', 'nyerah']
        if (room.x !== room.o)
            await this.reply(room.x, str, m);
        await this.reply(room.o, str, m);
        if (isTie || isWin) {
            users[room.game.playerX].exp += playScore
            users[room.game.playerO].exp += playScore
            if (isWin)
                users[winner].exp += winScore - playScore
            if (debugMode)
                m.reply('[DEBUG]\n' + format(room))
            delete this.game[room.id]
        }
    }
    return true;
}
