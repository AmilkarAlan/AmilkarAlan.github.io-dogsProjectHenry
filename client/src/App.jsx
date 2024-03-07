import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { getDogs } from './redux/action';
import { useEffect } from 'react';
import CardsWrapper from './components/CardsWrapper/CardsWrapper';

function App() {
  const dogsApi = useSelector(state => state.dogsApi);
  const dogsDb = useSelector(state => state.dogsDb);
  const loading = useSelector(state => state.loading);
  const error = useSelector(state => state.error);
  const dispatch = useDispatch();

  const dogs = dogsApi.concat(dogsDb);

  useEffect(() => {
    dispatch(getDogs())
  }, [ dispatch ]);


  return (
    <>
      <CardsWrapper dogs={ dogs } />
    </>
  )
}

export default App
