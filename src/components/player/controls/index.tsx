import React, { MutableRefObject, useEffect, useRef } from 'react';
import { FullScreenHandle } from 'react-full-screen';
import { PlayPauseSet, Volume, ProgressBar, Settings, ToggleScreen, Duration, PlayBackRate, AutoPlay } from './imports';
import hideElement from '../../../utils/html/hideElement';
import showElement from '../../../utils/html/showElement';

interface props {
    player: MutableRefObject<HTMLVideoElement | null>;
    videos: string[];
    videoScreenHandle: FullScreenHandle;
}

const Controls = ({ player, videos, videoScreenHandle }: props) => {
    const controls = useRef<HTMLDivElement | null>(null);

    var timeout: NodeJS.Timeout;
    const duration: number = 3000;

    const toggle = () => {
        showElement(controls);

        clearTimeout(timeout);
        timeout = setTimeout(() => hideElement(controls), duration);
    };

    useEffect(() => {
        const controls_current: HTMLDivElement | null = controls.current;
        const video: HTMLVideoElement | null = player.current;

        if (!controls_current) return;

        controls_current.addEventListener('mousemove', toggle);
        controls_current.addEventListener('focus', toggle);
        controls_current.addEventListener('touchstart', toggle);
        controls_current.addEventListener('touchmove', toggle);

        if (!video) return;
        video.addEventListener('play', toggle);
        video.addEventListener('pause', toggle);
        video.addEventListener('seeking', toggle);
        video.addEventListener('volumechange', toggle);
        video.addEventListener('fullscreenchange', toggle);
        video.addEventListener('ended', toggle);
        video.addEventListener('ratechange', toggle);

        // eslint-disable-next-line
    }, []);

    return (
        <div ref={controls} className="relative h-full w-full flex flex-col opacity-0 lg:justify-end items-center duration-300">
            <div className="w-full h-4 lgt:absolute lgt:bottom-1 flex justify-center items-center lgt:px-2">
                <ProgressBar player={player} className="w-full" />
            </div>

            <div className="w-full lgt:absolute h-full lg:h-fit flex items-center lg:mt-2 px-3 pr-4">
                <PlayPauseSet player={player} videos={videos} className="lgt:w-full lgt:max-w-2xl lgt:absolute lgt:top-1/2 lgt:left-1/2 lgt:-translate-x-1/2 lgt:-translate-y-1/2" />
                <Volume player={player} className="lgt:absolute lgt:top-0 lgt:left-0 lg:ml-6" />
                <Duration player={player} className="lgt:absolute bottom-6 lg:bottom-0 md:bottom-8 lg:mr-auto lg:ml-6" />

                <PlayBackRate player={player} />

                <AutoPlay player={player} className="lgt:absolute lgt:top-[2px] right-8 sm:right-8 md:right-9 lg:right-0 lg:ml-auto lg:mr-6" />
                <Settings player={player} className="lgt:absolute lgt:top-0 lgt:right-0 lg:mr-6" />
                <ToggleScreen toggleHandle={videoScreenHandle} player={player} className="lgt:absolute bottom-6 lg:bottom-0 md:bottom-8 lgt:right-2" />
            </div>
        </div>
    );
};

export default Controls;
