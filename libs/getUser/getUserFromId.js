const getUserFromId = (message,id, fun) => {
    try {
        message.client.users.fetch(id)
            .then(u => {
                fun(u);
            })
            .catch(e => {
                fun(false);
                console.error(e)
            })
    } catch (err) {
        console.error(err);
    }
}

module.exports = {getUserFromId};