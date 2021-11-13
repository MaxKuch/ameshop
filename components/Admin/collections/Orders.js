import { Table, Space, Button, Popconfirm, message, Collapse, List, Typography, Tag } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useEffect, useState } from "react"
import axios from "../../../core/axios"
import useRequestConfig from '../../../hooks/useRequestConfig'

export default function ProductTypes(){
    const [deleteLoadingId, setDeleteLoadingId] = useState(null)
    const [orders, setOrders] = useState([])
    const requestConfig = useRequestConfig()

    const statusTags = {
        InCart: <Tag color='blue'>В корзине</Tag>,
        Payed: <Tag color='green'>Оплачено</Tag>,
        Canceled: <Tag color='red'>Отменено</Tag>,
        Realized: <Tag color='gold'>Реализовано</Tag>, 
    }

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Товары',
            key: 'products',
            width: 700,
            // eslint-disable-next-line react/display-name
            render: (_, record) => (
                <Collapse ghost>
                    <Collapse.Panel header='Раскрыть'>
                        <List
                            bordered
                            dataSource={record?.items}
                            footer={
                                <>
                                    <Typography.Text strong>Итого: </Typography.Text>
                                    {record?.items.reduce((sum, item) => sum + item.Count * item.product.price, 0).toFixed(2)} руб.
                                </>
                            }
                            renderItem={(item, idx) => (
                                <List.Item>
                                    {idx+1}. 
                                    <Typography.Text strong>{item.product.title}</Typography.Text>,  
                                     {item.Count} шт.,  
                                     {item.Count * item.product.price} руб.
                                </List.Item>
                            )}
                        />
                    </Collapse.Panel>
                </Collapse>
            )
        },
        {
            title: 'Статус',
            key: 'status',
            render: (_, record) => statusTags[record.status]
        },
        {
            title: 'Действие',
            key: 'action',
            // eslint-disable-next-line react/display-name
            render: (_, record) => (
                <Space size="middle">
                <Popconfirm
                    title="Удалить заказ?"
                    onConfirm={() => {deleteOrder(record.id)}}
                    okText="Да"
                    cancelText="Нет"
                >
                    <Button 
                        danger 
                        loading={deleteLoadingId === record.id}
                        icon={<DeleteOutlined/>}
                    />
                </Popconfirm>
                </Space>
            ),
        },
    ]

    async function deleteOrder(id) {
        setDeleteLoadingId(id)
        try {
            await axios.delete(`/orders/${id}`, requestConfig)
            setOrders(orders.filter(productType => productType.id !== id))
        } catch (error) {
            message.error('Что-то пошло не так')
            console.error()
        }
        finally {
            setDeleteLoadingId(null)
        }
       
    }

    useEffect(() => {
        const fetchOrders = async () => {
            const { data: orders } = await axios.get('/orders')

            setOrders(orders.map(order => ({key: order.id, id: order.id, status: order.status, items: order.Item})))
        }
        fetchOrders()
    }, [])

    return <Table columns={columns} dataSource={orders} pagination={false}/>
}