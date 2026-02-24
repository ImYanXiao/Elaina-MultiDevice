export async function before(m) {
  this.ev.on('call', async (call) => {
      console.log('Received call event:', call);
      if (call[0].status == 'offer') {
        console.log('Call status is offer. Call data:', call[0]);
        console.log('Rejecting call from:', call[0].from, 'with id:', call[0].id);
        await this.rejectCall(call[0].id, call[0].from);
        const replyMsg = `*⚠️ WARNING*\nDon't call now you are blocked for calling please contact the owner\n\t*wa.me/${global.owner}*`;
        console.log('Sending reply to:', call[0].from, 'with message:', replyMsg);
        await conn.reply(call[0].from, replyMsg);
        console.log('Updating block status for:', call[0].from);
        await this.updateBlockStatus(call[0].from, "block");
      } else {
        console.log('Call status is not offer. No action taken.', call[0]);
      }
  });
}