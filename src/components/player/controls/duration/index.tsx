import { MutableRefObject, useEffect, useState } from "react";
import * as moment from 'moment-timezone';
import MomentDurationSetup from 'moment-duration-format';

interface props {
    player: MutableRefObject<HTMLVideoElement | null>;
    className?: string;
}

const getDuration = (seconds: number | typeof NaN): string => {
    if (isNaN(seconds))
        return '00:00';

    else {
        const dur: string = moment.duration(seconds, "seconds").format("dd:hh:mm:ss");
        return dur.length === 2 ? "0:".concat(dur) : dur;
    }
}

const Duration = ({ player, className }: props) => {
    const [totalDuration, setTotalDuration] = useState<string>("00:00");
    const [playedDuration, setPlayedDuration] = useState<string>("00:00");

    useEffect(() => {
        MomentDurationSetup(moment);
        const video: HTMLVideoElement | null = player.current;

        if (!video) return;

        const updateDuration = (): void => setPlayedDuration(getDuration(video.currentTime))

        video.addEventListener("durationchange", () => setTotalDuration(getDuration(video.duration)));
        video.addEventListener("timeupdate", updateDuration);
        video.addEventListener("seeking", updateDuration);

        // eslint-disable-next-line
    }, []);

    return (
        <div className={className}>
            <div className="flex justify-center items-center">
                {<span className="text-white font-medium lg:font-light text-xs sm:text-sm md:text-base">{playedDuration}</span>}
                {<span className="text-white font-medium lg:font-light text-xs sm:text-sm md:text-base opacity-90">/{totalDuration}</span>}
            </div>
        </div>
    )
}

export default Duration