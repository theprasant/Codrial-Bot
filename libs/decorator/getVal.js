const { cleanRegex } = require('./regexCleaner')
const getVal = (query, obj) => {

    if (obj[query]) return `${obj[query]}`;
    query = cleanRegex(query);
    // let matchedKeyFromKey = Object.keys(obj).filter(k => (new RegExp('^'+query+'$', 'i')).test(k));
    let queryKey = Object.keys(obj).filter(k => {
        return (new RegExp('^'+query+'$', 'i')).test(k)||(new RegExp('^' + query + '$', 'i')).test(obj[k])
    })[0];

    if (queryKey && queryKey.length) return `${obj[queryKey]}`;

    return query.trim();
}

module.exports = {getVal}