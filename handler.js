"use strict";

const sendMessage = require("./lib/sendMessage");
//const customFieldsDevsChannelUrl = 'https://chat-hooks.us.teamwork.com/v1/in/1/52ed7609-7161-460f-8745-d4b319e6eec1';
//const coreChannelUrl = 'https://chat-hooks.us.teamwork.com/v1/in/1/8f7a24d5-f6c5-45f9-a60c-b579d0bf4838';
const standupChannelUrl =
  "https://chat-hooks.us.teamwork.com/v1/in/1/eff5224e-6dd2-4e04-b9b5-db04906f4db4";
const standupCallUrl = "https://gather.town/app/6PcGDAaDAdm2mpoJ/bravooffice";
const yearEndDate = new Date("2022-12-16");
const standupFreeDates = [
  "2022-10-24",
  "2022-11-04",
  "2022-11-07",
  "2022-11-17",
  "2022-11-18",
  "2022-11-21",
  "2022-12-02",
  "2022-12-05",
  "2022-12-16",
];

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
  for (const date of standupFreeDates) {
    if (isToday(new Date(date))) {
      console.log("no standup today", date);
      isStandupDay = false;
      break;
    }
  }
  console.log("isStandupDay", isStandupDay);
  return isStandupDay;
}

function shouldSendMessage() {
  const isYearEnd = isBeforeToday(yearEndDate);
  console.log("isYearEnd", isYearEnd);
  // if (isYearEnd) return false;
  if (!isStandupDay()) return false;
  return true;
}

module.exports.standup = async (event) => {
  try {
    if (shouldSendMessage()) {
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
