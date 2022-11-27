const SHA= require('crypto-js/sha256')
class block{
    constructor(index,timestamp,data,previousHash='')
    {
        this.index=index;
        this.timestamp=timestamp;
        this.previousHash=previousHash.hash;
        this.data=data;
        this.hash=this.calculateHash();
    }
    calculateHash()
    {
        return SHA(this.index+this.timestamp+this.previousHash+JSON.stringify(this.data)).toString();
    }
};
class blockchain{
    constructor()
    {
        this.chain=[this.createGenesisBlock()];
    }
    createGenesisBlock()
    {
        return new block(0,"1/01/2022","genesisBlock","0");
    }
    getLatestBlock()
    {
        return this.chain[this.chain.length-1];
    }
    addBlock(newBlock)
    {  
        newBlock.previousHash=this.getLatestBlock().hash;
        newBlock.hash=newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    isChainValid()
    {
        for(let i=1;i<this.chain.length;i++)
        {
            const previousHash=this.chain[i-1];
            const currentHash=this.chain[i];    
            if(currentHash.calculateHash()!==currentHash.hash)
            {
                return false;
            }
            if(previousHash.calculateHash()!=currentHash.previousHash)
                return false;
        }
        return true;
    }
};
var dhruvCoin= new blockchain();

dhruvCoin.addBlock(new block(1,"1/1/2022",{amount:2}))
dhruvCoin.addBlock(new block(2,"2/1/2022",{amount:4}))
dhruvCoin.addBlock(new block(3,"4/1/2022",{amount:27}))
console.log(JSON.stringify(dhruvCoin,null,4));
console.log(dhruvCoin.isChainValid());
dhruvCoin.chain[2].data={amount:999}
console.log(dhruvCoin.isChainValid());
dhruvCoin.chain[2].data={amount:4}
console.log(dhruvCoin.isChainValid());