import "../../styles/css/index.css";

const Service = (props) => {
    const { name, icon } = props; 

    return (
        <div class="service-container-visible">
            <div class="service">
                <div class="content"></div> 
                <div class="overlay"></div>
                <i className={icon} aria-hidden="true"></i>
            </div>
            <h4 class="description">{ name }</h4>
        </div>
    );
}

export default Service;