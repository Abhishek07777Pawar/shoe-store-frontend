import React,{useMemo, useState} from 'react'
import Image from 'next/image'
import Wrapper from '@/Components/Wrapper'
import Link from 'next/link'
import CartItem from '@/Components/CartItem'
import {useSelector } from 'react-redux'
import { makePaymentRequest } from '@/utils/api'
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
const Cart = () => {
    const[loading,setLoading]=useState(false)
    const {cartItems}= useSelector((state => state.cart))

    const subtotal =useMemo(()=>{
        return cartItems.reduce((total,val)=>total + val.attributes.price,0)
    },[cartItems])

const handlePayment =async ()=>{
    try{
        setLoading(true)
        const stripe =await stripePromise;
        const res=await makePaymentRequest("/api/orders",{
            products:cartItems
        })
      await stripe.redirectToCheckout({
        sessionId:res.stripeSession.id
      })

    }catch(error){
        setLoading(false)
        console.log(error)
    }

}

  return (
    <div className='w-full md:py-20'>
        <Wrapper>
            {cartItems.length>0 &&(
<>
{/* Heading & paragraph Start */}
<div className='text-center max-w-[800px] mx-auto mt-8 md:mt-0'>
   <div className='text-[28px] md:text-[34px]mb-5 font-semibold leading-tight '>Shopping Cart</div>
</div>
{/* Heading & paragraph End */}
<div className='flex flex-col lg:flex-row gap-12 py-10'>
   {/* CART ITEM Start */}
   <div className='flex-[2]'>
       <div className='text-lg font-bold'>
        Cart items
        </div>
        {cartItems.map((item)=>(
            <CartItem key={item.id} data={item}/>
        ))}
       
       
   </div>
   {/* CART ITEM END */}

   {/* SUMMARY Start */}
   <div className='flex-[1]'>
   <div className='text-lg font-bold'>Summary</div>

   <div className='p-5 my-5 bg-black/[0.05] rounded-xl'>
       <div className='flex justify-between'>

           <div className='uppercase text-md md:text-lg
            font-medium text-black'>
            Subtotal
             </div>
           <div className='text-md md:text-lg font-medium text-black'> 
           &#8377;{subtotal} 
           </div>
       </div>

       <div className='text-sm md:text-md py-5 border-t mt-5'>
           The subtotal reflects the total price of your order,including duties and taxes,before any applicable discounts.It does not include delievery cost and international transaction fees.
       </div>
   </div>
   {/* Button start */}
   <button className='w-full py-4 rounded-full bg-black text-white text-lg
   font-medium transition-transform active :scale-95 mb-3 hover:opacity-75 flex items-center justify-center gap-2' onClick={handlePayment}>
    Checkout
    {loading && <img src="/spinner.svg"/>}
   </button>
              

   </div>
   {/* SUMMARY END */}
  </div>
   
     </>
      )}
           
           
                
            {/* This is Empty screen */}
            {/* Cart Content startCart Content End */}
        {cartItems.length< 1 && <div className='flex-[2] flex flex-col items-center pb-[50px] md:-mt-14'>
            <Image src="/empty-cart.jpg" width={300} height={300} className='w-[300px] md:w-[400px]'/>
            <span className='text-xl font-bold'>Your cart is empty</span>
            <span className='text-center mt-4'>Looks like you have not added anything in your cart.<br/>Go ahead and explore top categories</span>
            <Link
            href="/"
            className='py-4 px-8 rounded-full bg-black text-white text-lg font-medium
            transition-transform actice:scale-95 mb-3 hover:opacity-75 mt-8'
            > Continue Shopping</Link>
        </div>}
        </Wrapper>
    </div>
  )
}

export default Cart