import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators  
} from '@angular/forms';
import { FoodService } from '../services/food/food.service';
import { NotificationService } from '../services/notification.service';
import { CRUD } from './CRUD.model';
import {AddFoodItemComponent } from '../add-food-item/add-food-item.component'

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
})
export class CrudComponent implements OnInit {
  form!: FormGroup;
  foodlist: any;
  Editmode: boolean = false;
  Crudobj: CRUD = new CRUD();
  constructor(private Fb: FormBuilder,
    private api: FoodService,
    private notify:NotificationService,
    private upd:AddFoodItemComponent
    ) {
    this.getAllFoodItems();
  }
  ngOnInit(): void {

  }

  getAllFoodItems() {
    this.Editmode = false;
    this.api.getFood().subscribe({
      next: (res: any) => {
        this.foodlist = res;
      },
    });
  }


  delete(id: number) {
    if(window.confirm('Are sure you want to delete this item ?')){
        this.api.deletefood(id).subscribe((data: any) => {
          this.notify.showSuccess("Data Deleted Successfully", "FoodMine")
          this.api.getFood().subscribe((res) => {
            this.foodlist = res;
          });
        });
        
      }
    }

   
    
}
