import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticonOutlined, MicOutlined, MoreVert, SearchOutlined } from '@material-ui/icons';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Chat.css';
import db from './firebase';
import { useStateValue } from './StateProvider';

function Chat() {
    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
        if(roomId){
            db.collection("rooms")
              .doc(roomId)
              .onSnapshot((snapshot)=>(
                setRoomName(snapshot.data().name)
            ))
            db.collection("rooms")
              .doc(roomId)
              .collection("messages")
              .orderBy('timestamp', 'asc')
              .onSnapshot((snapshot)=>(
                setMessages(snapshot.docs.map(doc=>doc.data()))
            ))
        }
    }, [roomId])

    useEffect(() => {
        setSeed(()=> Math.floor(Math.random() * 500));
    }, [roomId]);

    const sendMessage = (e)=>{
        e.preventDefault();
        db.collection("rooms").doc(roomId).collection("messages").add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput('');
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>last seen at {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map(({name, message, timestamp}, i)=>(
                    <p key={'chat-' + i} className={`chat__message ${name === user.displayName && "chat__receiver"}`}>
                        <span className="chat__name">
                            {name}
                        </span>
                        {message}
                        <span className="chat__timestamp">{new Date(timestamp?.toDate()).toUTCString()}</span>
                    </p>
                ))}
            </div>
            <div className="chat__footer">
                <InsertEmoticonOutlined />
                <form>
                    <input value={input} onChange={(e)=>setInput(e.target.value)} type="text" placeholder="Type message"></input>
                    <button type="submit" onClick={sendMessage}>Send message</button>
                </form>
                <MicOutlined/>
            </div>
        </div>
    )
}

export default Chat
