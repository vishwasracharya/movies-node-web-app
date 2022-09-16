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
