const Influx = require('influx');

// create mqtt client
const mqtt = require('mqtt');
 
const client = mqtt.connect('mqtt://mosquitto');
 
// create influx client
const influx = new Influx.InfluxDB({
    host: 'influxdb',
    database: 'weather',
    username: 'admin',
    password: 'admin',
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

  influx.getDatabaseNames()
  .then(names => {
    if (!names.includes('weather')) {
      return influx.createDatabase('weather');
    }
  }).catch(error => console.log({ error }));


  client.on('connect', function () {
    client.subscribe('weather/#', function (err) {
        if(err) {
            console.error(err);
        }
        
      })
  });
  // Connect to the mqtt broker and wait for messages
  console.log(`Start listening to changing data`);
  client.on('message', function (topic, message) {
   
    console.log(`Topic: ${topic}, Message: ${message}`);
    writeDataToInflux(topic.split('/').pop(), JSON.parse(message));
    
    //client.end()
  })


  function writeDataToInflux(measuredTopic, messageObj) {
    influx.writePoints([
        {
          measurement: measuredTopic,
          fields: { value: messageObj.value },
          tags: [],
          timestamp: messageObj.timestamp,
        }
      ], {
        database: 'weather',
        precision: 's',
      })
      .catch(error => {
        console.error(`Error saving data to InfluxDB! ${err.stack}`)
      });
  }