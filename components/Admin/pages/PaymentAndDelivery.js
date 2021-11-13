import { useEffect, useState } from 'react'
import { Form, Input, Col, Button, message } from 'antd'
import axios from '../../../core/axios'
import useRequestConfig from '../../../hooks/useRequestConfig'

export default function PaymentAndDelivery(){
    const [isLoading, setIsLoading] = useState(false)
    const requestConfig = useRequestConfig()
    const [text, setText] = useState('')
    const [title, setTitle] = useState('')

    useEffect(() => {
        const fetchCovers = async () => {
            try {
                const { data: { text, title } } = await axios.get('/payment-and-delivery-page')
                setText(text)
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
            await axios.put('/payment-and-delivery-page', {
                text,
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
                { name: ['text'], value: text },
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
                label='Текст соглашения'
                name='text'
                rules={[{ required: true, message: 'Введите текст соглашения!' }]}
            >
                <Input.TextArea 
                    onChange={e => setText(e.target.value)}
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