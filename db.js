var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var Block = new Schema(
{
    "number": {type: Number, index: {unique: true}},
    "hash": String,
    "parentHash": String,
    "nonce": String,
    "sha3Uncles": String,
    "logsBloom": String,
    "transactionsRoot": String,
    "stateRoot": String,
    "receiptRoot": String,
    "miner": {type: String, lowercase: true},
    "difficulty": String,
    "totalDifficulty": String,
    "size": Number,
    "extraData": String,
    "gasLimit": Number,
    "gasUsed": Number,
    "timestamp": Number,
    "blockTime": Number,
    "uncles": [String]
});

var Account = new Schema(
{
    "address": {type: String, index: {unique: true}},
    "balance": Number,
    "blockNumber": Number,
    "type": Number // address: 0x0, contract: 0x1
});

var Contract = new Schema(
{
    "address": {type: String, index: {unique: true}},
    "creationTransaction": String,
    "contractName": String,
    "compilerVersion": String,
    "optimization": Boolean,
    "sourceCode": String,
    "abi": String,
    "byteCode": String
}, {collection: "Contract"});

var Transaction = new Schema(
{
    "hash": {type: String, index: {unique: true}, lowercase: true},
    "nonce": Number,
    "blockHash": String,
    "blockNumber": Number,
    "transactionIndex": Number,
    "from": {type: String, lowercase: true},
    "to": {type: String, lowercase: true},
    "creates": {type: String, lowercase: true},
    "value": String,
    "gas": Number,
    "gasUsed": Number,
    "gasPrice": String,
    "timestamp": Number,
    "input": String,
    "status": Number
}, {collection: "Transaction"});

var BlockStat = new Schema(
{
    "number": {type: Number, index: {unique: true}},
    "timestamp": Number,
    "difficulty": String,
    "hashrate": String,
    "txCount": Number,
    "gasUsed": Number,
    "gasLimit": Number,
    "miner": String,
    "blockTime": Number,
    "uncleCount": Number
});

var Market = new Schema({
    "symbol": String,
    "timestamp": Number,
    "quoteBTC": Number,
    "quoteUSD": Number
})

var ActiveAddressesStat = new Schema({
    "blockNumber": String,
    "count": Number
})

var CLOTransferredStat = new Schema({
    "blockNumber": String,
    "amount": Number
})


// create indexes
Transaction.index({timestamp: -1});
Transaction.index({blockNumber: -1});
Transaction.index({from: 1, blockNumber: -1});
Transaction.index({to: 1, blockNumber: -1});
Transaction.index({creates: 1, blockNumber: -1});
Account.index({balance: -1});
Account.index({balance: -1, blockNumber: -1});
Block.index({miner: -1});
Block.index({hash: -1});
Block.index({number: -1});
Market.index({timestamp: -1})
ActiveAddressesStat.index({blockNumber: -1});
CLOTransferredStat.index({blockNumber: -1});
BlockStat.index({timestamp: 1});
BlockStat.index({number: -1});

mongoose.model('BlockStat', BlockStat);
mongoose.model('Block', Block);
mongoose.model('Account', Account);
mongoose.model('Contract', Contract);
mongoose.model('Transaction', Transaction);
mongoose.model('Market', Market);
mongoose.model('ActiveAddressesStat', ActiveAddressesStat);
mongoose.model('CLOTransferredStat', CLOTransferredStat);

module.exports.BlockStat = mongoose.model('BlockStat');
module.exports.Block = mongoose.model('Block');
module.exports.Contract = mongoose.model('Contract');
module.exports.Transaction = mongoose.model('Transaction');
module.exports.Account = mongoose.model('Account');
module.exports.Market = mongoose.model('Market');
module.exports.ActiveAddressesStat = mongoose.model('ActiveAddressesStat');
module.exports.CLOTransferredStat = mongoose.model('CLOTransferredStat');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/blockDB');

// mongoose.set('debug', true);
