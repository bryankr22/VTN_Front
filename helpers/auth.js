import cookie from "cookie";

const parseCookies = (req) => {
    return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}
export const authInitialProps = () => ({ req, res }) => {
    const auth = parseCookies(req);
    if(!auth.vtn_token){
        res.writeHead(301, {
            Location: '/'
        });
        res.end();
    }
    return { 
        auth: auth.vtn_token 
    }
}
export const validateAuth = ({ req, res }) => {
    const auth = parseCookies(req);
    return auth;
}