//dependencies
var bodyParser = require("body-parser");
var path = require("path");

//data from friends table
var friendsTable = require("../data/friends.js");

//routes
module.exports = function(app) {
	app.get("/api/friends", function(request, result) {
		result.json(friendsTable);
	});

	app.post("/api/friends", function(request, result) {
		var you = request.body;
		var newFriend = -1;
		var newFriendScore = 100;
		var currentFriendScore = 0;

		for (i = 0; i < friendsTable.length; i++) {
			if(you.sex != friendsTable[i].sex) {
				for (j = 0; j < you.scores.length; j++) {
					currentFriendScore = currentFriendScore + Math.abs(friendsTable[i].scores[j] - you.scores[j]);
				}
				if (currentFriendScore <= newFriendScore) {
					newFriend = i;
					newFriendScore = currentFriendScore;
				}
				currentFriendScore = 0;
			}
		}

		debugger;

		friendsTable.push(you);
		newFriendDetails = friendsTable[newFriend];
		result.json(newFriendDetails);
	});
};