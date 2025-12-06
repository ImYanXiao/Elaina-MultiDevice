import cp, { exec as _exec } from 'child_process';
import { promisify } from 'util';

let exec = promisify(_exec).bind(cp);

let commandHistory = [];

let handler = async (m, { conn, isOwner, command, text }) => {
    if (global.conn.user.jid !== conn.user.jid) return;

    if (command === 'clearhistory') {
        commandHistory = [];
        m.reply('Command history cleared.');
        return;
    }

    await m.reply('Executing...');

    let o;
    try {
        o = await exec(command.trimStart() + ' ' + text.trimEnd());
    } catch (e) {
        o = e;
    } finally {
        let { stdout, stderr } = o;

        let outputMessage = "```";

        if (stdout.trim()) {
            outputMessage += `\n${stdout.trim()}\n`;
        }

        if (stderr.trim()) {
            outputMessage += `\nError: ${stderr.trim()}\n`;
        }

        outputMessage += "```";

        commandHistory.push(`${command} ${text}`);

        if (outputMessage.length > 4096) {
            await conn.sendFile(m.chat, Buffer.from(stdout.trim()), 'output.txt', 'Here is the output file.');
        } else {
            await m.reply(outputMessage);
        }

        let historyMessage = commandHistory.map((cmd, index) => `${index + 1}. ${cmd}`).join('\n');
        await m.reply(`Command History:\n${historyMessage}\n\nFor remove history just type $ clearhistory`);
    }
};

handler.customPrefix = /^[$] /;
handler.command = new RegExp;
handler.rowner = true;

export default handler;
