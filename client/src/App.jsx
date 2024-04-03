import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { getDogs, getTemperaments } from './redux/action';
import { useEffect } from 'react';
import { Layout } from './routes/Layout/Layout';
import { Route, Routes, useLocation } from 'react-router-dom';
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
      dispatch(getTemperaments())
      dispatch(getDogs())
  }, [ dispatch]);


  return (
    <Routes>
      <Route path='/' element={ <Layout dogs={ dogs } loading={ loading } /> } >
        <Route path='home' element={ <CardsWrapper dogs={ dogs } loading={ loading } temperaments={ temperaments } /> } />
        <Route path='detail/:id' element={ <Detail /> } />
        <Route path='create' element={ <Create temperaments={ temperaments } /> } />
      </Route>
    </Routes>
  )
}

export default App
