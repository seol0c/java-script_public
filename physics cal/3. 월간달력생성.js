function generateMonthlyCalendar() {
  var sheet1 = SpreadsheetApp.getActive().getSheetByName("이벤트달력");
  var sheet2 = SpreadsheetApp.getActive().getSheetByName("월간달력")
  sheet2.getRange("C3:I20").clear(); //데이터 삭제
  sheet2.getRange("C23:I40").clear(); //데이터 삭제
  sheet2.getRange("C43:I60").clear(); //데이터 삭제


  // 날짜와 달력 3개의 데이터를 이차원 배열로 저장
  var data1 = sheet1.getDataRange().getValues();
  var calendarData1 = [];
  for (var i = 2; i < data1.length; i++) { //3열부터 데이터를 가져옴
    var row = [];
    row.push(new Date(data1[i][1])); //날짜
    row.push(data1[i][3]); //달력1(휴일)
    row.push(data1[i][4]); //달력2(물리과)
    calendarData1.push(row);
  }

  var data2 = sheet1.getDataRange().getValues();
  var calendarData2 = [];
  for (var i = 2; i < data2.length; i++) { //3열부터 데이터를 가져옴
    var row = [];
    row.push(new Date(data2[i][6])); //날짜
    row.push(data2[i][8]); //달력1(휴일)
    row.push(data2[i][9]); //달력2(물리과)
    calendarData2.push(row);
  }

  var data3 = sheet1.getDataRange().getValues();
  var calendarData3 = [];
  for (var i = 2; i < data3.length; i++) { //3열부터 데이터를 가져옴
    var row = [];
    row.push(new Date(data3[i][11])); //날짜
    row.push(data3[i][13]); //달력1(휴일)
    row.push(data3[i][14]); //달력2(물리과)
    calendarData3.push(row);
  }

  // 테이블 본문 생성 - 저번달
  var numRows = 5; // 테이블 행 수(최대 6주)
  var numCols = 7; // 테이블 열 수
  var row = 2;
  var column = week1() + 1; //이번달의 첫째날에 해당하는 요일
  for (var i = 0; i < numRows; i++) {
    for (var j = 0; j < numCols; j++) {
      var index = i * numCols + j; // 1차원 배열 인덱스
      if (index >= calendarData1.length) break; // 마지막 데이터에 도달하면 중단

      var dayOfMonth = calendarData1[index][0].getDate(); // 날짜
      var cellValue = dayOfMonth; // 날짜로 셀 값을 설정

      // 날짜 아래에 데이터 추가
      var holiday = calendarData1[index][1];
      var physics = calendarData1[index][2];

      // 달력에 데이터 추가
      var currentCell = sheet2.getRange(row + 1, column + 2); //C3셀부터 입력 시작
      currentCell.setValue(cellValue);
      currentCell.offset(1, 0).setValue(holiday);
      currentCell.offset(2, 0).setValue(physics);

      // 다음 열로 이동
      column += 1;
      if (column > 7) { column = 1; row += 3; }
    }
  }

  // 테이블 본문 생성 - 이번달
  var numRows = 5; // 테이블 행 수(최대 6주)
  var numCols = 7; // 테이블 열 수
  var row = 22;
  var column = week2() + 1; //이번달의 첫째날에 해당하는 요일
  for (var i = 0; i < numRows; i++) {
    for (var j = 0; j < numCols; j++) {
      var index = i * numCols + j; // 1차원 배열 인덱스
      if (index >= calendarData2.length) break; // 마지막 데이터에 도달하면 중단

      var dayOfMonth = calendarData2[index][0].getDate(); // 날짜
      var cellValue = dayOfMonth; // 날짜로 셀 값을 설정

      // 날짜 아래에 데이터 추가
      var holiday = calendarData2[index][1];
      var physics = calendarData2[index][2];

      // 달력에 데이터 추가
      var currentCell = sheet2.getRange(row + 1, column + 2);
      currentCell.setValue(cellValue);
      currentCell.offset(1, 0).setValue(holiday);
      currentCell.offset(2, 0).setValue(physics);

      // 다음 열로 이동
      column += 1;
      if (column > 7) { column = 1; row += 3; }
    }
  }

  // 테이블 본문 생성 - 다음달
  var numRows = 5; // 테이블 행 수(최대 6주)
  var numCols = 7; // 테이블 열 수
  var row = 42;
  var column = week3() + 1; //이번달의 첫째날에 해당하는 요일
  for (var i = 0; i < numRows; i++) {
    for (var j = 0; j < numCols; j++) {
      var index = i * numCols + j; // 1차원 배열 인덱스
      if (index >= calendarData3.length) break; // 마지막 데이터에 도달하면 중단

      var dayOfMonth = calendarData3[index][0].getDate(); // 날짜
      var cellValue = dayOfMonth; // 날짜로 셀 값을 설정

      // 날짜 아래에 데이터 추가
      var holiday = calendarData3[index][1];
      var physics = calendarData3[index][2];

      // 달력에 데이터 추가
      var currentCell = sheet2.getRange(row + 1, column + 2);
      currentCell.setValue(cellValue);
      currentCell.offset(1, 0).setValue(holiday);
      currentCell.offset(2, 0).setValue(physics);

      // 다음 열로 이동
      column += 1;
      if (column > 7) { column = 1; row += 3; }
    }
  }
}





function week1() { //저번달의 첫째 요일을 알아내는 함수
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth();
  var firstDay = new Date(year, month-1, 1);
  var dayOfWeek = firstDay.getDay(); // 0:일요일, 1:월요일, ..., 6:토요일
  return dayOfWeek;
}





function week2() { //이번달
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth();
  var firstDay = new Date(year, month, 1);
  var dayOfWeek = firstDay.getDay();
  return dayOfWeek;
}





function week3() { //다음달
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth();
  var firstDay = new Date(year, month+1, 1);
  var dayOfWeek = firstDay.getDay(); //
  return dayOfWeek;
}

