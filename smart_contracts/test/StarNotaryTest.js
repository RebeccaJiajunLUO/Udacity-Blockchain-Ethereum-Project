const StarNotary = artifacts.require('StarNotary')

contract('StarNotary', accounts => {

    let user1 = accounts[1]
    let user2 = accounts[2]
    let tokenId = 1
    let starName = "Star power 103!"
    let starStory = "I love my wonderful star"
    let ra = "ra_032.155"
    let dec = "dec_121.874"
    let mag = "mag_245.978"
    let starPrice = web3.toWei(.01, "ether")
    let tx

    beforeEach(async function() { 
        this.contract = await StarNotary.new({from: accounts[0]})
    })

    describe('can create a star', () => { 
        it('can create a star and get its name', async function () { 

            await this.contract.createStar(starName, starStory, ra, dec, mag, tokenId)

            let checker = await this.contract.tokenIdToStarInfo(tokenId)

            // compare the result to that from checker
            assert.equal(checker[0], starName);
            assert.equal(checker[1], starStory);
            assert.equal(checker[2], ra);
            assert.equal(checker[3], dec);
            assert.equal(checker[4], mag);
        })
    })

    describe('buying and selling stars', () => { 

        beforeEach(async function () {
            await this.contract.createStar(starName, starStory, ra, dec, mag, tokenId, {from: user1})
        })

        describe('user1 can sell a star', () => { 
            it('user1 can put up their star for sale', async function () { 
                await this.contract.putStarUpForSale(tokenId, starPrice, {from: user1})
                // look up the price of the star that is put on sale, compare with the set price
                assert.equal(await this.contract.starsForSale(tokenId), starPrice)
            })

            it('user1 gets the funds after selling a star', async function () { 

                await this.contract.putStarUpForSale(tokenId, starPrice, {from: user1})

                let balanceOfUser1BeforeTransaction = web3.eth.getBalance(user1)
                await this.contract.buyStar(tokenId, {from: user2, value: starPrice})
                let balanceOfUser1AfterTransaction = web3.eth.getBalance(user1)

                assert.equal(balanceOfUser1BeforeTransaction.add(starPrice).toNumber(), 
                            balanceOfUser1AfterTransaction.toNumber())
            })
        })

        describe('user2 can buy a star that was put up for sale', () => { 
            beforeEach(async function () { 
                await this.contract.putStarUpForSale(tokenId, starPrice, {from: user1})
            })

            it('user2 is the owner of the star after they buy it', async function () { 
                await this.contract.buyStar(tokenId, {from: user2, value: starPrice})

                assert.equal(await this.contract.ownerOf(tokenId), user2)
            })

            it('user2 correctly has their balance changed', async function () { 
                let overpaidAmount = web3.toWei(.05, 'ether')

                const balanceOfUser2BeforeTransaction = web3.eth.getBalance(user2)
                await this.contract.buyStar(tokenId, {from: user2, value: overpaidAmount, gasPrice:0})
                const balanceAfterUser2BuysStar = web3.eth.getBalance(user2)

                assert.equal(balanceOfUser2BeforeTransaction.sub(balanceAfterUser2BuysStar), starPrice)
            })
        })
    })

    describe('star uniqueness', () => {

        let tokenId2 = 2

        // first we mint our first star
        beforeEach(async function() {
            await this.contract.createStar(starName, starStory, ra, dec, mag, tokenId, {from: user1})
        })

        it('only unique stars can be minted', async function() {
            // then we try to mint the same star, and we expect an error
            await expectThrow(this.contract.createStar(starName, starStory, ra, dec, mag, tokenId, {from: user1}))
        })

        it('only unique starts can be minted even if their ID is different', async function() {
            // then we try to mint the same star, and we expect an error
            await expectThrow(this.contract.createStar(starName, starStory, ra, dec, mag, tokenId2, {from: user1}))
        })

        // it('minting unique stars does not fail', async function() {
        //     for (let i = 0; i < 10; i++) {
        //         let id = i
        //         let newRa = i.toString()
        //         let newDec = i.toString()
        //         let newMag = i.toString()

        //         await this.contract.createStar(starName, starStory, newRa, newDec, newMag, id, {from: user1})

        //         let starInfo = await this.contract.tokenIdToStarInfo(id)
        //         assert.equal(starInfo[0], starName)
        //     }
        // })
    })

    // describe('can grant approval to transfer', () => {

    //     beforeEach(async function () {
    //         await this.contract.mint(tokenId, {from: user1})
    //         tx = await this.contract.approve(user2, tokenId, {from: user1})
    //     })

    //     it('set user2 as an approved address', async function () {
    //         // Add logic
    //     })

    //     it('user2 can now transfer', async function () {
    //         // Add logic
    //     })

    //     it('emits the correct event', async function () {
    //         // Add logic
    //     })
    // })

    // describe('can set an operator', () => {
        
    //     beforeEach(async function () {
    //         await this.contract.mint(tokenId, {from: user1})

    //         tx = await this.contract.setApprovalForAll(operator, true, {from: user1})
    //     })


    //     it('can set an operator', async function () {
    //         assert.equal(await this.contract.isApprovedForAll(user1, operator), true);
    //     })
    // })

    var expectThrow = async function(promise) {
        try {
            await promise
        } catch (error) {
            assert.exists(error)
            return
        }

        assert.fail('expected an error, but none was found')
    }
})
