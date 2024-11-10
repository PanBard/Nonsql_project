import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { EditFormComponent } from '../edit-form/edit-form.component';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [NgFor, EditFormComponent],
  template: `
    
<div class="flex">
  <div class="max-w-fit bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mr-4">
      <!-- <a href="#">
          <img class="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
      </a> -->
      <div class="p-5">
          
              <h5  class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> <span class="font-thin"> {{data_from_parent.title}} </span> </h5>
              <h6  class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Price:  <span class="font-thin"> {{data_from_parent.params[0].value.value}} </span> PLN</h6>
              <h6  class="mb-2 text-2xl  tracking-tight text-gray-900 dark:text-white">ID: {{data_from_parent.id}}</h6>
             <a href="{{data_from_parent.url}}"> <h6  class="mb-2 text-2xl  tracking-tight text-gray-900 dark:text-white">Url: {{data_from_parent.url}}</h6> </a>
          
          <p  class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{data_from_parent.description}}</p>
          <!-- <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              
              <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
          </a> -->
          <div class="grid grid-cols-4 gap-4 mt-8">
            <img *ngFor="let photo of data_from_parent.photos" class="  w-64 h-64  border border-gray-900 rounded-xl p-0"  alt="Obrazek" src="{{photo.link.split(';')[0]}}" alt=""/>
              
          </div>
          
      </div>
      
  </div>
  <!-- <app-edit-form [data_from_parent]="data_from_parent"/> -->
</div>


  `,
  styles: ``
})
export class ItemComponent {
 @Input() data_from_parent: any;
}
