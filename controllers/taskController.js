const Task = require( '../models/Task' );
const { validateTask } = require( '../utils/validation' );

// create a new task
exports.createTask = async ( req, res ) => {
  try {
    // validate the request body
    const { error } = validateTask( req.body );
    if ( error )
      return res.status( 400 ).json( { message: error.details[0].message } );
    const { title, description, status } = req.body;
    // creating a new task and adding it to the database by save() function
    const task = new Task( {
      title,
      description,
      status,
    } );
    await task.save();

    res.status( 201 ).json( task );
  } catch ( err ) {
    res.status( 500 ).json( { message: 'Error creating task' } );
  }
};

// fetching all the tasks
exports.getTasks = async ( req, res ) => {
  try {
    const tasks = await Task.find();
    res.json( tasks );
  } catch ( err ) {
    res.status( 500 ).json( { message: 'Error fetching tasks' } );
  }
};

// fetching a single task by id
exports.getTaskById = async ( req, res ) => {
  try {
    const task = await Task.findById( req.params.id );
    if ( !task )
      return res.status( 404 ).json( { message: 'Task not found' } );
    res.json( task );
  } catch ( err ) {
    res.status( 500 ).json( { message: 'Error fetching task' } );
  }
};

// updating a task
exports.updateTask = async ( req, res ) => {
  try {
    // validate the request body
    const { error } = validateTask( req.body );
    if ( error )
      return res.status( 400 ).json( { message: error.details[0].message } );

    // find the task by id and update it
    let task = await Task.findById( req.params.id );
    if ( !task )
      return res.status( 404 ).json( { message: 'Task not found' } );
    const { title, description, status } = req.body;

    task.title = title;
    task.description = description;
    task.status = status;
    task.updatedAt = Date.now();
    await task.save();

    res.json( task );
  } catch ( err ) {
    res.status( 500 ).json( { message: 'Error updating task' } );
  }
};

// delete a task
exports.deleteTask = async ( req, res ) => {
  try {
    const task = await Task.findByIdAndDelete( req.params.id );
    if ( !task )
      return res.status( 404 ).json( { message: 'Task not found' } );
    res.json( { message: 'Task deleted successfully' } );
  } catch ( err ) {
    res.status( 500 ).json( { message: 'Error deleting task' } );
  }
};