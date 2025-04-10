import { Component, effect, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  // Read the initial theme from localStorage.
  // 'dark' stored in localStorage means dark mode is enabled.
  private initialDark = localStorage.getItem('theme') === 'dark';

  // Create an Angular signal to hold the dark mode state.
  // Signals provide a reactive state that automatically triggers effects.
  themeDark = signal(this.initialDark);

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

  // Method to toggle the dark mode state.
  toggleTheme(): void {
    this.themeDark.set(!this.themeDark());
  }

  // Create a signal to hold the menu open state (initially false).
  isMenuOpen = signal(false);

  // Toggle the menu state: true becomes false, and false becomes true.
  toggleMenu(): void {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  // HostListener on the document listens to every click event.
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedElement = event.target as HTMLElement;
    // If the menu is open and the click is neither inside the menu area
    // (identified by #navbar-default) nor on the toggle button (identified by aria-controls),
    // then close the menu.
    if (
      this.isMenuOpen() &&
      !clickedElement.closest('#navbar-default') &&
      !clickedElement.closest('button[aria-controls="navbar-default"]')
    ) {
      this.isMenuOpen.set(false);
    }
  }


}
