import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LockerDataService from "../../../services/locker";

import "./courierlockers.css";
import { NoPermission } from "../../../components/Slave/NoPermission/NoPermission";
import { useAuth } from "../../../context/auth";

export function CourierLockers() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [lockers, setLockers] = useState([]);
  const [fullness, setFullness] = useState([]);
  const [sortCriteria, setSortCriteria] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const access_level = parseInt(localStorage.getItem("access_level"));

  useEffect(() => {
    const getAllLockers = async () => {
      try {
        const response = await LockerDataService.getAll();
        const { lockers, percents } = response.data;
        setLockers(lockers);
        setFullness(percents);
      } catch (error) {
        console.error("Error while loading lockers", error);
      }
    };

    getAllLockers();
  }, []);

  const sortLockersByName = () => {
    setSortCriteria("name");
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    sortLockers();
  };

  const sortLockersByFullness = () => {
    setSortCriteria("fullness");
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    sortLockers();
  };

  const sortLockers = () => {
    const sortedLockers = [...lockers];

    if (sortCriteria === "name") {
      sortedLockers.sort((a, b) => (sortOrder === "asc" ? a.City.localeCompare(b.City) : b.City.localeCompare(a.City)));
    } else if (sortCriteria === "fullness") {
      sortedLockers.sort((a, b) => {
        const fullnessA = fullness[a.ID - 1];
        const fullnessB = fullness[b.ID - 1];
        return sortOrder === "asc" ? fullnessA - fullnessB : fullnessB - fullnessA;
      });
    }

    setLockers(sortedLockers);
  };

  const getProgressBarColorClass = (percentage) => {
    if (percentage <= 50) return "green-bar";
    if (percentage <= 70) return "yellow-bar";
    return "red-bar";
  };

  const calculateProgressBarStyle = (percentage) => ({ width: percentage + "%" });

  const showButton = (locker_ID) => {
    navigate(`/locker/packages/${locker_ID}`, { state: { referrer: "courier-lockers" } });
};

  // if the access level is not 2 or 3 return true and show the NoPermission component
  if (!isLoggedIn || access_level <= 2) {
      return <NoPermission />;
  }

  return (
    <div className="container my-5">
      <div className="col-12">
        <div className="row">
          <h1 className="col-md-7">Lockers</h1>
          <button className="btn submit-btn me-3 col-md-2" onClick={sortLockersByName}>
            Sort by Name {sortCriteria === "name" && (sortOrder === "asc" ? "▲" : "▼")}
          </button>
          <button className="btn submit-btn col-md-2" onClick={sortLockersByFullness}>
            Sort by Fullness {sortCriteria === "fullness" && (sortOrder === "asc" ? "▲" : "▼")}
          </button>
        </div>
      </div>
      <div className="row">
        {lockers.map((locker, index) => (
          <div className="col-md-6" key={index}>
            <div className="history-card">
              <div className="history-item">
                <h5 className="card-title">Locker ID: {locker.ID}</h5>
                <p className="card-text">City: {locker.City}</p>
                <p className='card-text'>Locker Address: {locker.Address}</p>
                <p className="card-text">Capacity: {Math.ceil(locker.Capacity * (fullness[locker.ID - 1] / 100))} / {locker.Capacity}</p>
                <div className="progress">
                  <div className={`progress-bar ${getProgressBarColorClass(fullness[locker.ID - 1])}`} style={calculateProgressBarStyle(fullness[locker.ID - 1])}>
                    {fullness[locker.ID - 1]}%
                  </div>
                </div>
              </div>
              <button
                  className="btn submit-btn me-3"
                  onClick={() => showButton(locker.ID)}
                  > Show Packages
              </button>

              <a href={`https://www.google.com/maps/place/${locker.City}+${locker.Address}`} target="_blank" rel="noreferrer" className="btn submit-btn">Map</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
