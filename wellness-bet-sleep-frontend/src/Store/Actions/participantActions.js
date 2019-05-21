import axios from "../../axios-sleep";
import { participantTypes } from "./actionTypes";

const addParticipant = () => dispatch => {
    dispatch({ type: participantTypes.ADD_PARTICIPANT_START });
    axios
      .post("/api/participant/add")
}