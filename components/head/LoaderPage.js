import { useState, useEffect } from 'react'
import { Dimmer, Loader } from "semantic-ui-react";
import { useRouter } from 'next/router';
export default function Loading() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const handleStart = (url) => setLoading(true);
        const handleComplete = (url) => setLoading(false);

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError', handleComplete)
        //router.events.on('hashChangeComplete', handleComplete)


        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!loading) return null

    return (
        <Dimmer style={{ position: "fixed", zIndex: 9999 }} active={loading}>
            <Loader>Cargando página...</Loader>
        </Dimmer>
    );
}