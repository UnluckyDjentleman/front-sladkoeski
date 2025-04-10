import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../constants/product';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{

   productId!:string;
   product!:Product;

  constructor(
    private route:ActivatedRoute,
    private httpClient: HttpClient,
  ){}

  ngOnInit():void{
    this.route.params.subscribe(params=>{
      this.productId=params['productId']
      this.fetchProductInfo(this.productId);
    })
  }

  fetchProductInfo(id: string){
    this.httpClient.get<Product>(`${environment.serverPath}/product/${id}`).subscribe(
      (product:Product)=>this.product=product,
      (error)=>console.log(error)   
    )
  }
}
