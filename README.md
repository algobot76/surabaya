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
Use JavaParser and convert the outputted AST into the custom JavaProject class described below.

### JavaProject Class
Contains a mapping of package name to class names   
Contains a mapping of class names to JavaClass classes  

This structure enables the easy workflow of creating the base location of each island by iterating
throught the package name to class map before going through each island and filling in the details

### JavaClass Class
Fields:
- type: Enum (Interface, Abstract, Concrete, etc.)
- accessModifier: Enum (private, public, protected)
- lineCount: int (number of lines)
- imports: list of String
- fields: list of JavaField Class
- methods: list of JavaMethod Class
- constructors: list of JavaMethod Class

### JavaField Class
Fields:
- type: String
- accessModifier: Enum (private, public, protected)

### JavaMethod Class
Fields:
- accessModifier: Enum (private, public, protected)
- parameters: map of: type to name (Not sure what we need here...)
- returnType: String
- ~~fields~~ (Add local fields as stretch goal)
