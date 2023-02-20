//채팅방 일단 리덕스 틀 설정

const GETCHATROOMINFO = 'GETCHATROOMINFO'; //채팅방 정보 가져오기
const CHATLEAVE = 'CHATLEAVE'; //채팅방 나가기 - 방장일 때

const initialState = {
  chatroom: {
    room_number: '', //방 번호
    user_list: [], //방에 있는 유저 리스트
    room_name: '', //방 이름
    room_host: '', //방장 여부
  },
};

function setChatRoomInfo(chatRoomInfo, entered) {
  return {
    type: GETCHATROOMINFO,
    chatRoomInfo,
    entered,
  };
}

// function leaveRoom() {
//   //sessionStorage.clear();
//   return {
//     type: CHATLEAVE,
//   };
// }

function chatroom(state = initialState, action) {
  switch (action.type) {
    case GETCHATROOMINFO:
      return {
        ...state,
        chatroom: {
          room_number: action.room_number,
          user_list: action.user_list,
          room_name: action.room_name,
          room_host: action.room_host,
        },
      };
    // case CHATLEAVE:
    //   return {
    //     ...state,
    //     room_number: action.room_number,
    //     user_list: action.user_list,
    //     room_name: action.room_name,
    //     room_host: action.room_host,
    //   };
    default:
      return state;
  }
}

export default chatroom;
export { setChatRoomInfo };
