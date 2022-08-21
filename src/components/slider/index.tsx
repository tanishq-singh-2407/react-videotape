import { useRef, useState, useEffect } from "react";
import classNames from "../../utils/basic/classNames";
import getRelativePosition from "../../utils/html/getRelativePosition";

type props = {
    className?: string;
    onChange: (slided: number) => void;
    value?: number;
    onHoverFat?: boolean;
};

const Slider = ({ className, onChange, value, onHoverFat }: props) => {
    const [hover, setHover] = useState<boolean>(false);
    const [sliding, setSliding] = useState<boolean>(false);
    const slider = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const slider_current: HTMLDivElement | null = slider.current;

        if (!slider_current) return;

        const mouseDownHandler = () => {
            setHover(true);
            document.addEventListener("mousemove", mouseMoveHandler);
            document.addEventListener("mouseup", mouseUpHandler);
        };

        const mouseMoveHandler = (e: MouseEvent) => {
            setHover(true);
            setSliding(true);
            onChange(getRelativePosition(e, slider_current).x);
        };

        const mouseUpHandler = () => {
            if (sliding)
                setHover(false);

            setSliding(false);
            document.removeEventListener("mousemove", mouseMoveHandler);
            document.removeEventListener("mouseup", mouseUpHandler);
        };

        const touchStart = (e: TouchEvent) => {
            setHover(true);
            setSliding(true);
            onChange(getRelativePosition(e, slider_current).x);
        };

        const touchEnd = () => {
            setHover(false);
            setSliding(false);
        };

        slider_current.addEventListener("mouseenter", () => setHover(true));
        slider_current.addEventListener("mouseleave", () => setHover(false));
        slider_current.addEventListener("mousedown", mouseDownHandler);
        slider_current.addEventListener("touchmove", touchStart);
        slider_current.addEventListener("touchend", touchEnd);
        slider_current.addEventListener("click", ev => onChange(getRelativePosition(ev, slider_current).x));

        // eslint-disable-next-line 
    }, []);

    return (
        <div className={`h-4 w-full flex justify-center items-center relative bg-transparent ${className}`}>
            <div className="h-4 w-full flex justify-center items-center absolute cursor-pointer z-20" ref={slider} >
                <div className="w-full flex justify-start items-center bg-[#ffffff4d] relative duration-150" style={{ height: (hover && (onHoverFat ?? true)) ? ".625rem" : ".25rem" }}>
                    <div
                        className={classNames(
                            "h-full",
                            hover ? "bg-[#1db954]" : "bg-white"
                        )}
                        style={{
                            width: `${(value ?? 0) * 100}%`,
                            transitionDuration: sliding ? '50ms' : '300ms'
                        }}
                    />

                    <div
                        className="rounded-full bg-white absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                        style={{
                            opacity: hover ? 100 : 0,
                            left: `${(value ?? 0) * 100}%`,
                            transitionDuration: sliding ? '50ms' : '150ms',
                            height: hover ? ((onHoverFat ?? true) ? "1rem" : ".6rem") : ".25rem",
                            width: hover ? ((onHoverFat ?? true) ? "1rem" : ".6rem") : ".25rem"
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Slider