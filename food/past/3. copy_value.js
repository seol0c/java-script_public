function copy_value1() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('크롤링');
  var range1 = sheet.getRange('G18:G77'); //값
  var range2 = sheet.getRange('H18:H77'); //타겟

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

//크롤링은 이제 안씀 - 홈페이지에서 추출