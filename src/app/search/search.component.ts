import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  query : any
  searchResult:any
  constructor(private product:ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.query = this.route.snapshot.paramMap.get('query')
    this.product.searchProducts(this.query).subscribe((result)=>{
      this.searchResult = result
    })

  }

}
