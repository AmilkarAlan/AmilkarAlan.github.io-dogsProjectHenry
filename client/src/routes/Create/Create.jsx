import { FormCreation } from '../../components/Form/FormCreation'
import style from './Create.module.css'

export const Create = ({temperaments}) => {
  return (
    <div className={style.create_main}>
      <FormCreation temperaments={temperaments}/>
    </div>
  )
}
