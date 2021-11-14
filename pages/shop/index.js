import React from "react"
import axios from "../../core/axios"
import ContentWrapper from "../../components/ContentWrapper"
import SectionHeader from "../../components/SectionHeader"
import MainLayout from "../../layouts/MainLayout"
import { Row, Col, Empty } from 'antd';
import styles from "./Shop.module.scss"
import ProductCard from "../../components/ProductCard"
import { fromFileToUrl } from '../../utils/functions'
import {AudioContext} from "../../components/AudioPlayer/AudioContext"
import emptyBox from '../../assets/icons/common/empty-box.svg'


export default function Shop({ products, pageHeader }){

    const [gridSpan, setGridSpan] = React.useState(24)

    const [audio, setAudio] = React.useState(null)
    
    const findProducts = React.useCallback(categorie => products.find(product => product.productType === categorie).products, [products])

    const categories = products.map(product => product.productType)

    const [currentCategorie, setCurrentCategorie] = React.useState(categories[0]) 

    const [currentProducts, setCurrentProducts] = React.useState(findProducts(currentCategorie))

    React.useEffect(() => {
        setCurrentProducts(findProducts(currentCategorie))
    }, [currentCategorie, findProducts])

    React.useEffect(() => {
            
        function getGridSpan() {
            if(typeof window === 'undefined')
                return 6
            if(window.innerWidth > 1270) 
                return 6

            if(window.innerWidth > 970) 
                return 8

            if(window.innerWidth > 620) 
                return 12

            return 24
        }

        setGridSpan(getGridSpan())

        const resizeHandler = () => {
            setGridSpan(getGridSpan())
        }

        window.addEventListener('resize', resizeHandler)

        return () => { window.removeEventListener('resize', resizeHandler)}
    }, [])

    return (
    <MainLayout>
        <div className={styles.sectionHeader}>
            <SectionHeader 
                title={pageHeader?.title}
                description={pageHeader?.description}
            />
        </div>
        <div className={styles.contentWrapper}>
            
            <ContentWrapper>

                <ul className={styles.filtration}>
                    {categories.map(categorie => (
                        <li 
                            className={categorie == currentCategorie ? styles.filtrationCurrent : ''} 
                            key={categorie}
                        >
                            <button onClick={() => setCurrentCategorie(categorie)}>
                                {categorie}
                            </button>
                        </li>
                    ))}
                </ul>
                <div className={styles.products}>
                {!currentProducts.length 
                    ?   <Empty
                            image={emptyBox.src}
                            imageStyle={{
                                height: 60,
                            }}
                            description='В этой категории пока нет товаров'
                        />
                    : ''}
                    <Row gutter={[45, 30]}>
                        <AudioContext.Provider value={{audio, setAudio}}>
                        {
                            currentProducts.map(product => (
                                <Col key={product.slug} span={gridSpan}>
                                    <div className={styles.productCard}>
                                        <ProductCard 
                                            img={product.image.map(image => fromFileToUrl(image.url))} 
                                            title={product.title} 
                                            subtitle={product.subtitle} 
                                            audio={fromFileToUrl(product.audio?.url)}
                                            price={product.price}
                                            slug={product.slug}
                                            id={product.id}
                                        />
                                    </div>
                                </Col>
                            ))
                        }
                        </AudioContext.Provider>
                    </Row>
                </div>
            </ContentWrapper>
        </div>
       
    </MainLayout>
    )
}

export async function getServerSideProps() {
    const { data: products } = await axios.get('/product-types')
    const { data: pageHeader } = await axios.get('/shop-page')
    return {
        props: {
            products,
            pageHeader
        }
    }
}