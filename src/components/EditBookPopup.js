import AddBookPopup from "./AddBookPopup";

export default function EditBookPopup({
  isOpen,
  onClose,
  onSubmit,
  editedBook,
}) {
  return (
    <AddBookPopup
      editedBook={editedBook}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      title={"Редактировать данные"}
      textButton={"Сохранить"}
      altTextButton={"Сохранение..."}
    />
  );
}
