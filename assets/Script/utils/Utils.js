const RANKING_URL = 'http://10.2.201.137:3000/runrun/rank';
const ACK_LOGIN = 'http://10.2.201.137:3000/runrun/users/'
const UPLOAD_SCORE = 'http://10.2.201.137:3000/runrun/score/';

const mapData = (rawData) => {
	const users = rawData.users;
	return rawData.ranks.map(rank => {
		rank.name = users[rank.uid].name;
		rank.avatar = users[rank.uid].avatar;
		return rank;
	});
}

const isWechat = () => {
	try {
		return wx
	} catch(ex) {
		return false;
	}
}

const mockData = {
    "ranks": [
        {
            "rank": 1,
            "uid": "123",
            "score": "1221"
		},
		{
            "rank": 2,
            "uid": "123",
            "score": "1221"
		},
		{
            "rank": 3,
            "uid": "123",
            "score": "1221"
		},
		{
            "rank": 4,
            "uid": "123",
            "score": "1221"
		},
		{
            "rank": 5,
            "uid": "123",
            "score": "1221"
        }
    ],
    "users": {
        "123": {
            "name": "wenlin.wang",
            "avatar": "http://docs.cocos.com/creator/manual/zh/scripting/load-assets/asset-in-inspector-dnd.png"
        }
    }
};

module.exports.shareAppMessage = () => {
	if(!isWechat()) {
		console.log('not wechat');
		return;
	}
    wx.shareAppMessage({
        title: '鬼鬼快跑',
        imageUrl: 'http://115.159.77.174:12010/public/game/2.png', //todo
        desc: '鬼鬼快跑真好玩，快来玩玩吧！', //todo
    });
}

module.exports.requestRankings = () => {
	return new Promise((resolve, reject)=> {
		if(isWechat()) {
			try{
				wx.request({
					url: RANKING_URL, 
					method: 'GET',
					success: data => {
						resolve(mapData(data.data));
					},
					fail: errorInfo => {
						reject(errorInfo);
					},
				});
			} catch (exception) {
				reject(exception);
			}
		}else {
			resolve(mapData(mockData));
		}
	});
}

module.exports.uploadLogin = () => {
	if(!isWechat()) {
		console.log('not wechat');
		return;
	}
	wx.login({
		success: () => {
			wx.getUserInfo({
				success: data => {
					wx.request({
						url: ACK_LOGIN + data.userInfo.userId, 
						data: data.userInfo,
						method:'POST',
						success: ()=>{
							// wx.showToast({title: 'uploadLogin success' + data.userInfo.userId});
						},
						// fail: errorInfo => wx.showToast({title: 'wx.request fail '}),
					});
				},
				// fail: errorInfo => wx.showToast({title: 'getUserInfo fail '}),
			});
		},
		// fail: errorInfo => wx.showToast({title: 'login fail '}),
	});
}

module.exports.uploadScore = (score) => {
	if(!isWechat()) {
		console.log('not wechat');
		return;
	}
	wx.getUserInfo({
		success: data => {
			wx.request({
				url: UPLOAD_SCORE + data.userInfo.userId,
				data: {
					score: score
				},
				method:'POST',
				// fail: errorInfo => {
				// 	wx.showToast({title: 'wx.request fail ' + JSON.stringify(errorInfo)});
				// },
				// success: () => {
				// 	wx.showToast({title: 'uploadScore success' + data.userInfo.userId});
				// },
			});
		},
		// fail: errorInfo => {
		// 	wx.showToast({title: 'getUserInfo fail ' + JSON.stringify(errorInfo)});
		// },
	});
}

module.exports.savePref = (key, value) => {
	if(isWechat()) {
		try{
			wx.setStorage({
			  key: key,
			  data: value,
			});
		}catch(ignored){}
	} else {
		try{
			return cc.sys.localStorage.setItem(key, value);
		}catch(ignored){}
	}
}

module.exports.getPref = (key) => {
	if(isWechat()) {
		try{
			return wx.getStorageSync(key);
		}catch(ignored){
			return "";
		}
	} else {
		try{
			return cc.sys.localStorage.getItem(key);
		}catch(ignored){
			return "";
		}
	}
}


