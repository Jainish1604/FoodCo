import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FoodService } from '../services/food/food.service';
import { NotificationService } from '../services/notification.service';
import { Food } from '../shared/models/Food';
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
  deleteConfirm :string =''

  Crudobj: CRUD = new CRUD();
  constructor(private Fb: FormBuilder, private api: FoodService,private notify:NotificationService) {
    this.getAllFoodItems();
  }
  ngOnInit(): void {
    this.form = this.Fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      imageUrl: ['', [Validators.required]],
      origins: ['', [Validators.required]],
      tags: ['', [Validators.required]],
      price: ['', [Validators.required]],
      cookTime: ['', [Validators.required]],
      stars: ['', [Validators.required]],
      favorite: ['', [Validators.required]],
    });
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

  addFood() {
    if (this.form.valid) {
      this.api.postFood(this.form.value).subscribe({
        next: (res) => {
          alert('Food item  Added Successfully');
          this.api.getFood().subscribe((res) => {
            this.foodlist = res;
          });
        },
        error() {
          alert('Error while Adding food item');
        },
      });
      this.form.reset();
      this.getAllFoodItems();
    } else {
      alert('Fill the form');
    }
  }


  successmsg(){
    this.notify.showSuccess("Data shown successfully !!", "ItSolutionStuff.com")}
// Delete Record

  delete(id: number) {
    if(this.deleteConfirm=='Yes'){
      this.api.deletefood(id).subscribe((data: any) => {
        this.successmsg()
        this.api.getFood().subscribe((res) => {
          this.foodlist = res;

        });
      });
    }
  }

  Edit(row: any) {
    this.Crudobj.id = row.id;
    this.form.controls['name'].setValue(row.name);
    this.form.controls['imageUrl'].setValue(row.imageUrl);
    this.form.controls['origins'].setValue(row.origins);
    this.form.controls['stars'].setValue(row.stars);
    this.form.controls['price'].setValue(row.price);
    this.form.controls['tags'].setValue(row.tags);
    this.form.controls['cookTime'].setValue(row.cookTime);
    this.form.controls['favorite'].setValue(row.favorite);
    this.Editmode = true;
    console.log(this.Editmode);
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
