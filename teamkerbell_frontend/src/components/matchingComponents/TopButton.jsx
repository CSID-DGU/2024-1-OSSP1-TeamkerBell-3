import { useEffect, useState } from "react";
import styles from "./TopButton.module.css";

function TopButton() {

    const [showButton, setShowButton] = useState(false);

    const scrollToTop = () => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        })

    }
    useEffect(() => {
        const handleShowButton = () => {
            if (window.scrollY > 200) {
                setShowButton(true)
            } else {
                setShowButton(false)
            }
        }

        console.log(window.scrollY)
        window.addEventListener("scroll", handleShowButton)
        return () => {
            window.removeEventListener("scroll", handleShowButton)
        }
    }, [])

    return showButton && (
        <div className={styles.scroll__container}>
            <button class={styles.top} onClick={scrollToTop} type="button">
                <img src="/KeyboardArrowUp.png" alt="top" className={styles.up}></img>
            </button>
        </div>

    )
}

export default TopButton;
