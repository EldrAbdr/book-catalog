import PopupWithForm from "./PopupWithForm";

export default function QuestionPopup({ isOpen, bookId, onClose, onSubmit }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(bookId);
  }

  return (
    <PopupWithForm
      name="delete-question-form"
      title="Вы уверены?"
      textButton="Да"
      altTextButton="Удаление..."
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={true}
    />
  );
}
