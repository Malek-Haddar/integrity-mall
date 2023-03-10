import React, { useEffect, useState } from "react";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import GifIcon from "@material-ui/icons/Gif";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import Message from "./Message";
import { useSelector } from "react-redux";
import { selectChannelId, selectChannelName } from "../../features/appSlice";
import axios from "./axios";
import Pusher from "pusher-js";

const pusher = new Pusher("5421ced7a2b4aa286dad", {
  cluster: "us2",
});

function Chat() {
  const [flag, setFlag] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  
    useEffect(async () => {
      await getConversation(channelId);

      // const channel = await pusher.subscribe("conversations");
      // channel.bind("newMessage", function (data) {
      //   getConversation(channelId);
      // });
    }, [flag]);
    useEffect(async () => {
      await getConversation(channelId);
    }, [channelId]);

    const getConversation = async (channelId) => {
      if (channelId) {
        const conversation = await axios.get(
          `api/get/conversation?id=${channelId}`
        );
        setMessages(conversation.data[0].conversation);
      }
    };

    const sendMessage = async (e) => {
      e.preventDefault();

      await axios.post(`api/new/message?id=${channelId}`, {
        message: input,
        timestamp: Date.now(),
        user: user.result._id,
      });
      setInput("");

      setFlag(!flag);
    };

    return (
      <div className="chat">
        <ChatHeader channelName={channelName} />

        <div className="chat__messages">
          {messages.map((message) => (
            <Message
              key={message.key}
              timestamp={message.timestamp}
              userName={message.user.name}
              message={message.message}
            />
          ))}
        </div>

        <div className="chat__input">
          <AddCircleIcon fontSize="large" />

          <form>
            <input
              value={input}
              disabled={!channelId}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Message #${channelName}`}
            />
            <button
              type="submit"
              onClick={sendMessage}
              disabled={!channelId}
              className="chat__inputButton"
            >
              Send Message
            </button>
          </form>

          <div className="chat__inputIcons">
            <CardGiftcardIcon fontSize="large" />
            <GifIcon fontSize="large" />
            <EmojiEmotionsIcon fontSize="large" />
          </div>
        </div>
      </div>
    );
}

export default Chat;
