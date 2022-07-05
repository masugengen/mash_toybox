const fs = require('fs-extra');
const chokidar = require("chokidar");
const watcher = chokidar.watch('./static/',{
  ignored:/[\/\\]\./,
  persistent:true
});

watcher.on('ready', () => {
  watcher.on('all', (event, path) => {
    const copyPath = path.replace('static', 'public');

    if (event === 'change' || event === 'add') {
      fs.copySync(path, copyPath);
    } else if (event === 'unlink') {
      fs.unlinkSync(copyPath);
    }
  });
});
