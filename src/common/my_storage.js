// 因为js的Storage对象没有过期时间设置，所以增加控制有效期的扩展方法，set和get
const myStorage = {
    setItem: (key, value, expire) => {
        let obj = {
            data: value,
            time: Date.now(),
            expire: expire
        };
        localStorage.setItem(key, JSON.stringify(obj));
    },
    getItem: key => {
        let val = localStorage.getItem(key);
        if (!val) {
            return val;
        }
        val = JSON.parse(val);
        if (Date.now() - val.time > (val.expire * 1000)) {
            localStorage.removeItem(key);
            return null;
        }
        return val.data;
    }
}

export default myStorage;