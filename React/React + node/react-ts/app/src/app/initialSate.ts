import { Todo, StateItem } from "../types";

export const listTodosInit: Todo[] = [
  {
    ...new Todo({
      name: "string",
      username: "string",
      email: "string",
      address: {},
      phone: "string",
      website: "string",
      company: {},
      done: false
    }),
  },
];


