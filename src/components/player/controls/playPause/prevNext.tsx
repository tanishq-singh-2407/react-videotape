import { useEffect } from "react";
import { handleProps } from '../../../../types/components/player';
import { IoMdSkipBackward, IoMdSkipForward } from 'react-icons/io';

interface props extends handleProps {
    children: JSX.Element;
}

interface nextHandlerProps extends handleProps {
    autoPlay: boolean;
}

const handlePrev = ({ player, videos }: handleProps) => {
    const video: HTMLVideoElement | null = player.current;

    if (!video) return;

    const currentPlaying: string = video.src;
    const onAir: number = videos.findIndex((url) => url === currentPlaying);

    if (onAir === -1) return;

    if (onAir >= 1) {
        video.setAttribute("src", videos[onAir - 1]);
        video.load();
    }
}

const handleNext = ({ player, videos, autoPlay }: nextHandlerProps) => {
    const video: HTMLVideoElement | null = player.current;

    if (!video) return;
    if (!autoPlay) return;

    const currentPlaying: string = video.src;
    const onAir: number = videos.findIndex((url) => url === currentPlaying);

    if (onAir === -1) return;

    if (onAir + 2 <= videos.length) {
        video.setAttribute("src", videos[onAir + 1]);
        video.load();
    }
}

const PrevNext = ({ player, videos, children }: props) => {
    useEffect(() => {
        const video: HTMLVideoElement | null = player.current;

        if (!video) return;

        video.addEventListener("ended", () => handleNext({ player, videos, autoPlay: video.classList.contains("autoplay") }));

        document.addEventListener("keydown", (ev: KeyboardEvent) => {
            const { key } = ev;

            if (key === "P")
                handlePrev({ player, videos });

            else if (key === "N")
                handleNext({ player, videos, autoPlay: true });
        });
        // eslint-disable-next-line
    }, []);

    return (
        <div className="flex justify-evenly items-center w-full lg:gap-5">
            <div onClick={() => handlePrev({ player, videos })} className="cursor-pointer lg:hidden">
                <IoMdSkipBackward color="white" className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            {children}
            <div onClick={() => handleNext({ player, videos, autoPlay: true })} className="cursor-pointer">
                <IoMdSkipForward color="white" className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
        </div>
    )
}

export default PrevNext;