import ReactDOM from 'react-dom/client';
import './Style/index.css';
import App from './App';
import DeleteCall from './components/DeleteCall';
import CallForm from './components/CallForm';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    <App />
    <CallForm />
  </>
); 
