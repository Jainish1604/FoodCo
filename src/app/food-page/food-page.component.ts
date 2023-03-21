import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart/cart.service';
import { FoodService } from '../services/food/food.service';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css'],
})
export class FoodPageComponent implements OnInit {
  food!: any;
  id!: number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private api: FoodService,
    private cartService: CartService,
    private router: Router
    )
  {}

  ngOnInit(): void {
this.getmethod()    
  }

  // Getting id and bringing the record
  getmethod(){
    this.id = this.activatedRoute.snapshot.params['id'];
    this.api.getFoodbyID(this.id).subscribe({
      next: (res: any) => {
        this.food = res;
      },
    });
  } 
  //ADD THIS DATA TO CART
  addToCart(){
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }
}
