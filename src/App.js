import './App.css';
import HomePage from './components/HomePage/HomePage'
import Navbar from './components/Navbar/Navbar';
import CreateAgentPopup from './components/createAgentPopUp/createAgentPopup';

function App() {
  return (
    <>
      <Navbar/>
      <HomePage/>
      <CreateAgentPopup/>
    </>
    
  );
}

export default App;
