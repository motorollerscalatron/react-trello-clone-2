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

  /*
    const board = {
      1: {
        1: task,
        2: task
      },
      2: {
        3: task,
        4: task
      }
    }

    const tasksColumnIds = {
      1: 1,
      2: 1,
      3: 2,
      4: 2
    }

    const columnId = tasksColumnIds[taskId]

    const newBoard = {
      ...board,
      [columnId]: {
        ...board[columnId],
        [taskId]: {
          ...board[columnId][taskId],
          [key]: value
        }
      }
    }

    board[columnId][taskId][key] = value

  */

  const updateTask = useCallback(
    ({ task, key, value }: IUpdateTask) => {
      const newBoard: IBoardData = {
        ...board,
        // Loop through columns to find the one we want to edit a task to
        columns: board.columns.map((column) => {
          return {
            ...column,
            tasks: column.tasks.map((_task) => {
              console.log('check', { _task, task });
              if (_task.id === task.id) {
                return {
                  ...task,
                  [key]: value,
                };
              }

              return _task;
            }),
          };
          // If it's not the column we want to add the task to, just return the column
          // as it is
        }),
      };
      setBoard(newBoard);
    },
    [board]
  );
  const moveTask = useCallback(
    ({ fromTasks, toTasks, fromTaskIndex, toTaskIndex }: IMoveTask) => {},
    []
  );
  const moveColumn = useCallback(
    ({ fromColumnIndex, toColumnIndex }: IMoveColumn) => {
      // Move the column object from one index to another
      /*
        - Find the column object
        - Store the column object in a temporary variables
        - Create a new array without that column object. You can use the filter method to get a new array without the column object
        - Place the column object in the array at new position (toColumnIndex)
        - Update the board state
      */
    },
    []
    //comment for deploy
    //[board]
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
