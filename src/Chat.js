import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticonOutlined, MicOutlined, MoreVert, SearchOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Chat.css';
import db from './firebase';


function Chat() {
    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState('');

    useEffect(() => {
        if(roomId){
            db.collection("rooms").doc(roomId).onSnapshot((snapshot)=>(
                setRoomName(snapshot.data().name)
            ))
        }
    }, [roomId])

    useEffect(() => {
        setSeed(()=> Math.floor(Math.random() * 500));
    }, [roomId]);

    const sendMessage = (e)=>{
        e.preventDefault();
        setInput('');
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>last seen</p>
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
                <p className={`chat__message ${true && "chat__receiver"}`}>
                    <span className="chat__name">
                        Vishesh
                    </span>
                    Hey
                    <span className="chat__timestamp">3:52pm</span>
                </p>
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
