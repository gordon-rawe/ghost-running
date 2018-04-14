module.exports.httpGet = (url) => {
    return new Promise((resolve, reject) => {
        const xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4) {
                cc.log('xhr.readyState='+xhr.readyState+'  xhr.status=' + xhr.status +' ' + xhr.responseText);
                if((xhr.status >= 200 && xhr.status < 300)) {
                    try {
                        const parsedData = JSON.parse(xhr.responseText);
                        resolve(parsedData);
                    } catch(ex) {
                        reject(ex);
                    }
                } else {
                    reject(xhr.responseText);
                }
            }
        };
        xhr.open("GET", url, true);
        if (cc.sys.isNative) {
           xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
        }
        xhr.setRequestHeader("Content-type", "application/json");
        // note: In Internet Explorer, the timeout property may be set only after calling the open()
        // method and before calling the send() method.
        xhr.timeout = 5000;// 5 seconds for timeout
        xhr.send();
    });
}

module.exports.httpPost = (url, params) => {
    return new Promise((resolve, reject) => {
        const xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4) {
                cc.log('xhr.readyState='+xhr.readyState+'  xhr.status=' + xhr.status +' ' + xhr.responseText);
                if((xhr.status >= 200 && xhr.status < 300)) {
                    try {
                        const parsedData = JSON.parse(xhr.responseText);
                        resolve(parsedData);
                    } catch(ex) {
                        reject(ex);
                    }
                } else {
                    reject(xhr.responseText);
                }
            }
        };
        xhr.open("POST", url, true);
        if (cc.sys.isNative) {
            xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
        }
        // xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("Content-type", "application/json");
        // note: In Internet Explorer, the timeout property may be set only after calling the open()
        // method and before calling the send() method.
        xhr.timeout = 5000;// 5 seconds for timeout
        xhr.send(JSON.stringify(params));
    });
}
