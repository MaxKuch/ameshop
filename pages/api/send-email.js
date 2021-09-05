const nodemailer = require('nodemailer')

export default async function handler(req, res) {
    try {
        const { name, phone, email, comment } = req.body

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: 'johnkalligan.school@gmail.com', 
            pass: 'jkL*wTFl7s', 
            },
        })
        
        await transporter.sendMail({
            from: '"Amemusic" <johnkalligan.school@gmail.com>', 
            to: "narrm4517@gmail.com", 
            subject: "Сообщение",
            html: `
            <ul> 
                <li>Имя: ${name}</li>
                <li>Телефон: ${phone}</li>
                <li>Email: ${email}</li>
                <li>Сообщение: ${comment}</li>
            </ul>
            `, 
        })
        res.status(200).json({message: 'Ваше сообщение отправлено'})
    }
    catch(err) {
        console.error(err)
        res.status(500).json({message: 'Что то пошло не так'})
    }
   
}