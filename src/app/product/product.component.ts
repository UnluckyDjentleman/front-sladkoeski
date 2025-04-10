import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Product } from '../constants/product';
import { environment } from '../../environments/environment';
import { Category } from '../constants/category';
import { Customer } from '../constants/customer';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms'
import { Router } from '@angular/router';


@Component({
  selector: 'app-product',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{

  products: Product[]=[];
  errorMessage!: string;
  categories: Category[]=[];
  customers: Customer[]=[];
  filters!:FormGroup;
  
  constructor(
    private httpClient: HttpClient,
    private router:Router
  ){
    this.filters=new FormGroup({
      "name": new FormControl(),
      "category_id": new FormControl(),
      "customer_id": new FormControl()
    });
  }

  ngOnInit(): void {
    this.fetchProducts();
    this.fetchCategories();
    this.fetchCustomers();

  }

  fetchProducts(){
    this.httpClient.get<Product[]>(`${environment.serverPath}/products`).subscribe(
      (products: Product[])=>{
        this.products=products
        console.log(this.products);
      },
      (error)=>this.errorMessage=error
    )
  }

  fetchCategories(){
    this.httpClient.get<Category[]>(`${environment.serverPath}/categories`).subscribe(
      (categories: Category[])=>{
        this.categories=categories
        console.log(this.categories);
      },
      (error)=>{
        this.errorMessage=error
      }
    )
  }

  fetchCustomers(){
    this.httpClient.get<Customer[]>(`${environment.serverPath}/customers`).subscribe(
      (customers: Customer[])=>{
        this.customers=customers
        console.log(this.customers);
      },
      (error)=>{
        this.errorMessage=error
      }
    )
  }

  onSubmitSearch(){
    const filterForm=this.filters.value;
    let params=new HttpParams();

    Object.entries(filterForm).forEach(([key, value])=>{
      if(value!==null){
        params=params.set(key, value!.toString())
      }
    })

    this.httpClient.get<Product[]>(`${environment.serverPath}/products`, {params}).subscribe(
      (products: Product[])=>{
        this.products=products
      },
      (error)=>this.errorMessage=error
    )
  }

  onNavigateToProduct(productId:string){
    this.router.navigate([`/product-details/${productId}`]);
  }
}


