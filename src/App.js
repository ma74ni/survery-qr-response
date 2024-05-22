import './App.css';
import {useState} from 'react' 
import Questions from './components/Questions';
import { Toaster } from 'react-hot-toast';
import Welcome from './components/Welcome';
import { ThemeProvider } from '@mui/material/styles';
import theme from './themes/theme';


function App() {
  const [isStarted, setIsStarted] = useState(false)

  const handleStart = () => {
    setIsStarted(true)
  }
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Toaster />
        {isStarted ? (<Questions />) : (<Welcome handleStart={handleStart}/>)}
      </ThemeProvider>
      
    </div>
  );
}

export default App;
