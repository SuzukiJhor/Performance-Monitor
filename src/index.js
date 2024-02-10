const { once } = require("events");
const { createServer } = require("http");
const { randomUUID } = require("crypto");
const { route } = require("./decorator");
const Db = new Map();

@route
class Server {
  static async handler(req, res) {
    if (req.method === "POST") {
      const data = await once(req, "data");
      const item = JSON.parse(data);
      item.id = randomUUID();

      Db.set(item.id, item);

      return {
        statusCode: 201,
        message: item,
      };
    }

    return {
      statusCode: 200,
      message: [...Db.values()],
    };
  }
}

createServer(Server.handler).listen(3000, () =>
  console.log("Server is running")
);
