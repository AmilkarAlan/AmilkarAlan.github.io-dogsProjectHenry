
import { Link } from 'react-router-dom'
import style from './Card.module.css'

const Card = ({ dog }) => {
    return (
        <div className={ style.card }>
            <img src={ dog.image_url } />
            <div className={ style.card__content }>
                <p className={ style.card__title }>{ dog.name }
                </p>
                <Link className={ style.card__link } to={`/detail/${dog.id}`}>Saber mas</Link>
            </div>
        </div>
    )
}

export default Card