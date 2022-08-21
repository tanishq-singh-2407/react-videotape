import { MutableRefObject, useEffect, useState } from "react";

interface props {
    className?: string;
    player: MutableRefObject<HTMLVideoElement | null>;
}


const AutoPlay = ({ className, player }: props) => {
    const [autoPlay, setAutoPlay] = useState<boolean>(localStorage.getItem("autoplay") === "okay");

    const handleClick = (set: boolean) => {
        const video = player.current;
        if (!video) return;

        if (set)
            video.classList.add("autoplay");

        else
            video.classList.remove("autoplay");

        setAutoPlay(set);
        localStorage.setItem("autoplay", set ? "okay" : "na-na");
    }

    useEffect(() => {
        document.addEventListener("keydown", (ev: KeyboardEvent) => {
            const { key } = ev;

            if (key === "A")
                handleClick(!autoPlay);
        });

        // eslint-disable-next-line
    }, []);

    return (
        <div className={className}>
            <div className="flex justify-center items-center scale-75 sm:scale-90 h-5 sm:h-6">
                <label htmlFor="small-toggle" className="inline-flex relative items-center justify-center cursor-pointer">
                    <input type="checkbox" checked={autoPlay} id="small-toggle" className="sr-only peer" onChange={(e) => handleClick(e.target.checked)} />
                    <div className="w-9 h-5 bg-gray-200 rounded-full duration-300 peer peer-checked:clicked peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:scale-150 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#1db954]"></div>
                </label>
            </div>
        </div>
    )
}

export default AutoPlay;