const spawn = require('child_process').spawn;
const java_app = spawn('java', ['-cp','.','microid.MarkerClassification']);

java_app.stdout.on('data', (data) => {
    console.log(data.toString());
});

java_app.stderr.on('data', (data) => {
    console.log(`error: ${data}\n`);
});

java_app.on('close', (code) => {
    if (code != 0) {
        console.log(`error: ${data}\n`);
    }
});
