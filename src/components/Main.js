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
  const [yearList, setYearList] = useState([]); //массив годов присутвующих в БД. Используется в слайдере
  const [renderBooks, setRenderBooks] = useState([]);//массив книг для отрисовки

  function handleTabClick(year) {
    setRenderBooks(filterBooksByYearAndName(year))
  }

//возвращает массив - отсортированный по годам пропс books
  function sortByYear() {
      return books.sort((bookX, bookY) => {
          return bookX.year.localeCompare(bookY.year)
      }).reverse();
  }

  //возвр. массив - фильтрует определенный год и сортирует по имени пропс books
  function filterBooksByYearAndName(year) {
    let filterByYear = books.filter((book) => {
      return book.year === year;
    });
    return filterByYear.sort((bookX, bookY) => {
      return bookX.name.toLowerCase().localeCompare(bookY.name.toLowerCase());
    });
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

      setRenderBooks(sortByYear)
  }, [books]);

  return (
    <main className="mainContainer">
        <div className="buttonBlock">
            <Button onClick={onAddBtnClick} name="Добавить книгу"/>
            <Button onClick={onRecommend} name="Порекомендовать книгу"/>
        </div>
        <div className={"yearNavBar"}>
            <Swiper
                className="sliderBreakpoints"
                spaceBetween={5}
                slidesPerView={3}
                initialSlide={0}
                navigation={true}
                mousewheel={true}
                modules={[Navigation, Mousewheel]}
                breakpoints={{
                    424: {
                        width: 280,
                        slidesPerView: 4,
                    },
                    768: {
                        width: 500,
                        slidesPerView: 5,
                    },
                    1023: {
                        width: 768,
                        slidesPerView: 7,
                    },
                }}
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
      <Cards>
        {renderBooks.map((book) => {
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
