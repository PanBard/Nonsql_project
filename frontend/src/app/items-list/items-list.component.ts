import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ItemComponent } from '../item/item.component';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [NgFor, NgIf, ItemComponent],
  template: `

  

   <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
      <div class="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400 ">
      <h2 *ngIf="apiData" class="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">Retrieved <span class="font-extrabold">{{number_of_data_from_db}}</span> documents from database</h2>

          <div *ngIf="!apiData" role="status" class="flex items-center justify-center mt-8 text-gray-500 sm:text-lg dark:text-gray-400">
              <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span class="sr-only">Loading...</span>
          </div>

          <div class="m-4">
           Search in description:
          <input class="m-4 bg-slate-400 rounded-xl text-cyan-800 p-3" placeholder="Search for something in description" #inputElement type="text" value="">
            <button class="m-4 border-2 rounded-xl p-2  border-blue-700" (click)="getValue(inputElement.value, true)">Search</button>
             
            Sort:
            <button class="m-4 border-2 rounded-xl p-2  border-blue-700" (click)="getValue(inputElement.value, true)">Ascending</button>
            <button class="m-4 border-2 rounded-xl p-2  border-blue-700" (click)="getValue(inputElement.value, false)">Descending</button>
          </div>

          <div *ngIf="apiData && bool_variable" >
            <div  *ngFor="let data of apiData" #elo class="p-4 border border-r-teal-700 m-4 hover:border-r-4 cursor-pointer flex justify-between " (click) = "show_only_one(data)">
              <p  class="mb-4 font-medium w-1/3 p-3">{{data.title}}</p>
              <p class="mb-4 font-light w-1/3 p-3">{{data.params[0].value.value}} zł</p>
              <!-- <a href="" class="inline-flex items-center font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-700">
                  Learn more
                  <svg class="ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
              </a> -->
              <img class=" w-24 h-24   border border-gray-900 rounded-xl "  alt="Obrazek" src="{{data.photos[0].link.split(';')[0]}}" alt=""/>
            </div>
          </div>

          
          <div >
            <img (click) = "show_only_one(1)"  src="/assets/images/left_arrow.svg" class="cursor-pointer mr-3 h-6 sm:h-9 bg-white border rounded-2xl"  />
             <app-item *ngIf="!bool_variable " class="m-2" [data_from_parent]="data_to_child" />
          </div>
         
          
                                      
      </div>
    </div>

    
  `,
  styles: ``
})
export class ItemsListComponent {
  api_url = environment.apiUrl

  searched_word = "";


  constructor(private http: HttpClient) { 
    this.fetchDataFromApi();
  }
  apiData: any;
  data_to_child: any;
  number_of_data_from_db = 0;
  bool_variable = true;


  show_only_one(data:any)
  {
    this.data_to_child = data;
    if(this.bool_variable == false){
      this.bool_variable = true;
    }
    else{
      this.bool_variable = false
    }
  }

  fetchDataFromApi() {
    this.http.get<any>(this.api_url+'/allData').subscribe(
      (response) => {
        this.apiData = response;
        // console.log(this.apiData);
        this.number_of_data_from_db = this.apiData.length
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getValue(value: string, ascending: boolean): void 
  {
    // console.log(typeof(value))
    this.searched_word = value;
    // this.http.get(this.api_url+`/getDataProperty/${value}`).subscribe(
      this.http.get(this.api_url+`/getFilteredDataByDescription?property=${value}&ascending=${ascending}`).subscribe(
        (response) => 
          {
          this.apiData = response;
          // console.log(this.apiData);
          this.number_of_data_from_db = this.apiData.length
          },
          (error) => {
            console.error('Error:', error);
          }

        );
    
  }
}
