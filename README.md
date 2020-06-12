# Surabaya

## Project Setup

Follow these steps to set up the project:

1. `git clone git@github.com:algobot76/surabaya.git`
1. `cd surabaya`
1. `cp scripts/pre-commit .git/hooks/pre-commit`
1. `chmod +x .git/hooks/pre-commit`
1. `./mvnw clean install`

To start the program: `./mvnw spring-boot:run`

If you are using IntelliJ IDEA, please install this plugin that provides formatter support: [spring-io/spring-javaformat](https://github.com/spring-io/spring-javaformat#intellij-idea).

## Representation of Java Project

Use [JavaParser](https://javaparser.org/) and convert the outputted AST into the custom classes described below.

### `Project` Class

- `packages`: map of package name to [Package](#package-class) objects

```typescript
  { [key: string]: Package }
```

### `Package` Class

- `files`: list of [File](#file-class) objects

### `File` Class

- `classes`: list of [Class](#class-class) objects
- `imports`: list of imported package names

### `Class` Class

- `name`: class name
- `type`: `Interface`, `Abstract Class`, `Class`
- `accessModifier`: [AccessModifier](#accessmodifier-enum) enum
- `lineCount`: number of lines
- `fields`: list of [Field](#field-class) objects
- `methods`: list of [Method](#method-class) objects
- `constructors`: list of [Constructor](#constructor-class) objects

### `Field` Class

- `name`: field name
- `type`: field type
- `accessModifier`: [AccessModifier](#accessmodifier-enum) enum

### `Method` Class

- `name`: method name
- `accessModifier`: [AccessModifier](#accessmodifier-enum) enum
- `parameters`: list of [Parameter](#parameter-class) objects
- `returnType`: return type (e.g. `int`)
- `src`: raw source code string

### `Constructor` Class

- `name`: constructor name
- `accessModifier`: [AccessModifier](#accessmodifier-enum) enum
- `parameters`: list of [Parameter](#parameter-class) objects
- `src`: raw source code string

### `Parameter` Class

- `name`: parameter name
- `type`: parameter type

### `AccessModifier` Enum

An `AccessModifier` is `private`, `public`, or `protected`.

### Example

Representation of `JavaProject` in JSON:

```json
{
  "packages": {
    "p1": {
      "files": [
        {
          "classes": [
            {
              "name": "C1",
              "type": "Interface",
              "accessModifier": "private",
              "lineCount": 100,
              "fields": [
                {
                  "name": "foo",
                  "type": "String",
                  "access_modifier": "public"
                },
                {
                  "name": "bar",
                  "type": "int",
                  "access_modifier": "private"
                }
              ],
              "methods": [
                {
                  "name": "getBar",
                  "access_modifier": "public",
                  "parameters": [],
                  "return_type": "int",
                  "src": "public int getBar(){ return this.bar }"
                },
                {
                  "name": "setFoo",
                  "access_modifier": "public",
                  "parameters": [
                    {
                      "name": "foo",
                      "type": "String"
                    }
                  ],
                  "return_type": "void",
                  "src": "public void setFoo(String foo){ this.foo = foo; } "
                }
              ],
              "constructors": [
                {
                  "name": "C1",
                  "access_modifier": "public",
                  "parameters": [
                    {
                      "name": "foo",
                      "type": "String"
                    },
                    {
                      "name": "bar",
                      "type": "int"
                    }
                  ],
                  "src": "public C1(String foo, int bar) { this.foo = foo; this.bar = bar; }"
                }
              ]
            }
          ],
          "imports": ["p2.ex2", "p2.ex3"]
        }
      ]
    }
  }
}
```

## Visualization of Java Project

- [Project](#project-class) = Map of islands
- [Class](#class-class) = Island (size is determined by number of lines of code)
  - `public` = Regular
  - `private` = Wooden fence
  - `protected` = Aluminum fence
- [Field](#field-class)
  - Primitive
    - `boolean` = Tree
    - Numeric (`int`, `double`, etc.) = Pond
  - Non-primitive
    - String = Evergreen
    - Collection
      - A collection of things will be visualized as multiple icons. For example, an array of `int` will be visualized as multiple ponds.
    - Other (e.g. `Object`) = Stone
- [Method](#method-class) = Factory
- [Constructor](#constructor-class) = Volcano
