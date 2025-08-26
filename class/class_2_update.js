//전체 각주처리하고 사용하지 않음. 250623 백업 후 사용하지 않음

function hideColumn() {
  //현재 시트 찾기
  var sheet = SpreadsheetApp.getActive().getSheetByName("기록");

  var targetValue = "2"; // 이번주에 해당하는 값(지난주는 1, 이번주는 2)
  var row = sheet.getRange(2, 1, 1, sheet.getLastColumn()).getValues()[0]; //2열에서 검색 - 변동 있으니 체크해야 함
  for (var i = 0; i < row.length; i++) {
    if (row[i] == targetValue) {
      var targetcolumn = i + 1;
      break;
    }
  }

  var firstcolumn = 18; //시작(빈칸) - 변동 있으니 체크해야 함
  sheet.showColumns(firstcolumn, 72 - firstcolumn); //열 숨기기 - 숫자는 적절히 아무거나 넣으면 되는 듯...
  sheet.hideColumns(firstcolumn, targetcolumn - firstcolumn - 1);

}