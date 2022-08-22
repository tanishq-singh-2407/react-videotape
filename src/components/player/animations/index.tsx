import React, { MutableRefObject, useEffect, useState } from 'react';
import ShowMiddle from './showMiddle';
import { IoPlaySharp, IoPauseSharp } from 'react-icons/io5';
import ShowTop from './showTop';

interface props {
    player: MutableRefObject<HTMLVideoElement | null>;
}

const Animations = ({ player }: props) => {
    const [top, setTop] = useState<JSX.Element | null>(null);
    const [left, setLeft] = useState<JSX.Element | null>(null);
    const [middle, setMiddle] = useState<JSX.Element | null>(null);
    const [right, setRight] = useState<JSX.Element | null>(null);

    useEffect(() => {
        const video: HTMLVideoElement | null = player.current;

        if (!video) return;

        video.addEventListener('play', () => setMiddle(<ShowMiddle children={<IoPlaySharp color="white" className="h-10 w-10 md:h-14 md:w-14" key={Math.random()} />} />));

        video.addEventListener('pause', () => setMiddle(<ShowMiddle children={<IoPauseSharp color="white" className="h-10 w-10 md:h-14 md:w-14" key={Math.random()} />} />));

        video.addEventListener('volumechange', () => {
            setTop(<ShowTop text={(video.volume * 100).toString().concat('%')} key={Math.random()} />);
        });
        video.addEventListener('ratechange', () => setTop(<ShowTop text={video.playbackRate.toString().concat('x')} key={Math.random()} />));

        video.addEventListener('seeking', () => {});
    }, []);

    useEffect(() => {
        setTimeout(() => setMiddle(null), 300);
    }, [middle]);
    useEffect(() => {
        setTimeout(() => setLeft(null), 300);
    }, [left]);
    useEffect(() => {
        setTimeout(() => setRight(null), 300);
    }, [right]);
    useEffect(() => {
        setTimeout(() => setTop(null), 300);
    }, [top]);

    return (
        <div className="h-full w-full flex flex-col justify-start items-center">
            <div className="h-1/4 w-full flex justify-center items-end">
                <div className="h-14 aspect-video rounded-md flex justify-center items-center shadow-md lgt:hidden">{top}</div>
            </div>
            <div className="h-2/4 w-5/6 relative flex justify-center items-center">
                {left}
                {middle}
                {right}
            </div>
        </div>
    );
};

export default Animations;
