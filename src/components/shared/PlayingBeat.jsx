import styles from './../../styles/shared/PlayingBeat.module.css'

function PlayingBeat({onClick}) {
    return (
        <div className={`${styles['button-container']} cursor-pointer`} onClick={() => onClick(null)}>
            <div className={`${styles['col-1']} ${styles['col-28']}`}>
            </div>
            <div className={`${styles['col-2']} ${styles['col-28']}`}>
            </div>
            <div className={`${styles['col-3']} ${styles['col-29']}`}>
            </div>
            <div className={`${styles['col-4']} ${styles['col-29']}`}>
            </div>
        </div>
    )
}

export default PlayingBeat