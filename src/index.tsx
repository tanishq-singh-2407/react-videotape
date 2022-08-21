import '../styles/global.css';
import React from "react";

interface props {
    name: string;
}

const SayHello = ({ name }: props): JSX.Element => {    
    return (
        <div className='h-full w-full flex justify-center items-center'>
            <span className='text-red-800 hover:text-blue-500 duration-300 p-3 border border-slate-800 rounded-md cursor-pointer'>Hey {name}, say hello to TypeScript.</span>
        </div>
    );
}

export {
    SayHello
};