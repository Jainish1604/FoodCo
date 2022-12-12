import { Component,Output,EventEmitter} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FoodService } from '../services/food/food.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { Food } from '../shared/models/Food';
import { first } from 'rxjs/operators';
import { CRUD } from '../crud/CRUD.model';

@Component({
  selector: 'app-add-food-item',
  templateUrl: './add-food-item.component.html',
  styleUrls: ['./add-food-item.component.css']
})
export class AddFoodItemComponent {
  id: any;


  foodlist!: any;
  AddFoodForm!: FormGroup;
  submitted = false;
  
  isAddMode!: boolean;
  EditMode = false;
  Crudobj: CRUD = new CRUD();
  
  constructor(private api:FoodService , private notify:NotificationService,private Fb:FormBuilder, private route: ActivatedRoute,
    private router: Router,){

      this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
      
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


    if (!this.isAddMode) {
      this.api.getById(this.id)
          .pipe(first())
          .subscribe(x => this.AddFoodForm.patchValue(x));
  }
}



onSubmit() {
  if (this.AddFoodForm.invalid) {
    return;
  }
  
  if (this.isAddMode) {
    this.createFood();
  }
  else {
    this.updateFood();
} 

}
private createFood() {
  this.api.postFood(this.AddFoodForm.value).pipe(first()).subscribe({
    next: (res) => {
      this.notify.showSuccess("Food item  Added Successfully", "FoodMine")
      this.api.getFood().subscribe((res) => {
        this.foodlist = res;
      });
    },
    error() {
      alert('Error while Adding food item');
    },
  });
  this.AddFoodForm.reset();

}
private updateFood() {
  this.Crudobj=this.AddFoodForm.value
  this.api.Updatefood(this.Crudobj,this.id).subscribe((res) => {
    this.notify.showSuccess("Food item  Updated Successfully", "FoodMine")
        this.AddFoodForm.reset();
        this.router.navigateByUrl('/Crud')

  });}
}  