const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10; //salt의 자릿수, 이용하여 암호화
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, // 스페이스 제거
    unique: 1,
  },
  password: {
    type: String,
  },
  role: {
    type: Number,
    default: 0, 
  },
  image: String,
  token: {
    // 유효성 관리
    type: String,
  },
  cokenExp: {
    //유효기간
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  //몽구스 함수, index.js에서 save전에 함수실행
  var user = this; //user.js의
  //mongoDB에 등록된 json파일의 비밀번호 암호화

  if (user.isModified("password")) {
    //이름이나 이메일을 바꿀때도 실행되기 때문에 비밀번호를 바꿀때만 암호화 실행
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err); //userSchema의 데이터를 가르킴

      bcrypt.hash(user.password, salt, function (err, hash) {
        //user.password는 유저가 입력한 비밀번호 > 암호화 안됨
        //hash는 입력한 비밀번호를 암호화 시킨것
        if (err) return next(err);
        user.password = hash; //암호회된 비밀번호로 교체
        next();
      });
    });
  } else {
    next(); //비밀번호 이외를 바꿀때 바로 빠져나감
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  //사용자가 입력한 비밀번호 plainPassword를 암호화 시켜
  //DB에 저장된 암호회된 비밀번호가 맞는지 체크
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.createToken = function (cb) {
  //jsonwebtoken 사용하여 token생성
  let user = this;
  let token = jwt.sign(user._id.toHexString(), "userToken"); //DB에 등록된 id, 유저가 입력한 id아님
  //user._id + "userToken" = token 토큰으로 사용자 식별
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user); //에러가 없다면 유저정보 전달, index,js의 createToken으로 전달
  });
};

userSchema.statics.findByToken = function (token, cb) {
  let user = this;

  //가져온 토큰을 복호화
  jwt.verify(token, "userToken", function (err, decoded) {
    //user._id를 이용하여 유저를 찾은 뒤
    //클라이언트에서 가져온 token과 DB에 보관된 token이 일치하는지 확인

    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    }); //mongoDB 함수
  });
};
const User = mongoose.model("User", userSchema);

module.exports = { User };
