import { Component } from '@angular/core';
import { Registro } from './registro/registro';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Registro],
  template: `<app-registro />`,
})
export class App {}
