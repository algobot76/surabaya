package com.github.algobot76.surabaya;

import com.github.algobot76.surabaya.service.storage.StorageProperties;
import com.github.algobot76.surabaya.service.storage.StorageService;
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
	}

	@Bean
	CommandLineRunner init(StorageService storageService) {
		return (args -> {
			storageService.deleteAll();
			storageService.init();
		});
	}

}
