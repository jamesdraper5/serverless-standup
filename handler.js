"use strict";

const sendMessage = require("./lib/sendMessage");
//const customFieldsDevsChannelUrl = 'https://chat-hooks.us.teamwork.com/v1/in/1/52ed7609-7161-460f-8745-d4b319e6eec1';
//const coreChannelUrl = 'https://chat-hooks.us.teamwork.com/v1/in/1/8f7a24d5-f6c5-45f9-a60c-b579d0bf4838';
const standupChannelUrl =
  "https://chat-hooks.us.teamwork.com/v1/in/1/eff5224e-6dd2-4e04-b9b5-db04906f4db4";
const standupCallUrl = "https://gather.town/app/6PcGDAaDAdm2mpoJ/bravooffice";

module.exports.standup = async (event) => {
  try {
    await sendMessage(
      `@online standup in 5 mins - :notebook: feed me some notes if you can't attend - ${standupCallUrl}`,
      standupChannelUrl
    );
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: "Your function executed successfully!",
          input: event,
        },
        null,
        2
      ),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: "Error",
          error: e,
        },
        null,
        2
      ),
    };
  }
};
