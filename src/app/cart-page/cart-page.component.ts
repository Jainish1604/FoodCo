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
  cart!: Cart;
  date = new Date().toLocaleDateString();
  hidden=true
  Orderdetails?:{
    name:"ASDF",
    email:"ASDF",
    address:"ASDF",
    city:"ASDF",
    state:"ASDF",
    pincode:"ASDF"
  }
  OrderCart:Cart=new Cart();
  
  constructor(private cartService: CartService,) {
    this.setCart();
    this.OrderCart=this.cartService.OrderCart
  }
  ngOnInit(): void {
  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.food.id);
    this.setCart();
  }
  placedFromCart() {
    this.cartService.placedFromCart();

  }

  changeQuantity(cartItem: CartItem, quantityInString: string) {
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.food.id, quantity);
    this.setCart();
  }

  setCart() {
    this.cart = this.cartService.getCart();
    console.log(this.cart)
  }
  placeOrder(F: NgForm) {
    if(F.valid){
      
      this.Orderdetails=F.value
      this.hidden=false
      console.log(this.OrderCart)
      console.log(this.Orderdetails)
      
    }
  
    console.log(this.Orderdetails)
    if (F.value.name && F.value.email && F.value.address && F.value.city && F.value.state && F.value.pincode !== '') {
      this.cartService.confirmOrder(F.value.name)
      console.warn(this.cartService.OrderCart)
      this.placedFromCart()
      F.reset()
    } else {
      this.cartService.invlaidForm()
    }
  }
}
