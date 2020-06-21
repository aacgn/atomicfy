import { createAtom } from "@aacgn/atomic";
import "./index.css";

const HighlightText = (textContent, clickFunction = null) => createAtom(
    {
        className: "highlight__text", 
        textContent: textContent,
        onClick: () =>  {
            clickFunction()
        }
    },
    "span"
);

export default HighlightText;