package com.github.algobot76.surabaya;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.github.algobot76.surabaya.service.storage.StorageProperties;
import com.github.algobot76.surabaya.service.storage.StorageService;
import com.github.algobot76.surabaya.util.Analyzer;
import com.github.algobot76.surabaya.util.Project;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableConfigurationProperties(StorageProperties.class)
public class SurabayaApplication {

	public static void main(String[] args) {
		SpringApplication.run(SurabayaApplication.class, args);
		Analyzer analyzer = new Analyzer();
		// Temporary test call. TODO: Hookup the frontend to call analyze
		Project parsedProject = analyzer.analyze("src/main/resources/test.zip");
		ObjectMapper mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);
		try {
			System.out.println(mapper.writeValueAsString(parsedProject));
		}
		catch (JsonProcessingException e) {
			System.out.println(e.getMessage());
		}
	}

	@Bean
	CommandLineRunner init(StorageService storageService) {
		return (args -> {
			storageService.deleteAll();
			storageService.init();
		});
	}

}
