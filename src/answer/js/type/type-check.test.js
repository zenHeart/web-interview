const {expect} = require ('chai');

describe("test typeof",function () {
   const testData = [
       {
           input:1,
           expect:"number"
       },
       {
           input:NaN,
           expect:"number"
       },
       {
           input:1e1,
           expect:"number"
       }, {
           input:true,
           expect:"boolean"
       }, {
           input:'a',
           expect:"string"
       }, {
           input:null,
           expect:"object"
       }, {
           input:undefined,
           expect:"undefined"
       }, {
           input:Symbol(1),
           expect:"symbol"
       }, {
           input:[1,2,3],
           expect:"object"
       }, {
           input:{},
           expect:"object"
       }, {
           input:()=>{},
           expect:"function"
       },
   ]

    it("test check type function",function() {
        testData.forEach((ele) => {
            expect(typeof ele.input).to.equal(ele.expect);
        })
    });
});