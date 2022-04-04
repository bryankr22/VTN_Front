import { BreakdownHelper } from '@helpers/responsive.helper'
import { Box, Stack, Typography } from '@mui/material'
import axios from 'axios'
import { PickAndPlateData } from 'pages/api/pick-and-plate'
import { useEffect, useState } from 'react'
import { Autoplay, FreeMode } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import _JSXStyle from 'styled-jsx/style'

import 'swiper/css'

const PickAndPlateEntry = ({ pickAndPlateDataEntry }: { pickAndPlateDataEntry: [string, string] }) => {
    const [city, pickAndPlate] = pickAndPlateDataEntry

    return (<Typography key={city} component='div' sx={{
        display: 'blow',
        px: 6,
        color: 'white',
        textTransform: 'uppercase',
        borderRight: '1px solid white'
    }}>
        {city + ' : '}
        <Typography component={'span'} sx={{ letterSpacing: 3 }}>{pickAndPlate}</Typography>
    </Typography>)
}


const PickAndPlate = () => {
    const [pickAndPlatesData, setPickAndPlatesData] = useState<PickAndPlateData>(null)



    useEffect(() => {
        const requestPickAndPlate = async () => {
            const response = await axios.get('/api/pick-and-plate')

            const data = await response.data as PickAndPlateData

            console.log(data)

            setPickAndPlatesData(data)
        }

        requestPickAndPlate().catch(console.error)
    }, [])

    return (<>
        <BreakdownHelper>
            {(isSmOrDown, isMdOrUp) => (

                pickAndPlatesData && <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} sx={{
                    width: '100vw',
                    height: '55px',
                    backgroundColor: '#383838'
                }}>
                    <Typography component='div' sx={{
                        ml: 1,
                        mr: '2px',
                        whiteSpace: 'nowrap',
                        p: 0.6,
                        letterSpacing: 2,
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        backgroundColor: 'rgb(247, 192, 0)',
                        border: '2px solid', borderRadius: 1.5,
                        boxShadow: 'rgb(247, 192, 0) 0px 0px 0px 0.1em'
                    }}>
                        Pico y placa
                    </Typography>
                    {isMdOrUp && Object.values(pickAndPlatesData).map(pickAndPlateDataEntry => {
                        return <PickAndPlateEntry key={pickAndPlateDataEntry[0]} pickAndPlateDataEntry={pickAndPlateDataEntry}></PickAndPlateEntry>

                    })}
                    {isSmOrDown && <Swiper
                        style={{ flexGrow: 1 }}
                        slidesPerView={"auto"}
                        freeMode={true}
                        modules={[FreeMode, Autoplay]}
                        loop={true}
                        speed={4000}
                        autoplay={{
                            delay: 0,
                            disableOnInteraction: false
                        }}
                    >
                        {Object.values(pickAndPlatesData).map(pickAndPlateDataEntry => {
                            return <SwiperSlide key={pickAndPlateDataEntry[0]} style={{ width: 'auto' }}>
                                <PickAndPlateEntry pickAndPlateDataEntry={pickAndPlateDataEntry}></PickAndPlateEntry>
                            </SwiperSlide>
                        })}
                    </Swiper>}
                </Stack>
            )}
        </BreakdownHelper>
        <_JSXStyle>{`
        .swiper-wrapper {
            transition-timing-function: linear !important;
        }
      `}</_JSXStyle>
    </>
    )
}

export default PickAndPlate

