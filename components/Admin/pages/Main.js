import { useEffect, useState } from 'react'
import { Form, Input, Col, Button, message } from 'antd'
import axios from '../../../core/axios'
import useRequestConfig from '../../../hooks/useRequestConfig'

export default function Main(){
    const [isLoading, setIsLoading] = useState(false)
    const requestConfig = useRequestConfig()
    const [description, setDescription] = useState('')

    useEffect(() => {
        const fetchMainPage = async () => {
            try {
                const { data: { description: description } } = await axios.get('/main-page')
                setDescription(description)
            }
            catch(error) {
                message.error('Что-то пошло не так при загруке данных')
                console.error(error)
            }
        }
        
        fetchMainPage()
    }, [])

    const editHandler = async () => {
        setIsLoading(true)
        try {
            await axios.put('/main-page', {
                description
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
            fields={[{ name: ['description'], value: description }]}
            onFinish={editHandler}
        >
            <Form.Item
                label='Описание'
                name='description'
                rules={[{ required: true, message: 'Введите описание!' }]}
            >
                <Input.TextArea 
                    onChange={e => setDescription(e.target.value)}
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