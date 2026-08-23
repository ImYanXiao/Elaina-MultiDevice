import axios from 'axios'
import * as cheerio from 'cheerio'
import request from 'request'
import fetch from 'node-fetch'
import FormData from 'form-data'
import https from 'https'
import gtts from 'node-gtts'
import fs from 'fs'
import WebSocket from "ws"
import { join } from 'path'
import { NovitaSDK, TaskStatus } from "novita-sdk"
import puppeteer from 'puppeteer'

function generateRandomLetters(length) {
    let result = ''
    const alphabetLength = 26

    for (let i = 0; i < length; i++) {
        const randomValue = Math.floor(Math.random() * alphabetLength)
        const randomLetter = String.fromCharCode('a'.charCodeAt(0) + randomValue)
        result += randomLetter
    }

    return result
}

async function ytSearch(query) {
    try {
        const { data } = await axios.request({
            baseURL: "https://youtube.com",
            url: "/results",
            params: {
                search_query: query,
            },
        }).catch((e) => e?.response)
        const $ = cheerio.load(data)
        let _string = ""
        $("script").each((i, e) => {
            if (/var ytInitialData = /gi.exec($(e).html())) {
                _string += $(e)
                    .html()
                    .replace(/var ytInitialData = /i, "")
                    .replace(/;$/, "")
            }
        })
        const _initData = JSON.parse(_string).contents.twoColumnSearchResultsRenderer.primaryContents
        const Results = []
        let _render = null
        if (_initData.sectionListRenderer) {
            _render = _initData.sectionListRenderer.contents
                .filter((item) => item?.itemSectionRenderer?.contents.filter((v) => v.videoRenderer || v.playlistRenderer || v.channelRenderer))
                .shift().itemSectionRenderer.contents
        }
        if (_initData.richGridRenderer) {
            _render = _initData.richGridRenderer.contents
                .filter((item) => item.richGridRenderer && item.richGridRenderer.contents)
                .map((item) => item.richGridRenderer.contents)
        }
        for (const item of _render) {
            if (item.videoRenderer && item.videoRenderer.lengthText) {
                const video = item.videoRenderer
                const title = video?.title?.runs[0]?.text || ""
                const duration = video?.lengthText?.simpleText || ""
                const thumbnail = video?.thumbnail?.thumbnails[video?.thumbnail?.thumbnails.length - 1].url || ""
                const uploaded = video?.publishedTimeText?.simpleText || ""
                const views = video?.viewCountText?.simpleText?.replace(/[^0-9.]/g, "") || ""
                if (title && thumbnail && duration && uploaded && views) {
                    Results.push({
                        title,
                        thumbnail,
                        duration,
                        uploaded,
                        views,
                        url: "https://www.youtube.com/watch?v=" + video.videoId,
                    })
                }
            }
        }
        return Results
    }
    catch (e) {
        return {
            error: true,
            message: String(e),
        }
    }
}

const xnxx = {
    search: async query => {
        return new Promise((resolve, reject) => {
            const baseurl = 'https://www.xnxx.com'
            fetch(`${baseurl}/search/${query}/${Math.floor(Math.random() * 3) + 1}`, { method: 'get' }).then(res => res.text()).then(res => {
                let $ = cheerio.load(res, { xmlMode: false })
                let title = []
                let url = []
                let desc = []
                let results = []

                $('div.mozaique').each(function(a, b) {
                    $(b).find('div.thumb').each(function(c, d) {
                        url.push(baseurl+$(d).find('a').attr('href').replace("/THUMBNUM/", "/"))
                    })
                })
                $('div.mozaique').each(function(a, b) {
                    $(b).find('div.thumb-under').each(function(c, d) {
                        desc.push($(d).find('p.metadata').text())
                        $(d).find('a').each(function(e, f) {
                            title.push($(f).attr('title'))
                        })
                    })
                })
                for (let i = 0; i < title.length; i++) {
                    results.push({
                        title: title[i],
                        info: desc[i],
                        link: url[i]
                    })
                }
                resolve({
                    code: 200,
                    status: true,
                    result: results
                })
            })
            .catch(err => reject({
                code: 503, status: false, result: err
            }))
        })
    },

    detail: async URL => {
        return new Promise((resolve,
            reject) => {
            fetch(`${URL}`, { method: 'get' }).then(res => res.text()).then(res => {
                let $ = cheerio.load(res, { xmlMode: false })
                const title = $('meta[property="og:title"]').attr('content')
                const duration = $('meta[property="og:duration"]').attr('content')
                const image = $('meta[property="og:image"]').attr('content')
                const info = $('span.metadata').text()
                const videoScript = $('#video-player-bg > script:nth-child(6)').html()
                const files = {
                    low: (videoScript.match('html5player.setVideoUrlLow\\(\'(.*?)\'\\);') || [])[1],
                    high: videoScript.match('html5player.setVideoUrlHigh\\(\'(.*?)\'\\);' || [])[1],
                    HLS: videoScript.match('html5player.setVideoHLS\\(\'(.*?)\'\\);' || [])[1],
                    thumb: videoScript.match('html5player.setThumbUrl\\(\'(.*?)\'\\);' || [])[1],
                    thumb69: videoScript.match('html5player.setThumbUrl169\\(\'(.*?)\'\\);' || [])[1],
                    thumbSlide: videoScript.match('html5player.setThumbSlide\\(\'(.*?)\'\\);' || [])[1],
                    thumbSlideBig: videoScript.match('html5player.setThumbSlideBig\\(\'(.*?)\'\\);' || [])[1],
                }
                resolve({
                    status: 200,
                    result: {
                        title,
                        URL,
                        duration,
                        image,
                        info,
                        files
                    }
                })
            })
            .catch(err => reject({
                code: 503, status: false, result: err
            }))
        })
    }
}

const halodoc = {
    search: async query => {
        const url = `https://www.halodoc.com/artikel/search/${encodeURIComponent(query)}`

        try {
            const response = await fetch(url)
            const html = await response.text()
            const $ = cheerio.load(html)
            const articles = $('magneto-card').map((index, element) => ({
                title: $(element).find('header a').text(),
                articleLink: 'https://www.halodoc.com' + $(element).find('header a').attr('href'),
                imageSrc: $(element).find('magneto-image-mapper img').attr('src'),
                healthLink: 'https://www.halodoc.com' + $(element).find('.tag-container a').attr('href'),
                healthTitle: $(element).find('.tag-container a').text(),
                description: $(element).find('.description').text(),
            })).get()

            return articles
        } catch (err) {
            throw new Error(error)
        }
    },

    detail: async url => {
        try {
            const response = await fetch(url)
            const html = await response.text()
            const $ = cheerio.load(html)

            return {
                title: $('div.wrapper div.item').text(),
                content: $('div.article-page__article-body').text(),
                times: $('div.article-page__article-subheadline span.article-page__reading-time').text(),
                author: $('div.article-page__reviewer a').text(),
                link: $('meta[property="og:url"]').attr('content') || '',
                image: $('meta[property="og:image"]').attr('content') || ''
            }
        } catch (error) {
            throw new Error(error)
        }
    }
}

async function Kontan() {
    try {
        const res = await axios.request(`https://www.kontan.co.id/`, {
            method: "GET",
            headers: {
                "User-Agent": "Mozilla/5.0 (Linux; Android 9; Redmi 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Mobile Safari/537.36"
            }
        })
        let hasil = []
        const $ = cheerio.load(res.data)
        $("div.news-list > ul > li").each(function(a, b) {
            let berita = $(b).find("div.box-news.fleft > a > h1").text()
            let berita_url = $(b).find("a").attr("href")
            let berita_thumb = $(b).find("div.image-thumb").find("img").attr("data-src")
            let berita_jenis = $(b).find("a.link-orange").text()
            let berita_diupload = $(b).find("div.box-news.fleft").text().split(/[|]/g).splice(1).join("").slice(1)
            const result = {
                berita,
                berita_url,
                berita_thumb,
                berita_jenis,
                berita_diupload
            }
            hasil.push(result)
        })
        var filter = hasil.filter(v => v.berita !== "" && v.berita_diupload !== undefined)
        return filter
    } catch (e) {
        return e
    }
}

async function AntaraNews() {
    try {
        const res = await axios.get(`https://m.antaranews.com/terkini`, {
            method: 'GET',
            headers: {
                "User-Agent": "Mozilla/5.0 (Linux; Android 9; Redmi 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Mobile Safari/537.36",
            }
        })
        const hasil = []
        const $ = cheerio.load(res.data)
        $('div.row.item').each(function(a, b) {
            let berita = $(b).find('h3').text()
            let berita_url = $(b).find('a').attr('href')
            let berita_jenis = $(b).find('div.meta > a').text()
            let berita_diupload = $(b).find('div.meta').text().replace(' -', '     ').slice(10).replace(/  /g, '')
            let berita_thumb = $(b).find('img').attr('data-src')
            const result = {
                berita,
                berita_url,
                berita_thumb,
                berita_jenis,
                berita_diupload
            }
            hasil.push(result)
        })
        return hasil
    } catch (e) {
        return e
    }
}

async function CNBC() {
    try {
        const res = await axios.get(`https://www.cnbcindonesia.com/news/indeks/3/1?kanal=3&date=`, {
            method: 'GET',
            headers: {
                "User-Agent": "Mozilla/5.0 (Linux; Android 9; Redmi 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Mobile Safari/537.36",
            }
        })
        const hasil = []
        const $ = cheerio.load(res.data)
        $('article.list__item.clearfix').each(function (a, b) {
            let berita = $(b).find('h4').text().trim()
            let berita_url = $(b).find('a').attr('href')
            let berita_diupload = $(b).find('span.date').text().trim()
            let berita_thumb = $(b).find('img').attr('src')
            const result = {
                berita,
                berita_url,
                berita_thumb,
                berita_diupload
            }
            hasil.push(result)
        })
        return hasil
    } catch (e) {
        return e
    }
}

