import HeroBanner from "@/Components/HeroBanner"
import Wrapper from "@/Components/Wrapper"
import ProductCard from "@/Components/ProductCard"
import {fetchDataFromApi} from "@/utils/api"; 
import { useEffect, useState } from "react"
export default function Home({products}) {
  // const [data, setData]=useState(null)
  // useEffect( ()=>{
  //   fetchProducts()
  // },[])
  // const fetchProducts = async()=>{
  //  const {data} = await fetchDataFromApi("/api/products")
  //  setData(data)
  // }
  return (
   <main >
    <HeroBanner/> 
    <Wrapper>
    {/* heading and paragraph start */}
    <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
     <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
      Cushoning for your Miles
     </div>
     <div className="text-md md:text-xl">
      A Lightweight Nike ZoomX midsole is combined with increased stacks heights to help provide cushoning during extended streches of running.
     </div>

    </div>
    {/* Heading & paragraph End */}
    
    {/* Product grid Start */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
      {products?.data?.map ((product)=> (
         <ProductCard key={product.id} data={product}/>
      ))}
      {/* <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
    */}
    </div>
       {/* Product grid End */}
    </Wrapper>
  </main>
  )
}

export async function getStaticProps(){
  const products = await fetchDataFromApi("/api/products?populate=*");

return{
  props:{products}
}

}


