export default function PopupWithCard({
  title,
  name,
  onClose,
  onSubmit,
  textButton,
  isOpen,
  children,
}) {
  return (
    <div className={`${name}-popup popup ${isOpen && "popup_active"}`}>
      <div className="form">
        <button
          type="button"
          className="form__edit-close-button close-button hover-transparent"
          onClick={onClose}
        />
        <h2 className="form__title">{title}</h2>
        {children}
        <button
          type="button"
          className="form__submit-button"
          onClick={onSubmit}
        >
          {textButton}
        </button>
      </div>
    </div>
  );
}
