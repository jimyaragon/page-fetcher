const request = require('request');
const fs = require('fs');

const url = process.argv[2];
const localFilePath = process.argv[3];

const fetcher = (url, localFilePath) => {
  request(url, (error, response, body) => {
    if (error) {
      console.error("Error occurred while fetching the resource:", error);
      return;
    }

    if (response.statusCode !== 200) {
      console.error("Failed to fetch the resource. Status code:", response.statusCode);
      return;
    }

    fs.writeFile(localFilePath, body, (err) => {
      if (err) {
        console.error("Error occurred while saving the file:", err);
        return;
      }
      console.log(`Downloaded and saved ${body.length} bytes to ${localFilePath}`);
    });
  });
};

// Call the fetcher function with the provided URL and local file path
fetcher(url, localFilePath);