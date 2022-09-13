/* Modules */
const events = require('events');
const fs = require('fs');

const eventEmitter = new events.EventEmitter();

/* =========== Global objects =========== */
/* Global objects are objects that are available in all modules. */
console.log('__filename', __filename);
console.log('__dirname', __dirname);

// setTimeout((t) => {
//     console.log('listnerTwo executed, With setTimeout.');
//     clearTimeout(t);
// }, 1000);
// setInterval((t) => {
//     console.log('listnerTwo executed, With setInterval.');
//     clearInterval(t);
// }, 1000);

/* =========== File System =========== */
// File Open
fs.open('./learn/input.txt', 'r+', (err, fd) => {
  if (err) return console.error(err);
  console.log('File opened successfully.', fd);

  // File Read
  fs.readFile('./learn/input.txt', (e, data) => {
    if (e) return console.error(e);
    return console.log('File read successfully.', data.toString());
  });
  console.log('This will be executed first.');

  // Write File
  fs.writeFile('./learn/input.txt', 'This is a test.', (e) => {
    if (e) return console.error(e);
    return console.log('File written successfully.');
  });

  // Get File Information
  fs.stat('./learn/input.txt', (e, stats) => {
    if (e) return console.error(e);
    return console.log('File information:', stats);
  });

  // Truncate a File
  fs.truncate('./learn/input.txt', 12, (e) => {
    if (e) return console.error(e);
    return console.log('File truncated successfully.');
  });

  // Close File
  fs.close(fd, (e) => {
    if (e) return console.error(e);
    return console.log('File closed successfully.');
  });

  //   Delete a File
  //   fs.unlink('./learn/input.txt', (e) => {
  //     if (e) return console.error(e);
  //     return console.log('File deleted successfully.');
  //   });
  return null;
});

// Create a Directory
fs.mkdir('test', (err) => {
  if (err) return console.error(err);
  console.log('Directory created successfully.');

  // Read a Directory
  fs.readdir('test', (error, files) => {
    if (error) return console.error(error);
    console.log('Directory read successfully.', files);

    // Delete a Directory
    fs.rmdir('test', (e) => {
      if (e) return console.error(e);
      return console.log('Directory deleted successfully.');
    });
    return null;
  });
  return null;
});

/* =========== Streams =========== */
const readerStream = fs.createReadStream(
  './learn/input.txt',
  'utf8',
  (err, data) => {
    if (err) {
      console.log(err);
      const writerStream = fs.createWriteStream('./learn/input.txt');
      writerStream.write(data, 'UTF8');
      writerStream.end();
      writerStream.on('finish', () => {
        console.log('Write completed.');
      });
      writerStream.on('error', (e) => {
        console.log(e.stack);
      });
      console.log('Program Ended.');
    } else console.log(data);
  }
);
console.log(readerStream);

const writerStream = fs.createWriteStream(
  './learn/output.txt',
  'utf8',
  (err, data) => {
    if (err) console.log(err);
    else console.log(data);
  }
);
writerStream.write('Hello World!', 'utf8', (err) => {
  if (err) console.log(err);
  else console.log('Data written successfully');
});
writerStream.end();
writerStream.on('finish', () => {
  console.log('Write completed.');
});

/* =========== Buffers =========== */
let buffer = Buffer.from('Hello', 'utf8');
console.log(buffer.toString('base64'));

buffer = Buffer.alloc(256);
const len = buffer.write('Simply Easy Learning');
console.log(`Octets written : ${len}`);

// Convert Buffer to JSON
const json = buffer.toJSON(buffer);
console.log('Buffer To JSON', json);

// Concatenate two buffers
const buffer1 = Buffer.from('TutorialsPoint ');
const buffer2 = Buffer.from('Simply Easy Learning');
const buffer3 = Buffer.concat([buffer1, buffer2]);
console.log(`buffer3 content: ${buffer3.toString()}`);

// Compare Buffers
const result = buffer1.compare(buffer2);
if (result < 0) {
  console.log(`${buffer1} comes before ${buffer2}`);
} else if (result === 0) {
  console.log(`${buffer1} is same as ${buffer2}`);
} else {
  console.log(`${buffer1} comes after ${buffer2}`);
}

// Copy Buffer
const buffer4 = Buffer.from('ABC');
const buffer5 = Buffer.alloc(3);
buffer4.copy(buffer5);
console.log(`buffer5 content: ${buffer5.toString()}`);

// Slice Buffer
const buffer6 = Buffer.from('TutorialsPoint');
const buffer7 = buffer6.slice(0, 9);
console.log(`buffer7 content: ${buffer7.toString()}`);

// Buffer Length
console.log('Buffer Length: ', buffer.length);

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
