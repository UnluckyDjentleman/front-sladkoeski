export interface Product{
    id: string,
    name: string,
    description: string,
    price: string,
    photo: string,
    category:{
        name: string,
    },
    customer:{
        name: string
    }
}