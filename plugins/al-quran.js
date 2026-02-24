let handler = async (m, { args, usedPrefix, command }) => {
    if (!(args[0] || args[1])) throw `contoh:\n${usedPrefix + command} 1 2\n\nmaka hasilnya adalah surah Al-Fatihah ayat 2 beserta audionya, & ayatnya 1 saja`
    if (isNaN(args[0]) || isNaN(args[1])) throw `contoh:\n${usedPrefix + command} 1 2\n\nmaka hasilnya adalah surah Al-Fatihah ayat 2 beserta audionya, dan ayatnya 1 aja`
    let api = await alquran()
    let mes = `
${api[args[0] - 1].ayahs[args[1] - 1].text.ar}
    
${api[args[0] - 1].ayahs[args[1] - 1].translation.id}
( Q.S ${api[args[0] - 1 ].asma.id.short} : ${api[args[0] - 1].ayahs[args[1] - 1].number.insurah} )
`.trim()
    m.reply(mes)
    conn.sendFile(m.chat, api[args[0] - 1].ayahs[args[1] - 1].audio.url, '', '', m)
}

handler.command = ['alquran']
handler.help = ['alquran']
handler.tags = ['quran']

export default handler

import { z } from 'zod'

const AlQuranTranslationSchema = z.object({
  en: z.string(),
  id: z.string(),
});

const AlQuranTafsirSchema = z.object({
  id: z.string(),
  en: z.string().nullable(),
});

const AlQuranAsmaSchema = z.object({
  short: z.string(),
  long: z.string(),
});

const AlQuranSchema = z.object({
  number: z.number(),
  ayatCount: z.number().optional(),
  sequence: z.number(),
  asma: z.object({
    ar: AlQuranAsmaSchema,
    en: AlQuranAsmaSchema,
    id: AlQuranAsmaSchema,
    translation: AlQuranTranslationSchema,
  }),
  preBismillah: z.boolean().nullable(),
  type: z.object({
    ar: z.string(),
    id: z.string(),
    en: z.string(),
  }),
  tafsir: AlQuranTafsirSchema,
  recitation: z.object({
    full: z.string(),
  }),
  ayahs: z.array(
    z.object({
      number: z.object({
        inquran: z.number(),
        insurah: z.number(),
      }),
      juz: z.number(),
      manzil: z.number(),
      page: z.number(),
      ruku: z.number(),
      hizbQuarter: z.number(),
      sajda: z.object({
        recomended: z.boolean().optional(),
        obligatory: z.boolean(),
      }),
      text: z.object({
        ar: z.string(),
        read: z.string(),
      }),
      translation: AlQuranTranslationSchema,
      tafsir: AlQuranTafsirSchema,
      audio: z.object({
        url: z.string().url(),
      }),
    })
  ),
});

const AsmaulHusnaArgsSchema = z.object({
  0: z.number().min(1).max(99).optional(),
});

const AsmaulHusnaSchema = z.object({
  index: z.number(),
  latin: z.string(),
  arabic: z.string(),
  translation_id: z.string(),
  translation_en: z.string(),
});

const JadwalSholatArgsSchema = z.object({
  0: z.string(),
});

const JadwalSholatItemSchema = z.object({
  value: z.string(),
  kota: z.string(),
});

const JadwalSholatSchema = z.object({
  date: z.string(),
  location: z.string(),
  direction: z.string(),
  distance: z.string(),
  schedules: z
    .object({
      date: z.string(),
      imsyak: z.string(),
      shubuh: z.string(),
      terbit: z.string(),
      dhuha: z.string(),
      dzuhur: z.string(),
      ashr: z.string(),
      maghrib: z.string(),
      isya: z.string(),
    })
    .array(),
});

const DidYouMeanArgsSchema = z.object({
  0: z.string(),
  1: z.array(z.string()),
  2: z
    .object({
      threshold: z.number().min(0).max(1).optional(),
      opts: z
        .object({
          sensitive: z.boolean(),
        })
        .optional(),
    })
    .optional(),
});

const DidYouMeanSchema = z.object({
  index: z.number(),
  query: z.string(),
  score: z.number().min(0).max(1),
});

import got from 'got'

/**
 * Inspiration from https://github.com/rzkytmgr/quran-api
 */
async function alquran() {
  try {
    const data = await got('https://github.com/rzkytmgr/quran-api/raw/deprecated/data/quran.json').json();

    return data.map(item => AlQuranSchema.parse(item));
  } catch (error) {
    console.error('Error fetching or parsing data:', error);
    throw new Error('Failed to fetch or parse Quran data');
  }
}

