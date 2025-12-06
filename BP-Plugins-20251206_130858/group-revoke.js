let handler = async (m, { conn }) => {
  try {
    let rest = await conn.groupRevokeInvite(m.chat);
    let linked = 'https://chat.whatsapp.com/' + rest;

    m.reply(linked);
  } catch (error) {
    console.error(error);
    m.reply('Failed to retrieve group invite link');
  }
};

handler.help = ['revoke'];
handler.tags = ['group'];
handler.command = /^re(voke|new)(invite|link)?$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
