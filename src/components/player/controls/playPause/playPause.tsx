import React, { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react';
import { IoPlaySharp, IoPauseSharp } from 'react-icons/io5';

type props = {
    player: MutableRefObject<HTMLVideoElement | null>;
};

const handlePausePlay = (player: MutableRefObject<HTMLVideoElement | null>, setIsPlaying: Dispatch<SetStateAction<boolean>>) => {
    setIsPlaying((state) => {
        if (player.current) {
            if (state) {
                player.current.pause();
                return false;
            } else {
                player.current.play();
                return true;
            }
        } else return state;
    });
};

const PlayPause = ({ player }: props) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    useEffect(() => {
        const video: HTMLVideoElement | null = player.current;

        if (!video) return;

        video.addEventListener('play', () => setIsPlaying(true));
        video.addEventListener('pause', () => setIsPlaying(false));

        document.addEventListener('keydown', (ev: KeyboardEvent) => {
            if (!video) return;

            const { key } = ev;

            switch (key) {
                case 'ArrowRight':
                case 'l':
                case 'L':
                    video.currentTime += 10;
                    break;

                case 'ArrowLeft':
                case 'j':
                case 'J':
                    video.currentTime -= 10;
                    break;

                case ' ':
                case 'k':
                case 'K':
                    handlePausePlay(player, setIsPlaying);
                    break;

                default:
                    break;
            }
        });

        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <div onClick={() => handlePausePlay(player, setIsPlaying)} className="cursor-pointer">
                {isPlaying ? <IoPauseSharp color="white" className="h-10 w-10 sm:h-14 sm:w-14 lg:h-9 lg:w-9" /> : <IoPlaySharp color="white" className="h-10 w-10 sm:h-14 sm:w-14 lg:h-9 lg:w-9" />}
            </div>
        </div>
    );
};

export default PlayPause;
