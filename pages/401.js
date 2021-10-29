import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { Container, Image } from 'semantic-ui-react';

import PublicLayout from '../layouts/PublicLayout';
import { updateToken } from '../store/authSlice';

export default function Custom404() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [, , removeCookie] = useCookies(['vtn_token']);
    const CloseSession = () => {
        dispatch(updateToken(null));
        removeCookie('vtn_token', {});
        window.location = `/login${location.search}`
    }

    useEffect(() => {
        setTimeout(() => {
            CloseSession()
        }, 1000)
    }, [])

    return (
        <PublicLayout>
            <Container style={{ paddingTop: 66, minHeight: 400 }} text textAlign='center'>
                <Image src="/images/logo_VTN.png" size='small' alt="VTN_logo" centered />
                <h1>- 401 -</h1>
                <h2>Lo sentimos, para ingresar a esta sección debes estar registrado. ¡Te invitamos a hacerlo!</h2>
            </Container>
        </PublicLayout>
    )
}
