function checkbox_update(){
  
  //현재 시트 찾기
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet1 = ss.getSheetByName('영찬'); //송신 시트 - 영찬
  var sheet2 = ss.getSheetByName('차현'); //송신 시트 - 차현
  var sheet3 = ss.getSheetByName('종합'); //수신 시트

/* 23:59에 업데이트하게 하려했으나 1주일에 한번 꼴로 오류가 발생하여 안정적으로 23시 ~ 0시 업데이트로 다시 변경
  var currentTime = new Date();
  var currentHour = currentTime.getHours();
  var currentMinute = currentTime.getMinutes();
  //업데이트 시간 23:59
    if (currentHour == 23 && currentMinute == 59){
*/


  var find1 = sheet3.getRange(2,4); //종합시트에서 2행 4열 값(오늘) - 시트 수정시 확인
  var find2 = find1.getValue(); //값으로 저장
  var find3 = find2 - 44831; //오늘에 해당하는 행을 찾음 - 시트 수정시 확인


  //출력 받을 시트의 행 - 영찬
  var targetcell_1 = 'O' + find3;
  Logger.log(targetcell_1); //log에 출력(행 맞나 확인) - 시트 수정시 확인

  //출력 받을 시트의 행 - 차현
  var targetcell_2 = 'AA' + find3;
  Logger.log(targetcell_2); //log에 출력(행 맞나 확인) - 시트 수정시 확인


  //종합의 오늘 행(영찬)으로 붙여넣기
  ss.setActiveSheet(sheet3);
  ss.getRange("'영찬'!C6:L6").copyTo(ss.getRange(targetcell_1), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);

  //종합의 오늘 행(차현)으로 붙여넣기
  ss.setActiveSheet(sheet3);
  ss.getRange("'차현'!C6:L6").copyTo(ss.getRange(targetcell_2), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);


  //복사 후 오늘 행 초기화
  ss.setActiveSheet(sheet1); //시트 활성화 - 영찬
  var val1 = sheet1.getRange("T6:T15"); //입력된 시간 초기화

  ss.setActiveSheet(sheet2); //시트 활성화 - 차현
  var val2 = sheet2.getRange("T6:T15"); //입력된 시간 초기화

  val1.clearContent() //초기화
  val2.clearContent() //초기화

  //종합시트 행 숨김, 보임 설정
  sheet3.showRows(find3-20, 22);
  sheet3.hideRows(3, find3-21);
  sheet3.hideRows(find3+2, 3016-find3);
}