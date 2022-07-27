import axios from 'axios'
import { Component, ReactNode } from 'react'
import { API_URL, config } from '@helpers/constants'
import { Grid, Link, Stack, Typography, SxProps, Box, Portal } from '@mui/material'
import { Instagram as InstagramIcon, YouTube as YouTubeIcon, WhatsApp as WhatsAppIcon, Facebook as FacebookIcon } from '@mui/icons-material'
import { borderBottom } from '@mui/system'
import Image from 'next/image'
import { BreakdownHelper } from '@helpers/responsive.helper';

type FooterComponentState = {
    copyrightYear: number
    contactNumber: string
    contactEmail: string
    instagramProfile: string
    youtubeProfile: string
    facebookProfile: string
    tiktokProfile: string
    whatsappChat: string
}

class Footer extends Component<{}, FooterComponentState> {
    private linkStyle: SxProps = {
        mt: 0,
        fontSize: '1rem',
        color: 'white',
        '&:hover': {
            color: 'white'
        }
    }

    private titleStyle: (isSmOrDown: boolean) => SxProps = (isSmOrDown) => {
        return {
            mb: 1,
            pb: 0,
            width: '100%',
            fontSize: '1.2rem',
            textAlign: isSmOrDown ? 'center' : 'left',
            borderBottom: isSmOrDown ? 'none' : 'solid 1px white'
        }
    }

    state: Readonly<FooterComponentState> = {
        copyrightYear: new Date().getFullYear(),
        contactNumber: null,
        contactEmail: null,
        instagramProfile: 'https://instagram.com/vendetunave?igshid=112zj0fxgq16g',
        youtubeProfile: 'https://m.youtube.com/channel/UCAFCTbFIi9lr7bP0zXULcOg',
        facebookProfile: 'https://www.facebook.com/vendetunave/',
        tiktokProfile: 'https://vm.tiktok.com/ZMLsVNcd5/',
        whatsappChat: null
    }

    async componentDidMount() {
        let { correo_contacto: contactEmail, telefono_contacto: contactNumber, whatsapp_chat: whatsappChat } = await (await axios.get(API_URL + config)).data.configuraciones

        contactNumber = contactNumber.trim()

        this.setState({
            contactEmail,
            contactNumber,
            whatsappChat
        })
    }

