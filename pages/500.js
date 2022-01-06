import React from 'react';
import { Container, Image } from 'semantic-ui-react';

import PublicLayout from '../layouts/PublicLayout';

export default function Custom500() {
    return (
        <PublicLayout>
            <Container style={{ paddingTop: 66, minHeight: 400 }} text textAlign='center'>
                <Image src="/images/logo_VTN.png" size='small' alt="VTN_logo" centered />
                <h1>500 - Internal Server Error</h1>
            </Container>
        </PublicLayout>
    )
}
