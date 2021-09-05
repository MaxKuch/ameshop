import React from 'react'
import { Carousel, Image } from 'antd'
import { useDispatch, useSelector } from "react-redux"
import { addProduct, removeProduct } from "../../redux/slices/cartSlice"
import styles from './ProductCard.module.scss'
import Button from '../Button'
import AudioPlayerMini from '../AudioPlayer/AudioPlayerMini'
import Link from 'next/link'
import classNames from 'classnames'


export default function ProductCard({img, title, subtitle, audio, price, big, slug, id}) {

    const [galleryVisible, setGalleryVisible] = React.useState(false)
    const [galleryIdx, setGalleryIdx] = React.useState(0)

    const products = useSelector(state => state.cart.products)
    const dispatch = useDispatch()

    const [isInCart, setIsInCart] = React.useState(false)

    React.useEffect(() => {
        setIsInCart(products.some(product => product.slug === slug))
    }, [products, slug])

    const addToCartHandler = async () => {
        if(!isInCart) { 
            dispatch(addProduct({
                img,
                title,
                subtitle,
                price,
                slug,
                amount: 1,
                id
            })) 
            return
        }
        dispatch(removeProduct(slug))
    }

    return (
        <div className={classNames(styles.productCard, big ? styles.productCardBig : '')}>
            <style global jsx>{`
                .ant-image {
                    display: block;
                }
                .ant-image-mask {
                    border-radius: 6px;
                }
            `}</style>
            
                <div className={styles.imgWrapper}>
                    <Carousel effect="fade">
                        {
                            img.map((image, idx) => (
                                <Image
                                    key={image}
                                    preview={{ visible: false }}
                                    src={image}
                                    onClick={() => { 
                                        setGalleryVisible(true)
                                        setGalleryIdx(idx)
                                    }}
                                    alt="product picture"
                                />
                            ))
                        }
                    </Carousel>
                    <div className={styles.price}>{price}₽</div>
                </div>
                <Link href={`/product/${slug}`}>
                    <a>
                        {title && !big ? <h2>{title}</h2> : ''}
                        {subtitle && !big ? <h3>{subtitle}</h3> : ''}
                    </a>
                </Link>
            {audio 
                ? <AudioPlayerMini big={big} src={audio}/>
                : ''
            }
            <div className={styles.addToCartBtn}>
                <Button 
                    small={!big} 
                    fill={true} 
                    text={isInCart ? 'Убрать' : 'В корзину'}
                    onClick={addToCartHandler}
                    danger={isInCart}
                />
            </div>
            <div style={{ display: 'none' }}>
                <Image.PreviewGroup preview={{ visible: galleryVisible, onVisibleChange: vis => setGalleryVisible(vis), current: galleryIdx }}>
                    {
                        img.map(image => (
                            <Image
                                key={image}
                                src={image}
                                alt="product picture"
                            />
                        ))
                    }
                </Image.PreviewGroup>
            </div>
        </div>
    )
}

