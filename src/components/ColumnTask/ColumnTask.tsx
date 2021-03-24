import { Link } from "react-router-dom";
import "./ColumnTask.css";

const ColumnTask = (props) => {
  const { task } = props;
  return (
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
