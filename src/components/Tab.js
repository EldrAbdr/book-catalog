export default function Tab({onClick, year}) {
    return <button className="tab" onClick={onClick}>{year? year: "Без указания года"}</button>
}