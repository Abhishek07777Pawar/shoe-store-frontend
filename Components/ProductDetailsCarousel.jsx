import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel'
const ProductDetailsCarousel = ({images}) => {
  return (
<div className='text-white text-[20px] w-full max-w-[1360] max-auto sticky top-[50px]'>
        <Carousel
             infiniteLoop={true} 
             showThumbs={true} 
              showIndicators={false}
              thumbWidth={60}
              showStatus={false}
              className='productCarousel'
              >
           {images?.map((img) => (
  <img key={img.id} src={img.attributes.url} alt={img.attributes.name} />
))}

               {/* <img src="/p1.png"/>
               <img src="/p2.png"/>
               <img src="/p3.png"/>
               <img src="/p4.png"/>
               <img src="/p5.png"/>
               <img src="/p6.png"/>
               <img src="/p7.png"/> */}

        </Carousel>
    </div>
  )
}

export default ProductDetailsCarousel;