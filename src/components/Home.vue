<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h1>Welcome {{ user.username }}</h1>
      </div>
    </div>
    <div class="row" @keyup.enter="addNewTask">
      <div class="col-md-6">
        <h2>Create your task list</h2>
        <div v-if="tasks">
          <input type="text" v-model="newTask">
          <button @click="addNewTask" v-if="!updating">Add</button>
          <button @click="saveUpdate" v-else>Update</button>
          <ul>
            <li v-for="task in tasks" :class="{updating: updating == task._id}">
              <span>{{ task.task }}</span>
              <span class="delete" @click="deleteTask(task._id)">x</span>
              <span class="edit" @click="toggleUpdate(task._id)">edit</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-6">
        <h2>User Data</h2>
        <ul>
          <li v-for="(i, index) in user" v-if="index != '_id' && index != 'token' && index != 'task'">
            {{ index }}: {{ i }}
          </li>
        </ul>
      </div>
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
.updating {
  background-color: red;
}
</style>

<script>
export default {
  name: 'home',
  data() {
    return {
      tasks: [],
      newTask: null,
      updating: false,
      user: {},
      authenticationHeader: null
    }
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.token = localStorage.getItem('jwt');
    this.authenticationHeader = { headers: {"Authorization" : `Bearer ${this.token}`} };
    if(this.user) {
      this.getTasks();
    }
  },
  methods: {
    getTasks() {
      axios.get('/api/tasks?id=' + this.user._id, this.authenticationHeader)
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
        }, this.authenticationHeader)
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
      }, this.authenticationHeader)
      .then((response) => {
        this.tasks = response.data.tasks;
      });
    },
    toggleUpdate(id) {
      if(!this.updating || this.updating != id) {
        this.updating = id;
      } else {
        this.updating = false;
      }
    },
    saveUpdate() {
      axios.patch('/api/tasks/update', {
        user: this.user._id,
        id: this.updating,
        task: this.newTask
      }, this.authenticationHeader)
      .then((response) => {
        this.updating = false;
        this.tasks = response.data.tasks;
        this.newTask = null;
      })
    }
  }
}
</script>