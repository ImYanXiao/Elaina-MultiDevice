import Jimp from 'jimp';
import axios from 'axios';

class GameSession {
    constructor(id, sMsg) {
        this.id = id;
        this.players = [];
        this.game = new SnakeAndLadderGame(sMsg);
    }
}

class SnakeAndLadderGame {
    constructor(sMsg) {
        this.sendMsg = sMsg;
        this.players = [];
        this.boardSize = 100;
        this.snakesAndLadders = [{
            start: 29,
            end: 7
        },
            {
                start: 24,
                end: 12
            },
            {
                start: 15,
                end: 37
            },
            {
                start: 23,
                end: 41
            },
            {
                start: 72,
                end: 36
            },
            {
                start: 49,
                end: 86
            },
            {
                start: 90,
                end: 56
            },
            {
                start: 75,
                end: 64
            },
            {
                start: 74,
                end: 95
            },
            {
                start: 91,
                end: 72
            },
            {
                start: 97,
                end: 78
            }];
        this.currentPositions = {};
        this.currentPlayerIndex = 0;
        this.bgImageUrl = 'https://i.pinimg.com/originals/2f/68/a7/2f68a7e1eee18556b055418f7305b3c0.jpg';
        this.playerImageUrls = {
            red: 'https://cdn.icon-icons.com/icons2/2620/PNG/512/among_us_player_red_icon_156942.png',
            green: 'https://cdn.icon-icons.com/icons2/2620/PNG/512/among_us_player_green_icon_156937.png'
        };
        this.bgImage = null;
        this.playerImages = {
            red: null,
            green: null
        };
        this.cellWidth = 40;
        this.cellHeight = 40;
        this.keyId = null;
        this.started = false;
    }

    initializeGame() {
        this.players.forEach(player => (this.currentPositions[player] = 1));
        this.currentPlayerIndex = 0;
        this.started = true;
    }

    rollDice = (num) => Array.from({ length: num }, () => Math.floor(Math.random() * 6) + 1)[Math.floor(Math.random() * num)];

    fetchImage = async (url) => {
        try {
            const response = await axios.get(url, {
                responseType: 'arraybuffer'
            });
            return await Jimp.read(Buffer.from(response.data, 'binary'));
        } catch (error) {
            console.error(`Error fetching image from ${url}:`, error);
            throw error;
        }
    };

    getBoardBuffer = async () => {
        const board = new Jimp(420, 420);
        this.bgImage.resize(420, 420);
        board.composite(this.bgImage, 0, 0);

        for (const player of this.players) {
            const { x, y } = this.calculatePlayerPosition(player);
            board.composite(await this.getPlayerImage(player), x, y);
        }

        return board.getBufferAsync(Jimp.MIME_PNG);
    };

    calculatePlayerPosition = (player) => {
        const playerPosition = this.currentPositions[player];
        const row = 9 - Math.floor((playerPosition - 1) / 10);
        const col = (playerPosition - 1) % 10;
        const x = col * this.cellWidth + 10;
        const y = row * this.cellHeight + 10;
        return { x, y };
    };

    getPlayerImage = async (player) => {
        const color = this.getPlayerColor(player);

        if (!this.playerImages[color]) {
            try {
                const image = await this.fetchImage(this.playerImageUrls[color]);
                this.playerImages[color] = image;
            } catch (error) {
                console.error(`Error fetching image for ${color} player:`, error);
                throw error;
            }
        }

        return this.playerImages[color].clone().resize(this.cellWidth, this.cellHeight);
    };

    getPlayerColor = (player) => (player === this.players[0] ? 'red': 'green');

    startGame = async (m, player1Name, player2Name) => {
        await m.reply(`🐍🎲 *Selamat datang di Permainan Ular Tangga!* 🎲🐍 \n\n${this.formatPlayerName(player1Name)} *vs* ${this.formatPlayerName(player2Name)}`, null, { mentions: [player1Name, player2Name] });

        this.players = [player1Name, player2Name];
        await this.initializeGame();

        if (!this.bgImage) this.bgImage = await this.fetchImage(this.bgImageUrl);

        const { key } = await m.reply(await this.getBoardBuffer());
        this.keyId = key;
    };

