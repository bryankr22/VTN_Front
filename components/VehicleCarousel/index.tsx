import { useMemo } from "react"
import Carousel from "./../ExpCarousel/dist"
import SwiperCore, { Lazy, Zoom, Virtual, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import "swiper/css/zoom"
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import styles from './styles.module.css'

interface Image {
  url: string
}

interface Props {
  images?: Image[]
  alt: string
  mobile?: boolean
}

export default function VehicleCarousel({ images = [], alt, mobile }: Props) {
  const imageList = useMemo(() => {
    return images.map((image) => ({ src: image.url + "webp", alt }))
  }, [])

  return (
    <div>
      {/* <Carousel
        images={imageList}
        shouldLazyLoad={false}
        objectFit={"contain"}
        style={{ height: mobile ? 400 : 500 }}
        shouldMaximizeOnClick
        leftIcon={<i className="angle left icon ic-big "></i>}
        rightIcon={<i className="angle right icon ic-big "></i>}
        minIcon={<i className="close icon ic-big  mt-1"></i>}
        hasIndexBoardAtMax
        hasIndexBoard={false}
        maxIcon={null}
        playIcon={null}
        className={"crsl-adapt"}
        hasThumbnails={!mobile}
      /> */
        <Swiper
          className={styles.swiper}
          style={{
            "--swiper-navigation-color": "#000",
            "--swiper-pagination-color": "#000"
          } as any}
          modules={[Virtual, Zoom, Lazy, Pagination, Navigation]}
          lazy={false}
          zoom={true}
          virtual={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
        >
          {
            imageList.map((image, index) => (
              <SwiperSlide className={styles['swiper-slide']} key={index} virtualIndex={index}>
                <div className="swiper-zoom-container">
                  <img className='swiper-lazy' src={image.src} alt={alt}>
                  </img>
                </div>
                <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
              </SwiperSlide>
            ))
          }
        </Swiper>
      }
    </div>
  )
}
