function sidebar_youtube_next() { //유튜브(반복)+사진+시계
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("시트2");
  var check = "A1";
  var check_cell = sheet.getRange(check).getValue();
  
  if (check_cell) {
    var url = sheet.getRange("E2").getValue();
    var videoId = getVideoIdFromUrl(url); //앱스크립트 좌측에서 서비스 - YouTube API 설치해야 함
    var playerUrl = "https://www.youtube.com/embed/" + videoId + "?enablejsapi=1&autoplay=1&loop=0&playlist=" + videoId; //한곡 반복 없음
    var imageUrl1 = "https://drive.google.com/uc?id=" + sheet.getRange("E15").getValue(); // 이미지 ID
    var imageUrl2 = "https://drive.google.com/uc?id=" + sheet.getRange("E16").getValue();
    var imageUrl3 = "https://drive.google.com/uc?id=" + sheet.getRange("E17").getValue();
    var imageUrl4 = "https://drive.google.com/uc?id=" + sheet.getRange("E18").getValue();
    
  }}