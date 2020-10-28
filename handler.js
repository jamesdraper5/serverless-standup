'use strict';

const sendMessage = require('./lib/sendMessage');
//const customFieldsDevsChannelUrl = 'https://chat-hooks.us.teamwork.com/v1/in/1/52ed7609-7161-460f-8745-d4b319e6eec1';
const coreChannelUrl = 'https://chat-hooks.us.teamwork.com/v1/in/1/8f7a24d5-f6c5-45f9-a60c-b579d0bf4838';
const coreChannelId = process.env.CORE_CHANNEL_ID;
const standupCallUrl = 'https://meet.google.com/yuk-dpcv-xgn'

module.exports.standup = async event => {
  try {
    await sendMessage(`@online standup in 5 mins - ${standupCallUrl}`, coreChannelUrl);
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
