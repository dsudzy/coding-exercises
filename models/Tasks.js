const mongoose = require('mongoose');

const { Schema } = mongoose;

const TasksSchema = new Schema({
    task: String
});

mongoose.model('Tasks', TasksSchema);