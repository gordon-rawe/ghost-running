
// #上报比分
// curl -X POST -d '{"open_id": "011sEM6e036AAA1Q1S6e0ypW6e0sEM62", "score": 1128}' --header "Content-Type:application/json" http://122.152.248.22:8964/ghostrun/score

// #登录user
// curl -X POST -d '{
//     "open_id": "011sEM6e036AAA1Q1S6e0ypW6e0sEM62", 
//     "user_info": {
//         "nickName":"罗明川",
//         "gender":1,
//         "language":"en",
//         "city":"Jiading",
//         "province":"Shanghai",
//         "country":"China",
//         "avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEKicowSX3GxwTaPktbmDyBtKeectPOk8s79AESic3yePKKT5awWdQmWEI5hKDsDpQsc2vvrGwB9IOAg/0"
//     }
// }' --header "Content-Type:application/json" http://122.152.248.22:8964/ghostrun/login

// #查看比分列表(传了好友[id],会分页返回有效好友的比分数据，如果没有传,返回所有总榜分也数据)
// curl -X POST -d '{"count": 10, "cursor": 0, "oids": ["011sEM6e036AAA1Q1S6e0ypW6e0sEM62"]}' --header "Content-Type:application/json" http://122.152.248.22:8964/ghostrun/rankings
// curl -X POST -d '{"count": 10, "cursor": 0, "oids": []}' --header "Content-Type:application/json" http://122.152.248.22:8964/ghostrun/rankings

// 根据code获取openid
// curl -X POST -d '{"code": "001XD7fv0tjd8c178Cev0wQofv0XD7fy"}' --header "Content-Type:application/json" http://122.152.248.22:8964/ghostrun/oauth

const { httpPost } = require('./HttpUtils');

const RANKING_URL = 'http://122.152.248.22:8964/ghostrun/rankings/';
const ACK_LOGIN = 'http://122.152.248.22:8964/ghostrun/login/'
const UPLOAD_SCORE = 'http://122.152.248.22:8964/ghostrun/score/';
const OAUTH = 'http://122.152.248.22:8964/ghostrun/oauth/';
const KEY_OPEN_ID = 'open_id';

const guid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

const shareAppMessage = () => {
	if(window.wx) {
		wx.shareAppMessage({
			title: '跑跳忍者',
			imageUrl: 'http://115.159.77.174:12010/public/game/2.png', //todo
			desc: '跑跳忍者就是酷，不服来挑战！', //todo
		});
	} else {
		alert('非微信环境不允许分享');
	}
}

const requestRankings = () => {
	return httpPost(RANKING_URL,{count: 10, cursor: 0, oids: []});
}

const uploadLogin = () => {
	return acquireOpenId()
		.then(open_id => {
			window.open_id = open_id;
			if(window.wx) {
				return new Promise((resolve, reject) => {
					wx.getUserInfo({
						success: data => resolve(data.userInfo),
						fail: errorInfo => reject(errorInfo),
					});
				});
			} else {
				return {
					userName: '用户 ' + open_id, 
					avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEKicowSX3GxwTaPktbmDyBtKeectPOk8s79AESic3yePKKT5awWdQmWEI5hKDsDpQsc2vvrGwB9IOAg/0"
				};
			}
		})
		.then((userInfo) => {
			return httpPost(ACK_LOGIN, {open_id: open_id, user_info: userInfo});
		});
}

const acquireOpenId = () => {
	return new Promise((resolve, reject) => {
		const open_id = getPref(KEY_OPEN_ID);
		if(open_id) {
			return resolve(open_id);
		}
		if(window.wx) {
			wx.login({
				success: data => {
					httpPost(OAUTH, { code: data.code })
						.then(data => {
							const userInfo = JSON.parse(data);
							savePref(KEY_OPEN_ID, userInfo.open_id);
							resolve(userInfo.open_id);
						})
						.catch(errorStatus => {
							reject(errorStatus);
						});
					},
				fail: errorInfo => reject(errorInfo),
			});
		} else {
			const gid = guid();
			savePref(KEY_OPEN_ID, gid);
			resolve(gid);
		}
	});
}

const uploadScore = (score) => {
	return httpPost(UPLOAD_SCORE, {score: score, open_id: window.open_id});
}

const savePref = (key, value) => {
	window.wx ? wx.setStorage({key: key, data: value}) : cc.sys.localStorage.setItem(key, value);
}

const getPref = (key) => {
	try{
		return window.wx ? wx.getStorageSync(key) : cc.sys.localStorage.getItem(key);
	}catch(ignored){
		return "";
	}
}

module.exports.shareAppMessage = shareAppMessage;
module.exports.requestRankings = requestRankings;
module.exports.uploadLogin = uploadLogin;
module.exports.uploadScore = uploadScore;
module.exports.acquireOpenId = acquireOpenId;
module.exports.savePref = savePref;
module.exports.getPref = getPref;