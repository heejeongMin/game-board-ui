import BoardCard from "../component/BoardCard";
import { useNavigate } from "react-router-dom";
import { Button, Menu } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Layout from "antd/es/layout/layout";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { logoutAPI } from "../service/UserService";

const Dashboard = ({ cardContents }) => {
  const navigate = useNavigate();

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
          <div className="Dashboard">
            <header>
              <h1>Game boards</h1>
            </header>
            <div className="botton-box">
              <Button
                onClick={() => {
                  navigate("/create");
                }}
                type="Icon Button"
              >
                <PlusOutlined />
              </Button>
            </div>
            <div className="board-box">
              {Object.keys(cardContents).length == 0 ? (
                <div>record your game score!</div>
              ) : (
                <>
                  <BoardCard cardContents={cardContents} />
                </>
              )}
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

export default Dashboard;
