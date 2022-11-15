import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAgrxob3PMDOa9gv_pMxfi1yUINn1aBcm8",
  authDomain: "fb-login-6033c.firebaseapp.com",
  projectId: "fb-login-6033c",
  storageBucket: "fb-login-6033c.appspot.com",
  messagingSenderId: "918484835912",
  appId: "1:918484835912:web:f0f66fe11fa836f880427d",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
