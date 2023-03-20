require("dotenv").config({path: "../config.env"});

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_SECRET,
});
const openai = new OpenAIApi(configuration);

//summarize text
exports.summarize = async (req, res) => {
    const { text } = req.body;

    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user", 
                    content: `Summarize this: \n${text}`
                }
            ],
            max_tokens: 500,
            temperature: 0.5,
        });
        console.log('Response: ' + response);
        if (response["data"]["choices"][0]) {
            return res.status(200).json( response["data"]["choices"][0]["message"]["content"]);
        } else {
            return res.status(404).json({ message: "No message in response" });
        }
    } catch (err) {
        return res.status(404).json({ message: err.message});
    }
}

//Generate a paragraph
exports.paragraph = async (req, res) => {
    const { text } = req.body;

    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user", 
                    content: `Write a detailed paragraph about: \n${text}`,
                }
            ],
            max_tokens: 500,
            temperature: 0.5,
        });
        if (response["data"]["choices"][0]) {
            return res.status(200).json( response["data"]["choices"][0]["message"]["content"]);
        } else {
            return res.status(404).json({ message: "No message in response" });
        }
    } catch (err) {
        return res.status(404).json({ message: err.message});
    }
}
