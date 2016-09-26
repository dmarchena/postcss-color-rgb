import postcss from 'postcss';
import test    from 'ava';

import addSiblingRule from '../lib/add-sibling-rule';

const rule = postcss.parse('rule { display: block; }').nodes[0];
const sibling = postcss.parse('sibling { display: block; }');

test('Adds a sibling rule', t => {
    const resultantCss = addSiblingRule(sibling)
        .toRule(rule)
        .root()
        .toResult().css;
    const expectedCss = 'rule { display: block; }\nsibling { display: block; }';
    t.deepEqual(resultantCss, expectedCss);
});

test('Throws an error if rule passed is not a rule', t => {
    const decl = postcss.decl({ prop: 'display', value: 'block' });
    try {
        addSiblingRule(sibling).toRule(decl);
    } catch (err) {
        t.pass();
        return;
    }
    t.fail();
});
