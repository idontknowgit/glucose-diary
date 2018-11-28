const subYears = require("date-fns/sub_years");
const subMonths = require("date-fns/sub_months");
const subWeeks = require("date-fns/sub_weeks");
const subDays = require("date-fns/sub_days");

exports.startOfTimePeriod = (timePeriod, date) => {
  const err = new Error("Invalid time period.");
  err.code = 400;

  if (timePeriod.length > 3) {
    throw err;
  }

  const validPeriods = ["y", "M", "w", "d"];
  const [, amount, period] = timePeriod.split(/(\d+)/);
  date = date || new Date();

  if (isNaN(amount) || !validPeriods.includes(period)) {
    throw err;
  }

  switch (period) {
    case "y":
      return subYears(date, amount);
    case "M":
      return subMonths(date, amount);
    case "w":
      return subWeeks(date, amount);
    case "d":
      return subDays(date, amount);
  }
};
