import fetch from 'node-fetch';

let handler = async (m, { args, usedPrefix, command }) => {
  if (command === 'convertuang' || command === 'convertuang' ||command === 'kurs' ||command === 'kursuang' || command === 'matauang' || command === 'konversiuang') {
  // if (command.match(/^(convertuang|kurs|kursuang|matauang|konversiuang$/i)) {
      // Check if there are enough arguments
      if (args.length < 1) {
          throw `Usage: ${usedPrefix}${command} <amount>|<fromCurrency>|<toCurrency>\n\nEx: *${usedPrefix}${command} 13|USD|IDR*\n\nList Currency for example =\n
USD: Dolar Amerika Serikat (Amerika Serikat)
EUR: Euro (Eurozone - sejumlah negara Eropa)
GBP: Pound Sterling (Inggris)
JPY: Yen Jepang (Jepang)
CAD: Dolar Kanada (Kanada)
AUD: Dolar Australia (Australia)
CHF: Franc Swiss (Swiss)
MYR: Ringgit Malaysia (Malaysia)
CNY: Yuan Tiongkok (Tiongkok)
IDR: Rupiah Indonesia (Indonesia)

dan lain lain (etc.), for more ? check google or https://www.bola.com/ragam/read/5334821/daftar-nama-mata-uang-berbagai-negara-di-dunia-beserta-kodenya
`;
      }

      try {
          const [amount, fromCurrency, toCurrency] = args[0].split('|');
        
        if (!amount || !fromCurrency || !toCurrency) {
            throw 'Invalid input format. Please use: <amount>|<fromCurrency>|<toCurrency>';
        }

          const apiUrl = `https://tr.deployers.repl.co/convertuang?uang=${amount}&dari=${fromCurrency}&ke=${toCurrency}`;

          const response = await fetch(apiUrl);

          if (response.ok) {
              const data = await response.json();
              const author = data.Author;
              const from = data.Dari;
              const to = data.Ke;
              const result = data.Hasil;
              const formattedData = `Author: ${author}\n\nDari: ${from}  Ke: ${to}\nHasil: ${result}`;
              m.reply(formattedData);
          } else {
              m.reply('Failed to retrieve currency conversion data. Please try again later.');
          }
      } catch (error) {
          console.error(error);
          throw 'An error occurred. Please try again later.\n\nInvalid input format. Please use: <amount>|<fromCurrency>|<toCurrency>';
      }
  }
 else if (command.match(/^(short|singkatin|singkat|bitly|tinyurl|vgd|ouo|isgd|shortlink|linkshort)$/i)) {
        if (!args[0]) throw `${usedPrefix}${command} https://mykingbee.blogspot.com/`;

        try {
            const response = await fetch(`https://tr.deployers.repl.co/short?url=${args[0]}`);

            if (response.ok) {
                const data = await response.json();
                const author = data.author;
                const bitly = data.bitly;
                const isgd = data.isgd;
                const ouo = data.ouo;
                const tinyurl = data.tinyurl;
                const vgd = data.vgd;
                const formattedData = `Author: ${author}\n\nLink Asli ${args[0]}\n=====SHORT LINK=====\nBitly: ${bitly}\nIsgd: ${isgd}\nOuo: ${ouo}\nTinyURL: ${tinyurl}\nVgd: ${vgd}`;
                m.reply(formattedData);
            } else {
                m.reply('Failed to retrieve data. Please try again later.');
            }
        } catch (error) {
            console.error(error);
            throw 'An error occurred. Please try again later.';
        }
    }
}

handler.help = [
    'convertuang <amount>|<fromCurrency>|<toCurrency>',
    'short <url>'
];
handler.tags = ['currency', 'internet'];
handler.command = /^(convertuang|kurs|kursuang|matauang|konversiuang|short|singkatin|singkat|bitly|tinyurl|vgd|ouo|isgd|shortlink|linkshort)$/i;

export default handler;
