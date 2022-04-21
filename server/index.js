const express = require("express");
const app = express();
const port = 3001;
const mongoose = require("mongoose");
const { User } = require("./models/User");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const { auth } = require("./middleware/auth");
//bodyParser > 클라이언트에서 오는 정보를 서버에서 분석해서 가죠올수 있게해줌
app.use(bodyParser.urlencoded({ extended: true }));

// json파일을 분석해서 가져옴
app.use(bodyParser.json());

app.use(cookieParser());

mongoose
  .connect(config.mongoURI)
  // {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   useCreateIndex: true,
  //   useFindAndModify: false,
  // } 몽고DB 버전 6.0이상에선 자동처리 

  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("TEST"));

app.get("/api/test", (req, res) => {
  res.send("hello");
});

////////////////////////////////////////////////
app.post("/api/user/register", (req, res) => {
  //회원 가입시 필요한 정보를 client에서 가져오면
  //그것들을 DB에 넣어줌
  // {
  //   id:"hello"
  //   password:"123"
  // } > body에 들어있음
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err }); //실패시 에러메세지 json파일로 전송
    return res.status(200).json({
      success: true, //성공시
    });
  }); //mongoDB의 함수
});

//////////////////////////////////////////////////
app.post("/api/user/login", (req, res) => {
  //요청된 email을 DB에서 있는지 탐색
  User.findOne({ email: req.body.email }, (err, user) => {
    //mongoDB 함수
    if (!user) {
      //유저 정보가에 email이 없다면 없으면
      return res.json({
        loginSuccess: false,
        message: "user not found",
      });
    }

    //DB에 있다면 비밀번호가 맞는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      //isMatch는 user.js에서 실행된 결과
      if (!isMatch)
        //없으면 비밀번호가 틀린것
        return res.json({
          loginSuccess: false,
          message: "password is not match",
        });

      //Token생성
      user.createToken((err, user) => {
        if (err) return res.status(400).send(err);

        //토큰을 쿠키에 저장,  로컬스토리지 등에도 저장가능
        res
          .cookie("userCookie", user.token)
          .status(200) //400 = 실패, 200 = 성공
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

///////////////////////////////////////////////////////
//사용자 인증, 사용자가 페이지를 이동할지 사용가능한가 체크
app.get("/api/user/auth", auth, (req, res) => {
  //미들웨어가 통과됐다면 인증이 true
  res.status(200).json({
    _id: req.user._id, //넘겨줄 인자 입력, auth에서 req에 담아줬기때문에 사용가능
    isAdmin: req.user.role === 0 ? false : true, //role 0이면 사용자, 0이 아니면 관리자
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image, //해당 정보를 줌으로써 페이지에서 어떤 정보를 필요하는지 확인가능
  });
}); //auth > 미들웨어 중간에서 작업을 해줌 auth.js

///////////////////////////////////////////////////////
//token을 지워주면 인증이 안되게 때문에 로그아웃으로 처리됨
app.get("/api/user/logout", auth, (req, res) => {
  //DB에서 id를 찾음
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    //찾아서 token을 빈값으로
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

app.listen(port, () => console.log(`port : ${port}`));
