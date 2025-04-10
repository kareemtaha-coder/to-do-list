import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../Services/task.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule,ReactiveFormsModule,NgIf,NgFor],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
@Input() taskToEdit?:Task;
@Output() formCLose=new EventEmitter<void>();


taskForm!:FormGroup;
categories:string[]=[];
isEditMode:boolean=false;

/**
 *
 */
constructor(
  private fb:FormBuilder,
  private taskService:TaskService
) {}

ngOnInit(): void {
  this.initForm();
  this.categories = this.taskService.getCategories();

  if (this.taskToEdit) {
    this.isEditMode = true;
    this.taskForm.patchValue({
      title: this.taskToEdit.title,
      description: this.taskToEdit.descriPtion || '',
      priority: this.taskToEdit.priority,
      category: this.taskToEdit.category,
      dueDate: this.taskToEdit.dueDate ? this.formatDateForInput(this.taskToEdit.dueDate) : ''
    });
  }
}


initForm(): void {
  this.taskForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
    priority: ['medium', Validators.required],
    category: ['', Validators.required],
    dueDate: ['']
  });
}

onSubmit(): void {
  if (this.taskForm.invalid) return;

  const formValue = this.taskForm.value;

  const taskData = {
    title: formValue.title,
    description: formValue.description,
    priority: formValue.priority,
    category: formValue.category,
    dueDate: formValue.dueDate ? new Date(formValue.dueDate) : undefined,
    completed: this.isEditMode ? this.taskToEdit!.completed : false
  };

  if (this.isEditMode && this.taskToEdit) {
    this.taskService.updateTask({
      ...taskData,
      id: this.taskToEdit.id,
      createdAt: this.taskToEdit.createdAt
    });
  } else {
    this.taskService.addTask(taskData);
  }

  this.resetForm();
}


onCancel(): void {
  this.resetForm();
}

resetForm(): void {
  this.taskForm.reset({
    priority: 'medium'
  });
  this.formCLose.emit();
}

formatDateForInput(date: Date): string {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

}
