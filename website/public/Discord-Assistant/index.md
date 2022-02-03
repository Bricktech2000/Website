## The Idea

A few days ago, I discovered that [Wolfram|Alpha](https://www.wolframalpha.com/), a website I had been using for years, had a fully documented API for anyone to use.

> WolframAlpha is a computational knowledge engine or answer engine developed by WolframAlpha LLC, a subsidiary of Wolfram Research. It is an online service that answers factual queries directly by computing the answer from externally sourced "curated data", rather than providing a list of documents or web pages that might contain the answer, as a search engine might.
>
> [Wikipedia](https://en.wikipedia.org/wiki/WolframAlpha)

When I saw that, I knew I had to build some kind of program that could take full advantage of this service. This is where a Discord bot I've been working on for the last few days comes in.

[Discord Assistant](https://github.com/Bricktech2000/Discord-Assistant) &mdash; creative, I know &mdash; is a bot that can automatically answer technical questions on Discord. To give you an idea of its capabilities, below are a few examples showing the kind of questions it is able to answer.
#demo

|                                                               |                                                               |
| ------------------------------------------------------------- | ------------------------------------------------------------- |
| ![query and response 1](Screenshot%202021-09-21%20204257.png) | ![query and response 2](Screenshot%202021-09-21%20204452.png) |
| ![query and response 3](Screenshot%202021-09-21%20204341.png) | ![query and response 4](Screenshot%202021-09-21%20204606.png) |
| ![query and response 5](Screenshot%202021-09-21%20145935.png) | ![query and response 6](Screenshot%202021-09-21%20150036.png) |

## How it Works

Unfortunately, I didn't program the _intelligent_ part of this bot. Below a simplified diagram of how that works under the hood.

```plaintext
                | -----user-message-----> |             | -----wolfram-query-----> |
 Discord Server |                         | Discord Bot |                          | Wolfram|Alpha
                | <----message-embed----- |             | <----query-response----- |
```

Let me explain how it functions in a few simple steps:

1. When a user sends a message on a Discord server which has [Discord Assistant](https://discord.com/api/oauth2/authorize?client_id=888313324444463144&permissions=0&scope=bot) as a member, a bunch of data is sent to the bot.
2. When the bot receives the message data, it cleans it up by removing mentions from the message content. Then, it sends it over to [Wolfram|Alpha](https://www.wolframalpha.com/), which does all the heavy lifting for us.
3. When a response is received from [Wolfram|Alpha](https://www.wolframalpha.com/), it gets cleaned up further and is then formatted into a [Discord Message Embed](https://discordjs.guide/popular-topics/embeds.html#embed-preview). Finally, it gets sent back to the original Discord server.

The bulk of the processing is done on [Wolfram|Alpha](https://www.wolframalpha.com/)'s end, meaning the bot simply has to act as a bridge between casual conversations on Discord and technical questions to send to [Wolfram|Alpha](https://www.wolframalpha.com/).
#try

## Adding This Bot to Your Server

If all of that sounds interesting, you can [click here](https://discord.com/api/oauth2/authorize?client_id=888313324444463144&permissions=0&scope=bot) to invite [Discord Assistant](https://github.com/Bricktech2000/Discord-Assistant) to one of your servers. However, if you wish to host the bot yourself to have complete control over its functionality, you should take a look at the `README.md` in [the project's Github](https://github.com/Bricktech2000/Discord-Assistant).

## What I Learned

Even though this project didn't turn out as useful as I would've hoped, I learned a bunch when working on it. I now know how to write [Discord bots](https://discord.com/developers/docs/intro) that can output a nicely formatted answer, and I learned how to parse and clean up complex responses from the [Wolfram|Alpha Full Results API](https://products.wolframalpha.com/api/documentation/). Moreover, since very few people use this API, I had to resort to [reading documentation](https://products.wolframalpha.com/api/documentation/) and debugging issues entirely on my own.

This project was an awesome learning opportunity for me, and that's the only thing that matters to my ears!
