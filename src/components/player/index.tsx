import { SyntheticEvent, useRef } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import iOS from '../../utils/basic/iOS';
import classNames from "../../utils/basic/classNames";
import Controls from './controls/index';

interface Skip {
    start?: number;
    last?: number;
};

type props = {
    videos: string[];
    skip?: Skip;
    rate?: number;
    onError?: (error: MediaError | null, player: HTMLVideoElement) => void;
}

const onLoadedMetadata = async (ev: SyntheticEvent<HTMLVideoElement, Event>, rate?: number, skip?: Skip) => {
    const video = (ev.target as HTMLVideoElement);

    const localRate: string | null = localStorage.getItem("video-playbackrate");

    if (!Number.isNaN(Number(localRate)) && localRate !== " " && Number(localRate) !== 0)
        video.playbackRate = Number(localRate);

    else
        video.playbackRate = rate ?? 1;

    video.currentTime = skip?.start ?? 0;

    await video.play();
}

const videoClassNames = classNames(
    "h-full w-full",
    iOS() ? "" : "pointer-events-none",
    localStorage.getItem("autoplay") === "okay" ? "autoplay" : ""
)

const Player = ({ videos, rate, skip, onError }: props): JSX.Element => {
    const player = useRef<HTMLVideoElement | null>(null);
    const videoScreenHandle = useFullScreenHandle();

    return (
        <FullScreen handle={videoScreenHandle} className='h-full w-full flex justify-center items-center'>
            <section className="w-full h-full flex justify-center items-center relative bg-black">
                <div className="h-full w-full flex justify-center items-center relative">
                    {!iOS() && <div className="h-full w-full absolute top-0 z-20 pointer-events-none" />}
                    <video
                        src={videos[0]}
                        controls={false}
                        className={videoClassNames}
                        onLoadedMetadata={ev => onLoadedMetadata(ev, rate, skip)}
                        playsInline
                        webkit-playsinline="true"
                        ref={player}
                        onError={ev => onError && onError((ev.target as HTMLVideoElement).error, ev.target as HTMLVideoElement)}
                    />
                </div>

                <div className="absolute z-40 h-full w-full flex justify-center items-end p-4 pb-2 sm:p-5 lg:p-6 lg:px-4">
                    {player && <Controls player={player} videoScreenHandle={videoScreenHandle} videos={videos} />}
                </div>
            </section>
        </FullScreen>
    )
}

export default Player;