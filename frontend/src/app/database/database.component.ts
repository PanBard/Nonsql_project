import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { EditFormComponent } from '../edit-form/edit-form.component';
import { SuccessMessageComponent } from '../success-message/success-message.component';

@Component({
  selector: 'app-database',
  standalone: true,
  imports: [NgFor, CommonModule,EditFormComponent,SuccessMessageComponent, NgIf],
  template: `
<section class="bg-white dark:bg-gray-900 flex justify-center items-center flex-col p-10">

<h2 class="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">{{data_from_api ? "DB content: "+ data_from_api.length  +" items" : "DB content: 0 items"}}</h2>
<!-- <h3  class="mb-4 text-4xl tracking-tight  text-gray-900 dark:text-white">ID : Name : Password</h3>
<h3 *ngFor="let data of data_from_api" class="mb-4 text-4xl tracking-tight  text-gray-900 dark:text-white">{{data.id}} : {{data.name}} : {{data.password}}</h3> -->

<app-success-message [data_from_parent]="data_to_child"/>



<div *ngIf="show_table" class="relative overflow-x-auto shadow-md sm:rounded-lg">

<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
            <th scope="col" class="px-6 py-3">
                Lp
            </th>
            <th scope="col" class="px-6 py-3">
                Id
            </th>
            <th scope="col" class="px-6 py-3">
                Name
            </th>
            <th scope="col" class="px-6 py-3">
                Status
            </th>

            <th scope="col" class="px-6 py-3">
                User
            </th>
            <th scope="col" class="px-6 py-3">
                Img
            </th>

            <th scope="col" class="px-6 py-3">
                Created Time
            </th>

            <th scope="col" class="px-6 py-3">
                Valid to time
            </th>
           
            <th scope="col" class="px-6 py-3">
                <span class="sr-only">Remove</span>
            </th>
            <th scope="col" class="px-6 py-3">
                <span class="sr-only">Edit</span>
            </th>
        </tr>
    </thead>
    <tbody>
        <tr *ngFor="let data of data_from_api; let i = index" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            
            <th scope="row" class="px-6 py-4" >
            {{i + 1}}
            </th >
            
            <th scope="row" class="px-6 py-4" >
            {{data.id}}
            </th >
            
            <td  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
              <p class="truncate w-56">
                  {{data.title}}
              </p>          
            </td>
            
            <td class="px-6 py-4">
            {{data.status}}
            </td>

            
         



            <td class="px-6 py-4">
              <p class="truncate w-10">
                {{data.contact.name}}
              </p>          
            </td>

            <td class="px-6 py-4">
              <img class=" w-14 h-14  " src="{{data.photos[0].link.split(';')[0]}}" alt="">

            </td>

            <td class="px-6 py-4">
              <p class="truncate w-24">
                {{data.created_time}}
              </p>
          
            </td>

            <td class="px-6 py-4">
              <p class="truncate w-24">
                {{data.valid_to_time}}
              </p>
          
            </td>

            <td class="px-6 py-4">
                <button (click)="deleteDataFromDB(data._id)" class="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
            </td>
         
            <td class="px-6 py-4 text-right">
                <!-- <button  class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button> -->
                <app-edit-form [data_from_parent]="data"/>
            </td>
        </tr>
     
    </tbody>
</table>
</div>
<!-- <button class="bg-slate-400 dark:text-white "  (click)="sendDataToApi()">Send Data</button> -->


</section>
  `,
  styles: ``
})
export class DatabaseComponent {
  reloadChild() {
    this.loadData();
  }

  api_url = environment.apiUrl

  constructor(private http: HttpClient) { 
    this.loadData();
  }
  data_from_api: any;
  show_table: boolean = false;

  fetchData(): Observable<any> {
    return this.http.get<any>(this.api_url + '/allData');
  }

  sendData(data: any) {
    return this.http.post(this.api_url+'/add', data);
  }

  deleteData(_id: number) {
    return this.http.delete(this.api_url+`/deleteOne/${_id}`);
  }
  
  loadData(): void {
    this.fetchData().subscribe(response => {
      if(response.length == undefined)
        {
         this.show_table = false;
         this.data_from_api = 0;
        }
        else
        {
          this.show_table = true;
          this.data_from_api = response;
        }
      
      
      
    });
  }

  sendDataToApi(): void {
    const data = { Name: "jacek", Password: "elo" }; // Dane do wysłania

    this.sendData(data).subscribe(response => {
      console.log('Response from API:', response);
      this.loadData();
    }, error => {
      console.error('Error sending data:', error);
    });
  }

  deleteDataFromDB(id: number): void {

    if ( confirm("Are you sure you want to delete item of _id : "+id) == true) 
    {
      console.log(id);
    this.deleteData(id).subscribe(response => {
      console.log('Response from API:', response);
      this.data_to_child = response;
      this.loadData();
    }, error => {
      console.error('Error deleting data:', error);
    });
    }
    
  }

  data_to_child: any;

  main_params = ['id', 'url','title','last_refresh_time','created_time','valid_to_time','pushup_time','omnibus_pushup_time','business','status','partner','offer_type']




}
