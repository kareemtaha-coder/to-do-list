import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {FormGroup , ReactiveFormsModule , FormBuilder} from '@angular/forms'
@Component({
  selector: 'app-to-do',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.css'
})
export class ToDoComponent {
registerForm!:FormGroup;
private fb:FormBuilder=inject(FormBuilder);


ngOnInit() {
this.registerForm =this.fb.group({
    name:[''],
    lname:['']
})
}


onSubmit():void{
  console.log(this.registerForm.value)
}
}
