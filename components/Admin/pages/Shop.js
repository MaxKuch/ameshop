import { useEffect, useState } from 'react'
import { Form, Input, Col, Button, message } from 'antd'
import axios from '../../../core/axios'
import useRequestConfig from '../../../hooks/useRequestConfig'

export default function Shop(){
    const [isLoading, setIsLoading] = useState(false)
    const requestConfig = useRequestConfig()
    const [description, setDescription] = useState('')
    const [title, setTitle] = useState('')

    useEffect(() => {
        const fetchCovers = async () => {
            try {
                const { data: { description, title } } = await axios.get('/shop-page')
                setDescription(description)
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
            await axios.put('/shop-page', {
                description,
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
                { name: ['text'], value: description },
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
                label='Описание'
                name='text'
                rules={[{ required: true, message: 'Введите описание!' }]}
            >
                <Input.TextArea 
                    onChange={e => setDescription(e.target.value)}
                    rows={30}
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