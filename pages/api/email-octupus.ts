import { NextApiRequest, NextApiResponse } from "next";

export const config = {
    api: {
        bodyParser: true,
    },
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {
    const data = await fetch('https://emailoctopus.com/api/1.6/lists/64866e06-cf2d-11ed-9edc-ef4a15116ddf/contacts', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            api_key: process.env.EMAIL_OTCUPUS_API_KEY,
            email_address: req.body.email,
            fields: {},
            tags: ['osday-website', 'osday-landing'],
            status: 'SUBSCRIBED',
        }),
    }).then((response) => response.json());
    res.status(200).json(data);
}