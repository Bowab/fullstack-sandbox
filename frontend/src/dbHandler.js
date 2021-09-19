import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc } from "firebase/firestore";


initializeApp({
  apiKey: "AIzaSyBaZF9SsFxmQN_5PIvCgcNqo72dJ3GxGe8",
  authDomain: "todo-8e6ea.firebaseapp.com",
  projectId: "todo-8e6ea",
  storageBucket: "todo-8e6ea.appspot.com",
  messagingSenderId: "727762765489",
  appId: "1:727762765489:web:319cd424e416ed47390490"
});

const db = getFirestore();





export async function GetTodos() {
  // SeedData();
  const query = await getDocs(collection(db, "todos"))
  var items = [];
  query.forEach((doc) => {
    items.push(doc.data());
  })
  return items;
}

/// Lite slarvigt, vi skriver över allt i databasen.
///
export function WriteTodo(toDoLists) {
  console.log("Saving data...");
  toDoLists.forEach(element => {
    if (element.todos) {
      setDoc(doc(db, "todos", element.title), element);
    }
  });

}

/// Use seed data to get initial data.
///
function SeedData() {
  var firstList =
  {
    "title": "First List",
    "id": "0000000001",
    "todos": [
      {
        "todo": "First todo of first list!",
        "complete": false
      }
    ]
  };
  var secondList =
  {
    "title": "Second List",
    "id": "0000000002",
    "todos": [
      {
        "todo": "First todo of second list!",
        "complete": false
      }
    ]
  };

  setDoc(doc(db, "todos", "First List"), firstList);
  setDoc(doc(db, "todos", "Second List"), secondList);

}


