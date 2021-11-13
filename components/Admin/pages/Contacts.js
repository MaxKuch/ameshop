import { useEffect, useState } from 'react'
import { Form, Input, Col, Button, message } from 'antd'
import axios from '../../../core/axios'
import useRequestConfig from '../../../hooks/useRequestConfig'

export default function Contacts(){
    const [isLoading, setIsLoading] = useState(false)
    const requestConfig = useRequestConfig()
    const [firstDescription, setFirstDescription] = useState('')
    const [secondDescription, setSecondDescription] = useState('')
    const [title, setTitle] = useState('')

    useEffect(() => {
        const fetchCovers = async () => {
            try {
                const { data: { firstDescription, secondDescription, title } } = await axios.get('/contacts-page')
                setFirstDescription(firstDescription)
                setSecondDescription(secondDescription)
                setTitle(title)
            }
            catch(error) {
                message.error('Что-то пошло не так при загруке данных')
                console.error(error)
            }
        }
        
        fetchCovers()
    }, [])

    const editHandler = async () => {
        setIsLoading(true)
        try {
            await axios.put('/contacts-page', {
                firstDescription,
                secondDescription,
                title
            }, requestConfig)
            message.success('Успешно отредактировано')
        } catch (error) {
            message.error('Что-то пошло не так при редактировании данных')
            console.error(error)
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <Form
            layout='vertical'
            autoComplete='off'
            fields={[
                { name: ['firstDescription'], value: firstDescription },
                { name: ['secondDescription'], value: secondDescription },
                { name: ['title'], value: title }
            ]}
            onFinish={editHandler}
        >
            <Form.Item
                label='Заголовок'
                name='title'
                rules={[{ required: true, message: 'Введите заголовок!' }]}
            >
                <Input
                    onChange={e => setTitle(e.target.value)}
                />
            </Form.Item>
            <Form.Item
                label='Первое описание'
                name='firstDescription'
                rules={[{ required: true, message: 'Введите описание!' }]}
            >
                <Input.TextArea 
                    onChange={e => setFirstDescription(e.target.value)}
                    rows={6}
                />
            </Form.Item>
            <Form.Item
                label='Второе описание'
                name='secondDescription'
                rules={[{ required: true, message: 'Введите описание!' }]}
            >
                <Input.TextArea 
                    onChange={e => setSecondDescription(e.target.value)}
                    rows={6}
                />
            </Form.Item>
            <Col>
                <Button type='primary' htmlType='submit' loading={isLoading}>
                    Ок
                </Button>
            </Col>
        </Form>
    )
}