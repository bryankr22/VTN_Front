import { BreakdownHelper, defaultTheme } from '@helpers';
import { connect } from 'react-redux';
import { createTheme } from '@mui/material/styles';
import { AUTH_URL, login_api, RECAPTCHA_SITE_KEY, register_api, validateRecaptcha } from '@helpers/constants'
import LoadingButton from '@mui/lab/LoadingButton'
import { Alert, Checkbox, Divider, FormControlLabel, FormGroup, ThemeProvider, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import axios from 'axios'
import * as dedent from 'dedent'
import { Form, Formik } from 'formik'
import jwt from 'jsonwebtoken'
import { NextSeo } from "next-seo"
import Head from "next/head"
import { instanceOf } from 'prop-types'
import { Component, useEffect } from 'react'
import { Cookies, withCookies } from 'react-cookie'
import Reaptcha from 'reaptcha'
import * as yup from 'yup'
import PublicLayout from '../layouts/PublicLayout'
import { dark, light } from '@helpers/colors';

type LoginData = {
    email: string,
    password: string
}

type SignUpData = {
    name: string
    email: string
    password: string
    confirmPassword: string
    subscribeToNewsLetter: boolean
}

type LoginPageState = {
    isLoginIn: boolean
    isSigningInUp: boolean
    isLoginError: boolean
    isSignUpError: boolean,
    signUpVerified: boolean,
}

type darkModeInterface = {
    status: string
}


/**
 * Login and register page component.
 * 
 * @param props props for this page
 * @returns the login and register page template.
 */
class LoginPage extends Component<{ cookies: Cookies, darkMode: darkModeInterface }, LoginPageState> {
    state: LoginPageState = {
        // the login process is running
        isLoginIn: false,
        // the sign up process is running
        isSigningInUp: false,
        // there is a login error
        isLoginError: false,
        // there is a sign up error
        isSignUpError: false,
        // the sign up recaptcha is valid
        signUpVerified: false
    }

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    // Login form validations
    private validationLoginSchema = yup.object({
        email: yup
            .string()
            .email('Ingresa un correo válido')
            .required('El correo es requerido'),
        password: yup
            .string()
            .required('La contraseña es requerida'),
    })

    // Sign up form validations
    private validationSignUpSchema = yup.object({
        name: yup
            .string()
            .required('Ingresa tu nombre'),
        email: yup
            .string()
            .email('Ingresa un correo válido')
            .required('El correo es requerido'),
        password: yup
            .string()
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?!.*[^A-Za-z0-9]).{8,}$/gm, {
                message: dedent(`
                La contraseña no es segura, debe tener:
                \t* Mínimo 8 caracteres.
                \t* Una letra mayúscula.
                \t* Un número.
                \t* No caracteres especiales.
                `)
            })
            .required('La contraseña es requerida'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden')
            .required('Debes confirmar tu contraseña'),
    })

    // Initial values for login form
    private loginInitialValues: LoginData = {
        email: '',
        password: '',
    }

    // Initial values for sign up form
    private signUpInitialValues: SignUpData = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        subscribeToNewsLetter: false,
    }

    /**
     * Builds a new year object with a year ahead from today.
     * 
     * @returns the date with a year ahead from today
     */
    private nextYear() {
        let oneYearFromNow = new Date()
        oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1)
        return oneYearFromNow
    }

    /**
     * Does the login process and redirects to navigated to previous page if user were asked to login
     * for refresh the user token, if the login is after a sign up it redirects to the user profile page.
     * 
     * @param loginData A login data object 
     * @param isSignUp true if this login is after a sign up.
     */
    private async doLogin({ email, password }: LoginData, isSignUp = false) {
        const { data } = await axios.post(AUTH_URL + login_api, { email, password })

        const { cookies } = this.props

        const token = jwt.sign(data, 'vendetunave2021')

        cookies.set('vtn_token', token, {
            path: "/",
            expires: this.nextYear(),
            sameSite: true
        })

        const [, path] = location.search.split('path=')
        window.location.href = isSignUp ? '/usuario/perfil' : (!path ? '/' : path)
    }

    /**
     * Does the sign up process, after that it does a login and redirects to user profile page.
     * 
     * @param signUpData the data used for register the user. 
     */
    private async doSignUp({ name: nombre, email, password, confirmPassword, subscribeToNewsLetter: remember }: SignUpData) {
        await axios.post(AUTH_URL + register_api, { nombre, email, password, confirmPassword, remember })

        await this.doLogin({ email, password }, true)
    }

    /**
     * verify the sign up recaptcha response using a local API
     * 
     * @param response the recaptcha response
     */
    private async onVerifySignUp(response: string) {
        try {
            await axios.get(validateRecaptcha, {
                params: {
                    response
                }
            })

            this.setState({ signUpVerified: true })
        } catch (error) {
            console.error(error)
            this.setState({ signUpVerified: false })
        }
    }

    /**
     * Does the login process and update the page layout.
     * 
     * @param values the login values form
     */
    private async onLoginSubmit(values: LoginData) {
        this.setState({ isLoginIn: true })
        try {
            await this.doLogin(values)
        } catch (error) {
            console.error(error)
            this.setState({
                isLoginIn: false,
                isLoginError: true
            })
        }
    }

    /**
     * Does the sign up process and update the page layout.
     * 
     * @param values the sign up values form
     */
    private async onSignUpSubmit(values: SignUpData) {
        this.setState({ isSigningInUp: true })
        try {
            await this.doSignUp(values)
        } catch (error) {
            this.setState({
                isSigningInUp: false,
                isSignUpError: true
            })
        }
    }

    constructor(props) {
        super(props)

        // this.onVerifyLogin = this.onVerifyLogin.bind(this)
        this.onVerifySignUp = this.onVerifySignUp.bind(this)
        this.onLoginSubmit = this.onLoginSubmit.bind(this)
        this.onSignUpSubmit = this.onSignUpSubmit.bind(this)
        this.onSignUpSubmit = this.onSignUpSubmit.bind(this)
    }

    render() {
        const { isLoginIn,
            isLoginError,
            isSigningInUp,
            isSignUpError,
            signUpVerified
        } = this.state


        const darkMode = this.props.darkMode.status;
        const colorText = darkMode === light ? undefined : light;

        const themeDark = createTheme({
            palette: {
                mode: 'dark',
            }
        });

        return (
            <ThemeProvider theme={darkMode === light ? defaultTheme : themeDark} >
                <PublicLayout {...this.props}>
                    <NextSeo
                        title="VendeTuNave – Regístrate o Inicia sesión"
                        description="Regístrate y pertenece a la comunidad automotriz más grande de Colombia. Además, accede a beneficios como publicar gratis, interactuar en nuestra comunidad y mucho más."
                        openGraph={{
                            title: "VendeTuNave – Regístrate o Inicia sesión",
                            locale: "es_ES",
                            type: "website",
                            description: "Regístrate y pertenece a la comunidad automotriz más grande de Colombia. Además, accede a beneficios como publicar gratis, interactuar en nuestra comunidad y mucho más."
                        }}
                    />
                    <Head>
                        <meta property="keywords" content="camionetas usadas medellin, carros usados barranquilla, vehiculos usados, carros de segunda baratos, carros nuevos baratos, venta de carros usados en bogota, carros de venta usados" />
                    </Head>
                    <BreakdownHelper>
                        {(isSmOrDown, isMdOrUp) => (
                            <Box sx={{ flexGrow: 1, mx: isSmOrDown ? 4 : 16 }}>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} sm={12} md={5}>
                                        <Box sx={{ my: 4 }}>
                                            <Typography variant="h5" component="div" gutterBottom style={{ color: colorText }}>
                                                INICIAR SESIÓN
                                            </Typography>
                                        </Box>
                                        {isLoginError && <Alert severity='warning'>Credenciales incorrectas, intentelo de nuevo.</Alert>}
                                        <Formik
                                            initialValues={this.loginInitialValues}
                                            validationSchema={this.validationLoginSchema}
                                            onSubmit={this.onLoginSubmit} render={({
                                                values,
                                                errors,
                                                touched,
                                                handleChange
                                            }) => (
                                                <Form>
                                                    <Box sx={{ my: 2 }}>
                                                        <TextField
                                                            fullWidth
                                                            id="email"
                                                            name="email"
                                                            label="Correo electrónico"
                                                            value={values.email}
                                                            onChange={handleChange}
                                                            error={touched.email && Boolean(errors.email)}
                                                        />
                                                    </Box>
                                                    <Box sx={{ my: 2 }}>
                                                        <TextField
                                                            fullWidth
                                                            id="password"
                                                            name="password"
                                                            label="Contraseña"
                                                            type="password"
                                                            value={values.password}
                                                            onChange={handleChange}
                                                            error={touched.password && Boolean(errors.password)}
                                                            helperText={touched.password && errors.password}
                                                        />
                                                    </Box>
                                                    <Box sx={{ mb: 2 }}>
                                                        <Link href="/restablecer" underline="hover" style={{ color: colorText }}>
                                                            ¿Olvidaste la contraseña?
                                                        </Link>
                                                    </Box>
                                                    <LoadingButton color="primary" style={{ backgroundColor: colorText }} variant="contained" type="submit" loading={isLoginIn}>
                                                        INICIAR SESIÓN
                                                    </LoadingButton>
                                                </Form>
                                            )} />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={2}>
                                        <Box sx={{ mx: 'auto', height: '100%', textAlign: 'center' }}>
                                            <Divider style={{ display: isMdOrUp ? 'inline-block' : 'flex' }} orientation={isMdOrUp ? 'vertical' : 'horizontal'}>
                                                {isSmOrDown && <span>Ó</span>}
                                            </Divider>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={5}>
                                        <Box sx={{ my: 4 }}>
                                            <Typography variant="h5" component="div" gutterBottom style={{ color: colorText }}>
                                                REGISTRARSE
                                            </Typography>
                                        </Box>
                                        {isSignUpError && <Alert severity='warning'>El correo ya existe u ocurrió algun error, intentelo de nuevo.</Alert>}
                                        <Formik
                                            initialValues={this.signUpInitialValues}
                                            validationSchema={this.validationSignUpSchema}
                                            onSubmit={this.onSignUpSubmit} render={({
                                                values,
                                                errors,
                                                touched,
                                                handleChange,
                                                handleSubmit,
                                            }) => (
                                                <form onSubmit={handleSubmit}>
                                                    <Box sx={{ my: 2 }}>
                                                        <TextField
                                                            fullWidth
                                                            id="name"
                                                            name="name"
                                                            label="Nombre"
                                                            value={values.name}
                                                            onChange={handleChange}
                                                            error={touched.name && Boolean(errors.name)}
                                                            helperText={touched.name && errors.name}
                                                        />
                                                    </Box>
                                                    <Box sx={{ my: 2 }}>
                                                        <TextField
                                                            fullWidth
                                                            id="email"
                                                            name="email"
                                                            label="Correo electrónico"
                                                            value={values.email}
                                                            onChange={handleChange}
                                                            error={touched.email && Boolean(errors.email)}
                                                            helperText={touched.email && errors.email}
                                                        />
                                                    </Box>
                                                    <Box sx={{ my: 2 }}>
                                                        <TextField
                                                            fullWidth
                                                            id="password"
                                                            name="password"
                                                            label="Contraseña"
                                                            type="password"
                                                            value={values.password}
                                                            onChange={handleChange}
                                                            error={touched.password && Boolean(errors.password)}
                                                            helperText={touched.password && <>
                                                                <div style={{ whiteSpace: 'pre-wrap' }}>{errors.password}</div>
                                                            </>}
                                                        />
                                                    </Box>
                                                    <Box sx={{ my: 2 }}>
                                                        <TextField
                                                            fullWidth
                                                            id="confirmPassword"
                                                            name="confirmPassword"
                                                            label="Confirma tu contraseña"
                                                            type="password"
                                                            value={values.confirmPassword}
                                                            onChange={handleChange}
                                                            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                                            helperText={touched.confirmPassword && errors.confirmPassword}
                                                        />
                                                    </Box>
                                                    <FormGroup>
                                                        <FormControlLabel control={
                                                            <Checkbox
                                                                id="subscribeToNewsLetter"
                                                                name="subscribeToNewsLetter"
                                                                value={values.subscribeToNewsLetter}
                                                            />
                                                        } label="Subscribirse al newsletter" style={{ color: colorText }} />
                                                    </FormGroup>
                                                    <Box sx={{ mb: 2 }}>
                                                        <Reaptcha sitekey={RECAPTCHA_SITE_KEY} onVerify={this.onVerifySignUp} />
                                                    </Box>
                                                    <LoadingButton color="primary" style={{ backgroundColor: colorText, color: darkMode }} variant="contained" type="submit" disabled={!signUpVerified} loading={isSigningInUp}>
                                                        REGISTRARSE
                                                    </LoadingButton>
                                                </form>
                                            )} />
                                    </Grid>
                                </Grid>
                            </Box>
                        )}
                    </BreakdownHelper>
                </PublicLayout>
            </ThemeProvider>
        )
    }
}

const mapStateToProps = state => {
    return {
        darkMode: state.darkMode
    }
}

export default connect(mapStateToProps)(withCookies(LoginPage))