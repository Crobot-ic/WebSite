import Mail from "nodemailer/lib/mailer";
import transporter from "../../Services/MailTransporter";

const sendMail = (req: any, res: any) => {
    const mailOptions = { 
        from: process.env.USER_MAIL, 
        to: process.env.ADMIN_MAIL,
        subject : req.body.subject, 
        text: 
            "Un nouveau message vient d'arriver depuis le site Web !\n\n" + 
            "Nom : " + req.body.name + 
            ".\nEmail : " + req.body.email + 
            ".\nSujet :" + req.body.subject +
            ".\n\nContenu :\n" + req.body.content 
    }

    transporter.sendMail(mailOptions, (err, suc) => {
        if(suc) return res.status(200).json("Message envoyé avec succès !");
        if(err) return res.status(500).json("Une erreur s'est produite");
    })
}

export default sendMail;