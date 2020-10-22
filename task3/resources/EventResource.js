const fs = require('fs');
const path = require('path');
const { v4 } = require('uuid');
const readline = require('readline');

const { appendFile, writeFile } = fs.promises;

const filePath = path.resolve(__dirname, '..', 'data.csv')

class EventsResource {
  async getAllEvents(query) {
    let events = [];
    let isNotFirstLine = false;

    const rl = readline.createInterface({
      input: fs.createReadStream(filePath),
      console: false
    });

    rl.on("line", function (line) {
      if (isNotFirstLine) {
        const [id, title, location, date, time, organizer] = line.split(",");

        if (!query.location || query.location === location) {
          events.push({
            id,
            title,
            location,
            date,
            time,
            organizer,
          });
        }
      } else {
        isNotFirstLine = true;
      }
    });

    return new Promise((resolve, reject) => {
      rl.on("close", () => {
        resolve(events);
      });

      rl.on("error", error => {
        reject(error);
      });
    });
  }

  async getById(id) {
    const rl = readline.createInterface({
      input: fs.createReadStream(filePath),
      console: false
    });

    return new Promise((resolve, reject) => {
      rl.on("line", function (line) {
        const [idOfElement, title, location, date, time, organizer] = line.split(",");
        if (idOfElement === id) resolve({ id: idOfElement, title, location, date, time, organizer });
      });

      rl.on("close", () => {
        reject(null);
      });

      rl.on("error", error => {
        reject(error);
      })
    })
  }

  async create(event) {
    const { title, location, date, time, organizer } = event;
    const id = v4();
    await appendFile(filePath, `${id},${title},${location},${date},${time},${organizer}\n`);

    return { id, title, location, date, time, organizer };
  }

  async delete(id) {
    const rl = readline.createInterface({
      input: fs.createReadStream(filePath),
      console: false
    });
    let data = '';

    rl.on("line", async function (line) {
      const [idOfElement] = line.split(",");
      if (id !== idOfElement) {
        data += line + '\n';
      }
    });

    return new Promise((resolve, reject) => {
      rl.on('close', async () => {
        resolve(await writeFile(filePath, data));
      });
    });
  }

  async update(id, event) {
    const rl = readline.createInterface({
      input: fs.createReadStream(filePath),
      console: false
    });
    let data = '';
    let updated = false;

    rl.on("line", async function (line) {
      const [idOfElement] = line.split(",");
      if (id !== idOfElement) {
        data += line + '\n';
      } else {
        const { title, location, date, time, organizer } = event;
        data += `${id},${title},${location},${date},${time},${organizer}\n`;
        updated = true;
      }
    });

    return new Promise((resolve, reject) => {
      rl.on('close', async () => {
        if (!updated) return reject(null);
        
        try {
          resolve(await writeFile(filePath, data));
        } catch(error) {
          reject(error);
        }
      });
    });
  }
}

const eventsResource = new EventsResource();

module.exports = eventsResource;