import { useState } from "react";
import {
  Switch,
  Route,
  useRouteMatch,
  RouteComponentProps,
} from "react-router-dom";
import BoardColumn from "../../components/BoardColumn/BoardColumn";
import {
  useBoardContext,
  useBoardActionsContext,
} from "../../context/BoardContext";
import Task from "../Task/Task";
import "./Board.css";

const Board = (props: RouteComponentProps) => {
  const [columnName, setColumnName] = useState("");
  const { board } = useBoardContext();
  const { createColumn } = useBoardActionsContext();
  const { path, url } = useRouteMatch();
  console.log({ path, url, board });

  const onKeyUp = (e) => {
    if (e.key === "Enter") {
      createColumn({ name: columnName });
      setColumnName("");
    }
  };

  return (
    <div className="board">
      <div className="flex flex-row items-start">
        {board.columns.map((column, index) => {
          return (
            <BoardColumn
              key={index}
              column={column}
              columnIndex={index}
              board={board}
            />
          );
        })}

        <div className="column flex">
          <input
            type="text"
            className="p-2 mr-2 flex-grow"
            placeholder="New Column Name"
            onKeyUp={onKeyUp}
            value={columnName}
            onChange={(e) => setColumnName(e.target.value)}
          />
        </div>
      </div>
      <Switch>
        <Route path={`${path}task/:id`} component={Task} />
      </Switch>
    </div>
  );
};

export default Board;
