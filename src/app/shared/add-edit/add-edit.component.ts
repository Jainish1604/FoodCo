import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs';
import { CrudComponent } from 'src/app/crud/crud.component';
import { FoodService } from 'src/app/services/food/food.service';
import { NotificationService } from 'src/app/services/notification.service';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css'],
})
export class AddEditComponent {
  id: any;
  tempvalue: any;
  AddFoodForm!: FormGroup;
  submitted = false;
  isAddMode!: boolean;
  EditMode!: boolean;
  Crudobj: any;
  reload:any
  foodlist: any;

  constructor(
    private api: FoodService,
    private notify: NotificationService,
    private Fb: FormBuilder,
    private dialog: DialogService,
    public modalService: NgbModal,
    private router: Router,) {
    }


  ngOnInit(): void {
    this.AddFoodForm = this.Fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      imageUrl: ['', [Validators.required]],
      origins: ['', [Validators.required]],
      tags: ['', [Validators.required]],
      price: ['', [Validators.required]],
      cookTime: ['', [Validators.required]],
      stars: ['', [Validators.required]],
      favorite: ['', [Validators.required]],
    });
    this.id = this.dialog.Editid;
    this.isAddMode = !this.id;
    
      this.AddFoodForm.patchValue({
        id:this.dialog.Editid.id,
        name:this.dialog.Editid.name,
        origins:this.dialog.Editid.origins,
        cookTime:this.dialog.Editid.cookTime,
        price:this.dialog.Editid.price,
        imageUrl:this.dialog.Editid.imageUrl,
        stars:this.dialog.Editid.stars,
        favorite:this.dialog.Editid.favorite,
        tags:this.dialog.Editid.tags,
      })
}

getAllFoodItems() {
  this.api.getFood().subscribe((res: any) => {
      this.foodlist = res;
  });
}

OnSubmit()
{
  if(this.isAddMode)
  {
    this.createFood();
  }
  else
  {
    this.updateFood();
  }
}
   createFood() {
    this.api
      .postFood(this.AddFoodForm.value)
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          this.notify.showSuccess('Food item  Added Successfully', 'FoodMine');
          this.getAllFoodItems();
        },
        error() {
          alert('Error while Adding food item');
        },
      });
    this.close();
    this.router.navigateByUrl('Crud');
    
    this.AddFoodForm.reset();
  }
  updateFood() {
    this.api.Updatefood(this.dialog.Editid.id,this.AddFoodForm.value).subscribe((result:any) => {
      this.notify.showSuccess('Food item  Updated Successfully', 'FoodMine');
      this.getAllFoodItems();
      console.log('reload');
      this.AddFoodForm.reset();
    });
    this.close();
    this.router.navigateByUrl('Crud');
  
}
  close() {
    this.modalService.dismissAll();
    this.dialog.Editid = this.tempvalue;}
}