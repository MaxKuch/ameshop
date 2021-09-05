import styles from './ModalWrapper.module.scss'
import classNames from 'classnames'

export default function ModalWrapper({ children, handleCancel }) {
    return (
    <div className={classNames(styles.modal, 'ant-modal-content')}>
        <button className={classNames(styles.modalClose, 'mini-btn mini-btn--disabled')} onClick={handleCancel}>&times;</button>
        {children}
    </div>
    )
}