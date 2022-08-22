import React from 'react';
import PlayPause from './playPause';
import PrevNext from './prevNext';
import { handleProps } from '../../../../types/components/player';

const PlayPauseSet = ({ player, videos, className }: handleProps) => {
    return (
        <div className={className}>
            <PrevNext player={player} videos={videos}>
                <PlayPause player={player} />
            </PrevNext>
        </div>
    );
};

export default PlayPauseSet;
