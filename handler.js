"use strict";

const sendMessage = require("./lib/sendMessage");
//const customFieldsDevsChannelUrl = 'https://chat-hooks.us.teamwork.com/v1/in/1/52ed7609-7161-460f-8745-d4b319e6eec1';
//const coreChannelUrl = 'https://chat-hooks.us.teamwork.com/v1/in/1/8f7a24d5-f6c5-45f9-a60c-b579d0bf4838';
const standupChannelUrl =
  "https://chat-hooks.us.teamwork.com/v1/in/1/eff5224e-6dd2-4e04-b9b5-db04906f4db4";
const standupCallUrl = "https://meet.google.com/aci-ziuw-end";
const standupFreeDates = require("./lib/standupFreeDates");

function isToday(date) {
  const today = new Date();
  if (today.toDateString() === date.toDateString()) {
    return true;
  }
  return false;
}

function isBeforeToday(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

function isStandupDay() {
  var isStandupDay = true;
  for (const date of standupFreeDates.dates) {
    if (isToday(new Date(date))) {
      console.log("no standup today", date);
      isStandupDay = false;
      break;
    }
  }
  console.log("isStandupDay", isStandupDay);
  return isStandupDay;
}

module.exports.standup = async (event) => {
  try {
    if (isStandupDay()) {
      console.log("sending....");
      await sendMessage(
        `@online it's standup time! ${standupCallUrl}`,
        standupChannelUrl
      );
    }
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
