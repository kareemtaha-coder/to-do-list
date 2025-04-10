import { Component, EventEmitter, Output, input  } from '@angular/core';
import { Task } from '../../models/task.model';
import { NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-task-item',
  imports:[NgIf,NgFor],
  templateUrl: './task-item.component.html',

})
export class TaskItemComponent {
  readonly task = input.required<Task>();
  @Output() toggleComplete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<string>();

  expanded = false;

  toggleExpand(): void {
    this.expanded = !this.expanded;
  }

  onToggleComplete(): void {
    this.toggleComplete.emit(this.task().id);
  }

  onEdit(): void {
    this.edit.emit(this.task());
  }

  onDelete(): void {
    this.delete.emit(this.task().id);
  }

  getPriorityColor(): string {
    const task = this.task();
    if (task.priority === 'high') {
      return 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300';
    } else if (task.priority === 'medium') {
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300';
    } else {
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300';
    }
  }

  isOverdue(): boolean {
    const task = this.task();
    if (!task.dueDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(task.dueDate);
    return dueDate < today && !task.completed;
  }

   formatDate(dateString: Date |undefined): string {
    if(!dateString){

      return ''
    }
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  }
}

