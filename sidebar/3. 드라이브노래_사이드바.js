function playMusic1() { //노래 한곡 무한재생
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("시트1");
  var value = sheet.getRange("A1").getValue();
  if (value === 1) {
    var file = DriveApp.getFileById("1-kMUX06oM5ZwROZSQutdbkmz8sdht_7L"); //파일ID
    //1-kMUX06oM5ZwROZSQutdbkmz8sdht_7L
    //1ldgfpcnlf6RR0lYb0lzgB7PqeJ_Y71Fv
    var audioBlob = file.getBlob(); //Blob 가져오기
    var data = audioBlob.getBytes(); //Blob 데이터 가져오기
    var audioBase64 = Utilities.base64Encode(data); // Base64 인코딩된 데이터 생성
    var audioUrl = "data:audio/mp3;base64," + audioBase64; // Base64 데이터를 이용하여 오디오 URL 생성

    var audioInfo = getAudioInfo(file.getName()); //노래정보 가져오기(아래 함수 호출)
    var title = audioInfo.title;
    var artist = audioInfo.artist;

    // HTML 문자열 생성(처음 자동시작, 반복, 아래간격(mirgin) 적용)
    var html = '<div style="text-align:center;">' +
      '<div style="font-size:20px; margin-bottom: 5px; font-weight:bold;">' + title + '</div>' +
      '<div style="font-size:16px; margin-bottom: 10px;">' + artist + '</div>' + '</div>' +
      '<audio src="' + audioUrl + '" controls autoplay loop>';  

    var ui = HtmlService.createHtmlOutput(html); // HTML 문자열을 이용하여 HtmlOutput 객체 생성
    SpreadsheetApp.getUi().showSidebar(ui); // 측면바 UI에 HtmlOutput 객체 표시
  }
}

function getAudioInfo(fileName) { //파일명에서 확장자 없애고 "-" 구분하여 title, artist 분리
  var audioInfo = {};
  var fileNameWithoutExtension = fileName.trim().replace(/\.mp3$/, ''); //mp3 확장자 지우기
  var parts = fileNameWithoutExtension.split("-");
  if (parts.length === 1) { //"-"로 구분된 경우 아티스트, 타이틀 분리하여 노출
    audioInfo.title = fileNameWithoutExtension;
    audioInfo.artist = ''; //"-"가 없으면 아티스트를 공백처리하고 파일명을 타이틀로 사용
  } else {
    audioInfo.title = parts[1].trim();
    audioInfo.artist = parts[0].trim();
  }
  return audioInfo;
}
