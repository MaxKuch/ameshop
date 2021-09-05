import styles from './Button.module.scss'
import classNames from 'classnames'

export default function Button({ text, fill, small, onClick, type, danger, disabled }) {
    return (
        <button 
            type={type}
            onClick={onClick}
            className={classNames(
                styles.button, fill ? styles.buttonFill : '', 
                small ? styles.buttonSmall : '', 
                danger ?  styles.buttonDanger : '')
            }
            disabled={disabled}
        >
            {text}
        </button>
    )
}

