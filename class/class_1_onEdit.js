//전체 각주처리하고 사용하지 않음. 너무 느리고, 오류율이 큼. 250623 백업 후 사용하지 않음



function onEdit(e) { //자동 행 숨기기, 업로드 후 삭제, 자리추첨(삭제, 추천, 전송)
  //현재 시트 찾기
  var sheet1 = SpreadsheetApp.getActive().getSheetByName("기록");
  var sheet2 = SpreadsheetApp.getActive().getSheetByName("자리");
  var sheet3 = SpreadsheetApp.getActive().getSheetByName("자리추첨");
  var classnum1 = sheet1.getRange("H2").getValue(); //칸 값에 해당되는 셀 - 변동 있으니 체크해야 함
  var classnum2 = sheet2.getRange("N2").getValue(); //칸 값에 해당되는 셀 - 변동 있으니 체크해야 함
  var classnum3 = sheet3.getRange("B2").getValue(); //칸 값에 해당되는 셀 - 변동 있으니 체크해야 함


  ////////////////////////////////////////기록 자동 행 숨기기
  var firstrow1 = 5; //시작(빈칸) - 변동 있으니 체크해야 함
  var lastrow1 = firstrow1 + 1076;
  var num11_1 = firstrow1 + 1; //1-1 시작

  //sheet1에 해당하는 classnum1은 앞에서 지정함
  if (classnum1 == "11") { var numRows1=num11_1; }  if (classnum1 == "12") { var numRows1=num11_1+60*1; }
  if (classnum1 == "13") { var numRows1=num11_1+60*2; }  if (classnum1 == "14") { var numRows1=num11_1+60*3; }
  if (classnum1 == "15") { var numRows1=num11_1+60*4; }  if (classnum1 == "16") { var numRows1=num11_1+60*5; }
  if (classnum1 == "21") { var numRows1=num11_1+60*6; }  if (classnum1 == "22") { var numRows1=num11_1+60*7; }
  if (classnum1 == "23") { var numRows1=num11_1+60*8; }  if (classnum1 == "24") { var numRows1=num11_1+60*9; }
  if (classnum1 == "25") { var numRows1=num11_1+60*10; }  if (classnum1 == "26") { var numRows1=num11_1+60*11; }
  if (classnum1 == "31") { var numRows1=num11_1+60*12; }  if (classnum1 == "32") { var numRows1=num11_1+60*13; }
  if (classnum1 == "33") { var numRows1=num11_1+60*14; }  if (classnum1 == "34") { var numRows1=num11_1+60*15; }
  if (classnum1 == "35") { var numRows1=num11_1+60*16; }  if (classnum1 == "36") { var numRows1=num11_1+60*17; }
  if (classnum1 == "전체") { var numRows1=num11_1; }

  sheet1.showRows(firstrow1, lastrow1); //행 숨기기
  sheet1.hideRows(firstrow1, numRows1 - firstrow1);
  sheet1.hideRows(numRows1 + 60, lastrow1- numRows1 - 60 + firstrow1);

  if (classnum1 == "전체") {
    sheet1.showRows(firstrow1, lastrow1); //행 숨기기
    sheet1.hideRows(firstrow1, 1);
  }


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  ////////////////////////////////////////자리표 자동 행 숨기기
  var firstrow2 = 4; //시작(빈칸) - 변동 있으니 체크해야 함
  var lastrow2 = firstrow2 + 533;
  var num11_2 = firstrow2 + 1; //1-1 시작

  if (classnum2 == "11") { var numRows2=num11_2; }  if (classnum2 == "12") { var numRows2=num11_2+30*1; }
  if (classnum2 == "13") { var numRows2=num11_2+30*2; }  if (classnum2 == "14") { var numRows2=num11_2+30*3; }
  if (classnum2 == "15") { var numRows2=num11_2+30*4; }  if (classnum2 == "16") { var numRows2=num11_2+30*5; }
  if (classnum2 == "21") { var numRows2=num11_2+30*6; }  if (classnum2 == "22") { var numRows2=num11_2+30*7; }
  if (classnum2 == "23") { var numRows2=num11_2+30*8; }  if (classnum2 == "24") { var numRows2=num11_2+30*9; }
  if (classnum2 == "25") { var numRows2=num11_2+30*10; }  if (classnum2 == "26") { var numRows2=num11_2+30*11; }
  if (classnum2 == "31") { var numRows2=num11_2+30*12; }  if (classnum2 == "32") { var numRows2=num11_2+30*13; }
  if (classnum2 == "33") { var numRows2=num11_2+30*14; }  if (classnum2 == "34") { var numRows2=num11_2+30*15; }
  if (classnum2 == "35") { var numRows2=num11_2+30*16; }  if (classnum2 == "36") { var numRows2=num11_2+30*17; }
  if (classnum2 == "전체") { var numRows2=num11_2; }

  sheet2.showRows(firstrow2, lastrow2); //행 숨기기
  sheet2.hideRows(firstrow2, numRows2 - firstrow2);
  sheet2.hideRows(numRows2 + 19, lastrow2 - numRows2 - 19 + firstrow2); //19칸만 노출

  if (classnum2 == "전체") {
    sheet2.showRows(firstrow2, lastrow2); //행 숨기기
    sheet2.hideRows(firstrow2, 1);
  }


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  ////////////////////////////////////////자리표 체크 시 업로드 후 삭제
  var check = "AA2"; //체크 셀 - 변동 있으니 체크해야 함
  var check_cell2 = sheet2.getRange(check).getValue();

  //2번 시트에서 이번주 열 찾기(update에서 가져와서 시트만 바꿈)
  var targetValue = "2"; // 이번주에 해당하는 값(지난주는 1, 이번주는 2)
  var row = sheet1.getRange(2, 1, 1, sheet1.getLastColumn()).getValues()[0]; //2열에서 검색 - 변동 있으니 체크해야 함
  for (var i = 0; i < row.length; i++) {
    if (row[i] == targetValue) {
      var targetcolumn = i + 1;
      Logger.log(targetcolumn); //log에 출력(열 맞나 확인) - 시트 수정시 확인
      break;
    }
  }

  if(check_cell2){ //2번시트 셀 체크시

   var copy_col = 6; //열 번호, sheet2에 해당하는 classnum2은 앞에서 지정함
   if (classnum2 == "11") { var copy_start_row = 6; var copy_end_row = 65; }    if (classnum2 == "12") { var copy_start_row = 6+60*1; var copy_end_row = 65+60*1; }
   if (classnum2 == "13") { var copy_start_row = 6+60*2; var copy_end_row = 65+60*2; }   if (classnum2 == "14") { var copy_start_row = 6+60*3; var copy_end_row = 65+60*3; }
   if (classnum2 == "15") { var copy_start_row = 6+60*4; var copy_end_row = 65+60*4; }   if (classnum2 == "16") { var copy_start_row = 6+60*5; var copy_end_row = 65+60*5; }
   if (classnum2 == "21") { var copy_start_row = 6+60*6; var copy_end_row = 65+60*6; }   if (classnum2 == "22") { var copy_start_row = 6+60*7; var copy_end_row = 65+60*7; }
   if (classnum2 == "23") { var copy_start_row = 6+60*8; var copy_end_row = 65+60*8; }   if (classnum2 == "24") { var copy_start_row = 6+60*9; var copy_end_row = 65+60*9; }
   if (classnum2 == "25") { var copy_start_row = 6+60*10; var copy_end_row = 65+60*10; }   if (classnum2 == "26") { var copy_start_row = 6+60*11; var copy_end_row = 65+60*11; }
   if (classnum2 == "31") { var copy_start_row = 6+60*12; var copy_end_row = 65+60*12; }   if (classnum2 == "32") { var copy_start_row = 6+60*13; var copy_end_row = 65+60*13; }
   if (classnum2 == "33") { var copy_start_row = 6+60*14; var copy_end_row = 65+60*14; }   if (classnum2 == "34") { var copy_start_row = 6+60*15; var copy_end_row = 65+60*15; }
   if (classnum2 == "35") { var copy_start_row = 6+60*16; var copy_end_row = 65+60*16; }   if (classnum2 == "36") { var copy_start_row = 6+60*17; var copy_end_row = 65+60*17; }
   if (classnum2 == "전체") { sheet2.getRange(check).uncheck() }

   //copycell을 해당 반의 누가기록에 이동하도록 함. 기존 값이 있으면 구분점(,)을 추가하여 계속 누적
  sheet2.getRange(check).uncheck(); // 2번시트 가서 체크 풀기
  var copycell = sheet1.getRange(copy_start_row, copy_col, copy_end_row - copy_start_row + 1, 1).getValues(); //원본 값이 복사될 범위에서 값들을 읽어와 2차원 배열 copycell에 저장
  var pastecell = sheet1.getRange(copy_start_row, targetcolumn, copy_end_row - copy_start_row + 1, 1).getValues(); //복사된 값을 붙여넣을 범위에서 값들을 읽어와 2차원 배열 pastecell에 저장
  var newValues = pastecell.map( //pastecell의 각 행(row)에 대해 아래 함수를 실행한 결과를 새로운 배열 newValues에 저장
    function (row, index) {
      var copyValue = copycell[index][0]; //현재 처리 중인 행의 복사된 값(원본 값)을 copyValue 변수에 저장
      if (row[0] !== '' ) { //붙여넣을 대상 셀에 이미 값이 있는 경우에 아래의 코드 블럭을 실행
        if (copyValue !== '') {
          copyValue = ', ' + copyValue; //복사할 셀이 비어있지 않을때만 구분점(,) 추가
        }
      }
    return [row[0] + copyValue]; //새로운 값을 구성하여 반환
  });
  sheet1.getRange(copy_start_row, targetcolumn, newValues.length, 1).setValues(newValues); //새로운 값을 붙여넣을 대상 셀에 설정



   //copycell을 해당 반의 누가기록 복사하는 코드. 잘작동하지만 추가로 이동하지 않아서 저장만 함, (pastecell은 맨 위칸만 선택)하면 됨
   // var copycell = sheet1.getRange(copy_start_row, copy_col, copy_end_row - copy_start_row + 1, 1);
   // var pastecell = sheet1.getRange(copy_start_row, targetcolumn);
   // copycell.copyTo(pastecell, {contentsOnly:true});
   // sheet2.getRange(check).uncheck(); //2번시트 가서 체크 풀기


   //2번시트 돌아와서 자리표 내용 삭제
    var col1 = 22; //삭제 대상 첫 열 - 변동 있으니 체크해야 함
    var col2 = col1 + 6*1;
    var col3 = col1 + 6*2;
    var col4 = col1 + 6*3;
    var col5 = col1 + 6*4;

    sheet2.getRange(numRows2, col1,19,1).clearContent(); //행수 19, 열수 1
    sheet2.getRange(numRows2, col2,19,1).clearContent();    sheet2.getRange(numRows2, col3,19,1).clearContent();
    sheet2.getRange(numRows2, col4,19,1).clearContent();    sheet2.getRange(numRows2, col5,19,1).clearContent();
  }


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  ////////////////////////////////////////자리추첨(추첨, 삭제, 전송)
  var check_cell3_1 = sheet3.getRange("AB4"); //삭제 체크 셀 - 변동 있으니 체크해야 함
  var check_cell3_2 = sheet3.getRange("AB5"); //추첨 체크 셀 - 변동 있으니 체크해야 함
  var check_cell3_3 = sheet3.getRange("AB36"); //추첨 체크(아래) 셀 - 변동 있으니 체크해야 함
  var check_cell3_4 = sheet3.getRange("AB6"); //전송 체크 셀 - 변동 있으니 체크해야 함

  if(check_cell3_1.isChecked()){
    sheet3.getRange("W5:Y29").clearContent(); //추첨 내역 삭제 -  변동 있으니 체크해야 함
    check_cell3_1.uncheck();
  }

  if(check_cell3_2.isChecked() || check_cell3_3.isChecked()){ //위 또는 아래에 있는 추첨 체크될 시
    var copycell3_1 = sheet3.getRange("U5:U29"); //복사 후 붙여넣기 - 변동 있으니 체크해야 함
    var pastecell3_1 = sheet3.getRange("W5");
    copycell3_1.copyTo(pastecell3_1, {contentsOnly:true});
    var copycell3_2 = sheet3.getRange("S5:T29");
    var pastecell3_2 = sheet3.getRange("X5");
    copycell3_2.copyTo(pastecell3_2, {contentsOnly:true});
    check_cell3_2.uncheck();
    check_cell3_3.uncheck();
  }

  if(check_cell3_4.isChecked()){ //전송 체크
   var copy_start_row = 6; //행 번호(정확히 시작하는 값으로 해야 함)
   var copy_end_row = 22;
   if (classnum3 == "11") { var paste_start_row = 5; }   if (classnum3 == "12") { var paste_start_row = 5 + 30*1; }
   if (classnum3 == "13") { var paste_start_row = 5 + 30*2; }   if (classnum3 == "14") { var paste_start_row = 5 + 30*3; }
   if (classnum3 == "15") { var paste_start_row = 5 + 30*4; }   if (classnum3 == "16") { var paste_start_row = 5 + 30*5; }
   if (classnum3 == "21") { var paste_start_row = 5 + 30*6; }   if (classnum3 == "22") { var paste_start_row = 5 + 30*7; }
   if (classnum3 == "23") { var paste_start_row = 5 + 30*8; }   if (classnum3 == "24") { var paste_start_row = 5 + 30*9; }
   if (classnum3 == "25") { var paste_start_row = 5 + 30*10; }   if (classnum3 == "26") { var paste_start_row = 5 + 30*11; }
   if (classnum3 == "31") { var paste_start_row = 5 + 30*12; }   if (classnum3 == "32") { var paste_start_row = 5 + 30*13; }
   if (classnum3 == "33") { var paste_start_row = 5 + 30*14; }   if (classnum3 == "34") { var paste_start_row = 5 + 30*15; }
   if (classnum3 == "35") { var paste_start_row = 5 + 30*16; }   if (classnum3 == "36") { var paste_start_row = 5 + 30*17; }

   for(var i = 0; i < 5; i++) {
     var copy_start_col = 30 + 4*i;
     var copycell = sheet3.getRange(copy_start_row, copy_start_col, copy_end_row - copy_start_row + 1, 1);
     var pastecell = sheet2.getRange(paste_start_row, 18 + 6*i);
     copycell.copyTo(pastecell, {contentsOnly:true}); //붙여넣기
     }
   check_cell3_4.uncheck();
  }
}