"use client";
import { useEffect, useState } from "react";
import { HiX } from "react-icons/hi";
import Menu from "./Menu";
enum valueType {
  Empty = 0,
  Cross = 1,
  Circle = 2,
}
export default function Home() {
  const [grid, setGrid] = useState({
    gridValues: Array(9).fill(valueType.Empty),
  });
  const [turn, setTurn] = useState(false);
  const onClickHandler = (e: any) => {
    const id: any = e.target.id;
    if (grid.gridValues[id] == valueType.Empty) {
      grid.gridValues[id] = turn ? valueType.Cross : valueType.Circle;
      setTurn(!turn);
      setGrid(grid);
    }
  };
  const [showMenu, setShowMenu] = useState(true);
  return (
    <>
      {showMenu && <Menu setShowMenu={setShowMenu} />}
      <main className="flex min-h-screen flex-col items-center justify-between lg:p-24 p-4">
        <div className="grid grid-cols-3 gap-3 transition-all delay-700">
          {grid.gridValues.map((e, index) => {
            return (
              <Card
                key={index}
                index={index}
                value={e}
                onClickHandler={onClickHandler}
              />
            );
          })}
        </div>
      </main>
    </>
  );
}
interface CardProps {
  key: any;
  index: any;
  value: valueType;
  onClickHandler: any;
}
const Card = ({ index, value, onClickHandler }: CardProps) => {
  return (
    <div
      key={"TTT-" + index}
      id={`${index}`}
      className={`w-20 h-20 md:w-36 md:h-36 outline bg-white rounded-md ${
        value == valueType.Empty && " cursor-pointer hover:scale-105 "
      } justify-center`}
      onClick={onClickHandler}
    >
      {value == valueType.Cross && (
        <HiX className="md:w-28 md:h-28 w-16 h-16 mx-auto my-2 md:my-4" />
      )}
      {value == valueType.Circle && <Circle />}
    </div>
  );
};

const Circle = () => {
  return (
    <div className="md:w-20 md:h-20 w-12 h-12 mx-auto my-4 md:my-8 bg-white rounded-full border-8 border-black"></div>
  );
};
