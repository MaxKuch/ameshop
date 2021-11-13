import { Button, Form, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

export default function AddCoverUploads({ audioUploadValidator}) {
    return (
        <>
            <Form.Item
                label="Аудио"
                name="audio"
                rules={[{ required: true, message: 'Загрузите аудиофайл!' }]}
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
