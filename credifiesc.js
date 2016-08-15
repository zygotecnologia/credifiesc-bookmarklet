/*
Credifiesc bookmarklet by Lucas Prim
Use this at your own risk!
*/

(function() {
  // var EXPECT_TITLE = 'Movimentos n�o faturados';

  // var titleElement = document.getElementById('titlePhase');

  // if(!titleElement || titleElement.innerText != EXPECT_TITLE) {
  //   console.log("Bookmarklet won't load: Not on Credifiesc page");
  //   console.log("Current page title: ", titleElement.innerText);
  //   console.log("Expected page title: ", EXPECT_TITLE);
  //   return;
  // }

  var tables = document.getElementsByClassName('dadosCartaoTitular');
  var confirmedTable = tables[1].getElementsByTagName('tbody')[0];
  var installmentTable = tables[2].getElementsByTagName('tbody')[0];

  var lines = [].slice.call(confirmedTable.getElementsByTagName('tr'));

  var csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "\"Date\",\"Payee\",\"Category\",\"Memo\",\"Outflow\",\"Inflow\"\n";

  lines.forEach(function(line, i) {
    var columns = line.getElementsByTagName('td');

    var date = columns[0].innerText;

    if(date === 'Total:') { return; } // Skip if its the total column

    var payee = columns[1].innerText;

    if(payee.match(/ - \d+\/\d+$/)) { return; } // Skip split pmts

    var memo = columns[2].innerText;
    var value = columns[4].innerText.replace('.', '').replace(',', '.');

    csvContent += "\"" + date + "\",\"" + payee + "\",\"\",\"" + memo + "\",\"";

    if(value.slice(0,1) == '-') {
      // Negative values are inflow
      csvContent += "\",\"" + value.slice(1) + "\"\n";
    } else {
      csvContent += "" + value + "\",\"\"\n";
    }
  });

  var iLines = [].slice.call(installmentTable.getElementsByTagName('tr'));

  iLines.forEach(function(line, i) {
    var columns = line.getElementsByTagName('td');

    var date = columns[0].innerText;
    var payee = columns[1].innerText;
    var memo = columns[2].innerText;
    var value = columns[3].innerText.replace('.', '').replace(',', '.');

    csvContent += "\"" + date + "\",\"" + payee + "\",\"\",\"" + memo + "\",\"" + value + "\",\"\"\n";
  });

  // Date,Payee,Category,Memo,Outflow,Inflow
  var encodedUri = encodeURI(csvContent);
  window.open(encodedUri);
})();
