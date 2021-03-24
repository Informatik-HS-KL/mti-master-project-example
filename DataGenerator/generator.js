/**
 * Generator for MQTT messages
 */
const { waitForDebugger } = require('inspector');
const mqtt = require('mqtt');
const { interval } = require('rxjs');

const client = mqtt.connect('mqtt://localhost');

// Generate test data
client.on('connect', () => {
    generateWeatherData();
})

/**
 * Generate random values for weather data
 */
function generateWeatherData() {
    const minTemp = 20;
    const maxTemp = 25;
    const minHum = 35;
    const maxHum = 45;

    let temp = minTemp;
    let hum = minHum;
    setInterval(function(){ 
        
        // Generate new temperature
        let tempStep = +(getRandomValue(-5, 5)/10).toFixed(2);
        if(temp + tempStep > maxTemp || temp + tempStep < minTemp) {
            tempStep*=-1;
        }
        temp+=tempStep;

        console.log(`tempStep: ${tempStep}`);
        console.log(`weather/temperature: ${temp}`);
        client.publish('weather/temperature', ''+temp);

        // Generate new humidity
        let humStep = +(getRandomValue(-2, 3)/10).toFixed(2);
        if(hum + humStep > maxHum || hum + humStep < minHum) {
            humStep*=-1;
        }
        hum+=humStep;

        console.log(`humStep: ${humStep}`);
        console.log(`weather/humidity: ${hum}`);
        client.publish('weather/humidity', ''+hum);

    }, 3000);
}

/**
  * Generate random values between min and max
  * @param {*} min min value
  * @param {*} max max value
  * @param {*} generateInt is the generated value integer?
  */
function getRandomValue(min, max, generateInt=false) {
    min = Math.ceil(min);
    max = Math.floor(max);
    if(generateInt) {
        return (Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return (Math.random() * (max - min + 1)) + min;
    
}