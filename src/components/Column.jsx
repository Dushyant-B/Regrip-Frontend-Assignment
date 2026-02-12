import { useState } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import useTaskStore from "../store/taskStore";

function Column({ title, status }) {
  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  const [newTask, setNewTask] = useState("");

  const filteredTasks = tasks.filter(
    (task) => task.status === status
  );

  const handleAdd = () => {
    if (!newTask.trim()) return;
    addTask(newTask);
    setNewTask("");
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 min-h-[480px] border border-gray-200 hover:shadow-xl transition-all duration-300">
      
      <h2 className="font-semibold mb-6 text-lg text-gray-700 tracking-wide">
        {title}
      </h2>

      {status === "todo" && (
        <div className="mb-5">
          <input
            type="text"
            placeholder="Add a task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={handleAdd}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 shadow-sm"
          >
            Add Task
          </button>
        </div>
      )}

      <Droppable droppableId={status}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>

            {filteredTasks.length === 0 && (
              <div className="text-sm text-gray-400 italic">
                Drag tasks here
              </div>
            )}

            {filteredTasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-white p-4 rounded-xl mb-4 shadow-md border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">
                        {task.title}
                      </span>

                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-gray-400 hover:text-red-500 transition text-sm"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Column;
