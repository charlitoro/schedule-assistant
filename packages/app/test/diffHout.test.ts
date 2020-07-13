const Moment = require('moment');

const start = Moment("07:00", "HH:mm");
const end = Moment("10:00", "HH:mm");

console.log( end.add(1, 'hour').format('kk:mm') );

