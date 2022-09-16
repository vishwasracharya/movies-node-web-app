/* Modules */
const events = require('events');

const eventEmitter = new events.EventEmitter();

/* =========== Events =========== */
/* Defining a function. */
const listnerOne = () => {
  console.log('listnerOne executed.');
};

/* First way to addListner to any event */
eventEmitter.addListener('connection', listnerOne);

/* Second way to addListner to any event, Also works as an alias of eventEmitter.addListener() */
eventEmitter.on('connection', listnerOne);

/* Raise an Event */
eventEmitter.emit('connection');

/* It removes the listnerOne from the connection event. */
eventEmitter.removeListener('connection', listnerOne);

/* Getting the maximum number of listeners that can be added to an event. */
const getsMaxListeners = eventEmitter.getMaxListeners();
console.log(getsMaxListeners);

/* It returns a copy of the array of listeners for the event named eventName. */
const returnsCopyofEvent = eventEmitter.listeners('connection');
console.log(returnsCopyofEvent);
