function autoRefresh2() {
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("DB");

  // 기존 값 삭제
  sh.getRange("C3:C9").clearContent();

  // 스크립트 내부에서 직접 함수 실행하고 결과값만 셀에 넣기
  // 오늘
  // sh.getRange("C3").setValue(TODAY_BREAKFAST());
  sh.getRange("C4").setValue(TODAY_LUNCH());
  sh.getRange("C5").setValue(TODAY_DINNER());

  // 내일
  // sh.getRange("C7").setValue(TOMORROW_BREAKFAST());
  sh.getRange("C8").setValue(TOMORROW_LUNCH());
  sh.getRange("C9").setValue(TOMORROW_DINNER());
}
