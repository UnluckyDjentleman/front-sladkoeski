export interface Order{
    id: string,
    quantity: number,
    orders:{
        user_id:string
    },
    products:{
        id: number,
        name: string,
        price: number,
        photo: string
    }
}