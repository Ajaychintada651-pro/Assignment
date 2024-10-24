import './App.css';
import HomePage from './components/HomePage/HomePage'
import Navbar from './components/Navbar/Navbar';
import CreateAgentPopup from './components/createAgentPopUp/createAgentPopup';
import Dummy from './components/Dummy'

function App() {
  const agentId = 'Ajay-Chintada--usWxMaw1pTNkzKkUoW8zb';
  const apiKey = 'ak-94fdc931167c4a13947dcd1e160fe4dd';

  return (
    <>
      <Navbar/>
      <HomePage />
      <CreateAgentPopup/>
      <Dummy agentId={agentId} apiKey={apiKey}/>
    </>
    
  );
}

export default App;
