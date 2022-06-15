import {
    getDatabase,
    onValue,
    push,
    ref,
    remove,
    set,
  } from "firebase/database";
  
  import { firebaseConfig } from "./fb-credentials";
  import { initializeApp } from "firebase/app";

  
export function initQuoteDB() {
    initializeApp(firebaseConfig);
  }
  
  export function storeQuoteItem(item,username) {
    console.log('Writing: ', item);
    const db = getDatabase();
    const reference = ref(db, `quotes/${username}/`);
    push(reference, item);
  }

  export function createUserAccount(item) {
    console.log('Writing: ', item);
    const db = getDatabase();
    const reference = ref(db, "users/");
    push(reference, item);
  }