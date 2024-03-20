import style from './DogDetail.module.css'

export const DogDetail = ({ dog }) => {
    
    return (
        <div className={ style.detail_wrapper }>
            <div className={ style.detail_image_container }>
                <img src={ dog?.image_url } alt={ dog?.name } />
            </div>
            <div className={ style.detail_stats }>

                <div className={ style.detail_info }>
                    <h3>Name: <span>{ dog?.name }</span></h3>
                    <h3>Life expectancy: <span>{ dog?.life_span }</span></h3>
                </div>
                <div className={ style.detail_info }>
                    <ul>
                        <h3>Weight: </h3>
                        <li><span>Imperial: </span>{ dog?.weight?.imperial }</li>
                        <li><span>Metric: </span>{ dog?.weight?.metric }</li>
                    </ul>
                    <ul>
                        <h3>Height: </h3>
                        <li><span>Imperial: </span>{ dog?.height?.imperial }</li>
                        <li><span>Metric: </span>{ dog?.height?.metric }</li>
                    </ul>
                </div>
            </div>
            <div className={ style.detail_info }>
                <h3>Temperaments: </h3>
                <ul>
                    { dog?.temperaments?.map((t,i) => (
                        <li key={i}>{ t.name }</li>
                    )) }
                </ul>
            </div>
        </div>
    )
}
