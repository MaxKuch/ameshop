import { useState, useEffect } from 'react'
import { Button, Form, Upload } from 'antd'
import { UploadOutlined, PlusOutlined } from '@ant-design/icons'
import { fromFileToUrl, fileToDataUrl } from '../../../utils/functions'

export default function EditProductUploads({ 
        images, 
        audio, 
        handleImageChange, 
        handleAudioChange, 
        imageUploadValidator,
        audioUploadValidator
    }) {
    const [imagesList, setImagesList] = useState([])

    useEffect(() => {
        if(!images) return
        setImagesList(images.map(image => {
            if(image.url) {
                image.url = fromFileToUrl(image.url)
            }
            return image
        }))
    }, [images])

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await fileToDataUrl(file.originFileObj)
        }
    }
    
    return (
        <> 
            <Form.Item
                label="Изображения"
                name="image"
            >
                <Upload
                    listType="picture-card"
                    fileList={imagesList || []}
                    onChange={handleImageChange || (() => {})}
                    handlePreview={handlePreview}
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
                    fileList={audio}
                    onChange={handleAudioChange || (() => {})}    
                    beforeUpload={audioUploadValidator}
                >
                    <Button icon={<UploadOutlined />}>Загрузить</Button>
                </Upload>
            </Form.Item>
        </>
    
    )
}
