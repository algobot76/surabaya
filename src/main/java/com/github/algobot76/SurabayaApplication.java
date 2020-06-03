package com.github.algobot76;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.github.javaparser.ast.CompilationUnit;
import com.github.javaparser.utils.SourceRoot;
import com.github.javaparser.utils.CodeGenerationUtils;

@SpringBootApplication
public class SurabayaApplication {

	public static void main(String[] args) {
		SpringApplication.run(SurabayaApplication.class, args);
		testJavaParser();
	}

	/*
	 * Temporary function to ensure that javaParser works
	 */
	private static void testJavaParser() {
		// SourceRoot is a tool that read and writes Java files from packages on a certain
		// root directory.
		// In this case the root directory is found by taking the root from the current
		// Maven module,
		// with src/main/resources appended.
		// Just to ensure that JavaParser works, temporary until we get file upload
		// working
		SourceRoot sourceRoot = new SourceRoot(
				CodeGenerationUtils.mavenModuleRoot(SurabayaApplication.class).resolve("src/main/resources"));

		// Our sample is in the root of this directory, so no package name.
		CompilationUnit cu = sourceRoot.parse("", "Tokenizer.java");
		System.out.printf("Test: %s", cu.getChildNodes().get(0).toString());
	}

}
