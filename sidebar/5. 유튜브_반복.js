function sidebar_youtube_loop() { //유튜브(반복)+사진+시계
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("시트2");
  var check = "A1";
  var check_cell = sheet.getRange(check).getValue();
  
  if (check_cell) {
    var url = sheet.getRange("E2").getValue();
    var videoId = getVideoIdFromUrl(url); //앱스크립트 좌측에서 서비스 - YouTube API 설치해야 함
    var playerUrl = "https://www.youtube.com/embed/" + videoId + "?enablejsapi=1&autoplay=1&loop=1&playlist=" + videoId; //자동재생, 반복
    var imageUrl1 = "https://drive.google.com/uc?id=" + sheet.getRange("E15").getValue(); // 이미지 ID
    var imageUrl2 = "https://drive.google.com/uc?id=" + sheet.getRange("E16").getValue();
    var imageUrl3 = "https://drive.google.com/uc?id=" + sheet.getRange("E17").getValue();
    var imageUrl4 = "https://drive.google.com/uc?id=" + sheet.getRange("E18").getValue();
    
    var imageHtml = '<br><img src="' + imageUrl1 + '" width="285" height="160" /><br/>' +
                        '<img src="' + imageUrl2 + '" width="285" height="160" /><br/>' +
                        '<img src="' + imageUrl3 + '" width="285" height="160" /><br/>' +
                        '<img src="' + imageUrl4 + '" width="285" height="160" />';
    
    var videoHtml = '<iframe id="player" width="285" height="160" src="' + playerUrl + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';

    var clockhtml = HtmlService.createHtmlOutputFromFile('clock').getContent(); //시계는 html로 만들고 이 줄만 추가하면 됨
    
    var html = clockhtml + imageHtml + "<br/>" + videoHtml;
    var ui = HtmlService.createHtmlOutput(html);
    ui.setTitle("physics");

    //영상이 끝났을 때 반복재생
    var iframe = ui.getContent().match(/<iframe.*<\/iframe>/g);
    var jsCode = "<script>" +
             "var videoId = '" + videoId + "';" +
             "var player;" +
             "function onYouTubeIframeAPIReady() {" +
             "  player = new YT.Player('player', {" +
             "    videoId: videoId," +
             "    events: {" +
             "      'onStateChange': onPlayerStateChange" +
             "    }" +
             "  });" +
             "}" +
             "function onPlayerStateChange(event) {" +
             "  if (event.data == YT.PlayerState.ENDED) {" +
             "    player.loadVideoById(videoId);" +
             "  }" +
             "}" +
             "</script>";
    ui.append(jsCode);
    
    SpreadsheetApp.getUi().showSidebar(ui);
    sheet.getRange(check).uncheck();
  }
}

function getVideoIdFromUrl(url) {
  var videoId;
  if (url) {
    var regex = /[?&]([^=#]+)=([^&#]*)/g;
    var params = {};
    var match;
    while (match = regex.exec(url)) {
      params[match[1]] = match[2];
    }
    videoId = params["v"];
  }
  return videoId;
}
