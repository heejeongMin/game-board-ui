import { deleteGameBoardAPI } from "../service/GameBoardService";
import { useNavigate } from "react-router-dom";
import { Card, Popconfirm } from "antd";
import { ExpandAltOutlined, DeleteOutlined } from "@ant-design/icons";
import CardDetailModal from "./CardDetailModal";
import { useState, useEffect } from "react";
import { GameBoardInfo } from "../service/model/GameBoardInfo";

const BoardCard = ({ cardContents }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(new Object());

  const deleteCard = (id) => {
    deleteGameBoardAPI(id).then(() => navigate(0));
  };

  const returnCardDetailModal = (cardDetail) => {
    return (
      <CardDetailModal
        className={cardDetail.gameName}
        showModal={showModal}
        cardDetail={cardDetail}
        modalCallback={(toggle, shouldRefresh) => {
          setShowModal(toggle);
          if (shouldRefresh) {
            navigate(0);
          }
        }}
      />
    );
  };

  return (
    <>
      {Object.keys(cardContents).map(function (key) {
        return (
          <Card title={key} key={key} className="group-card" hoverable="true">
            {cardContents[key].map((it) => {
              return (
                <Card
                  hoverable="true"
                  key={it.id}
                  type="inner"
                  title={it.gameName}
                  extra={
                    <>
                      <a
                        onClick={() => {
                          setShowModal(true);
                          setModalContent(it);
                          return returnCardDetailModal(it);
                        }}
                      >
                        <ExpandAltOutlined />
                      </a>
                      <a className="deleteCard">
                        <Popconfirm
                          placement="top"
                          title={"Are you sure to delete?"}
                          onConfirm={() => deleteCard(it.id)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <DeleteOutlined />
                        </Popconfirm>
                      </a>
                    </>
                  }
                  style={{
                    marginTop: 10,
                  }}
                >
                  {it.players.map((it) => {
                    return (
                      <span key={it.id}>
                        {it.name} ({it.score}) <br />
                      </span>
                    );
                  })}
                  {
                    <CardDetailModal
                      className={modalContent.gameName}
                      showModal={showModal}
                      cardDetail={modalContent}
                      modalCallback={(toggle, shouldRefresh) => {
                        setShowModal(toggle);
                        if (shouldRefresh) {
                          navigate(0);
                        }
                      }}
                    />
                  }
                </Card>
              );
            })}
          </Card>
        );
      })}
    </>
  );
};

export default BoardCard;
