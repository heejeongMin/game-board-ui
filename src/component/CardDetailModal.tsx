import { useState, useEffect } from "react";
import { Modal, Input, InputNumber, Button, Popconfirm, notification } from "antd";
import { UserOutlined, DeleteOutlined, PlusOutlined, FrownOutlined } from "@ant-design/icons";
import { GameBoardInfo } from "../service/model/GameBoardInfo";
import { PlayerInfo } from "../service/model/PlayerInfo";
import { editGameBoardAPI, deletePlayerAPI } from "../service/GameBoardService";

const CardDetailModal = (props: any) => {
  const [api, contextHolder] = notification.useNotification();

  const { showModal, cardDetail, modalCallback }: {
    showModal: boolean,
    cardDetail: GameBoardInfo,
    modalCallback: (showModal: boolean, shouldRefresh: boolean) => void;
  } = props;

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [players, setPlayers] = useState<PlayerInfo[]>(cardDetail.players);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPlayers(cardDetail.players)
  }, [cardDetail.players])


  const handleOk = () => {
    var incompletePlayers = players.filter(player => player?.id == undefined && player.name.length == 0)
    if (incompletePlayers.length != 0) {
      api.info({
        message: "enter players name",
        placement: "top",
        icon: <FrownOutlined style={{ color: "grey", width: 20 }} />,
      });
      return;
    }

    setLoading(true);
    editGameBoardAPI(cardDetail.id, players);
    modalCallback(false, true);
  };

  const handleCancel = () => {
    setPlayers(cardDetail.players);
    modalCallback(false, false);
  };

  const onNameChange = (value: any, idx: number) => {
    players[idx].name = value.value;
  }

  const onScoreChange = (value: any, idx: number) => {
    players[idx].score = value;
  };

  const addPlayer = () => {
    setPlayers(() => {
      return [
        ...players,
        new PlayerInfo("", 0)
      ];
    });
  };

  const onDelete = (idx: number) => {
    const player = players[idx];
    if (player.id == undefined) {
      players.splice(idx, 1)
      setPlayers(() => {
        return [...players];
      });
    } else {
      deletePlayerAPI(cardDetail.id, player.id).then(() => {
        players.splice(idx, 1)
        setPlayers(() => {
          return [...players];
        });
      })
    }
  }

  return (
    < Modal
      title={cardDetail.gameName + " (" + cardDetail.scoring + ")"}
      open={showModal}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={
        [
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            Save
          </Button>
        ]
      }
    >
      {contextHolder}
      {
        players?.map((player, idx) =>
          <div className="cardDetailInputBox" key={idx}>
            <Input
              id={player.name + "_" + player.id}
              className="cardDtailPlayerInput"
              prefix={< UserOutlined />}
              placeholder={player.name}
              disabled={!(player.id === undefined)}
              bordered={false}
              onChange={(e) => onNameChange(e.target, idx)}
            />
            <InputNumber
              className="cardDetailPlayerScore"
              min={0}
              defaultValue={player.score}
              onChange={(e) => onScoreChange(e, idx)}
            />
            <Popconfirm
              placement="top"
              title={"Are you sure to delete?"}
              onConfirm={() => onDelete(idx)}
              okText="Yes"
              cancelText="No"
            >
              <Button className="cardDetailPlayerButtons">
                <DeleteOutlined />
              </Button>
            </Popconfirm>
            {(idx == players?.length - 1) &&
              <Button className="cardDetailPlayerButtons" onClick={addPlayer}>
                <PlusOutlined />
              </Button>}
          </div>
        )
      }
    </Modal >
  );
};

export default CardDetailModal;
