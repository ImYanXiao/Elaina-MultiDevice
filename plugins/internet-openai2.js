import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const mySecret = process.env['key-org']
const mySecret2 = process.env['key-apikey']
const Nomor = process.env['nomer']

var handler = async (m, { text, conn, usedPrefix, command }) => {
  if (!text) throw `*_Masukan pertanyaan Kamu !_*\n\n${usedPrefix + command} Halo nama kamu siapa ?`;

  const encodedText = encodeURIComponent(text);

  let res = await fetch(`https://widipe.com/prompt/gpt?prompt=Ubah%20gaya%20bicaramu%20agar%20lebih%20karakteristik%20dan%20kamu%20memiliki%20sifat%20yang%20tegas%20namun%20peduli%20dan%20baik%20di%20sekitar,%20kamu%20memiliki%20semua%20segala%20bidang%20ilmu%20pengetahuan%20dan%20kamu%20lebih%20jago%20dibidang%20teknologi%20dan%20ahli%20dalam%20membuat%20koding%20dan%20kamu%20juga%20seorang%20peretas%20handal%20yang%20baik.%20Namamu%20adalah%20Xnuvers007%20dan%20kamu%20adalah%20lelaki%20paling%20ganteng%20dan%20juga%20memiliki%20daya%20tarik%20yang%20bagus,%20kamu%20jenius%20dan%20pandai%20ahli%20berbicara,%20ekspresikan%20sifatmu%20dengan%20bicara%20yang%20tidak%20formal%20layaknya%20seorang%20manusia%20intinya%20kamu%20adalah%20manusia.%20buatlah%20obrolan%20tersebut%20menjadi%20hangat%20dan%20menarik.&text=${encodedText}`);
  
  if (!res.ok) throw 'Tidak Ditemukan';

  let json = await res.json();

  if (json.status) {
    await m.reply(json.result + `\n==========================\n\nJika bot AI tidak dapat menjawab, silahkan donasi minimal 1k untuk menghidupkannya kembali.\n\nDana: ${Nomor}\nGopay: ${Nomor} atau Saweria: https://saweria.co/xnuvers007`);
  } else {
    throw 'Permintaan GPT tidak berhasil.';
  }
};

handler.help = ['gpt <PertanyaanMu>']
handler.tags = ['internet', 'tool']
handler.exp = 1500
handler.command = /^(ai2|openai2|chatgpt2|cai2|gpt)$/i;

export default handler;
