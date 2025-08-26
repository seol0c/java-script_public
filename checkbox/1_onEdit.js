function onEdit(e) { //자동 시간 입력, 자동 행 숨기기
  //현재 시트 찾기
  var sheet1 = SpreadsheetApp.getActive().getSheetByName("영찬");
  var sheet2 = SpreadsheetApp.getActive().getSheetByName("차현");
  var sheet3 = SpreadsheetApp.getActive().getSheetByName("종합");

// test
  ////////////////////////////////////////자동 시간 입력
  var check_cell = "S"; //체크박스 열
  var target_cell = "T"; //내용입력 열
  var nowcell = sheet1.getRange("C3"); //현재시간 셀값 저장
  var nowtime = nowcell.getValue();

  //6행부터 15행까지 반복
  for (var i = 6; i <= 15; i++) {
    var cell1_1 = sheet1.getRange(check_cell + i); //체크박스 열 - 영찬
    var cell1_2 = sheet1.getRange(target_cell + i); //내용입력 열
    var value1 = cell1_1.getValue();

    var cell2_1 = sheet2.getRange(check_cell + i); //체크박스 열 - 차현
    var cell2_2 = sheet2.getRange(target_cell + i); //내용입력 열
    var value2 = cell2_1.getValue();

    //체크 된 경우 U셀에 값 저장 후 체크 풀기
    if (value1 == true) { //영찬
      cell1_2.setValue(nowtime);
      cell1_1.setValue(false);
    }

    if (value2 == true) { //차현
      cell2_2.setValue(nowtime);
      cell2_1.setValue(false);
    }
  }




  ////////////////////////////////////////자동 행, 열 숨기기
  //10(최고값) 입력시 범위를 벗어나는 오류가 생기므로(0칸을 숨기는 오류) 한칸을 더 숨기는 방식으로 코딩해야 함
  //즉, 10 입력시 0칸이 아닌 1칸을 숨기고 1 입력시 9칸이 아닌 10칸을 숨겨야 함, 빈칸 삽입하면 됨
  var numRows1 = sheet1.getRange("E3").getValue(); //칸 값에 해당되는 셀 - 영찬
  sheet1.showRows(6, 10); //행 숨기기
  sheet1.hideRows(6 + numRows1, 11 - numRows1);
  sheet3.showColumns(15, 10); //열 숨기기
  sheet3.hideColumns(15 + numRows1, 11 - numRows1);

  var numRows2 = sheet2.getRange("E3").getValue(); //칸 값에 해당되는 셀 - 차현
  sheet2.showRows(6, 10); //행 숨기기
  sheet2.hideRows(6 + numRows2, 11 - numRows2);
  sheet3.showColumns(27, 10); //열 숨기기
  sheet3.hideColumns(27 + numRows2, 11 - numRows2);
}