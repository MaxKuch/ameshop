import { useState } from 'react'
import styles from './AdminPanel.module.scss'
import { Layout, Button, Row, Menu, Col } from 'antd'
import { logout } from '../../redux/slices/authSlice'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'

import ProductTypes from './collections/ProductTypes'
import Products from './collections/Products'
import Covers from './collections/Covers'
import Orders from './collections/Orders'
import Main from './pages/Main'
import CoversPage from './pages/Covers'
import Contacts from './pages/Contacts'
import Agreement from './pages/Agreement'
import ShopPage from './pages/Shop'
import PaymentAndDelivery from './pages/PaymentAndDelivery'

const sections = [ProductTypes, Products, Main, ShopPage, CoversPage, Contacts, Agreement, PaymentAndDelivery, Covers, Orders ]

const { Header, Sider, Content } = Layout
const { SubMenu } = Menu

export default function AdminPanel() {
    const dispatch = useDispatch()

    const [currentSection, setCurrentSection] = useState(0)
    const CurrentSectionComponent = sections[currentSection]

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <Layout
            className='height-100'
        >
            <Header className={styles.header}>
                <Row justify='space-between' align='middle' style={{height: '100%'}}>
                    <h1 className={classNames('title', styles.title)}>Admin</h1>
                    <Button onClick={logoutHandler} type='text' className={styles.logoutBtn}>Выйти</Button>
                </Row>
            </Header>
            <Layout>
                <Sider
                    breakpoint='lg'
                    collapsedWidth='0'
                >
                    <Menu 
                        theme='dark' 
                        mode='inline' 
                        onSelect={({ key }) => setCurrentSection(key)}
                        style={{ height: '100%', borderRight: 0 }}
                        defaultOpenKeys={['store']}
                        defaultSelectedKeys={['0']}
                    >
                        <SubMenu key='store' title='Магазин'>
                            <Menu.Item key={0}>Категории</Menu.Item>
                            <Menu.Item key={1}>Товары</Menu.Item>
                        </SubMenu>

                        <SubMenu key='pages' title='Страницы'>
                            <Menu.Item key={2}>Главная</Menu.Item>
                            <Menu.Item key={3}>Магазин</Menu.Item>
                            <Menu.Item key={4}>Каверы</Menu.Item>
                            <Menu.Item key={5}>Контакты</Menu.Item>
                            <Menu.Item key={6}>Соглашение</Menu.Item>
                            <Menu.Item key={7}>Оплата и доставка</Menu.Item>
                        </SubMenu>
                        <Menu.Item key={8}>Каверы</Menu.Item>
                        <Menu.Item key={9}>Заказы</Menu.Item>
                    </Menu>
                </Sider>
                <Content>
                    <Row justify='center' align='middle' className={styles.content}>
                        <Col span={24} md={{ span: 18 }}><CurrentSectionComponent/></Col>
                    </Row>    
                </Content>
            </Layout>
        </Layout>
    )
}