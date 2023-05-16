"use client";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
interface TTTGrid {
  gridValues: valueType[];
}
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
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between lg:p-24 p-8">
        <div className="grid grid-cols-3 gap-3 transition-all delay-700">
          {grid.gridValues.map((e, index) => {
            console.log(
              "🚀 ~ file: page.tsx:31 ~ {grid.gridValues.map ~ index:",
              index
            );
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
      className={`w-32 h-32 md:w-40 md:h-40 outline bg-white rounded-md ${
        value == valueType.Empty && " cursor-pointer hover:scale-105 "
      } justify-center`}
      onClick={onClickHandler}
    >
      {value == valueType.Cross && (
        <RxCross1 className="md:w-32 md:h-32 w-28 h-28 mx-auto my-2 md:my-4" />
      )}
      {value == valueType.Circle && <Circle />}
    </div>
  );
};

const Circle = () => {
  return (
    <div className="md:w-32 md:h-32 w-28 h-28 mx-auto my-2 md:my-4 bg-white rounded-full border-8 border-black"></div>
  );
};
