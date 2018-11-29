function displayWeather(city) {
 var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city;
 var token = '&appid=c6cd4dbd5e70abfbc43e075ae7abdd14';
 var units = '&units=metric';
 $.get(url + token + units, function(data) {
   $('#temperature').text(data.main.temp);
 });
}
// c6cd4dbd5e70abfbc43e075ae7abdd14


var thermostat = new Thermostat();

displayWeather('London');

$('#select-city').submit(function(event) {
  event.preventDefault();
  var city = $('#current-city').val();
  displayWeather(city);
});

  updateTemperature();

$('#temperature-up').on('click', function() { // event listener
  thermostat.up(); // update model
  updateTemperature(); // update view
})

$('#temperature-down').click(function() { // alternate version of .on(click) with a sprinkle of jQuery syntactic sugar
  thermostat.down(); // update model
  updateTemperature(); // update view
})

$('#temperature-reset').click(function() { // alternate version of .on(click) with a sprinkle of jQuery syntactic sugar
  thermostat.resetTemperature(); // update model
  updateTemperature(); // update view
})

$('#powersaving').click(function() { // alternate version of .on(click) with a sprinkle of jQuery syntactic sugar
  updatePowerSaving();
  // thermostat.switchPowerSavingModeOn(); // update model
  $('#power-saving').text('on')
  updateTemperature(); // update view
})

// $('#powersaving-off').click(function() { // alternate version of .on(click) with a sprinkle of jQuery syntactic sugar
//   thermostat.switchPowerSavingModeOff(); // update model
//   $('#power-saving').text('off')
//   $('#powersaving-off').attr('value', 'PSM On');
//   updateTemperature(); // update view
// })

function updateTemperature() {
  $('#temperature').text(thermostat.temperature);
  $('#temperature').attr('class', thermostat.energyUsage());
}

function updatePowerSaving() {
  if (thermostat.isPowerSavingModeOn()) {
    thermostat.switchPowerSavingModeOff();
    $('#power-saving-status').text('off')
    $('#powersaving').attr('value', 'Turn PSM On')
  } else {
    thermostat.switchPowerSavingModeOn();
    $('#power-saving-status').text('on')
    $('#powersaving').attr('value', 'Turn PSM Off')
  }
}
