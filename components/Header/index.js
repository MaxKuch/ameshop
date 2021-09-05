import React from 'react'
import styles from './Header.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from 'next/router'
import classNames from 'classnames'
import logo from '../../assets/icons/common/logo.svg'
import youtubeIcon from '../../assets/icons/socials/youtube.svg'
import vkIcon from '../../assets/icons/socials/vk.svg'
import instIcon from '../../assets/icons/socials/inst.svg'
import facebookIcon from '../../assets/icons/socials/facebook.svg'
import Cart from '../Cart'



export default function Header({ bgTransparent }) {
  const [menuOpened, setMenuOpened] = React.useState(false)

  const menuHandler = () => {
    document.body.style.overflowY = !menuOpened ? 'hidden' : 'auto'
    setMenuOpened(!menuOpened)
  }

  React.useEffect(() => {
    const handleResize = () => {
      if(window.innerWidth >= 910) {
        document.body.style.overflowY = 'auto'
        setMenuOpened(false)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => { 
      document.body.style.overflowY = 'auto'
      setMenuOpened(false)
      window.removeEventListener('resize', handleResize) 
    }
  }, []) 
  
  const router = useRouter()

    const menuLinks = [
      {
        title: 'Главная',
        route: '/'
      },
      {
        title: 'Магазин',
        route: '/shop'
      },
      {
        title: 'Донат',
        route: '/donate'
      },
      {
        title: 'Каверы',
        route: '/covers'
      },
      {
        title: 'Контакты',
        route: '/contacts'
      },
      {
        title: 'Соглашение',
        route: '/agreement'
      },
    ]
    return ( 
    <>
      <header className={classNames(styles.header, bgTransparent ? styles.headerTransparent: '')}>
        <Link href="/">
          <a>
            <Image 
              width={70} 
              height={70}
              src={logo.src} 
              alt="logo"
            />
          </a>
        </Link>
        <nav className={classNames(styles.nav, menuOpened ? styles.navOpened : '')}>
          {menuLinks.map(link => 
            <Link href={link.route} key={link.title}>
              <a className={classNames(styles.link, link.route == router.route ? styles.linkActive : '')}>
                {link.title}
              </a>
            </Link>
          )}
        </nav>
        <div className={styles.socials}>
          <a href="https://www.youtube.com/c/AMELCHENKO" target="_blank" rel="noreferrer">
            <Image 
              src={youtubeIcon.src} 
              alt="youtube icon"
              width={60}
              height={19}
            />
          </a>

          <a href="https://vk.com/amelchenkomusic" target="_blank" rel="noreferrer">
            <Image 
              src={vkIcon.src} 
              alt="vk icon"
              width={26}
              height={26}
            /> 
          </a>

          <a href="https://www.instagram.com/divasveta/" target="_blank" rel="noreferrer">
            <Image 
              src={instIcon.src} 
              alt="inst icon"
              width={20}
              height={20}
            />
          </a>

          <a href="https://www.facebook.com/amelchenkomusic" target="_blank" rel="noreferrer">
            <Image 
              src={facebookIcon.src} 
              alt="facebook icon"
              width={20}
              height={20}
            />
          </a>
        </div>
        <button onClick={menuHandler} className={classNames(styles.menuBtn, menuOpened ? styles.menuBtnClose : styles.menuBtnOpen)}>
          <div></div>
        </button>
        <Cart/>
      </header>
    </>
    )
  }
  