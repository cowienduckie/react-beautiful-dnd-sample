import { TaskType } from "../../types";
import { Container } from "../container";
import { Draggable } from "react-beautiful-dnd";
import { memo } from "react";

type TaskProps = {
  task: TaskType;
  index: number;
};

const Task = (props: TaskProps) => {
  const { task, index, ...otherProps } = props;

  return (
    <Draggable draggableId={task.id} index={index} key={task.id} {...otherProps}>
      {(provided, snapshot) => (
        <Container
          className={`w-full p-4 my-2 rounded ${snapshot.isDragging ? "bg-green-100" : "bg-white"}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          innerRef={provided.innerRef}
        >
          {task.content}
        </Container>
      )}
    </Draggable>
  );
};

export default memo(Task);
