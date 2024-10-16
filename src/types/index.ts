export type  Guitar = {
    id: number
    name: string
    image: string
    description: string
    price: number
}
//type
export type  CartItem = Guitar & {

    quantity: number
}

// export type GuitarID = Pick<Guitar, 'id'>

// Lookup type
export type GuitarID = Guitar["id"]


//ginterface

// export interface  CartItem extends Guitar  {
//     quantity: number
// }


// //Utility types
// export type CardItem = Pick<Guitar, "id" | "name" | "price"> &{
//     quantity:number
// }

