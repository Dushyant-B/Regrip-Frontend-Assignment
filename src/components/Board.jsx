import { DragDropContext } from "@hello-pangea/dnd";
import useTaskStore from "../store/taskStore";
import Column from "./Column";

function Board() {
  const moveTask = useTaskStore((state) => state.moveTask);

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (source.droppableId === destination.droppableId) return;

    moveTask(draggableId, destination.droppableId);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="max-w-6xl mx-auto grid grid-cols-3 gap-8">
        <Column title="To Do" status="todo" />
        <Column title="In Progress" status="inprogress" />
        <Column title="Done" status="done" />
      </div>
    </DragDropContext>
  );
}

export default Board;
