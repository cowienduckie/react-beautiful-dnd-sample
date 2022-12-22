export type TaskType = { id: string; content: string };

export type TaskListType = {
  [key: string]: TaskType;
};

export type ColumnType = { id: string; title: string; taskIds: string[] };

export type ColumnList = {
  [key: string]: ColumnType;
};
