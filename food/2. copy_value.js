function copy_value() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('DB');
  var range1 = sheet.getRange('C12:C16'); //값
  var range2 = sheet.getRange('D12:D16'); //타겟

  //타겟 값 백업
  var backup = range2.getValues();

  //소스의 값에 따라 타겟 값 변경
  var values = range1.getValues();
  for (var i = 0; i < values.length; i++) {
    try {
      if (values[i][0] == '#N/A') { //값이 없으면 공백으로 변경
        backup[i][0] = '';
      } else if (values[i][0] instanceof Error || String(values[i][0]) == '#ERROR!') {
        // 에러 발생 시 타겟의 값 유지
      } else {
        backup[i][0] = values[i][0];
      }
    } catch (e) {
      // 에러 발생 시 타겟 값 유지
    }
  }

  // 변경된 타겟 값 적용
  range2.setValues(backup);
}
