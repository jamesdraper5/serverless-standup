const axios = require('axios'); 


module.exports = (chatMessage, url) => {
    const data = {
        body: chatMessage
    };
    const headers = {
        "Content-type": "application/json"
    };

    return axios({
        method: 'post',
        url: url, 
        data: data,
        headers: headers
    });
}