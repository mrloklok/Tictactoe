const { Server } = require("socket.io");

const {
  uniqueNamesGenerator,
  Config,
  animals,
} = require("unique-names-generator");

const config = {
  dictionaries: [animals],
};

const accountList = {};
const startSocketServer = (server, corsOptions) => {
  const io = new Server(server, corsOptions);

  io.sockets.on("connection", (socket) => {
    console.log("connect", socket.id);

    socket.on("disconnect", () => {
      console.log("a user disconnected", socket.id);
      accountList[socket.id] = undefined;
      // io.sockets.emit("broadcast", JSON.stringify({ myId: e, accountList }));
      Object.keys(accountList).map((e) => {
        io.to(e).emit("users", JSON.stringify({ myId: e, accountList }));
      });
    });
    socket.on("game", (e) => {});
    socket.on("room", (e) => {
      if (e == "newUser") {
        if (!accountList[socket.id]) {
          const charName = uniqueNamesGenerator(config);
          const characterName =
            charName.charAt(0).toUpperCase() + charName.slice(1);
          accountList[socket.id] = characterName;
          socket.broadcast.emit(
            "users",
            JSON.stringify({ myId: e, accountList })
          );
          // Object.keys(accountList).map((e) => {
          //   io.to(e).emit("users", JSON.stringify({ myId: e, accountList }));
          // });
        }
      }
      if (e == "changeName") {
        if (accountList[socket.id]) {
          const charName = uniqueNamesGenerator(config);
          const characterName =
            charName.charAt(0).toUpperCase() + charName.slice(1);
          accountList[socket.id] = characterName;
          Object.keys(accountList).map((e) => {
            io.to(e).emit("users", JSON.stringify({ myId: e, accountList }));
          });
        }
      }
    });
  });
};

module.exports = {
  startSocketServer,
};
