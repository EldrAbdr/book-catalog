import { db } from "./Firebase";
import { collection, addDoc, doc, deleteDoc, setDoc } from "firebase/firestore";

const bookCollectionRef = collection(db, "books");

export function addNewBook(book) {
  return addDoc(bookCollectionRef, book);
}

export function deleteBook(bookId) {
  const bookRef = doc(db, "books", bookId);
  return deleteDoc(bookRef);
}

export function editBook(book) {
  const bookRef = doc(db, "books", book.id);
  return setDoc(bookRef, book);
}
