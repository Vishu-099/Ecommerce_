import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  length: any;
  productsItems: any
  trendyProjects: any
  constructor(private products: ProductService) { }

  ngOnInit(): void {
    this.products.getProducts().subscribe((res: any) => {
      if (res) {

        //By this limit we can decrease products limit
        this.length = res.length
        this.productView()
        this.trendyProject()
      }
    })






  }

  productView() {

    this.products.productsView(3).subscribe((res) => {
      this.productsItems = res

    })
  }

  trendyProject() {
    this.products.productsView(this.length).subscribe((res) => {
      this.trendyProjects = res
    });
  }


}
