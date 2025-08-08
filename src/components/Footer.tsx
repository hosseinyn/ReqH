import "../styles/footer.css";
import { useResultContext } from "../pages/MainPage";
import React from "react";

const Footer = () => {
    const responseResultContext = useResultContext()
    if (!responseResultContext) throw new Error("Result content is not available")
    const {responseResult} = responseResultContext
    return(
        <>
        <footer>
            <div className="footer-result-box">
                <textarea readOnly value={responseResult}></textarea>
            </div>
        </footer>
        </>
    );
}

export default Footer;