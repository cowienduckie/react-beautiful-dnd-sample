import { ColumnType, TaskType } from "../../types";
import { Task } from "../task";
import { TaskList } from "../tasks-list";
import { StrictModeDroppable } from "../../lib/strict-mode-droppable";
import { Container } from "../container";
import { Draggable } from "react-beautiful-dnd";
import { memo } from "react";

type ColumnProps = {
  column: ColumnType;
  tasks: TaskType[];
  index: number;
};

const InnerTaskList = memo(({ tasks }: { tasks: TaskType[] }) => (
  <>
    {tasks.map((task, index) => (
      <Task key={task.id} task={task} index={index} />
    ))}
  </>
));

const Column = (props: ColumnProps) => {
  const { column, tasks, index } = props;

  return (
    <Draggable key={column.id} draggableId={column.id} index={index}>
      {(provided) => (
        <Container
          className="m-5 p-5 bg-gray-100 rounded min-w-fit w-1/4 max-h-fit flex flex-col"
          {...provided.draggableProps}
          innerRef={provided.innerRef}
        >
          <h1 className="text-2xl font-bold mb-3" {...provided.dragHandleProps}>
            {column.title}
          </h1>
          <StrictModeDroppable droppableId={column.id} type="task">
            {(provided, snapshot) => (
              <TaskList
                className={`p-3 flex-grow flex flex-col rounded 
                  ${snapshot.isDraggingOver ? "bg-gray-400" : ""}`}
                innerRef={provided.innerRef}
                {...provided.droppableProps}
              >
                <InnerTaskList tasks={tasks} />
                {provided.placeholder}
              </TaskList>
            )}
          </StrictModeDroppable>
        </Container>
      )}
    </Draggable>
  );
};

export default memo(Column);
