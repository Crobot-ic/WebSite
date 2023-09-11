import Mail from "../../../Models/Mail";
import transporter from "../../../Services/MailTransporter";
import embedContact from "../../../Utils/Discord/EmbedContact";
import createMailOptions from "../../../Utils/Contact/CreateMailOptions";
import channelInformations from "../../../../ChannelsConfig.json";
import { TextBasedChannel } from "discord.js";

const sendMail = async (req: any, res: any) => {
    console.log("Hein ?");
    
    if(process.env.MODE != "prod" && process.env.MODE != "dev") {
        return res.status(500).json({ information: "Wooops, something went wrong !" });
    }
    const runMode = process.env.MODE;

    // Send the embed
    const channel = await req.clientDiscord.channels.fetch(channelInformations[runMode].CONTACT_CHANNEL) as TextBasedChannel;
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

    if (!await transporter.verify()) {
        console.log("The mail transporter is not working !");
        return res.status(500).json({ information: "Une erreur s'est produite" });
    } else { 
        try {
            await transporter.sendMail(mailOptions);
            return res.status(200).json({ information: "Message envoyé avec succès !" });
        } catch {
            return res.status(500).json({ information: "Une erreur s'est produite" });
        }
    }
}

export default sendMail;