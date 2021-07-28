import cookie from "cookie";
import axios from "axios";
import { AUTH_URL, login_api } from '../../../helpers/constants';
import jwt from 'jsonwebtoken';
export default (req, res) => {
    if (req.method === 'POST') {
        axios.post(AUTH_URL + login_api, { ...req.body }).then((response) => {
            const token = jwt.sign(response.data, 'vendetunave2021');
            res.setHeader(
                "Set-Cookie",
                cookie.serialize("vtn_token", token, {
                    httpOnly: true,
                    secure: false,
                    maxAge: 3600,
                    sameSite: "strict",
                    path: "/",
                })
            );
            res.statusCode = 200;
            res.json({ success: true });
        }).catch(error => {
            res.statusCode = 500;
            res.json({ 
                success: false,
                body: req.body,
                error: error.message 
            });
        });
        
    }
    
};