async function Okezone() {
    try {
        const res = await axios.get(`https://news.okezone.com/`, {
            method: 'GET',
            headers: {
                "User-Agent": "Mozilla/5.0 (Linux; Android 9; Redmi 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Mobile Safari/537.36",
            }
        })
        const hasil = []
        const $ = cheerio.load(res.data)
        $('ul.list-berita > div > li').each(function(a, b) {
            $(b).find('div.img').each(function(c, d) {
                $(b).find('h2.title').each(function(e, f) {
                    let berita = $(f).find('a').text().replace(/\n/g, '')
                    let berita_thumb = $(d).find('a').attr('data-original')
                    let berita_url = $(d).find('a').attr('href')
                    let berita_diupload = $(f).find('span.timego').text().slice(1)
                    const result = {
                        berita,
                        berita_url,
                        berita_thumb,
                        berita_diupload: ' - ' + berita_diupload
                    }
                    hasil.push(result)
                })
            })
        })
        return hasil
    } catch (e) {
        return e
    }
}

async function DetikNews() {
    try {
        const res = await axios.get(`https://www.detik.com/terpopuler?tag_from=framebar&_ga=2.250751302.1905924499.1623147163-1763618333.1613153099`, {
            method: 'GET'
        })
        const hasil = []
        const $ = cheerio.load(res.data)
        $('article').each(function (a, b) {
            let berita = $(b).find('div > div > h3.media__title > a.media__link').text().trim()
            let berita_url = $(b).find('a.media__link').attr('href')
            let berita_thumb = $(b).find('img').attr('src').replace('?w=220&q=90', '')
            let berita_diupload = $(b).find('div.media__date > span').attr('title')
            const result = {
                berita,
                berita_url,
                berita_thumb,
                berita_diupload
            }
            hasil.push(result)
        })
        return hasil
    } catch (e) {
        return e
    }
}

async function DailyNews() {
    try {
        const res = await axios.get(`https://www.dailynewsindonesia.com/rubrik/news`, {
            method: 'GET',
            headers: {
                "User-Agent": "Mozilla/5.0 (Linux; Android 9; Redmi 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Mobile Safari/537.36",
            }
        })
        const hasil = []
        const $ = cheerio.load(res.data)
        $('div.jeg_posts.jeg_load_more_flag > article').each(function(a, b) {
            let berita = $(b).find('h3.jeg_post_title').text().trim()
            let berita_url = $(b).find('a').attr('href')
            let berita_thumb = $(b).find('img').attr('data-src')
            const result = {
                berita,
                berita_url,
                berita_thumb
            }
            hasil.push(result)
        })
        return hasil
    } catch (e) {
        return e
    }
}

async function iNewsTV() {
    try {
        const res = await axios.get(`https://www.inews.id/news`, {
            method: 'GET',
            headers: {
                "User-Agent": "Mozilla/5.0 (Linux; Android 9; Redmi 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Mobile Safari/537.36",
            }
        })
        const hasil = []
        const $ = cheerio.load(res.data)
        $('div.wdtop-row.more-news').each(function (a, b) {
            let berita = $(b).find('h2.wdtop-text').text().trim()
            let berita_diupload = $(b).find('span.wd-date').text().trim().slice(0, 35)
            let berita_jenis = $(b).find('span.wd-date > strong').text().trim()
            let berita_url = $(b).find('a').attr('href')
            let berita_thumb = $(b).find('div.lazy.wdtop-col-img').attr('data-src')
            const result = {
                berita,
                berita_url,
                berita_diupload,
                berita_jenis,
                berita_thumb
            }
            hasil.push(result)
        })
        return hasil
    } catch (e) {
        return e
    }
}

const lyrics = {
    search: async (query, token) => {
        query = query.replace(/ /gi, '+')
        let { data } = await axios.get(`https://search.azlyrics.com/search.php?q=${query}&x=${token}`)
        let $ = cheerio.load(data)
        let result = []
        $("table.table").each((v, i) => {
            let title = $(i).find("tr > td.text-left > a > span").text().replace(/"/gi, ' ').trim().replace(/  /gi, ' - ')
            let author = $(i).find("tr > td.text-left > a > b").text().replace(/'/gi, '')
            let url = $(i).find("tr > td.text-left > a").attr('href')

            result.push({
                title: title,
                author: author,
                url: url
            })
        })
        return result
    },
    detail: async link => {
        let { data } = await axios.get(link)
        let $ = cheerio.load(data)
        let result = $("div.row > div").text().trim().split('  ')[0].replace(/if/gi, '').trim()
        return result
    }
}

async function ttp(text, tcolor = "30F4EF") {
    return new Promise((resolve, reject) => {
        const options = {
            method: 'POST',
            url: `https://www.picturetopeople.org/p2p/text_effects_generator.p2p/transparent_text_effect`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
                "Cookie": "_ga=GA1.2.1667267761.1655982457; _gid=GA1.2.77586860.1655982457; __gads=ID=c5a896288a559a38-224105aab0d30085:T=1655982456:RT=1655982456:S=ALNI_MbtHcmgQmVUZI-a2agP40JXqeRnyQ; __gpi=UID=000006149da5cba6:T=1655982456:RT=1655982456:S=ALNI_MY1RmQtva14GH-aAPr7-7vWpxWtmg; _gat_gtag_UA_6584688_1=1"
            },
            formData: {
                'TextToRender': text,
                'FontSize': '100',
                'Margin': '30',
                'LayoutStyle': '0',
                'TextRotation': '0',
                'TextColor': `${tcolor}`,
                'TextTransparency': '0',
                'OutlineThickness': '3',
                'OutlineColor': '000000',
                'FontName': 'Lekton',
                'ResultType': 'view'
            }
        }
        request(options, async function(error, response, body) {
            if (error) throw new Error(error)
            const $ = cheerio.load(body)
            const result = 'https://www.picturetopeople.org' + $('#idResultFile').attr('value')
            resolve({ status: 200, result: result })
        })
    })
}

function RingTone(search) {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await axios.get('https://meloboom.com/en/search/' + search)
            let $ = cheerio.load(data)
            let hasil = []
            $('#__next > main > section > div.jsx-2244708474.container > div > div > div > div:nth-child(4) > div > div > div > ul > li').each(function (a, b) {
                hasil.push({
                    title: $(b).find('h4').text(), 
                    source: 'https://meloboom.com/' + $(b).find('a').attr('href'), 
                    audio: $(b).find('audio').attr('src')
                })
            })
            resolve(hasil)
        } catch (err) {
            console.error(err)
            return []
        }
    })
}

function BukaLapak(search) {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await axios.get(`https://www.bukalapak.com/products?from=omnisearch&from_keyword_history=false&search[keywords]=${search}&search_source=omnisearch_keyword&source=navbar`, {
                    headers: {
                        "user-agent": 'Mozilla/ 5.0(Windows NT 10.0 Win64 x64 rv: 108.0) Gecko / 20100101 Firefox / 108.0'
                    }
                })
            const $ = cheerio.load(data)
            const dat = []
            const b = $('a.slide > img').attr('src')
            $('div.bl-flex-item.mb-8').each((i, u) => {
                const a = $(u).find('observer-tracker > div > div')
                const img = $(a).find('div > a > img').attr('src')
                if (typeof img === 'undefined') return

                const link = $(a).find('.bl-thumbnail--slider > div > a').attr('href')
                const title = $(a).find('.bl-product-card__description-name > p > a').text().trim()
                const harga = $(a).find('div.bl-product-card__description-price > p').text().trim()
                const rating = $(a).find('div.bl-product-card__description-rating > p').text().trim()
                const terjual = $(a).find('div.bl-product-card__description-rating-and-sold > p').text().trim()

                const dari = $(a).find('div.bl-product-card__description-store > span:nth-child(1)').text().trim()
                const seller = $(a).find('div.bl-product-card__description-store > span > a').text().trim()
                const link_sel = $(a).find('div.bl-product-card__description-store > span > a').attr('href')

                const res_ = {
                    title: title,
                    rating: rating ? rating: 'No rating yet',
                    terjual: terjual ? terjual: 'Not yet bought',
                    harga: harga,
                    image: img,
                    link: link,
                    store: {
                        lokasi: dari,
                        nama: seller,
                        link: link_sel
                    }
                }

                dat.push(res_)
            })
            if (dat.every(x => x === undefined)) return resolve({
                developer: '@xorizn', mess: 'no result found'
            })
            resolve(dat)
        } catch (err) {
            console.error(err)
            return []
        }
    })
}

async function ssweb(url = '', full = false, type = 'desktop') {
    type = type.toLowerCase()
    if (!['desktop', 'tablet', 'phone'].includes(type)) type = 'desktop'
    let form = new URLSearchParams()
    form.append('url', url)
    form.append('device', type)
    if (!!full) form.append('full', 'on')
    form.append('cacheLimit', 0)
    let res = await axios({
        url: 'https://www.screenshotmachine.com/capture.php',
        method: 'post',
        data: form
    })
    let cookies = res.headers['set-cookie']
    let buffer = await axios({
        url: 'https://www.screenshotmachine.com/' + res.data.link,
        headers: {
            'cookie': cookies.join('')
        },
        responseType: 'arraybuffer'
    })
    return Buffer.from(buffer.data)
}

async function tiktok(url) {
    const base = await axios.get('https://ttsave.app/download-tiktok-slide')
    const key = base.data.split('https://ttsave.app/download?mode=slide&key=')[1].split(`',`)[0]
    try {
        const { data, status } = await axios.post(`https://ttsave.app/download?mode=slide&key=${key}`, {
            id: url
        })
        const $ = cheerio.load(data)
        const result = {
            status,
            name: $('div > div > h2').text().trim(),
            playCount: $('div').find('div.flex.flex-row.items-center.justify-center.gap-2.mt-2 > div:nth-child(1) > span').text(),
            likeCount: $('div').find('div.flex.flex-row.items-center.justify-center.gap-2.mt-2 > div:nth-child(2) > span').text(),
            commentCount: $('div').find('div.flex.flex-row.items-center.justify-center.gap-2.mt-2 > div:nth-child(3) > span').text(),
            shareCount: $('div').find('div.flex.flex-row.items-center.justify-center.gap-2.mt-2 > div:nth-child(4) > span').text(),
            isSlide: $('div').text().includes('WITH WATERMARK') ? false : true
        }
        if (result.isSlide) {
            result.download = {
                music: `https://sf16-ies-music.tiktokcdn.com/obj/ies-music-aiso/${$('div').find('#unique-id').attr('value').split('-')[1]}.mp3`,
                image: []
            }
            $('#button-download-ready > a').each(function () {
                result.download.image.push($(this).attr('href'))
            })
        } else {
            result.download = {
                wm: $('#button-download-ready > a:nth-child(2)').attr('href'),
                nowm: $('#button-download-ready > a:nth-child(1)').attr('href'),
                music: $('#button-download-ready > a:nth-child(3)').attr('href')
            }
        }
        return (result)
    } catch (e) {
        if (e.response.status == 404) return ({ 
            status: e.response.status,
            message: 'Video not found!'
        })
    }
}

