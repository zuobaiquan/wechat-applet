var util = require('./util')
module.exports={
    verified:function(verifing,that) {
      var flag = false;
      if(!verifing||verifing.length==0){
          return true;
      }
      for (var i = 0; i < verifing.length; i++) {
        flag = this[verifing[i].name](verifing[i].content, verifing[i].tip);
        //console.log('verifing++++i',i,flag,verifing);
        if (!flag) {
          break;
        }
      }
      return flag;
    },
    isEmpty:function(input, tip) {
        if (input === '' || input === null || input === undefined) {
            util.showInfo(tip);
        }else{
            return true;
        }
    },
    isPhone:function(email, tip) {
        var reg = new RegExp('^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$');
        if (!reg.test(email)) {
          util.showInfo(tip);
        } else {
            return true;
        }
    },

}
