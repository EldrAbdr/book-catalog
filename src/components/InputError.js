export default function InputError({ errorText }) {
  return (
    <span className="form__input-error">
      {errorText}
    </span>
  );
}