import { useRef, useState } from "react"
import Loader from "../General/Loader"
import informations from "../../../informations.json";
import Modal from "../General/Modal";
import '../../styles/css/index.css';

const Contact = () => {
    const [loading, setLoading] = useState(false);
    const [informationModal, setInformationModal] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");

    const contentRef = useRef();
    const emailRef = useRef();
    const nameRef = useRef();
    const subjectRef = useRef();

    const closeAlert = () => setShowModal(false);

    const resetForm = () => {
        contentRef.current.value = "";
        emailRef.current.value = "";
        nameRef.current.value = "";
        subjectRef.current.value = "";
    }

    const submitForm = async (event) => {
        event.preventDefault();

        const requestOptions = {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                content: contentRef.current.value, 
                email: emailRef.current.value, 
                name: nameRef.current.value, 
                subject: subjectRef.current.value,  
            })
        };
        
        resetForm();

        setLoading(true);
        
        const res = await fetch(informations.urlApi + "/contact/sendMail", requestOptions);
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
                ref={contentRef}
                placeholder="Entrez le contenu de votre message"
            ></textarea>

            <div className="informations-contact">
                <div className="contact-form-group">
                    <input 
                        type="text"
                        placeholder="Entrez votre nom" 
                        className="input-contact contact-name"
                        ref={nameRef}
                    />
                </div>

                <div className="contact-form-group">
                    <input 
                        type="text" 
                        id="email-contact-form"
                        placeholder="Entrez votre email"
                        ref={emailRef}
                        className="input-contact contact-email"
                    />
                </div>

                <div className="contact-form-group">
                    <input 
                        type="text"
                        id="object-contact-form"
                        placeholder="Entrez le sujet de votre contact"
                        ref={subjectRef}
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
    </section>
    )
}

export default Contact;