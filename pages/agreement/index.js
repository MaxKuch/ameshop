import styles from './Agreement.module.scss'
import MainLayout from '../../layouts/MainLayout'
import SectionHeader from '../../components/SectionHeader'
import classNames from 'classnames'
import axios from '../../core/axios'

export default function Contatcs( {pageHeader} ) {
    return (
        <MainLayout>
            <div className={styles.sectionHeader}>
                <SectionHeader 
                    title={pageHeader.title}
                />
            </div>
                <p className={classNames(styles.text, "text")} dangerouslySetInnerHTML={{ __html: pageHeader?.text }}/>
        </MainLayout>

    )
}


export async function getStaticProps() {
    const { data: pageHeader } = await axios.get('/agreement-page')
    return {
        props: { pageHeader },
        revalidate: 10
    }
}
