/**
 * 从字符串中找出所有用‘#’包围的话题名称
 * @param {String} str 被查找的字符串
 * @return {Array} 返回匹配到的话题数组，如果没有匹配到则返回null
 */
const getTopics = str => str.match(/#\s*[^#\s]+[^#]*#/g);

module.exports = {
    getTopics: getTopics
}