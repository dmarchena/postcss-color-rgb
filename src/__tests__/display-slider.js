import test    from 'ava';
import * as postcssTest from './postcss-test';

test('Recognizes display slider and inserts children\' basic style', t => {
    return postcssTest.regex(t,
        '.slider { display: slider; slider-size: 5; }',
        /\.slider \{ display: block;[^\}]*\}\n\.slider > \* {[^\}]*}/);
});


test('A warn ocurred if there is no slider-size', t => {
    return postcssTest.warn(t,
        '.slider { display: slider; }');
});
