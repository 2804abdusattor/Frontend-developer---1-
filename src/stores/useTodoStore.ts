// src/stores/useTodoStore.ts
import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]') as { text: string; completed: boolean; }[],
  }),
  actions: {
    addTask(task: string) {
      if (task.trim()) {
        this.tasks.push({ text: task, completed: false });
        this.saveTasks();
      }
    },
    toggleTaskCompletion(index: number) {
      this.tasks[index].completed = !this.tasks[index].completed;
      this.saveTasks();
    },
    deleteTask(index: number) {
      this.tasks.splice(index, 1);
      this.saveTasks();
    },
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
  },
});
