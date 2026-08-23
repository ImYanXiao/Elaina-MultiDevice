import axios from 'axios';

let handler = async (m, {
    conn,
    args,
    text,
    usedPrefix,
    command
}) => {
    let input = `• *Contoh :* ${usedPrefix + command} 123.456.789.0`;
    if (!text) return m.reply(input);

    axios.get(`https://ipapi.co/${text}/json`)
        .then(response => {
            const data = response.data;
            let info = `*Alamat IP*: ${data.ip}
*Kota*: ${data.city}
*Provinsi*: ${data.region}
*Negara*: ${data.country_name}
*ISP*: ${data.org}
*Jaringan*: ${data.network}
*Versi*: ${data.version}
*Kode Provinsi*: ${data.region_code}
*Kode Negara*: ${data.country_code}
*Kode Negara ISO3*: ${data.country_code_iso3}
*Ibu Kota Negara*: ${data.country_capital}
*TLD Negara*: ${data.country_tld}
*Kode Benua*: ${data.continent_code}
*Kode Pos*: ${data.postal ? data.postal : 'N/A'}
*Latitude*: ${data.latitude}
*Longitude*: ${data.longitude}
*Zona Waktu*: ${data.timezone}
*Offset UTC*: ${data.utc_offset}
*Kode Panggilan Negara*: ${data.country_calling_code}
*Mata Uang*: ${data.currency}
*Nama Mata Uang*: ${data.currency_name}
*Bahasa*: ${data.languages}
*Luas Negara*: ${data.country_area}
*Populasi Negara*: ${data.country_population}
*ASN*: ${data.asn}

[Link GPS Lokasi](https://www.google.com/maps/search/?api=1&query=${data.latitude},${data.longitude})`;

            m.reply(info);
        })
        .catch(error => {
            console.error("Error fetching IP info:", error);
            m.reply("Terjadi kesalahan saat mengambil informasi IP.");
        });
};

handler.help = ['trackip'];
handler.tags = ['premium'];
handler.command = /^(trackip|getipinfo)$/i;
handler.premium = true;

export default handler;