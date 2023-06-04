import { useState } from "react"
import Loader from "../General/Loader"
import informations from "../../../informations.json";
import Modal from "../General/Modal";

const Contact = async () => {
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [subject, setSubject] = useState("");
    const [informationModal, setInformationModal] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");

    const closeAlert = () => setShowModal(false);

    const submitForm = async () => {
        const requestOptions = {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ content, email, name, subject })
        };

        setLoading(true);
        const res = await fetch(informations.urlApi + "/contact/send", requestOptions);
        const data = await res.json();
        setTitleModal(res.ok ? "Succès" : "Erreur");
        setInformationModal(data.information);
        setLoading(false);
        setShowModal(true);
    }

    return (
        <section className="contact-us">
        <div className="contact-us-title">
            <h3>Contactez-nous !</h3>
        </div>

        <form 
            onSubmit={submitForm}
            id="contact-form"
            className="form contact-form"
        >   
            <button 
                className="button button-submit submit-form little-size-button"
                type="submit"
            >Valider</button>

            <textarea 
                id="mail-content"
                className="content-message input-contact"
                onChange={event => setContent(event.target.value)}
                placeholder="Entrez le contenu de votre message"
            ></textarea>

            <div className="informations-contact">
                <div className="contact-form-group">
                    <input 
                        type="text"
                        placeholder="Entrez votre nom" 
                        className="input-contact contact-name"
                        onChange={event => setName(event.target.value)}
                    />
                </div>

                <div className="contact-form-group">
                    <input 
                        type="text" 
                        id="email-contact-form"
                        placeholder="Entrez votre email"
                        onChange={event => setEmail(event.target.value)} 
                        className="input-contact contact-email"
                    />
                </div>

                <div className="contact-form-group">
                    <input 
                        type="text"
                        id="object-contact-form"
                        placeholder="Entrez le sujet de votre contact"
                        onChange={event => setSubject(event.target.value)}
                        className="input-contact contact-object"
                    />
                </div>

                <button 
                    className="button button-submit submit-form"
                    type="submit"
                >Valider</button>
            </div>
        </form>

        {loading && <Loader />}
        {showModal && <Modal
            titleModal={titleModal}
            nameButton="Fermer"
            closeModal={closeAlert}
            createAction={closeAlert}
        >
            <p>{ informationModal }</p>
        </Modal>}
        {/* <Modal
            :titleModal="titleInformation"
            :nameButton="'Fermer'"
            @createAction="closeAlert"
            @closeModal="closeAlert"
            v-if="showInfo"
        >
            <p>{{ information }}</p>
        </Modal> */}
    </section>
    )
}

export default Contact;