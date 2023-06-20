"use client";
import { useState, useEffect } from "react";
import { Socket } from "./socket-client";
function UserList({ users }: any) {
  return (
    <>
      <div className="row row-span-4 gap-2 flex">
        {Object.keys(users).map((e: string) => {
          console.log(e, Socket.id);
          return (
            <div
              className={`rounded-full p-4 row-span-1 ${
                e === Socket.id
                  ? "bg-green-500 hover:bg-green-400 cursor-pointer"
                  : "bg-slate-200"
              }`}
            >
              {users[e]}
            </div>
          );
        })}
      </div>
    </>
  );
}
export default function Menu({ setShowMenu }: any) {
  const [users, setUsers] = useState({});
  function onNewUserHandler(e) {
    Socket.emit("room", "newUser");
  }
  function onChangeNameHandler(e) {
    Socket.emit("room", "changeName");
  }
  function onPlayGameHandler() {
    setShowMenu(false);
  }
  useEffect(() => {
    console.log("helloworld", Socket.id);
    Socket.on("users", (e) => {
      console.log("users", e);
      const obj = JSON.parse(e);
      obj?.accountList && setUsers(obj.accountList);
    });
    Socket.on("game", (e) => {
      console.log(e);
      const obj = JSON.parse(e);
      if (obj.gameStarted) {
        setShowMenu(false);
      }
    });
  }, []);
  return (
    <div className="fixed bg-slate-800/70 h-full w-full flex min-h-screen flex-col items-center justify-between">
      <div className="bg-gray-100 opacity-100 md:h-auto md:w-4/6 lg:h-auto lg:w-3/6 xl:w-2/5 m-20 rounded-md py-10 px-8">
        <div className="justify-center items-center flex-col flex gap-2">
          <div>
            {Object.keys(users).length >= 2
              ? "Game is full"
              : "Create a new user"}
          </div>
          <button
            className={`text-white font-bold py-2 px-4 rounded ${
              Object.keys(users).length >= 2 ||
              Object.keys(users).map((e) => e == Socket.id).length > 0
                ? "bg-green-200"
                : "bg-green-500 hover:bg-green-700 "
            }`}
            disabled={
              Object.keys(users).length >= 2 ||
              Object.keys(users).map((e) => e == Socket.id).length > 0
            }
            onClick={onNewUserHandler}
          >
            New User
          </button>
          <button
            className={`text-white font-bold py-2 px-4 rounded ${
              Object.keys(users).map((e) => e == Socket.id).length == 0
                ? "bg-green-200"
                : "bg-green-500 hover:bg-green-700 "
            }`}
            disabled={Object.keys(users).map((e) => e == Socket.id).length == 0}
            onClick={onChangeNameHandler}
          >
            Change Name
          </button>
          <button
            className={`text-white font-bold py-2 px-4 rounded ${
              Object.keys(users).length == 2
                ? "bg-purple-500 hover:bg-purple-700"
                : "bg-purple-100"
            }`}
            disabled={Object.keys(users).length < 2}
            onClick={onPlayGameHandler}
          >
            Play Game
          </button>
          <UserList users={users}></UserList>
        </div>
        <div></div>
      </div>
    </div>
  );
}
