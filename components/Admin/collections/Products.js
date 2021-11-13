import styles from '../AdminPanel.module.scss'
import { Table, Space, Button, Popconfirm, Modal, message, Form} from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { useEffect, useState } from "react"
import axios from "../../../core/axios"
import { valuesToFormData } from '../../../utils/functions'
import ProductForm from '../forms/ProductForm'
import useRequestConfig from '../../../hooks/useRequestConfig'

export default function Products(){
    const [currentProduct, setCurrentProduct] = useState(null)
    const [deleteLoadingId, setDeleteLoadingId] = useState(null)
    const [isEditLoading, setIsEditLoading] = useState(false)
    const [isAddLoading, setIsAddLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [productTypes, setProductTypes] = useState([])
    const [images, setImages] = useState()
    const [audio, setAudio] = useState()
    const [filesToDelete, setFilesToDelete] = useState([])
    const [modalsVisibility, setModalsVisibility] = useState({
        editModal: false,
        addModal: false
    })
    const requestConfig = useRequestConfig()

    const [editForm] = Form.useForm()
    const [addForm] = Form.useForm()

    const slugs = products.map(({ slug, id }) => ({slug, id}))

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Заголовок',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Подзаголовок',
            dataIndex: 'subtitle',
            key: 'subtitle',
        },
        {
            title: 'Цена',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Категория',
            dataIndex: 'productType',
            key: 'productType',
        },
        {
            title: 'Действие',
            key: 'action',
            // eslint-disable-next-line react/display-name
            render: (_, record) => (
                <Space size="middle">
                  <Button 
                    onClick={() => {
                        setModalsVisibility(prev => ({...prev, editModal: true}))
                        const currProd = products.find(product => product.id === record.id)
                        const { id, title, subtitle, description, price, lyrics, product_type, image, audio, slug } = currProd
                        setCurrentProduct({ id, title, subtitle, description, price, lyrics, product_type: product_type?.id, slug })
                        setImages(image || [])
                        setAudio(audio ? [audio] : [])
                    }} 
                    icon={<EditOutlined/>}
                />
                <Popconfirm
                    title="Удалить товар?"
                    onConfirm={() => deleteProduct(record.id)}
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


    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get('/products')
            setProducts(data.map(product => ({...product, key: product.id, productType: product.product_type?.productType })))

            const { data: productTypes } = await axios.get('/product-types')
            setProductTypes(productTypes.map(productType => ({key: productType.id, id: productType.id, productType: productType.productType})))
        }
        fetchProducts()
    }, [])

    async function deleteProduct(id) {
        setDeleteLoadingId(id)
        try {
            await axios.delete(`/products/${id}`, requestConfig)
            setProducts(products.filter(product => product.id !== id))
        } catch (error) {
            message.error('Что-то пошло не так')
            console.error(error)
        }
        finally {
            setDeleteLoadingId(null)
        }
       
    }

    const editHandler = async (values) => {

        setIsEditLoading(true)
        try {
            await Promise.all(filesToDelete.map(id => axios.delete(`/media/${id}`, requestConfig)))
        } catch (error) {
            message.error('Что-то пошло не так при удалении файлов')
            console.error(error)
        }
        const formData = await valuesToFormData(values)

        try {
            const { data: eProduct } = await axios.put(`/products/${currentProduct.id}`, formData, requestConfig)
            setModalsVisibility(prev => ({...prev, editModal: false}))
            setProducts((prevProducts) => [
                ...prevProducts.filter(product => product.id !== currentProduct.id), 
                {...eProduct, key: eProduct.id, productType: eProduct.product_type?.productType }
            ])
        } catch (error) {
            message.error('Что-то пошло не так')
            console.error(error)
        }
        finally {
            setFilesToDelete([])
            setIsEditLoading(false)
            editForm.resetFields()

        }
    }

    const addHandler = async (values) => {
        setIsAddLoading(true)
        
        const formData = await valuesToFormData(values)
        
        try {
            const { data: newProduct } = await axios.post('/products', formData, requestConfig)
            setModalsVisibility(prev => ({...prev, addModal: false}))
            setProducts(prev => ([...prev, { ...newProduct, key: newProduct.id, productType: newProduct.product_type?.productType }]))
        } catch (error) {
            message.error('Что-то пошло не так')
            console.error(error)
        }
        finally {
            setIsAddLoading(false)
            addForm.resetFields()
        }
    }

    const fileChangeHandler = (files, setFiles) => {
        const file = files.file
        if(file.id && file.status === 'removed' && !filesToDelete.includes(file.id)){
            setFilesToDelete([...filesToDelete, file.id])
        }
        setFiles(files.fileList)
    }
    
    return (
        <>
            <Table columns={columns} dataSource={products} pagination={false}/>
            <Button type="dashed" onClick={() => setModalsVisibility(prev => ({...prev, addModal: true}))} block icon={<PlusOutlined />}>
                Добавить товар
            </Button>
            <Modal 
                visible={modalsVisibility.editModal}
                onCancel={() => {
                    setFilesToDelete([])
                    setImages([])
                    setAudio([])
                    setModalsVisibility(prev => ({...prev, editModal: false}))
                }}
                footer={null}
                wrapClassName={styles.productsModal}
                width={800}
            >
                <ProductForm
                    type='edit'
                    form={editForm}
                    onFinish={editHandler}
                    productTypes={productTypes} 
                    isLoading={isEditLoading}
                    images={images}
                    audio={audio}
                    fields={
                        currentProduct 
                            && 
                        [
                            ...Object.keys(currentProduct).map(key => ({ name: [key], value: currentProduct[key] }))
                        ]
                    }
                    handleImageChange={(files) => {
                        fileChangeHandler(files, fileList => {
                            setImages(fileList)             
                        })
                    }}
                    handleAudioChange={(files) => {
                        fileChangeHandler(files, fileList => {
                            setAudio(fileList)             
                        })
                    }}
                    onFieldsChange={async newFields => {
                        const newField = newFields[0]

                        if(!newField.name.includes('image') && !newField.name.includes('audio')){
                            setCurrentProduct(prev => ({...prev, [newField.name[0]]: newField.value}))
                        }
                    }}
                    currentProduct={currentProduct?.id}
                    slugs={slugs}
                />
            </Modal>
            <Modal 
                visible={modalsVisibility.addModal}
                onCancel={() => setModalsVisibility(prev => ({...prev, addModal: false}))}
                footer={null}
                centered
                width={800}
            >
                <ProductForm 
                    type='add'
                    form={addForm}
                    onFinish={addHandler} 
                    productTypes={productTypes} 
                    isLoading={isAddLoading}
                    slugs={slugs}
                />
            </Modal>
        </>
    )
}