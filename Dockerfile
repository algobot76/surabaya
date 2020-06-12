FROM openjdk:12-alpine
MAINTAINER algobot76 
USER root   

#Adding necessary packages
RUN apk update -v && apk -v upgrade && apk -v --no-cache add maven gradle curl tar bash procps sudo 

#Copying code to directory 
ADD . /usr/src/myapp/
WORKDIR /usr/src/myapp/

RUN cp scripts/pre-commit .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit
RUN ./mvnw clean install

#Clearing cache
RUN rm -rf /var/cache/apk/*

#Run application
ENTRYPOINT ["./mvnw","spring-boot:run"] 