const otakudesu = {
    search: async title => {
        return new Promise((resolve, reject) => {
            axios({
                url: `https://otakudesu.cloud/?s=${title}&post_type=anime`,
                method: 'GET',
                headers: {
                    "user-agent": "Mozilla/5.0 (Linux Android 10 RMX2020) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Mobile Safari/537.36"
                }
            }).then(({ data }) => {
                const $ = cheerio.load(data)
                const searchResults = []

                $('.chivsrc li').each((index, element) => {
                    const title = $(element).find('h2 > a').text()
                    const link = $(element).find('h2 > a').attr('href')
                    const image = $(element).find('img').attr('src')
                    const genres = []
                    $(element).find('.set:contains("Genres") a').each((i, el) => {
                        genres.push($(el).text())
                    })
                    const status = $(element).find('.set:contains("Status")').text().split(':')[1].trim()
                    const rating = $(element).find('.set:contains("Rating")').text().split(':')[1]?.trim() || 'N/A'

                    searchResults.push({ title, link, image, genres, status, rating })
                })

                resolve(searchResults)
            }).catch(error => {
                reject(error)
            })
        })
    },
    detail: async url => {
        return new Promise((resolve, reject) => {
            axios({
                url,
                method: 'GET',
                headers: {
                    "user-agent": "Mozilla/5.0 (Linux Android 10 RMX2020) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Mobile Safari/537.36"
                }
            }).then(({ data }) => {
                let $ = cheerio.load(data)
                let link_eps = []
                $('#venkonten > div.venser > div.episodelist > ul > li').each(function (a, b) {
                    link_eps.push({
                        episode: $(b).find('span > a').text(), upload_at: $(b).find('span.zeebr').text(), link: $(b).find('span > a').attr('href')
                    })
                })
                let hasil = {
                    title: {
                        indonesia: $('#venkonten > div.venser > div.jdlrx > h1').text(),
                        anonym: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(1) > span').text().replace('Judul: ', ''),
                        japanese: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(2) > span').text().replace('Japanese: ', '')
                    },
                    thumbnail: $('.fotoanime > img').attr("src"),
                    score: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(3) > span').text().replace('Skor: ', ''),
                    producer: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(4) > span').text().replace('Produser: ', ''),
                    type: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(5) > span').text().replace('Tipe: ', ''),
                    status: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(6) > span').text().replace('Status: ', ''),
                    total_eps: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(7) > span').text().replace('Total Episode: ', ''),
                    duration: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(8) > span').text().replace('Durasi: ', ''),
                    release: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(9) > span').text().replace('Tanggal Rilis: ', ''),
                    studio: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(10) > span').text().replace('Studio: ', ''),
                    genre: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(11) > span').text().replace('Genre: ', ''),
                    synopsis: $('#venkonten > div.venser > div.fotoanime > div.sinopc > p').text(),
                    link_eps: link_eps
                }
                resolve(hasil)
            })
        })
    },
    download: async url => {
        return new Promise((resolve, reject) => {
            axios({
                url,
                method: 'GET',
                headers: {
                    "user-agent": "Mozilla/5.0 (Linux Android 10 RMX2020) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Mobile Safari/537.36"
                }
            }).then(({ data }) => {
                let $ = cheerio.load(data)
                let mp4 = []
                $('#venkonten > div.venser > div.venutama > div.download > ul:nth-child(2) > li').each(function (a, b) {
                    $(b).find('a').each(function (c, d) {
                        mp4.push({
                            resolusi: $(b).find('strong').text(), size: $(b).find('i').text(), type: $(d).text(), link: $(d).attr('href')
                        })
                    })
                })
                let mkv = []
                $('#venkonten > div.venser > div.venutama > div.download > ul:nth-child(3) > li').each(function (a, b) {
                    $(b).find('a').each(function (c, d) {
                        mkv.push({
                            resolusi: $(b).find('strong').text(), size: $(b).find('i').text(), type: $(d).text(), link: $(d).attr('href')
                        })
                    })
                })
                let hasil = {
                    title: $('#venkonten > div.venser > div.venutama > h1').text(),
                    post: $('#venkonten > div.venser > div.venutama > div.kategoz > span:nth-child(2)').text().replace('Posted by ', ''),
                    release: $('#venkonten > div.venser > div.venutama > div.kategoz > span:nth-child(4)').text().replace('Release on ', ''),
                    credit: $('#venkonten > div.venser > div.cukder > div.infozin > div > p:nth-child(1)').text().replace('Credit: ', ''),
                    encoder: $('#venkonten > div.venser > div.cukder > div.infozin > div > p:nth-child(2)').text().replace('Encoder: ', ''),
                    genres: $('#venkonten > div.venser > div.cukder > div.infozin > div > p:nth-child(3)').text().replace('Genres: ', ''),
                    duration: $('#venkonten > div.venser > div.cukder > div.infozin > div > p:nth-child(4)').text().replace('Duration: ', ''),
                    type: $('#venkonten > div.venser > div.cukder > div.infozin > div > p:nth-child(5)').text().replace('Tipe: ', ''),
                    image: $('#venkonten > div.venser > div.cukder > img').attr('src'),
                    link_mp4: mp4,
                    link_mkv: mkv
                }
                resolve(hasil)
            })
        })
    }, 
    ongoing: async () => {
        return new Promise((resolve, reject) => {
            axios({
                url: 'https://otakudesu.cloud/ongoing-anime/',
                method: 'GET',
                headers: {
                    "user-agent": "Mozilla/5.0 (Linux Android 10 RMX2020) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Mobile Safari/537.36"
                }
            }).then(({ data }) => {
                const $ = cheerio.load(data)

                const ongoingList = []

                $('.venz ul li').each((index, element) => {
                    const episode = $(element).find('.epz').text().trim()
                    const day = $(element).find('.epztipe').text().trim()
                    const date = $(element).find('.newnime').text().trim()
                    const title = $(element).find('.jdlflm').text().trim()
                    const link = $(element).find('.thumb a').attr('href')
                    const image = $(element).find('.thumbz img').attr('src')

                    ongoingList.push({ episode, day, date, title, link, image })
                })

                resolve(ongoingList)
            }).catch(error => {
                reject(error)
            })
        })
    }
}

async function anime(q) {
    return new Promise((resolve, reject) => {
        axios.get('https://myanimelist.net/anime.php?cat=anime&q='+q)
        .then((get) => {
            let $ = cheerio.load(get.data)
            let anime = []
            $('#content > div.js-categories-seasonal.js-block-list.list > table > tbody > tr').each(function (a, b) {
                anime.push($(b).find('td:nth-child(1) > div > a').attr('href') || '')
            })
            axios.get(anime[0] ? anime[0] : anime[1])
            .then((res) => {
                let $$ = cheerio.load(res.data)
                let related = []
                $$('#content > table > tbody > tr > td:nth-child(2) > div.js-scrollfix-bottom-rel > table > tbody > tr:nth-child(3) > td > table > tbody > tr').each(function (a, b) {
                    related.push({
                        type: $$(b).find('td:nth-child(1)').text(), name: $$(b).find('td:nth-child(2)').text()
                    })
                })
                let character = []
                $$('#content > table > tbody > tr > td:nth-child(2) > div > table > tbody > tr:nth-child(3) > td > div.detail-characters-list.clearfix').eq(0).find('table').each(function (a, b) {
                    character.push({
                        character: {
                            name: $$(b).find('tbody > tr > td:nth-child(2) > h3').text(),
                            status: $$(b).find('tbody > tr > td:nth-child(2) > div > small').text(),
                            detail: $$(b).find('tbody > tr > td:nth-child(2) > h3 > a').attr('href'),
                            image: $$(b).find('tbody > tr > td.ac.borderClass > div > a > img').attr('data-src') || $$(b).find('tbody > tr > td.ac.borderClass > div > a > img').attr('src')
                        },
                        voice_actor: {
                            name: $$(b).find('tbody > tr > td:nth-child(3) > table > tbody > tr > td.va-t.ar.pl4.pr4 > a').text(),
                            origin: $$(b).find('tbody > tr > td:nth-child(3) > table > tbody > tr > td.va-t.ar.pl4.pr4 > small').text(),
                            detail: $$(b).find('tbody > tr > td:nth-child(3) > table > tbody > tr > td.va-t.ar.pl4.pr4 > a').attr('href'),
                            image: $$(b).find('table > tbody > tr > td:nth-child(2) > div > a > img').attr('data-src') || $$(b).find('table > tbody > tr > td:nth-child(2) > div > a > img').attr('src')
                        }
                    })
                })
                let staff = []
                $$('#content > table > tbody > tr > td:nth-child(2) > div > table > tbody > tr:nth-child(3) > td > div.detail-characters-list.clearfix').eq(1).find('table').each(function (a, b) {
                    staff.push({
                        name: $$(b).find('tbody > tr > td:nth-child(2) > a').text(),
                        status: $$(b).find('tbody > tr > td:nth-child(2) > div > small').text(),
                        detail: $$(b).find('tbody > tr > td:nth-child(2) > a').attr('href'),
                        image: $$(b).find('tbody > tr > td.ac.borderClass > div > a > img').attr('data-src') || $$(b).find('tbody > tr > td.ac.borderClass > div > a > img').attr('src')
                    })
                })
                let info = []
                $$('#content > table > tbody > tr > td.borderClass > div > div.spaceit_pad').each(function (a, b) {
                    info.push({
                        type: $$(b).text().split(':')[0].trim().split('\n')[0] || $$(b).text().split(':')[0].trim() || '', result: $$(b).text().split(':')[1].trim().split('\n')[0] || $$(b).text().split(':')[1].trim() || ''
                    })
                })
                let hasil = {
                    title: $$('#contentWrapper > div:nth-child(1) > div > div.h1-title > div > h1').text(),
                    info: info,
                    image: $$('#content > table > tbody > tr > td.borderClass > div > div:nth-child(1) > a > img').attr('data-src') || $$('#content > table > tbody > tr > td.borderClass > div > div:nth-child(1) > a > img').attr('src'),
                    trailer: $$('div.anime-detail-header-video.di-tc.va-t.pl16 > div.video-promotion > a').attr('href'),
                    synopsis: $$('#content > table > tbody > tr > td:nth-child(2) > div > table > tbody > tr:nth-child(1) > td > p').text(),
                    related,
                    character,
                    staff
                }
                resolve(hasil)
            })
        })
    })
}

