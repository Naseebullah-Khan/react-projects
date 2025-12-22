import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "/.netlify/functions/fetch-tours";
function App() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const refreshTours = () => {
    setRefresh(!refresh);
  };

  const getData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setTours(tours);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const deleteTour = (id) => {
    const newTours = tours.filter((tour) => {
      if (id !== tour.id) {
        return tour;
      }
    });
    setTours(newTours);
  };

  useEffect(() => {
    getData();
  }, [refresh]);
  return (
    <main>
      {loading ? (
        <Loading />
      ) : (
        <Tours
          refreshTours={refreshTours}
          deleteTour={deleteTour}
          items={tours}
        />
      )}
    </main>
  );
}

export default App;
