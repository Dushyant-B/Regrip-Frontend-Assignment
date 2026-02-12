import { create } from "zustand";
import { fakeApiCall } from "../api/mockApi";
import { toast } from "react-hot-toast";

const useTaskStore = create((set, get) => ({
  tasks: [],

  addTask: async (title) => {
    const previousTasks = get().tasks;

    const newTask = {
      id: Date.now().toString(),
      title,
      status: "todo",
    };

    set({
      tasks: [...previousTasks, newTask],
    });

    try {
      await fakeApiCall();
    } catch (err) {
      
      set({ tasks: previousTasks });
      toast.error("Failed to add task");
    }
  },

  deleteTask: async (id) => {
    const previousTasks = get().tasks;

    set({
      tasks: previousTasks.filter((task) => task.id !== id),
    });

    try {
      await fakeApiCall();
    } catch (err) {
     
      set({ tasks: previousTasks });
      toast.error("Failed to delete task");
    }
  },

  moveTask: async (id, newStatus) => {
    const previousTasks = get().tasks;

    
    set({
      tasks: previousTasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      ),
    });

    try {
      await fakeApiCall();
    } catch (err) {
    
      set({ tasks: previousTasks });
      toast.error("Failed to move task");
    }
  },
}));

export default useTaskStore;
