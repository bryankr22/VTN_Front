import { useMemo, useState } from "react"
import Carousel from "./../ExpCarousel/dist"
import SwiperCore, { Zoom, Virtual, Navigation, Pagination, Thumbs, FreeMode } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/zoom'
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

  const [thumbsRef, setThumbsRef] = useState(null) as [SwiperCore, () => void]

  const [carouselRef, setCarouselRef] = useState(null) as [SwiperCore, () => void]

  return [
    <Swiper
      key="carousel"
      onSwiper={setCarouselRef}
      className={styles.swiper}
      style={{
        "--swiper-navigation-color": "#000",
        "--swiper-pagination-color": "#000"
      } as any}
      modules={[Virtual, Zoom, Pagination, Navigation, FreeMode, Thumbs]}
      thumbs={{ swiper: thumbsRef }}
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
              <img src={image.src} alt={alt}>
              </img>
            </div>
          </SwiperSlide>
        ))
      }
    </Swiper>,

    !mobile && (
      <Swiper
        key="thumbs"
        onSwiper={setThumbsRef}

        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={styles['thumbs-swiper']}
      >
        {
          imageList.map((image, index) => (
            <SwiperSlide className={styles['thumbs-swiper-slide']} id={'thumb-' + index} key={index} onClick={(event) => {
              thumbsRef.clickedSlide = (event.target as HTMLElement).parentElement
              if (thumbsRef.clickedSlide) {
                const index = thumbsRef.slides.indexOf(thumbsRef.clickedSlide)
                carouselRef.slideTo(index)
              }
            }}>
              <img src={image.src} alt={alt}>
              </img>
            </SwiperSlide>
          ))
        }
      </Swiper>
    )
  ]
}
