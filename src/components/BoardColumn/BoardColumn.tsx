//interface IBoardColumn {}
import { useState } from "react";
import { IBoardData, IBoardColumn } from "../../default-board";
import ColumnTask from "../ColumnTask/ColumnTask";
import { useBoardActionsContext } from "../../context/BoardContext";
import "./BoardColumn.css";

interface IBoardColumnProps {
  column: IBoardColumn;
  columnIndex: number;
  board: IBoardData;
}

const BoardColumn = (props: IBoardColumnProps) => {
  const { column, columnIndex, board } = props;
  const [taskName, setTaskName] = useState("");
  const { createTask } = useBoardActionsContext();

  const onKeyUp = (e) => {
    if (e.key === "Enter") {
      createTask({
        columnIndex,
        name: taskName,
      });
      setTaskName("");
    }
  };

  return (
    <div className="column">
      <div className="flex items-center mb-2 font-bold">{column.name}</div>
      <div className="list-reset">
        {column.tasks.map((task, index) => {
          return (
            <ColumnTask
              key={index}
              task={task}
              taskIndex={index}
              column={column}
              columnIndex={columnIndex}
              board={board}
            />
          );
        })}
      </div>

      <input
        className="block p-2 w-full bg-transparent"
        placeholder="+ Enter new task"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        onKeyUp={onKeyUp}
      />
    </div>
  );
};

export default BoardColumn;
