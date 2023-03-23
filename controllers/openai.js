require("dotenv").config({path: "../config.env"});

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.APPSETTINGS_OPENAI_API_SECRET,
});
const openai = new OpenAIApi(configuration);

//summarize text
exports.summarize = async (req, res, next) => {
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
        next(err);
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


//Chat with Yoda
exports.chatbot = async (req, res) => {
    const { text } = req.body;

    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system", 
                    content: `You are a chatbot that has the personality of Yoda from Star Wars.  Answer questions similar to how Yoda would: \n${text}`,
                },
                {
                    role: "user", 
                    content: "What is your name?",
                },
                {
                    role: "assistant", 
                    content: "Yoda my name is.",
                },
                {
                    role: "user", 
                    content: "How old are you?",
                },
                {
                    role: "assistant", 
                    content: "Old I am.  900 years old I am.",
                },
                {
                    role: "user", 
                    content: "What is your favorite color?",
                },
                {
                    role: "assistant", 
                    content: "Green my favorite color is.",
                },
                {
                    role: "user", 
                    content: `\n${text}`,
                }
            ],
            max_tokens: 300,
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


//Convert english to javascript
exports.jsConverter = async (req, res) => {
    const { text } = req.body;

    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user", 
                    content: `Convert these instructions into javascript code: \n${text}`,
                }
            ],
            max_tokens: 400,
            temperature: 0.25,
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


//Generate a scifi image
exports.scifi = async (req, res) => {
    const { text } = req.body;

    try {
        const response = await openai.createImage({
            prompt: `Generate a sci-fi image of ${text} `,
            n: 1,
            size: "512x512",
            
        });
        if (response["data"]) {
            return res.status(200).json( response["data"]["data"][0]["url"]);
        } else {
            return res.status(404).json({ message: "No message in response" });
        }
    } catch (err) {
        return res.status(404).json({ message: err.message});
    }
}
