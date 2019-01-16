<template>
  <div class="container">
    <div class="row">
      <h2>Create your task list</h2>
    </div>
    <div class="row" @keyup.enter="addNewTask">
      <input type="text" v-model="newTask">
      <button @click="addNewTask">Add</button>
    </div>
    <div class="row" v-if="tasks">
      <ul>
        <li v-for="(task, key) in tasks">
          <template v-if="!showUpdate">
            <span>{{ task.task }}</span>
            <span class="delete" @click="deleteTask(task._id)">x</span>
            <span class="edit" @click="toggleUpdate">edit</span>
          </template>
          <template v-if="showUpdate">
            <input type="text" v-model="updateTaskValue">
            <button @click="saveUpdate(task.id)">update</button>
            <span @click="toggleUpdate(key)">x</span>
          </template>
        </li>
      </ul>
    </div>
  </div>

</template>

<style lang="scss">
.row li {
  .delete, .edit {
    display: none;
  }
  &:hover {
    .delete, .edit {
      display: inline;
    }
  }
}

</style>

<script>
// @TODO add keyup enter function
export default {
  name: 'home',
  data() {
    return {
      tasks: [],
      newTask: null,
      showUpdate: false,
      updateTaskValue: null,
      user: {}
    }
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getTasks();
  },
  methods: {
    getTasks() {
      axios.get('/api/tasks?id=' + this.user._id)
      .then((response) => {
        if(response.data.tasks.length > 0) {
          this.tasks = response.data.tasks;
        }
      });
    },
    addNewTask() {
      if(this.newTask) {
        axios.post('/api/tasks', {
          task: this.newTask,
          user: this.user._id
        })
        .then((response) => {
          this.tasks = response.data.tasks;
          this.newTask = null;
        });
      }
    },
    deleteTask(id) {
      axios.patch('/api/tasks/delete', {
        user: this.user._id,
        id: id
      })
      .then((response) => {
        this.tasks = response.data.tasks;
      });
    },
    toggleUpdate(key) {
      this.showUpdate = !this.showUpdate;
    },
    saveUpdate() {
      // axios.patch('/api/tasks/update', {task: this.updateTaskValue})
      // .then((response) => {
      // })
    }
  }
}
</script>