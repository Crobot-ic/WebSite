import "../../styles/css/index.css";

const Star = (props) => {
    const { filled } = props;

    return (
        <div className="star">
            <div className="star-empty" style={{ maxWidth: ((1 - filled) * 100) + "%" }}></div> 
        </div>
    );
}

export default Star;