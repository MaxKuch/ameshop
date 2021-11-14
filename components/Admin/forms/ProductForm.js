import { Upload, Form, Col, Button, Input, InputNumber, Select, message } from 'antd'
import EditUploads from './EditProductUploads'
import AddUploads from './AddProductUploads'

export default function ProductForm({ type, form, productTypes, onFinish, fields, onFieldsChange, isLoading, slugs, currentProduct, ...props }) {
    const permittedImageFormats = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp']
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
        return false
    }

    return (
        <Form
            form={form}
            layout='vertical'
            autoComplete='off'
            onFinish={onFinish}
            {...formProps}
            scroll={{
                x: true
            }}
        >
            <Form.Item
                label='Заголовок'
                name='title'
                rules={[{ required: true, message: 'Введите заголовок!' }]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label='Подзаголовок'
                name='subtitle'
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label='Описание'
                name='description'
            >
                <Input.TextArea rows={6}/>
            </Form.Item>
            <Form.Item
                label='Цена'
                name='price'
                rules={[{ required: true, message: 'Введите цену!' }]}
            >
                <InputNumber
                    min='1'
                    step='0.01'
                />
            </Form.Item>
            <Form.Item
                label='Текст песни'
                name='lyrics'
            >
                <Input.TextArea rows={6}/>
            </Form.Item>
            <Form.Item
                label='Категория'
                name='product_type'
            >
                <Select>
                    {productTypes.map(productType => (
                        <Select.Option key={productType.id} value={productType.id}>{productType.productType}</Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Uploads 
                {...props} 
                imageUploadValidator={fileUploadValidator(permittedImageFormats)} 
                audioUploadValidator={fileUploadValidator(permittedAudioFormats)} 
            />
            <Form.Item
                label='Идентефикатор'
                name='slug'
                rules={[
                    {
                        required: true,
                        message: 'Введите идентификатор!'
                    },
                    () => ({
                        validator(_, value) {
                            if(slugs.some(({ slug, id }) => slug === value && id !== currentProduct))
                                return Promise.reject(new Error('Идентификатор должен быть уникальным!'))
                            return Promise.resolve()
                        },
                    })
                ]}
            >
                <Input/>
            </Form.Item>
            <Col>
                <Button type='primary' htmlType='submit' loading={isLoading}>
                    Ок
                </Button>
            </Col>
        </Form>
    )
}