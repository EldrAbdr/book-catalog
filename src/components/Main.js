import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Mousewheel } from "swiper";

import YearButton from "./YearButton";
import { useEffect, useState } from "react";
import Cards from "./Cards";
import Card from "./Card";
import Button from "./Button";

export default function Main({ onDelete, onEditClick, books, onAddBtnClick, onRecommend }) {
  const [yearList, setYearList] = useState([]);
  const [currentYear, setCurrentYear] = useState(2021);
  const [currentYearBooks, setCurrentYearBooks] = useState([]);

  function handleTabClick(year) {
    setCurrentYear(year);
  }

  function filterBooksByYear() {
      return (books.filter(book => {
          return book.year === currentYear;
      }));
  }

  useEffect(() => {
    setYearList(() =>
      Array.from(
        new Set(
          books.map((book) => {
            return book.year;
          })
        )
      )
        .sort()
        .reverse()
    );

    setCurrentYearBooks(filterBooksByYear());
  }, [books, currentYear]);

  return (
    <main className="mainContainer">
        <div className="buttonBlock">
            <Button onClick={onAddBtnClick} name="Добавить книгу"/>
            <Button onClick={onRecommend} name="Порекомендовать книгу"/>
        </div>
        <div className={"yearNavBar"}>
            <Swiper
                spaceBetween={5}
                slidesPerView={7}
                initialSlide={0}
                navigation={true}
                mousewheel={true}
                modules={[Navigation, Mousewheel]}
            >
                {yearList.map((year) => {
                    return (
                        <SwiperSlide key={year}>
                            <YearButton
                                year={year}
                                onClick={handleTabClick}
                            />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
      <Cards year={currentYear}>
        {currentYearBooks.map((book) => {
          return (
            <Card
              key={book.id}
              book={book}
              onDelete={onDelete}
              onEditClick={onEditClick}
            />
          );
        })}
      </Cards>
    </main>
  );
}
