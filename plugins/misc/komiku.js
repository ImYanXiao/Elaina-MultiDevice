const puppeteer = (await import("puppeteer")).default

const komiku = {
    latest: async () => {
        const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
        const page = await browser.newPage()

        await page.goto('https://komiku.id/pustaka/?orderby=date')
        await page.waitForSelector('body')

                                    
        await page.waitForTimeout(5000)

                                                                 
        const data = await page.evaluate(() => {
            const elements = document.querySelectorAll('.daftar .bge')
            const results = []

            elements.forEach(element => {
                const titleElement = element.querySelector('.kan h3')
                const linkElement = element.querySelector('.kan a')
                const descriptionElement = element.querySelector('.kan p')
                const imageElement = element.querySelector('.bgei img')

                const title = titleElement ? titleElement.innerText.trim() : null
                const link = linkElement ? linkElement.href : null
                const description = descriptionElement ? descriptionElement.innerText.trim() : null
                const imageUrl = imageElement ? imageElement.src : null

                if (title && link) {
                    results.push({
                        title,
                        link,
                        description,
                        imageUrl
                    })
                }
            })

            return results
        })

        await browser.close()
        return data
    },
    search: async (query) => {
        const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
        const page = await browser.newPage()

        await page.goto(`https://komiku.id/?post_type=manga&s=${query}`)
        await page.waitForSelector('body')

                                    
        await page.waitForTimeout(5000)

                                                                 
        const data = await page.evaluate(() => {
            const elements = document.querySelectorAll('.daftar .bge')
            const results = []

            elements.forEach(element => {
                const titleElement = element.querySelector('.kan h3')
                const linkElement = element.querySelector('.kan a')
                const descriptionElement = element.querySelector('.kan p')
                const imageElement = element.querySelector('.bgei img')

                const title = titleElement ? titleElement.innerText.trim() : null
                const link = linkElement ? linkElement.href : null
                const description = descriptionElement ? descriptionElement.innerText.trim() : null
                const imageUrl = imageElement ? imageElement.src : null

                if (title && link) {
                    results.push({
                        title,
                        link,
                        description,
                        imageUrl
                    })
                }
            })

            return results
        })

        await browser.close()
        return data
    },
    getDetails: async (url) => {
        const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
        const page = await browser.newPage()

        await page.goto(url)
        await page.waitForSelector('body')

                                    
        await page.waitForTimeout(5000)

                                                                                        
        const data = await page.evaluate(() => {
            const judulElement = document.querySelector('#Judul')
            const inftableElement = document.querySelector('.inftable')
            const daftarChapterElement = document.querySelector('#Daftar_Chapter')

            const details = {
                mainTitle: null,
                altTitle: null,
                mainDescription: null,
                synopsis: null,
                imageUrl: null,
                info: {},
                chapters: []
            }

            if (judulElement) {
                const mainTitleElement = judulElement.querySelector('h1 span[itemprop="name"]')
                const altTitleElement = judulElement.querySelector('p.j2')
                const mainDescriptionElement = judulElement.querySelector('p[itemprop="description"]')
                const synopsisElement = judulElement.querySelector('p.desc')
                const imageElement = document.querySelector('#Informasi .ims img')

                details.mainTitle = mainTitleElement ? mainTitleElement.innerText.trim() : null
                details.altTitle = altTitleElement ? altTitleElement.innerText.trim() : null
                details.mainDescription = mainDescriptionElement ? mainDescriptionElement.innerText.trim() : null
                details.synopsis = synopsisElement ? synopsisElement.innerText.trim() : null
                details.imageUrl = imageElement ? imageElement.src : null
            }

            if (inftableElement) {
                const rows = inftableElement.querySelectorAll('tbody tr')
                rows.forEach(row => {
                    const columns = row.querySelectorAll('td')
                    if (columns.length === 2) {
                        const key = columns[0].innerText.trim()
                        const value = columns[1].innerText.trim()
                        details.info[key] = value
                    }
                })
            }

            if (daftarChapterElement) {
                const rows = daftarChapterElement.querySelectorAll('tbody tr')
                rows.forEach(row => {
                    const chapterNumberElement = row.querySelector('.judulseries a')
                    const viewElement = row.querySelector('.pembaca i')
                    const dateElement = row.querySelector('.tanggalseries')

                    const chapterNumber = chapterNumberElement ? chapterNumberElement.innerText.trim() : null
                    const chapterLink = chapterNumberElement ? chapterNumberElement.href : null
                    const views = viewElement ? viewElement.innerText.trim() : null
                    const date = dateElement ? dateElement.innerText.trim() : null

                    if (chapterNumber && chapterLink) {
                        details.chapters.push({
                            chapterNumber,
                            chapterLink,
                            views,
                            date
                        })
                    }
                })
            }

            return details
        })

        await browser.close()
        return data
    },
    getChapterImages: async (chapterUrl) => {
        const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
        const page = await browser.newPage()

        await page.goto(chapterUrl)
        await page.waitForSelector('body')

                                    
        await page.waitForTimeout(5000)

                                                                 
        const images = await page.evaluate(() => {
            const imageElements = document.querySelectorAll('#Baca_Komik img')
            const imageUrls = []

            imageElements.forEach(img => {
                const src = img.src
                if (src) {
                    imageUrls.push(src)
                }
            })

            return imageUrls
        })

        await browser.close()
        return images
    }
}
