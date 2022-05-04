class Game {
    constructor(index, channelId, users) {
        this.index = index;
        this.channelId = channelId;
        this.users = users;
    }
    wait(cb){
        cb();
    }
    start(cb) { 
        cb();
    }
    stop(cb) {
        cb();
     }
}

module.exports = {Game};
// let newGame = new Game(channel, user)
// newGame.start()
// pirint(newGame.score)
// collection.set("gameName", newGame)