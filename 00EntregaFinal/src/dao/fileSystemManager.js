const fs = require("fs");
const path = require("path");

class FileSystemManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  readData() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filePath, "utf8", (err, data) => {
        if (err) {
          reject(err);
        } else {
          const parsedData = JSON.parse(data);
          resolve(parsedData);
        }
      });
    });
  }

  writeData(data) {
    return new Promise((resolve, reject) => {
      const stringData = JSON.stringify(data, null, 2);
      fs.writeFile(this.filePath, stringData, "utf8", (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = FileSystemManager;
