import ReactDOM from 'react-dom/client';
import './Style/index.css';
import App from './App';
import CallForm from './Components/CallForm';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    <App />
    <CallForm />
  </>
); 
