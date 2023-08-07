import "../../styles/css/index.css";

const Activity = (props) => {
    const { name, icon } = props; 

    return (
        <div className="activity activity-visible">
            <div className="activity-shape">
                <div className="activity-shape-content">
                    <i className={ icon }></i>
                </div>
                <div className="activity-shape-overlay"></div> 
            </div>
            <h4 className="activity-description">{ name }</h4>
        </div>
    );
}

export default Activity;