const { cleanRegex } = require('./regexCleaner')
const checkIfAny = (query, obj) => {

   query = cleanRegex(query)
    if (obj[query]) return true;
    // let matchedKeyFromKey = Object.keys(obj).filter(k => (new RegExp('^'+query+'$', 'i')).test(k));
    let queryKey = Object.keys(obj).filter(k => {
        return (new RegExp('^'+query+'$', 'i')).test(k)||(new RegExp('^' + query + '$', 'i')).test(obj[k])
    });

    if (queryKey && queryKey.length) return true;

    return false;
}

module.exports = {checkIfAny}