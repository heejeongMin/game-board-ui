import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";

const PlayerInputList = ({ playerList, typePlayerName, playerNameStatus }) => {
  return (
    <div className="PlayerInputList">
      {playerList.map((it, idx) => {
        return (
          <div className="playerInputs" key={"playerInputs_" + it.id}>
            <Input
              status={playerNameStatus}
              id={idx}
              size="default"
              placeholder="player"
              onChange={typePlayerName}
              prefix={<UserOutlined />}
            />
          </div>
        );
      })}
    </div>
  );
};

PlayerInputList.defaultProps = {
  playerList: [],
};

export default PlayerInputList;