async function manga(q) {
    return new Promise((resolve, reject) => {
        axios.get('https://myanimelist.net/manga.php?cat=manga&q='+q)
        .then((get) => {
            let $ = cheerio.load(get.data)
            let manga = []
            $('#content > div.js-categories-seasonal.js-block-list.list > table > tbody > tr').each(function (a, b) {
                manga.push($(b).find('td:nth-child(2) > a').attr('href') || '')
            })
            axios.get(manga[0] ? manga[0] : manga[1])
            .then((res)=> {
                let $$ = cheerio.load(res.data)
                let related = []
                $$('#content > table > tbody > tr > td:nth-child(2) > div.js-scrollfix-bottom-rel > table > tbody > tr:nth-child(3) > td > table > tbody > tr').each(function (a, b) {
                    related.push({
                        type: $$(b).find('td:nth-child(1)').text(), name: $$(b).find('td:nth-child(2) > a').text(), url: 'https://myanimelist.net'+$$(b).find('td:nth-child(2) > a').attr('href')
                    })
                })
                let info = []
                $$('#content > table > tbody > tr > td.borderClass > div > div.spaceit_pad').each(function (a, b) {
                    info.push({
                        type: $$(b).text().split(':')[0].trim() || '', result: $$(b).text().split(':')[1].trim()
                    })
                })
                let character = []
                $$('#content > table > tbody > tr > td:nth-child(2) > div.js-scrollfix-bottom-rel > table > tbody > tr:nth-child(3) > td > div.detail-characters-list.clearfix > div.left-column.fl-l.divider > table').each(function (a, b) {
                    character.push({
                        character: {
                            name: $$(b).find('tbody > tr > td:nth-child(2) > a').text(),
                            status: $$(b).find('tbody > tr > td:nth-child(2) > div > small').text().trim(),
                            detail: $$(b).find('tbody > tr > td:nth-child(2) > a').attr('href'),
                            image: $$(b).find('tbody > tr > td.ac.borderClass > div > a > img').attr('data-src') || $$(b).find('tbody > tr > td.ac.borderClass > div > a > img').attr('src')
                        }
                    })
                })
                let hasil = {
                    title: $$('#contentWrapper > div:nth-child(1) > h1').text().trim(),
                    info: info,
                    image: $$('#content > table > tbody > tr > td.borderClass > div > div:nth-child(1) > a > img').attr('data-src') || $$('#content > table > tbody > tr > td.borderClass > div > div:nth-child(1) > a > img').attr('src'),
                    synopsis: $$('#content > table > tbody > tr > td:nth-child(2) > div.js-scrollfix-bottom-rel > table > tbody > tr:nth-child(1) > td > span').text(),
                    related,
                    character
                }
                resolve(hasil)
            })
        })
    })
}

async function character(q) {
    return new Promise((resolve, reject) => {
        axios.get('https://myanimelist.net/character.php?cat=character&q='+q)
        .then((get) => {
            let $ = cheerio.load(get.data)
            let character = []
            $('#content > table > tbody > tr').each(function (a, b) {
                character.push($(b).find('td:nth-child(2) > a').attr('href'))
            })
            axios.get(character[0])
            .then((res) => {
                let $$ = cheerio.load(res.data)
                let voice = []
                $$('#content > table > tbody > tr > td:nth-child(2) > table').each(function (a, b) {
                    voice.push({
                        name: $$(b).find('td:nth-child(2) > a').text(), origin: $$(b).find('td:nth-child(2) > div > small').text(), detail: $$(b).find('td:nth-child(2) > a').attr('href'), image: $$(b).find('td:nth-child(1) > div > a > img').attr('data-src') || $$(b).find('td:nth-child(1) > div > a > img').attr('src')
                    })
                })
                let animeography = []
                $$('#content > table > tbody > tr > td.borderClass > table:nth-child(6) > tbody > tr').each(function (a, b) {
                    animeography.push({
                        name: $$(b).find('td:nth-child(2) > a').text(), status: $$(b).find('td:nth-child(2) > div > small').text(), detail: $$(b).find('td:nth-child(2) > a').attr('href'), image: $$(b).find('td:nth-child(1) > div > a > img').attr('data-src') || $$(b).find('td:nth-child(1) > div > a > img').attr('src')
                    })
                })
                let mangaography = []
                $$('#content > table > tbody > tr > td.borderClass > table:nth-child(9) > tbody > tr').each(function (a, b) {
                    mangaography.push({
                        name: $$(b).find('td:nth-child(2) > a').text(), status: $$(b).find('td:nth-child(2) > div > small').text(), detail: $$(b).find('td:nth-child(2) > a').attr('href'), image: $$(b).find('td:nth-child(1) > div > a > img').attr('data-src') || $$(b).find('td:nth-child(1) > div > a > img').attr('src')
                    })
                })
                let hasil = {
                    name: $$('#contentWrapper > div:nth-child(1) > div > div.h1-title > h1').text(),
                    image: $$('#content > table > tbody > tr > td.borderClass > div:nth-child(1) > a > img').attr('data-src') || $$('#content > table > tbody > tr > td.borderClass > div:nth-child(1) > a > img').attr('src'),
                    detail: $$('#content > table > tbody > tr > td:nth-child(2)').text().split('Characters')[1].split('Voice Actors')[0].trim(),
                    voice_actor: voice,
                    animeography,
                    mangaography
                }
                resolve(hasil)
            })
        })
    })
}

async function topAnime(type = 'anime') {
    return new Promise((resolve, reject) => {
                                                                                                                   
        axios.get('https://myanimelist.net/topanime.php?type='+type)
        .then(({ data }) => {
            let $ = cheerio.load(data)
            let hasil = []
            $('tr.ranking-list').each(function (a, b) {
                hasil.push({
                    rank: $(b).find('td.rank.ac > span').text(),
                    title: $(b).find('td.title.al.va-t.word-break > div > div.di-ib.clearfix > h3').text(),
                    info: $(b).find('td.title.al.va-t.word-break > div > div.information.di-ib.mt4').text().trim(),
                    rating: $(b).find('td.score.ac.fs14 > div').text(),
                    detail: $(b).find('td.title.al.va-t.word-break > div > div.di-ib.clearfix > h3 > a').attr('href'),
                    image: $(b).find('td.title.al.va-t.word-break > a > img').attr('data-src') || $(b).find('td.title.al.va-t.word-break > a > img').attr('src')
                })
            })
            resolve(hasil)
        })
    })
}

async function topManga(type = 'manga') {
                                                                                                                            
    return new Promise((resolve, reject) => {
        axios.get('https://myanimelist.net/topmanga.php?type='+type)
        .then(({ data }) => {
            let $ = cheerio.load(data)
            let hasil = []
            $('tr.ranking-list').each(function (a, b) {
                hasil.push({
                    rank: $(b).find('td.rank.ac > span').text(),
                    title: $(b).find('td.title.al.va-t.clearfix.word-break > div > h3').text(),
                    info: $(b).find('td.title.al.va-t.clearfix.word-break > div > div.information.di-ib.mt4').text().trim(),
                    rating: $(b).find('td.score.ac.fs14 > div').text(),
                    detail: $(b).find('td.title.al.va-t.clearfix.word-break > div > h3 > a').attr('href'),
                    image: $(b).find('td.title.al.va-t.clearfix.word-break > a > img').attr('data-src') || $(b).find('td.title.al.va-t.clearfix.word-break > a > img').attr('src')
                })
            })
            resolve(hasil)
        })
    })
}

async function processing(urlPath, method) {
    return new Promise(async (resolve, reject) => {
        let Methods = ["enhance", "recolor", "dehaze"]
        Methods.includes(method) ? (method = method): (method = Methods[0])
        let buffer,
        Form = new FormData(),
        scheme = "https://inferenceengine.vyro.ai/" + method
        Form.append("model_version", 1, {
            "Content-Transfer-Encoding": "binary",
            contentType: "multipart/form-data; charset=uttf-8"
        })

        Form.append("image", Buffer.from(urlPath), {
            filename: new Date() + '.jpg',
            contentType: "image/jpeg"
        })

        Form.submit(
            {
                url: scheme,
                host: "inferenceengine.vyro.ai",
                path: "/" + method,
                protocol: "https:",
                headers: {
                    "User-Agent": "okhttp/4.9.3",
                    Connection: "Keep-Alive",
                    "Accept-Encoding": "gzip"
                }
            },
            function (err, res) {
                if (err) reject()
                let data = []
                res.on("data", function (chunk, resp) {
                    data.push(chunk)
                }).on("end", () => {
                    resolve(Buffer.concat(data))
                })
                res.on("error", (e) => {
                    resolve()
                })
            }
        )
    })
}

async function simi(yourMessage, langCode) {
    const res = await axios.post('https://api.simsimi.vn/v2/simtalk',
        new URLSearchParams({
            'text': yourMessage,
            'lc': langCode
        })
    )
    if (res.status > 200)
        throw new Error(res.data.success);
    return res.data.message;
}

