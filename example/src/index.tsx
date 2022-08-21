import './index.css';
// import 'react-tailwindcss-typescript-component-boilerplate/dist/build.css';
import ReactDOM from 'react-dom/client';
import App from './routes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<App />);