export default function YearButton({ year, onClick }) {
  function handleClick() {
    onClick(year);
  }

  return (
    <button
      className={year ? "yearNavBar__tab" : "yearNavBar__year-tab_no-date"}
      onClick={handleClick}
    >
      {year ? year : "Без даты"}
    </button>
  );
}
