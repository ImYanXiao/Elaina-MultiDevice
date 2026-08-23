import axios from 'axios';

let handler = async (m, {
    conn,
    args,
    text,
    usedPrefix,
    command
}) => {
    let input = `• *Contoh :* ${usedPrefix + command} https://example.com`;
    if (!text) return m.reply(input);

    axios.get(`https://api.hackertarget.com/pagelinks/?q=${text}`)
        .then(async response => {
            const pageLinks = response.data;
            
                                      
            const dnsResponse = await axios.get(`https://api.hackertarget.com/dnslookup/?q=${text}`);
            const dnsData = dnsResponse.data;

                                              
            const headerResponse = await axios.get(`https://api.hackertarget.com/httpheaders/?q=${text}`);
            const headerData = headerResponse.data;

                                        
            const whoisResponse = await axios.get(`https://api.hackertarget.com/whois/?q=${text}`);
            const whoisData = whoisResponse.data;

                                         
            const serverResponse = await axios.get(`https://api.hackertarget.com/httpheaders/?q=${text}`);
            const serverData = serverResponse.data;

            let info = `*Informasi Website*: ${text}
            
*Daftar Tautan*: 
${pageLinks.split("\n").map(link => `• ${link}`).join("\n")}

*Informasi DNS*:
${dnsData}

*Header HTTP*:
${headerData}

*Informasi WHOIS*:
${whoisData}

*Informasi Server*:
${serverData}`;

            m.reply(info);
        })
        .catch(error => {
            console.error("Error fetching website info:", error);
            m.reply("Terjadi kesalahan saat mengambil informasi dari website yang dituju.");
        });
};

handler.help = ['cekweb'];
handler.tags = ['premium'];
handler.command = /^(hackweb)$/i;
handler.premium = true;

export default handler;
