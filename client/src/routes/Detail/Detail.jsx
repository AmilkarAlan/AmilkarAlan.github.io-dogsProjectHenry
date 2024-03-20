import { useParams } from 'react-router-dom'
import style from './Detail.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getDetailDog } from '../../redux/action';
import { DogDetail } from '../../components/DogDetail/DogDetail';


export const Detail = () => {
    const [ dog, setDog ] = useState();
    const { id } = useParams();

    const dispatch = useDispatch();
    const detailsDog = useSelector(state => state.detailsDog)
    const loading = useSelector(state => state.searching)

    useEffect(() => {
        dispatch(getDetailDog(id))
    }, [ id, dispatch ])
    useEffect(() => {
        setDog(detailsDog)
        
    }, [ detailsDog ])

    return (
        <div className={style.detail_container}>
            {loading 
            ? 
            "cargando" 
            : 
            <DogDetail dog={dog}/>}
            
        </div>
    )
}
