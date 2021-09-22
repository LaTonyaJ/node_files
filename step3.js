const fs = require('fs');
const axios = require('axios');
const process = require('process');

function outPut(path, path_out){
    if(path_out){
    fs.writeFile(path_out, path, 'utf8', (err) => {
        if(err){
            console.log(err);
            process.exit(1);
        }
        console.log('Successfully wrote to file');
    })
}    
}

function cat(path, path_out){
    fs.readFile(path, 'utf8', (err, data) => {
        if(err){
            console.log(err);
            process.kill(1);
        }else{
        // console.log(data);
        outPut(data, path_out);
        }
    })
}

async function webCat(url, path_out){
    await axios.get(url)
    .then(res => {
        // console.log(res.data);
        outPut(res.data, path_out);
    })
    .catch(err => console.log(err))
}

let path;
let path_out;

if(process.argv[2] === '--out'){
    path = process.argv[3];
    path_out = process.argv[4]; 
} else {
    path = process.argv[2];
}

if(path.slice(0,4) == 'http'){
    webCat(path, path_out);
}
else{
    cat(path, path_out);
}