async function jadwalTV(name) {
    let list = JSON.parse(fs.readFileSync('./json/jadwaltv.json', 'utf-8'))
    let data = list.find((v) => (new RegExp(name, 'gi')).test(v.channel)), result = []
    if (!data) throw 'List Channel Yg Tersedia:\n\n' + list.map(v => v.channel).sort().join('\n')
    let html = (await axios.get(`https://www.jadwaltv.net/${data.isPay ? 'jadwal-pay-tv/' : ''}${data.value}`)).data
    let $ = cheerio.load(html)
    $('div > table.table').find('tbody > tr').slice(1).each(function () {
        let jam = $(this).find('td').eq(0).text()
        let acara = $(this).find('td').eq(1).text()
        if (!/Jadwal TV/gi.test(acara) && !/Acara/gi.test(acara)) result.push({ jam, acara })
    })
    return { channel: data.channel.toUpperCase(), result }
}

async function kodepos(kota) {
    return new Promise(async (resolve, reject) => {
        let postalcode = 'https://carikodepos.com/';
        let url = postalcode+'?s='+kota;
        await request.get({
            headers: {
                'Accept': 'application/json, text/javascript, */*;',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4209.3 Mobile Safari/537.36',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
                'Origin': postalcode,
                'Referer': postalcode
            }, url: url, }, function(error, response, body) {
            if (error) return reject(error);
            let $ = cheerio.load(body);
            var search = $('tr');
            if (!search.length) return reject('No result could be found');
            var results = [];
            search.each(function(i) {
                if (i != 0) {
                    var td = $(this).find('td');
                    var result = {};
                    td.each(function(i) {
                        var value = $(this).find('a').html();
                        var key = (i == 0) ? 'province': (i == 1) ? 'city': (i == 2) ? 'subdistrict': (i == 3) ? 'urban': 'postalcode';
                        result[key] = value;
                    })
                    results.push(result);
                }
            })
            return resolve(results);
        })
    })
}


function tts(text, lang = 'id') {
  return new Promise((resolve, reject) => {
    try {
      let tts = gtts(lang)
      let filePath = join(global.__dirname(import.meta.url), '../tmp', (1 * new Date) + '.wav')
      tts.save(filePath, text, () => {
        resolve(fs.readFileSync(filePath))
      })
    } catch (e) { reject(e) }
  })
}

async function checkWeb(url) {
    let res = await (await fetch('https://trustpositif.kominfo.go.id/Rest_server/getrecordsname_home', {
        agent: new https.Agent({ rejectUnauthorized: false }),
        method: 'post',
        body: new URLSearchParams(Object.entries({ name: url.join('%0A') }))
    })).json()
    return res.values
}

async function distance(dari, ke) {
    var html = (await axios(`https://www.google.com/search?q=${encodeURIComponent('jarak ' + dari + ' ke ' + ke)}&hl=id`)).data
    var $ = cheerio.load(html), obj = {}
    var img = html.split("var s=\'")?.[1]?.split("\'")?.[0]
    obj.img = /^data:.*?\/.*?;base64,/i.test(img) ? Buffer.from(img.split`,` [1], 'base64') : ''
    obj.desc = $('div.BNeawe.deIvCb.AP7Wnd').text()?.trim()
    return obj
}

function happymod(query) {
    return new Promise((resolve, reject) => {
        axios.get(`https://www.happymod.com/search.html?q=${query}`).then(async tod => {
            const $ = cheerio.load(tod.data)
            let hasil = []
            $("div.pdt-app-box").each(function(c, d) {
                let name = $(d).find("a").text().trim();
                let icon = $(d).find("img.lazy").attr('data-original');
                let link = $(d).find("a").attr('href');
                let link2 = `https://www.happymod.com${link}`
                const Data = {
                    icon: icon,
                    name: name,
                    link: link2
                }
                hasil.push(Data)
            })
            resolve(hasil);
        }).catch(reject)
    })
}

const sfile = {
    search: async (query, page = 1) => {
        let res = await fetch(`https://sfile.mobi/search.php?q=${query}&page=${page}`)
        let $ = cheerio.load(await res.text()), arr = []
        $('div.list').each((idx, el) => {
            let title = $(el).find('a').text(),
                size = $(el).text().trim().split(' (')[1],
                link = $(el).find('a').attr('href')
            if (link) arr.push({ title, size: size.replace(')', ''), link })
        })
        return arr
    },
    download: async url => {
        let res = await fetch(url)
        let $ = cheerio.load(await res.text()), obj = {}
        obj.filename = $('meta[property="og:title"]').attr('content').replace(' ', '')
        obj.mimetype = $('div.list').text().split(' - ')[1].split('\n')[0]
        obj.filesize = $('#download').text().replace(/Download File/g, '').replace(/\(|\)/g, '').trim()
        obj.download = await getLink(url)
        return obj
    }
}

async function getLink(url) {
    let link = url.split('mobi/')[1]
    let { data } = await axios.get('https://sfile.mobi/download/' + link)
    let $ = cheerio.load(data)
    let download = $('a#download').attr('href')
    return download
}

async function fakechat(text, name, avatar, url = false) {
    let body1 = {
        "type": "quote",
        "format": "png",
        "backgroundColor": "#FFFFFF",
        "width": 512,
        "height": 768,
        "scale": 2,
        "messages": [{
            "entities": [],
            "media": {
                "url": url
            },
            "avatar": true,
            "from": {
                "id": 1,
                "name": name,
                "photo": {
                    "url": avatar
                }
            },
            "text": text,
            "replyMessage": {}
        }]
    }

    let body2 = {
        "type": "quote",
        "format": "webp",
        "backgroundColor": "#FFFFFF",
        "width": 512,
        "height": 512,
        "scale": 2,
        "messages": [{
            "avatar": true,
            "from": {
                "first_name": name,
                "language_code": "en",
                "name": name,
                "photo": {
                    "url": avatar
                }
            },
            "text": text,
            "replyMessage": {}
        }]
    }

    let { data } = await axios.post('https://bot.lyo.su/quote/generate', url ? body1: body2)
    return Buffer.from(data.result.image, "base64")
}

async function facebook(url) {
    if (!/facebook\.\w+\/(reel|watch|share)/gi.test(url)) {
        throw new Error("Invalid URL, Enter A Valid Facebook Video URL")
    }

    try {
        const response = await axios.get("https://fdownloader.net/id", {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
            },
        })

        const html = response.data
        const exMatch = html.match(/k_exp ?= ?"(\d+)"/i)
        const toMatch = html.match(/k_token ?= ?"([a-f0-9]+)"/i)
        const ex = exMatch ? exMatch[1] : null
        const to = toMatch ? toMatch[1] : null

        if (!ex || !to) {
            throw new Error("Error Extracting Exp And Token")
        }

        const searchResponse = await axios.post(
            "https://v3.fdownloader.net/api/ajaxSearch?lang=id",
            new URLSearchParams({
                k_exp: ex,
                k_token: to,
                q: url,
                lang: "id",
                web: "fdownloader.net",
                v: "v2",
                w: "",
            }),
            {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
                    origin: "https://fdownloader.net",
                },
            }
        )

        const data = searchResponse.data
        if (data.status !== "ok") {
            throw new Error("Failed Doing Ajax Search")
        }

        const $ = cheerio.load(data.data)
        const details = {
            title: $(".thumbnail > .content > .clearfix > h3").text().trim(),
            duration: $(".thumbnail > .content > .clearfix > p").text().trim(),
            thumbnail: $(".thumbnail > .image-fb > img").attr("src") || "",
            media: $("#popup_play > .popup-body > .popup-content > #vid").attr("src") || "",
            video: $("#fbdownloader").find(".tab__content").eq(0).find("tr").map((i, el) => {
                const quality = $(el).find(".video-quality").text().trim()
                const url = $(el).find("a").attr("href") || $(el).find("button").attr("data-videourl") || null

                return url && url !== "#note_convert" ? { quality, url } : null
            }).get().filter(Boolean),
            music: $("#fbdownloader").find("#audioUrl").attr("value") || "",
        }
        return details
    } catch (error) {
        throw error
    }
}

async function pinterest(query) {
    if (query.startsWith('https')) {
        try {
                                               
            const downloadLink = await getDownloadLink(query)
            return downloadLink
        } catch (error) {
            console.error('Error fetching the download link:', error)
            return null
        }
    } else {
        try {
                                                           
            const res = await fetch(`https://api.siputzx.my.id/api/s/pinterest?query=${query}`)
            const json = await res.json()
            if (!json.data || json.data.length === 0) {
                throw new Error(`Query "${query}" not found :/`)
            }
            const gambarUrl = json.data[0].images_url                                    
            const downloadLink = await getDownloadLink(gambarUrl)                                    
            return downloadLink
        } catch (error) {
            console.error('Error fetching Pinterest data:', error)
            return null
        }
    }
    
                                                             
    async function getDownloadLink(imageUrl) {
        try {
                                                              
            const response = await axios.get(`https://www.savepin.app/download.php?url=${imageUrl}`)
            const html = response.data
            const $ = cheerio.load(html)
            const downloadLink = $('#submiturl').attr('href')
            return downloadLink.startsWith("force-save.php?url=") 
                ? decodeURIComponent(downloadLink.replace("force-save.php?url=", "")) 
                : downloadLink
        } catch (error) {
            console.error('Error fetching the download link:', error)
            return null
        }
    }
}


function wallpaper(title, page = '1') {
    return new Promise((resolve, reject) => {
        axios.get(`https://www.besthdwallpaper.com/search?CurrentPage=${page}&q=${title}`)
        .then(({ data }) => {
            let $ = cheerio.load(data)
            let hasil = []
            $('div.grid-item').each(function (a, b) {
                hasil.push({
                    title: $(b).find('div.info > a > h3').text(),
                    type: $(b).find('div.info > a:nth-child(2)').text(),
                    image: [$(b).find('picture > img').attr('data-src') || $(b).find('picture > img').attr('src'), $(b).find('picture > source:nth-child(1)').attr('srcset'), $(b).find('picture > source:nth-child(2)').attr('srcset')]
                })
            })
            resolve(hasil)
        })
    })
}

