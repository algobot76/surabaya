package com.github.algobot76.surabaya;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.github.algobot76.surabaya.util.Project;

@SpringBootApplication
public class SurabayaApplication {

	public static void main(String[] args) throws JsonProcessingException {
		SpringApplication.run(SurabayaApplication.class, args);
		SurabayaAnalyzer analyzer = new SurabayaAnalyzer();
		Project parsedProject = analyzer.analyze("src/test/testProject/src");
		ObjectMapper mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);
		System.out.println(mapper.writeValueAsString(parsedProject));
	}

}
