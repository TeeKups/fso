import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './App';
import { NotificationProvider } from './components/Notifications';

import './style.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <NotificationProvider>
        <App />
    </NotificationProvider>
);