const spesifikasi = {
    search: async query => {
        return new Promise((resolve, reject) => {
            let result = axios.get('https://carisinyal.com/hp/?_sf_s=' + query).then(v => {
                let $ = cheerio.load(v.data)
                let list = $("div.oxy-posts > div.oxy-post")
                let index = []
                list.each((v, i) => {
                    let title = $(i).find("a.oxy-post-title").text()
                    let harga = $(i).find("div.harga").text()
                    let link = $(i).find("a.oxy-post-image").attr('href')
                    let res = {
                        title: title,
                        harga: harga,
                        link: link
                    }
                    index.push(res)
                })
                return index
            })
            resolve(result)
        })
    },
    detail: async link => {
        return new Promise((resolve, reject) => {
            let result = axios.get(link).then(v => {
                let $ = cheerio.load(v.data)
                let spesifikasi = []
                let unggulan = []
                let image = $("meta[name='twitter:image']").attr('content')
                $("div#_dynamic_list-777-114924 > div.ct-div-block").each((v, i) => {
                    unggulan.push($(i).find("span.ct-span").text())
                })
                $("div > table.box-info").each((v, i) => {
                    let name = $(i).find("tr.box-baris > td.kolom-satu").text().trim().split("  ")
                    let fitur = $(i).find("tr.box-baris > td.kolom-dua").text().trim().split("  ")

                    for (let i = 0; i < fitur.length; i++) {
                        spesifikasi.push({
                            name: name[i],
                            fitur: fitur[i]
                        })
                    }
                })
                return {
                    image: image,
                    unggulan: unggulan,
                    fitur: spesifikasi,
                }
            })
            resolve(result)
        })
    }
}

function hoax() {
    return new Promise((resolve, reject) => {
        axios.get(`https://turnbackhoax.id/`).then(tod => {
            const $ = cheerio.load(tod.data)
            let hasil = []
            $("figure.mh-loop-thumb").each(function(a, b) {
                $("div.mh-loop-content.mh-clearfix").each(function(c, d) {
                    let link = $(d).find("h3.entry-title.mh-loop-title > a").attr('href')
                    let img = $(b).find("img.attachment-mh-magazine-lite-medium.size-mh-magazine-lite-medium.wp-post-image").attr('src')
                    let title = $(d).find("h3.entry-title.mh-loop-title > a").text().trim()
                    let desc = $(d).find("div.mh-excerpt > p").text().trim()
                    let date = $(d).find("span.mh-meta-date.updated").text().trim()
                    const Data = {
                        title: title,
                        thumbnail: img,
                        desc: desc,
                        date: date,
                        link: link
                    }
                    hasil.push(Data)
                })
            })
            resolve(hasil)
        }).catch(reject)
    })
}

async function soundcloud(link) {
    return new Promise((resolve, reject) => {
        const options = {
            method: 'POST',
            url: "https://www.klickaud.co/download.php",
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            formData: {
                'value': link,
                '2311a6d881b099dc3820600739d52e64a1e6dcfe55097b5c7c649088c4e50c37': '710c08f2ba36bd969d1cbc68f59797421fcf90ca7cd398f78d67dfd8c3e554e3'
            }
        }

        request(options, async function (error, response, body) {
            if (error) throw new Error(error)
            const $ = cheerio.load(body)
            resolve({
                judul: $('#header > div > div > div.col-lg-8 > div > table > tbody > tr > td:nth-child(2)').text(),
                download_count: $('#header > div > div > div.col-lg-8 > div > table > tbody > tr > td:nth-child(3)').text(),
                thumb: $('#header > div > div > div.col-lg-8 > div > table > tbody > tr > td:nth-child(1) > img').attr('src'),
                link: $('#dlMP3').attr('onclick').split(`downloadFile('`)[1].split(`',`)[0]
            })
        })
    })
}

async function cerpen(category) {
    return new Promise((resolve, reject) => {
        let title = category.toLowerCase().replace(/[()*]/g, "")
        let judul = title.replace(/\s/g, "-")
        let page = Math.floor(Math.random() * 5)
        axios.get('http://cerpenmu.com/category/cerpen-'+judul+'/page/'+page)
        .then((get) => {
            let $ = cheerio.load(get.data)
            let link = []
            $('article.post').each(function (a, b) {
                link.push($(b).find('a').attr('href'))
            })
            let random = link[Math.floor(Math.random() * link.length)]
            axios.get(random)
            .then((res) => {
                let $$ = cheerio.load(res.data)
                let hasil = {
                    title: $$('#content > article > h1').text(),
                    author: $$('#content > article').text().split('Cerpen Karangan: ')[1].split('Kategori: ')[0],
                    kategori: $$('#content > article').text().split('Kategori: ')[1].split('\n')[0],
                    lolos: $$('#content > article').text().split('Lolos moderasi pada: ')[1].split('\n')[0],
                    cerita: $$('#content > article > p').text()
                }
                resolve(hasil)
            })
        })
    })
}

async function wikipedia(query) {
    const res = await axios.get(`https://id.m.wikipedia.org/wiki/${query}`)
    const $ = cheerio.load(res.data)
    const hasil = []
    let wiki = $('#mf-section-0').find('p').text()
    let thumb = $('meta[property="og:image"]').attr('content')
    hasil.push({
        wiki, thumb
    })
    return hasil
}

const resep = {
    search: async query => {
        return new Promise(async(resolve, reject) => {
            axios.get('https://resepkoki.id/?s=' + query).then(({ data }) => {
                let $ = cheerio.load(data)
                let link = []
                let judul = []
                let upload_date = []
                let format = []
                let thumb = []
                $('body > div.all-wrapper.with-animations > div:nth-child(5) > div > div.archive-posts.masonry-grid-w.per-row-2 > div.masonry-grid > div > article > div > div.archive-item-media > a').each(function(a, b) {
                    link.push($(b).attr('href'))
                })
                $('body > div.all-wrapper.with-animations > div:nth-child(5) > div > div.archive-posts.masonry-grid-w.per-row-2 > div.masonry-grid > div > article > div > div.archive-item-content > header > h3 > a').each(function(c, d) {
                    let jud = $(d).text()
                    judul.push(jud)
                })
                for (let i = 0; i < link.length; i++) {
                    format.push({
                        judul: judul[i],
                        link: link[i]
                    })
                }
                let result = {
                    creator: 'Fajar Ihsana',
                    data: format.filter(v => v.link.startsWith('https://resepkoki.id/resep'))
                }
                resolve(result)
            }).catch(reject)
        })
    },
    detail: async link => {
        return new Promise(async(resolve, reject) => {
            axios.get(link).then(({ data }) => {
                let $ = cheerio.load(data)
                let abahan = []
                let atakaran = []
                let atahap = []
                $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-recipe-ingredients-nutritions > div > table > tbody > tr > td:nth-child(2) > span.ingredient-name').each(function(a, b) {
                    let bh = $(b).text()
                    abahan.push(bh)
                })
                $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-recipe-ingredients-nutritions > div > table > tbody > tr > td:nth-child(2) > span.ingredient-amount').each(function(c, d) {
                    let uk = $(d).text()
                    atakaran.push(uk)
                })
                $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-content > div.single-steps > table > tbody > tr > td.single-step-description > div > p').each(function(e, f) {
                    let th = $(f).text()
                    atahap.push(th)
                })
                let judul = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-title.title-hide-in-desktop > h1').text()
                let waktu = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-cooking-time > span').text()
                let hasil = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-serves > span').text().split(': ')[1]
                let level = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-difficulty > span').text().split(': ')[1]
                let thumb = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-main-media > img').attr('src')
                let tbahan = 'bahan\n'
                for (let i = 0; i < abahan.length; i++) {
                    tbahan += abahan[i] + ' ' + atakaran[i] + '\n'
                }
                let ttahap = 'tahap\n'
                for (let i = 0; i < atahap.length; i++) {
                    ttahap += atahap[i] + '\n\n'
                }
                let tahap = ttahap
                let bahan = tbahan
                let result = {
                    creator: 'Fajar Ihsana',
                    data: {
                        judul: judul,
                        waktu_masak: waktu,
                        hasil: hasil,
                        tingkat_kesulitan: level,
                        thumb: thumb,
                        bahan: bahan.split('bahan\n')[1],
                        langkah_langkah: tahap.split('tahap\n')[1]
                    }
                }
                resolve(result)
            }).catch(reject)
        })
    }
}

const aiCover = async (character, audio) => {
    return new Promise(async (resolve, reject) => {
        let result = {}
        let name = Math.floor(Math.random() * 100000000000000000) + await generateRandomLetters() + '.mp4'
        let characters = {
            "kobo": 2,
            "zeta": 0,
            "gura": 20,
            "kaela": 4,
            "pekora": 6,
            "miko": 8,
            "subaru": 10,
            "korone": 12,
            "luna": 14,
            "anya": 16,
            "reine": 18,
            "calli": 22,
            "kroni": 24
        }
        let getCharacter = characters[character]

        let send_has_payload = {
            "fn_index": getCharacter, "session_hash": "dtniinetjz6"
        }
        let send_data_payload = {
            "fn_index": getCharacter,
            "data": [{
                "data": "data:audio/mpegbase64," + audio.toString('base64'),
                "name": name
            },
                0,
                "pm",
                0.6,
                false,
                "",
                "en-US-AnaNeural-Female"
            ],
            "event_data": null,
            "session_hash": "dtniinetjz6"
        }

        const ws = new WebSocket("wss://yanzbotz-waifu-yanzbotz.hf.space/queue/join")
        ws.onopen = function() {
            console.log("Connected to websocket")
        }

        ws.onmessage = async function(event) {
            let message = JSON.parse(event.data)

            switch (message.msg) {
                case 'send_hash':
                    ws.send(JSON.stringify(send_has_payload))
                    break

                case 'estimation':
                    console.log('Menunggu antrean: ️' + message.rank)
                    break

                case 'send_data':
                    console.log('Processing your audio....')
                    ws.send(JSON.stringify(send_data_payload))
                    break
                case 'process_completed':
                    result.base64 = 'https://yanzbotz-waifu-yanzbotz.hf.space/file=' + message.output.data[1].name
                    break
            }
        }

        ws.onclose = function(event) {
            if (event.code === 1000) {
                console.log('Process completed️')
            } else {
                console.log('Err : WebSocket Connection Error:\n')
            }
            resolve(result)
        }
    })
}

