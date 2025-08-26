function autoRefresh() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("식단표");
  sheet.getDataRange().getValues();
}