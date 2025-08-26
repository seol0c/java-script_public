function choose_music() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("시트2");
  var range = sheet.getRange("B4:B13");
  var values = range.getValues();
  var title = ss.getRange("D2");
  var url = ss.getRange("E2");
  var row;

  for (row = 0; row < values.length; row++) {
    if (values[row][0] === true) {
      title.setValue(sheet.getRange(row + 4, 4).getValue());
      url.setValue(sheet.getRange(row + 4, 5).getValue());
      sheet.getRange(row + 4, 2).setValue(false);
    }
  }
}
