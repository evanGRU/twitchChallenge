const puuidObject = {
    mainAccount: "bW0yqyC4qFK0dSglziCOe8jAHDYRqlbJaDHxQrEaoh1S9WNRhJh6lgQQNvD25VTSNXEBTO9tUszf6w",
    rushAccount: "pJ3nxvjApqmlt7gsHsYijTW8_wCmU_-rYmhIQrc0QHC_F73h1VIAuPyo0T1QfJj4kc8fs9CqvywkEg"
}

export const PUUID = puuidObject.rushAccount;

export const baseLP = {
    UNRANKED: 0,
    IRON: 0,
    BRONZE: 400,
    SILVER: 800,
    GOLD: 1200,
    PLATINUM: 1600,
    EMERALD: 2000,
};

export const divisionOffset = {
    UNRANKED: 0,
    IV: 0,
    III: 100,
    II: 200,
    I: 300,
};

export const queueTypes = {
    420: "Classé Solo/Duo",
    440: "Classé Flex",
    400: "Normal Draft",
    430: "Normal Blind",
    450: "ARAM",
};

export const twitchParents = {
    emeraldChallenge: "emeraldchallenge.vercel.app",
    localhost: "localhost",
    localNetwork: "192.168.0.48"
}