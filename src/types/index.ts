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

//ginterface

// export interface  CartItem extends Guitar  {
//     quantity: number
// }


