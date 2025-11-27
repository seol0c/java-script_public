// 날짜를 YYYYMMDD로 반환 (인자 없으면 오늘 기준)
function formatYYYYMMDD(dateObj) {
  if (!(dateObj instanceof Date)) {
    dateObj = new Date();  // 안전장치
  }
  var y = dateObj.getFullYear();
  var m = ("0" + (dateObj.getMonth() + 1)).slice(-2);
  var d = ("0" + dateObj.getDate()).slice(-2);
  return "" + y + m + d;}

// 공통 함수
// dateObj: Date 객체 (없으면 오늘로 처리)
// mealType: 1=아침, 2=점심, 3=저녁
function fetchMeal(dateObj, mealType) {
  var dateStr = formatYYYYMMDD(dateObj);

  var url =
    "https://open.neis.go.kr/hub/mealServiceDietInfo"
    + "?ATPT_OFCDC_SC_CODE=F10"
    + "&SD_SCHUL_CODE=7380031"
    + "&MMEAL_SC_CODE=" + mealType
    + "&MLSV_YMD=" + dateStr
    + "&Type=json";

  try {
    var response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
    var text = response.getContentText();
    var json = JSON.parse(text);
    if (!json.mealServiceDietInfo) {
      return "식단없음";}
    var arr = json.mealServiceDietInfo;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].row && arr[i].row.length > 0) {
        //  <br/>을 실제 줄바꿈으로 변환
        var menu = arr[i].row[0].DDISH_NM;
        menu = menu.replace(/<br\/?>/gi, "\n");
        return menu;}}
    return "식단없음";
  } catch (e) {
    return "식단없음";}}

function TODAY_BREAKFAST() {var today = new Date();return fetchMeal(today, 1);} // 오늘 아침
function TODAY_LUNCH() {var today = new Date();return fetchMeal(today, 2);} // 오늘 점심
function TODAY_DINNER() {var today = new Date();return fetchMeal(today, 3);} // 오늘 저녁
function TOMORROW_BREAKFAST() {var t = new Date();t.setDate(t.getDate() + 1);return fetchMeal(t, 1);} // 내일 아침
function TOMORROW_LUNCH() {var t = new Date();t.setDate(t.getDate() + 1);return fetchMeal(t, 2);} // 내일 점심
function TOMORROW_DINNER() {var t = new Date();t.setDate(t.getDate() + 1);return fetchMeal(t, 3);} // 내일 저녁
