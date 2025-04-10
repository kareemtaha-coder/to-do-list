import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../Services/task.service';
import { TaskItemComponent } from '../task-item/task-item.component';
import { FormsModule } from '@angular/forms';
import { TaskFormComponent } from "../task-form/task-form.component";

@Component({
  selector: 'app-task-list',
  imports: [FormsModule, TaskItemComponent, TaskFormComponent],
  templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  categories: string[] = [];

  showForm = false;
  taskToEdit?: Task;

  filterOptions = {
    status: 'all', // 'all', 'active', 'completed'
    priority: 'all', // 'all', 'high', 'medium', 'low'
    category: 'all', // 'all' or any category name
    search: ''
  };

  sortOption = 'createdAt'; // 'createdAt', 'dueDate', 'priority', 'title'
  sortDirection = 'desc'; // 'asc', 'desc'

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.categories = this.taskService.getCategories();
      this.applyFilters();
    });
  }

  toggleComplete(id: string): void {
    this.taskService.toggleComplete(id);
  }

  editTask(task: Task): void {
    this.taskToEdit = task;
    this.showForm = true;
  }

  deleteTask(id: string): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id);
    }
  }

  onFormClose(): void {
    this.showForm = false;
    this.taskToEdit = undefined;
  }

  applyFilters(): void {
    let result = [...this.tasks];

    // Filter by status
    if (this.filterOptions.status !== 'all') {
      const isCompleted = this.filterOptions.status === 'completed';
      result = result.filter(task => task.completed === isCompleted);
    }

    // Filter by priority
    if (this.filterOptions.priority !== 'all') {
      result = result.filter(task => task.priority === this.filterOptions.priority);
    }

    // Filter by category
    if (this.filterOptions.category !== 'all') {
      result = result.filter(task => task.category === this.filterOptions.category);
    }

    // Filter by search term
    if (this.filterOptions.search.trim()) {
      const searchTerm = this.filterOptions.search.toLowerCase();
      result = result.filter(task =>
        task.title.toLowerCase().includes(searchTerm) ||
        (task.descriPtion && task.descriPtion.toLowerCase().includes(searchTerm))
      );
    }

    // Apply sorting
    result = this.sortTasks(result);

    this.filteredTasks = result;
  }

  sortTasks(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => {
      let comparison = 0;

      switch (this.sortOption) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'dueDate':
          // Handle undefined dates
          if (!a.dueDate && !b.dueDate) comparison = 0;
          else if (!a.dueDate) comparison = 1;
          else if (!b.dueDate) comparison = -1;
          else comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
          break;
        case 'priority':
          const priorityOrder = { 'high': 0, 'medium': 1, 'low': 2 };
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
        case 'createdAt':
        default:
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
      }

      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  toggleSortDirection(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.applyFilters();
  }

  resetFilters(): void {
    this.filterOptions = {
      status: 'all',
      priority: 'all',
      category: 'all',
      search: ''
    };
    this.applyFilters();
  }

  getTasksCountByStatus(status: 'all' | 'active' | 'completed'): number {
    if (status === 'all') return this.tasks.length;
    const isCompleted = status === 'completed';
    return this.tasks.filter(task => task.completed === isCompleted).length;
  }
}
