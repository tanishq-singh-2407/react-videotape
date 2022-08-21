import { useEffect, MutableRefObject } from 'react';
import { FullScreenHandle } from 'react-full-screen';
import iOS from '../../../../utils/basic/iOS';
import { BsFullscreen, BsFullscreenExit } from 'react-icons/bs';

interface props {
    player: MutableRefObject<HTMLVideoElement | null>;
    toggleHandle: FullScreenHandle;
    className?: string;
}

const handleClick = async (player: MutableRefObject<HTMLVideoElement | null>, toggleHandle: FullScreenHandle) => {
    const video: HTMLVideoElement | null = player.current;

    if (!video) return;

    try {
        if (document.fullscreenElement)
            await toggleHandle.exit();

        else {
            if (iOS())
                await (video as any).webkitEnterFullScreen();

            else
                await toggleHandle.enter();
        }
    } catch (error) {
        alert((error as any).message);
    }
}

const ToggleScreen = ({ toggleHandle, player, className }: props) => {
    useEffect(() => {
        document.addEventListener("keydown", async (ev: KeyboardEvent) => {
            const { key } = ev;

            if (key === "F" || key === "f")
                await handleClick(player, toggleHandle);
        });

        // eslint-disable-next-line
    }, [])

    return (
        <div className={className}>
            <div onClick={async () => await handleClick(player, toggleHandle)} className="cursor-pointer">
                {
                    toggleHandle.active ?
                        <BsFullscreenExit color="white" strokeWidth={1.5} className="h-4 w-4 lg:h-5 lg:w-5" /> :
                        <BsFullscreen color="white" strokeWidth={1.5} className="h-4 w-4 lg:h-5 lg:w-5" />
                }
            </div>
        </div>
    )
}

export default ToggleScreen