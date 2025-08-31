import axios from "axios";

export default async function handler(req, res) {
    const { PUUID, queue, count = 10 } = req.query;
    const RIOT_API_KEY = process.env.RIOT_API_KEY;

    try {
        const idsRes = await axios.get(
            `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${PUUID}/ids`,
            {
                headers: { "X-Riot-Token": RIOT_API_KEY },
                params: { start: 0, count, queue },
            }
        );

        const matchIds = idsRes.data;

        const matchesData = await Promise.all(
            matchIds.map((id) =>
                axios
                    .get(`https://europe.api.riotgames.com/lol/match/v5/matches/${id}`, {
                        headers: { "X-Riot-Token": RIOT_API_KEY },
                    })
                    .then((r) => r.data)
            )
        );

        res.status(200).json(matchesData);
    } catch (err) {
        console.error(err.response?.data || err.message);
        res
            .status(err.response?.status || 500)
            .json({ error: "Erreur API Riot" });
    }
}
