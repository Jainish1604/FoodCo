import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FoodService } from '../services/food/food.service';
import { NotificationService } from '../services/notification.service';
import { CRUD } from './CRUD.model';
import { DialogComponent } from '../shared/dialog/dialog.component'
import { AddEditComponent } from '../shared/add-edit/add-edit.component';
import { DialogService } from '../shared/dialog.service';
import { Subscription, switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
})
export class CrudComponent implements OnInit {
  form!: FormGroup;
  subscription !: Subscription;
  foodlist: any;
  Tempid!:number
  Editmode: boolean = false;
  Crudobj: CRUD = new CRUD();
  EditFoodForm!: FormGroup;
  constructor(
    private api: FoodService,
    private notify: NotificationService,
    public modalService: NgbModal,
    public addeditcomp: AddEditComponent,
    public dialogservice: DialogService
  ) {
    this.getAllFoodItems()
  }

  openModal() {
      //ModalComponent is component name where modal is declare
    const modalRef = this.modalService.open(DialogComponent);
    modalRef.result.then((result) => {
      this.getAllFoodItems();
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }
  closeModal() {
    this.modalService.dismissAll();
    this.getAllFoodItems(); 
  }

  ngOnInit(): void {
    
    this.subscription = timer(0, 1000).pipe(
      switchMap(() => this.api.getFood())
    ).subscribe(result => {
      this.foodlist=result;
    } 
    );
    this.getAllFoodItems();}
//Refreshing the data 
  getAllFoodItems() {
    this.api.getFood().subscribe((res: any) => {
        this.foodlist = res;
    });
  }

  //deleting the data
  delete(id: number) {
    if (window.confirm('Are sure you want to delete this item ?')) {
      this.api.deletefood(id).subscribe((data: any) => {
        this.notify.showSuccess("Data Deleted Successfully", "FoodMine")
        this.api.getFood().subscribe((res) => {
         this.foodlist = res;
        });
      });

    }
  }

  //Pathing the value int the form
  edit(data: any) {
    this.openModal()
    this.api.getById(data).subscribe((x: any) => this.EditFoodForm.patchValue(data));
    this.dialogservice.Editid = data;
    console.log(data)
    this.api.getFood().subscribe((res) => {
      this.foodlist = res;
     });
  }
}