import { io } from "socket.io-client";
const URL =
  process.env.NODE_ENV === "production" ? undefined : "ws://localhost:8080";
const socket = io(URL);
console.log("🚀 ~ file: socket-client.js:5 ~ socket:", socket);
// console.log("init socket", socket.id);
export const Socket = socket;
