export default {
  deepClone: function deep_clone(data) {
    let result;

    if (typeof(data) === 'object' && data !== null) {
      if(Object.prototype.toString.call(data) === '[object Array]'){
          result = [];
      }else if (Object.prototype.toString.call(data) === '[object Object]') {
          result = {};
      }
      for(let i in data){
          result[i] = deep_clone(data[i]);
      }
    } else {
      result = data;
    }

    return result;
  }
};