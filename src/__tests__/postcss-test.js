import postcss from 'postcss';
import plugin  from '../';

function run(t, input, assertion, opts = {}) {
    return postcss([ plugin(opts) ]).process(input)
        .then(result => {
            assertion(result);
            t.deepEqual(result.warnings().length, 0);
        });
}

function deepEqual(t, input, output) {
    return run(t, input, result => {
        t.deepEqual(result.css, output);
    });
}

function regex(t, input, regexp) {
    return run(t, input, result => {
        t.regex(result.css, regexp);
    });
}

function warn(t, input, opts = {}) {
    return postcss([ plugin(opts) ]).process(input)
        .then(result => {
            t.deepEqual(result.warnings().length, 1);
        });
}

export { deepEqual, regex, warn };
