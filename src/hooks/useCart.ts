import { useState, useEffect, useMemo, CanvasHTMLAttributes } from "react"
import { db } from "../data/db";
import type { CartItem, Guitar, GuitarID } from "../types";


export const useCart = () =>{
    // console.log("desde useCart");

    const initialCart = (): CartItem[] =>{
        const localStorageCart = localStorage.getItem('cart');
        return localStorageCart ? JSON.parse(localStorageCart) : [];
      }
  
      const [data] = useState(db);
      const [cart, setCart] = useState(initialCart);
  
      const MAX_ITEMS = 10;
  
      useEffect(() => {
        localStorage.setItem('cart',JSON.stringify(cart));
      }, [cart])
      
  
      function addToCart(item: Guitar){
         const itemExist = cart.findIndex( (guitar)=> guitar.id === item.id );
        if(itemExist >= 0) { //Existe en el carrito
          if(cart[itemExist].quantity >= MAX_ITEMS) return;
          console.log("Ya existe en el carrito");
          const updateCart = [...cart];
          updateCart[itemExist].quantity++;
          setCart(updateCart);
        }else{
          console.log("Agregando");
          const newItem : CartItem = {...item, quantity: 1};
          // item.quantity = 1;
          //setCart( (prevCart) => [...prevCart, item]);
          setCart([...cart, newItem]); //code mas corto
          // setCart([...cart, item]);
        }
        
        
        // saveLocalStorage(); 
      }
      
      function removeFromCart(id: GuitarID){
        // console.log("Eliminando articulo....",id);
        setCart( prevCart => prevCart.filter( guitar => guitar.id !== id ) )
      }
      function increaseQuantity(id: GuitarID) {
        // console.log("incrementando articulo",id);}
        const updateCart = cart.map( item => { 
          if(item.id === id && item.quantity < MAX_ITEMS){
            return{
              ...item,
              quantity: item.quantity + 1
            }
          }
          return item;
        })
        setCart(updateCart);
      }
  
      function decrementQuantity(id: GuitarID){
        const updateCart = cart.map( item => {
          if(item.id === id && item.quantity > 1){
            return{
              ...item,
              quantity: item.quantity - 1
            }
          }
          return item;
        })
        setCart(updateCart);
      }
  
      function clearCart(){
        setCart([]);
  
      }

    const isEmpty = useMemo( () => cart.length === 0 , [cart]);
    const cartTotal =useMemo(() => cart.reduce( (total,item) => total + (item.quantity * item.price), 0 ),[cart]); 

    return {
        data, 
        cart, 
        addToCart, 
        removeFromCart, 
        decrementQuantity, 
        increaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }
}