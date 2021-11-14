import styles from './Covers.module.scss'
import MainLayout from '../../layouts/MainLayout'
import SectionHeader from '../../components/SectionHeader'
import AudioPlayer from '../../components/AudioPlayer'
import axios from '../../core/axios'

export default function Covers({ covers, pageHeader }) {

    return (
        <MainLayout>
            <div className={styles.sectionHeader}>
                <SectionHeader 
                    title={pageHeader?.title} 
                    description={pageHeader?.description}
                />
                
            </div>
            <div className={styles.covers}>
                <div className={styles.audioplayer}>
                    <AudioPlayer songs={covers}/>
                </div>
            </div>
        </MainLayout>
    )
}

export async function getStaticProps() {
    const { data: covers } = await axios.get('/covers')
    const { data: pageHeader } = await axios.get('/covers-page')
    return {
        props: { covers,  pageHeader },
        revalidate: 10
    }
}
