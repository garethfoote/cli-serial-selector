'use strict';

const inquirer = require('inquirer')
const serialport = require('serialport')

// Create promise and capture ports in a set.
const getPorts = () => {
  return new Promise((resolve, reject) => {
    // Unnecessary use of Set() for the joy of ES6.
    let ports = new Set();
    // Get list of serialports
    serialport.list((err, portsList) => {
      // Reject promise if necessary.
      if(err){
        reject()
      }
      // An 'array'...boring.
      portsList.forEach(function(port) {
        ports.add(port.comName)
      })
      resolve(ports)
    })
  })
};

const offerChoices = ports => {
  // Inquirer helpfully uses promises.
  return inquirer.prompt([
    {
      type: 'list',
      name: 'port',
      message: 'Please choose your port from the list?',
      choices: [...ports]
    }
  ])
};

module.exports = getPorts().then(offerChoices);
// .catch(err => console.log("error"))
