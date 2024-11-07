import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";


const initialState ={
    //cart items
    cart: localStorage.getItem("cart")? JSON.parse(localStorage.getItem("cart")) : [],
    //total price
    total:localStorage.getItem("total")? JSON.parse(localStorage.getItem("total")): 0 ,
    //total items
    totalItems: localStorage.getItem("totalItems")? JSON.parse(localStorage.getItem("totalItems")) : 0,
};

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        //add to cart 
        addToCart : (state,value)=>{
            const course = value.payload
            const index = state.cart.findIndex((item) => item._id === course._id);

            if(index>=0){
                 // If the course is already in the cart, do not modify the quantity
                toast.error("Course already in cart")
                return
            }

            // If the course is not in the cart, add it to the cart
            state.cart.push(course);
            // Update the total quantity and price
            state.totalItems++
            state.total += course.price
            // Update to localstorage
            localStorage.setItem("cart", JSON.stringify(state.cart))
            localStorage.setItem("total", JSON.stringify(state.total))
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
            // show toast
            toast.success("Course added to cart");
        },
        //remove from cart
        removeFromCart: (state,value)=>{
            const courseId = value.payload;
            const index = state.cart.findIndex((item) => item._id === courseId);

            if(index>=0){
                // If the course is found in the cart, remove it
                state.totalItems--
                state.total -= state.cart[index].price;
                state.cart.splice(index,1);
                // Update to localstorage
                localStorage.setItem("cart", JSON.stringify(state.cart))
                localStorage.setItem("total",JSON.stringify(state.total));
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
                // show toast
                toast.success("Course removed from cart")
            }
        },
        //reset cart
        resetCart:(state,value)=>{
            state.cart = [];
            state.total = 0
            state.totalItems = 0
            //update to local Storage
            localStorage.setItem("cart", JSON.stringify(state.cart))
            localStorage.setItem("total",JSON.stringify(state.total));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems))

            //show toast
            toast.success("Cart Reset")
        }
    }
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions
export default cartSlice.reducer;