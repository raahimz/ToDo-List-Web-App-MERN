const express =  require("express");
const mongoose = require("mongoose");
const cors = require('cors');

app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('invalid', {useNewURLParser: true});

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

app.post('/tasks/complete', (req, res) => {
    const id = req.body.id;
    const completed = req.body.completed;
    
    Task.findByIdAndUpdate(id, {'completed': completed})
        .then(() => res.json('Updated task!'))
        .catch(err => res.status(400).json(err));
})

const port = process.env.port || 3000

app.listen(port, () => {
    console.log("Server running at port " + port);
})
