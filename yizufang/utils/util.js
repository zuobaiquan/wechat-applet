
function formatDate(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  return [year, month, day].join('-');
}

function rightIdcard(idcard) {
  return idcard.replace(idcard.substr(6, 8), "******");
}

module.exports = { formatDate, rightIdcard }
