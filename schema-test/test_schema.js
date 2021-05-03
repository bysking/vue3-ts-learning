const Ajv = require('ajv');
const localize = require('ajv-i18n');
const ajv = new Ajv();

ajv.addFormat('email', (data) => {
    // console.log(data);
    return false;
});
ajv.addKeyword('testType', {
    validate: function fn(schema, data) {
        console.log(schema, data);
        fn.errors = [
            {
                instancePath: '/bar',
                tschemaPath: '#/properties/bar/testType',
                keyword: 'testType',
                params: {},
                message: 'qqqqqqqqqqqqqqqqqqqq',
            },
        ];
        return false;
    },
    metaSchema: {
        type: 'boolean',
    },
});

const schema = {
    type: 'object',
    properties: {
        foo: { type: 'integer', minLength: 10 },
        bar: { type: 'string', format: 'email', testType: true },
    },
    required: ['foo'],
    additionalProperties: false,
};
const data = { foo: 1, bar: '2222222222' };

const valid = ajv.validate(schema, data);
console.log(ajv.errors);
console.log(localize.zh(ajv.errors));
