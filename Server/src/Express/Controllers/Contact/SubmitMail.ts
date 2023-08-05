import Mail from "../../../Models/Mail";
import transporter from "../../../Services/MailTransporter";
import embedContact from "../../../Utils/Discord/EmbedContact";
import createMailOptions from "../../../Utils/Contact/CreateMailOptions";

const sendMail = async (req: any, res: any) => {
    // Send the embed
    const channel = await req.clientDiscord.channels.fetch(process.env.CONTACT_CHANNEL as string) as any;
    const embeds = [embedContact(req.body.subject, req.body.name, req.body.email, req.body.content)];
    channel.send({ embeds });


    // Save the mail in the database
    await Mail.create({
        nameSender: req.body.name, 
        mailSender: req.body.email, 
        content: req.body.content,
        subject: req.body.subject, 
        dateMail: "" + Date.now()
    })

    // Send the email
    const mailOptions = createMailOptions(req.body.subject, req.body.name, req.body.email, req.body.content);
    transporter.sendMail(mailOptions, (err, suc) => {
        if(suc) return res.status(200).json("Message envoyé avec succès !");
        if(err) return res.status(500).json("Une erreur s'est produite");
    })
}

export default sendMail;