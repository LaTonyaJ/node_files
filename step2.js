const fs = require('fs');
const axios = require('axios');
const process = require('process');

function cat(path){
    fs.readFile(path, 'utf8', (err, data) => {
        if(err){
            console.log(err);
            process.kill(1);
        }
        console.log(data);
    })
}

async function webCat(url){
    await axios.get(url)
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
}

let path = process.argv[2];

if(path.slice(0,4) == 'http'){
    webCat(path);
}
else{
    cat(path);
}

