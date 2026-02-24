/*import {
  WAMessageStubType
} from "@adiwajshing/baileys";
export async function before(m) {
  try {
    if (!(m && !m.isBaileys && m.messageStubType && m.sender && m.isGroup)) return !1;
    const edtr = `@${m.sender.split("@")[0]}`,
      messages = {
		119: `Group Create!`,
		120: `Failed Create Group!`,
		121: `Bouncing Group!`,
		132: `Group Link Has Been Reset!`,
		133: `Group Invite Link is Locked`,
		140: `New Member Joined Group`,
		141: `Joined Group Using Link`,
		143: `Set Ephemeral In Message`,
		144: `Request Approval to Join Group`,
		145: `Join Approval Mode Set In Group`, 
		147: `Group Members Has Been Promoted`,
		148: `Group Members Have Been Demoted`, 
		149: `Main Group Has Been Removed From Community`,
		172: `Request Approval to Join Non-Admins in Groups`, 
		181: `Start a Connected Group Call`,
		1: `Has Been Reset Group Link`,
		22: `Has Been Changed Group Icon`, 
		23: `Change Group Invite Link`,
		24: `Change the Group Description\n\n${m.messageStubParameters[0]}`,
		25: `Has been set to *${m.messageStubParameters[0] == 'on' ? 'Admin Only' : 'All Participat'}* can edit group info`,
		26: `Change Group Announcement Settings`,
		26: `Has *${m.messageStubParameters[0] == 'on' ? 'Closed' : 'Opened'}* Group!\nNow ${m.messageStubParameters[0] == 'on' ? 'Admin Only' : 'All Participat'} Can send message`,
		28: `Member Removed From Group`, 
		29: `Promoted @${m.messageStubParameters[0].split('@')[0]} Become Admin`,
		30: `Demoted @${m.messageStubParameters[0].split('@')[0]} From Admin`,
		32: `Member Leave From Group`,
		33: `Has Changed Number`,
		37: `General Notice`,
		40: `Missed Group Voice Call`,
		41: `Missed Group Video Call`,
		45: `Started VideoCall/AudioCall in Group`,
		71: `Request to Join a Group`,
		72: `Changed Ephemeral Group Become *@${m.messageStubParameters[0]}* `,
		21: `Group Subject Has Been Changed To:\n*${m.messageStubParameters[0]}*`
	}, 
      messageType = messages[m.messageStubType];
    if (!Object.prototype.hasOwnProperty.call(messages, m.messageStubType)) return;
    const resultString = WAMessageStubType[m.messageStubType].split("_").map(word => "UNKNOWN" === word ? "Tidak Diketahui" : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
    await this.reply(m.chat, `${edtr} ${messageType}`, null, {
      contextInfo: {
        mentionedJid: void 0 !== m.messageStubParameters[0] ? [m.sender, m.messageStubParameters[0]] : [m.sender],
        externalAdReply: {
          title: "Group Notifications",
          body: "The Journey Of Elaina",
          sourceUrl: "",
          mediaType: 1,
          thumbnailUrl: global.minel
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
}
export const disabled = !1;*/