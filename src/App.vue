<template>
  <div id="app">
    <ToDoList />
  </div>
</template>

<script lang="ts">
import ToDoList from './components/ToDoList.vue';

export default {
  components: {
    ToDoList,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
}
</style>
