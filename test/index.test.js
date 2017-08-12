const expect = require('chai').expect;
const getTopics = require('../index').getTopics;

describe('话题正则匹配提取', () => {
    it('没有话题名称，应该返回null', () => {
        let str = 'notopic';
        let result = getTopics(str);
        expect(result).to.be.equal(null);
    });

    it('话题名称应该以数组形式返回', () => {
        let str = '#topic#';
        let result = getTopics(str);
        expect(Object.prototype.toString.call(result)).to.be.equal('[object Array]');
        expect(Array.isArray(result)).to.be.equal(true);
    });

    it('内容为空，应该不是话题', () => {
        let str = '##';
        let result = getTopics(str);
        expect(result).to.be.equal(null);
    });

    it('连续空格，应该不是话题', () => {
        let str = '#  #';
        let result = getTopics(str);
        expect(result).to.be.equal(null);
    });

    it('三个#号，应该只返回符合要求的#之间的话题名称', () => {
        let str1 = '# #topic#',
            str2 = '##topic#',
            str3 = '#topic# #';
        let topic1 = getTopics(str1)[0],
            topic2 = getTopics(str2)[0],
            topic3 = getTopics(str3)[0];
        expect(topic1).to.be.equal('#topic#');
        expect(topic2).to.be.equal('#topic#');
        expect(topic3).to.be.equal('#topic#');
    });

    it('三个#号且#号之间的内容都符合要求，应该返回前两个#号之间的话题名称', () => {
        let str = '#topic1#topic2#';
        let result = getTopics(str);
        expect(result.length).to.be.equal(1);
        expect(result[0]).to.be.equal('#topic1#');
    });

    it('多个#号，应该返回多个正确格式话题名称组成的数组', () => {
        let str = '#topic1#lalala####topic2#lelele# # ##topic3### ##';
        let result = getTopics(str);
        expect(result.length).to.be.equal(3);
        expect(result[0]).to.be.equal('#topic1#');
        expect(result[1]).to.be.equal('#topic2#');
        expect(result[2]).to.be.equal('#topic3#');
    });

    it('特殊情况一：“## #topic# ##”，应该返回“#topic#”', () => {
        let str = '## #topic# ##';
        let result = getTopics(str);
        expect(result[0]).to.be.equal('#topic#');
    });
});