const cleanRegex = (str) => {
    let formatedStr = str.replace(/\\/g, '\\\\')
                                             .replace(/\./g, '\\.')
                                             .replace(/\*/g, '\\*')
                                             .replace(/\^/g, '\\^')
                                             .replace(/\$/g, '\\$')
                                             .replace(/\(/g, '\\(')
                                             .replace(/\)/g, '\\)')
                                             .replace(/\[/g, '\\[')
                                             .replace(/\]/g, '\\]');
    return formatedStr;
}

module.exports = {cleanRegex}