import PopupWithForm from "./PopupWithForm";
import InputError from "../InputError";
import { useState, useEffect, useRef } from "react";

export default function AddBookPopup({
  isOpen,
  onClose,
  onSubmit,
  title,
  textButton,
  altTextButton,
  editedBook,
}) {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");
  const [isbn, setIsbn] = useState("");
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isNameValid, setNameValid] = useState(false);
  const [isAuthorValid, setAuthorValid] = useState(false);
  const [isFormValid, setFormValid] = useState(false);
  const [inputErrors, setInputErrors] = useState({
    name: "",
    author: "",
    year: "",
    rating: "",
    isbn: "",
  });
  const nameRef = useRef();
  const authorRef = useRef();

  useEffect(() => {
    setName(editedBook ? editedBook.name : "");
    setAuthor(editedBook ? editedBook.author : "");
    setRating(editedBook ? editedBook.rating : "");
    setYear(editedBook ? editedBook.year : "");
    setIsbn(editedBook ? editedBook.isbn : "");
    setFormValid(!!editedBook);
    setInputErrors({
      ...inputErrors,
      name: "",
      author: "",
      year: "",
      rating: "",
      isbn: "",
    });
  }, [isOpen]);

  function handleChange(e) {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        checkNameValidity();
        setFormValid(isNameValid && isAuthorValid);
        break;
      case "author":
        setAuthor(e.target.value);
        checkAuthorValidity();
        setFormValid(isNameValid && isAuthorValid);
        break;
      case "year":
        setYear(e.target.value);
        checkYearValidity(e.target.value);
        break;
      case "rating":
        setRating(e.target.value);
        checkRatingValidity(e.target.value);
        break;
      case "isbn":
        setIsbn(e.target.value);
        checkIsbnValidity(e.target.value);
        break;
    }
  }

  function checkNameValidity() {
    if (!nameRef.current.validity.valid) {
      setInputErrors({
        ...inputErrors,
        name: nameRef.current.validationMessage,
      });
      setNameValid(false);
    } else {
      setInputErrors({ ...inputErrors, name: "" });
      setNameValid(true);
    }
  }

  function checkAuthorValidity() {
    if (!authorRef.current.validity.valid) {
      setInputErrors({
        ...inputErrors,
        author: authorRef.current.validationMessage,
      });
      setAuthorValid(false);
    } else {
      setInputErrors({ ...inputErrors, author: "" });
      setAuthorValid(true);
    }
  }

  function checkYearValidity(value) {
    if (!/^\d+$/.test(value)) {
      setInputErrors({ ...inputErrors, year: "Только числа" });
    } else if (Number(value) < Number(1800)) {
      setInputErrors({
        ...inputErrors,
        year: "Книгам старше 1800 года здесь не место",
      });
    } else if (Number(value) > Number(currentYear)) {
      setInputErrors({
        ...inputErrors,
        year: "Указан не корректный год",
      });
    } else setInputErrors({ ...inputErrors, year: "" });
  }

  function checkRatingValidity(value) {
    if (!/^[\d+]+$/.test(value) || Number(value) > Number(10)) {
      setInputErrors({ ...inputErrors, rating: "Только числа от 0 до 10" });
    } else setInputErrors({ ...inputErrors, rating: "" });
  }

  function checkIsbnValidity(value) {
    if (!/^[\d+-]+$/.test(value)) {
      setInputErrors({ ...inputErrors, isbn: "Только числа и тире" });
    } else if (value.length === 17) { //проверка валидности isbn (x1*1 + x2*3 + x3*1 + x4*1... x13*1) %10 = 0
      const isbnNumber = value //получение массива цифр из строки
        .replace(/[^\d]/g, "")
        .split("")
        .map((sym) => Number(sym));
      let result = 0;
      for (let i = 0; i < isbnNumber.length; i++) {
        result = result + (i % 2 ? isbnNumber[i] * 3 : isbnNumber[i] * 1);
      }
      if (!(result % 10 === 0)) {
        setInputErrors({ ...inputErrors, isbn: "Это не действительный ISBN" });
      }
    } else setInputErrors({ ...inputErrors, isbn: "" });
  }

  function handleAddSubmit(e) {
    e.preventDefault();
    onSubmit({
      name: name,
      author: author,
      year: year,
      rating: rating,
      isbn: isbn,
      id: editedBook ? editedBook.id : null,
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
      isFormValid={isFormValid}
    >
      <div className="form__inputs">
        <input
          type="text"
          id="name"
          className="form__input form__input_name"
          placeholder="Название"
          name="name"
          value={name}
          maxLength="100"
          required
          onChange={handleChange}
          ref={nameRef}
        />
        <InputError errorText={inputErrors["name"]} />
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
          ref={authorRef}
        />
        <InputError errorText={inputErrors["author"]} />
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
        <InputError errorText={inputErrors["year"]} />
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
        <InputError errorText={inputErrors["rating"]} />
        <input
          type="text"
          id="isbn"
          className="form__input form__input_profession"
          placeholder="ISBN"
          name="isbn"
          value={isbn}
          minLength="17"
          maxLength="17"
          onChange={handleChange}
        />
        <InputError errorText={inputErrors["isbn"]} />
      </div>
    </PopupWithForm>
  );
}