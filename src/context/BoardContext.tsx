import {
  useState,
  createContext,
  useContext,
  useMemo,
  useCallback,
} from 'react';
import defaultBoard, {
  IBoardData,
  IBoardColumn,
  ITask,
} from '../default-board';
import { uuid } from '../utils';

interface IBoardContext {
  board: IBoardData;
}

interface ICreateColumn {
  name: string;
}

interface ICreateTask {
  columnIndex: number;
  name: string;
}

interface IUpdateTask {
  task: ITask;
  key: string;
  value: string;
}

interface IMoveTask {
  fromTasks: ITask[];
  toTasks: ITask[];
  fromTaskIndex: number;
  toTaskIndex: number;
}

interface IMoveColumn {
  fromColumnIndex: number;
  toColumnIndex: number;
}

type GetTask = (id: string) => ITask | null;
type CreateColumn = (params: { name: string }) => void;
type CreateTask = (params: { columnIndex: number; name: string }) => void;
type UpdateTask = (params: { task: ITask; key: string; value: string }) => void;
type MoveTask = (params: IMoveTask) => void;
type MoveColumn = (params: IMoveColumn) => void;

export interface IBoardActionsContext {
  getTask: GetTask;
  createTask: CreateTask;
  createColumn: CreateColumn;
  updateTask: UpdateTask;
  moveTask: MoveTask;
  moveColumn: MoveColumn;
}

function createCtx<A extends {} | null>() {
  const ctx = createContext<A | undefined>(undefined);
  function useCtx() {
    const c = useContext(ctx);
    if (c === undefined)
      throw new Error(`useCtx must be inside a Provider with a value`);
    return c;
  }

  return [useCtx, ctx] as const;
}

const [useBoardContext, BoardContext] = createCtx<IBoardContext>();
const [
  useBoardActionsContext,
  BoardActionsContext,
] = createCtx<IBoardActionsContext>();

// const BoardContext = createContext<IBoardContext | null>(null);
//const BoardContext = createContext<IBoardContext | null>(null);
// const BoardActionsContext = createContext<IBoardActionsContext>(null);

export { useBoardContext, useBoardActionsContext };

console.log(BoardContext);

const boardDataFromStore = localStorage.getItem('board');
const boardData: IBoardData = boardDataFromStore
  ? JSON.parse(boardDataFromStore)
  : defaultBoard;

// export const useBoardContext = () => useContext(BoardContext);
// export const useBoardActionsContext = () => useContext(BoardActionsContext);

// const boardDataFromStore = localStorage.getItem('board');
// const boardData: IBoardData = boardDataFromStore
//   ? JSON.parse(boardDataFromStore)
//   : defaultBoard;

/* came from store.js in vue project */

const BoardContextProvider = (props) => {
  const { children } = props;
  const [board, setBoard] = useState(boardData);

  //use useCallback for the sake of referential integrity
  const getTask: GetTask = useCallback(
    (id) => {
      console.log('in get task', id, board.columns);
      for (const column of board.columns) {
        for (const task of column.tasks) {
          if (task.id === id) {
            return task;
          }
        }
      }
      return null;
    },
    [board]
  );

  const createTask: CreateTask = useCallback(
    ({ columnIndex, name }: ICreateTask) => {
      const newBoard: IBoardData = {
        ...board,
        // Loop through columns to find the one we want to add a task to
        columns: board.columns.map((column, _columnIndex) => {
          // If it's not the column we want to add the task to, just return the column
          // as it is
          if (columnIndex !== _columnIndex) return column;
          // We have a match
          return {
            ...column,
            tasks: [
              ...column.tasks,
              {
                name,
                id: uuid(),
                description: '',
                userAssigned: null,
              },
            ],
          };
        }),
      };
      setBoard(newBoard);
    },
    [board]
  );
  const createColumn: CreateColumn = useCallback(
    (params: ICreateColumn) => {
      const { name } = params;
      const newBoardColumn: IBoardColumn = {
        name,
        tasks: [],
      };
      const newBoard: IBoardData = {
        ...board,
        columns: [...board.columns, newBoardColumn], // used to be "push" in vue
      };
      setBoard(newBoard);
    },
    [board]
  );

  const updateTask = useCallback(({ task, key, value }: IUpdateTask) => {}, []);
  const moveTask = useCallback(
    ({ fromTasks, toTasks, fromTaskIndex, toTaskIndex }: IMoveTask) => {},
    []
  );
  const moveColumn = useCallback(
    ({ fromColumnIndex, toColumnIndex }: IMoveColumn) => {},
    []
  );

  const boardContextValue: IBoardContext = useMemo(() => {
    return {
      board,
    };
  }, [board]);

  const boardActionsContextValue: IBoardActionsContext = useMemo(() => {
    return {
      getTask,
      createTask,
      createColumn,
      updateTask,
      moveTask,
      moveColumn,
    };
  }, [getTask, createTask, createColumn, updateTask, moveTask, moveColumn]);

  return (
    <BoardContext.Provider value={boardContextValue}>
      <BoardActionsContext.Provider value={boardActionsContextValue}>
        {children}
      </BoardActionsContext.Provider>
    </BoardContext.Provider>
  );
};

export default BoardContextProvider;
