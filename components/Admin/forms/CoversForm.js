import { Upload, Form, Col, Button, Input, message } from 'antd'
import EditUploads from './EditCoverUploads'
import AddUploads from './AddCoverUploads'

export default function ProductForm({ type, form, onFinish, fields, onFieldsChange, isLoading, handleAudioChange, ...props }) {
    const permittedAudioFormats = ['audio/mpeg', 'audio/mp4', 'audio/wav', 'audio/x-wav', 'audio/ogg']

    const UploadsTypes = {
        edit: EditUploads,
        add: AddUploads
    }
    
    const formPropsTypes = {
        edit: {
            fields,
            onFieldsChange
        },
        add: {}
    }

    const Uploads = UploadsTypes[type]
    const formProps = formPropsTypes[type]

    const fileUploadValidator = permittedFormats => file => {
        if(permittedFormats.indexOf(file.type) === -1) {
            message.error(`У файла ${file.name} недопустимый формат`)
            return Upload.LIST_IGNORE
        }
        return true
    }

    return (
        <Form
            form={form}
            layout='vertical'
            autoComplete='off'
            onFinish={onFinish}
            {...formProps}
        >
            <Form.Item
                label='Автор песни'
                name='songAuthor'
                rules={[{ required: true, message: 'Введите автора!' }]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label='Название песни'
                name='songName'
                rules={[{ required: true, message: 'Введите название!' }]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label='Текст песни'
                name='lyrics'
            >
                <Input.TextArea rows={6}/>
            </Form.Item>
            <Uploads 
                {...props} 
                handleAudioChange={handleAudioChange}
                audioUploadValidator={fileUploadValidator(permittedAudioFormats)} 
            />
            <Col>
                <Button type='primary' htmlType='submit' loading={isLoading}>
                    Ок
                </Button>
            </Col>
        </Form>
    )
}