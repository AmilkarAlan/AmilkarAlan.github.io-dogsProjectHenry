import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { getDogs, getTemperaments } from './redux/action';
import { useEffect} from 'react';
import { Home } from './routes/Home/Home';
import { Route, Routes } from 'react-router-dom';
import { Detail } from './routes/Detail/Detail';
import CardsWrapper from './components/CardsWrapper/CardsWrapper';
import { Create } from './routes/Create/Create';

function App() {
  const dogs = useSelector(state => state.dogs);
  const temperaments = useSelector(state => state.temperaments)
  const loading = useSelector(state => state.loading);
  const error = useSelector(state => state.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDogs())
    dispatch(getTemperaments())
  }, [ dispatch ]);


  return (
    <Routes>
      <Route path='/' element={ <Home dogs={ dogs } loading={loading}/> } >
        <Route path='/' element={<CardsWrapper dogs={ dogs } loading={ loading } temperaments={temperaments}/>}/>
        <Route path='detail/:id' element={<Detail/>}/>
        <Route path='create' element={<Create temperaments={temperaments}/>}/>
      </Route>
    </Routes>
  )
}

export default App
