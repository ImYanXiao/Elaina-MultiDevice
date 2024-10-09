import express from 'express';
import fetch from 'node-fetch';
import axios from 'axios';
import { exec } from 'child_process';

let app = global.app = express();

function connect(PORT) {
    app.get('/', (req, res) => res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="10">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="https://kepo.xsvs.repl.co/file/VZZgayDPvuHM.ico" type="image/x-icon">
    <link rel="shortcut icon" href="https://kepo.xsvs.repl.co/file/VZZgayDPvuHM.ico" type="image/x-icon">
    <title>Xnuvers007 Bot</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #1a1a1a;
            color: #ffffff;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        #clock {
            color: #ff9900;
            font-weight: bold;
        }
        .btn-custom {
            background-color: green;
            color: #fff;
            border: none;
        }
    </style>
</head>
<body>
    <div id="clock-container">
        <div id="clock-wib"></div>
        <div id="clock-wita"></div>
        <div id="clock-wit"></div>
        <div id="name">Xnuvers007</div>
    </div>
    <div class="container text-center">
        <a href="https://mykingbee.blogspot.com/" class="btn btn-custom btn-primary" target="_blank">Visit My Website</a>
    </div>
    <script>
        function updateClock() {
            const now = new Date();
            const options = { hour12: false };
            const timeStringWIB = now.toLocaleTimeString('en-US', { timeZone: 'Asia/Jakarta' });
            const timeStringWITA = now.toLocaleTimeString('en-US', { timeZone: 'Asia/Makassar' });
            const timeStringWIT = now.toLocaleTimeString('en-US', { timeZone: 'Asia/Jayapura' });
            document.getElementById('clock-wib').textContent = timeStringWIB + " (WIB)";
            document.getElementById('clock-wita').textContent = timeStringWITA + " (WITA)";
            document.getElementById('clock-wit').textContent = timeStringWIT + " (WIT)";
        }
        setInterval(updateClock, 1000);
        updateClock();
    </script>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.3/dist/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
`));

    app.get('/nowa', async (req, res) => {
        const q = req.query.number;
        const regex = /x/g;

        if (!q) return res.status(400).json({ error: 'Input Parameter Number Parameter is required' });
        if (!q.match(regex)) return res.status(400).json({ error: 'Parameter Number must contain at least one letter "x"' });

        const random = q.match(regex).length;
        const total = Math.pow(10, random);
        const array = [];

        for (let i = 0; i < total; i++) {
            const list = [...i.toString().padStart(random, '0')];
            const result = q.replace(regex, () => list.shift()) + '@s.whatsapp.net';
            try {
                const v = await conn.onWhatsApp(result);
                const exists = v[0]?.exists;
                let info = exists ? await conn.fetchStatus(result).catch(_ => {}) : {};
                array.push({ jid: result, exists, ...info });
            } catch (error) {
                array.push({ jid: result, exists: false });
            }
        }
        res.json({ result: array });
    });

    app.get('/speedtest', (req, res) => {
        exec('speedtest', (error, stdout, stderr) => {
            if (error) {
                return res.status(500).json({ error: `Speedtest failed: ${error.message}` });
            }
            res.status(200).send(`<h2>Speedtest Results</h2><pre>${stdout}</pre>`);
        });
    });

    app.get('/ping', (req, res) => {
        res.status(200).send('Ping successful');
    });

    app.get('/ping2', async (req, res) => {
        const pingResults = [];
        const url = 'https://xnuvers007botz.xnuvers007.repl.co';

        for (let i = 0; i < 10; i++) {
            try {
                const response = await axios.get(url);
                pingResults.push(`Ping result ${i + 1}: ${response.data} ${response.status}<br />`);
            } catch (error) {
                pingResults.push(`Error pinging ${i + 1}: ${error.message}`);
            }
        }
        res.status(200).send(pingResults.join('<br /><br />'));
    });

    app.listen(PORT, () => {
        keepAlive();
        console.log('App listened on port', PORT);
    });
}

function keepAlive() {
    const url = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;
    if (/(\/\/|\.)undefined\./.test(url)) return;

    setInterval(() => {
        fetch(url).catch(console.log);
    }, 30 * 1000);
}

function formatDate(n, locale = 'id') {
    let d = new Date(n);
    return d.toLocaleDateString(locale, { timeZone: 'Asia/Jakarta' });
}

export default connect;
