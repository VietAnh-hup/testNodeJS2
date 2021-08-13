const express = require("express");
const router = express.Router();

// these are the controllers
// we will create all of them in the future
const {
  createTodo,
  getTodoById,
  getTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
  searchName,
  searchStatus
} = require("../controllers/Todo");

//params
// it will fetch the value from the url

router.param("todoId", getTodoById);

// to get all the todos

/**
 * @swagger
 * /api/todos:
 *  get:
 *    description: Use to request all task
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get("/todos/", getAllTodos);

// to get a single todo

/**
 * @swagger
 * /api/todo/:todoId:
 *  get:
 *    description: Use to request one task
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get("/todo/:todoId/", getTodo);

// to create a todo

/**
 * @swagger
 * /api/todo/create:
 *  post:
 *    description: Use to create new task
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post("/todo/create/", createTodo);

// to update the todo

/**
 * @swagger
 * /api/todo/update:
 *  put:
 *    description: Use to update one task
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.put("/todo/update", updateTodo);

// to delete the todo
/**
 * @swagger
 * /api/todo/delete:
 *  delete:
 *    description: Use to delete one task
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.delete("/todo/delete", deleteTodo);

/**
 * @swagger
 * /api/todo/searchName:
 *  get:
 *    description: Use to search name one task
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get("/todo/searchName", searchName)

/**
 * @swagger
 * /api/todo/searchStatus:
 *  get:
 *    description: Use to search status one task
 *    responses:
 *      '200':
 *        description: A successful response
 */

router.get("/todo/searchStatus" , searchStatus)

// we will export the router to import it in the index.js
module.exports = router;