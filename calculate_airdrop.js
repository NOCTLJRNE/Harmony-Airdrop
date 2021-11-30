require('dotenv').config()
const fs = require("fs");
const TOKEN_TYPE = process.env.TOKEN_TYPE
var input_filename = '778_airdrop_address_balance.csv'
var calculate = (balance)=>{return (Math.log(balance)/100 - 0.036)}
const lineByLine = require('n-readlines')
const liner = new lineByLine(input_filename)
let line
let i=0
let sum=0
let ouput_fileName = "addresses_test_with_amount_to_drop.csv"
  while ((line = liner.next())) {
    var splits = line.toString('utf8').split(',')
    var name = splits[0].replace(/\r/g, '') || 'N/A'
    var sendAddress = splits[1].replace(/\r/g, '')
	var balance = splits[2].replace(/\r/g, '')
	//var airdrop_amount = splits[3].replace(/\r/g, '')
	var airdrop_amount = calculate(balance).toFixed(3)
	sum += eval(airdrop_amount)
	i++
    //console.log(i + '. Sending '+ TO_SEND + ' ' + decide + ' to ' + name + ' at Address: ', sendAddress)
	console.log(`${i}. Sending ${airdrop_amount} ${TOKEN_TYPE} to ${name} at Address: ${sendAddress} with balance: ${balance}`)

    console.log('---------------------------------------------------------------------------------------------------------')
	let data = `${name},${sendAddress},${balance},${airdrop_amount}\r\n`
	fs.appendFile(ouput_fileName, data, (err) =>{})
  }
  console.log("Total airdrop amount: ", sum.toFixed(3))