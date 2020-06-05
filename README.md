# Surabaya

## Project Setup

Follow these steps to set up the project:

1. `git clone git@github.com:algobot76/surabaya.git`
1. `cd surabaya`
1. `cp scripts/pre-commit .git/hooks/pre-commit`
1. `chmod +x .git/hooks/pre-commit`
1. `./mvnw clean install`

To start the program: `./mvnw spring-boot:run`

If you are using IntellJ IDEA, please install this plugin that provides formatter support: https://github.com/spring-io/spring-javaformat#intellij-idea

## Java Project Custom Data Structure
Use `JavaParser` and convert the outputted AST into the custom `JavaProject` class described below.

### JavaProject Class
Fields:
- `packages`: a list of `JavaPackage` which contains the package name and a list of `JavaClass`    

Example json representation:   
```
{
  "packages": [
    {
      "package_name": "p1",
      "classes": [
        {
          "name": "c1",
          "type": "Interface",
          "accessModifier": "private",
          "lineCount": 100,
          "imports": ["ex2", "ex3"],
          "fields": {
            "String": [{
              "name": "field1",
              "type": "String",
              "accessModifier": "public"
            }],
            "boolean": [...]
          },
          "methods": [{
            "name": "method1",
            "accessModifier": "private",
            "parameters": {"param1": "String", "param2": "int"},
            "returnType": "void"
          }],
          "constructors: [{
            "name": "ex1",
            "accessModifier": "public",
            "parameters": {"param1": "String", "param2": "int"},
            "returnType": null
          }]
    },
    {...},
    {...}
  ]
}
```

### JavaClass Class
Fields:
- `name`: String
- `type`: Enum (Interface, Abstract, Concrete, etc.)
- `accessModifier`: Enum (private, public, protected)
- `lineCount`: int (number of lines)
- `imports`: list of String
- `fields`: Map of type to list of JavaField Class (Easier to work with when rendering groups of fields according to type)
- `methods`: list of JavaMethod Class
- `constructors`: list of JavaMethod Class

### JavaField Class
Fields:
- `name`: String
- `type`: String
- `accessModifier`: Enum (private, public, protected)

### JavaMethod Class
Fields:
- `name`: String
- `accessModifier`: Enum (private, public, protected)
- `parameters`: map of: name to type (Not sure what we need here...)
- `returnType`: String
- `~~fields~~` (Add local fields as stretch goal)
