import React, { useState } from "react";
import PlayerInputList from "../component/PlayerInputList";
import { createGameBoardAPI } from "../service/GameBoardService";
import { useNavigate } from "react-router-dom";
import { Button, Menu } from "antd";
import {
  TeamOutlined,
  TrophyOutlined,
  PlusOutlined,
  FrownOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Input, Select, notification } from "antd";
import Layout from "antd/es/layout/layout";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { logoutAPI } from "../service/UserService";

export const CreateDashboardContext = React.createContext();

export const scoringOptions = [
  {
    value: "total score lowest",
    label: "total score lowest",
  },
  {
    value: "total score highest",
    label: "total score highest",
  },
  {
    value: "winning count",
    label: "winning count",
  },
];

const CreateDashboard = () => {
  const [boardName, setBoardName] = useState();
  const [groupName, setGroupName] = useState();
  const [players, setPlayers] = useState([{ id: 0, name: "" }]);
  const [scoring, setScoring] = useState(scoringOptions[0].value);
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [gameNameStatus, setGameNameStatus] = useState("");
  const [groupNameStatus, setGroupNameStatus] = useState("");
  const [playerNameStatus, setPlayerNameStatus] = useState("");

  const addPlayer = () => {
    setPlayers((p) => {
      return [
        ...players,
        {
          id: p.length,
          name: "",
        },
      ];
    });
  };

  const createBoard = () => {
    var isValid = true;

    if (!boardName || boardName.length == 0) {
      isValid = false;
      setGameNameStatus("error");
    }

    if (!groupName || groupName.length == 0) {
      isValid = false;
      setGroupNameStatus("error");
    }

    if (
      null != players.find((it) => it.name == undefined || it.name.length == 0)
    ) {
      isValid = false;
      setPlayerNameStatus("error");
    }

    if (!isValid) {
      return;
    }

    createGameBoardAPI(boardName, groupName, players, scoring).then(
      (response) => {
        if (response.code === "NOT_AUTHENTICATED") {
          api.info({
            message: response.message,
            placement: "top",
            icon: <FrownOutlined style={{ color: "grey", width: 20 }} />,
          });
          setTimeout(function () {
            navigate("/");
          }, 500);
          return;
        }

        if (response.code == undefined) {
          api.info({
            message: "Successfully created",
            placement: "top",
            icon: <SmileOutlined style={{ color: "grey", width: 20 }} />,
            onClose: () => navigate("/"),
            duration: 1,
          });
        } else {
          api.info({
            message: response.message,
            placement: "top",
            icon: <FrownOutlined style={{ color: "grey", width: 20 }} />,
          });
        }
      }
    );
  };

  const typeBoardName = (e) => {
    setGameNameStatus("");
    setBoardName(e.target.value);
  };

  const typeGroupdName = (e) => {
    setGroupNameStatus("");
    setGroupName(e.target.value);
  };

  const handleChange = (value) => {
    setScoring(value.value);
  };

  const typePlayerName = (e) => {
    setPlayerNameStatus("");
    players[e.target.id].name = e.target.value;
  };

  return (
    <Layout style={{ height: "100%" }}>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={new Array(1).fill(null).map((_, index) => ({
            key: "Logout",
            label: "Logout",
          }))}
          onClick={(e) => {
            if (e.key === "Logout") {
              logoutAPI().then(() => {
                navigate("/login");
              });
            }
          }}
        />
      </Header>
      <Layout>
        <Content
          style={{
            addingRight: "50px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="CreateDashboard">
            {contextHolder}
            <header>
              <h1>Create a game board</h1>
            </header>
            <div className="name-box">
              <Input
                status={gameNameStatus}
                onChange={(e) => typeBoardName(e)}
                placeholder="game name"
                prefix={<TrophyOutlined />}
              />
            </div>
            <div className="name-box">
              <Input
                status={groupNameStatus}
                onChange={(e) => {
                  typeGroupdName(e);
                }}
                placeholder="group name"
                prefix={<TeamOutlined />}
              />
            </div>

            <div className="scoring-box">
              <Select
                labelInValue
                defaultValue={{
                  value: scoringOptions[0].value,
                  label: scoringOptions[0].label,
                }}
                style={{
                  width: "100%",
                }}
                onChange={handleChange}
                options={scoringOptions}
              />
            </div>
            <div className="player-box">
              <div className="button-box">
                <Button onClick={addPlayer} type="Icon Button">
                  <PlusOutlined />
                </Button>
              </div>
              <PlayerInputList
                playerList={players}
                typePlayerName={typePlayerName}
                playerNameStatus={playerNameStatus}
              />
            </div>
            <div className="buttonBox">
              <Button type="primary" onClick={createBoard}>
                CREATE
              </Button>
            </div>
          </div>
        </Content>
      </Layout>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Pancho World @2023 created by Pancho Corp.
      </Footer>
    </Layout>
  );
};

export default CreateDashboard;
