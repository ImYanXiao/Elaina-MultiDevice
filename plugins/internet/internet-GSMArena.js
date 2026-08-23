import puppeteer from "puppeteer"
let regex = /https:\/\/m\.gsmarena\.com\/[\w-]+-\d+\.php/i
let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        if (text.match(regex)) {
            await global.loading(m, conn)
            let data = await GSMArena.detail(text)
            let caption = Object.entries(data.specs).map(v => { return `${v[0]} : ${v[1]}` }).join("\n")
            await conn.sendFile(m.chat, data.imageUrl, null, caption, m)
        } else {
            if (!text) {
                return m.reply(`Masukan Nama! \n\nContoh: \n${usedPrefix + command} Xiaomi`)
            }
            await global.loading(m, conn)
            let data = await GSMArena.search(text)
            if (data.length == 0) {
                return m.reply(`Tidak dapat menemukan *${text}*`)
            }
            let list = data.map((v, i) => {
                return [`${usedPrefix + command} ${v.link}`, (i + 1).toString(), `${v.title}`]
            })
            await conn.textList(m.chat, `Terdapat *${data.length} Result!*`, data[0].imageUrl, list, m)
        }
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ["gsmarena"]
handler.tags = ["internet"]
handler.command = /^(gsmarena)$/i
handler.limit = true
export default handler

const GSMArena = {
    search: async query => {
        let browser
        try {
            browser = await puppeteer.launch({ args: ['--no-sandbox'], headless: "new" })
            const page = await browser.newPage()
            await page.goto(`https://m.gsmarena.com/resl.php3?sSearch=${query}`)
            const data = await page.evaluate(() => {
                const results = []
                const items = document.querySelectorAll('.swiper-half-slide a')

                items.forEach(item => {
                    const title = item.querySelector('strong').innerText
                    const imageUrl = item.querySelector('img').src
                    const link = item.href

                    results.push({
                        title, imageUrl, link
                    })
                })
                return results
            })
            return data
        } catch (error) {
            console.error('Error in search:', error)
            return { error: 'Failed to fetch search results' }
        } finally {
            if (browser) await browser.close()
        }
    },
    detail: async url => {
        let browser
        try {
            browser = await puppeteer.launch({ args: ['--no-sandbox'], headless: "new" })
            const page = await browser.newPage()
            await page.goto(url)
            const data = await page.evaluate(() => {
                const getTextContent = (selector) => {
                    const element = document.querySelector(selector)
                    return element ? element.innerText : null
                }
                const getAttribute = (selector, attribute) => {
                    const element = document.querySelector(selector)
                    return element ? element.getAttribute(attribute) : null
                }
                const title = getTextContent('h1.section.nobor')
                const imageUrl = getAttribute('.specs-cp-pic-rating img', 'src')
                
                const rows = Array.from(document.querySelectorAll('table tbody tr'))
                const scrapedData = {}

                rows.forEach(row => {
                    const titleElement = row.querySelector('.ttl a')
                    const valueElement = row.querySelector('.nfo')
                    if (titleElement && valueElement) {
                        const title = titleElement.innerText.trim()
                        const value = valueElement.innerText.trim()
                        scrapedData[title] = value
                    }
                })
                return { title, imageUrl, specs: scrapedData }
            })
            return data
        } catch (error) {
            console.error('Error in detail:', error)
            return { error: 'Failed to fetch detail data' }
        } finally {
            if (browser) await browser.close()
        }
    }
}