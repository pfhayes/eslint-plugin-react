/**
 * @fileoverview Tests for no-unescaped-entities
 * @author Patrick Hayes
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/no-unescaped-entities');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('no-unescaped-entities', rule, {

  valid: [
    {
      code: [
        'class Comp1 extends Component {',
        '  render() {',
        '    return (',
        '      <div/>',
        '    );',
        '  }',
        '}'
      ].join('\n'),
      args: [1],
      parser: 'babel-eslint'
    }, {
      code: [
        'class Comp1 extends Component {',
        '  render() {',
        '    return <div>Here is some text!</div>;',
        '  }',
        '}'
      ].join('\n'),
      args: [1],
      parser: 'babel-eslint'
    }, {
      code: [
        'class Comp1 extends Component {',
        '  render() {',
        '    return <div>I&rsquo;ve escaped some entities: &gt; &lt; &amp;</div>;',
        '  }',
        '}'
      ].join('\n'),
      args: [1],
      parser: 'babel-eslint'
    }, {
      code: [
        'class Comp1 extends Component {',
        '  render() {',
        '    return <div>first line is ok',
        '    so is second',
        '    and here are some escaped entities: &gt; &lt; &amp;</div>;',
        '  }',
        '}'
      ].join('\n'),
      args: [1],
      parser: 'babel-eslint'
    }, {
      code: [
        'var Hello = React.createClass({',
        '  render() {',
        '    return <div>{">" + "<" + "&" + \'"\'}</div>;',
        '  },',
        '});'
      ].join('\n'),
      args: [1],
      parser: 'babel-eslint'
    }
  ],

  invalid: [
    {
      code: [
        'class Comp1 extends Component {',
        '  render() {',
        '    return <div>></div>;',
        '  }',
        '}'
      ].join('\n'),
      args: [1],
      parser: 'babel-eslint',
      errors: [{message: 'HTML entities must be escaped.'}]
    }, {
      code: [
        'class Comp1 extends Component {',
        '  render() {',
        '    return <div>first line is ok',
        '    so is second',
        '    and here are some bad entities: ></div>',
        '  }',
        '}'
      ].join('\n'),
      args: [1],
      parser: 'babel-eslint',
      errors: [{message: 'HTML entities must be escaped.'}]
    }, {
      code: [
        'class Comp1 extends Component {',
        '  render() {',
        '    return <div>\'</div>;',
        '  }',
        '}'
      ].join('\n'),
      args: [1],
      parser: 'babel-eslint',
      errors: [{message: 'HTML entities must be escaped.'}]
    }, {
      code: [
        'class Comp1 extends Component {',
        '  render() {',
        '    return <div>Multiple errors: \'>></div>;',
        '  }',
        '}'
      ].join('\n'),
      args: [1],
      parser: 'babel-eslint',
      errors: [
        {message: 'HTML entities must be escaped.'},
        {message: 'HTML entities must be escaped.'},
        {message: 'HTML entities must be escaped.'}
      ]
    }, {
      code: [
        'class Comp1 extends Component {',
        '  render() {',
        '    return <div>{"Unbalanced braces"}}</div>;',
        '  }',
        '}'
      ].join('\n'),
      args: [1],
      parser: 'babel-eslint',
      errors: [{message: 'HTML entities must be escaped.'}]
    }
  ]
});
