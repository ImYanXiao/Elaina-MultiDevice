import axios from 'axios';

   
                        
   

const handler = async (m, { text }) => {
  if (!text) return m.reply("Masukan query!");
  try {
    const { data } = await axios.get(`https://manaxu-seven.vercel.app/api/tools/scanner?url=${text}`);
    let v = "*S C A N N E R  D O M A I N*\n--------------------------------------------------";
    for (const x of data.result) {
      v += `\n*issuer_ca_id:* ${x.issuer_ca_id}`;
      v += `\n*issuer_name:* ${x.issuer_name}`;
      v += `\n*common_name:* ${x.common_name}`;
      v += `\n*name_value:* ${x.name_value}`;
      v += `\n*id:* ${x.id}`;
      v += `\n*entry_timestamp:* ${x.entry_timestamp}`;
      v += `\n*not_before:* ${x.not_before}`;
      v += `\n*not_after:* ${x.not_after}`;
      v += `\n*serial_number:* ${x.serial_number}`;
      v += `\n*result_count:* ${x.result_count}`;
      v += `\n--------------------------------------------------\n`;
    }
    m.reply(v);
  } catch (e) {
    return m.reply("fitur eror");
  }
};

handler.command = handler.help = ["scanner"];
handler.tags = ["tools"];

export default handler;