const Instrument = async (audio) => {
    return new Promise(async (resolve, reject) => {
        let result = {}
        let name = Math.floor(Math.random() * 100000000000000000) + await generateRandomLetters() + '.mp4'
        let send_has_payload = {
            "fn_index": 0, "session_hash": "6inywdd0rtw"
        }
        let send_data_payload = {
            "data": [{
                "data": "data:audio/mpegbase64," + audio.toString('base64'),
                "name": name
            }],
            "event_data": null,
            "fn_index": 0,
            "session_hash": "6inywdd0rtw"
        }

        const ws = new WebSocket("wss://yanzbotz-instrument.hf.space/queue/join")
        ws.onopen = function() {
            console.log("Connected to websocket")
        }

        ws.onmessage = async function(event) {
            let message = JSON.parse(event.data)

            switch (message.msg) {
                case 'send_hash':
                    ws.send(JSON.stringify(send_has_payload))
                    break

                case 'estimation':
                    console.log('Menunggu antrean: ️' + message.rank)
                    break

                case 'send_data':
                    console.log('Processing your audio....')
                    ws.send(JSON.stringify(send_data_payload))
                    break
                case 'process_completed':
                    result.vocal = 'https://yanzbotz-instrument.hf.space/file=' + message.output.data[0].name
                    result.instrument = 'https://yanzbotz-instrument.hf.space/file=' + message.output.data[1].name
                    break
            }
        }

        ws.onclose = function(event) {
            if (event.code === 1000) {
                console.log('Process completed️')
            } else {
                console.log('Err : WebSocket Connection Error:\n')
            }
            resolve(result)
        }
    })
}

class vitsSpeech {
    model = (number) => {
        return new Promise(async (resolve) => {
            const { data } = await axios.get("https://raw.githubusercontent.com/ArifzynXD/database/master/ai/anime.json")
            const model = data.model[number.toString()]

            if (model) {
                resolve(model)
            } else {
                resolve(data)
            }
        })
    }
    language = (id) => {
        return new Promise(async (resolve) => {
            const { data } = await axios.get("https://raw.githubusercontent.com/ArifzynXD/database/master/ai/anime.json")
            const lang = data.language[id.toString()]

            if (lang) {
                resolve(lang)
            } else {
                resolve(data)
            }
        })
    }
    generate = (text, model_id, language) => {
        return new Promise(async (resolve, reject) => {
            const model = await this.model(model_id)
            const lang = await this.language(language)

            const send_hash = {
                "session_hash": "4odx020bres",
                "fn_index": 2
            }
            const send_data = {
                "fn_index": 2,
                "data": [ text, model, lang, 1, false ],
                "session_hash": "4odx020bres"
            }
            const result = {}

            const ws = new WebSocket("wss://plachta-vits-umamusume-voice-synthesizer.hf.space/queue/join")

            ws.onopen = function() {
                console.log("Connected to websocket")
            }

            ws.onmessage = async function(event) {
                let message = JSON.parse(event.data)
                switch (message.msg) {
                    case 'send_hash':
                        ws.send(JSON.stringify(send_hash))
                        break
                    case 'estimation':
                        console.log('Menunggu antrean: ️' + message.rank)
                        break
                    case 'send_data':
                        console.log('Processing your audio....')
                        ws.send(JSON.stringify(send_data))
                        break
                    case 'process_completed':
                        result.url = 'https://plachta-vits-umamusume-voice-synthesizer.hf.space/file=' + message.output.data[1].name
                        break
                }
            }

            ws.onclose = function(event) {
                if (event.code === 1000) {
                    console.log('Process completed️')
                } else {
                    console.log('Err : WebSocket Connection Error:\n')
                }
                resolve(result)
            }
        })
    }
}

class Instagram {
    async request(url) {
        try {
            const response = await axios("https://v3.igdownloader.app/api/ajaxSearch", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0",
                },
                data: new URLSearchParams({ recaptchaToken: "", q: url, t: "media", lang: "en" }),
            })
            return response.data
        } catch (error) {
            throw error
        }
    }

    async post(url) {
        try {
            const data = await this.request(url)
            if (data.status === "ok") {
                const $ = cheerio.load(data.data)
                const result = []

                $("div.download-items a").each((_, element) => {
                    const title = $(element).attr("title").trim().toLowerCase()
                    const downloadUrl = $(element).attr("href")
                    if (title.includes("photo")) {
                        result.push({ type: "image", url: downloadUrl })
                    } else if (title.includes("video")) {
                        result.push({ type: "video", url: downloadUrl })
                    }
                })

                if (result.length > 0) {
                    return { status: 200, type: "post", result }
                } else {
                    return { status: 404, message: "Post not found or account is private" }
                }
            } else {
                return { status: 404, message: "Post not found or account is private" }
            }
        } catch (error) {
            throw error
        }
    }

    async reels(url) {
        try {
            const data = await this.request(url)
            if (data.status === "ok") {
                const $ = cheerio.load(data.data)
                const result = []

                $("div.download-items a").each((_, element) => {
                    const title = $(element).attr("title").trim().toLowerCase()
                    const downloadUrl = $(element).attr("href")
                    if (title.includes("video")) {
                        result.push({ type: "video", url: downloadUrl })
                    }
                })

                if (result.length > 0) {
                    return { status: 200, type: "reels", result }
                } else {
                    return { status: 404, message: "Reels not found or account is private" }
                }
            } else {
                return { status: 404, message: "Reels not found or account is private" }
            }
        } catch (error) {
            throw error;
        }
    }

    async story(url) {
        try {
            const data = await this.request(url);
            if (data.status === "ok") {
                const $ = cheerio.load(data.data);
                const result = [];

                $("div.download-items a").each((_, element) => {
                    const title = $(element).attr("title").trim().toLowerCase();
                    const downloadUrl = $(element).attr("href");
                    if (title.includes("photo")) {
                        result.push({ type: "image", url: downloadUrl });
                    } else if (title.includes("video")) {
                        result.push({ type: "video", url: downloadUrl });
                    }
                });

                if (result.length > 0) {
                    return { status: 200, type: "story", result };
                } else {
                    return { status: 404, message: "Story not found or account is private" };
                }
            } else {
                return { status: 404, message: "Story not found or account is private" };
            }
        } catch (error) {
            throw error;
        }
    }
}

