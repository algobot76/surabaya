package com.github.algobot76.surabaya;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.github.algobot76.surabaya.util.Project;

@SpringBootApplication
public class SurabayaApplication {

	public static void main(String[] args) {
		SpringApplication.run(SurabayaApplication.class, args);
		SurabayaAnalyzer analyzer = new SurabayaAnalyzer();
		Project parsedProject = analyzer.analyze("src/test/testProject/src");
	}

}
