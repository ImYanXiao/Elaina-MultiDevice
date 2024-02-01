// support me on https://trakteer.id/xnuvers007
// 👍🏻

import fetch from 'node-fetch';

async function getFinalUrl(url) {
    const response = await fetch(url, { method: 'GET', redirect: 'follow' });
    if (response.headers.get('location')) {
        return await getFinalUrl(response.headers.get('location'));
    }
    return url || response.url;
}

var handler = async (m, { args, conn, usedPrefix, command }) => {
    if (!args[0]) {
        throw `Input URL\nEx: ${usedPrefix + command} https://www.facebook.com/groups/175204112986693/permalink/1621191825054574/?mibextid=Nif5oz\n\n*Peringatan:* Dilarang menggunakan link fb.watch, karena tidak dapat diakses langsung. Harap salin link tersebut, buka browser, dan tempelkan di sana. Salin link yang diakses dan gunakan di sini.\n\nTutor: https://i.ibb.co/tPwcCLj/image-1.png`;
    }

    try {
        if (args[0].includes('fb.watch')) {
            throw '*Dilarang menggunakan link fb.watch. Harap salin link tersebut, buka browser, dan tempelkan di sana. Salin link yang diakses dan gunakan di sini.*\n\nTutor: https://i.ibb.co/tPwcCLj/image-1.png';
        }

        const res = await fetch(args[0]);
        const finalUrl = (await getFinalUrl(args[0])) || res.url;

        await conn.reply(m.chat, `Redirected URL: ${finalUrl}\n\n${global.wait}`, m);

        const server = `https://vihangayt.me/download/alldownload?url=${finalUrl}`;

        const hasil = await fetch(server);
        const data = await hasil.json();

        if (data.status) {
            await conn.sendFile(m.chat, data.data.thumbnail, 'thumbnail.jpg', `Title: ${data.data.title}\nURL: ${data.data.url}`);

            if (Array.isArray(data.data.medias)) {
                for (const media of data.data.medias) {
                    const { url, quality, formattedSize, videoAvailable, audioAvailable, chunked, cached } = media;

                    const sizeInfo = formattedSize ? `\nSize: ${formattedSize}` : '';
                    const videoInfo = videoAvailable !== undefined ? `\nAda Video: ${videoAvailable}` : '';
                    const audioInfo = audioAvailable !== undefined ? `\nAda Audio: ${audioAvailable}` : '';
                    const chunkedInfo = chunked !== undefined ? `\nTerpotong-potong: ${chunked}` : '';
                    const cachedInfo = cached !== undefined ? `\nCache: ${cached}` : '';

                    await conn.sendFile(m.chat, url, `${quality}.mp4`, `Quality: ${quality}${sizeInfo}${videoInfo}${audioInfo}${chunkedInfo}${cachedInfo}\n\n${global.wm}\nDonasi: ${global.nomorown}`);
                }
            } else {
                console.warn('Warning: Media data is not iterable or is undefined.');
            }
        } else {
            throw 'Error fetching Facebook media. Please try again later.';
        }
    } catch (error) {
        console.error('Error:', error);
        conn.reply(m.chat, `An error occurred while processing the request. \n\n${error}`, m);
    }
};

// Konfigurasi bantuan dan tag
handler.help = ['fbdownload <url>'];
handler.tags = ['downloader'];
handler.command = /^(fbdownload|fb(dl)?)$/i;

export default handler;

