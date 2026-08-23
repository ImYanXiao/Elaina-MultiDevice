import * as Baileys from '@rexxhayanasi/elaina-baileys'
const VoipClient = Baileys.VoipClient || null
import fs from 'fs'
import path from 'path'
import { spawn } from 'child_process'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const TMP_DIR = './tmp'
const VN_DIR = './vn'
const ASTRALUNE_BASE = 'https://myapi.astralune.cv'

let voipClient = null
let rtcReady = false
let isConnecting = false
let activeCall = null
let clientStartedAt = null
let lastError = null
let lastCallTarget = null
let lastCallAt = null
let isEndingCall = false

if (!global.__rtcRefs) global.__rtcRefs = new Set()

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function formatUptime(ms) {
    if (!ms) return '-'
    const sec = Math.floor(ms / 1000)
    const min = Math.floor(sec / 60)
    const hour = Math.floor(min / 60)
    return `${hour}h ${min % 60}m ${sec % 60}s`
}

function safeDelete(file) {
    try {
        if (file && fs.existsSync(file)) fs.unlinkSync(file)
    } catch {}
}

function normalizePath(p) {
    return String(p || '').replace(/^['"]|['"]$/g, '').trim()
}

function resolveLocalAudio(input) {
    const raw = normalizePath(input)
    if (!raw) return null

    if (fs.existsSync(raw) && fs.statSync(raw).isFile()) return raw

    const clean = raw.replace(/^\.?\/*vn\//i, '').trim()
    const baseName = path.basename(clean)
    const hasExt = /\.[a-z0-9]+$/i.test(baseName)

    const candidates = []

    if (hasExt) {
        candidates.push(path.join(VN_DIR, baseName))
        candidates.push(path.join('./vn', baseName))
    } else {
        for (const ext of ['.mp3', '.ogg', '.opus', '.wav', '.m4a', '.aac', '.webm']) {
            candidates.push(path.join(VN_DIR, baseName + ext))
        }
    }

    for (const file of candidates) {
        if (fs.existsSync(file) && fs.statSync(file).isFile()) return file
    }

    return null
}

function usage(usedPrefix) {
    return (
        '📞 *RTC CALL*\n\n' +
        'Format:\n' +
        `${usedPrefix}rtc <nomor> silence\n` +
        `${usedPrefix}rtc <nomor> <nama file vn>\n` +
        `${usedPrefix}rtc <nomor> <judul lagu>\n` +
        `${usedPrefix}rtcyt <nomor> <judul lagu>\n\n` +
        'Contoh:\n' +
        `${usedPrefix}rtc 6283191938363 silence\n` +
        `${usedPrefix}rtc 6283191938363 introelaina.mp3\n` +
        `${usedPrefix}rtc 6283191938363 introelaina\n` +
        `${usedPrefix}rtc 6283191938363 ./vn/introelaina.mp3\n` +
        `${usedPrefix}rtc 6283191938363 DJ Summertime Sadness\n\n` +
        'Control:\n' +
        `${usedPrefix}rtclogin\n` +
        `${usedPrefix}rtcstatus\n` +
        `${usedPrefix}rtcend\n` +
        `${usedPrefix}rtcreconnect`
    )
}

function getRTCStatus() {
    return {
        connected: rtcReady && !!voipClient,
        connecting: isConnecting,
        activeCall: !!activeCall,
        endingCall: isEndingCall,
        uptime: clientStartedAt ? formatUptime(Date.now() - clientStartedAt) : '-',
        lastCallTarget: lastCallTarget || '-',
        lastCallAt: lastCallAt ? new Date(lastCallAt).toLocaleString('id-ID') : '-',
        lastError: lastError || '-'
    }
}

async function ensureRTC(conn) {
    if (voipClient && rtcReady) return voipClient
    if (!conn?.user) throw new Error('Socket bot utama belum login.')
    if (!VoipClient) throw new Error('VoipClient tidak tersedia pada versi Baileys ini.')

    if (isConnecting) {
        while (isConnecting) await sleep(500)
        if (voipClient && rtcReady) return voipClient
    }

    isConnecting = true
    lastError = null

    try {
        const client = new VoipClient({ sock: conn, socket: conn, conn })
        await client.connect()
        voipClient = client
        rtcReady = true
        clientStartedAt = Date.now()
        return voipClient
    } catch (err) {
        voipClient = null
        rtcReady = false
        lastError = err.message || String(err)
        throw err
    } finally {
        isConnecting = false
    }
}

async function waitForEndingCall(timeoutMs) {
    let waited = 0
    while (isEndingCall && waited < timeoutMs) {
        await sleep(300)
        waited += 300
    }
    return !isEndingCall
}

async function clearCall() {
    if (isEndingCall) {
        await waitForEndingCall(20000)
        return
    }

    if (!activeCall) return

    isEndingCall = true
    const call = activeCall
    activeCall = null
    global.__rtcRefs.delete(call)

    try {
        if (typeof call.end === 'function') call.end()
        if (typeof call.waitForEnd === 'function') {
            await Promise.race([call.waitForEnd(), sleep(6000)])
        } else {
            await sleep(2000)
        }
    } catch {}

    isEndingCall = false
}

async function hardResetRTC(conn) {
    try {
        if (activeCall) {
            try { activeCall.end() } catch {}
        }
    } catch {}

    activeCall = null
    isEndingCall = false

    try {
        if (voipClient) {
            try { voipClient.resetCallState?.() } catch {}
            try { voipClient.disconnect?.() } catch {}
        }
    } catch {}

    voipClient = null
    rtcReady = false

    await sleep(2000)
    return ensureRTC(conn)
}

function prepareAudio(inputPath) {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR, { recursive: true })

        const outPath = path.join(TMP_DIR, `rtc_${Date.now()}.wav`)
        const ffmpeg = spawn('ffmpeg', [
            '-y',
            '-i', inputPath,
            '-vn',
            '-ar', '16000',
            '-ac', '1',
            '-acodec', 'pcm_s16le',
            '-af', 'volume=2.5',
            outPath
        ])

        let stderr = ''
        ffmpeg.stderr.on('data', chunk => { stderr += chunk.toString() })
        ffmpeg.on('error', reject)
        ffmpeg.on('close', code => {
            if (code !== 0) return reject(new Error(stderr || `ffmpeg exited with code ${code}`))
            resolve(outPath)
        })
    })
}

function prepareAudioFromUrl(inputUrl) {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR, { recursive: true })

        const outPath = path.join(TMP_DIR, `rtc_${Date.now()}.wav`)
        const ffmpeg = spawn('ffmpeg', [
            '-y',
            '-reconnect', '1',
            '-reconnect_streamed', '1',
            '-reconnect_delay_max', '5',
            '-user_agent', 'Mozilla/5.0',
            '-i', inputUrl,
            '-vn',
            '-ar', '16000',
            '-ac', '1',
            '-acodec', 'pcm_s16le',
            '-af', 'volume=2.5',
            outPath
        ])

        let stderr = ''
        ffmpeg.stderr.on('data', chunk => { stderr += chunk.toString() })
        ffmpeg.on('error', reject)
        ffmpeg.on('close', code => {
            if (code !== 0) return reject(new Error(stderr || `ffmpeg exited with code ${code}`))
            resolve(outPath)
        })
    })
}

function findAudioMedia(data) {
    const stack = [data]
    while (stack.length) {
        const item = stack.shift()
        if (!item) continue

        if (Array.isArray(item)) {
            for (const child of item) stack.push(child)
            continue
        }

        if (typeof item === 'object') {
            if (item.type === 'Audio' && (item.mediaUrl || item.mediaPreviewUrl)) return item
            for (const value of Object.values(item)) {
                if (value && typeof value === 'object') stack.push(value)
            }
        }
    }
    return null
}

async function astraluneYouTube(query) {
    const url = `${ASTRALUNE_BASE}/downloader/youtube?query=${encodeURIComponent(query)}`
    const res = await fetch(url, {
        method: 'GET',
        headers: { 'user-agent': 'Mozilla/5.0' }
    })

    const data = await res.json().catch(() => null)
    if (!res.ok || !data) throw new Error(`Astralune API error: ${res.status}`)

    const media = findAudioMedia(data)
    if (!media?.mediaUrl && !media?.mediaPreviewUrl) {
        throw new Error('Audio YouTube tidak ditemukan dari Astralune API.')
    }

    return {
        title: media.name || 'Unknown Title',
        url: media.mediaPreviewUrl || media.mediaUrl,
        fallbackUrl: media.mediaUrl || media.mediaPreviewUrl,
        thumbnail: media.mediaThumbnail || '',
        duration: media.mediaDuration || '-',
        quality: media.mediaQuality || '-',
        extension: (media.mediaExtension || 'mp3').toLowerCase(),
        size: media.mediaFileSize || '-'
    }
}

async function getYouTubeAudioFile(input) {
    const audio = await astraluneYouTube(input)
    return {
        file: audio.url,
        fallbackUrl: audio.fallbackUrl,
        isUrl: true,
        title: audio.title,
        sourceUrl: audio.url,
        durationSec: audio.duration,
        quality: audio.quality,
        size: audio.size,
        thumbnail: audio.thumbnail
    }
}

function attachCallListeners({ call, conn, m, tmpFile, state }) {
    async function cleanup(message) {
        if (state.cleaned) return
        state.cleaned = true

        clearTimeout(state.ringingTimeout)
        clearTimeout(state.waitingNotice)

        if (activeCall === call) activeCall = null

        global.__rtcRefs.delete(call)
        safeDelete(tmpFile)

        try {
            await conn.sendMessage(m.chat, { text: message }, { quoted: m })
        } catch {}
    }

    call.on('ringing', async () => {
        if (state.cleaned) return
        state.ringing = true
        clearTimeout(state.ringingTimeout)

        try {
            await conn.sendMessage(m.chat, { text: '🔔 Berdering...' }, { quoted: m })
        } catch {}
    })

    call.on('connected', async () => {
        if (state.cleaned) return
        state.connected = true

        try {
            await conn.sendMessage(m.chat, { text: '✅ Panggilan tersambung! Audio mulai dikirim...' }, { quoted: m })
        } catch {}
    })

    call.on('ended', reason => {
        cleanup('📵 Panggilan berakhir' + (reason ? ': ' + reason : '.'))
    })

    call.on('error', async err => {
        lastError = err?.message || String(err)

        if (lastError.includes('CALL_TIMEOUT') || lastError.toLowerCase().includes('already active')) {
            await cleanup('🔄 RTC stuck detected, resetting...')

            try {
                await hardResetRTC(conn)
                return m.reply('🟢 RTC recovered, coba lagi.')
            } catch (e) {
                lastError = e.message || String(e)
                return m.reply('❌ RTC recovery gagal:\n' + lastError)
            }
        }

        cleanup('❌ Error RTC:\n' + lastError)
    })

    state.ringingTimeout = setTimeout(async () => {
        if (state.cleaned || state.ringing || state.connected) return

        try {
            await conn.sendMessage(m.chat, {
                text: '⏱️ Belum ada event ringing/connected, tapi call tidak ditutup otomatis.'
            }, { quoted: m })
        } catch {}
    }, 60000)

    state.waitingNotice = setTimeout(async () => {
        if (state.cleaned || state.ringing || state.connected) return

        try {
            await conn.sendMessage(m.chat, { text: '⌛ Masih menunggu respons server...' }, { quoted: m })
        } catch {}
    }, 5000)
}

function parseTargetAndAudio(args) {
    if (!args.length) return { ok: false, reason: 'missing' }

    const first = args[0]
    const target = first.replace(/\D/g, '')

    if (!target || target.length < 8) return { ok: false, reason: 'invalid-number' }

    const rawAudio = args.slice(1).join(' ').trim() || 'silence'
    return { ok: true, target, rawAudio }
}

const handler = async (m, { conn, args, usedPrefix, command }) => {
    if (/^rtcstatus$/i.test(command)) {
        const s = getRTCStatus()

        return m.reply(
            '📡 *RTC STATUS*\n\n' +
            '• Auth          : ✅ Pakai creds bot utama\n' +
            '• Client        : ' + (s.connected ? '🟢 Connected' : s.connecting ? '🟡 Connecting...' : '🔴 Disconnected') + '\n' +
            '• Active Call   : ' + (s.activeCall ? '📞 Ya' : '📴 Tidak') + '\n' +
            '• Ending Call   : ' + (s.endingCall ? '🟡 Cleanup...' : '⚪ Tidak') + '\n' +
            '• Uptime        : ' + s.uptime + '\n' +
            '• Last Target   : ' + s.lastCallTarget + '\n' +
            '• Last Call     : ' + s.lastCallAt + '\n' +
            '• Last Error    : ' + s.lastError + '\n' +
            '• Native Refs   : ' + global.__rtcRefs.size
        )
    }

    if (/^rtclogin$/i.test(command)) {
        if (voipClient && rtcReady) return m.reply('✅ RTC sudah aktif di socket utama.')

        try {
            await m.reply('🔐 Mengaktifkan RTC dari creds bot utama...')
            await ensureRTC(conn)
            return m.reply('✅ RTC aktif. Tidak perlu auth kedua.')
        } catch (err) {
            return m.reply('❌ RTC gagal aktif:\n' + (err.message || String(err)))
        }
    }

    if (/^rtcreconnect$/i.test(command)) {
        if (isConnecting) return m.reply('🟡 Sedang connecting, tunggu...')

        try {
            await m.reply('🔄 Reconnect RTC...')
            await hardResetRTC(conn)
            return m.reply('✅ RTC reconnect berhasil.')
        } catch (err) {
            return m.reply('❌ Reconnect gagal:\n' + (err.message || String(err)))
        }
    }

    if (/^rtcend$/i.test(command)) {
        if (isEndingCall) return m.reply('🟡 Sedang mengakhiri panggilan...')

        if (!activeCall) {
            try { voipClient?.resetCallState?.() } catch {}
            return m.reply('📵 Tidak ada panggilan aktif.')
        }

        await m.reply('🟡 Mengakhiri panggilan...')
        await clearCall()

        try { voipClient?.resetCallState?.() } catch {}

        return m.reply('📵 Panggilan ditutup.')
    }

    if (/^(call|rtc|rtcyt)$/i.test(command)) {
        if (!conn?.user) return m.reply('❌ Bot utama belum login.')

        const parsed = parseTargetAndAudio(args)
        if (!parsed.ok) return m.reply(usage(usedPrefix))

        const target = parsed.target
        const rawAudio = parsed.rawAudio
        const isYoutubeCommand = /^rtcyt$/i.test(command)

        if (isYoutubeCommand && rawAudio === 'silence') return m.reply(usage(usedPrefix))

        let client
        try {
            client = await ensureRTC(conn)
        } catch (err) {
            return m.reply('❌ RTC belum siap:\n' + (err.message || String(err)))
        }

        let audioSource = 'silence'
        let tmpFile = null
        let sourceFile = null
        let yt = null

        if (isEndingCall) {
            await conn.sendMessage(m.chat, { text: '⏳ Menunggu cleanup panggilan sebelumnya...' }, { quoted: m })

            const ok = await waitForEndingCall(20000)
            if (!ok) return m.reply('❌ Timeout menunggu cleanup. Coba lagi.')
        }

        if (activeCall) {
            await conn.sendMessage(m.chat, { text: '⏳ Menutup panggilan sebelumnya...' }, { quoted: m })
            await clearCall()
            try { client.resetCallState?.() } catch {}
        }

        if (rawAudio && rawAudio !== 'silence') {
            try {
                const localAudio = !isYoutubeCommand ? resolveLocalAudio(rawAudio) : null

                if (localAudio) {
                    await m.reply('🎵 Memproses audio lokal dari vn/...\n' + localAudio)
                    sourceFile = localAudio
                } else {
                    await m.reply('🔎 Mengambil audio dari YouTube...')

                    yt = await getYouTubeAudioFile(rawAudio)
                    sourceFile = yt.file

                    await conn.sendMessage(m.chat, {
                        text:
                            '🎶 Audio ditemukan:\n\n' +
                            '• Judul: ' + yt.title + '\n' +
                            '• Durasi: ' + (yt.durationSec || '-') + '\n' +
                            '• Quality: ' + (yt.quality || '-') + '\n' +
                            '• Size: ' + (yt.size || '-') + '\n\n' +
                            '🎧 Memproses audio untuk panggilan...'
                    }, { quoted: m })
                }

                if (/^https?:\/\//i.test(sourceFile)) {
                    try {
                        tmpFile = await prepareAudioFromUrl(sourceFile)
                    } catch (err) {
                        if (yt?.fallbackUrl && yt.fallbackUrl !== sourceFile) {
                            tmpFile = await prepareAudioFromUrl(yt.fallbackUrl)
                        } else {
                            throw err
                        }
                    }
                } else {
                    tmpFile = await prepareAudio(sourceFile)
                }

                audioSource = tmpFile
            } catch (err) {
                safeDelete(tmpFile)
                return m.reply('❌ Gagal ambil/proses audio:\n' + (err.message || String(err)))
            }
        }

        await conn.sendMessage(m.chat, { text: '📞 Menghubungi ' + target + '...' }, { quoted: m })

        try {
            if (activeCall) throw new Error('Masih ada active call')
            if (isEndingCall) throw new Error('RTC masih cleanup')

            await delay(500)

            const call = await client.call(target, {
                audioSource,
                durationMs: 0
            })

            activeCall = call
            global.__rtcRefs.add(call)
            lastCallTarget = target
            lastCallAt = Date.now()
            lastError = null

            const state = {
                cleaned: false,
                connected: false,
                ringing: false,
                ringingTimeout: null,
                waitingNotice: null
            }

            attachCallListeners({ call, conn, m, tmpFile, state })

            if (call.waitForEnd) await call.waitForEnd()
        } catch (err) {
            safeDelete(tmpFile)
            activeCall = null
            lastError = err.message || String(err)

            if (
                lastError.toLowerCase().includes('already active') ||
                lastError.toLowerCase().includes('call is already active')
            ) {
                try { client.resetCallState?.() } catch {}
                return m.reply('🔄 RTC state stuck sudah dibersihkan.\nCoba ulang command-nya sekali lagi.')
            }

            return m.reply('❌ Gagal melakukan panggilan:\n' + lastError)
        }
    }
}

handler.command = /^(call|rtc|rtcyt|rtclogin|rtcend|rtcstatus|rtcreconnect)$/i
handler.owner = true

export default handler