import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CartService } from '../services/cart/cart.service';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/CartItem';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cart!:Cart;
  constructor(private cartService: CartService ) { 
    this.setCart();
  }
  ngOnInit(): void {
  }

  removeFromCart(cartItem:CartItem){
    this.cartService.removeFromCart(cartItem.food.id);
    this.setCart();
  }
  placedFromCart(){
    this.cartService.placedFromCart();
    this.setCart();
  }

  changeQuantity(cartItem:CartItem, quantityInString:string){
    const quantity= parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.food.id, quantity);
    this.setCart();
  }

  setCart(){
    this.cart = this.cartService.getCart();
  }
  placeOrder(F:NgForm){
    if(F.value.name && F.value.email && F.value.address !== ''){
      this.cartService.confirmOrder(F.value.name)
      F.reset()
    }else{
      this.cartService.invlaidForm()
      // console.warn(F.value.name, F.value.email , F.value.address )
    }
  
  }

}