const komiku = {
    latest: async () => {
        const browser = await puppeteer.launch({ args: ['--no-sandbox'], headless: "new" })
        const page = await browser.newPage()

        await page.goto('https://komiku.id/pustaka')
        await page.waitForSelector('body')

                                    
        await page.waitForTimeout(5000)

                                                                 
        const data = await page.evaluate(() => {
            const elements = document.querySelectorAll('.daftar .bge')
            const results = []

            elements.forEach(element => {
                const titleElement = element.querySelector('.kan h3')
                const uploadedElement = element.querySelector('.judul2')
                const linkElement = element.querySelector('.kan a')
                const descriptionElement = element.querySelector('.kan p')
                const imageElement = element.querySelector('.bgei img')

                const title = titleElement ? titleElement.innerText.trim() : null
                const uploaded = uploadedElement ? uploadedElement.innerText.trim() : null
                const link = linkElement ? linkElement.href : null
                const description = descriptionElement ? descriptionElement.innerText.trim() : null
                const imageUrl = imageElement ? imageElement.src : null

                if (title && link) {
                    results.push({
                        title,
                        uploaded,
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
        const browser = await puppeteer.launch({ args: ['--no-sandbox'], headless: "new" })
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
        const browser = await puppeteer.launch({ args: ['--no-sandbox'], headless: "new" })
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
        const browser = await puppeteer.launch({ args: ['--no-sandbox'], headless: "new" })
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

class Komikcast {
    latest = () => {
        return new Promise(async (resolve, reject) => {
            const response = await axios.get("https://komikcast.lol/daftar-komik/?orderby=update")
            const $ = cheerio.load(response.data)
            const result = []

            $('.list-update_item').each((index, element) => {
                const link = $(element).find('a').attr('href')
                const title = $(element).find('.title').text().trim()
                const type = $(element).find('.type').text().trim()
                const chapter = $(element).find('.chapter').text().trim()
                const image = $(element).find('.list-update_item-image img').attr('src')

                result.push({
                    title,
                    type,
                    chapter,
                    link,
                    image
                })
            })
            resolve(result)
        })
    }
    search = (query) => {
        return new Promise(async (resolve, reject) => {
            const response = await axios.get("https://komikcast.lol/?s=" + query)
            const $ = cheerio.load(response.data)
            const result = []

            $('.list-update_item').each((index, element) => {
                const link = $(element).find('a').attr('href')
                const title = $(element).find('.title').text().trim()
                const type = $(element).find('.type').text().trim()
                const chapter = $(element).find('.chapter').text().trim()
                const image = $(element).find('.list-update_item-image img').attr('src')

                result.push({
                    title,
                    type,
                    chapter,
                    link,
                    image
                })
            })
            resolve(result)
        })
    }
    detail = (url) => {
        return new Promise(async (resolve, reject) => {
            const response = await axios.get(url)
            const $ = cheerio.load(response.data)
            const result = {}

            result.title = $('.komik_info-content-body-title').text().trim()
            result.alternativeTitle = $('.komik_info-content-native').text().trim()
            result.genres = $('.komik_info-content-genre a').map((index, element) => $(element).text().trim()).get()
            $('.komik_info-content-meta span').each((index, element) => {
                const key = $(element).find('b').text().replace(':', '').replace(/ /g, '_').toLowerCase().trim()
                const value = $(element).contents().filter((index, el) => el.nodeType === 3).text().trim()

                result[key] = value
            })

            result.type = $('.komik_info-content-info-type a').text().trim()
            result.lastUpdated = $('.komik_info-content-update time').attr('datetime')
            result.image = $('.komik_info-cover-image img').attr('src')
            result.synopsis = $('.komik_info-description-sinopsis p').text().trim()
            result.chapters = []

            $('.komik_info-chapters-item').each((index, element) => {
                const chapterNumber = $(element).find('.chapter-link-item').text().trim().replace(/\s+/g, ' ')
                const chapterURL = $(element).find('.chapter-link-item').attr('href')
                const timeAgo = $(element).find('.chapter-link-time').text().trim()

                const chapterInfo = {
                    number: chapterNumber,
                    url: chapterURL,
                    timeAgo: timeAgo,
                }

                result.chapters.push(chapterInfo)
            })

            resolve(result)
        })
    }
    chapter = (url) => {
        return new Promise(async (resolve, reject) => {
            const response = await axios.get(url)
            const $ = cheerio.load(response.data)
            const result = {}

            result.title = $(".chapter_headpost h1").text().trim()
            result.images = []
            $("div.main-reading-area img").each((i, el) => {
                result.images.push($(el).attr("src"))
            })
            resolve(result)
        })
    }
}

async function leptonAi(query) {
    try {
        const api = axios.create({
            baseURL: 'https://search.lepton.run/api/',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const rid = generateRandomLetters(10)
        const postData = {
            query,
            rid
        }
        const response = await api.post('query', postData)

        const llmResponseRegex = /__LLM_RESPONSE__([\s\S]*?)__RELATED_QUESTIONS__/
        const llmResponseMatch = response.data.match(llmResponseRegex)

        if (llmResponseMatch && llmResponseMatch[1]) {
            let llmResponse = llmResponseMatch[1].trim()
            llmResponse = llmResponse.replace(/__LLM_RESPONSE__|__RELATED_QUESTIONS__/g, '').trim()
            return llmResponse
        } else {
            throw new Error("No LLM response found.")
        }
    } catch (error) {
        throw new Error('Error fetching LLM response: ' + error.message)
    }
}

const novita = {
    img2img: async (apiKey, imageBase64, prompt, negativePrompt, modelName, width, height, samplerName, guidanceScale, steps, imageNum, clipSkip, seed, strength, loras, controlnet, ipAdapters) => {
        const novitaClient = new NovitaSDK(apiKey)
        const params = {
            request: {
                model_name: modelName || "protovisionXLHighFidelity3D_beta0520Bakedvae_106612.safetensors",
                image_base64: imageBase64 || "",
                prompt: prompt || "",
                negative_prompt: negativePrompt || "",
                width: width || 512,
                height: height || 512,
                sampler_name: samplerName || "DPM++ 2S a Karras",
                guidance_scale: guidanceScale || 7.5,
                steps: steps || 20,
                image_num: imageNum || 4,
                clip_skip: clipSkip || 1,
                seed: seed || -1,
                strength: strength || 0.7,
                loras: loras || [],
                controlnet: controlnet || {},
                ip_adapters: ipAdapters || []
            }
        }

        try {
            const res = await novitaClient.img2ImgV3(params)
            if (res && res.task_id) {
                return new Promise((resolve, reject) => {
                    const timer = setInterval(async () => {
                        try {
                            const progressRes = await novitaClient.progressV3({
                                task_id: res.task_id
                            })
                            if (progressRes.task.status === TaskStatus.SUCCEED) {
                                clearInterval(timer)
                                resolve(progressRes.images)
                            } else if (progressRes.task.status === TaskStatus.FAILED) {
                                clearInterval(timer)
                                reject(new Error(`Task failed: ${progressRes.task.reason}`))
                            } else if (progressRes.task.status === TaskStatus.QUEUED) {
                                console.log("queueing")
                            }
                        } catch (err) {
                            clearInterval(timer)
                            reject(new Error(`Progress error: ${err.message}`))
                        }
                    },
                        1000)
                })
            } else {
                throw new Error('Task initiation failed')
            }
        } catch (err) {
            throw new Error(`img2Img error: ${err.message}`)
        }
    },

    txt2img: async (apiKey, prompt, negativePrompt, model_name, width, height, sampler_name, guidance_scale, steps, image_num, clip_skip, seed, loras) => {
        const novitaClient = new NovitaSDK(apiKey)
        const params = {
            request: {
                model_name: model_name || "protovisionXLHighFidelity3D_beta0520Bakedvae_106612.safetensors",
                prompt: prompt || "",
                negative_prompt: negativePrompt || "",
                width: width || 512,
                height: height || 512,
                sampler_name: sampler_name || "DPM++ 2S a Karras",
                guidance_scale: guidance_scale || 7.5,
                steps: steps || 20,
                image_num: image_num || 4,
                clip_skip: clip_skip || 1,
                seed: seed || -1,
                loras: loras || [],
            },
        }

        try {
            const res = await novitaClient.txt2ImgV3(params)
            if (res && res.task_id) {
                return new Promise((resolve, reject) => {
                    const timer = setInterval(async () => {
                        try {
                            const progressRes = await novitaClient.progressV3({
                                task_id: res.task_id
                            })
                            if (progressRes.task.status === TaskStatus.SUCCEED) {
                                clearInterval(timer)
                                resolve(progressRes.images)
                            } else if (progressRes.task.status === TaskStatus.FAILED) {
                                clearInterval(timer)
                                reject(new Error(`Task failed: ${progressRes.task.reason}`))
                            } else if (progressRes.task.status === TaskStatus.QUEUED) {
                                console.log("queueing")
                            }
                        } catch (err) {
                            clearInterval(timer)
                            reject(new Error(`Progress error: ${err.message}`))
                        }
                    },
                        1000)
                })
            } else {
                throw new Error('Task initiation failed')
            }
        } catch (err) {
            throw new Error(`txt2Img error: ${err.message}`)
        }
    }
}

async function nvidia(query, apikey) {
    try {
        const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apikey}`,
                'User-Agent': 'Mozilla/5.0 (iPhone CPU iPhone OS 13_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.1 Mobile/15E148',
            },
            body: JSON.stringify({
                model: 'google/gemma-2-27b-it',
                messages: [{
                    role: 'user',
                    content: query,
                }],
                temperature: '0.2',
                top_p: '0.9',
                max_tokens: '1024',
                stream: false
            }),
        })
        const data = await response.json()

        let res = data.choices[0]?.message?.content || ''
        return res
    } catch (error) {
        console.error('Error:', error)
        throw error
    }
}

async function screenshotWeb(link, viewport = {}, timeout = 1000) {
    const name = await generateRandomLetters() + ".jpeg"
    const browser = await puppeteer.launch({ args: ['--no-sandbox'], headless: "new" })
    const page = await browser.newPage()
    await page.setViewport({ ...viewport })
    await page.goto(link)
    await page.waitForTimeout(timeout)
    await page.screenshot({ path: './tmp/' + name, quality: 100, type: 'jpeg' })
    await browser.close()
    return fs.readFileSync("./tmp/" + name)
}

async function thinkany(content) {
    try {
        const api = axios.create({
            baseURL: 'https://thinkany.ai/api',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Linux Android 10 K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36',
                'Referer': 'https://thinkany.ai/'
            }
        })
        const newConversationData = {
            content,
            locale: "en",
            mode: "search",
            model: "claude-3-haiku",
            source: "all"
        }
        const { data } = await api.post('/new-conversation', newConversationData)

        const chatData = {
            role: "user",
            content: data.data.content,
            conv_uuid: data.data.uuid,
            mode: data.data.mode,
            is_new: true,
            model: data.data.llm_model
        }

        const chatResponse = await api.post('/chat', chatData)
        return chatResponse.data
    } catch (error) {
        console.error('Error:', error)
        throw error
    }
}

let GPT4 = async (text) => {
    return new Promise(async (resolve, reject) => {
        const browser = await puppeteer.launch({ args: ['--no-sandbox'], headless: "new" })
        const page = await browser.newPage()
        
        try {
            await page.goto('https://chatgpt4online.org/')
            await page.waitForSelector('a[href="#chat"]')
            await page.click('a[href="#chat"]')
            await page.waitForSelector('textarea[placeholder="Ask Anything..."]')
            
            await page.type('textarea[placeholder="Ask Anything..."]', text)
            await page.click('button.mwai-input-submit')
            await page.waitForSelector('.mwai-busy', { hidden: true })
            
            const html = await page.content()
            const $ = cheerio.load(html)
            
            const formatText = (html) => {
                return html.replace(/<\/p>/g, '\n\n').replace(/<[^>]+>/g, '').replace(/&lt;|&gt;/g, "").trim()
            }
            
            const texts = []
            $('.mwai-text').each((i, el) => {
                const formattedText = formatText($(el).html())
                texts.push(formattedText)
            })
            
            resolve(texts[2])
        } catch (error) {
            reject(error)
        } finally {
            await browser.close()
        }
    })
}

let groupsor = {
    search: async (query) => {
        return new Promise(async (resolve, reject) => {
            try {
                let baseurl = 'https://groupsor.link'
                let { data } = await axios.get(`${baseurl}/group/searchmore/${query}`)
                let $ = cheerio.load(data)
                let result = []
                $("body > .maindiv").each(function (a, b) {
                    let title = $(b).find("a > span").text()
                    let desc = $(b).find(".post-basic-info > p").text().slice(0, 50)
                    let link = $(b).find("div.post-info-rate-share > span.joinbtn > a.joinbtn").attr("href")
                    result.push({
                        title,
                        desc,
                        link
                    })
                })
                resolve(result)
            } catch (error) {
                reject(error)
            }
        })
    }, 
    link: async (url) => {
        return new Promise(async (resolve, reject) => {
            try {
                let { data } = await axios.get(url)
                let $ = cheerio.load(data)
                let link = $(".formdl > center > div > b > a").attr("href")
                resolve(link)
            } catch (error) {
                reject(error)
            }
        })
    }
}

export {
    resep,
    wikipedia,
    cerpen, 
    soundcloud,
    hoax,
    spesifikasi,
    wallpaper,
    pinterest,
    fakechat,
    sfile,
    distance,
    happymod,
    checkWeb,
    tts,
    kodepos,
    jadwalTV,
    simi,
    processing,
    anime,
    manga,
    character,
    topAnime,
    topManga,
    tiktok,
    ssweb,
    BukaLapak,
    RingTone,
    ttp,
    lyrics,
    iNewsTV,
    DailyNews,
    DetikNews,
    Okezone,
    CNBC,
    AntaraNews,
    Kontan,
    halodoc,
    xnxx,
    aiCover,
    Instrument,
    vitsSpeech,
    Instagram,
    Komikcast,
    leptonAi,
    novita,
    nvidia,
    screenshotWeb,
    thinkany,
    GPT4,
    groupsor,
    komiku,
    facebook,
    ytSearch
}
