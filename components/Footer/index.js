import Link from "next/link"
import styles from './Footer.module.scss'
import {useRouter} from 'next/router'
import classNames from "classnames"

export default function Footer() {
    
    const router = useRouter()

    return <footer className={styles.footer}>
        <div className={styles.links}>
            <Link href="/agreement">
                <a className={classNames('/agreement' == router.route ? 'accent' : '')}>
                    Пользовательское соглашение
                </a>
            </Link>
            <Link href="/payment-and-delivery">
                <a className={classNames('/payment-and-delivery' == router.route ? 'accent' : '')}>
                    Оплата и доставка
                </a>
            </Link>
            <a href="mailto:amelchenkomusic@gmail.com">amelchenkomusic@gmail.com</a>
        </div>
        <span>© 2021 AMELCHENKO</span>
    </footer>
}