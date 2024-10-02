<template>
    <div>
      <h1>To-Do List</h1>
      <input v-model="newTask" placeholder="Добавьте новую задачу" @keyup.enter="addTask" />
      <ul>
        <li v-for="(task, index) in tasks" :key="task.id">
          <span :class="{ completed: task.completed }" @click="toggleTaskCompletion(task)">
            {{ task.text }}
          </span>
          <button @click="editTask(index)">Редактировать</button>
          <button @click="removeTask(index)">Удалить</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  import { ref, onMounted } from 'vue';
  
  interface Task {
    id: number;
    text: string;
    completed: boolean;
  }
  
  export default {
    setup() {
      const tasks = ref<Task[]>([]);
      const newTask = ref('');
      const nextId = ref(1);
  
      onMounted(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
          tasks.value = JSON.parse(storedTasks);
          nextId.value = tasks.value.length > 0 ? tasks.value[tasks.value.length - 1].id + 1 : 1;
        }
      });
  
      const addTask = () => {
        if (newTask.value.trim()) {
          tasks.value.push({ id: nextId.value++, text: newTask.value.trim(), completed: false });
          newTask.value = '';
          saveTasks();
        }
      };
  
      const editTask = (index: number) => {
        const updatedText = prompt('Редактируйте задачу:', tasks.value[index].text);
        if (updatedText !== null) {
          tasks.value[index].text = updatedText;
          saveTasks();
        }
      };
  
      const removeTask = (index: number) => {
        tasks.value.splice(index, 1);
        saveTasks();
      };
  
      const toggleTaskCompletion = (task: Task) => {
        task.completed = !task.completed;
        saveTasks();
      };
  
      const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks.value));
      };
  
      return {
        tasks,
        newTask,
        addTask,
        editTask,
        removeTask,
        toggleTaskCompletion,
      };
    },
  };
  </script>
  
  <style scoped>
  .completed {
    text-decoration: line-through;
  }
  </style>
  