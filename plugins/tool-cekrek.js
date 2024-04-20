import fetch from 'node-fetch';

var handler = async (m, { conn, args, usedPrefix , command }) => {
  const codebanks = `
name = bank_code
ANZ Indonesia = anz
ATMB LSB (BPR LSB) = atmb_lsb
ATMB PLUS = atmb_plus
Allo Bank/Bank Harda Internasional = harda
BANK MANTAP (Mandiri Taspen) = mantap
BCA = bca
BCA (Bank Central Asia) Syariah = bca_syr
BJB = bjb
BJB Syariah = bjb_syr
BNI = bni
BNI CC = bni_cc
BNP Paribas Indonesia = bnp_paribas
BPD Bali = bali
BPD Banten = banten
BPD DIY = daerah_istimewa
BPD DIY Syariah = daerah_istimewa_syr
BPR EKA (Bank Eka) = eka
BRI = bri
BRI (Bank Rakyat Indonesia) Syariah = bri_syr
BRI Agroniaga = agroniaga
BRI CC = bri_cc
BSI (Bank Syariah Indonesia) = bsm
BTN = btn
BTN Syariah = btn_syr
BTPN / Jenius / BTPN Wow! = tabungan_pensiunan_nasional
Bank Aceh Syariah = aceh
Bank Aladin Syariah = aladin
Bank Amar Indonesia = amar
Bank Antardaerah = antardaerah
Bank Artha Graha Internasional = artha
Bank BTPN Syariah = btpn_syr
Bank Bengkulu = bengkulu
Bank Bukopin Syariah = bukopin_syr
Bank Bumi Arta = bumi_arta
Bank CNB (Centratama Nasional Bank) = cnb
Bank Capital Indonesia = capital
Bank China Construction Bank Indonesia = ccb
Bank DKI Jakarta = dki
Bank DKI Syariah = dki_syr
Bank Danamon Syariah = danamon_syr
Bank Dinar Indonesia = dinar
Bank Ganesha = ganesha
Bank IBK Indonesia = agris
Bank Ina Perdana = ina_perdana
Bank Index Selindo = index_selindo
Bank Jago Syariah = artos_syr
Bank Jambi = jambi
Bank Jambi Syariah = jambi_syr
Bank Jasa Jakarta = jasa_jakarta
Bank Jateng = jawa_tengah
Bank Jateng Syariah = jawa_tengah_syr
Bank Jatim = jawa_timur
Bank Jatim Syariah = jawa_timur_syr
Bank Kalbar = kalimantan_barat
Bank Kalbar Syariah = kalimantan_barat_syr
Bank Kalsel = kalimantan_selatan
Bank Kalsel Syariah = kalimantan_selatan_syr
Bank Kalteng = kalimantan_tengah
Bank Kaltimtara = kalimantan_timur
Bank Kaltimtara Syariah = kalimantan_timur_syr
Bank Lampung = lampung
Bank Maluku = maluku
Bank Maspion Indonesia = maspion
Bank Mayapada = mayapada
Bank Mayora Indonesia = mayora
Bank Mega = mega
Bank Mega Syariah = mega_syr
Bank Mestika Dharma = mestika_dharma
Bank Mizuho Indonesia = mizuho
Bank Multi Arta Sentosa (Bank MAS) = mas
Bank Mutiara = mutiara
Bank NTB Syariah = nusa_tenggara_barat
Bank NTT = nusa_tenggara_timur
Bank Nagari Syariah = sumatera_barat_syr
Bank Nusantara Parahyangan = nusantara_parahyangan
Bank Papua = papua
Bank Permata = permata
Bank Prima Master = prima
Bank Resona Perdania = resona_perdania
Bank Riau Kepri = riau_dan_kepri
Bank Sahabat Sampoerna = sahabat_sampoerna
Bank Shinhan Indonesia = shinhan
Bank Sinarmas = sinarmas
Bank Sinarmas Syariah = sinarmas_syr
Bank Sulselbar = sulselbar
Bank Sulselbar Syariah = sulselbar_syr
Bank Sulteng = sulawesi
Bank Sultra = sulawesi_tenggara
Bank SulutGo = sulut
Bank Sumbar (Bank Nagari) = sumatera_barat
Bank Sumsel Babel = sumsel_dan_babel
Bank Sumsel Babel Syariah = sumsel_dan_babel_syr
Bank Sumut = sumut
Bank Sumut Syariah = sumut_syr
Bank Victoria International = victoria_internasional
Bank Victoria Syariah = victoria_syr
Bank Woori Saudara = woori
Bank of America NA = america_na
Bank of China (Hong Kong) Limited = boc
Bank of India Indonesia = india
Bank of Tokyo Mitsubishi UFJ = tokyo
Billfazz = billfazz
Blu/BCA Digital = royal
CIMB CC = cimb_cc
CIMB Niaga/CIMB Niaga Syariah = cimb
CTBC (Chinatrust) Indonesia = chinatrust
Citibank = citibank
Commonwealth Bank = commonwealth
DANA = dana
DBS Indonesia = dbs
DOKU = doku
DUTAMONEY = dutamoney
Danamon / Danamon Syariah = danamon
Danamon CC = danamon_cc
Dompetku = dompetku
E2Pay = e2pay
FINNET = finnet
GoPay = gopay
Gojek Driver = gopay_driver
Gudang Voucher = gv
HSBC CC = hsbc_cc
HSBC Indonesia = hsbc
ICBC Indonesia = icbc
Jago/Artos = artos
KC JPMorgan Chase Bank = jpmorgan_chase
LINE Bank/KEB Hana = hana
LinkAja = linkaja
Mandiri = mandiri
Mandiri CC = mandiri_cc
Maybank CC = maybank_cc
Maybank Indonesia = bii
Maybank Indonesia Syariah = bii_syr
Mega CC = mega_cc
Midtrans = midtrans
Motion/MNC Bank = mnc_internasional
Muamalat = muamalat
Neo Commerce/Yudha Bhakti = yudha_bakti
Nobu (Nationalnobu) Bank = nationalnobu
OCBC CC = ocbc_cc
OCBC NISP = ocbc
OCBC NISP Syariah = ocbc_syr
OVO = ovo
Panin Bank = panin
Panin Dubai Syariah = panin_syr
Permata CC = permata_cc
Permata Syariah = permata_syr
QNB Indonesia = qnb_kesawan
Rabobank International Indonesia = rabobank
SAKUKU = sakuku
SBI Indonesia = sbi_indonesia
Saldo Flip = saldo_flip
Seabank/Bank BKE = kesejahteraan_ekonomi
ShopeePay = shopeepay
Standard Chartered Bank = standard_chartered
TMRW/UOB = uob
Tokopedia = tokopedia
UOB/CITI CC = uob_cc
Wokee/Bukopin = bukopin
`;
    
  if (args.length < 2) throw `*_Masukan Kode Bank dan Nomor Rekening!_*\nContoh: \n > *${usedPrefix + command} dana 08123456789*\n > *${usedPrefix + command} dana 628123456789*\n > *${usedPrefix + command} dana +628123456789*\n > *${usedPrefix + command} bca 6812345678*\nContoh: _*${usedPrefix + command} bank_kode rekening*_ \n\n\`\`\`${codebanks}\`\`\``;

  const bankCode = args[0];
  const accountNumber = args.slice(1).join(' ');

  const currentTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
  const currentTime2 = new Date().toLocaleString('en-US', { timeZone: 'Asia/Makassar' });
  const currentTime3 = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jayapura' });

  const checkTime = `Waktu cek:\n${currentTime} WIB (Waktu Indonesia Barat)\n${currentTime2} WITA (Waktu Indonesia Tengah)\n${currentTime3} WIT (Waktu Indonesia Timur)`;

  await conn.reply(m.chat, 'Sedang mencari informasi rekening... Mohon tunggu sebentar.', m);

  let res = await fetch(`https://cek-rekening-two.vercel.app/api/cek-rekening?bank_code=${bankCode}&number=${accountNumber}`);
  
  if (!res.ok) throw 'Tidak dapat menemukan informasi rekening.';

  let json = await res.json();
  
  if (!json.status || !json.data) throw 'Data tidak ditemukan.';
  
  const { norek, nama, bank } = json.data;

  await conn.reply(m.chat, `No. Rekening: ${norek}\nNama: ${nama}\nBank: ${bank}\n\n${checkTime}`, m);
}

handler.help = ['cekrek <code_bank> <rekening>'];
handler.tags = ['internet', 'tool'];
handler.command = /^(cekrek|cekrekening|checkrek|checkrekening|cekewallet|ceke-wallet|checkewallet|checke-wallet)$/i;

export default handler;
