import React, { useEffect, useState } from 'react'
import { fetchDataFromApi } from '@/utils/api'
import Wrapper from '@/Components/Wrapper'

import ProductCard from '@/Components/ProductCard'
import { useRouter } from 'next/router'
import useSWR from 'swr'
const maxResult =3;
const category = ({category,products,slug}) => {
  const [pageindex,setPageIndex]=useState(1)
  const {query}=useRouter();

  useEffect(()=>{
    setPageIndex(1)
  },[query])
 
  const { data, error, isLoading } = useSWR(`/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=${pageindex}&pagination[pageSize]=${ maxResult}`, fetchDataFromApi,{
    fallbackData:products
  })
    
  return (
    <div className='w-full md:py-20 relative'>
        <Wrapper>
            <div className='text-center max-w-[800px] mx-auto mt-8 md:mt-0'>
                <div className='text-[28px] md:text-[34px] mb-5 font-semibold leading-tight'>
                 {category?.data?.[0]?.attributes?.name}
                </div>
            </div>
              {/* Product grid Start */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
       {data?.data?.map ((product)=> (
           <ProductCard key={product.id} data={product}/>
       ))}

      {/* <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/> */}
   
    </div>
       {/* Product grid End */}

{/* PAGINATION BUTTONS START */}
  {data?.meta?.pagination?.total > maxResult && (
    <div className="flex gap-3 items-center justify-center my-16 md:my-0">
        <button
            className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
            disabled={pageindex === 1}
            onClick={() => setPageIndex(pageindex - 1)}
        >
            Previous
        </button>

        <span className="font-bold">{`${pageindex} of ${
            data && data.meta.pagination.pageCount
        }`}</span>

        <button
            className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
            disabled={
                pageindex ===
                (data && data.meta.pagination.pageCount)
            }
            onClick={() => setPageIndex(pageindex + 1)}
        >
            Next
        </button>
    </div>
)}
{/* PAGINATION BUTTONS END */}
{isLoading && (
    <div className="absolute top-0 left-0 w-full h-full bg-white/[0.5] flex flex-col gap-5 justify-center items-center">
        <img src="/logo.svg" width={150} />
        <span className="text-2xl font-medium">Loading...</span>
    </div>
)}

        </Wrapper>
    </div>
  )
}

export default category


export async function getStaticPaths() {
 const category = await fetchDataFromApi("/api/categories?populate=*"); 
   const paths =category?.data?.map((c)=>({
    params:{
      slug:c.attributes.slug
    }
   })) 
   return{
    paths,
    fallback:false
   }
 
}
export async function getStaticProps ({params: {slug}}){
 const category = await fetchDataFromApi(`/api/categories?filters[slug][$eq]=${slug}`)
 const products = await fetchDataFromApi(`/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=1&pagination[pageSize]=${ maxResult}`)
 return {
  props:{
    category,
    products,
    slug,
  }
 }
  }

