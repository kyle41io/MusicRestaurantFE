'use client'

import styles from '@/styles/shared/PagingBar.module.css'
import { useTranslations } from 'next-intl';

function PagingBar({ currentPage = 1, onClick, maxPage }) {

    const t = useTranslations("Home")

    const handleClick = (item) => {
        onClick(item);
    }

    const handlePrevious = () => {
        if (currentPage > 1) {
            onClick(currentPage - 1);
        }
    }

    const handleNext = () => {
        if (currentPage < maxPage) {
            onClick(currentPage + 1);
        }
    }

    const rerenderArray = (currentPage) => {
        let result = [];
        switch (currentPage) {
            case 1:
                result = [currentPage + 1, currentPage + 2];
                break;
            case 2:
                result = [currentPage, currentPage + 1];
                break;
            case 4:
                result = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1]
                break;
            case maxPage - 3:
                result = [currentPage - 1, currentPage, currentPage + 1, currentPage + 2]
                break;
            case maxPage - 1:
                result = [currentPage - 1, currentPage]
                break;
            case maxPage:
                result = [currentPage - 2, currentPage - 1]
                break;
            default:
                result = [currentPage - 1, currentPage, currentPage + 1]
                break;
        }
        return result;
    }

    return (
        <div className={styles['main-bar']}>
            <button onClick={handlePrevious}>
                {t("previous")}
            </button>
            <div className={styles['page-number-choser']}>
                <div className={`${styles.numbers} ${currentPage == 1 ? styles.chosen : ''}`} onClick={() => onClick(1)}>
                    1
                </div>
                {currentPage > 4 && <div className="w-5 h-5 justify-center flex">
                    ...
                </div>}
                {rerenderArray(currentPage).map((item, index) =>
                    <div className={`${currentPage == item ? styles['chosen'] : ""} ${styles.numbers}`} onClick={() => handleClick(item)} key={index}>
                        {item}
                    </div>)}
                {currentPage < maxPage - 3 && <div className="w-5 h-5 justify-center flex">
                    ...
                </div>}
                <div className={`${styles.numbers} ${currentPage == maxPage ? styles.chosen : ''}`} onClick={() => onClick(maxPage)}>
                    {maxPage}
                </div>
            </div>
            <button onClick={handleNext}>
                {t("next")}
            </button>
        </div>
    )
}


export default PagingBar