/* Modules */
let events = require('events');
let eventEmitter = new events.EventEmitter();
let fs = require('fs');

/* =========== Global objects =========== */
/* Global objects are objects that are available in all modules. */
console.log("__filename", __filename);
console.log("__dirname", __dirname);

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
    fs.readFile('./learn/input.txt', (err, data) => {
        if (err) return console.error(err);
        console.log('File read successfully.', data.toString());
    });
    console.log('This will be executed first.');

    // Write File
    fs.writeFile('./learn/input.txt', 'This is a test.', (err) => {
        if (err) return console.error(err);
        console.log('File written successfully.');
    });

    // Get File Information
    fs.stat('./learn/input.txt', (err, stats) => {
        if (err) return console.error(err);
        console.log('File information:', stats);
    });

    // Truncate a File
    fs.truncate('./learn/input.txt', 12, (err) => {
        if (err) return console.error(err);
        console.log('File truncated successfully.');
    });

    // Close File
    fs.close(fd, (err) => {
        if (err) return console.error(err);
        console.log('File closed successfully.');
    });

    // Delete a File
    // fs.unlink('./learn/input.txt', (err) => {
    //     if (err) return console.error(err);
    //     console.log('File deleted successfully.');
    // });
});

// Create a Directory
fs.mkdir('test', (err) => {
    if (err) return console.error(err);
    console.log('Directory created successfully.');

    // Read a Directory
    fs.readdir('test', (err, files) => {
        if (err) return console.error(err);
        console.log('Directory read successfully.', files);

        // Delete a Directory
        fs.rmdir('test', (err) => {
            if (err) return console.error(err);
            console.log('Directory deleted successfully.');
        });
    });
});

/* =========== Streams =========== */
let readerStream = fs.createReadStream('./learn/input.txt', 'utf8', (err, data) => {
    if (err) { 
        console.log(err);
        let writerStream = fs.createWriteStream('./learn/input.txt');
        writerStream.write(data, 'UTF8');
        writerStream.end();
        writerStream.on('finish', () => {
            console.log('Write completed.');
        });
        writerStream.on('error', (err) => {
            console.log(err.stack);
        });
        console.log('Program Ended.')
    }
    else console.log(data);
});

let writerStream = fs.createWriteStream('./learn/output.txt', 'utf8', (err, data) => {
    if (err) console.log(err);
    else console.log(data);
});
writerStream.write('Hello World!', 'utf8', (err, data) => {
    if (err) console.log(err);
    else console.log("Data written successfully");
});
writerStream.end();
writerStream.on('finish', () => {
    console.log('Write completed.');
});

/* =========== Buffers =========== */
let buffer = Buffer.from('Hello', 'utf8');
console.log(buffer.toString('base64'));

buffer = Buffer.alloc(256);
len = buffer.write("Simply Easy Learning");
console.log("Octets written : " + len);

// Convert Buffer to JSON
var json = buffer.toJSON(buffer);

// Concatenate two buffers
var buffer1 = Buffer.from(('TutorialsPoint '));
var buffer2 = Buffer.from(('Simply Easy Learning'));
var buffer3 = Buffer.concat([buffer1, buffer2]);
console.log("buffer3 content: " + buffer3.toString());

// Compare Buffers 
var result = buffer1.compare(buffer2);
if (result < 0) {
    console.log(buffer1 + " comes before " + buffer2);
} else if (result == 0) {
    console.log(buffer1 + " is same as " + buffer2);
} else {
    console.log(buffer1 + " comes after " + buffer2);
}

// Copy Buffer
var buffer4 = Buffer.from('ABC');
var buffer5 = Buffer.alloc(3);
buffer4.copy(buffer5);
console.log("buffer5 content: " + buffer5.toString());

// Slice Buffer
var buffer6 = Buffer.from('TutorialsPoint');
var buffer7 = buffer6.slice(0, 9);
console.log("buffer7 content: " + buffer7.toString());

// Buffer Length
console.log("Buffer Length: ", buffer.length);


/* =========== Events =========== */
/* Defining a function. */
var listnerOne = () => {
    console.log('listnerOne executed.');
}

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
