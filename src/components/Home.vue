<template>
  <div class="container">
    <div class="row">
      <input type="text" v-model="newTask">
      <button @click="addNewTask">Add</button>
    </div>
    <div class="row" v-if="tasks">
      <ul>
        <li v-for="task in tasks">
          {{ task }}
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
export default {
    name: 'home',
    data() {
      return {
        tasks: [],
        newTask: null
      }
    },
    mounted() {
      this.getTasks();
    },
    methods: {
      getTasks() {
        // this.tasks = 
      },
      addNewTask() {
        if(this.newTask) {
          this.tasks.push(this.newTask)
        }
      }
    }
}
</script>