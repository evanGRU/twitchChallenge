"use client";

import {useEffect, useState} from "react";
import {getLolRank, getTotalLP} from "@/tools/functions";
import styles from './page.module.scss';
import {LinkArrowIcon, TiktokIcon, TwitchIcon, XIcon} from "@/tools/svgFiles";

export default function Home() {
    const [lolRankData, setLolRankData] = useState(null);
    const [timeLeft, setTimeLeft] = useState({});
    const [areDataLoaded, setAreDataLoaded] = useState(false);

    useEffect(() => {
        getLolRank().then(data => {
            const soloData = data.find(rankedData => rankedData.queueType === "RANKED_SOLO_5x5");
            const flexData = data.find(rankedData => rankedData.queueType === "RANKED_FLEX_SR");

            if (soloData) {
                setLolRankData(prev => ({
                    ...prev,
                    solo: soloData
                }));
            } else {
                setLolRankData(prev => ({
                    ...prev,
                    solo: {
                        isUnranked: true
                    }
                }));
            }

            if (flexData) {
                setLolRankData(prev => ({
                    ...prev,
                    flex: flexData
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
    }, [])


    useEffect(() => {
        const targetDate = "2025-10-22T00:00:00";
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


    const challengeHasStarted = () => {
        const startDate = new Date("2025-10-02T13:00:00");
        const currentDate = new Date();

        return currentDate >= startDate;
    };


    return areDataLoaded && (
        <main className={styles.main}>
            <img src="/BlueBackground.svg" alt="Background" className={styles.background}/>

            <div className={styles.content}>

                <div className={styles.header}>
                    <p>EMERALD CHALLENGE</p>
                    <div className={styles.separatorBar}></div>
                    <p className={styles.textBlue}>AKGAMII</p>
                </div>

                <div className={styles.rankContainer}>
                    <h1>Progression <span>du challenge</span></h1>
                    <div className={styles.rankCard}>
                        <div className={styles.iconContainer}>
                            <img
                                src="/LolSoloIcon.svg"
                                alt="Lol Solo Icon"
                                className={styles.rankIcon}
                            />
                        </div>

                        <div className={styles.contentContainer}>
                            <div className={styles.contentRank}>
                                <p>{lolRankData.solo.isUnranked ? 'UNRANKED' : (lolRankData.solo.tier + ' ' + lolRankData.solo.rank)}</p>
                                <p>{lolRankData.solo.isUnranked ? '' : '-'}</p>
                                <p className={styles.textBlue}>{lolRankData.solo.isUnranked ? '' : lolRankData.solo.leaguePoints + ' LP'}</p>
                            </div>

                            <p className={styles.contentTotal}>
                                {lolRankData.solo.isUnranked ? '---' :
                                    getTotalLP(lolRankData.solo.tier, lolRankData.solo.rank, lolRankData.solo.leaguePoints) >= 2000 ? 'Completed':
                                        getTotalLP(lolRankData.solo.tier, lolRankData.solo.rank, lolRankData.solo.leaguePoints) + ' / 2000 LP'
                                }
                            </p>
                        </div>
                    </div>

                    <div className={styles.rankCard}>
                        <div className={styles.iconContainer}>
                            <img
                                src="/TftIcon.svg"
                                alt="Tft Rank Icon"
                                className={styles.rankIcon}
                            />
                        </div>

                        <div className={styles.contentContainer}>
                            <div className={styles.contentRank}>
                                <p>PLATINUM III</p>
                                <p>-</p>
                                <p className={styles.textBlue}>58 LP</p>
                            </div>

                            <p className={styles.contentTotal}>
                                {getTotalLP('PLATINUM', 'III', 58) >= 2000 ? 'completed' : getTotalLP('PLATINUM', 'III', 58) + ' / 2000 LP'}
                            </p>
                        </div>
                    </div>

                    <div className={styles.rankCard}>
                        <div className={styles.iconContainer}>
                            {/*<img*/}
                            {/*    src="/LolFlexIcon.svg"*/}
                            {/*    alt="Lol Flex Icon"*/}
                            {/*    className={styles.rankIcon}*/}
                            {/*/>*/}
                            <h1>?</h1>
                        </div>

                        <div className={styles.contentContainer}>
                            {/*<div className={styles.contentRank}>*/}
                            {/*    <p>{lolRankData.flex.isUnranked ? 'UNRANKED' : (lolRankData.flex.tier + ' ' + lolRankData.flex.rank)}</p>*/}
                            {/*    <p>{lolRankData.flex.isUnranked ? '' : '-'}</p>*/}
                            {/*    <p className={styles.textBlue}>{lolRankData.flex.isUnranked ? '' : lolRankData.flex.leaguePoints + ' LP'}</p>*/}
                            {/*</div>*/}

                            {/*<p className={styles.contentTotal}>*/}
                            {/*    {lolRankData.flex.isUnranked ? '---' : getTotalLP(lolRankData.flex.tier, lolRankData.flex.rank, lolRankData.flex.leaguePoints) + ' / 2000 LP'}*/}
                            {/*</p>*/}

                            <div className={styles.contentRank}>
                                ???
                            </div>

                            <p className={styles.contentTotal}>
                                ???
                            </p>
                        </div>
                    </div>
                </div>


                <div className={styles.timeContainer}>
                    <div className={styles.timeTitle}>
                        <h1>{challengeHasStarted() ? 'Temps restant' : 'Début du challenge | 02/10 à 13h00'}</h1>
                    </div>

                    <div className={styles.timer} id={"animatedText"}>
                        { challengeHasStarted() ? (
                            <>
                                <p>
                                    {timeLeft.days}
                                    <span className={styles.timeLetter}>j</span>
                                </p>

                                <p>
                                    {timeLeft.hours}
                                    <span className={styles.timeLetter}>h</span>
                                </p>

                                <p>
                                    {timeLeft.minutes}
                                    <span className={styles.timeLetter}>m</span>
                                </p>

                                <p>
                                    {timeLeft.seconds}
                                    <span className={styles.timeLetter}>s</span>
                                </p>
                            </>
                        ) : (<p>STARTING SOON</p>)}
                    </div>
                </div>

                <div className={styles.socialMobileContainer}>
                    <a href="https://www.twitch.tv/akgamiitv">
                        <TwitchIcon/>
                    </a>

                    <a href="https://www.tiktok.com/@akgamii">
                        <TiktokIcon/>
                    </a>

                    <a href="https://x.com/akgamiii">
                        <XIcon/>
                    </a>
                </div>

                <div className={styles.socialComputerContainer}>
                    <a href="https://www.twitch.tv/akgamiitv">
                        <LinkArrowIcon/>
                        twitch.tv/akgamiitv
                    </a>

                    <a href="https://www.tiktok.com/@akgamii">
                        <LinkArrowIcon/>
                        tiktok.com/akgamii
                    </a>

                    <a href="https://x.com/akgamiii">
                        <LinkArrowIcon/>
                        x.com/akgamiii
                    </a>
                </div>
            </div>

            <div className={styles.leftPictures}>
                <div className={styles.ekkoImage}>
                    <img src="/EkkoShadow.png" alt="Ekko Shadow"/>
                    <img src="/EkkoDesign.png" alt="Ekko Design"/>

                </div>
            </div>
        </main>
    );
}
