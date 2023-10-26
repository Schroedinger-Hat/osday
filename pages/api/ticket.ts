import { NextApiRequest, NextApiResponse } from "next";
import svg2img from 'svg2img';
import fs from 'fs';
import path from 'path'





export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {

    const {
        eid = 0,
        oid = 0,
        tid = null
    } = req.query;

    if (tid) {
        const { name } = JSON.parse(Buffer.from(tid.toString(), 'hex').toString("utf8"));
        const filePath = path.resolve('./public/ticket.svg');
        const imageBuffer = fs.readFileSync(filePath);
        const finalString = Buffer.from(imageBuffer).toString('utf8').replace('ATTENDEE_NAME', name);
        svg2img(
            finalString, {
                resvg: {
                    font: {
                        loadSystemFonts: false,
                        fontDirs: [path.resolve('./public/fonts/')],
                        defaultFontFamily: 'Red Hat Display'
                    },
                }
            },
            function(error, buffer) {
                res.setHeader('Content-Type', 'image/png');
                res.send(Buffer.from(buffer));
            }
        );
        return;
    }

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
            res.redirect(`/ticket/${tid}`);
        }
    } catch (e) {
        console.log(e);
        res.redirect('/');
    }
}