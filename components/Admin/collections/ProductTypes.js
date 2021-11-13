import { Table, Space, Button, Popconfirm, Modal, Form, Input, Col, message } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { useEffect, useState } from "react"
import axios from "../../../core/axios"
import useRequestConfig from '../../../hooks/useRequestConfig'


export default function ProductTypes(){
    const [currentProductType, setCurrentProductType] = useState(null)
    const [category, setCategory] = useState('')
    const [deleteLoadingId, setDeleteLoadingId] = useState(null)
    const [isEditLoading, setIsEditLoading] = useState(false)
    const [isAddLoading, setIsAddLoading] = useState(false)
    const [productTypes, setProductTypes] = useState([])
    const requestConfig = useRequestConfig()

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Категория',
            dataIndex: 'productType',
            key: 'productType',
            width: 700
        },
        {
            title: 'Действие',
            key: 'action',
            // eslint-disable-next-line react/display-name
            render: (_, record) => (
                <Space size="middle">
                  <Button 
                    onClick={() => {
                        setVisible(prev => ({...prev, editModal: true}))
                        setCurrentProductType(record.id)
                        setCategory(record.productType)
                    }} 
                    icon={<EditOutlined/>}
                />
                <Popconfirm
                    title="Удалить категорию?"
                    onConfirm={() => {deleteType(record.id)}}
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


    const [visible, setVisible] = useState({
        editModal: false,
        addModal: false
    })

    async function deleteType(id) {
        setDeleteLoadingId(id)
        try {
            await axios.delete(`/product-types/${id}`, requestConfig)
            setProductTypes(productTypes.filter(productType => productType.id !== id))
        } catch (error) {
            message.error('Что-то пошло не так')
            console.error()
        }
        finally {
            setDeleteLoadingId(null)
        }
       
    }

    useEffect(() => {
        const fetchProductTypes = async () => {
            const { data } = await axios.get('/product-types')
            setProductTypes(data.map(productType => ({key: productType.id, id: productType.id, productType: productType.productType})))
        }
        fetchProductTypes()
    }, [])

    const editHandler = async () => {
        setIsEditLoading(true)
        try {
            await axios.put(`/product-types/${currentProductType}`, 
                {
                    productType: category
                },
                requestConfig
            )
            setVisible(prev => ({...prev, editModal: false}))
            setProductTypes(prev => prev.map(productType => productType.id === currentProductType ? {...productType, productType: category} : productType))
        } catch (error) {
            message.error('Что-то пошло не так')
            console.error(error)
        }
        finally {
            setIsEditLoading(false)
        }
    }

    const addHandler = async () => {
        setIsAddLoading(true)
        try {
            const { data: newProductType } = await axios.post('/product-types', 
                {
                    productType: category
                },
                requestConfig
            )
            setVisible(prev => ({...prev, addModal: false}))
            setProductTypes(prev => ([...prev, { key: newProductType.id, id: newProductType.id, productType: category }]))
        } catch (error) {
            message.error('Что-то пошло не так')
            console.error(error)
        }
        finally {
            setIsAddLoading(false)
        }
    }
    

    return (
        <>
            <Table columns={columns} dataSource={productTypes} pagination={false}/>
            <Button type="dashed" onClick={() => setVisible(prev => ({...prev, addModal: true}))} block icon={<PlusOutlined />}>
                Добавить категорию
            </Button>
            <Modal 
                visible={visible.editModal}
                onCancel={() => setVisible(prev => ({...prev, editModal: false}))}
                footer={null}
                centered
            >
                <Form
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 10 }}
                        autoComplete="off"
                        onFinish={editHandler}
                        fields={[{ name: ['category'], value: category}]}
                        onFieldsChange={newFields => {
                            setCategory(newFields[0].value)
                        }}
                >
                    <Form.Item
                        label="Категория"
                        name="category"
                        rules={[{ required: true, message: 'Введите категорию!' }]}
                    >
                        <Input 
                        />
                    </Form.Item>
                    <Col offset={8} >
                        <Button type="primary" htmlType="submit" loading={isEditLoading}>
                            Ок
                        </Button>
                    </Col>
                </Form>
            </Modal>
            <Modal 
                visible={visible.addModal}
                onCancel={() => setVisible(prev => ({...prev, addModal: false}))}
                footer={null}
                centered
            >
                <Form
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 10 }}
                        autoComplete="off"
                        onFinish={addHandler}
                >
                    <Form.Item
                        label="Категория"
                        name="category"
                        rules={[{ required: true, message: 'Введите категорию!' }]}
                    >
                        <Input 
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                        />
                    </Form.Item>
                    <Col offset={8} >
                        <Button type="primary" htmlType="submit" loading={isAddLoading}>
                            Ок
                        </Button>
                    </Col>
                </Form>
            </Modal>
        </>
    )
}