// versi obfuscatengentod :)
// const _0x3475a6=_0x7d3f;(function(_0x155bb0,_0x2562f9){const _0x328172=_0x7d3f,_0x1e4f52=_0x155bb0();while(!![]){try{const _0x1133e6=parseInt(_0x328172(0xcb))/0x1+-parseInt(_0x328172(0xb8))/0x2+-parseInt(_0x328172(0xb9))/0x3*(parseInt(_0x328172(0xd4))/0x4)+parseInt(_0x328172(0xe8))/0x5+-parseInt(_0x328172(0xd0))/0x6+-parseInt(_0x328172(0xba))/0x7*(parseInt(_0x328172(0xaf))/0x8)+-parseInt(_0x328172(0xbb))/0x9*(-parseInt(_0x328172(0xc0))/0xa);if(_0x1133e6===_0x2562f9)break;else _0x1e4f52['push'](_0x1e4f52['shift']());}catch(_0x2c2c3f){_0x1e4f52['push'](_0x1e4f52['shift']());}}}(_0x381e,0xafce0));const _0x2e4376=(function(){let _0x11437b=!![];return function(_0x22445a,_0xc8639f){const _0x475dae=_0x11437b?function(){const _0x3d6645=_0x7d3f;if(_0xc8639f){const _0x1770f2=_0xc8639f[_0x3d6645(0xd9)](_0x22445a,arguments);return _0xc8639f=null,_0x1770f2;}}:function(){};return _0x11437b=![],_0x475dae;};}()),_0x120e0f=_0x2e4376(this,function(){const _0x2c8f7b=_0x7d3f;return _0x120e0f[_0x2c8f7b(0xe0)]()[_0x2c8f7b(0xd3)](_0x2c8f7b(0xcc))[_0x2c8f7b(0xe0)]()[_0x2c8f7b(0xd7)](_0x120e0f)[_0x2c8f7b(0xd3)](_0x2c8f7b(0xcc));});_0x120e0f();const _0x233c73=(function(){let _0x564b13=!![];return function(_0x3106d0,_0x193efd){const _0x4e2c8c=_0x564b13?function(){const _0xe8b501=_0x7d3f;if(_0x193efd){const _0x3455b7=_0x193efd[_0xe8b501(0xd9)](_0x3106d0,arguments);return _0x193efd=null,_0x3455b7;}}:function(){};return _0x564b13=![],_0x4e2c8c;};}()),_0xfd8d43=_0x233c73(this,function(){const _0xe6103a=_0x7d3f,_0x171bcc=function(){const _0x3228bf=_0x7d3f;let _0x554d14;try{_0x554d14=Function('return\x20(function()\x20'+_0x3228bf(0xd8)+');')();}catch(_0x59522b){_0x554d14=window;}return _0x554d14;},_0x531d70=_0x171bcc(),_0x23d76b=_0x531d70[_0xe6103a(0xb2)]=_0x531d70[_0xe6103a(0xb2)]||{},_0xfefeed=[_0xe6103a(0xe5),'warn',_0xe6103a(0xb6),_0xe6103a(0xd1),'exception',_0xe6103a(0xae),'trace'];for(let _0x3459e2=0x0;_0x3459e2<_0xfefeed[_0xe6103a(0xe9)];_0x3459e2++){const _0x2138cc=_0x233c73['constructor'][_0xe6103a(0xb4)][_0xe6103a(0xc7)](_0x233c73),_0x4c55a6=_0xfefeed[_0x3459e2],_0x19e23e=_0x23d76b[_0x4c55a6]||_0x2138cc;_0x2138cc['__proto__']=_0x233c73[_0xe6103a(0xc7)](_0x233c73),_0x2138cc[_0xe6103a(0xe0)]=_0x19e23e[_0xe6103a(0xe0)]['bind'](_0x19e23e),_0x23d76b[_0x4c55a6]=_0x2138cc;}});_0xfd8d43();import _0xca9e99 from'node-fetch';function _0x7d3f(_0x44a88e,_0x54ce0c){const _0x2eaa11=_0x381e();return _0x7d3f=function(_0xfd8d43,_0x233c73){_0xfd8d43=_0xfd8d43-0xab;let _0x331778=_0x2eaa11[_0xfd8d43];return _0x331778;},_0x7d3f(_0x44a88e,_0x54ce0c);}async function getFinalUrl(_0x348c3b){const _0x1d2351=_0x7d3f,_0x57403d=await _0xca9e99(_0x348c3b,{'method':_0x1d2351(0xc8),'redirect':_0x1d2351(0xc4)});if(_0x57403d[_0x1d2351(0xb3)][_0x1d2351(0xd6)]('location'))return await getFinalUrl(_0x57403d[_0x1d2351(0xb3)]['get'](_0x1d2351(0xac)));return _0x348c3b||_0x57403d['url'];}var handler=async(_0x1e7137,{args:_0x469562,conn:_0x27b12c,usedPrefix:_0x425263,command:_0xd379c0})=>{const _0x252e65=_0x7d3f;if(!_0x469562[0x0])throw _0x252e65(0xbe)+(_0x425263+_0xd379c0)+_0x252e65(0xd5);try{if(_0x469562[0x0][_0x252e65(0xc1)](_0x252e65(0xbc)))throw _0x252e65(0xce);const _0x53c96a=await _0xca9e99(_0x469562[0x0]),_0x283386=await getFinalUrl(_0x469562[0x0])||_0x53c96a[_0x252e65(0xde)];await _0x27b12c['reply'](_0x1e7137[_0x252e65(0xd2)],'Redirected\x20URL:\x20'+_0x283386+'\x0a\x0a'+global['wait'],_0x1e7137);const _0x2828c8=_0x252e65(0xe6)+_0x283386,_0x30712f=await _0xca9e99(_0x2828c8),_0x1ca8b6=await _0x30712f[_0x252e65(0xdc)]();if(_0x1ca8b6[_0x252e65(0xe2)]){await _0x27b12c[_0x252e65(0xb7)](_0x1e7137[_0x252e65(0xd2)],_0x1ca8b6[_0x252e65(0xe7)][_0x252e65(0xc3)],_0x252e65(0xbd),'Title:\x20'+_0x1ca8b6[_0x252e65(0xe7)][_0x252e65(0xca)]+_0x252e65(0xe3)+_0x1ca8b6[_0x252e65(0xe7)][_0x252e65(0xde)]);if(Array['isArray'](_0x1ca8b6['data'][_0x252e65(0xbf)]))for(const _0xf0796c of _0x1ca8b6['data'][_0x252e65(0xbf)]){const {url:_0x52b719,quality:_0x2e3fcf,formattedSize:_0x546a5c,videoAvailable:_0x141886,audioAvailable:_0x36b844,chunked:_0x2aa67c,cached:_0x30e056}=_0xf0796c,_0x56f0a9=_0x546a5c?'\x0aSize:\x20'+_0x546a5c:'',_0x98fda9=_0x141886!==undefined?_0x252e65(0xda)+_0x141886:'',_0x664212=_0x36b844!==undefined?_0x252e65(0xe4)+_0x36b844:'',_0x2f76cd=_0x2aa67c!==undefined?_0x252e65(0xcf)+_0x2aa67c:'',_0x227f65=_0x30e056!==undefined?_0x252e65(0xcd)+_0x30e056:'';await _0x27b12c[_0x252e65(0xb7)](_0x1e7137[_0x252e65(0xd2)],_0x52b719,_0x2e3fcf+_0x252e65(0xc2),_0x252e65(0xe1)+_0x2e3fcf+_0x56f0a9+_0x98fda9+_0x664212+_0x2f76cd+_0x227f65+'\x0a\x0a'+global['wm']+_0x252e65(0xab)+global['nomorown']);}else console[_0x252e65(0xb5)](_0x252e65(0xb1));}else throw _0x252e65(0xb0);}catch(_0x39d130){console[_0x252e65(0xd1)](_0x252e65(0xc9),_0x39d130),_0x27b12c[_0x252e65(0xdd)](_0x1e7137['chat'],_0x252e65(0xc6)+_0x39d130,_0x1e7137);}};handler[_0x3475a6(0xc5)]=[_0x3475a6(0xdb)],handler[_0x3475a6(0xdf)]=['downloader'],handler[_0x3475a6(0xad)]=/^(fbdownload|fb(dl)?)$/i;function _0x381e(){const _0x587a1b=['774254pqiJAS','10401oCZhSJ','866152iLkMIO','9053235hgMkSn','fb.watch','thumbnail.jpg','Input\x20URL\x0aEx:\x20','medias','10FGJNtt','includes','.mp4','thumbnail','follow','help','An\x20error\x20occurred\x20while\x20processing\x20the\x20request.\x20\x0a\x0a','bind','GET','Error:','title','1258597ymOCPL','(((.+)+)+)+$','\x0aCache:\x20','*Dilarang\x20menggunakan\x20link\x20fb.watch.\x20Harap\x20salin\x20link\x20tersebut,\x20buka\x20browser,\x20dan\x20tempelkan\x20di\x20sana.\x20Salin\x20link\x20yang\x20diakses\x20dan\x20gunakan\x20di\x20sini.*','\x0aTerpotong-potong:\x20','31368wMOnve','error','chat','search','1336eEyQEh','\x20https://www.facebook.com/groups/175204112986693/permalink/1621191825054574/?mibextid=Nif5oz\x0a\x0a*Peringatan:*\x20Dilarang\x20menggunakan\x20link\x20fb.watch,\x20karena\x20tidak\x20dapat\x20diakses\x20langsung.\x20Harap\x20salin\x20link\x20tersebut,\x20buka\x20browser,\x20dan\x20tempelkan\x20di\x20sana.\x20Salin\x20link\x20yang\x20diakses\x20dan\x20gunakan\x20di\x20sini.','get','constructor','{}.constructor(\x22return\x20this\x22)(\x20)','apply','\x0aAda\x20Video:\x20','fbdownload\x20<url>','json','reply','url','tags','toString','Quality:\x20','status','\x0aURL:\x20','\x0aAda\x20Audio:\x20','log','https://vihangayt.me/download/alldownload?url=','data','4979025OHjEHZ','length','\x0aDonasi:\x20','location','command','table','64AmCyIm','Error\x20fetching\x20Facebook\x20media.\x20Please\x20try\x20again\x20later.','Warning:\x20Media\x20data\x20is\x20not\x20iterable\x20or\x20is\x20undefined.','console','headers','prototype','warn','info','sendFile'];_0x381e=function(){return _0x587a1b;};return _0x381e();}export default handler;
