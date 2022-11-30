import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tag } from 'src/app/shared/models/Tag';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class FoodService {
url=environment.apiURL

  constructor(private http:HttpClient) {
  }
  getFood(){
    // console.log(this.http.get(this.url))
    return this.http.get(this.url);
  }
  postFood(data:any){
    return this.http.post(this.url,data);
  }
  deletefood(id: number) {
    return this.http.delete(this.url+'/'+id)
  }
  Updatefood(data:any,id: number) {
    return this.http.put<any>(this.url+'/'+id,data)
  }
  getFoodbyID(id:number){
    return this.http.get(this.url+'/'+id)
  }
  searchitem(item:string){
    return this.http.get(`http://localhost:5000/FoodItem?q=${item}`)
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