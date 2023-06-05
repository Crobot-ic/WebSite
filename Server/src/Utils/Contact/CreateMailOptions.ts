const createMailOptions = (subject: string, name: string, email: string, content: string) => {
    const mailOptions = { 
        from: process.env.USER_MAIL, 
        to: process.env.ADMIN_MAIL,
        subject, 
        text: "Un nouveau message vient d'arriver depuis le site Web !\n\n" + 
        "Nom : " + name + 
        ".\nEmail : " + email + 
        ".\nSujet :" + subject +
        ".\n\nContenu :\n" + content 
    }   

    return mailOptions;
}

export default createMailOptions;