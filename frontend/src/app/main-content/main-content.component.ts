import { Component } from '@angular/core';
import { ItemsListComponent } from '../items-list/items-list.component';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [NgIf,ItemsListComponent],
  template: `
  <section class="bg-white dark:bg-gray-900 ">
    <app-items-list *ngIf="showComponent"/>
  </section>
  `,
  styles: ``
})
export class MainContentComponent {
  showComponent = true;
  
  toggleComponent() {
    this.showComponent = !this.showComponent;
  }

}
