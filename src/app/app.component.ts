import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToDoComponent } from "./Components/to-do/to-do.component";
import { NavbarComponent } from "./Components/navbar/navbar.component";
import { DarkModeService } from './Services/dark-mode.service';
import { NgClass } from '@angular/common';
import { TaskListComponent } from "./Components/task-list/task-list.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToDoComponent, NavbarComponent, NgClass, TaskListComponent]
  ,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'to-do-list';
  darkModeService:DarkModeService = inject(DarkModeService)


   // Read the initial theme from localStorage.
    // 'dark' stored in localStorage means dark mode is enabled.
    private initialDark = localStorage.getItem('theme') === 'dark';

    // Create an Angular signal to hold the dark mode state.
    // Signals provide a reactive state that automatically triggers effects.
    themeDark = signal(this.initialDark);


    // Method to toggle the dark mode state.
    toggleTheme(): void {
      this.themeDark.set(!this.themeDark());
    }

    constructor() {

      // Create a reactive effect that runs whenever the themeDark signal changes.
     // It updates the <html> element's class and saves the theme preference.
     effect(() => {
       if (this.themeDark()) {
         // If dark mode is active, add the "dark" class to the <html> tag.
         document.documentElement.classList.add('dark');
       } else {
         // Otherwise, remove the "dark" class.
         document.documentElement.classList.remove('dark');
       }
       // Persist the theme preference to localStorage.
       localStorage.setItem('theme', this.themeDark() ? 'dark' : 'light');
     });
   }


}
