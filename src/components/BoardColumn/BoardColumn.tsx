//interface IBoardColumn {}
import { useState } from 'react';
import { IBoardData, IBoardColumn } from '../../default-board';
import ColumnTask from '../ColumnTask/ColumnTask';
import {
  useBoardActionsContext,
  IBoardActionsContext,
} from '../../context/BoardContext';
import AppDrag from '../AppDrag/AppDrag';
import AppDrop from '../AppDrop/AppDrop';
import './BoardColumn.css';

interface IBoardColumnProps {
  column: IBoardColumn;
  columnIndex: number;
  board: IBoardData;
}

export type TransferData = {
  fromColumnIndex: number;
  fromTaskIndex?: number;
  type: 'task' | 'column';
};

type MoveTaskParams = {
  toTaskIndex: number;
  toColumnIndex: number;
};

const BoardColumn = (props: IBoardColumnProps) => {
  const { column, columnIndex, board } = props;
  const [taskName, setTaskName] = useState('');
  const {
    createTask,
    moveTask,
    moveColumn,
  } = useBoardActionsContext() as IBoardActionsContext;

  const onKeyUp = (e) => {
    if (e.key === 'Enter') {
      createTask({
        columnIndex,
        name: taskName,
      });
      setTaskName('');
    }
  };

  const moveTaskOrColumn = (
    transferData: TransferData,
    moveTaskParams: MoveTaskParams = {
      toColumnIndex: columnIndex,
      toTaskIndex: 0,
    }
  ) => {
    console.log({
      moveTaskParams,
      transferData,
    });
    const { fromColumnIndex, fromTaskIndex } = transferData;
    if (transferData.type === 'task' && typeof fromTaskIndex !== 'undefined') {
      const { toColumnIndex, toTaskIndex } = moveTaskParams;
      moveTask({
        fromColumnIndex,
        fromTaskIndex,
        toColumnIndex,
        toTaskIndex,
      });
    } else {
      moveColumn({
        fromColumnIndex: transferData.fromColumnIndex,
        toColumnIndex: columnIndex,
      });
    }
  };

  return (
    <AppDrop
      onDrop={(...args) => {
        console.log('moveTaskOrColumn from BoardColumn App Drop', ...args);
        moveTaskOrColumn(...args);
      }}
    >
      <AppDrag
        transferData={{
          type: 'column',
          fromColumnIndex: columnIndex,
        }}
      >
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
                  moveTaskOrColumn={moveTaskOrColumn}
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
      </AppDrag>
    </AppDrop>
  );
};

export default BoardColumn;
