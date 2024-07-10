export function getTimeDifference(dateTime) {
  const timeFrom = dateTime.slice(0, 5);
  const timeTo = dateTime.slice(6);
  const [hours1, minutes1] = timeFrom.split(':').map(Number);
  const [hours2, minutes2] = timeTo.split(':').map(Number);
  const totalMinutes1 = (hours1 * 60) + minutes1;
  const totalMinutes2 = (hours2 * 60) + minutes2;
  let diffInMinutes = Math.abs(totalMinutes1 - totalMinutes2);
  const diffHours = Math.floor(diffInMinutes / 60);
  const diffMinutes = diffInMinutes % 60;
  return { hours: diffHours, minutes: diffMinutes, formattedToday: getTodayDay() };
}

export function getTodayDay() {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  const formattedToday = dd + '.' + mm + '.' + yyyy;
  const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);
  const formattedTodayHour = `${padL(today.getHours())}:${padL(today.getMinutes())}:${padL(today.getSeconds())}`
  return { formattedToday: formattedToday, formattedTodayHour: formattedTodayHour }
}

export const menu = {
  "PS5-1": {
    income: 800,
    room: "PS5-1"
  },
  "PS5-2": {
    income: 800,
    room: "PS5-2"
  },
  "Xbox": {
    income: 1200,
    room: "Xbox"
  },
  "VipBlack": {
    income: 1000,
    room: "VIP BLACK"
  },
  "VipGreen": {
    income: 1000,
    room: "VIP GREEN"
  },
  "VipBlue": {
    income: 1000,
    room: "VIP BLUE"
  },
  "Poker": {
    income: 2000,
    room: "POKER"
  },
  "PingPong-1": {
    income: 600,
    room: "PING PONG-1"
  },
  "PingPong-2": {
    income: 600,
    room: "PING PONG-2"
  },
  "Nargile-1": {
    income: 2000,
    room: "Նարգիլե-2000"
  },
  "Nargile-2": {
    income: 3000,
    room: "Նարգիլե-3000"
  },
  "Nargile-3": {
    income: 4000,
    room: "Նարգիլե-4000"
  },
  "Nargile-4": {
    income: 5000,
    room: "Նարգիլե-5000"
  },
  "Nargile-5": {
    income: 6000,
    room: "Նարգիլե-6000"
  }
}



export const optionsMenu = [

  {
    income: 800,
    room: "PS5-1",
    key: "PS5-1"
  },
  {
    income: 800,
    room: "PS5-2",
    key: "PS5-2"
  },
  {
    income: 1200,
    room: "Xbox",
    key: "Xbox"
  },
  {
    income: 1000,
    room: "VIP BLACK",
    key: "VipBlack"
  },
  {
    income: 1000,
    room: "VIP GREEN" ,
    key: "VipGreen"
  },
  {
    income: 1000,
    room: "VIP BLUE",
    key: "VipBlue"
  },
  {
    income: 2000,
    room: "POKER",
    key: "Poker"
  },
  {
    income: 600,
    room: "PING PONG-1",
    key: "PingPong-1"
  },
  {
    income: 600,
    room: "PING PONG-2",
    key: "PingPong-2"
  },
  {
    income: 2000,
    room: "Նարգիլե-2000",
    key: "Nargile-1"
  },
  {
    income: 3000,
    room: "Նարգիլե-3000",
    key: "Nargile-2"
  },
  {
    income: 4000,
    room: "Նարգիլե-4000",
    key: "Nargile-3"
  },
  {
    income: 5000,
    room: "Նարգիլե-5000",
    key: "Nargile-4"
  },
  {
    income: 6000,
    room: "Նարգիլե-6000",
    key: "Nargile-5"
  }
]