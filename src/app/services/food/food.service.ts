import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tag } from 'src/app/shared/models/Tag';
import { environment } from 'src/environments/environment';
import { Food } from 'src/app/shared/models/Food';

@Injectable({
  providedIn: 'root',
})

export class FoodService {
url=environment.apiURL

  constructor(private http:HttpClient) {
  }
  getFood(){
    return this.http.get(this.url);
  }
  getById(data: any) {
    return this.http.get(this.url+'/'+data.id);
  }
  postFood(data:any){
    return this.http.post(this.url,data);
  }
  deletefood(id: any) {
    return this.http.delete(this.url+'/'+id)
  }
  Updatefood(id:number ,data : any) {
    return this.http.put(this.url+'/'+id,data);
  }
  getFoodbyID(id:number){
    return this.http.get(this.url+'/'+id)
  }
  searchitem( item:string){
    return this.http.get(`${this.url}?q=${item}`)
  }
  getAllTags(): Tag[] {
    return [
      { name: 'All', count: 8 },
      { name: 'FastFood', count: 2 },
      { name: 'Pizza', count: 3 },
      { name: 'Lunch', count: 1 },
      { name: 'Fried', count: 1 },
      { name: 'Soup', count: 1 },
    ]; 
  }
}