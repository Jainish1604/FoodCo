import { Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { Food } from '../shared/models/Food';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  foods: any;

  constructor(private api: FoodService, private route: ActivatedRoute) {
    this.api.getFood().subscribe((res:any)=>{
      this.foods=res
      // console.log(this.foods)
    });
   }

   ngOnInit(): void {
   
  }

}
