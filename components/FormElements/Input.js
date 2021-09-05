import styles from './FormElements.module.scss'
import classNames from 'classnames'

export default function Input({ id, name, value, type, onChange, onBlur, label, isInvalid, errorMessage }) {
    return (
        <div className={classNames(styles.input, isInvalid ? styles.invalid : '')}>
            <label className={styles.label} htmlFor={id}>{label}</label>
            <input id={id} name={name} value={value} type={type} onChange={onChange} onBlur={onBlur}/>
            {errorMessage ? <p className={styles.errorMessage}>{errorMessage}</p> : ''}
        </div>
    )
}