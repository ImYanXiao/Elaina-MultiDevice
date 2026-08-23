import { jidNormalizedUser } from '@rexxhayanasi/elaina-baileys'

const isPnUser = jid => typeof jid === 'string' && jid.endsWith('@s.whatsapp.net')
const isLidUser = jid => typeof jid === 'string' && jid.endsWith('@lid')
const isJidGroup = jid => typeof jid === 'string' && jid.endsWith('@g.us')

export function normalizeJid(input = '') {
    if (!input || typeof input !== 'string') return ''
    const value = input.trim()
    if (!value) return ''
    if (/^\d{5,16}$/.test(value)) return `${value}@s.whatsapp.net`
    return jidNormalizedUser(value) || value
}

export async function resolvePnJid(conn, input = '', alternate = '') {
    const primary = normalizeJid(input)
    const alt = normalizeJid(alternate)
    if (isPnUser(alt)) return alt
    if (isPnUser(primary)) return primary
    if (!primary) return alt || ''
    if (isLidUser(primary)) {
        try {
            const mapped = await conn?.signalRepository?.lidMapping?.getPNForLID?.(primary)
            const pn = normalizeJid(mapped || '')
            if (isPnUser(pn)) return pn
        } catch {}
    }
    return primary
}

export async function normalizeGroupMetadataPn(conn, metadata = {}) {
    if (!metadata || typeof metadata !== 'object') return {}
    const participants = await Promise.all((metadata.participants || []).map(async participant => {
        const rawId = normalizeJid(participant?.id || participant?.jid || participant?.lid || '')
        const alternate = normalizeJid(participant?.phoneNumber || participant?.pn || participant?.jid || '')
        const pn = await resolvePnJid(conn, rawId, alternate)
        const lid = isLidUser(rawId) ? rawId : normalizeJid(participant?.lid || '')
        return {
            ...participant,
            id: pn || rawId,
            jid: pn || rawId,
            phoneNumber: isPnUser(pn) ? pn : participant?.phoneNumber,
            lid: lid || participant?.lid
        }
    }))
    const ownerRaw = normalizeJid(metadata.owner || metadata.ownerLid || '')
    const ownerPn = await resolvePnJid(conn, ownerRaw, metadata.ownerPn || '')
    const subjectOwnerRaw = normalizeJid(metadata.subjectOwner || metadata.subjectOwnerLid || '')
    const subjectOwnerPn = await resolvePnJid(conn, subjectOwnerRaw, metadata.subjectOwnerPn || '')
    const descOwnerRaw = normalizeJid(metadata.descOwner || metadata.descOwnerLid || '')
    const descOwnerPn = await resolvePnJid(conn, descOwnerRaw, metadata.descOwnerPn || '')
    return {
        ...metadata,
        owner: ownerPn || ownerRaw || metadata.owner,
        ownerPn: isPnUser(ownerPn) ? ownerPn : metadata.ownerPn,
        ownerLid: isLidUser(ownerRaw) ? ownerRaw : metadata.ownerLid,
        subjectOwner: subjectOwnerPn || subjectOwnerRaw || metadata.subjectOwner,
        subjectOwnerPn: isPnUser(subjectOwnerPn) ? subjectOwnerPn : metadata.subjectOwnerPn,
        subjectOwnerLid: isLidUser(subjectOwnerRaw) ? subjectOwnerRaw : metadata.subjectOwnerLid,
        descOwner: descOwnerPn || descOwnerRaw || metadata.descOwner,
        descOwnerPn: isPnUser(descOwnerPn) ? descOwnerPn : metadata.descOwnerPn,
        descOwnerLid: isLidUser(descOwnerRaw) ? descOwnerRaw : metadata.descOwnerLid,
        participants
    }
}

async function normalizeContextInfo(conn, contextInfo) {
    if (!contextInfo || typeof contextInfo !== 'object') return
    if (contextInfo.participant) {
        contextInfo.participant = await resolvePnJid(conn, contextInfo.participant, contextInfo.participantAlt || '')
    }
    if (contextInfo.remoteJid && !isJidGroup(contextInfo.remoteJid)) {
        contextInfo.remoteJid = await resolvePnJid(conn, contextInfo.remoteJid, contextInfo.remoteJidAlt || '')
    }
    if (Array.isArray(contextInfo.mentionedJid)) {
        contextInfo.mentionedJid = await Promise.all(contextInfo.mentionedJid.map(jid => resolvePnJid(conn, jid)))
    }
}

async function normalizeKey(conn, key) {
    if (!key || typeof key !== 'object') return
    if (key.participant) {
        key.participant = await resolvePnJid(conn, key.participant, key.participantAlt || '')
    }
    if (key.remoteJid && !isJidGroup(key.remoteJid)) {
        key.remoteJid = await resolvePnJid(conn, key.remoteJid, key.remoteJidAlt || '')
    }
}

export async function normalizeMessageJids(conn, input) {
    const messages = Array.isArray(input) ? input : [input]
    for (const message of messages) {
        if (!message || typeof message !== 'object') continue
        await normalizeKey(conn, message.key)
        if (message.participant) {
            message.participant = await resolvePnJid(conn, message.participant, message.participantAlt || message.key?.participantAlt || '')
        }
        const seen = new WeakSet()
        const walk = async value => {
            if (!value || typeof value !== 'object' || Buffer.isBuffer(value)) return
            if (seen.has(value)) return
            seen.add(value)
            if (value.contextInfo) await normalizeContextInfo(conn, value.contextInfo)
            if (value.key) await normalizeKey(conn, value.key)
            for (const child of Object.values(value)) {
                if (child && typeof child === 'object') await walk(child)
            }
        }
        await walk(message.message)
    }
    return input
}

export async function resolveJid(conn, m, target = null) {
    const input = target || m?.mentionedJid?.[0] || m?.sender
    if (!input) return null
    const direct = await resolvePnJid(conn, input)
    if (isPnUser(direct)) return direct
    if (!m?.isGroup) return direct || null
    const metadata = typeof conn?.groupMetadataPn === 'function'
        ? await conn.groupMetadataPn(m.chat).catch(() => null)
        : await conn.groupMetadata(m.chat).then(data => normalizeGroupMetadataPn(conn, data)).catch(() => null)
    const normalizedInput = normalizeJid(input)
    const participant = metadata?.participants?.find(item =>
        item?.jid === direct || item?.id === direct || item?.lid === normalizedInput || item?.phoneNumber === direct
    )
    return participant?.jid || participant?.phoneNumber || direct || null
}
