function autoRefresh() {
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("DB");
  sh.getRange("C3:C9").clearContent();
  Utilities.sleep(5000);
  //sh.getRange("C3").setValue("=TODAY_BREAKFAST()"); // 오늘 아침
  sh.getRange("C4").setValue("=TODAY_LUNCH()");
  sh.getRange("C5").setValue("=TODAY_DINNER()");
  //sh.getRange("C7").setValue("=TOMORROW_BREAKFAST()"); // 내일 아침
  sh.getRange("C8").setValue("=TOMORROW_LUNCH()");
  sh.getRange("C9").setValue("=TOMORROW_DINNER()");
}