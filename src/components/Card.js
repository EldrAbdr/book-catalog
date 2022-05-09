import bookImage from "../images/book.png";

export default function Card({ book, onDelete, onEditClick, isPopupCard }) {
  function handleDelete() {
    onDelete(book.id);
  }

  function handleEditClick() {
    onEditClick(book);
  }

  return (
    <li className={`card ${isPopupCard? "card_mini": ""}`}>
      <button
        className={`card__button card__button_edit${
          isPopupCard ? "card__button_hidden" : ""
        }`}
        type="button"
        onClick={handleEditClick}
      />
      <button
        className={`card__button card__button_delete ${
          isPopupCard ? "card__button_hidden" : ""
        }`}
        type="button"
        onClick={handleDelete}
      />
      <img className="card__image" src={bookImage} alt="книга" />
      <div className="card__text-block">
        <h2 className="card__book-name">{book ? book.name : ""}</h2>
        <p className="card__text">Автор: {book ? book.author : ""}</p>
        <p className="card__text">Рейтинг: {book ? book.rating : ""}</p>
        <p className="card__text">Год: {book ? book.year : ""}</p>
        <p className="card__text">ISBN: {book ? book.isbn : ""}</p>
      </div>
    </li>
  );
}
