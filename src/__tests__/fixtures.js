import fs       from 'fs';
import postcss  from 'postcss';
import plugin   from '../';
import test     from 'ava';

function fixturePath(name) {
    return `fixtures/${name}.css`;
}

function readFixture(name) {
    return fs.readFileSync(fixturePath(name), 'utf8');
}

function testFixture(t, name, pluginOpts = {}, postcssOpts = {}) {
    postcssOpts.from = fixturePath(name);
    const expected = readFixture(`${name}.expected`);
    return postcss([plugin(pluginOpts)]).process(readFixture(name), postcssOpts)
        .then(result => {
            t.deepEqual(result.css, expected);
            t.deepEqual(result.warnings().length, 0);
        });
    // fs.writeFile(fixturePath(`${name}.actual`), actual);
}

test('Recognizes rgb() with RGB range 0-255 input', t => {
    return testFixture(t, 'rgb-0-255');
});