    formatPlayerName = (player) => {
        const color = this.getPlayerColor(player);
        return `@${player.split('@')[0]} ( ${color.charAt(0).toUpperCase() + color.slice(1)} )`;
    };

    playTurn = async (m, player) => {
        if (!this.players.length) return m.reply('🛑 *Tidak ada permainan aktif.*\nGunakan "!snake start" untuk memulai permainan baru.');
        if (player !== this.players[this.currentPlayerIndex]) return m.reply(`🕒 *Bukan giliranmu.* \n\nSekarang giliran ${this.formatPlayerName(this.players[this.currentPlayerIndex])}`, null, {
            mentions: [this.players[this.currentPlayerIndex]]
        });

        const diceRoll = this.rollDice(6);
        await m.reply(`🎲 ${this.formatPlayerName(player)} *melempar dadu.*\n\n  - Dadu: *${diceRoll}*\n  - Dari kotak: *${this.currentPositions[player]}*\n  - Ke kotak: *${this.currentPositions[player] + diceRoll}*`, null, { mentions: this.players });

        if (this.players.length === 0) return;

        const currentPosition = this.currentPositions[player];
        let newPosition = currentPosition + diceRoll;

        for (const otherPlayer of this.players) {
            if (otherPlayer !== player && this.currentPositions[otherPlayer] === newPosition) {
                const message = `😱 *Oh tidak!* ${this.formatPlayerName(player)} *menginjak posisi* ${this.formatPlayerName(otherPlayer)}\n*Kembali ke awal cell.*`;
                await m.reply(message, null, { mentions: [player, otherPlayer] });
                newPosition = 1;
            }
        }

        if (newPosition <= this.boardSize) {
            const checkSnakeOrLadder = this.snakesAndLadders.find((s) => s.start === this.currentPositions[player]);

            if (checkSnakeOrLadder) {
                const action = checkSnakeOrLadder.end < checkSnakeOrLadder.start ? 'Mundur': 'Maju';
                await m.reply(`🐍 ${this.formatPlayerName(player)} menemukan *${action === 'Mundur' ? 'ular': 'tangga'}!*\n*${action}* ke kotak *${checkSnakeOrLadder.end}*`, null, { mentions: this.players });
                this.currentPositions[player] = checkSnakeOrLadder.end;
            } else {
                this.currentPositions[player] = newPosition;
            }

            if (this.currentPositions[player] === this.boardSize) {
                await m.reply(`🎉 ${this.formatPlayerName(player)} menang!\n*Selamat!*`, null, { mentions: [player] });
                await this.resetSession();
                return;
            }

            if (diceRoll !== 6) {
                this.currentPlayerIndex = 1 - this.currentPlayerIndex;
            } else {
                await m.reply('🎲 *Anda mendapat 6*\nJadi giliran Anda masih berlanjut.', null, { mentions: this.players });
            }
        } else {
            await m.reply('🔄 Melebihi batas kotak, posisi direset dan giliran beralih ke pemain berikutnya.', null, { mentions: this.players });
            this.currentPositions[player] = 1;
            this.currentPlayerIndex = 1 - this.currentPlayerIndex;
        }

        const boardBuffer = await this.getBoardBuffer();
        const sendMsg = this.sendMsg;
        await sendMsg.sendMessage(m.chat, { delete: this.keyId });

        const {
            key
        } = await m.reply(boardBuffer);
        this.keyId = key;
    };

    addPlayer = (player) => this.players.length < 2 && !this.players.includes(player) && player !== '' && (this.players.push(player), true);

    resetSession = () => {
        this.players = [];
        this.currentPositions = {};
        this.currentPlayerIndex = 0;
        this.started = false;
    };

    isGameStarted = () => this.started;
}

export default GameSession