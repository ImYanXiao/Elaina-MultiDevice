let stdouts = []
let modified = false
let oldWrite = null

export default function captureLogs(maxLength = 200) {
    if (!oldWrite) oldWrite = process.stdout.write.bind(process.stdout)
    process.stdout.write = (chunk, encoding, callback) => {
        stdouts.push(Buffer.from(chunk, encoding))
        oldWrite(chunk, encoding, callback)
        if (stdouts.length > maxLength) stdouts.shift()
    }
    modified = true
    return {
        disable,
        get isModified() {
            return modified
        },
        logs
    }
}

export function disable() {
    modified = false
    if (oldWrite) process.stdout.write = oldWrite
    return process.stdout.write
}

export function isModified() {
    return modified
}

export function logs() {
    return Buffer.concat(stdouts)
}
