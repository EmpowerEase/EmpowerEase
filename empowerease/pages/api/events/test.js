const { google } = require("googleapis");
const { axios } = require("axios");

require("dotenv").config();

const fs = require("fs");

// Provide the required configuration
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const calendarId = process.env.CALENDAR_ID;

// Google calendar API settings
const SCOPES = "https://www.googleapis.com/auth/calendar";
const calendar = google.calendar({ version: "v3" });

const auth = new google.auth.JWT(
  CREDENTIALS.client_email,
  null,
  CREDENTIALS.private_key,
  SCOPES
);

// Your TIMEOFFSET Offset
const TIMEOFFSET = "-05:00";

// Get date-time string for calender
const dateTimeForCalendar = () => {
  let date = new Date();

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let day = date.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  let newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000${TIMEOFFSET}Z`;

  let event = new Date(Date.parse(newDateTime));

  let startDate = event;
  // Delay in end time is 1
  let endDate = new Date(
    new Date(startDate).setHours(startDate.getHours() + 12)
  );

  return {
    start: startDate,
    end: endDate,
  };
};
//console.log(dateTimeForCalendar());

const insertEvent = async (event) => {
  try {
    let response = await calendar.events.insert({
      auth: auth,
      calendarId: calendarId,
      resource: event,
    });

    if (response["status"] == 200 && response["statusText"] === "OK") {
      return 1;
    } else {
      return 0;
    }
  } catch (error) {
    console.log(`Error at insertEvent --> ${error}`);
    return 0;
  }
};

//let dateTime = dateTimeForCalander();

// // Event for Google Calendar
/*let dateStart = "2023-11-25T20:00:00.000" + TIMEOFFSET;
let dateEnd = "2023-11-25T21:00:00.000" + TIMEOFFSET;
let title = "Test insert again";

let event = {
  summary: title,
  start: {
    dateTime: dateStart,
    timeZone: "UTC",
  },
  end: {
    dateTime: dateEnd,
    timeZone: "UTC",
  },
};*/

/*insertEvent(event)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });*/

export const updateEvents = (title, start, end) => {
  let event = {
    summary: title,
    start: {
      dateTime: start,
      timeZone: "UTC",
    },
    end: {
      dateTime: end,
      timeZone: "UTC",
    },
  };
  insertEvent(event)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getEvents = async (dateTimeStart, dateTimeEnd) => {
  try {
    let response = await calendar.events.list({
      auth: auth,
      calendarId: calendarId,
      timeMin: dateTimeStart,
      timeMax: dateTimeEnd,
      timeZone: "America/Toronto",
    });

    let items = response.data.items || [];
    return items.map((event) => ({
      summary: event.summary,
      start: event.start.dateTime,
      end: event.end.dateTime,
    }));
  } catch (error) {
    console.log(`Error at getEvents --> ${error}`);
    return [];
  }
};

let start = "2023-11-25T00:00:00.000Z";
let end = "2023-11-26T23:59:00.000Z";

getEvents(start, end)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

export default function handler(req, res) {
  if (req.method === "POST") {
    console.log("vvv!");
    console.log(req.body);
    console.log("^^^");
    // put your insert code here
    const { title, dateStart, dateEnd } = req.body;
    //console.log(dateStart);
    let event = {
      summary: title,
      start: {
        dateTime: dateStart,
        timeZone: "UTC",
      },
      end: {
        dateTime: dateEnd,
        timeZone: "UTC",
      },
    };

    insertEvent(event)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    res.status(200).json({ text: "Hello" });
  } else {
    // put your query (get) code here
    res.status(200).json({ text: "Hello" });
  }
}
