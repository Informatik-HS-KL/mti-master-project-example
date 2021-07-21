const Influx = require('influx');

// create mqtt client
const mqtt = require('mqtt');
 
const client = mqtt.connect('mqtt://mosquitto');
 
// create influx client and define database schema
const influx = new Influx.InfluxDB({
    host: 'influxdb',
    database: 'weather',
    schema: [
      {
        measurement: 'temperature',
        fields: { value: Influx.FieldType.FLOAT },
        tags: []
      },
      {
        measurement: 'humidity',
        fields: { value: Influx.FieldType.FLOAT },
        tags: []
      }
    ]
  });
  
  // finally create database if not already existing
  influx.getDatabaseNames()
  .then(names => {
    if (!names.includes('weather')) {
      return influx.createDatabase('weather');
    }
  }).catch(error => console.log({ error }));

  // connect to mqtt and subscribe to any topic in the weather namespace
  client.on('connect', function () {
    client.subscribe('weather/#', function (err) {
        if(err) {
            console.error(err);
        }
        
      })
  });

  // Connect to the mqtt broker and wait for messages ...
  console.log(`Start listening to changing data in MQTT`);
  client.on('message', function (topic, message) {
   
    console.log(`Topic: ${topic}, Message: ${message}`);
    // ... to write them into the database
    writeDataToInflux(topic.split('/').pop(), JSON.parse(message));
    
  })

  /**
   * Writes the value to the database
   * 
   * @param {*} measuredTopic the influx db "table" to write to
   * @param {*} messageObj The message object from mqtt contains the value and a timestamp
   */
  function writeDataToInflux(measuredTopic, messageObj) {
    influx.writePoints([
        {
          measurement: measuredTopic,
          fields: { value: messageObj.value },
          tags: [],
          timestamp: messageObj.timestamp
        }
      ], {
        database: 'weather',
        precision: 's'
      })
      .catch(err => {
        console.error(`Error saving data to InfluxDB! ${err.stack}`)
      });
  }