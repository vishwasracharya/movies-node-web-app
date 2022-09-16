const fs = require('fs');
const util = require('util');

/* Blocking Code Example */
function blockingCode() {
  const data = fs.readFileSync('./app.js');
  console.log(data.toString());
}
blockingCode();

/* Non-Blocking Code Example */
fs.readFile('./app.js', (err, data) => {
  if (err) throw err;
  console.log(data.toString());
});

/* async..await example */
const readFile = util.promisify(fs.readFile);

async function init() {
  const data = await readFile('./app.js');
  console.log(data.toString());
}

init();

/* Promise example */
readFile('./app.js')
  .then((data) => {
    console.log(data.toString());
  })
  .catch((err) => {
    console.log(err);
  });
