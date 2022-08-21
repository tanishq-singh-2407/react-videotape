import { useEffect, useState } from "react";
import classNames from "../../utils/basic/classNames";

const ShortCuts = () => {
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        document.addEventListener("keydown", (ev: KeyboardEvent) => {
            const { key } = ev;

            if (key === "?")
                setVisible(state => !state);

            if (key === "Escape")
                setVisible(false);
        });
        // eslint-disable-next-line
    }, []);

    return (
        <div
            className={classNames(
                "h-full w-full top-0 bottom-0 left-0 right-0 absolute justify-center items-center z-[99999999999] backdrop-blur-[2px]",
                visible ? "flex" : "hidden"
            )}
        >
            <div className="h-[90%] w-[90%] flex justify-center items-center bg-slate-100 rounded-md border-2 border-slate-800">
                <h1>shortcuts</h1>
            </div>
        </div>
    )
}

export default ShortCuts 