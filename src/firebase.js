import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDhQQ747V5clR28MrwmNK5RqMQaLCUdhCg",
    authDomain: "uplyft-one.firebaseapp.com",
    projectId: "uplyft-one",
    storageBucket: "uplyft-one.appspot.com",
    messagingSenderId: "199559160757",
    appId: "1:199559160757:web:6d2dd4bef61cf7cb1b2ffc",
    measurementId: "G-H3XWDCFNVS"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {db}