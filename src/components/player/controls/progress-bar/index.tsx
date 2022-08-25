import React, { MutableRefObject, useEffect, useState } from 'react';
import { Slider } from 'react-slid';

interface props {
    player: MutableRefObject<HTMLVideoElement | null>;
    className?: string;
}

const handleChange = (ev: number, player: MutableRefObject<HTMLVideoElement | null>) => {
    const video: HTMLVideoElement | null = player.current;
    if (!video) return;

    video.currentTime = ev * video.duration;
};

const ProgressBar = ({ player, className }: props) => {
    const [played, setPlayed] = useState<number>(0);

    useEffect(() => {
        const video: HTMLVideoElement | null = player.current;

        if (!video) return;

        video.addEventListener('timeupdate', () => setPlayed(isNaN(video.duration) ? 0 : video.currentTime / video.duration));
        video.addEventListener('seeking', () => setPlayed(isNaN(video.duration) ? 0 : video.currentTime / video.duration));

        document.addEventListener('keydown', (ev: KeyboardEvent) => {
            const { key } = ev;

            if (!Number.isNaN(Number(key)) && key !== ' ') video.currentTime = (Number(key) / 10) * video.duration;
        });

        // eslint-disable-next-line
    }, []);

    return (
        <div className={className}>
            <Slider onChange={(val: number) => handleChange(val, player)} value={played} />
        </div>
    );
};

export default ProgressBar;
