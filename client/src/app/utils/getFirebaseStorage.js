import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDp9--AsobrB22Hfh2wZOOo3e7N1PRospA",
    authDomain: "uchet-8baed.firebaseapp.com",
    projectId: "uchet-8baed",
    storageBucket: "uchet-8baed.appspot.com",
    messagingSenderId: "16706216824",
    appId: "1:16706216824:web:18396859126252ffa3de8d",
    measurementId: "G-WWX63Y60EE"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;
