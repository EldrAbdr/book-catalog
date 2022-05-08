import PopupWithForm from "./PopupWithForm";
import { useState, useEffect, useRef } from "react";

export default function AddBookPopup({ isOpen, onClose, onSubmit, title, textButton, altTextButton, editedBook }) {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");
  const [isbn, setIsbn] = useState("");

  const nameRef = useRef();
  const descriptionRef = useRef();

  useEffect(() => {
    setName(editedBook? editedBook.name: "");
    setAuthor(editedBook? editedBook.author: "");
    setRating(editedBook? editedBook.rating: "");
    setYear(editedBook? editedBook.year: "");
    setIsbn(editedBook? editedBook.isbn: "");
  }, [isOpen]);

  function handleChange(e) {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "author":
        setAuthor(e.target.value);
        break;
      case "year":
        setYear(e.target.value);
        break;
      case "rating":
        setRating(e.target.value);
        break;
      case "isbn":
        setIsbn(e.target.value);
        break;
    }
  }

  function handleAddSubmit(e) {
    e.preventDefault();
    onSubmit({
      name: name,
      author: author,
      year: year,
      rating: rating,
      isbn: isbn,
      id: editedBook? editedBook.id: null
    });
  }

  return (
    <PopupWithForm
      name="addBookPopup"
      title={title}
      textButton={textButton}
      altTextButton={altTextButton}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleAddSubmit}
    >
      <div className="form__inputs">
        <input
          type="text"
          id="name"
          className="form__input form__input_name"
          placeholder="Название"
          name="name"
          value={name}
          minLength="2"
          maxLength="100"
          required
          onChange={handleChange}
        />
        <span className="form__input-error avatar-input-error" />
        <input
          type="text"
          id="author"
          className="form__input form__input_profession"
          placeholder="Автор"
          name="author"
          value={author}
          required
          minLength="2"
          maxLength="100"
          onChange={handleChange}
        />
        <span className="form__input-error avatar-input-error" />
        <input
          type="text"
          id="year"
          className="form__input form__input_profession"
          placeholder="Год издания"
          name="year"
          value={year}
          minLength="4"
          maxLength="4"
          onChange={handleChange}
        />
        <span className="form__input-error avatar-input-error" />
        <input
          type="text"
          id="raring"
          className="form__input form__input_profession"
          placeholder="Рейтинг"
          name="rating"
          value={rating}
          minLength="1"
          maxLength="2"
          onChange={handleChange}
        />
        <span className="form__input-error avatar-input-error" />
        <input
          type="text"
          id="isbn"
          className="form__input form__input_profession"
          placeholder="ISBN"
          name="isbn"
          value={isbn}
          minLength="2"
          maxLength="200"
          onChange={handleChange}
        />
        <span className="form__input-error avatar-input-error" />
      </div>
    </PopupWithForm>
  );
}
