const cron = require('node-cron');

let scheduledTasks = {};

const scheduleTask = (id, dateTime, task) => {
  const [day, month, year, hour, minute] = dateTime.split(/[\/\s:]+/);
  const cronExpression = `${minute} ${hour} ${day} ${month} *`;

  if (scheduledTasks[id]) {
    scheduledTasks[id].stop();
  }

  scheduledTasks[id] = cron.schedule(cronExpression, task);
};

const cancelTask = (id) => {
  if (scheduledTasks[id]) {
    scheduledTasks[id].stop();
    delete scheduledTasks[id];
  }
};

module.exports = { scheduleTask, cancelTask };
