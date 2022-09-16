/* Modules */
const fs = require('fs');

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
