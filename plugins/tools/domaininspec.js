import fetch from "node-fetch";

const GOOGLE_API_KEY = "AIzaSyDYOjJj4pfKyYmW42FbD4yrvb_RQjFc1Kw";
const VIRUSTOTAL_API_KEY = "4a13bae4e854eec838c8552205cf10bc0d9712556af192a35316bc905a307c1f";
const WHOIS_API_KEY = "I3fqbSXWijwd3uDuExEDyg==r0nmWfPiunm2Vlib";

async function sendInspectorResult(conn, m, url) {
    try {
        const [safeBrowsing, virusTotal, whois] = await Promise.all([
            checkGoogleSafeBrowsing(url),
            checkVirusTotal(url),
            checkWhois(url)
        ]);

        let resultText = `🔍 *Hasil Pemeriksaan:*\n`;
        resultText += `📌 *Google Safe Browsing:* ${safeBrowsing}\n`;
        resultText += `📌 *VirusTotal:* ${virusTotal}\n`;
        resultText += `📌 *WHOIS (Umur Domain):* ${whois}`;

        await conn.sendMessage(m.chat, { text: resultText }, { quoted: m });
    } catch (error) {
        console.error("Gagal mengirim hasil inspeksi:", error);
        await conn.sendMessage(m.chat, { text: "❌ Terjadi kesalahan saat memeriksa situs web." }, { quoted: m });
    }
}

                           
async function checkGoogleSafeBrowsing(url) {
    const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${GOOGLE_API_KEY}`;
    const body = {
        client: { clientId: "archave-community", clientVersion: "1.0" },
        threatInfo: {
            threatTypes: ["MALWARE", "SOCIAL_ENGINEERING"],
            platformTypes: ["ANY_PLATFORM"],
            threatEntryTypes: ["URL"],
            threatEntries: [{ url }]
        }
    };

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    const data = await response.json();
    return data.matches ? "⚠️ URL mencurigakan!" : "✅ Aman";
}

                    
async function checkVirusTotal(url) {
    const apiUrl = `https://www.virustotal.com/api/v3/urls`;

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "x-apikey": VIRUSTOTAL_API_KEY,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `url=${encodeURIComponent(url)}`
    });

    const data = await response.json();
    if (!data.data || !data.data.id) return "❌ Gagal mengambil hasil";

    const analysisUrl = `https://www.virustotal.com/api/v3/analyses/${data.data.id}`;
    const analysisResponse = await fetch(analysisUrl, {
        headers: { "x-apikey": VIRUSTOTAL_API_KEY }
    });

    const analysisData = await analysisResponse.json();
    return analysisData.data?.attributes?.stats?.malicious > 0
        ? "⚠️ URL terdeteksi berbahaya!"
        : "✅ Tidak terdeteksi";
}

                              
async function checkWhois(url) {
    try {
        const hostname = new URL(url).hostname;
        const apiUrl = `https://api.api-ninjas.com/v1/whois?domain=${hostname}`;

        const response = await fetch(apiUrl, {
            headers: { "X-Api-Key": WHOIS_API_KEY }
        });

        const data = await response.json();
        return data.creation_date ? `📅 Dibuat pada ${data.creation_date}` : "❌ Tidak ditemukan";
    } catch (error) {
        return "❌ WHOIS tidak tersedia";
    }
}

                  
const handler = async (m, { conn, args }) => {
    if (!args[0]) {
        return conn.sendMessage(m.chat, { text: "❌ Masukkan URL yang ingin diperiksa!\n\nContoh: *!inspector https://example.com*" }, { quoted: m });
    }

    const url = args[0];
    await sendInspectorResult(conn, m, url);
};

handler.command = /^(inspector|inspec)$/i;                                        
handler.tags = ["tools"];
handler.help = ["inspector", "inspec <url>"];

export default handler;
