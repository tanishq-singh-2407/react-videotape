import React from "react";

interface props {
    name: string;
}

const SayHello = ({ name }: props): JSX.Element => {    
    return (
        <div>Hey {name}, say hello to TypeScript.</div>
    );
}

export default SayHello;