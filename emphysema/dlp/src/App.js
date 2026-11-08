import './App.css';
import {Routes,Route} from 'react-router-dom';
import Home from './Components/Home';
import TypesofEmphysema from './Components/TypesofEmphysema';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='typesofemphysema' element={<TypesofEmphysema />}></Route>
    </Routes>
  );
}

export default App;
