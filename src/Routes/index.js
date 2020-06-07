const express = require('express');
const router = express.Router();
const Task = require('../Models/task');

router.get('/',  async (req, res) => {          //ok
    const tasks = await Task.find();    
    res.json(tasks);
});

router.get('/:id', async ( req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
});

router.post('/', async (req, res) =>{  // ok
    const {title, description} = req.body;  
    const task = new Task({title, description});   
    await task.save();   
    res.json('Adicionado');
});

router.put('/:id',  async (req, res) => {   //  ok    
    const {title, description, status} = req.body;
    const newtask = {title, description, status};
    await Task.findByIdAndUpdate(req.params.id, newtask, {useFindAndModify: false});   
    res.json('Modificado');
});

router.delete('/:id',  async (req, res) => {     //ok
    const {id} = req.params;    
	await Task.deleteOne({_id:id});
    res.json('Eliminado');
});


 module.exports = router;  