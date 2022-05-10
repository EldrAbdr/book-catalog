export default function Button({ onClick, name }) {
  return (
    <button type="button" className="button" onClick={onClick}>
      {name}
    </button>
  );
}