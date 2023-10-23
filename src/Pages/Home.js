import { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import { getGameBoardAPI } from "../service/GameBoardService";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const getGameBoard = async () => {
    getGameBoardAPI().then((data) => {
      console.log(data);
      if (data == "NOT_AUTHENTICATED") {
        navigate("/login");
        return;
      }

      if (data != undefined && data.length > 0) {
        const result = data.reduce((x, y) => {
          (x[y.groupName] = x[y.groupName] || []).push(y);
          return x;
        }, {});

        setData(result);
      }
    });
  };

  useEffect(() => {
    getGameBoard();
  }, []);

  return (
    <div className="Home">
      <Dashboard cardContents={data} />
    </div>
  );
};

export default Home;
