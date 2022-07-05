/* eslint-disable no-console */
const gitBranch = require('git-branch');
const {exec} = require('child_process');
const {src, dest} = require('gulp');
const lineEndingCorrector = require('gulp-line-ending-corrector');

(async () => {
    const branch = await gitBranch('./');

    if (branch !== 'main') {
        throw new TypeError('mainブランチに移動してください');
    }

    console.log('改行コードをCRLFに調整');

    await new Promise((resolve) => {
        const encodeEOL = () => src([
            './public/**/*.html',
            './public/**/*.htm',
            './public/**/*.css',
            './public/**/*.js',
            './public/**/*.json',
            './public/**/*.svg',
            './public/**/*.xml',
            './public/**/*.htc',
            './public/**/*.php',
            './public/**/*.txt'
        ]).
            pipe(lineEndingCorrector({
                // verbose: true,
                eolc: 'CRLF'
            })).
            pipe(dest('./public')).
            on('end', resolve);

        encodeEOL();
    });

    console.log('改行コード調整完了');

    exec('git log -n 1 --format=%h', (error, stdout, stderr) => {
        if (stderr) {
            throw new Error(`stderr: ${stderr}`);
        }
        if (error !== null) {
            throw new Error(`Exec error: ${error}`);
        }

        const cmd = `gh-pages --dotfiles=true -d public -b production -m ":rocket: 納品コミット from commit ${stdout}"`;

        console.log(cmd);

        exec(cmd, (_error, _stdout, _stderr) => {
            if (_stdout) {
                console.log(`stdout: ${_stdout}`);
            }
            if (_stderr) {
                console.error(`stderr: ${_stderr}`);
            }
            if (_error !== null) {
                console.log(`Exec error: ${_error}`);
            }
        });
    });
})();
