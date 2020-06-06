package com.github.algobot76.surabaya;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.github.algobot76.surabaya.util.Project;
import com.github.algobot76.surabaya.util.Analyzer;

@SpringBootApplication
public class SurabayaApplication {

	public static void main(String[] args) {
		SpringApplication.run(SurabayaApplication.class, args);
		Analyzer analyzer = new Analyzer();
		Project parsedProject = analyzer.analyze("src/test/testProject/src");
		ObjectMapper mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);
		try {
			System.out.println(mapper.writeValueAsString(parsedProject));
		}
		catch (JsonProcessingException e) {
			System.out.println(e.getMessage());
		}
	}

}
