import { MutableRefObject, useEffect, useState } from "react";
import Slider from '../../../slider';
import { MdVolumeUp, MdVolumeOff } from 'react-icons/md';
import classNames from "../../../../utils/basic/classNames";

interface props {
    player: MutableRefObject<HTMLVideoElement | null>;
    className?: string;
}

interface handleProps {
    player: MutableRefObject<HTMLVideoElement | null>;
    val: number | null;
}

const handleChange = ({ val, player }: handleProps) => {
    const video: HTMLVideoElement | null = player.current;

    if (!video) return;

    if (!val) // Mute and Un-Mute
        video.muted = !video.muted;

    else // Adjust
        video.volume = val
};

const Volume = ({ player, className }: props) => {
    const [volume, setVolume] = useState<number>(1);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [hover, setHover] = useState<boolean>(false);

    var timeout: NodeJS.Timeout;
    const duration: number = 2000;

    const toggle = () => {
        setHover(true);

        clearTimeout(timeout);
        timeout = setTimeout(() => setHover(false), duration);
    }

    useEffect(() => {
        const video: HTMLVideoElement | null = player.current;

        if (!video) return;

        video.addEventListener("volumechange", () => {
            setVolume(video.volume);
            setIsMuted(video.muted);
            toggle();
        });

        document.addEventListener("keydown", (ev: KeyboardEvent) => {
            const { key } = ev;

            if (key === "M" || key === "m")
                handleChange({ player, val: null });

            else if (key === "ArrowUp") {
                video.muted = false;
                video.volume += .025;
            }

            else if (key === "ArrowDown")
                video.volume -= .025;
        });

        // eslint-disable-next-line
    }, []);

    return (
        <div
            className={className}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className="flex justify-center items-center relative">
                <div className="flex justify-center items-center cursor-pointer" onClick={() => handleChange({ player, val: null })}>
                    {
                        ((volume <= 0.01) || isMuted) ?
                            <MdVolumeOff color='white' className="h-6 w-6 sm:h-7 sm:w-7 lg:w-8 lg:h-8" /> :
                            <MdVolumeUp color='white' className="h-6 w-6 sm:h-7 sm:w-7 lg:w-8 lg:h-8" />
                    }
                </div>
                <div
                    className={classNames(
                        "h-full duration-300 flex justify-center items-center lgt:hidden lg:ml-2",
                        hover ? "w-20" : "w-0"
                    )}
                >
                    <Slider
                        value={((volume <= 0.01) || isMuted) ? 0 : volume}
                        onChange={val => handleChange({ player, val })}
                        onHoverFat={false}
                    />
                </div>
            </div>
        </div>
    )
}

export default Volume;