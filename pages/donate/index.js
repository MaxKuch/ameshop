import React from 'react'
import styles from './Donate.module.scss'
import MainLayout from '../../layouts/MainLayout'
import ContentWrapper from '../../components/ContentWrapper'
import ProductCard from '../../components/ProductCard'
import classNames from 'classnames'
import Button from '../../components/Button'
import { fromFileToUrl } from '../../utils/functions'
import axios from '../../core/axios'

export default function Product({ product }) {

    const [productBig, setProductBig] = React.useState(true)

    React.useEffect(() => {
            
        function getProductBig() {
            if(typeof window === 'undefined')
                return true
            if(window.innerWidth > 400) 
                return true
            return false
        }

        setProductBig(getProductBig())

        const resizeHandler = () => {
            setProductBig(getProductBig())
        }

        window.addEventListener('resize', resizeHandler)

        return () => { window.removeEventListener('resize', resizeHandler)}
    }, [])

    return (
        <MainLayout>
            <div className={styles.contentWrapper}>
                <ContentWrapper>
                    <div className={styles.product}>
                        <div className={styles.productCard}>
                            <ProductCard  
                                img={product.image.map(image => fromFileToUrl(image.url))} 
                                price={product.price}
                                big={productBig}
                                slug={product.slug}
                                id={product.id}
                                title={product.title}
                                subtitle={product.subtitle}
                            /> 
                        </div>
                        <div className={styles.productInfo}>
                            {product.title ? <h2 dangerouslySetInnerHTML={{ __html: product.title }}></h2> : ''}
                            {product.subtitle ? <h3 dangerouslySetInnerHTML={{ __html: product.subtitle }}></h3> : ''}
                            <p className={classNames(styles.productDescription, 'text')} dangerouslySetInnerHTML={{ __html: product.description }}></p>
                            <Button text="Произвольный донат" fill={true} small={true}/>
                        </div>
                    </div>
                </ContentWrapper>
            </div>
        </MainLayout>
    )
}

export async function getServerSideProps() {
    const {data: product} = await axios.get(`/products?slug=donate`)
    return {
        props: {
            product: product[0]
        }
    }
}