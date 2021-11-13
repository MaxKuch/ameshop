import { Button, Form, Upload } from 'antd'
import { UploadOutlined, PlusOutlined } from '@ant-design/icons'

export default function AddProductUploads({ imageUploadValidator, audioUploadValidator}) {
    return (
        <>
            <Form.Item
                label="Изображения"
                name="image"  
            >
                <Upload
                    listType="picture-card"
                    beforeUpload={imageUploadValidator}
                    >
                    <div>
                        <PlusOutlined />
                        <div>Загрузить</div>
                    </div>
                    
                </Upload>
            </Form.Item>
            <Form.Item
                label="Аудио"
                name="audio"
            >
                <Upload 
                    maxCount={1}
                    beforeUpload={audioUploadValidator}
                >
                    <Button icon={<UploadOutlined />}>Загрузить</Button>
                </Upload>
            </Form.Item>
        </>
    )
}
