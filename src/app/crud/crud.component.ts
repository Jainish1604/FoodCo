import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl ,FormGroup} from '@angular/forms';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
form!:FormGroup
  constructor(private Fb:FormBuilder) { 

  }

  ngOnInit(): void {
    this.form=this.Fb.group({
      name:[''],
      origin:[''],
      tags:[''],
      cooktime:[''],
      rating:[''],
      favorite:[''],
    })

  }

}
