import { Component, OnInit } from '@angular/core';
import * as data_from_json from '../../assets/static_json/example.json';
import { environment } from '../../environments/environment';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
@Component({
  selector: 'app-add-new-item',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CommonModule],

template: `
<div>
   <button (click)="block_screen()" type="button" class="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
               <svg aria-hidden="true" class="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
               Edit
   </button>  
   <div *ngIf="blocked_state" class="fixed inset-0 z-50 bg-black bg-opacity-80  ">
         
               <!-- Main modal -->
               <div id="readProductModal" tabindex="-1" aria-hidden="true" class="flex  justify-center w-screen  h-screen   overflow-y-scroll">

               <section >
              
               
               <div class="flex justify-between p-20">
                     <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white text-center">Add new product</h2>
                     <button (click)="block_screen()" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="readProductModal">
                     <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                     <span class="sr-only">Close modal</span>
                     </button>  
               </div>








               <form [formGroup]="myForm"  (ngSubmit)="onSubmit()" action="#">
                   <div class="w-screen p-10">

                         <div  class="p-4  mb-5  border-b  border-gray-50 rounded-xl">
                           <h3 class="mt-5  text-xl font-bold text-gray-900 dark:text-white bg-gray-800 p-4 text-center">Main parameters</h3>
                               <div class="grid gap-4 mb-4 sm:grid-cols-5">                              
                                   <div *ngFor="let parameter of main" class="w-full p-4">
                                   <label for="{{parameter}}" class="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white">{{parameter}}</label>
                                   <input formControlName="{{parameter}}"   type="text" name="{{parameter}}"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" [placeholder]="'Type '+parameter" required="">
                                   </div>
                               </div>
                         </div>                         

                        
                          <!-- <div formGroupName="params" class="p-4 mb-5 border-b border-1 border-gray-50 rounded-xl">
                             <h3 class="mt-5  text-xl font-bold text-gray-900 dark:text-white bg-gray-800 p-4 text-center">Side parameters</h3>
                             <div class="grid gap-4 mb-4 sm:grid-cols-5">
                                 <div class="w-full">
                                   <label for="{{data_from_parent.params[0].key}}" class="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{data_from_parent.params[0].key}}</label>
                                   <input formControlName="{{data_from_parent.params[0].key}}" [(ngModel)]="data_from_parent.params[0].value.value" type="text" name="{{data_from_parent.params[0].key}}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  [placeholder]="'Type '+data_from_parent.params[0].key" required="">
                                 </div>
                                 <div *ngFor="let parameter of data_from_parent.params" class="w-full">
                                   <label *ngIf="parameter.key != 'price'" for="{{parameter.key}}" class="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{parameter.key}}</label>
                                   <input *ngIf="parameter.key != 'price'" formControlName="{{parameter.key}}" [(ngModel)]="parameter.value.key" type="text" name="{{parameter.key}}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  [placeholder]="'Type '+parameter" required="">
                                 </div>
                             </div>
                         </div> -->

                        

                         <div formGroupName="user" class="p-4 mb-5  border-b border-1 border-gray-50 rounded-xl">
                             <h3 class="mt-5  text-xl font-bold text-gray-900 dark:text-white bg-gray-800 p-4 text-center">User </h3>
                             <div class="grid gap-4 mb-4 sm:grid-cols-5">   
                                 <div *ngFor="let parameter of user" class="w-full">
                                 <label for="{{parameter}}" class="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{parameter}}</label>
                                 <input  formControlName="{{parameter}}" type="text" name="{{parameter}}"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  [placeholder]="'Type '+parameter" required="">
                                 </div>
                             </div>
                         </div>
                         
                       <div formGroupName="contact" class="p-4 mb-5  border-b border-1 border-gray-50 rounded-xl">
                             <h3 class="mt-5  text-xl font-bold text-gray-900 dark:text-white bg-gray-800 p-4 text-center">Contact </h3>
                             <div class="grid gap-4 mb-4 sm:grid-cols-5">   
                                 <div *ngFor="let parameter of contact" class="w-full">
                                 <label for="{{parameter}}" class="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{parameter}}</label>
                                 <input formControlName="{{parameter}}"  type="text" name="{{parameter}}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  [placeholder]="'Type '+parameter" required="">
                                 </div>
                             </div>
                         </div>

                          <div formGroupName="map" class="p-4 mb-5  border-b border-1 border-gray-50 rounded-xl">
                             <h3 class="mt-5  text-xl font-bold text-gray-900 dark:text-white bg-gray-800 p-4 text-center">Map</h3>
                             <div class="grid gap-4 mb-4 sm:grid-cols-5">   
                                 <div *ngFor="let parameter of map" class="w-full">
                                 <label for="{{parameter}}" class="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{parameter}}</label>
                                 <input formControlName="{{parameter}}"  type="text" name="{{parameter}}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  [placeholder]="'Type '+parameter" required="">
                                 </div>
                             </div>
                         </div>

                        <div formGroupName="category" class="p-4 mb-5  border-b border-1 border-gray-50 rounded-xl">
                             <h3 class="mt-5  text-xl font-bold text-gray-900 dark:text-white bg-gray-800 p-4 text-center">Category</h3>
                             <div class="grid gap-4 mb-4 sm:grid-cols-5">   
                                 <div *ngFor="let parameter of category" class="w-full">
                                 <label for="{{parameter}}" class="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{parameter}}</label>
                                 <input formControlName="{{parameter}}" type="text" name="{{parameter}}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  [placeholder]="'Type '+parameter" required="">
                                 </div>
                             </div>
                         </div>

                         <div formGroupName="location" class="p-4 mb-5  border-b border-1 border-gray-50 rounded-xl">
                             <h3 class="mt-5  text-xl font-bold text-gray-900 dark:text-white bg-gray-800 p-4 text-center">City</h3>
                             <div class="grid gap-4 mb-4 sm:grid-cols-5">   
                                 <div  formGroupName="city" *ngFor="let parameter of city_and_region_params" class="w-full">
                                 <label for="{{parameter}}" class="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{parameter}}</label>
                                 <input formControlName="{{parameter}}" type="text" name="{{parameter}}"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  [placeholder]="'Type '+parameter" required="">
                                 </div>
                             </div>
                         </div>

                           <div formGroupName="location" class="p-4 mb-5  border-b border-1 border-gray-50 rounded-xl">
                             <h3 class="mt-5  text-xl font-bold text-gray-900 dark:text-white bg-gray-800 p-4 text-center">Region</h3>
                             <div class="grid gap-4 mb-4 sm:grid-cols-5">   
                                 <div formGroupName="region" *ngFor="let parameter of city_and_region_params" class="w-full">
                                 <label for="{{parameter}}" class="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{parameter}}</label>
                                 <input formControlName="{{parameter}}"  type="text" name="{{parameter}}"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  [placeholder]="'Type '+parameter" required="">
                                 </div>
                             </div>
                         </div> 

                         
                       

                         <!-- <div>
                         <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                         <select id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                         <option selected="">Electronics</option>
                         <option value="TV">TV/Monitors</option>
                         <option value="PC">PC</option>
                         <option value="GA">Gaming/Console</option>
                         <option value="PH">Phones</option>
                         </select>
                         </div> -->

                         <!-- <div>
                         <label for="item-weight" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Weight (kg)</label>
                         <input type="number" name="item-weight" id="item-weight" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value="15" placeholder="Ex. 12" required="">
                         </div>  -->

                         <div class="sm:col-span-2">
                         <label for="description" class="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                         <textarea formControlName="description" id="description" rows="8" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Write a product description here...">{{data_from_parent.description}}</textarea>
                         </div>
                   </div>
               
                   <div class="flex items-center justify-center space-x-4 p-4">
                       <button type="submit" class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                         Add new product
                       </button>
                       <!-- <button type="button" class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                         <svg class="w-5 h-5 mr-1 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                         Delete
                       </button> -->
                   </div>
               </form>
               
               </section>
               </div>                       
         
   </div>
 </div>
        
 `,
 styles: ``
})
export class AddNewItemComponent implements OnInit{
 api_url = environment.apiUrl
 blocked_state: boolean = true;

