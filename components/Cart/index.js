import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { removeProduct, increment, decrement } from "../../redux/slices/cartSlice"
import { addOrderThunk } from "../../redux/thunks/order"
import Image from "next/image"
import Link from 'next/link'
import cartIcon from '../../assets/icons/common/cart.svg'
import emptyBox from '../../assets/icons/common/empty-box.svg'
import { Modal, Empty } from 'antd';
import styles from './Cart.module.scss'
import classNames from 'classnames'
import Button from '../../components/Button'
import { fromFileToUrl } from '../../utils/functions'

export default function Cart() {
    const products = useSelector(state => state.cart.products)
    const dispatch = useDispatch()

    const [visible, setVisible] = React.useState(false)
    const [totalSum, setTotalSum] = React.useState(0)
    const [productsAmount, setProductsAmount] = React.useState(0)

    React.useEffect(() => {
        setTotalSum(products.reduce((sum, product) => sum += product.price * product.amount, 0))
        setProductsAmount(products.reduce((amount, product) => amount += product.amount, 0))
    }, [products])

    const showModal = () => {
        setVisible(true)
    }

    const handleCheckout = () => {
        dispatch(addOrderThunk())
    }

    const handleCancel = () => {
        setVisible(false)
    }

    return <div className={styles.cart}>
            <style global jsx>{`
                
            `}</style>
            <button onClick={showModal}>
                <Image 
                    src={cartIcon.src}
                    width={21}
                    height={24}
                    alt="cart icon"
                />
                <div className={styles.cartCounter}>{productsAmount}</div>
            </button>
                <Modal
                    visible={visible}
                    onCancel={handleCancel}
                    width={700}
                    modalRender={() => 
                    (
                        <div className={classNames(styles.modal, 'ant-modal-content')}>
                            <button className={classNames(styles.modalClose, 'mini-btn mini-btn--disabled')} onClick={handleCancel}>&times;</button>
                            <h3 className={classNames("title", styles.cartTitle)}>Корзина</h3>
                            <div className={styles.cartItems}>
                            {!products.length 
                            ?   <Empty
                                    image={emptyBox.src}
                                    imageStyle={{
                                        height: 40,
                                    }}
                                    description='Корзина пуста'
                                />
                            : ''
                            }
                                {
                                    products.map(product => (
                                        <div key={product.id} className={styles.cartItem}>
                                            <div className={styles.cartItemLeft}>
                                                <img 
                                                    src={fromFileToUrl(product.img)} 
                                                    alt="product img"
                                                />
                                                <div className={styles.cartItemInfo}>
                                                    <h4>{product.title}</h4>
                                                    <h5>{product.subtitle}</h5>
                                                    <h6>{product.price}₽</h6>
                                                </div>
                                            </div>
                                            <div className={styles.cartItemRight}>
                                                <button className="mini-btn mini-btn--red" onClick={() => dispatch(removeProduct(product.slug))}>&times;</button>
                                                <div className={styles.cartItemControl}>
                                                    <button className="mini-btn mini-btn--accent" onClick={() => dispatch(decrement(product.slug))}>-</button>
                                                    {product.amount}
                                                    <button className="mini-btn mini-btn--accent" onClick={() => dispatch(increment(product.slug))}>+</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                               { products.length ? <h4 className={classNames(styles.cartTotal, "bold")}>Итого: <span className="accent">{totalSum}₽</span></h4> : '' }
                            </div>
                            <Button fill={true} small={true} text="Оформить заказ" onClick={handleCheckout} disabled={!products.length}/>
                            <Link href="/payment-and-delivery"><a className={classNames(styles.cartDeliveryLink, "accent bold")}>Условия доставки</a></Link>
                        </div>
                    )}
                />
        </div>
}