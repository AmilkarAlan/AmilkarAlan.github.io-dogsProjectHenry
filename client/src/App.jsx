import './App.css'
import { useSelector } from 'react-redux'
import { Layout } from './routes/Layout/Layout';
import { Route, Routes} from 'react-router-dom';
import { Detail } from './routes/Detail/Detail';
import CardsWrapper from './components/CardsWrapper/CardsWrapper';
import { Create } from './routes/Create/Create';

function App() {
  
  return (
    <Routes>
      <Route path='/' element={ <Layout  /> } >
        <Route path='home' element={ <CardsWrapper/> } />
        <Route path='detail/:id' element={ <Detail /> } />
        <Route path='create' element={ <Create /> } />
      </Route>
    </Routes>
  )
}

export default App