 data_from_parent: any = data_from_json;
 
 block_screen(): void {
   this.blocked_state = this.blocked_state ? false : true;
 }

 myForm!: FormGroup;
 constructor(private fb: FormBuilder, private http: HttpClient){}

 sendData(data: any) {
   return this.http.post<any>(this.api_url+'/insertNewItem', data);
 }

 sendDataToApi(): void {
  
   if (this.myForm.value) 
     {
       const data = this.myForm.value; //data to send
       console.log("data: ",data);
       this.sendData(data).subscribe(response => {
         console.log('Response from API:', response);
       }, error => {
         console.error('Error sending data:', error);
       });
     }
   
 }
 
 ngOnInit(): void {
   this.myForm = this.createFormGroup(this.data_from_parent);
   console.log(".myForm2.value",this.myForm.value);
 }

 
 main = [ 'title','url','last_refresh_time','valid_to_time','pushup_time','business','status','partner','offer_type']
 params = [ 'state','derailleurtype','braketype','wheelsize','framesize']
 user = ['id','created','other_ads_enabled','name','last_seen','seller_type','photo','logo']
 contact = ['name','phone','chat','negotiation','courier']
 map = ['zoom','lat','lon','radius','show_detailed']
 category =['id','type']
 city_and_region_params = ['id','name','normalized_name']

   

 // onSubmit(){}

 onSubmit() {
   // console.log(this.myForm.value);
   console.log("222222222 this.myForm2.value",this.myForm.value);
   if ( confirm("Are you sure you want to add new item : "+this.myForm.value.title) == true) 
     {
   this.sendDataToApi();
   this.block_screen();
     }
   // tutaj możesz wysłać dane do serwera lub wykonać inne operacje
 }



 myForm2!: FormGroup;
 createFormGroup(data: any): FormGroup {
   const formGroup: { [key: string]: any } = {};
   for (const key of Object.keys(data)) {
     if (Array.isArray(data[key])) {
       formGroup[key] = this.createFormArray(data[key]);
     } else if (typeof data[key] === 'object' && data[key] !== null) {
       formGroup[key] = this.createFormGroup(data[key]);
     } else {
       formGroup[key] = new FormControl(data[key]);
     }
   }
   return new FormGroup(formGroup);
 }

 createFormArray(data: any[]): FormArray {
   const formArray = data.map(item => {
     if (typeof item === 'object' && item !== null) {
       return this.createFormGroup(item);
     } else {
       return new FormControl(item);
     }
   });
   return new FormArray(formArray);
 }

 getFormKeys(formGroup: FormGroup): string[] {
   return Object.keys(formGroup.controls);
 }
 
}