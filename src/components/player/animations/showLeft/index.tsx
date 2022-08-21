interface props {
    children: JSX.Element;
    lower?: string;
}

const ShowLeft = ({ children, lower }: props) => {
    return (
        <div className="h-5/6 max-h-28 aspect-square absolute animate-wiggle rounded-full bg-[#181818] bg-opacity-80 shadow-md flex flex-col justify-center items-center">
            <div className="h-full w-full flex justify-center items-center rounded-fullbg-[#181818] bg-opacity-80 shadow-md">
                {children}
                {lower && <span className="absolute bottom-0 -translate-y-1/2 md:-translate-y-full text-xs text-center font-normal text-white">{lower}</span>}
            </div>
        </div>
    )
}

export default ShowLeft;