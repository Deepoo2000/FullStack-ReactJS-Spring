import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';


const stripePromise = loadStripe('pk_test_51PaYE1BDgzHqylMQ7rr5x67VzgkFkd5kxg9js7DXraDkgI8ndQjOAxdrxKGAuz2c39diVmNiA8HD7nNfMYq3kx8d00YpqrmXBG');

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </BrowserRouter>
);

function createRoot(arg0: HTMLElement) {
  throw new Error('Function not implemented.');
}

