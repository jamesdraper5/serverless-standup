'use strict';

const sendMessage = require('./lib/sendMessage'); 
const botChannelId = process.env.BOT_CHANNEL_ID; 
//const coreChannelId = process.env.CORE_CHANNEL_ID; 
const standupChannelId = process.env.STANDUP_CHANNEL_ID;

module.exports.standup = async event => {
  try {
    await sendMessage(`@online standup in 5 mins: https://digitalcrew.teamwork.com/call/chat/${standupChannelId}`, botChannelId);
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Your function executed successfully!',
          input: event,
        },
        null,
        2
      ),
    };
  } catch(e) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: 'Error',
          error: e,
          key: process.env.CHAT_API_KEY
        },
        null,
        2
      ),
    };
  }

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
