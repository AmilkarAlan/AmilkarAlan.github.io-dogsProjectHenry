import { useState } from 'react'
import { FormCreation } from '../../components/Form/FormCreation'
import style from './Create.module.css'
import { useSelector } from 'react-redux';

export const Create = () => {
  const [open, setOpen] = useState();
  const temperaments = useSelector(state => state.temperaments)
  return (
    <div className={style.create_main}>
      {/* <div className={open ? `${style.create_image_wrapper} ${style.open}` : style.create_image_wrapper} onClick={()=>setOpen(!open)}>
        <img src="https://th.bing.com/th/id/OIG3.qGB_V63E.SksgZqHeIaI?pid=ImgGn" alt="" />
      </div> */}
      <FormCreation temperaments={temperaments}/>
    </div>
  )
}
