import React from 'react';
import { Player } from '../../src';

export const Home = () => {
    return (
        <div className="h-full w-full">
            <main className="h-full w-full flex flex-col justify-evenly items-center">
                <div className="w-full aspect-video flex justify-center items-center max-w-xs md:max-w-3xl">
                    <Player
                        videos={['http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4']}
                        rate={2}
                        skip={{
                            last: 0,
                            start: 10
                        }}
                    />
                </div>
            </main>
        </div>
    );
};
