function echoHello(user){
    return `欢迎用户:${user}回来`;
}
function echoBye(user){
    return `${user}已经退出，欢迎下次再来`;
}

module.exports.echoHello=echoHello;
exports.echoBye=echoBye;

