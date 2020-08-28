import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import db from './firebase';
import './SidebarChat.css';

function SidebarChat({addNewChat, id, name}) {
    const [seed, setSeed] = useState('');

    useEffect(() => {
        setSeed(()=> Math.floor(Math.random() * 500));
    }, []);

    const createChat = ()=>{
        const roomName = prompt(" add new chat name");
        if(roomName){
            db.collection("rooms").add({
                name: roomName
            })
        }
    }

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>last message</p>
                </div>
            </div>
        </Link>
    ): (
        <div className="sidebarChat" onClick={createChat}>
            <h2>Add new chat</h2>
        </div>

    )
}

export default SidebarChat
