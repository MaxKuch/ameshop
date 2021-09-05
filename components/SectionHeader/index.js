import styles from './SectionHeader.module.scss'

export default function SectionHeader({ title, description }) {
    return (
        <div className={styles.sectionHeader}>
            <h1 className="title" dangerouslySetInnerHTML={{ __html: title }}/>
            {description ? <p className="text" dangerouslySetInnerHTML={{ __html: description }}/> : ''}
        </div>
    )
}