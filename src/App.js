import './App.css';
import Auth from './Components/Auth/Auth';

//Redux
import { useSelector } from 'react-redux';

function App() {

  const state = useSelector((store) => store.auth);
  console.log(state);

  return (
    <div className="App">
      <Auth />
    </div>
  );
}

export default App;
