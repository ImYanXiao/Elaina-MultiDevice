  
                            
                    

          
                         

              
                                                 



                               
                                  


                                                                                             
                                                                                           
                    
  





let handler = async(m, { conn, usedPrefix, command, text }) => {
  let enc = {
    "a": "•-",
    "b": "-•••",
    "c": "-•-•",
    "d": "-••",
    "e": "•",
    "f": "••-•",
    "g": "--•",
    "h": "••••",
    "i": "••",
    "j": "•---",
    "k": "-•-",
    "l": "•-••",
    "m": "--",
    "n": "-•",
    "o": "---",
    "p": "•--•",
    "q": "--•-",
    "r": "•-•",
    "s": "•••",
    "t": "-",
    "u": "••-",
    "v": "•••-",
    "w": "•--",
    "x": "-••-",
    "y": "-•--",
    "z": "--••",
    "0": "-----",
    "1": "•----",
    "2": "••---",
    "3": "•••--",
    "4": "••••-",
    "5": "•••••",
    "6": "-••••",
    "7": "--•••",
    "8": "---••",
    "9": "----•",
    "?": "••--••",
    "!": "-•-•--",
    ".": "•-•-•-",
    ",": "--••--",
    ";": "-•-•-•",
    ":": "---•••",
    "+": "•-•-•",
    "-": "-••••-",
    "/": "-••-•",
    "=": "-•••-",
    " ": "/"
  }

  let dec = {
    "-----": "0",
    "•----": "1",
    "••---": "2",
    "•••--": "3",
    "••••-": "4",
    "•••••": "5",
    "-••••": "6",
    "--•••": "7",
    "---••": "8",
    "----•": "9",
    "•-": "a",
    "-•••": "b",
    "-•-•": "c",
    "-••": "d",
    "•": "e",
    "••-•": "f",
    "--•": "g",
    "••••": "h",
    "••": "i",
    "•---": "j",
    "-•-": "k",
    "•-••": "l",
    "--": "m",
    "-•": "n",
    "---": "o",
    "•--•": "p",
    "--•-": "q",
    "•-•": "r",
    "•••": "s",
    "-": "t",
    "••-": "u",
    "•••-": "v",
    "•--": "w",
    "-••-": "x",
    "-•--": "y",
    "--••": "z",
    "••--••": "?",
    "-•-•--": "!",
    "•-•-•-": ".",
    "--••--": ",",
    "-•-•-•": ";",
    "---•••": ":",
    "•-•-•": "+",
    "-••••-": "-",
    "-••-•": "/",
    "-•••-": "=",
    "/": " "
  }

  let selected = text.toLowerCase().split(" ")[0] + " "
  if(selected == "encode ") {
    let str = text.replace(selected, "").toLowerCase()
    let Output_Morse = ""
    for(let i of str) {
      if(!enc[i]) Output_Morse += i
      for(let j in enc) {
        if(j == i) Output_Morse += enc[i] + " "
      }
    }

    m.reply(Output_Morse)
  } else if(selected == "decode ") {
    let str = text.replace(selected, "").replace(/[.]/g, "•")
    let Output_String = ""
    for(let i of str.split(" ")) {
      if(!dec[i]) Output_String += i
      for(let j in dec) {
        if(j == i) Output_String += dec[i]
      }
    }
    m.reply(Output_String)
  } else {
    m.reply(`Kode morse encode / decode\nUsage :\n\nEncode : ${usedPrefix}${command} encode Hello World\nDecode : ${usedPrefix}${command} decode •••• • •-•• •-•• --- / •-- --- •-• •-•• -••`)
  }
}

handler.help = ["morse"]
handler.tags = ["tools"]
handler.command = /^(morse)/i

export default handler
