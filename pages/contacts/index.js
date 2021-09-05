import styles from './Contacts.module.scss'
import Image from 'next/image'
import MainLayout from '../../layouts/MainLayout'
import SectionHeader from '../../components/SectionHeader'
import Form from './Form'
import classNames from 'classnames'
import donationAlertsIcon from '../../assets/icons/socials/donation-alerts-accent.svg'
import youtubeIcon from '../../assets/icons/socials/youtube-accent.svg'
import vkIcon from '../../assets/icons/socials/vk-accent.svg'
import instIcon from '../../assets/icons/socials/inst-accent.svg'
import Link from 'next/link'
import axios from '../../core/axios'

export default function Contatcs({pageHeader}) {
    console.log(pageHeader)
    return (
        <MainLayout>
            <div className={styles.sectionHeader}>
                <SectionHeader 
                    title={pageHeader?.title}
                    description={pageHeader?.firstDescription}
                />
            </div>
            <div className={styles.contacts}>
                <div className={styles.socials}>
                    <a href="https://www.donationalerts.ru/c/amelchenko" target="_blank" rel="noreferrer">
                        <Image 
                            src={donationAlertsIcon.src}
                            width={25}
                            height={29}
                            alt="donationalerts icon"
                        />
                    </a>
                    <a href="https://www.youtube.com/c/AMELCHENKO" target="_blank" rel="noreferrer">
                        <Image 
                            src={youtubeIcon.src}
                            width={60}
                            height={19}
                            alt="youtube icon"
                        />
                    </a>
                    <a href="https://vk.com/amelchenkomusic" target="_blank" rel="noreferrer">
                        <Image 
                            src={vkIcon.src}
                            width={26}
                            height={26}
                            alt="vk icon"
                        />
                    </a>
                    <a href="https://www.instagram.com/divasveta/" target="_blank" rel="noreferrer">
                        <Image 
                            src={instIcon.src}
                            width={20}
                            height={20}
                            alt="inst icon"
                        />
                    </a>
                </div>
                <p className={classNames(styles.text, "text")} dangerouslySetInnerHTML={{ __html: pageHeader?.secondDescription }}/>
                <Form/>
                <p className={classNames(styles.text, "text")}>
                    Нажимая на кнопку <span className="bold">ОТПРАВИТЬ</span>, вы даете свое согласие на обработку персональных данных
                    и соглашаетесь с <Link href="/agreement"><a className="accent">Политикой конфиденциальности</a></Link>.<br/>
                    <br/>
                    Спасибо за обратную связь. Мы ответим на ваше сообщение в ближайшее время. 
                </p>
            </div>
        </MainLayout>

    )
}

export async function getStaticProps() {
    const { data: pageHeader } = await axios.get('/contacts-page')
    return {
        props: { pageHeader }
    }
}
