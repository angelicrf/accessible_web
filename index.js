const exp = require("constants");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const pally = require("pa11y");
const path = require("path")

app.use((express.static('Public')))
/* const callPally =  async  () => {
    const response = await pally("https://traversy.dev")
    console.log(response)
} */
//callPally()
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
})
app.get('/api/result' , async (request, response) => {
    if(!request.query.url){
        response.status(400).json({
            result: 'url does not exist'
        })
    }else{
     const newResult = await pally(request.query.url)
     if(newResult){
     response.status(200).json({
         result: newResult
     })
    }else{
        response.status(400).json({
            result: 'there is an error'
        })
    }
    }
})
const callPort = () => {
console.log(`this web is listening on port ${PORT}`);
}
app.listen(PORT, callPort())