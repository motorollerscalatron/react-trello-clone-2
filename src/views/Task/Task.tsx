import { useState, useEffect } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import { useBoardActionsContext } from "../../context/BoardContext";
import { ITask } from "../../default-board";
import "./Task.css";

const Task = (props: RouteComponentProps) => {
  const [task, setTask] = useState<ITask>(null);
  const { id } = useParams();
  const { getTask, updateTask } = useBoardActionsContext();
  console.log("in task", props, id, getTask(id));

  const setTaskName = (task: ITask, taskName: string) => {
    console.log("setTaskName");
    // updateTask(task, 'name', taskName);
  };

  useEffect(() => {
    console.log("useEffect");
    setTask(getTask(id));
  }, [id]);

  return (
    <div className="task-view">
      <div className="flex flex-col flex-grow items-start justify-between px-4">
        {task ? (
          <>
            <input
              type="text"
              className="p-2 w-full mr-2 block text-xl font-bold"
              value={task.name}
              onChange={(e) => setTaskName(task, e.target.value)}
            />
            <textarea
              className="relative w-full bg-transparent px-2 border mt-2 h-64 border-none leading-normal"
              value={task.description}
              onChange={(e) => setTaskName(task, e.target.value)}
            />
          </>
        ) : null}
      </div>
    </div>
  );
};
//        <h2>Task</h2>
//{task ? <div>{task.name}</div> : null}
export default Task;
