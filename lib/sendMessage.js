const axios = require('axios'); 


module.exports = (chatMessage, roomId) => {
    const url = `https://digitalcrew.teamwork.com/chat/v3/rooms/${roomId}/messages.json`;
    const data = {
        message: {
            body: chatMessage
        }
    };
    const headers = {
        "Content-type": "application/json",
        "Authorization": `BASIC ${process.env.CHAT_API_KEY}`
    };

    return axios({
        method: 'post',
        url: url, 
        data: data,
        headers: headers
    });
}