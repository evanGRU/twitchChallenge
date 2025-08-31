import axios from "axios";

export default async function handler(req, res) {
    const { PUUID } = req.query;
    const RIOT_API_KEY = process.env.RIOT_API_KEY;

    try {
        const response = await axios.get(
            `https://euw1.api.riotgames.com/lol/league/v4/entries/by-puuid/${PUUID}`,
            { headers: { "X-Riot-Token": RIOT_API_KEY } }
        );

        res.status(200).json(response.data);
    } catch (err) {
        console.error("Erreur Axios :", err.response?.status, err.response?.data || err.message);

        res.status(err.response?.status || 500).json({
            error: "Erreur API Riot",
            status: err.response?.status,
            data: err.response?.data,
            message: err.message
        });
    }
}
