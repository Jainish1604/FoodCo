import { Injectable } from '@angular/core';
import { Food } from '../../shared/models/Food';
import { Tag } from '../../shared/models/Tag';
@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor() { }

  getFoodById(id: number): Food{
    return this.getAll().find(food => food.id == id)!;
  }
  
  getAllFoodsBySearchTerm(searchTerm:string) :Food[]{
    return  this.getAll().filter(food =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  getAllTags(): Tag[] {
    return [
      { name: 'All', count: 11 },
      { name: 'FastFood', count: 4 },
      { name: 'Pizza', count: 2 },
      { name: 'Lunch', count: 7 },
      { name: 'SlowFood', count: 1 },
      { name: 'Ramen', count: 3 },
      { name: 'Fry', count: 1 },
      { name: 'Soup', count: 1 },
    ];
  }

  getAllFoodsByTag(tag: string): Food[] {
    return tag == "All"?
      this.getAll() : this.getAll().filter(food => food.tags?.includes(tag));
  }

  getAll(): Food[] {
    return [
      {
        id: 1,
        name: 'Pizza Pepperoni',
        cookTime: '10-20',
        price: 10,
        favorite: false,
        origins: ['Italy'],
        stars: 4.5,
        imageUrl: '/assets/pizza3.jpg',
        tags: ['FastFood', 'Pizza', 'Lunch'],
      },
      {
        id: 2,
        name: 'Square Pizza',
        price: 20,
        cookTime: '20-30',
        favorite: true,
        origins: ['Sersia', 'Middle east', 'China'],
        stars: 4.7,
        imageUrl: '/assets/pizza1.jpg',
        tags: ['Pizza', 'Lunch'],
      },
      {
        id: 3,
        name: 'Ramen',
        price: 5,
        cookTime: '10-15',
        favorite: false,
        origins: ['Germany', 'US'],
        stars: 3.5,
        imageUrl: '/assets/ramen1.jpg',
        tags: ['FastFood', 'Ramen'],
      },
      {
        id: 4,
        name: 'Rajma Chaval',
        price: 8,
        cookTime: '15-20',
        favorite: true,
        origins: ['India'],
        stars: 3.3,
        imageUrl: '/assets/rajma.jpg',
        tags: ['FastFood', 'Fry','Lunch'],
      },
      {
        id: 5,
        name: 'PanCakes',
        price: 11,
        cookTime: '40-50',
        favorite: true,
        origins: ['India', 'Asia'],
        stars: 3.0,
        imageUrl: '/assets/pancake.jpg',
        tags: ['SlowFood','Lunch'],
      },
      {
        id: 6,
        name: 'Miso Ramen',
        price: 9,
        cookTime: '40-50',
        favorite: true,
        origins: ['Japan'],
        stars: 4.0,
        imageUrl: '/assets/ramen3.jpg',
        tags: ['FastFood', 'Ramen', 'Lunch'],
      },
      {
        id: 7,
        name: 'Fruit Salad',
        price: 9,
        cookTime: '40-50',
        favorite: false,
        origins: ['Spain'],
        stars: 2.8,
        imageUrl: '/assets/salad1.jpg',
        tags: ['Healthy', 'Salad'],
      },
      {
        id: 8,
        name: 'Mixed Salad',
        price: 12,
        cookTime: '40-50',
        favorite: false,
        origins: ['Spain'],
        stars: 3,
        imageUrl: '/assets/salad2.jpg',
        tags: ['Healthy', 'Salad'],
      },
      {
        id: 9,
        name: 'Vegitable Salad',
        price: 10,
        cookTime: '40-50',
        favorite: false,
        origins: ['Spain'],
        stars: 3.0,
        imageUrl: '/assets/salad3.jpg',
        tags: ['Healthy', 'Salad'],
      },
      
      {
        id: 10,
        name: 'Tomato Soup',
        price: 4,
        cookTime: '10-20',
        favorite: true,
        origins: ['India','UK'],
        stars: 4.5,
        imageUrl: '/assets/soup1.jpg',
        tags: [ 'Soup', 'Lunch'],
      },
      {
        id: 11,
        name: 'Naruto Ramen ',
        price: 10,
        cookTime: '40-50',
        favorite: false,
        origins: ['Indonasia','Japan'],
        stars: 4.0,
        imageUrl: '/assets/ramen2.jpg',
        tags: [ 'Ramen', 'Lunch'],
      },
    ];
  }
}
