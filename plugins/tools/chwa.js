import axios from 'axios';

   
                        
   

const handler = async (m, { text }) => {
  if (!text) return m.reply("Mana linknya?");
  try {
    const { data } = await axios.get(`https://manaxu-seven.vercel.app/api/others/chwa?query=${text}`);
    const { name, follower, description } = data.result;
    const x = `*Name:* ${name}\n*Followers:* ${follower}\n*Description:* ${description}`;
    m.reply(x);
  } catch (e) {
    return m.reply("fitur eror");
  }
};

handler.command = handler.help = ["chwa"];
handler.tags = ["tools"];

export default handler;
