import React from 'react';

interface props {
    text: string;
}

const ShowTop = ({ text }: props) => {
    return (
        <div className="h-full w-full animate-wiggle bg-[#181818] bg-opacity-80 rounded-md flex justify-center items-center">
            <span className="text-xl text-center font-medium text-white">{text}</span>
        </div>
    );
};

export default ShowTop;
