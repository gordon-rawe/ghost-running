module.exports.httpGet = (url) => {
    return new Promise((resolve, reject) => {
        const xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                const respone = xhr.responseText;
                resolve(respone);
            } else {
                reject(xhr.status);
            }
        };
        xhr.open("GET", url, true);
        if (cc.sys.isNative) {
           xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
        }
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
            cc.log('xhr.readyState='+xhr.readyState+'  xhr.status='+xhr.status);
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                const respone = xhr.responseText;
                resolve(respone);
            } else {
                reject(xhr.status);
            }
        };
        xhr.open("POST", url, true);
        if (cc.sys.isNative) {
            xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
        }
        // note: In Internet Explorer, the timeout property may be set only after calling the open()
        // method and before calling the send() method.
        xhr.timeout = 5000;// 5 seconds for timeout
        xhr.send(params);
    });
}
