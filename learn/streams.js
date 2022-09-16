/* Modules */
const fs = require('fs');

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
