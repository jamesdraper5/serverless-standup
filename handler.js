'use strict';

const sendMessage = require('./lib/sendMessage'); 
const customFieldsDevsChannelUrl = 'https://chat-hooks.us.teamwork.com/v1/in/1/52ed7609-7161-460f-8745-d4b319e6eec1';
//const coreChannelUrl = '';
const coreChannelId = process.env.CORE_CHANNEL_ID; 

module.exports.standup = async event => {
  try {
    await sendMessage(`@online standup in 5 mins: https://digitalcrew.teamwork.com/call/chat/${coreChannelId}`, customFieldsDevsChannelUrl);
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
          error: e
        },
        null,
        2
      ),
    };
  }
};
