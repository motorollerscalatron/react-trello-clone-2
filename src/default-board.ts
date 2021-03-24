import { uuid } from "./utils";

export interface ITask {
  description: string;
  name: string;
  id: string;
  userAssigned: boolean | null;
}

export interface IBoardColumn {
  name: string;
  tasks: ITask[];
}

export interface IBoardData {
  name: string;
  columns: IBoardColumn[];
}

const boardData: IBoardData = {
  name: "workshop",
  columns: [
    {
      name: "todo",
      tasks: [
        {
          description: "",
          name: "first task",
          id: uuid(),
          userAssigned: null,
        },
        {
          description: "",
          name: "second task",
          id: uuid(),
          userAssigned: null,
        },
        {
          description: "",
          name: "and third",
          id: uuid(),
          userAssigned: null,
        },
      ],
    },
    {
      name: "in-progress",
      tasks: [
        {
          description: "",
          name: "first task",
          id: uuid(),
          userAssigned: null,
        },
      ],
    },
    {
      name: "done",
      tasks: [
        {
          description: "",
          name: "first task",
          id: uuid(),
          userAssigned: null,
        },
      ],
    },
  ],
};

export default boardData;
