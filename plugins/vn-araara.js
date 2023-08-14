const araAudioURLs = [
  "https://bucin-livid.vercel.app/audio/ara2.mp3",
  "https://bucin-livid.vercel.app/audio/ara.mp3",
  "https://bucin-livid.vercel.app/audio/audio_ara-ara.mp3",
"https://anonymfile.com/VLbxz/aracute.mp3"
];

let handler = async (m, { conn }) => {
  const randomAraAudio = araAudioURLs[Math.floor(Math.random() * araAudioURLs.length)];
  
  conn.sendFile(m.chat, randomAraAudio, "ara.mp3", null, m, true, {
    type: "audioMessage",
    ptt: true,
  });
};

handler.tags = ['Hiburan'];
handler.help = ['.ara'];
handler.command = /^(Ara ara|ara ara|Ara|ara)$/i;

export default handler;
