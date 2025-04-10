import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject, filter } from 'rxjs';
import { Task } from '../models/task.model';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks!:Task[];
  private tasksSubject=new BehaviorSubject<Task[]>([])


  constructor() {
    const savedTasks= localStorage.getItem('tasks');
    if(savedTasks){
      this.tasks=JSON.parse(savedTasks,(key,value)=>{
        if(key==='dueDate' ||key==='createdAt'){
          return value?new Date(value):null;
        }
        return value;
      });
      this.tasksSubject.next([...this.tasks]);
    }
  }

  getTasks():Observable<Task[]>{
    return this.tasksSubject.asObservable();
  }
  getCategories():string[]{
    const categories=new Set(this.tasks.map(task=>task.category))
    return Array.from(categories)
  }
  addTask(task:Omit<Task,'id'|'createdAt'>):void{
    const newTask:Task={
      ...task,
      id:this.generateId(),
      createdAt:new Date()
    }
    this.tasks.push(newTask);
    this.UpdateTasks();
  }

  UpdateTask(updatedTask:Task):void{
    const index=this.tasks.findIndex(t=>t.id === updatedTask.id)
    if(index !==-1){
      this.tasks[index]=updatedTask;
      this.UpdateTasks();
    }
  }
  deleteTask(id:string):void{
    this.tasks= this.tasks.filter(task=>task.id!==id);
    this.UpdateTasks();
  }
  toggleComplete(id:string):void{
    const task=this.tasks.find(t=>t.id===id)
    if(task){
      task.completed= !task.completed;
      this.UpdateTasks();
    }
  }
  private UpdateTasks():void{
    this.tasksSubject.next([...this.tasks]);
    localStorage.setItem('tasks',JSON.stringify(this.tasks))
  }
  private generateId():string{
    return Date.now().toString(36)+Math.random().toString(36).substr(2);
  }
}
