export default function Cards({ children, isCardActive }) {
  return (
    <section className="cards">
      <ul className="cards__container">{children}</ul>
    </section>
  );
}
