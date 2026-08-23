import express from 'express'
import fetch from 'node-fetch'

let app = global.app = express()

function connect(PORT) {
    app.get('/', (req, res) => res.send('✅ Server berjalan dengan baik'))

    app.get('/nowa', async (req, res) => {
        try {
            const q = req.query.number
            const regex = /x/g

            if (!q) return res.status(400).json({ error: 'Parameter "number" diperlukan. Contoh: 62812345xxx' })
            if (!q.match(regex)) return res.status(400).json({ error: 'Parameter "number" harus berisi minimal satu huruf "x" untuk mengganti angka.' })

            const randomCount = q.match(regex).length
            const total = Math.pow(10, randomCount)

            const results = await Promise.all(
                Array.from({ length: total }, async (_, i) => {
                    const list = [...i.toString().padStart(randomCount, '0')]
                    const jid = q.replace(regex, () => list.shift()) + '@s.whatsapp.net'
                    const exists = await conn.onWhatsApp(jid).then(v => (v[0] || {}).exists).catch(() => false)
                    let info = {}
                    if (exists) {
                        info = await conn.fetchStatus(jid).catch(() => ({}))
                    }
                    return { jid, exists, ...info }
                })
            )

            res.json({ total: results.length, result: results })
        } catch (err) {
            console.error(err)
            res.status(500).json({ error: 'Terjadi kesalahan saat memproses permintaan.' })
        }
    })

    app.listen(PORT, () => {
        keepAlive()
        console.log(`🌐 Server listening on port ${PORT}`)
    })
}

function keepAlive() {
    const url = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
    if (/(\/\/|\.)undefined\./.test(url)) return
    setInterval(() => {
        fetch(url).catch(console.error)
    }, 30 * 1000)
}

function formatDate(n, locale = 'id') {
    return new Date(n).toLocaleDateString(locale, { timeZone: 'Asia/Jakarta' })
}

export default connect