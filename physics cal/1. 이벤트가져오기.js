function getCalendarEvents() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("이벤트");

  const calendars = [
    {id: "qansohiecib58ga9k1bmppvt5oi65b1q@import.calendar.google.com", name: "달력1(휴일)"},
    {id: "a4f8258e2f69f436156930ef292e16ff7430cbf182af815dc89ef30226a63a89@group.calendar.google.com", name: "달력2(물리과)"}
  ];
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const end = new Date(today.getFullYear(), today.getMonth() + 2, 0);

  const events = calendars.reduce((prev, cal) => {
    const calendar = CalendarApp.getCalendarById(cal.id);
    const events = calendar.getEvents(start, end);
    events.forEach(event => {
      prev.push({
        start: Utilities.formatDate(event.getStartTime(), "Asia/Seoul", "yyyy.MM.dd."),
        end: Utilities.formatDate(event.getEndTime(), "Asia/Seoul", "yyyy.MM.dd."),
        title: event.getTitle(),
        calendar: cal.name
      });
    });
    return prev;
  }, []);

  events.sort((a, b) => new Date(a.start) - new Date(b.start));

  sheet.getRange("B3:D").clearContent();
  sheet.getRange("B2:D2").setValues([["날짜", "달력종류", "내용"]]);
  var row = 3; //데이터 시작

  events.forEach(event => {
    const startDate = new Date(event.start);
    const endDate = new Date(event.end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    for(let i = 0; i < diffDays; i++){
      const date = Utilities.formatDate(new Date(startDate.getTime() + (i * 24 * 60 * 60 * 1000)), "Asia/Seoul", "yyyy.MM.dd.");
      sheet.getRange(row, 2, 1, 3).setValues([[date, event.calendar, event.title]]);
      row++; // 다음 행으로 이동
  }
  });
}
