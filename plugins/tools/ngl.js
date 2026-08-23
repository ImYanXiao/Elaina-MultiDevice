import axios from 'axios';

   
                       
                  
                                                        
    

const handler = async (m, { text }) => {
  if (!text.split("|")[0] || !text.split("|")[1]) {
    return m.reply("Masukan username dan pesannya!\nContoh: .ngl mannr|haloo");
  }

  try {
    const [username, message] = text.split("|");
    const { data } = await axios.get(`https://manaxu-seven.vercel.app/api/tools/ngl?username=${username}&message=${message}`);
    m.reply("Sukses mengirim ngl ke " + username);
  } catch (e) {
    return m.reply("fitur error");
  }
};

handler.command = handler.help = ["ngl"];
handler.tags = ["tools"];

export default handler;
