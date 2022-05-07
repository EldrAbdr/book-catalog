export default function Cards({ children }) {
  return (
    <section className="cards">
      <ul className="cards__container">{children}</ul>
    </section>
  );
}
