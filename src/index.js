var GraphQLLanguage = require('graphql/language')
var generate = require('./generate')

var generator = module.exports = {}

generator.define = function (schema, resolves, deps) {
    var ast = GraphQLLanguage.parse(schema, {noLocation: true})
    return generate(ast, resolves, deps)
}

// utility to mix multiple type definition into deps
var DEFINITION_TYPES = [
    'objectTypes',
    'interfaceTypes',
    'inputTypes',
    'unionTypes',
    'scalarTypes',
    'enumTypes',
]
generator.deps = function () {
    var mixed = {}
    DEFINITION_TYPES.forEach(function (typeName) {
        mixed[typeName] = {}
    })

    Array.prototype.forEach.call(arguments, function (arg) {
        DEFINITION_TYPES.forEach(function (typeName) {
            for (var key in arg[typeName]) {
                if (Object.hasOwnProperty.call(arg[typeName], key)) {
                    mixed[typeName][key] = arg[typeName][key]
                }
            }
        })
    })

    return mixed
}
