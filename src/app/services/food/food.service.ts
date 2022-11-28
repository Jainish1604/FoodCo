import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})


export class FoodService {


url="http://localhost:5000/FoodItem"
  getAllTags: any;


  constructor(private http:HttpClient) {
  }
  getFood(){
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
 










  // getFoodById(id: number): Food{
  //   return this.getAll().find(food => food.id == id)!;
  // }
  
  // getAllFoodsBySearchTerm(searchTerm:string) :Food[]{
  //   return  this.getAll().filter(food =>
  //     food.name.toLowerCase().includes(searchTerm.toLowerCase()));
  // }
  // getAllTags(): Tag[] {
  //   return [
  //     { name: 'All', count: 11 },
  //     { name: 'FastFood', count: 4 },
  //     { name: 'Pizza', count: 2 },
  //     { name: 'Lunch', count: 7 },
  //     { name: 'SlowFood', count: 1 },
  //     { name: 'Ramen', count: 3 },
  //     { name: 'Fry', count: 1 },
  //     { name: 'Soup', count: 1 },
  //   ];
  // }

  // getAllFoodsByTag(tag: string): Food[] {
  //   return tag == "All"?
  //     this.getAll() : this.getAll().filter(food => food.tags?.includes(tag));
  // }

  // getAll(): Food[] {
  //   return [
      
  //   ];
}

