export default async function handler(req, res) {
    const lastSnapshot = await fetch('https://data.smartdublin.ie/dublinbikes-api/last_snapshot');

    const body = await lastSnapshot.json();
    const data = body.map(station => station.id);

    res.status(200).json(data);
}