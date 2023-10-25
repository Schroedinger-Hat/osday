import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {

    const {
        eid = 0,
        oid = 0
    } = req.query;

    if (!eid && !oid) {
        res.redirect('/404');
    }

    try {
        const data = await fetch(`https://www.eventbriteapi.com/v3/orders/${oid}/`, {
            headers: {
                "Authorization": "Bearer " + process.env.EVENTBRITE_AUTH_TOKEN
            }
        }).then((response) => response.json())
        
        if (data.name && data.id) {
            const ticketData = {
                name: data.name,
                oid: data.id,
            };

            const tid = Buffer.from(JSON.stringify(ticketData)).toString('hex');
            res.redirect(`/ticket?tid=${tid}`);
        }
    } catch (e) {
        console.log(e);
        res.redirect('/');
    }
}