import "../App.css";
import { useEffect, useState } from "react";
import { db } from "../utils/Firebase";
import { onSnapshot, collection } from "firebase/firestore";
import { addNewBook, deleteBook, editBook } from "../utils/utils";
import Main from "./Main";
import AddBookPopup from "./AddBookPopup";
import PopupWithCard from "./PopupWithCard";
import EditBookPopup from "./EditBookPopup";
import Header from "./Header";
import "swiper/css";
import "swiper/css/navigation";
import Card from "./Card";

function App() {
  const [books, setBooks] = useState([]);
  const [isAddPopupOpen, setAddPopupOpen] = useState(false);
  const [isRecPopupOpen, setRecPopupOpen] = useState(false);
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);
  const [editedBook, setEditedBook] = useState(null);
  const [recommendBook, setRecommendBook] = useState(null);

  useEffect(() => {
    onSnapshot(collection(db, "books"), async (snapshot) => {
      setBooks(
        await snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
  }, []);

  function handleDeleteBook(bookId) {
    deleteBook(bookId);
  }

  function handleEditBook(book) {
    editBook(book).then(() => {
      closePopups();
    });
  }

  function handleEditClick(book) {
    setEditedBook(book);
    setEditPopupOpen(true);
  }

  function handleAddBook(book) {
    delete book.id;
    addNewBook(book).then(() => {
      closePopups();
    });
  }

  function handleRecommend() {
    sortByAgeRating();
    console.log(recommendBook)
    setRecPopupOpen(true);
  }

  function sortByAgeRating() {
    const yearCondition = new Date().getFullYear() - 3;
    let bestByAgeAndRating = books.filter((book) => {
      return book.year < yearCondition;
    });
    const highestRating = bestByAgeAndRating.reduce((acc, curr) => {
      return acc > curr.rating ? acc : curr.rating;
    }, 0);

    bestByAgeAndRating = bestByAgeAndRating.filter((book) => {
      return book.rating === highestRating;
    });
    setRecommendBook(
      bestByAgeAndRating[Math.floor(Math.random() * bestByAgeAndRating.length)]
    );
  }

  function handleAddBtnClick() {
    setAddPopupOpen(true);
  }

  function closePopups() {
    setAddPopupOpen(false);
    setRecPopupOpen(false);
    setEditPopupOpen(false);
  }

  return (
    <div className="page">
      <Header />
      <Main
        books={books}
        onAddBtnClick={handleAddBtnClick}
        onRecommend={handleRecommend}
        onDelete={handleDeleteBook}
        onEditClick={handleEditClick}
        onEdit={handleEditBook}
      />
      <AddBookPopup
        isOpen={isAddPopupOpen}
        onClose={closePopups}
        onSubmit={handleAddBook}
        title={"Добавить книгу"}
        textButton={"Добавить"}
        altTextButton={"Добавление..."}
      />
      <EditBookPopup
          isOpen={isEditPopupOpen}
          onClose={closePopups}
          onSubmit={handleEditBook}
          editedBook={editedBook}
      />
      <PopupWithCard
        isOpen={isRecPopupOpen}
        title={"Вот отличная книга!"}
        onClose={closePopups}
        textButton={"ОК"}
        onSubmit={closePopups}
      >
        <Card
          book={recommendBook}
          disableButtons={true}
        />
      </PopupWithCard>
    </div>
  );
}

export default App;