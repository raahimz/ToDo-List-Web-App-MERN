const express =  require("express");
const mongoose = require("mongoose");
const cors = require('cors');

app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/tasksDB', {useNewURLParser: true});

const taskSchema = new mongoose.Schema({
    text: {type: String, required: true},
    completed: {type: Boolean, required: false, default: false}
});

const Task = new mongoose.model('Task', taskSchema);

app.get('/tasks', (req, res) => {
    Task.find()
        .then(tasks => res.json(tasks))
        .catch(err => res.status(400).json(err));
});

app.post('/tasks/add', (req, res) => {
    const newTask = new Task({
        text: req.body.text,
        completed: false
    });

    newTask.save()
        .then(() => res.json("New task added!"))
        .catch(err => res.status(400).json(err));
});

app.delete('/tasks/delete/:id', (req, res) => {
    Task.findByIdAndRemove(req.params.id)
        .then(() => res.json('Deleted task!'))
        .catch(err => res.status(400).json(err));
});

app.get('/tasks/complete/:id', (req, res) => {
    const id = req.params.id;

    Task.findById(id)
        .then(response => {
            Task.findByIdAndUpdate(id, {'completed': !response.completed})
                .then(() => res.json('Updated task!'))
                .catch(err => res.status(400).json(err));
        });
})

app.listen('3000', () => {
    console.log("Server running at port 3000");
})
