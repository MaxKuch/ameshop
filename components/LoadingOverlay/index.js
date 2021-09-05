import styles from './LoadingOverlay.module.scss'
import { Spin } from 'antd'

export default function LoadingOverlay({visible}) {
    return (
        visible ? <div className={styles.loadingOverlay}><Spin size="large" /></div> : ''
    )
}