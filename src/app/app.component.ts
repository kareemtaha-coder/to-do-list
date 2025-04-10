import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToDoComponent } from "./Components/to-do/to-do.component";
import { NavbarComponent } from "./Components/navbar/navbar.component";
import { DarkModeService } from './Services/dark-mode.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToDoComponent, NavbarComponent,NgClass]
  ,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'to-do-list';
  darkModeService:DarkModeService = inject(DarkModeService)
}
