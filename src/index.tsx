import '../styles/global.css';
import React from "react";

interface props {
    name: string;
}

const SayHello = ({ name }: props): JSX.Element => {    
    return (
        <div className='text-red-800 p-3 border border-slate-800 rounded-md'>Hey {name}, say hello to TypeScript.</div>
    );
}

export default SayHello;