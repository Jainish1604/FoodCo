
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../services/food/food.service';
import { Food } from '../shared/models/Food';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchresult:undefined|Food[]
  searchTerm: string = "";
  constructor(private route: ActivatedRoute, private router:Router,private api:FoodService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['searchTerm'])
        this.searchTerm = params['searchTerm'];
    })
  }
  search():void{
    if(this.searchTerm)
    this.router.navigateByUrl('/search/' + this.searchTerm);
    this.api.searchitem(this.searchTerm).subscribe((res:any)=>{
      this.searchresult=res;
      console.log(this.searchresult)
    })
    
  }

}