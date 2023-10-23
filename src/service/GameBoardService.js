import axios from "axios";
import { CreateGameBoardRequest } from "./model/CreateGameBoardRequest";
import { EditBoardRequest } from "./model/EditBoardRequest";
import { toGameBoardScoring } from "./model/GameBoardScoring";

const LOCAL_HOST = "http://localhost:8080/game";
const CREATE_GAME_BOARD = "/board";
const GET_GAME_BAORD = "/board/all";
const UPDATE_GAME_BAORD = "/board";
const DELETE_GAME_BOARD_PLAYER = "/board/{id}/player/{playerId}";

axios.defaults.withCredentials = true;

export const getGameBoardAPI = async () => {
  try {
    const response = await axios.get(LOCAL_HOST + GET_GAME_BAORD, {
      withCredentials: true,
      // crossDomain: true,
      credentials: "include",
    });

    console.log("test");
    console.log(response);
    console.log(response.status);

    if (response.status == 200) {
      return response.data;
    } else {
      console.warn(response);
      return [];
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response.status == 401) {
      return error.response?.data.code;
    }
    return [];
  }
};

export const createGameBoardAPI = async (
  boardName,
  groupName,
  players,
  scoring
) => {
  const request = new CreateGameBoardRequest(
    boardName,
    groupName,
    players.map((it) => it["name"]),
    toGameBoardScoring(scoring)
  );

  const apiResponse = await axios
    .post(
      LOCAL_HOST + CREATE_GAME_BOARD,
      JSON.stringify(request),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
      { withCredentials: true }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        console.error(
          error.response.status + "\n" + error.response.data.detail
        );

        if (error.response.status == 401) {
          return {
            code: error.response?.data.code,
            message: error.response?.data.message,
          };
        }

        return {
          code: error.response.status,
          message: error.response.data.detail,
        };
      }
    });

  return apiResponse;
};

export const deleteGameBoardAPI = async (id) => {
  const apiResponse = await axios
    .delete(LOCAL_HOST + CREATE_GAME_BOARD + "/" + id)
    .then((response) => {
      if (response.status == 200) {
        return response;
      }
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.code);
        console.error(error.response?.data.message);
        return error.response?.data;
      } else {
        return [];
      }
    });

  return apiResponse;
};

export const editGameBoardAPI = async (id, players) => {
  await axios
    .put(
      LOCAL_HOST + UPDATE_GAME_BAORD + "/" + id,
      JSON.stringify(new EditBoardRequest(players)),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
      { withCredentials: true }
    )
    .then((response) => {
      if (response.status == 200) {
        alert("successfully updated");
      }
    })
    .catch((error) => {
      alert(error);
    });
};

export const deletePlayerAPI = async (id, playerId) => {
  var url = DELETE_GAME_BOARD_PLAYER.replace("{id}", id).replace(
    "{playerId}",
    playerId
  );

  const apiResponse = await axios
    .delete(
      LOCAL_HOST + url,
      { withCredentials: true },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log(response);
      if (response.status == 200) {
        return response;
      } else {
        alert(response);
      }
    })
    .catch((error) => {
      console.log(error);
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.code);
        console.error(error.response?.data.message);
        return error.response?.data;
      }
    });

  return apiResponse;
};
