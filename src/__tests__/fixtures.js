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
}

test('Transforms rgb() with RGB range 0-255 input', t => {
    return testFixture(t, 'rgb-0-255');
});

test('Transforms rgb() with percentage input', t => {
    return testFixture(t, 'rgb-percentage');
});

test('Transforms rgb() with number input instead of integer', t => {
    return testFixture(t, 'rgb-number-to-integer');
});

test('Transforms rgb() using new comma-separated syntax', t => {
    return testFixture(t, 'alternative-syntax');
});

test('Actual rgb() is not affected', t => {
    return testFixture(t, 'actual-syntax');
});

test('Wrong rgb() does not stop the plugin', t => {
    return testFixture(t, 'wrong-written');
});
