const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');//Web3 is a constructor
//Instance of web3
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');


// class Car{
// 	park(){
// 		return 'stopped';
// 	}

// 	drive(){
// 		return 'vroom';
// 	}
// }
// let car;//Due to scope, and let because we need to change the value of car.

// beforeEach(() => {
// 	car = new Car();
// });

// describe('Car',() => {
// 	it('can park',()=>{
// 		assert.equal(car.park(),'stopped');//Equal then test will pass
// 	});

// 	it('can drive',()=>{
// 		assert.equal(car.drive(),'vroom');//Comparing the expected and the actaul output.
// 	});
// });

let accounts;
let inbox;

beforeEach(async() => {
	//Get a list of all accounts which is inside the ganache network
	accounts = await web3.eth.getAccounts();//eth module of web3 library//returns a promise
	// .then(fetchedAccounts=>{//returns a promise
	// 	console.log(fetchedAccounts);
	

	//Use one of those accounts to deploy
	// the contract
	
	inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data : bytecode, arguments: ['Hi there!'] })//Hi there is the initial message given
    .send({ from: accounts[0], gas: '1000000' });
	});

describe('Inbox', () => {
	it('deploys a contract', ()=>{
		// console.log(inbox);
		//we are logging all the accounts from ganache
		assert.ok(inbox.options.address);
	});
	//To test if our smart contract has some initial message
	it('has a default message', async() =>{
		const message = await inbox.methods.message().call();
		assert.equal(message, 'Hi there!');//Because we set hi there initially
	});
	// We are basically updating the message and checking
	it('can change the message', async() =>{
		await inbox.methods.setMessage('bye').send({ from: accounts[0]})
		// If everything is okay then there is no error and transaction is sucessfull
		const message = await inbox.methods.message().call();
		assert.equal(message,'bye');

	});
});