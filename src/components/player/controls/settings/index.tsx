import { MutableRefObject } from 'react';
import { MdSettings } from 'react-icons/md';

interface props {
    player: MutableRefObject<HTMLVideoElement | null>;
    className?: string;
}

const Settings = ({ className }: props) => {
    return (
        <div className={className}>
            <div className="cursor-pointer">
                <MdSettings color="white" className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
        </div>
    )
}

export default Settings 