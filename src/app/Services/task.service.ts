// src/app/services/task.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = []; // Initialize as an empty array
  private tasksSubject = new BehaviorSubject<Task[]>([]);

  constructor() {
    // Initialize the tasks array first
    this.tasks = [];

    // Then load tasks from localStorage
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        this.tasks = JSON.parse(savedTasks, (key, value) => {
          if (key === 'dueDate' || key === 'createdAt') {
            return value ? new Date(value) : null;
          }
          return value;
        });
        this.tasksSubject.next([...this.tasks]);
      } catch (error) {
        console.error('Error parsing tasks from localStorage:', error);
        this.tasks = []; // Fallback to empty array if parsing fails
        this.tasksSubject.next([]);
      }
    }
  }

  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  getCategories(): string[] {
    if (!this.tasks || this.tasks.length === 0) return [];
    const categories = new Set(this.tasks.map(task => task.category));
    return Array.from(categories);
  }

  addTask(task: Omit<Task, 'id' | 'createdAt'>): void {
    const newTask: Task = {
      ...task,
      id: this.generateId(),
      createdAt: new Date()
    };

    // Ensure this.tasks is initialized
    if (!this.tasks) {
      this.tasks = [];
    }

    this.tasks.push(newTask);
    this.updateTasks();
  }

  updateTask(updatedTask: Task): void {
    if (!this.tasks) {
      this.tasks = [];
      return;
    }

    const index = this.tasks.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.updateTasks();
    }
  }

  deleteTask(id: string): void {
    if (!this.tasks) {
      this.tasks = [];
      return;
    }

    this.tasks = this.tasks.filter(task => task.id !== id);
    this.updateTasks();
  }

  toggleComplete(id: string): void {
    if (!this.tasks) {
      this.tasks = [];
      return;
    }

    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.updateTasks();
    }
  }

  private updateTasks(): void {
    // Ensure we're not saving undefined
    if (!this.tasks) {
      this.tasks = [];
    }

    this.tasksSubject.next([...this.tasks]);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
