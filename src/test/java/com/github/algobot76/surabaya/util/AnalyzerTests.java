package com.github.algobot76.surabaya.util;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;

public class AnalyzerTests {

	static final String testProjectDir = "src/main/resources/test/";

	Analyzer analyzer;

	@BeforeEach
	public void initialize() {
		analyzer = new Analyzer();
	}

	@Test
	void analyzeSimpleZipFileSuccess() throws JsonProcessingException {
		Resource testFile = new FileSystemResource(testProjectDir.concat("simpleZip.zip"));
		Project resultProject = analyzer.analyze(testFile);

		Project expectedProject = new Project();
		Package expectedPackage = expectedProject.getOrCreatePackage("ast");
		File expectedFile = new File();
		expectedPackage.addFile(expectedFile);
		expectedFile.addImport("Main");
		Class expectedClass = new Class("DEC", "Class", "public", 15);
		expectedFile.addClass(expectedClass);
		expectedClass.addField(new Field("name", "String", "private"));
		expectedClass.addMethod(new Method("parse", "public", "void"));
		expectedClass.addMethod(new Method("evaluate", "public", "Integer"));
		assertEquals(expectedProject, resultProject);

	}

	@Test
	void analyzeInterfaceSuccess() throws JsonProcessingException {
		Resource testFile = new FileSystemResource(testProjectDir.concat("interface.zip"));
		Project resultProject = analyzer.analyze(testFile);

		Project expectedProject = new Project();
		Package expectedPackage = expectedProject.getOrCreatePackage("none");
		File expectedFile = new File();
		expectedPackage.addFile(expectedFile);
		Class expectedClass = new Class("Test", "Interface", "public", 3);
		expectedFile.addClass(expectedClass);
		expectedClass.addMethod(new Method("parse", "public", "void"));
		expectedClass.addMethod(new Method("evaluate", "public", "Integer"));
		assertEquals(expectedProject, resultProject);
	}

	@Test
	void analyzeAbstractClassSuccess() throws JsonProcessingException {
		Resource testFile = new FileSystemResource(testProjectDir.concat("abstractClass.zip"));
		Project resultProject = analyzer.analyze(testFile);

		Project expectedProject = new Project();
		Package expectedPackage = expectedProject.getOrCreatePackage("libs");
		File expectedFile = new File();
		expectedPackage.addFile(expectedFile);
		expectedFile.addImport("PrintWriter");
		Class expectedClass = new Class("Node", "Abstract Class", "public", 5);
		expectedFile.addClass(expectedClass);
		expectedClass.addField(new Field("tokenizer", "Tokenizer", "protected"));
		expectedClass.addMethod(new Method("parse", "public", "void"));
		expectedClass.addMethod(new Method("evaluate", "public", "Integer"));
		assertEquals(expectedProject, resultProject);
	}

	@Test
	void analyzeMultipleClassesSuccess() throws JsonProcessingException {
		Resource testFile = new FileSystemResource(testProjectDir.concat("multipleClasses.zip"));
		Project resultProject = analyzer.analyze(testFile);

		Project expectedProject = new Project();
		Package expectedPackage = expectedProject.getOrCreatePackage("ast");
		File expectedFile = new File();
		expectedPackage.addFile(expectedFile);
		expectedFile.addImport("Main");
		Class expectedClass = new Class("DEC", "Class", "public", 15);
		expectedFile.addClass(expectedClass);
		expectedClass.addField(new Field("name", "String", "private"));
		expectedClass.addMethod(new Method("parse", "public", "void"));
		expectedClass.addMethod(new Method("evaluate", "public", "Integer"));

		Package expectedPackage2 = expectedProject.getOrCreatePackage("libs");
		File expectedFile2 = new File();
		expectedPackage2.addFile(expectedFile2);
		expectedFile2.addImport("PrintWriter");
		Class expectedClass2 = new Class("Node", "Abstract Class", "public", 5);
		expectedFile2.addClass(expectedClass2);
		expectedClass2.addField(new Field("tokenizer", "Tokenizer", "protected"));
		expectedClass2.addMethod(new Method("parse", "public", "void"));
		expectedClass2.addMethod(new Method("evaluate", "public", "Integer"));
		assertEquals(expectedProject, resultProject);
	}

	@Test
	void analyzeNoSrcDirectorySuccess() throws JsonProcessingException {
		Resource testFile = new FileSystemResource(testProjectDir.concat("noSrc.zip"));
		Project resultProject = analyzer.analyze(testFile);

		Project expectedProject = new Project();
		Package expectedPackage = expectedProject.getOrCreatePackage("ast");
		File expectedFile = new File();
		expectedPackage.addFile(expectedFile);
		expectedFile.addImport("Main");
		Class expectedClass = new Class("DEC", "Class", "public", 15);
		expectedFile.addClass(expectedClass);
		expectedClass.addField(new Field("name", "String", "private"));
		expectedClass.addMethod(new Method("parse", "public", "void"));
		expectedClass.addMethod(new Method("evaluate", "public", "Integer"));
		assertEquals(expectedProject, resultProject);
	}

	@Test
	void analyzeWrongFileFormat() throws JsonProcessingException {
		Resource testFile = new FileSystemResource(testProjectDir.concat("test,java"));
		Project results = analyzer.analyze(testFile);
		assertEquals(new Project(), results);
	}

}
