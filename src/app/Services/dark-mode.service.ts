import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  darkModeSignal= signal<string>('null');

  constructor() { }

  updateDarkMode(){
    this.darkModeSignal.update((v)=>(v ==="dark"?"null":"dark"))
  }
}
