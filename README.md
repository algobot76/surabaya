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
packages: a mapping of package name to list of class names   
classes: a mapping of class names to `JavaClass`  

Has a `toJson()` method that returns a json formatted representation for the frontend to work with. 

This structure enables the easy workflow of creating the base location of each island by iterating
throught the package name to class map before going through each island and filling in the details

json representation will look like this:   
```
{
  "packages": {"package1": ["ex1", "ex2"],
               "package2": ["ex3"]},
  "classes": {"ex1": {
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
                  "returnType": "void"
                }]
              },
              "ex2": {...},
              "ex3": {...}}

}
```

### JavaClass Class
Fields:
- name: String
- type: Enum (Interface, Abstract, Concrete, etc.)
- accessModifier: Enum (private, public, protected)
- lineCount: int (number of lines)
- imports: list of String
- fields: Map of type to list of JavaField Class (Easier to work with when rendering groups of fields according to type)
- methods: list of JavaMethod Class
- constructors: list of JavaMethod Class

Methods:
- toJson()
  

### JavaField Class
Fields:
- name: String
- type: String
- accessModifier: Enum (private, public, protected)

Methods:
- toJson()

### JavaMethod Class
Fields:
- name: String
- accessModifier: Enum (private, public, protected)
- parameters: map of: name to type (Not sure what we need here...)
- returnType: String
- ~~fields~~ (Add local fields as stretch goal)

Methods:
- toJson()
