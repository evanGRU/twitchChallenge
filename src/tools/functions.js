import {baseLP, divisionOffset, PUUID} from "./params";
import axios from "axios";

export const getTotalLP = (tier, division, leaguePoints) => {
    return baseLP[tier] + divisionOffset[division] + leaguePoints;
}

export const getLolRank = async () => {
    const res = await axios.get("/api/lol/rank", { params: { PUUID } });
    return res.data;
}