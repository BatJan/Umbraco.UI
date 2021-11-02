const { execSync } = require('child_process');
const { kebabCase } = require('lodash');

module.exports = function (plop) {
  // name of custom element tag
  plop.setPartial('tagnamePartial', 'uui-{{name}}');
  // name of LitElement class
  plop.setHelper('className', function (name) {
    const camel = name.replace(/-([a-z])/g, g => {
      return g[1].toUpperCase();
    });
    camel[0] = camel[0].toUpperCase();
    const capitalized = camel.charAt(0).toUpperCase() + camel.substring(1);
    return `UUI${capitalized}Element`;
  });
  // uui-base version
  plop.setHelper('uuiBaseVersion', function () {
    const basePackageJson = require('./packages/uui-base/package.json');
    return basePackageJson.version;
  });
  // name used as title in storybook and documentation
  plop.setHelper('displayName', function (name) {
    const camel = name.replace(/-([a-z])/g, g => {
      return ` ${g[1].toUpperCase()}`;
    });
    camel[0] = camel[0].toUpperCase();
    const capitalized = camel.charAt(0).toUpperCase() + camel.substring(1);
    return capitalized;
  });
  plop.setGenerator('component', {
    description: 'application controller logic',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'UUI element name (i.e. color-area)',
        validate: answer => {
          if (answer.length < 1) {
            return "There is no way we're moving forward without a name for your component.";
          } else return true;
        },
        // Convert the input into kebab case if not provided as such and strip swc- prefixing if present
        filter: response => kebabCase(response.replace(/^uui-/, '')),
      },
      //   {
      //     type: 'input',
      //     name: 'stuff',
      //     message: 'The name for your package (i.e. colorarea)',
      //     // Remove the package prefix if provided and strip out any dashes or spaces in the result
      //     filter: response => {
      //       return response.replace(/^\@umbraco-ui\//, '').replace(/[-|\s]/g, '');
      //     },
      //   },
    ],
    actions: [
      {
        type: 'add',
        path: './packages/{{> tagnamePartial }}/lib/index.ts',
        templateFile: './templates/plop-templates/index.ts.hbs',
      },
      {
        type: 'add',
        path: './packages/{{> tagnamePartial }}/lib/{{> tagnamePartial }}.element.ts',
        templateFile: './templates/plop-templates/component.ts.hbs',
      },
      {
        type: 'add',
        path: './packages/{{> tagnamePartial }}/lib/{{> tagnamePartial }}.test.ts',
        templateFile: './templates/plop-templates/test.ts.hbs',
      },
      {
        type: 'add',
        path: './packages/{{> tagnamePartial }}/lib/{{> tagnamePartial }}.story.ts',
        templateFile: './templates/plop-templates/stories.ts.hbs',
      },
      {
        type: 'add',
        path: './packages/{{> tagnamePartial }}/README.md',
        templateFile: './templates/plop-templates/README.md.hbs',
      },
      //   {
      //     type: 'add',
      //     path: './packages/{{> tagnamePartial }}/tsconfig.json',
      //     templateFile: './templates/plop-templates/tsconfig.json.hbs',
      //   },
      {
        type: 'add',
        path: './packages/{{> tagnamePartial }}/rollup.config.js',
        templateFile: './templates/plop-templates/rollup.config.hbs',
      },
      {
        type: 'add',
        path: './packages/{{> tagnamePartial }}/package.json',
        templateFile: './templates/plop-templates/package.json.hbs',
      },
    ],
  });
};
