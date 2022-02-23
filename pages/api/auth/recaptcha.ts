
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { RECAPTCHA_SECRET_KEY } from '@helpers/constants'

export const validateRecaptcha = async (req: NextApiRequest, res: NextApiResponse) => {
    const secret = RECAPTCHA_SECRET_KEY
    const response = req.query.response
    const ip = req.headers["x-real-ip"]


    const { data } = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${response}&remoteip=${ip}`,
        {}, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        },
    })

    if (data.success) {
        res.status(200).end()
    } else {
        res.status(400).end()
    }
}

export default validateRecaptcha