function calendar_auto() {
  // 4123 순서로 진행함 - 이동을 먼저 해놓고 초기화하기(어차피 1분 주기로 할테니), 그렇게 안하면 에러남

  var sourceRange = SpreadsheetApp.getActive().getSheetByName("월간달력").getRange('W23:AC44');
  var targetCell = SpreadsheetApp.getActive().getSheetByName("물리달력").getRange('B3:H24');
  sourceRange.copyTo(targetCell, {contentsOnly:true}); //붙여넣기

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("이벤트");

  const calendars = [
    {id: "qansohiecib58ga9k1bmppvt5oi65b1q@import.calendar.google.com", name: "달력1(휴일)"},
    {id: "a4f8258e2f69f436156930ef292e16ff7430cbf182af815dc89ef30226a63a89@group.calendar.google.com", name: "달력2(물리과)"}
  ];
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const end = new Date(today.getFullYear(), today.getMonth() + 2, 0);

  const events = calendars.reduce((prev, cal) => {
    const calendar = CalendarApp.getCalendarById(cal.id);
    const events = calendar.getEvents(start, end);
    events.forEach(event => {
      prev.push({
        start: Utilities.formatDate(event.getStartTime(), "Asia/Seoul", "yyyy.MM.dd."),
        end: Utilities.formatDate(event.getEndTime(), "Asia/Seoul", "yyyy.MM.dd."),
        title: event.getTitle(),
        calendar: cal.name
      });
    });
    return prev;
  }, []);

  events.sort((a, b) => new Date(a.start) - new Date(b.start));

  sheet.getRange("B3:D").clearContent();
  sheet.getRange("B2:D2").setValues([["날짜", "달력종류", "내용"]]);
  var row = 3; //데이터 시작

  events.forEach(event => {
    const startDate = new Date(event.start);
    const endDate = new Date(event.end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    for(let i = 0; i < diffDays; i++){
      const date = Utilities.formatDate(new Date(startDate.getTime() + (i * 24 * 60 * 60 * 1000)), "Asia/Seoul", "yyyy.MM.dd.");
      sheet.getRange(row, 2, 1, 3).setValues([[date, event.calendar, event.title]]);
      row++; // 다음 행으로 이동
  }
  });

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("이벤트달력");
  var today2 = new Date();
  
  var startDate1 = new Date(today2.getFullYear(), today2.getMonth()-1, 1);
  var endDate1 = new Date(today2.getFullYear(), today2.getMonth(), 0);
  var dateArr1 = [];

  var startDate2 = new Date(today2.getFullYear(), today2.getMonth(), 1);
  var endDate2 = new Date(today2.getFullYear(), today2.getMonth()+1, 0);
  var dateArr2 = [];
  
  var startDate3 = new Date(today2.getFullYear(), today2.getMonth()+1, 1);
  var endDate3 = new Date(today2.getFullYear(), today2.getMonth()+2, 0);
  var dateArr3 = [];

  var daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

  while (startDate1 <= endDate1) {
    var date = Utilities.formatDate(startDate1, SpreadsheetApp.getActive().getSpreadsheetTimeZone(), 'yyyy.MM.dd.');
    var dayOfWeek = daysOfWeek[startDate1.getDay()];
    dateArr1.push([date, dayOfWeek]);
    startDate1.setDate(startDate1.getDate() + 1);
  }

  while (startDate2 <= endDate2) {
    var date = Utilities.formatDate(startDate2, SpreadsheetApp.getActive().getSpreadsheetTimeZone(), 'yyyy.MM.dd.');
    var dayOfWeek = daysOfWeek[startDate2.getDay()];
    dateArr2.push([date, dayOfWeek]);
    startDate2.setDate(startDate2.getDate() + 1);
  }

  while (startDate3 <= endDate3) {
    var date = Utilities.formatDate(startDate3, SpreadsheetApp.getActive().getSpreadsheetTimeZone(), 'yyyy.MM.dd.');
    var dayOfWeek = daysOfWeek[startDate3.getDay()];
    dateArr3.push([date, dayOfWeek]);
    startDate3.setDate(startDate3.getDate() + 1);
  }

  sheet.getRange('B3:C33').clearContent();
  sheet.getRange('G3:H33').clearContent();
  sheet.getRange('L3:M33').clearContent();

  sheet.getRange(3, 2, dateArr1.length, 2).setValues(dateArr1); //저번달
  sheet.getRange(3, 7, dateArr2.length, 2).setValues(dateArr2); //이번달
  sheet.getRange(3, 12, dateArr3.length, 2).setValues(dateArr3); //다음달

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
