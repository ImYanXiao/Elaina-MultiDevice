import moment from 'moment-timezone';
import fs from 'fs';

let resetHandler = async (m, { conn }) => {
    let limVerified = 1000;                                 
    let limUnverified = 500;                                   

                                                                  
    let users = Object.entries(global.db.data.users);                       
    let resetCount = 0;

    for (let [who, user] of users) {
                                                                                    
        if (typeof user !== 'object') {
            global.db.data.users[who] = {};                          
            user = global.db.data.users[who];                                            
        }

                                                
        user.limit = user.verif ? limVerified : limUnverified;
        user.command = 0;                         
        user.commandlimit = 0;                        
        resetCount++;
    }

                                     
    conn.reply(
        chatId,
        `*Berhasil direset limit menjadi ${limVerified} untuk verified user dan ${limUnverified} untuk unverified user, command dan commandlimit menjadi 0 untuk ${resetCount} pengguna*`,
        m
    );

                                                                        
    let owner = global.config.owner;
    let currentTime = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
    conn.sendMessage(owner, `✅ Reset limit selesai pada ${currentTime}. Total ${resetCount} pengguna telah direset.`, { quoted: m });
};

resetHandler.help = ['resetlimit'].map(v => 'reset' + v);                         
resetHandler.tags = ['owner'];                     
resetHandler.command = /^(resetlimit)$/i;                              
resetHandler.owner = true;                                   

                        
function isNumber(x = 0) {
    x = parseInt(x);
    return !isNaN(x) && typeof x === 'number';
}

                                   
setInterval(async () => {
    let currentTime = moment().tz('Asia/Jakarta').format('HH');
    if (currentTime === '00') {
        let owner = global.config.owner;
        let resetCount = 0;
        let users = Object.entries(global.db.data.users);

        for (let [who, user] of users) {
            if (typeof user !== 'object') {
                global.db.data.users[who] = {};
                user = global.db.data.users[who];
            }
            user.limit = user.verif ? 1000 : 500;
            user.command = 0;
            user.commandlimit = 0;
            resetCount++;
        }

                                               
        conn.sendMessage(owner, `✅ Reset limit selesai pada ${moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss')}. Total ${resetCount} pengguna telah direset.`, { quoted: m });
    }
}, 3600000);                           

export default resetHandler;
