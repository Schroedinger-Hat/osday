import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {
    const data = await fetch('https://sessionize.com/api/v2/<token>/view/Sessions')
    .then((response) => response.json())
    res.status(200).json(data)
}
