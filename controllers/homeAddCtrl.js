const connection = require("../dbConfig");
require("dotenv").config();

const homeAddCtrl = {
  // 동아리 인기리스트 블러오기
  getTopClubList: async (req, res) => {
    const selectSQL = `SELECT T1.C_IDX , T1.U_IDX , T1.C_CATEGORY ,T1.C_CATE_DETAIL ,T1.C_NAME,T1.C_INTRO,T1.C_AREA,C_IMAGE ,T2.TOP_CLUB  FROM CLUB_TABLE T1 
    LEFT JOIN (SELECT C_IDX , count(C_IDX) as TOP_CLUB FROM ATTEND_USER_TABLE GROUP BY C_IDX ORDER BY count(C_IDX) DESC LIMIT 10) T2
    ON T1.C_IDX = T2.C_IDX
    ORDER BY T2.TOP_CLUB DESC LIMIT 10`;
    connection.query(selectSQL, (error, result) => {
      if (error) throw error;
      res.send(result);
    });
  },
  getCateClubList: async (req, res) => {
    const selectSQL = `SELECT * FROM CLUB_TABLE WHERE C_CATEGORY =?`;
    const SQLData = [req.query.data];
    // console.log(SQLData);
    connection.query(selectSQL, SQLData, (error, result) => {
      if (error) throw error;
      res.send(result);
    });
  },
};
module.exports = homeAddCtrl;
