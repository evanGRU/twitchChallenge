"use client";

import {useEffect, useState} from "react";
import {PUUID, twitchParents} from "@/tools/params";
import {getFlexMatches, getLolRank, getSoloMatches, getTotalLP, getWinrate} from "@/tools/functions";
import styles from './page.module.scss';
import Image from "next/image";

export default function Home() {
    const [lolRankData, setLolRankData] = useState(null);
    // const [TFTRankData, setTFTRankData] = useState(null);
    const [soloMatches, setSoloMatches] = useState([]);
    const [flexMatches, setFlexMatches] = useState([]);
    const [timeLeft, setTimeLeft] = useState({});
    const [areDataLoaded, setAreDataLoaded] = useState(false);

    useEffect(() => {
        getLolRank().then(data => {
            const soloDuoData = data.find(rankedData => rankedData.queueType === "RANKED_SOLO_5x5");
            const flexData = data.find(rankedData => rankedData.queueType === "RANKED_FLEX_SR");

            if (soloDuoData) {
                setLolRankData(prev => ({
                    ...prev,
                    soloDuo: soloDuoData
                }));
            } else {
                setLolRankData(prev => ({
                    ...prev,
                    soloDuo: {
                        isUnranked: true
                    }
                }));
            }

            if (flexData) {
                setLolRankData(prev => ({
                    ...prev,
                    soloDuo: flexData
                }));
            } else {
                setLolRankData(prev => ({
                    ...prev,
                    flex: {
                        isUnranked: true
                    }
                }));
            }
            setAreDataLoaded(true);
        });
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

    return areDataLoaded && (
        <main className={styles.main}>
            <div className={styles.heroSection}>
                <div className={styles.titleSection}>
                    {/*eslint-disable-next-line*/}
                    <h1>///</h1>
                    <h1>EMERALD CHALLENGE</h1>
                    {/*eslint-disable-next-line*/}
                    <h1>///</h1>
                </div>

                <div className={styles.twitchSection}>

                    <div className={styles.headerContainer}>
                        <div className={styles.headerTitle}>
                            <h2>PRÉSENTATION DU CHALLENGE : </h2>
                        </div>
                        <div className={styles.headerContent}>
                            <p>Je me donne 30 jours pour atteindre le rank émeraude sur les 3 modes classés de LOL et TFT.</p>
                            <div className={styles.headerContentRanks}>
                                <p>- SOLO/DUO (LOL) •• PEAK EMERAUDE 3</p>
                                <p>- FLEX (LOL) •• PEAK PLAT 2</p>
                                <p>- RANKED (TFT) •• PEAK EMERAUDE 2</p>
                            </div>

                            <p>Retrouve moi en live tous les jours sur twitch de 14h à 17h (mic on) puis de 21h à 00H (mic off).</p>
                            <p>Que le challenge commence.</p>
                        </div>

                        <div className={styles.countdown}>
                            {timeLeft.expired ? (
                                <p>FIN DU CHALLENGE...</p>
                            ) : (
                                <p>
                                    TEMPS RESTANTS :
                                    <br/>
                                    {timeLeft.days}j {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                                </p>
                            )}
                        </div>
                    </div>
                    <iframe
                        src={`https://player.twitch.tv/?channel=akgamiiTV&parent=${twitchParents.emeraldChallenge}`}
                        allowFullScreen={true}
                    />
                </div>
            </div>

            <div className={styles.rankSection}>
                <div className={styles.titleSection}>
                    <h1>.</h1>
                    <h1>MES RANKS</h1>
                    <h1>.</h1>
                </div>

                <div className={styles.rankContainer}>
                    <div key={lolRankData.flex.queueType} className={styles.rankCard}>
                        <div className={styles.rankContent}>
                            <Image
                                src="/SoloBGCard.svg"
                                alt="Background card"
                                fill
                                className={styles.rankBackgroundCardImage}
                            />

                            <div className={styles.rankTexts}>
                                <div className={styles.rankIcon}>
                                    <Image
                                        src={lolRankData.soloDuo.isUnranked ? '/UNRANKED.png' : `/${lolRankData.soloDuo.tier}.png`}
                                        fill
                                        alt="rankIcon"
                                    />
                                </div>
                                <p>{lolRankData.soloDuo.isUnranked ? 'UNRANKED' : (lolRankData.soloDuo.tier + ' ' + lolRankData.soloDuo.rank)}</p>
                                <p>-</p>
                                <p>{lolRankData.soloDuo.isUnranked ? 0 : lolRankData.soloDuo.leaguePoints} LP</p>
                                <p>-</p>
                                <p>{lolRankData.soloDuo.isUnranked ? 0 : getTotalLP(lolRankData.soloDuo.tier, lolRankData.soloDuo.rank, lolRankData.soloDuo.leaguePoints)}/2000 LP</p>
                            </div>


                            <div className={styles.matchHistorySection}>
                                {!lolRankData.soloDuo.isUnranked && (
                                    <div className={styles.matchesHistory}>
                                        {soloMatches.map(match => {
                                            const myData = match.info.participants.find(p => p.puuid === PUUID);
                                            return (
                                                <span
                                                    key={match.metadata.matchId}
                                                    className={`${styles.matchIndicator} ${myData.win ? styles.win : styles.loss}`}
                                                />
                                            )
                                        })}

                                    </div>
                                )}
                                <p>{lolRankData.soloDuo.isUnranked ? 0 : getWinrate(lolRankData.soloDuo.wins, lolRankData.soloDuo.losses)}%</p>
                            </div>
                        </div>
                    </div>

                    <div key={lolRankData.flex.queueType} className={styles.rankCard}>
                        <div className={styles.rankContent}>
                            <Image
                                src="/FlexBGCard.svg"
                                alt="Background card"
                                fill
                                className={styles.rankBackgroundCardImage}
                            />

                            <div className={styles.rankTexts}>
                                <div className={styles.rankIcon}>
                                    <Image
                                        src={lolRankData.flex.isUnranked ? '/UNRANKED.png' : `/${lolRankData.flex.tier}.png`}
                                        fill
                                        alt="rankIcon"
                                    />
                                </div>
                                <p>{lolRankData.flex.isUnranked ? 'UNRANKED' : (lolRankData.flex.tier + lolRankData.flex.rank )}</p>
                                <p>-</p>
                                <p>{lolRankData.flex.isUnranked ? 0 : lolRankData.flex.leaguePoints} LP</p>
                                <p>-</p>
                                <p>{lolRankData.flex.isUnranked ? 0 : getTotalLP(lolRankData.flex.tier, lolRankData.flex.rank, lolRankData.flex.leaguePoints)}/2000 LP</p>
                            </div>


                            <div className={styles.matchHistorySection}>
                                {!lolRankData.flex.isUnranked && (
                                    <div className={styles.matchesHistory}>
                                        {flexMatches.map(match => {
                                            const myData = match.info.participants.find(p => p.puuid === PUUID);
                                            return (
                                                <span
                                                    key={match.metadata.matchId}
                                                    className={`${styles.matchIndicator} ${myData.win ? styles.win : styles.loss}`}
                                                />
                                            )
                                        })}

                                    </div>
                                )}
                                <p>{lolRankData.flex.isUnranked ? 0 : getWinrate(lolRankData.flex.wins, lolRankData.flex.losses)}%</p>
                            </div>
                        </div>
                    </div>
                </div>

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

            <div className={styles.footerSection}>
                <div className={styles.titleSection}>
                    <h1>.</h1>
                    <h1>RETROUVE MOI SUR LES RÉSEAUX</h1>
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
                    <p className={styles.copyrightText}>©Evan GRUCHOT</p>
                    {/*eslint-disable-next-line*/}
                    <h1>///</h1>
                </div>
            </div>
        </main>
    );
}
