export default function YearButton({ year, onClick }) {
  function handleClick() {
    onClick(year);
  }

  return (
     <div className={`yearNavBar__tab ${year ? "" : "yearNavBar__tab_no-date"} `}>
       <input id={year? year: "nd"} type="radio" name="tab" value={year}/>
         <label htmlFor={year? year: "nd"} onClick={handleClick}>{year? year: "Без даты"}</label>
     </div>
  );
}
