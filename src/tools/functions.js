import {baseLP, divisionOffset, PUUID} from "./params";
import axios from "axios";

export const getTotalLP = (tier, division, leaguePoints) => {
    return baseLP[tier] + divisionOffset[division] + leaguePoints;
}

export const getWinrate = (wins, losses) => {
    const totalGames = wins + losses;
    if (totalGames === 0) return 0;
    return ((wins / totalGames) * 100).toFixed(2);
}

export const getLolRank = async () => {
    const res = await axios.get("/api/lol/rank", { params: { PUUID } });
    return res.data;
}

export const getSoloMatches = async () => {
    const res = await axios.get("/api/lol/matches", {
        params: { PUUID, queue: 420, count: 8 },
    });
    return res.data;
}

export const getFlexMatches = async () => {
    const res = await axios.get("/api/lol/matches", {
        params: { PUUID, queue: 440, count: 8 },
    });
    return res.data;
}