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
  
  export function storeQuoteItem(item) {
    console.log('Writing: ', item);
    const db = getDatabase();
    const reference = ref(db, "quotes/");
    push(reference, item);
  }