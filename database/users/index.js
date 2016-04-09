/**
 * Created by Rob on 2/18/2016.
 */
var selectProfiles = require('./selectProfiles.js');
var profileFunctions = require('./profile-functions.js');


module.exports = {
    getUserByName: selectProfiles.getUserByName,
    getAllUsers: selectProfiles.getUsers,
    getFriends: selectProfiles.getFriendsList,
    getUserByLocation: selectProfiles.getUserByLocation,
    setupProfile: profileFunctions.setupProfile,
    editProfile: profileFunctions.editProfile
    
};
