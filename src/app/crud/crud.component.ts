import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FoodService } from '../services/food/food.service';
import { NotificationService } from '../services/notification.service';
import { CRUD } from './CRUD.model';

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
  constructor(private Fb: FormBuilder, private api: FoodService,private notify:NotificationService) {
    this.getAllFoodItems();
  }
  ngOnInit(): void {

  }

  switch() {
    this.Editmode = false;
  }
  getAllFoodItems() {
    this.Editmode = false;
    this.api.getFood().subscribe({
      next: (res: any) => {
        this.foodlist = res;
      },
    });
  }


    // this.notify.showSuccess("Data shown successfully !!", "ItSolutionStuff.com")
    // this.notify.showError("Data shown successfully !!", "ItSolutionStuff.com")
    // this.notify.showWarning("Data shown successfully !!", "ItSolutionStuff.com")
    // this.notify.showInfo("Data shown successfully !!", "ItSolutionStuff.com")

// Delete Record

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

  Edit(id: any) {
    

    // this.Crudobj.id = row.id;
    // this.form.controls['name'].setValue(row.name);
    // this.form.controls['imageUrl'].setValue(row.imageUrl);
    // this.form.controls['origins'].setValue(row.origins);
    // this.form.controls['stars'].setValue(row.stars);
    // this.form.controls['price'].setValue(row.price);
    // this.form.controls['tags'].setValue(row.tags);
    // this.form.controls['cookTime'].setValue(row.cookTime);
    // this.form.controls['favorite'].setValue(row.favorite);
    // this.Editmode = true;
    // console.log(this.Editmode);
  }

  UpdatefoodDetails() {
    this.Crudobj.name = this.form.value.name;
    this.Crudobj.imageUrl = this.form.value.imageUrl;
    this.Crudobj.origins = this.form.value.origins;
    this.Crudobj.stars = this.form.value.stars;
    this.Crudobj.price = this.form.value.price;
    this.Crudobj.tags = this.form.value.tags;
    this.Crudobj.cookTime = this.form.value.cookTime;
    this.Crudobj.favorite = this.form.value.favorite;
    this.api.Updatefood(this.Crudobj, this.Crudobj.id).subscribe((res) => {
      // alert('Record updated Sucessfully');
      this.getAllFoodItems();
      this.form.reset();
    });
  }
}
