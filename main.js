$(document).ready(function(){
  $.ajax({
    url: ' http://157.230.17.132:4003/sales',
    method: 'GET',
    success: function(data){
      printPieChart(data);
      printLineChart(data);
    },
    error: function(){
      alert('errore');
    }


  });
});

function printLineChart(results)
{
  var oggettoVendite = {
    January: 0,
    February: 0,
    March: 0,
    April: 0,
    May: 0,
    June: 0,
    July: 0,
    August: 0,
    September: 0,
    October: 0,
    November: 0,
    December: 0
  };

  for (var i = 0; i < results.length; i++) {
    // oggetto della vendita
    var vendita = results[i];
    // ammontare della vendita
    var amount = vendita.amount;
    // data vendita formato stringa
    var originalDate = vendita.date;
    // data della vendita in formato moment
    var momentDate = moment(originalDate, "DD/MM/YYYY");
    // mese della vendita in formato stringa
    var mese = momentDate.format('MMMM');

    oggettoVendite[mese] += amount;

  }

var arrayMesi = [];
var arrayAmounts = [];

  for (var mese in oggettoVendite) {
    arrayMesi.push(mese);
    arrayAmounts.push(oggettoVendite[mese]);
    console.log(mese);
    console.log(oggettoVendite[mese]);
  }

  var chart = new Chart($('#line'), {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: arrayMesi,
        datasets: [{
            label: "VENDITE AZIENDA",
            borderColor: 'rgb(255, 99, 132)',
            data: arrayAmounts,
        }]
    },
});


}

function printPieChart(results)
{

  var processedObj = {};
  var fatturato = 0;

    for (var i = 0; i < results.length; i++) {
      var vendita = results[i];
      var venditore = vendita.salesman;
      var amount = vendita.amount;

      if (processedObj[venditore] == undefined)
      {
        processedObj[venditore] = 0;
      }

      processedObj[venditore] += amount;
      fatturato += amount;

    }

    var arrayLabels = [];
    var arrayAmounts = [];

    for (var nomeVenditore in processedObj) {
      var percentualeFatturato = processedObj[nomeVenditore] / fatturato * 100;
      arrayLabels.push(nomeVenditore);
      arrayAmounts.push(percentualeFatturato.toFixed(2));
    }

    var myPieChart = new Chart($('#pie'),{
    type: 'pie',
    data : {
        datasets: [{
            data: arrayAmounts,
            backgroundColor: ['#32af9e', '#299688', '#197a6e', '#035e54' ],
            borderColor: 'white'
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: arrayLabels
  }

});
}
