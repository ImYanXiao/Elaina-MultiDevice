let handler  = async (m, { conn }) => {
  conn.reply(m.chat,`“${pickRandom(cantik)}”`, m)
}
handler.help = ['cantikcek']
handler.tags = ['fun']
handler.command = /^(cantikcek)$/i

export default handler 

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

const cantik = [
'Cantik Level : 4%\n\nINI MUKA ATAU SAMPAH?!',
'Cantik Level : 7%\n\nSerius ya,, Lu ampir mirip kayak Monyet!',
'Cantik Level : 12%\n\nMakin lama liat muka lo gw bisa muntah!',
'Cantik Level : 22%\n\nMungkin karna lo sering liat berbuat maksiat😂',
'Cantik Level : 27%\n\nKeknya bakal susah dapet jodoh lu,, berdoa aja',
'Cantik Level : 35%\n\nYang sabar ya ayang',
'Cantik Level : 41%\n\nSemoga diberkati mendapat jodoh',
'Cantik Level : 48%\n\nDijamin cowok susah deketin lo',
'Cantik Level : 56%\n\nLu Setengah Cantik :v',
'Cantik Level : 64%\n\nCukuplah',
'Cantik Level : 71%\n\nLumayan cantik juga lu ya',
'Cantik Level : 1%\n\nAWOAKAK BURIQQQ!!!',
'Cantik Level : 1%\n\nAWOAKAK BURIQQQ!!!',
'Cantik Level : 1%\n\nAWOAKAK BURIQQQ!!!',
'Cantik Level : 1%\n\nAWOAKAK BURIQQQ!!!',
'Cantik Level : 77%\n\nGak akan Salah Lagi dah neng',
'Cantik Level : 83%\n\nDijamin cowok gak akan kecewa neng',
'Cantik Level : 89%\n\ncowok2 pasti auto salfok klo ngeliat lo!',
'Cantik Level : 94%\n\nAARRGGHHH!!!',
'Cantik Level : 100%\n\nLU EMANG CEWEK TERCANTIK YANG PERNAH GW LIAT!!!',
]
