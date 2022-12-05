const SHA = require('crypto-js/sha256')

class Transaction {                                  // added transactions in 3rd commit
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}
class Block {
    constructor(timestamp, transactions, previousHash = '') {
        // this.index=index;  removed while implementing transactions
        // this.data=data;  removed while implementing transactions
        this.timestamp = timestamp;
        this.previousHash = previousHash.hash;
        this.transactions = transactions;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
    calculateHash() {
        return SHA(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data) + this.nonce).toString();
    }
    mineBlock(difficulty) {

        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();

        }
        console.log(this.nonce);
        console.log("block Mined:" + this.hash);
    }
};
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 1;
        this.pendingTransactions = [];
        this.miningReward = 10;
    }
    createGenesisBlock() {
        return new Block("1/01/2022", "genesisBlock", "0");
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // addBlock(newBlock)           removed while implementing transactions
    // {  
    //     newBlock.previousHash=this.getLatestBlock().hash;
    //     // newBlock.hash=newBlock.calculateHash();   easy to temper
    //     newBlock.mineBlock(this.difficulty);
    //     this.chain.push(newBlock);
    // }
    minePendingtransactions(miningRewardAddress) {
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);
        console.log("block Mined");
        this.chain.push(newBlock);
        this.pendingTransactions = [new Transaction(null, miningRewardAddress, this.miningReward)];

    }
    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }
    getBalanceOfAddress(address) {
        let balance = 0;

        for(const block of this.chain)
        {
            for(const trans of block.transactions)
            {
                if(trans.fromAddress === address)
                {
                    balance-=trans.amount;
                }
                if(trans.toAddress === address)
                {
                    balance+=trans.amount;
                }
            }
        }
    }
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const previousHash = this.chain[i - 1];
            const currentHash = this.chain[i];
            if (currentHash.calculateHash() !== currentHash.hash) {
                return false;
            }
            if (previousHash.calculateHash() !== currentHash.previousHash)
                return false;
        }
        return true;
    }
};
var dhruvCoin = new Blockchain();


dhruvCoin.createTransaction(new Transaction("chirag's-Wallet","dhruv's-Wallet",100));
dhruvCoin.createTransaction(new Transaction("dhruv's-Wallet","chirag's-Wallet",50));

console.log("starting");
dhruvCoin.minePendingtransactions("God's-Address");

console.log( dhruvCoin.getBalanceOfAddress("God's-Address") );

// dhruvCoin.addBlock(new Block(1, "1/1/2022", { amount: 2 }))
// dhruvCoin.addBlock(new Block(2, "2/1/2022", { amount: 4 }))
// dhruvCoin.addBlock(new block(3,"4/1/2022",{amount:27}))
//few initial tests

// console.log(JSON.stringify(dhruvCoin,null,4));
// console.log(dhruvCoin.isChainValid());
// dhruvCoin.chain[2].data={amount:999}
// console.log(dhruvCoin.isChainValid());
// dhruvCoin.chain[2].data={amount:4}
// console.log(dhruvCoin.isChainValid());