import { useState, useEffect } from 'react';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { useBoardActionsContext } from '../../context/BoardContext';
import { ITask } from '../../default-board';
import OutsideClickHandler from 'react-outside-click-handler';
import './Task.css';
import { FaTrashAlt } from 'react-icons/fa';

interface ParamTypes {
  id: string;
}

const Task = (props: RouteComponentProps) => {
  const [task, setTask] = useState<ITask | null>(null);
  const { id } = useParams<ParamTypes>();
  /* eslint-disable-next-line */
  const { getTask, updateTask, deleteTask } = useBoardActionsContext();
  console.log('in task', props, id, getTask(id));

  const setTaskName = (task: ITask, name: string) => {
    console.log('setTaskName', task, name);
    updateTask({ task: task, key: 'name', value: name });
    setTask({
      ...task,
      name,
    });
  };

  const setTaskDescription = (task: ITask, description: string) => {
    updateTask({ task: task, key: 'description', value: description });
    setTask({
      ...task,
      description,
    });
  };

  useEffect(() => {
    console.log('useEffect');
    setTask(getTask(id));
  }, [id, getTask]);

  console.log({ task });

  const redirectFromTask = () => {
    props.history.push('/');
  };
  console.log(props);

  const onDeleteTask = () => {
    const response = window.confirm(
      'Are you sure you want to delete this task?'
    );

    if (response) {
      deleteTask(id);
      // delete column
      console.log('delete task', id);
    } else {
      console.log("don't delete task", id);
    }
  };

  return (
    <div className="task-view">
      <OutsideClickHandler onOutsideClick={redirectFromTask}>
        <div className="flex flex-col flex-grow items-start justify-between px-4">
          {task ? (
            <>
              <div className="flex items-center w-full">
                <input
                  type="text"
                  className="p-2 w-full mr-2 block text-xl font-bold flex-grow-1"
                  value={task.name}
                  onChange={(e) => setTaskName(task, e.target.value)}
                />
                <FaTrashAlt onClick={onDeleteTask} />
              </div>
              <textarea
                className="relative w-full bg-transparent px-2 border mt-2 h-64 border-none leading-normal"
                value={task.description}
                onChange={(e) => setTaskDescription(task, e.target.value)}
              />
            </>
          ) : null}
        </div>
      </OutsideClickHandler>
    </div>
  );
};
export default Task;
