const Todo = require("../models/Todo");

exports.getTodoById = (req, res, next, todoId) => {
    // todoId is coming from the router.param
    // .findById() method will find the todo which has id==todoId
    Todo.findById(todoId).exec((err, todo) => {
      if (err || !todo) {
        return res.status(400).json({
          error: "404 todo not found",
        });
      }
      // store that todo in req.todo so that other functions can use it
      req.todo = todo;
      // Because this is a middleware we have to call the next()
     // which will pass the control to the next function in the middleware stack
      next();
    });
  };

  exports.getAllTodos = (req, res) => {
    // simply use .find() method and it will return all the todos
    Todo.find()
      .sort("-createdAt")
      .exec((err, todos) => {
        // error checking
        if (err || !todos) {
          return res.status(400).json({
            error: "Something went wrong in finding all todos",
          });
        }
        // return all the todos in json format
        res.json(todos);
      });
  };

  exports.getTodo = (req, res) => {
    // this is pretty simple because we've already defined a middleware
    // to get a todo from the URL id
    // this req.todo is coming from that middleware
    return res.json(req.todo);
  };

  exports.createTodo = (req, res) => {
    // we will get json data from the frontend i.e. req.body
    console.log(req.body.toObject)
    const todo = new Todo(req.body);
  
    // create a todo instance by passing 'task' field from 'req.body'
    todo.save((err, task) => {
      if (err || !task) {
        return res.status(400).json({
          error: "something went wrong",
        });
      }
      // todo is created
      // send the created todo as json response
      res.json({ task });
    });
  };

  exports.updateTodo = (req , res) => {
    Todo.updateOne({ _id: req.body.id }, req.body)
        .then (() => res.send("Update sucessfully"))
        .catch(() => res.send("Update error"));
  }

  exports.deleteTodo = (req , res) => {
    Todo.updateOne({ _id: req.body.id  },  {status: 3})
    .then (() => res.send("Delete sucessfully"))
    .catch(() => res.send("Delete error"));
  }

  exports.searchName = (req , res) => {
    Todo.find({name: req.query.name})
        .then(Todo => {
            Todo = Todo.map(Todo => Todo.toObject());
            res.send(Todo)
        })
        .catch(() =>
            res.send({err: "Search error"})
        )
  }

  exports.searchStatus = (req, res) =>
  {
    Todo.find({status: req.query.status})
        .then(Todo => {
            Todo = Todo.map(Todo => Todo.toObject());
            res.send(Todo)
        })
        .catch(() =>
            res.send({err: "Search error"})
        )
  }