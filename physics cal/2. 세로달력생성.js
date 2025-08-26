function showCalendar() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("이벤트달력");
  var today = new Date();
  
  var startDate1 = new Date(today.getFullYear(), today.getMonth()-1, 1);
  var endDate1 = new Date(today.getFullYear(), today.getMonth(), 0);
  var dateArr1 = [];

  var startDate2 = new Date(today.getFullYear(), today.getMonth(), 1);
  var endDate2 = new Date(today.getFullYear(), today.getMonth()+1, 0);
  var dateArr2 = [];
  
  var startDate3 = new Date(today.getFullYear(), today.getMonth()+1, 1);
  var endDate3 = new Date(today.getFullYear(), today.getMonth()+2, 0);
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
}
