import headerImage from "../images/nature_gras.jpg";

export default function Header() {
  return (
    <header className="header">
      <h1 className="header__title">BOOK CATALOG</h1>
      <img className="header__image" src={headerImage} alt="книги на траве" />
    </header>
  );
}
