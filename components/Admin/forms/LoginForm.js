import { useEffect, useState } from 'react'
import { Row, Form, Input, Button, Card, Col, message } from "antd"
import { loginThunk } from '../../../redux/thunks/auth'
import { useDispatch, useSelector } from 'react-redux'

export default function LoginForm() {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const { isLoading, error } = useSelector(state => state.auth)

    const submitHandler = () => {
        dispatch(loginThunk(login, password))
    }

    useEffect(() => {
        if(error)
            message.error(error)
    }, [error])
    
    return (
        <Row justify="center" align="middle" className="height-100">
            <Card>
                <Form
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    autoComplete="off"
                    onFinish={submitHandler}
                >
                    <Form.Item
                        label="Логин"
                        name="login"
                        rules={[{ required: true, message: 'Введите логин!' }]}
                    >
                        <Input 
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Пароль"
                        name="password"
                        rules={[{ required: true, message: 'Введите пароль!' }]}
                    >
                        <Input.Password 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Item>

                    <Col offset={8} >
                        <Button type="primary" htmlType="submit" loading={isLoading}>
                            Далее
                        </Button>
                    </Col>
                </Form>
            </Card>
        </Row>
    )
}