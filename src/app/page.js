"use client";

import {useEffect, useState} from "react";
import {cardTitles, PUUID, twitchParents} from "@/tools/params";
import {getFlexMatches, getLolRank, getSoloMatches, getTotalLP, getWinrate} from "@/tools/functions";
import styles from './page.module.scss';
import Image from "next/image";

export default function Home() {
    const [lolRankData, setLolRankData] = useState(null);
    // const [TFTRankData, setTFTRankData] = useState(null);
    const [soloMatches, setSoloMatches] = useState([]);
    const [flexMatches, setFlexMatches] = useState([]);
    const [timeLeft, setTimeLeft] = useState({});

    useEffect(() => {
        getLolRank().then(data => setLolRankData(data));
        getSoloMatches().then(data => setSoloMatches(data));
        getFlexMatches().then(data => setFlexMatches(data));
    }, [])


    useEffect(() => {
        const targetDate = "2025-09-30T23:59:59";
        const targetTime = new Date(targetDate).getTime();

        const updateCountdown = () => {
            const now = Date.now();
            const distance = targetTime - now;

            if (distance <= 0) {
                setTimeLeft({ expired: true });
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((distance / (1000 * 60)) % 60),
                seconds: Math.floor((distance / 1000) % 60),
                expired: false,
            });
        };

        updateCountdown();
        const timer = setInterval(updateCountdown, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <div className={styles.titleSection}>
                {/*eslint-disable-next-line*/}
                <h1>///</h1>
                <h1>EMERALD CHALLENGE</h1>
                {/*eslint-disable-next-line*/}
                <h1>///</h1>
            </div>

            <div className={styles.twitchSection}>
                <iframe
                    src={`https://player.twitch.tv/?channel=akgamiiTV&parent=${twitchParents.emeraldChallenge}`}
                    allowFullScreen={true}
                />
                <div className={styles.headerContainer}>
                    <div className={styles.presentationCard}>
                        <div className={styles.presentationTitle}>
                            <h2>PRESENTATION DU CHALLENGE : </h2>
                        </div>
                        <p>
                            L&apos;objectif est simple :
                            <br/>
                            Je me donne 30 jours pour atteindre le rang émeraude sur les modes SOLO/DUO et FLEX sur LOL et RANKED sur TFT à partir d&apos;un fresh account.
                        </p>
                        <p>Est-ce que je vais réussir ?</p>
                        <p>Je n&apos;ai pas le choix.</p>
                        <p>Que le challenge commence.</p>
                    </div>

                    <div className={styles.countdown}>
                        {timeLeft.expired ? (
                            <p>FIN DU CHALLENGE...</p>
                        ) : (
                            <p>TEMPS RESTANTS : {timeLeft.days}j {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</p>
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.titleSection}>
                <h1>.</h1>
                <h1>MES RANKS</h1>
                <h1>.</h1>
            </div>

            <div className={styles.rankSection}>
                {lolRankData &&
                    lolRankData.map((data) => (
                        <div key={data.queueType} className={styles.rankCard}>
                            <div className={styles.cardTitle}>
                                {cardTitles[data.queueType]}
                            </div>
                            <div className={styles.rankTexts}>
                                <Image src={`/${data.tier}.png`} width={130} height={130} alt="emeraldIcon"/>
                                <p>{data.tier} {data.rank}</p>
                                <p>-</p>
                                <p>{data.leaguePoints} LP</p>
                                <p>-</p>
                                <p>{getTotalLP(data.tier, data.rank, data.leaguePoints)}/2000 LP</p>
                            </div>

                            <div className={styles.matchHistorySection}>
                                <div className={styles.matchesHistory}>
                                    {(data.queueType === "RANKED_SOLO_5x5" ? soloMatches : flexMatches).map(match => {
                                        const myData = match.info.participants.find(p => p.puuid === PUUID);
                                        return (
                                            <span
                                                key={match.metadata.matchId}
                                                className={`${styles.matchIndicator} ${myData.win ? styles.win : styles.loss}`}
                                            />
                                        )
                                    })}

                                </div>
                                <p>{getWinrate(data.wins, data.losses)}%</p>
                            </div>

                        </div>
                    ))
                }

                {/*<div key={TFTRankData.queueType} className="rank-card">*/}
                {/*    <div className="card-title">*/}
                {/*        {cardTitles[TFTRankData.queueType]}*/}
                {/*    </div>*/}
                {/*    <div className="rank-texts">*/}
                {/*        <img src={`./${TFTRankData.tier}.png`} alt="emeraldIcon"/>*/}
                {/*        <p>{TFTRankData.tier} {TFTRankData.rank}</p>*/}
                {/*        <p>-</p>*/}
                {/*        <p>{TFTRankData.leaguePoints} LP</p>*/}
                {/*        <p>-</p>*/}
                {/*        <p>{getTotalLP(TFTRankData.tier, TFTRankData.rank, TFTRankData.leaguePoints)}/2000 LP</p>*/}
                {/*    </div>*/}

                {/*    <div className="match-history-section">*/}
                {/*        <div className="matches-history">*/}


                {/*        </div>*/}
                {/*        <p>{getWinrate(TFTRankData.wins, TFTRankData.losses)}%</p>*/}
                {/*    </div>*/}

                {/*</div>*/}
            </div>

            <div className={styles.titleSection}>
                <h1>.</h1>
                <h1>RETROUVE MOI SUR LES RESEAUX</h1>
                <h1>.</h1>
            </div>

            <div className={styles.SNSection}>
                <a href="https://www.tiktok.com/@akgamii" className={styles.SNCard} target="_blank" rel="noreferrer">
                    <Image src="/tiktokLogo.png" width={30} height={30} alt="Logo Tiktok"/>
                    <p>TIKTOK</p>
                </a>
                <a href="https://x.com/akgamiii" className={styles.SNCard} target="_blank" rel="noreferrer">
                    <Image src="/xLogo.png" width={30} height={30} alt="Logo X"/>
                    <p>X</p>
                </a>
                <a href="https://www.twitch.tv/akgamiitv" className={styles.SNCard} target="_blank" rel="noreferrer">
                    <Image src="/twitchLogo.png" width={30} height={30} alt="Logo Twitch"/>
                    <p>TWITCH</p>
                </a>
            </div>

            <div className={styles.titleSection}>
                {/*eslint-disable-next-line*/}
                <h1>///</h1>
                {/*eslint-disable-next-line*/}
                <h1>///</h1>
            </div>
        </>
    );
}
