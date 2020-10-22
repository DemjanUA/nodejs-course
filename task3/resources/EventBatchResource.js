const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { Readable } = require("stream");

const filePath = path.resolve(__dirname, "..", "data.csv");

class EventsBatchResource {
  getAllEvents() {
    const readableStream = new Readable({
      encoding: "utf-8",
      read(size) {
        this.push();
      },
    });

    let isFirstLine = true;
    let isHeaderLine = true;

    const rl = readline.createInterface({
      input: fs.createReadStream(filePath),
      console: false,
    });

    rl.on("line", (line) => {
      if (!isHeaderLine) {
        const [id, title, location, date, time, organizer] = line.split(",");
        if (isFirstLine) {
          readableStream.push(
            `[${JSON.stringify({ id, title, location, date, time, organizer })}`
          );

          isFirstLine = false;
        } else {
          readableStream.push(
            `,${JSON.stringify({ id, title, location, date, time, organizer })}`
          );
        }
      } else {
        isHeaderLine = false;
      }
    });

    rl.on("close", () => {
      readableStream.push("]");
      readableStream.push(null);
    });

    return readableStream;
  }
}

const eventsBatchResource = new EventsBatchResource();

module.exports = eventsBatchResource;
