import React from 'react';
import { Container, Image } from 'semantic-ui-react';

import PublicLayout from '../layouts/PublicLayout';

export default function Custom404() {
    return (
        <PublicLayout>
            <Container style={{ paddingTop: 66, minHeight: 400 }} text textAlign='center'>
                <Image src="/images/logo_VTN.png" size='small' alt="VTN_logo" centered />
                <h1>404 - Page Not Found</h1>
            </Container>
        </PublicLayout>
    )
}
