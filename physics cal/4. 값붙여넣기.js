function copyRangeToAnotherSheet() {
  var sourceRange = SpreadsheetApp.getActive().getSheetByName("월간달력").getRange('W23:AC44');
  var targetCell = SpreadsheetApp.getActive().getSheetByName("물리달력").getRange('B3:H24');
  sourceRange.copyTo(targetCell, {contentsOnly:true}); //붙여넣기
}

//종합할 경우 가장 먼저 들어가야 함
//아직 완전히 다른 스크립트가 실행되지 않은 상태에서 오류가 발생할 수 있음