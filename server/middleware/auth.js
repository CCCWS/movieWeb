const req = require("express/lib/request");
const res = require("express/lib/response");
const { User } = require("../models/User");

let auth = (req, res, next) => {
  //인증 처리 하는곳
  //클라이언트 쿠키에서 토큰을 가져옴
  let token = req.cookies.userCookie;
  //지정한 쿠키 이름

  //토큰을 복화하하여 유저 탐색
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    req.token = token;
    req.user = user; //req에 넘어줌으로써 사용할 수 있게 해줌
    next();
    //없으면 미들웨어에서 못넘어감
  });

  //유저가 있으면 인증 완료
  // 없으면 인증 불가
};

module.exports = { auth };
 