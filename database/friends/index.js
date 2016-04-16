var friendFunctions = require('./friends-functions.js');


module.exports = {
    addFriend: friendFunctions.addFriend,
    deleteFriend: friendFunctions.deleteFriend,
    getFriendsList: friendFunctions.getFriendsList,
    sendRequest: friendFunctions.sendRequest,
    getFriendIDs: friendFunctions.getFriendIDs

};