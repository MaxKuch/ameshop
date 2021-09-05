import React from 'react'
import styles from './Product.module.scss'
import MainLayout from '../../layouts/MainLayout'
import ContentWrapper from '../../components/ContentWrapper'
import ProductCard from '../../components/ProductCard'
import classNames from 'classnames'
import Button from '../../components/Button'
import { Modal } from 'antd'
import axios from '../../core/axios'
import { fromFileToUrl } from '../../utils/functions'
import ModalWrapper from '../../components/ModalWrapper'

export default function Product({ product }) {
    const [visible, setVisible] = React.useState(false)
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


    const showModal = () => {
        setVisible(true)
    }

    const handleCancel = () => {
        setVisible(false);
    }

    return (
        <MainLayout>
            <div className={styles.contentWrapper}>
                <ContentWrapper>
                    <div className={styles.product}>
                        <div className={styles.productCard}>
                            <ProductCard  
                                img={product.image.map(image => fromFileToUrl(image.url))} 
                                title={product.title}
                                subtitle={product.subtitle}
                                audio={fromFileToUrl(product.audio?.url)}
                                price={product.price}
                                slug={product.slug}
                                id={product.id}
                                big={productBig}
                            /> 
                        </div>
                        <div className={styles.productInfo}>
                            {product.title ? <h2 dangerouslySetInnerHTML={{ __html: product.title }}></h2> : ''}
                            {product.subtitle ? <h3 dangerouslySetInnerHTML={{ __html: product.subtitle }}></h3> : ''}
                            <p className={classNames(styles.productDescription, 'text')} dangerouslySetInnerHTML={{ __html: product.description }}></p>
                            {product.lyrics ? <Button onClick={showModal} text="Текст песни" fill={true} small={true}/> : ''}
                        </div>
                    </div>
                </ContentWrapper>
            </div>
            <Modal
                visible={visible}
                width={380}
                onCancel={handleCancel}
                modalRender={() => (
                    <ModalWrapper handleCancel={handleCancel}>
                        <p className={classNames(styles.lyrics, 'text')} dangerouslySetInnerHTML={{ __html: product.lyrics }}/>
                    </ModalWrapper>
                )}
            />
                
        </MainLayout>
    )
}

export async function getServerSideProps(context) {
    const {data: product} = await axios.get(`/products?slug=${context.params.id}`)
    return {
        props: {
            product: product[0]
        }
    }
}