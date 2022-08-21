import { MutableRefObject, useEffect, useState } from "react";

interface props {
    player: MutableRefObject<HTMLVideoElement | null>;
    className?: string;
}


const PlayBackRate = ({ player, className }: props) => {
    const [rate, setRate] = useState<number | null>(null);

    useEffect(() => {
        const video: HTMLVideoElement | null = player.current;

        if (!video) return;

        const rateChangeHandler = (rateChange: number) => setRate(state => {
            if (state && ((state + rateChange) <= 6)) {
                const newRate: number = state + rateChange;

                video.playbackRate = newRate;
                localStorage.setItem("video-playbackrate", newRate.toString());

                return newRate;
            }

            else return state;
        });


        video.onplay = () => setRate(video.playbackRate);
        video.onratechange = () => setRate(video.playbackRate);

        document.addEventListener("keydown", (ev: KeyboardEvent) => {
            const { key } = ev;

            if (key === ">")
                rateChangeHandler(.25);

            else if (key === "<")
                rateChangeHandler(-.25);

        })
        // eslint-disable-next-line
    }, []);

    return (
        <div className={className}>
            {rate}
        </div>
    )
}

export default PlayBackRate 