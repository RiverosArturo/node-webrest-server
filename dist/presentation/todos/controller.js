"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosController = void 0;
const todos = [
    { id: 1, text: 'Buy milk', completedAt: new Date() },
    { id: 2, text: 'Buy bread', completedAt: null },
    { id: 3, text: 'Buy butter', completedAt: new Date() }
];
//Creamos nuestras funciones get,put,delete de todos
class TodosController {
    //* Dependenci Inyection
    constructor() {
        this.getTodos = (req, res) => {
            return res.json(todos);
        };
        this.getTodoById = (req, res) => {
            //Usamos el + para recibir el id como número y no como string
            const id = +req.params.id;
            if (isNaN(id))
                return res.status(400).json({ error: 'Id argument is not a number' });
            const todo = todos.find(todo => todo.id === id);
            (todo)
                ? res.json(todo)
                : res.status(404).json({ error: `TODO with id ${id} not found.` });
        };
        this.createTodo = (req, res) => {
            const { text } = req.body;
            if (!text)
                res.status(400).json({ error: "Text property is required" });
            const newTodo = {
                id: todos.length + 1,
                text: text,
                completedAt: null
            };
            todos.push(newTodo);
            res.json(newTodo);
        };
        this.updateTodo = (req, res) => {
            const id = +req.params.id;
            if (isNaN(id))
                return res.status(400).json({ error: 'Id argument is not a number' });
            const todo = todos.find(todo => todo.id === id);
            if (!todo)
                return res.status(404).json({ error: `Todo with id ${id} not found` });
            const { text, completedAt } = req.body;
            todo.text = text || todo.text;
            (completedAt === 'null')
                ? todo.completedAt = null
                : todo.completedAt = new Date(completedAt || todo.completedAt);
            // todos.forEach( (todo, index) => {
            //     if( todo.id === id ){
            //         todos[index] = todo;
            //     }
            // })
            res.status(200).json(todo);
        };
        this.deleteTodo = (req, res) => {
            const id = +req.params.id;
            if (isNaN(id))
                return res.status(400).json({ error: 'Id argument is not a number' });
            const todo = todos.find(todo => todo.id === id);
            if (!todo)
                return res.status(404).json({ error: `Todo with id ${id} not found` });
            todos.splice(todos.indexOf(todo), 1);
            res.status(200).json(todo);
        };
    }
}
exports.TodosController = TodosController;
