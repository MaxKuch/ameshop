import { Table, Space, Button, Popconfirm, Modal, message, Form} from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { useEffect, useState } from "react"
import axios from "../../../core/axios"
import { valuesToFormData } from '../../../utils/functions'
import CoversForm from '../forms/CoversForm'
import useRequestConfig from '../../../hooks/useRequestConfig'

export default function Covers(){
    const [currentCover, setCurrentCover] = useState(null)
    const [deleteLoadingId, setDeleteLoadingId] = useState(null)
    const [isEditLoading, setIsEditLoading] = useState(false)
    const [isAddLoading, setIsAddLoading] = useState(false)
    const [covers, setCovers] = useState([])
    const [audio, setAudio] = useState()
    const [modalsVisibility, setModalsVisibility] = useState({
        editModal: false,
        addModal: false
    })
    const requestConfig = useRequestConfig()

    const [editForm] = Form.useForm()
    const [addForm] = Form.useForm()

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Автор',
            dataIndex: 'songAuthor',
            key: 'songAuthor',
        },
        {
            title: 'Название',
            dataIndex: 'songName',
            key: 'songName',
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
                        const currCover = covers.find(product => product.id === record.id)
                        const { id, songAuthor, songName, lyrics, audio } = currCover
                        setCurrentCover({ id, songAuthor, songName, lyrics  })
                        setAudio(audio ? [audio] : [])
                    }} 
                    icon={<EditOutlined/>}
                />
                <Popconfirm
                    title="Удалить кавер?"
                    onConfirm={() => deleteCover(record.id)}
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
        const fetchCovers = async () => {
            const { data } = await axios.get('/covers')
            setCovers(data.map(cover => ({...cover, key: cover.id })))
        }
        fetchCovers()
    }, [])

    async function deleteCover(id) {
        setDeleteLoadingId(id)
        try {
            await axios.delete(`/covers/${id}`, requestConfig)
            setCovers(covers.filter(cover => cover.id !== id))
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
        const formData = await valuesToFormData(values)
        
        try {
            const { data: eCover } = await axios.put(`/covers/${currentCover.id}`, formData, requestConfig)
            setModalsVisibility(prev => ({...prev, editModal: false}))
            setCovers((prevProducts) => [
                ...prevProducts.filter(cover => cover.id !== currentCover.id), 
                {...eCover, key: eCover.id }
            ])
        } catch (error) {
            message.error('Что-то пошло не так')
            console.error(error)
        }
        finally {
            setIsEditLoading(false)
            editForm.resetFields()
        }
    }

    const addHandler = async (values) => {
        setIsAddLoading(true)
        
        const formData = await valuesToFormData(values)
        
        try {
            const { data: newCover } = await axios.post('/covers', formData, requestConfig)
            setModalsVisibility(prev => ({...prev, addModal: false}))
            setCovers(prev => ([...prev, { ...newCover, key: newCover.id }]))
        } catch (error) {
            message.error('Что-то пошло не так')
            console.error(error)
        }
        finally {
            setIsAddLoading(false)
            addForm.resetFields()
        }
    }
    
    return (
        <>
            <Table columns={columns} dataSource={covers} pagination={false}/>
            <Button type="dashed" onClick={() => setModalsVisibility(prev => ({...prev, addModal: true}))} block icon={<PlusOutlined />}>
                Добавить кавер
            </Button>
            <Modal 
                visible={modalsVisibility.editModal}
                onCancel={() => {
                    setAudio([])
                    setModalsVisibility(prev => ({...prev, editModal: false}))
                }}
                footer={null}
                centered
                width={800}
                
            >
                <CoversForm
                    type='edit'
                    form={editForm}
                    onFinish={editHandler}
                    isLoading={isEditLoading}
                    audio={audio}
                    fields={
                        currentCover 
                            && 
                        [
                            ...Object.keys(currentCover).map(key => ({ name: [key], value: currentCover[key] }))
                        ]
                    }
                    handleAudioChange={(files) => {
                        setAudio(files.fileList)             
                    }}
                    onFieldsChange={newFields => {
                        const newField = newFields[0]

                        if(!newField.name.includes('audio')){
                            setCurrentCover(prev => ({...prev, [newField.name[0]]: newField.value}))
                        }
                    }}
                />
            </Modal>
            <Modal 
                visible={modalsVisibility.addModal}
                onCancel={() => setModalsVisibility(prev => ({...prev, addModal: false}))}
                footer={null}
                centered
                width={800}
            >
                <CoversForm 
                    type='add'
                    form={addForm}
                    onFinish={addHandler} 
                    isLoading={isAddLoading}

                />
            </Modal>
        </>
    )
}