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
