import { Injectable } from '@angular/core';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/CartItem';
import { Food } from 'src/app/shared/models/Food';
import { NotificationService } from '../notification.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private notify:NotificationService){

  }
  private cart:Cart = new Cart();
  emptycart:Cart=new Cart();
  addToCart(food: Food):void{
    this.emptycart=this.cart
    let cartItem = this.cart.items.find(item => item.food.id === food.id);
    if(cartItem){
      this.changeQuantity(food.id, cartItem.quantity + 1);
      return;
    }
    this.cart.items.push(new CartItem(food));
    this.notify.showSuccess('Order added to cart','FoodMine')
  }

  removeFromCart(foodId:number): void{
    this.cart.items = 
    this.cart.items.filter(item => item.food.id != foodId);
    this.notify.showSuccess('Food Order removed','FoodMine')
  }
  placedFromCart(): void{
    for (let index = 0; index <= this.cart.items.length + 1 ; index++) {
      console.warn(index)
      this.cart.items.pop()
    }
  }
  
  changeQuantity(foodId:number, quantity:number){
    let cartItem = this.cart.items.find(item => item.food.id === foodId);
    if(!cartItem) return;
    cartItem.quantity = quantity;
  }
  
  getCart():Cart{
    return this.cart;
  }
  confirmOrder(Name:string){
    this.notify.showSuccess('Mr/Ms '+Name+' Your order has been placed, It will shortly dilivered to given address.','FoodMine')
  }
  invlaidForm(){
    this.notify.showError('Please Fill the Form','FoodMine')
  }
}