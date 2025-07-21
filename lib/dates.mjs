export function isToday(date) {
  const today = new Date();
  if (today.toDateString() === date.toDateString()) {
    return true;
  }
  return false;
}

export function isBeforeToday(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

export function isStandupDay() {
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
