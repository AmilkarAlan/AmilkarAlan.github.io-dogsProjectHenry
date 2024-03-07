
import style from './Card.module.css'

const Card = ({ dog }) => {
    return (
        <div className={ style.card_wrapper }>
            <div className={ style.card }>
                <img className={ style.image } src={ dog.image_url } alt={ dog.name } />
                <div className={ style.card_cover }>
                    <p>{ dog.name }</p>
                    <div className={ style.card_cover_wave }>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#f1b91c" fill-opacity="1" d="M0,224L48,208C96,192,192,160,288,176C384,192,480,256,576,240C672,224,768,128,864,112C960,96,1056,160,1152,176C1248,192,1344,160,1392,144L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card