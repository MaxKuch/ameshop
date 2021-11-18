import { Button, Form, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

export default function EditCoverUploads({ 
        audio, 
        handleAudioChange, 
        audioUploadValidator
    }) {
    
    return (
        <> 
            <Form.Item
                label="Аудио"
                name="audio"
            >
                <Upload 
                    maxCount={1}
                    fileList={audio}
                    onChange={handleAudioChange}    
                    beforeUpload={audioUploadValidator}
                >
                    <Button icon={<UploadOutlined />}>Загрузить</Button>
                </Upload>
            </Form.Item>
        </>
    
    )
}
