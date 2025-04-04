import fetch from 'node-fetch'
import FormData from 'form-data'
import { fileTypeFromBuffer } from 'file-type'

/**
 * Upload ephemeral file to file.io
 * `Expires in 1 day`
 * `100MB Max Filesize`
 * @param {Buffer} buffer File Buffer
 */
const fileIO = async (buffer) => {
  const { ext } = await fileTypeFromBuffer(buffer) || {}
  let form = new FormData()
  form.append('file', buffer, 'tmp.' + ext)
  let res = await fetch('https://file.io/?expires=1d', { // 1 Day Expiry Date
    method: 'POST',
    body: form
  })
  let json = await res.json()
  if (!json.success) throw new Error(`file.io error: ${json.message}`)
  return json.link
}

/**
 * Upload file to storage.restfulapi.my.id
 * @param {Buffer|ReadableStream|(Buffer|ReadableStream)[]} inp File Buffer/Stream or Array of them
 * @returns {string|null|(string|null)[]}
 */
const RESTfulAPI = async (inp) => {
  let form = new FormData()
  let buffers = inp
  if (!Array.isArray(inp)) buffers = [inp]
  
  for (let buffer of buffers) {
    form.append('file', buffer)
  }
  
  let res = await fetch('https://storage.restfulapi.my.id/upload', {
    method: 'POST',
    body: form
  })
  
  let json = await res.text()
  try {
    json = JSON.parse(json)
    if (!Array.isArray(inp)) return json.files[0].url
    return json.files.map(res => res.url)
  } catch (e) {
    throw new Error(`RESTfulAPI error: ${json}`)
  }
}

/**
 * Upload file to Ryzen API (ryzencdn)
 * @param {Buffer|ReadableStream|(Buffer|ReadableStream)[]} inp File Buffer/Stream or Array of them
 * @returns {string|null|(string|null)[]}
 */
const Ryzen = async (inp) => {
  try {
    const form = new FormData()
    const files = Array.isArray(inp) ? inp : [inp]

    for (const file of files) {
      const buffer = Buffer.isBuffer(file) ? file : file.buffer
      if (!Buffer.isBuffer(buffer)) throw new Error('Invalid buffer format')

      const type = await fileTypeFromBuffer(buffer)
      if (!type) throw new Error('Unsupported file type')

      const originalName = (file.originalname || 'file').split('.').shift()
      
      form.append('file', buffer, {
        filename: `${originalName}.${type.ext}`,
        contentType: type.mime
      })
    }

    const res = await fetch('https://api.ryzendesu.vip/api/uploader/ryzencdn', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        ...form.getHeaders(),
      },
      body: form,
    })

    const json = await res.json()
    if (!json.success) throw new Error(json.message || 'Upload failed')

    return Array.isArray(inp) ? json.map(f => f.url) : json
    
  } catch (error) {
    throw new Error(`upload error: ${error.message}`)
  }
}

/**
 * Main function to try multiple upload methods and return the first success.
 * @param {Buffer|ReadableStream|(Buffer|ReadableStream)[]} inp File Buffer/Stream or Array of them
 */
export default async function (inp) {
  let err = null
  const uploadMethods = [Ryzen, RESTfulAPI, fileIO]

  for (let upload of uploadMethods) {
    try {
      return await upload(inp)
    } catch (e) {
      err = e
    }
  }

  if (err) throw err
}