    render(): ReactNode {
        const {
            copyrightYear,
            contactNumber,
            contactEmail,
            instagramProfile,
            youtubeProfile,
            facebookProfile,
            tiktokProfile,
            whatsappChat
        } = this.state

        return (
            <>
                <BreakdownHelper>
                    {(isSmOrDown, isMdOrUp) => (
                        <Grid sx={{
                            position: 'relative',
                            backgroundColor: 'black',
                            paddingY: '2em',
                            paddingX: isSmOrDown ? '5em' : '10%',
                            marginTop: '50px !important',
                            color: 'white'
                        }} container direction={{ xs: 'row', sm: 'row', md: 'row' }} justifyContent='center' columnSpacing={{ xs: 40, sm: 40, md: 28 }} rowSpacing={{ xs: 1, sm: 1, md: 3 }}>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography sx={{
                                    ...this.titleStyle(isSmOrDown),
                                }} component="h4">
                                    SÍGUENOS
                                </Typography>
                                <Stack direction='row' justifyContent={isSmOrDown ? 'center' : 'start'} spacing={1}>
                                    <Link
                                        sx={this.linkStyle}
                                        component="a"
                                        underline='none'
                                        target="_blank"
                                        href={instagramProfile}
                                    >
                                        <InstagramIcon sx={{ fontSize: '2.5rem' }} />
                                    </Link>
                                    <Link
                                        sx={this.linkStyle}
                                        component="a"
                                        underline='none'
                                        target="_blank"
                                        href={whatsappChat}
                                    >
                                        <WhatsAppIcon sx={{ fontSize: '2.5rem' }} />
                                    </Link>
                                    <Link
                                        sx={this.linkStyle}
                                        component="a"
                                        underline='none'
                                        target="_blank"
                                        href={youtubeProfile}
                                    >
                                        <YouTubeIcon sx={{ fontSize: '2.5rem' }} />
                                    </Link>
                                    <Link
                                        sx={this.linkStyle}
                                        component="a"
                                        underline='none'
                                        target="_blank"
                                        href={facebookProfile}
                                    >
                                        <FacebookIcon sx={{ fontSize: '2.5rem' }} />
                                    </Link>
                                    <Link
                                        sx={this.linkStyle}
                                        component="a"
                                        underline='none'
                                        target="_blank"
                                        href={tiktokProfile}
                                    >
                                        <svg
                                            fill="#FFF"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 30 30"
                                            width={35}
                                            height={35}
                                        >
                                            <path d="M24 4H6a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm-1.311 9.474a4.27 4.27 0 0 1-3.967-1.911v6.577a4.861 4.861 0 1 1-4.861-4.862c.102 0 .201.009.3.015v2.396c-.1-.012-.197-.03-.3-.03a2.481 2.481 0 0 0 0 4.962c1.371 0 2.581-1.08 2.581-2.45l.024-11.17h2.289a4.268 4.268 0 0 0 3.934 3.811v2.662z" />
                                        </svg>
                                    </Link>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography sx={{
                                    ...this.titleStyle(isSmOrDown),
                                }} component="h4">
                                    CONTÁCTANOS
                                </Typography>
                                <Stack direction='column' alignItems={isSmOrDown ? 'center' : 'start'}>
                                    <Link sx={this.linkStyle} underline='hover' component='a' href={`tel:+57${contactNumber}`}>
                                        (057) {contactNumber}
                                    </Link>
                                    <Link sx={this.linkStyle} component='a' underline='hover' href={`mailto:${contactEmail}`}>
                                        {contactEmail}
                                    </Link>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                {/* <Box className="test" sx={{ width: isMdOrUp ? 150 : 75, height: isMdOrUp ? 100 : 50, marginX: isSmOrDown ? 'auto' : 0,  marginTop: isSmOrDown ? 2 : 0 }}> */}

                                {/* <Image
                                            alt="VTN_logo_white"
                                            className={'imglogo'}
                                            width={100}
                                            height={80}
                                            src="/images/VTN_logo_white.png"
                                        /> */}
                                <Stack direction="row" justifyContent={isSmOrDown ? 'center' : 'flex-end'}>
                                    <Box className="test" sx={{ width: isMdOrUp ? 150 : 75, height: isMdOrUp ? 100 : 50, marginTop: isSmOrDown ? 2 : 0 }}>
                                        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                                            <Image
                                                layout='fill'   
                                                alt="VTN_logo_white"
                                                className={'imglogo'}
                                                src="/images/VTN_logo_white.png"
                                            />
                                        </div>
                                    </Box>
                                </Stack>
                                {/*  </Box> */}
                            </Grid>
                            <Grid sx={{ marginTop: '2em' }} item xs={12} sm={12} md={12}>
                                <Stack direction='column' alignItems='center'>
                                    <span>© Copyright {copyrightYear} - VendeTuNave</span>
                                    <Link sx={this.linkStyle} component='a' underline='hover' href='/terminos-y-condiciones'>
                                        Términos y Condiciones
                                    </Link>
                                </Stack>
                            </Grid>
                        </Grid>

                    )}
                </BreakdownHelper>
                <Portal>
                    <Stack sx={{
                        pointerEvents: 'none',
                        position: 'fixed',
                        left: 0,
                        bottom: 0,
                        right: 0,
                        width: '100vw',
                        '-webkit-align-items': 'flex-end',
                        p: 3
                    }} alignItems='end'>
                        <Box sx={{ width: 60, height: 60, borderRadius: '100%', pointerEvents: 'all' }}>
                            <Link component='a' href={whatsappChat} target='_blank'>
                                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                                    <Image
                                        layout='fill'
                                        alt="VTN_logo_white"
                                        className={'imglogo'}
                                        src="/images/vtn_call.png"
                                    />
                                </div>
                            </Link>
                        </Box>
                    </Stack>
                </Portal>
            </>
        )
    }
}

export default Footer