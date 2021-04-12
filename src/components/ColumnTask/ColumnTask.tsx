import { Link } from 'react-router-dom';
import AppDrag from '../AppDrag/AppDrag';
import AppDrop from '../AppDrop/AppDrop';
import { ITask, IBoardColumn, IBoardData } from '../../default-board';
import { TransferData } from '../BoardColumn/BoardColumn';
import './ColumnTask.css';

interface IColumnTask {
  task: ITask;
  taskIndex: number;
  column: IBoardColumn;
  columnIndex: number;
  board: IBoardData;
  moveTaskOrColumn: (
    transferData: TransferData,
    moveTaskParams: {
      toColumnIndex: number;
      toTaskIndex: number;
    }
  ) => void;
}

const ColumnTask = (props: IColumnTask) => {
  const { task, taskIndex, columnIndex, moveTaskOrColumn } = props;
  return (
    <AppDrop
      onDrop={(transferData: TransferData) => {
        console.log('on drop in column task', {
          toTaskIndex: taskIndex,
          toColumnIndex: columnIndex,
        });
        moveTaskOrColumn(transferData, {
          toTaskIndex: taskIndex,
          toColumnIndex: columnIndex,
        });
      }}
    >
      <AppDrag
        transferData={{
          type: 'task',
          fromColumnIndex: columnIndex,
          fromTaskIndex: taskIndex,
        }}
      >
        <Link to={`/task/${task.id}`}>
          <div className="task">
            <span className="w-full flex-no-shrink font-bold">{task.name}</span>
            {task.description ? (
              <p className="w-full flex-no-shrink mt-1 text-sm">
                {task.description}
              </p>
            ) : null}
          </div>
        </Link>
      </AppDrag>
    </AppDrop>
  );

  /*
  <AppDrop
    @drop="moveTaskOrColumn"
  >
    <AppDrag
      class="task"
      :transferData="{
        type: 'task',
        fromColumnIndex: columnIndex,
        fromTaskIndex: taskIndex
      }"
      @click.native="goToTask(task)"
    >
      <span class="w-full flex-no-shrink font-bold">
        {{ task.name }}
      </span>
      <p
        v-if="task.description"
        class="w-full flex-no-shrink mt-1 text-sm"
      >
        {{ task.description }}
      </p>
    </AppDrag>
  </AppDrop>
*/
};

export default ColumnTask;
