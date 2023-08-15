import React, { useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaQuoteRight } from "react-icons/fa";
import data from "./data";
function App() {
  const persons = useState(data)[0];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < 0) {
      return setIndex(persons.length - 1);
    } else if (index > persons.length - 1) {
      return setIndex(0);
    }
  }, [index, persons]);

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setIndex(index + 1);
    }, 2000);
    return () => clearInterval(autoSlide);
  }, [index]);

  return (
    <section className="section">
      <div className="title">
        <h2>
          <span>/</span>Reviews
        </h2>
      </div>
      <div className="section-center">
        {persons.map((person, personIndex) => {
          const { id, name, image, title, quote } = person;
          let position = "nextSlide";
          if (personIndex === index) {
            position = "activeSlide";
          }
          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === persons.length - 1)
          ) {
            position = "lastSlide";
          }
          return (
            <article key={id} className={position}>
              <img src={image} alt={name} className="person-img" />
              <h4>{name}</h4>
              <p className="title">{title}</p>
              <p className="text">{quote}</p>
              {<FaQuoteRight className="icon" />}
            </article>
          );
        })}
        <FiChevronLeft className="prev" onClick={() => setIndex(index - 1)} />
        <FiChevronRight className="next" onClick={() => setIndex(index + 1)} />
      </div>
    </section>
  );
}

export default App;
