import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.scss'
import Header from '../components/Header'
import Button from '../components/Button'
import logoLetter from '../assets/icons/common/logo-letter.svg'
import axios from '../core/axios'

export default function Home({description}) {

  return (
    <div className={styles.bg}>
      <div className="container">
        <Header bgTransparent={true}/>
        <main className={styles.main}>
          <div className={styles.content}>
            <div className={styles.title}>
              <div>

              
              <h1>
                <Image 
                  src={logoLetter.src} 
                  width={42}
                  height={45}
                  alt="A"
              />
                melchenko music
              </h1>
              </div>
            </div>
            <p className={styles.description} dangerouslySetInnerHTML={{ __html: description }}/>
            <div className={styles.buttons}>
            <Link href="/shop">
              <a>
              <Button text="Магазин" fill={true}/>
              </a>
            </Link>
            <Link href="/donate">
              <a>
                <Button text="Донат"/>
              </a>
            </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const { data: { description: description } } = await axios.get('/main-page')

  return {
    props: {
      description
    }
  }
}