import { Request, Response } from "express"
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";

// const todos = [
//     { id: 1, text: 'Buy milk', completedAt: new Date() },
//     { id: 2, text: 'Buy bread', completedAt: null },
//     { id: 3, text: 'Buy butter', completedAt: new Date() }
// ];
//Creamos nuestras funciones get,put,delete de todos
export class TodosController {
    //* Dependenci Inyection
    constructor(
        private readonly todoRepository: TodoRepository,
    ){}

    public getTodos = async(req:Request,res:Response) => {
        const todos =  await this.todoRepository.getAll();
        
        return res.json(todos);
    }

    public getTodoById = async(req:Request, res:Response) => {
        //Usamos el + para recibir el id como número y no como string
        const id = +req.params.id;

        try {
            const todo = await this.todoRepository.deleteById(id);
            return res.json(todo);
        } catch (error) {
            return res.status(404).json({error});
        }
    }

    public createTodo = async(req:Request, res:Response) => {

        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if( error ) return res.status(400).json({ error });
        // const { text }= req.body;
        // if( !text ) res.status(400).json({ error: "Text property is required" });

        const todo = await this.todoRepository.create(createTodoDto!);
        return res.json(todo);
    }

    public updateTodo = async( req:Request, res:Response ) => {
        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});
        if( error ) return res.status(400).json({error});
        // if( isNaN(id) ) return res.status(400).json({error: 'Id argument is not a number'});

        const updatedTodo = await this.todoRepository.updateById(updateTodoDto!);
        return res.json( updatedTodo );
    }

    public deleteTodo = async(req:Request, res:Response ) => {
        const id = +req.params.id;
        const deletedTodo = await this.todoRepository.deleteById(id);
        return res.json(deletedTodo);
    }
}