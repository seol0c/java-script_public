
//구글스프레드시트 - 랜덤으로 코드를 뽑고, 이를 이용하여 정독실, 기숙사 자리배치함

function assignCode(name) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var codeSheet = ss.getSheetByName('코드관리');
  var resultSheet = ss.getSheetByName('결과');

  var aCodes = codeSheet.getRange('A:A').getValues().flat();
  var aUsed = codeSheet.getRange('B:B').getValues().flat();
  var bCodes = codeSheet.getRange('C:C').getValues().flat();
  var bUsed = codeSheet.getRange('D:D').getValues().flat();

  var aAvailable = aUsed.map((v, i) => v === '' ? i : -1).filter(i => i !== -1);
  var bAvailable = bUsed.map((v, i) => v === '' ? i : -1).filter(i => i !== -1);

  if (aAvailable.length === 0 || bAvailable.length === 0) {
    return { success: false, message: "남은 코드가 없습니다." };
  }

  var aIndex = aAvailable[Math.floor(Math.random() * aAvailable.length)];
  var bIndex = bAvailable[Math.floor(Math.random() * bAvailable.length)];

  var aCode = aCodes[aIndex];
  var bCode = bCodes[bIndex];

  // 코드 사용 처리
  codeSheet.getRange(aIndex + 1, 2).setValue(1);
  codeSheet.getRange(bIndex + 1, 4).setValue(1);

  // 결과 기록
  var lastRow = resultSheet.getLastRow() + 1;
  resultSheet.getRange(lastRow, 1).setValue(name);
  resultSheet.getRange(lastRow, 2).setValue(aCode);
  resultSheet.getRange(lastRow, 3).setValue(bCode);

  return { success: true, aCode: aCode, bCode: bCode };
}

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}

