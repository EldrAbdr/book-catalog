import bookImage from "../images/book.png";

export default function Card({ book, onDelete, onEditClick, disableButtons }) {
  function handleDelete() {
    onDelete(book.id);
  }

  function handleEditClick() {
    onEditClick(book);
  }

  return (
    <li className="card">
      <button
        className={`card__edit-button ${
          disableButtons ? "card__button_hidden" : ""
        }`}
        type="button"
        onClick={handleEditClick}
      />
      <button
        className={`card__delete-button ${
          disableButtons ? "card__button_hidden" : ""
        }`}
        type="button"
        onClick={handleDelete}
      />
      <img className="card__image" src={bookImage} alt="книга" />
      <div className="card__text-block">
        <h2 className="card__book-name">{book ? book.name : ""}</h2>
        <p className="card__text">{book ? book.author : ""}</p>
        <p className="card__text">Рейтинг: {book ? book.rating : ""}</p>
        <p className="card__text">
          {book ? book.year : ""}
          <span>г.</span>
        </p>
      </div>
    </li>
  );
}
