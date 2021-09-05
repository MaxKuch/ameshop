import React from 'react'
import styles from './Contacts.module.scss'
import classNames from 'classnames'
import Input from '../../components/FormElements/Input'
import Textarea from '../../components/FormElements/Textarea'
import Button from '../../components/Button'
import { Formik } from 'formik'
import axios from 'axios'
import { Modal, Result } from 'antd'
import ModalWrapper from '../../components/ModalWrapper'
import LoadingOverlay from '../../components/LoadingOverlay'
import { API_URL } from '../../utils/urls'

export default function Form() {
    const [modalVisible, setModalVisible] = React.useState(false)
    const [modalContent, setModalContent] = React.useState({status: '', title: ''})
    const [loadingOverlayVisible, setLoadingOverlayVisible] = React.useState(false)

    const handleCancel = () => {
        setModalVisible(false)
    }

    const onSubmit = async (values, actions) => {
        setLoadingOverlayVisible(true)
        try {
            const response = await axios.post(`${API_URL}/api/send-email`, values)
            setModalContent({
                status: 'success',
                title: response.data.message
            })
            setModalVisible(true)
            actions.resetForm()
        }
        catch(error) {
            setModalContent({
                status: 'error',
                title: error.response.data.message
            })
            setModalVisible(true)
            console.error(error)
        }
        finally {
            setLoadingOverlayVisible(false)
        }
    }

    return (
        <>
            <h2 className={classNames(styles.formTitle, 'title')}>
                Напиши нам
            </h2>
            <Formik 
                initialValues = {
                    {
                        name: '',
                        phone: '',
                        email: '',
                        comment: ''
                    }
                }
                validate={validator}
                onSubmit={onSubmit}
            >
                {
                    (
                        {
                            values,
                            handleChange,
                            handleSubmit,
                            handleBlur,
                            errors,
                            touched
                        }
                    ) => (
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <Input 
                                id={'name'} 
                                type='name' 
                                name='name' 
                                label={'Имя'} 
                                value={values.name} 
                                onBlur={handleBlur} 
                                onChange={handleChange} 
                                isInvalid={touched.name && errors.name} 
                                errorMessage={touched.name && errors.name}
                            />
                            <Input 
                                id={'phone'} 
                                name='phone' 
                                type='phone'
                                label={'Телефон'} 
                                value={values.phone} 
                                onBlur={handleBlur} 
                                onChange={handleChange} 
                                isInvalid={touched.phone && errors.phone} 
                                errorMessage={touched.phone && errors.phone}
                            />
                            <Input 
                                id={'email'}
                                name='email' 
                                type='email'
                                label={'Email'} 
                                value={values.email} 
                                onBlur={handleBlur} 
                                onChange={handleChange} 
                                isInvalid={touched.email && errors.email} 
                                errorMessage={touched.email && errors.email}
                            />
                            <Textarea 
                                id={'comment'} 
                                name='comment' 
                                label={'Сообщение'} 
                                onBlur={handleBlur} 
                                value={values.comment} 
                                onChange={handleChange} 
                                isInvalid={touched.comment && errors.comment} 
                                errorMessage={touched.comment && errors.comment}
                            />
                            <Button fill={true} text="Отправить" type="submit" disabled={errors.name || errors.email || errors.phone || errors.comment }/>
                        </form>
                    )
                }
               
            </Formik>
            <Modal
                visible={modalVisible}
                onCancel={handleCancel}
                width={700}
                centered
                modalRender={() => (
                    <ModalWrapper handleCancel={handleCancel}>
                        <Result 
                            status={modalContent.status}
                            title={modalContent.title}
                        />
                    </ModalWrapper>
                )}
            />
            <LoadingOverlay visible={loadingOverlayVisible}/>
        </>
    )
}

function validator(values) {
    const errors = {}
    if(!values.name) {
        errors.name = 'Введите ваше имя'
    }
    else if(/[^a-zа-я\s-]/i.test(values.name)) {
        errors.name = 'Не допускаются никакие символы, кроме русского и английского алфавита'
    }
    if(!values.phone) {
        errors.phone = 'Введите ваш телефон'
    }
    else if(/[^\d\s\(\)_+-]/i.test(values.phone)) {
        errors.phone = 'Не допускаются никакие символы, кроме цифр, +, -, _, (, и )'
    }
    if(!values.email) {
        errors.email = 'Введите ваш Email'
    }
    else if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.email)){
        errors.email = 'Неверный формат Email'
    }
    if(!values.comment) {
        errors.comment = 'Введите ваше сообщение'
    }
    return errors
}
