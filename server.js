const http = require("http");

const PORT = 3000;
const db = [];

const server = http.createServer();

server.on("request", (req, res) => {
  const urlComp = req.url.split("/");

  if (req.method === "POST" && urlComp[1] === "joke") {
    req.on("data", (data) => {
      const joke = data.toString();
      db.push(JSON.parse(joke));
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(db));
    });
  } else if (req.method === "GET" && urlComp[1] === "joke") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(db));
  } else if (
    req.method === "PATCH" &&
    urlComp[1] === "joke" &&
    urlComp.length === 3
  ) {
    const id = Number(urlComp[2]);
    req.on("data", (data) => {
      const joke = JSON.parse(data.toString());

      for (let i = 0; i < db.length; i++) {
        if (db[i].id === id) {
          db[i] = joke;
          break;
        }
      }
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(joke));
    });
  } else if (
    req.method === "DELETE" &&
    urlComp[1] === "joke" &&
    urlComp.length === 3
  ) {
    const id = Number(urlComp[2]);

    let joke;

    for (let i = 0; i < db.length; i++) {
      if (db[i].id === id) {
        joke = db.splice(i, 1);
        break;
      }
    }
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(joke));
  } else {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(`Bad Request`);
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} ...`);
});
