import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyDUS8HEbF7QfIy8ntwU46MccOw-0lUGowU',
	authDomain: 'hyle-9de72.firebaseapp.com',
	projectId: 'hyle-9de72',
	storageBucket: 'hyle-9de72.appspot.com',
	messagingSenderId: '573960996669',
	appId: '1:573960996669:web:c80a55127ed95fb90c2754'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
