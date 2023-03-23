import { Configuration, OpenAIApi } from "openai"
var handler = async (m, { conn, usedPrefix, command, text }) => {
try {
            if (!text) return reply(`Chat dengan AI.\n\nContoh:\n${usedPrefix}${command} Halo? `);
            const configuration = new Configuration({
              apiKey: 'Your Key', // Create Your Key
            });                  // https://platform.openai.com/account/api-keys
            const openai = new OpenAIApi(configuration);

            const response = await openai.createCompletion({
              model: "text-davinci-003",
              prompt: text,
              temperature: 0, // Higher values means the model will take more risks.
              max_tokens: 2048, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
              top_p: 1, // alternative to sampling with temperature, called nucleus sampling
              frequency_penalty: 0.3, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
              presence_penalty: 0 // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
          });
            m.reply(`${response.data.choices[0].text}`);
          } catch (error) {
          if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
            console.log(`${error.response.status}\n\n${error.response.data}`);
          } else {
            console.log(error);
            m.reply("error :"+ error.message);
          }
        }
}
handler.command = /^(ai|openai)$/i
export default handler
