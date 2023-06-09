import "../../styles/css/index.css";

const GoTo = (props) => {
    const { title, children, actionButton, buttonName } = props;

    const submitAction = () => actionButton();

    return (
        <section className="go-to">
            <h2 className="go-to-title title-part">{ title }</h2>
            {children}
            <button 
                onClick={submitAction}
                className="go-to-button button"
            >{ buttonName }</button>
        </section>
    );
}

export default GoTo