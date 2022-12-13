import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {
    const data = await fetch('https://www.eventbriteapi.com/v3/events/441134303577/ticket_classes/', {
        headers: {
            "Authorization": "Bearer " + process.env.EVENTBRITE_AUTH_TOKEN
        }
    }).then((response) => response.json())
    res.status(200).json(data)
}