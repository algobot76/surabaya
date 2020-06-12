package com.github.algobot76.surabaya.util;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class AnalyzerTests {

	static final String testProjectDir = "src/test/resources/SampleJavaProjects/";

	Analyzer analyzer;

	@BeforeEach
	public void initialize() {
		analyzer = new Analyzer();
	}

	@Test
	void includesMethodSourceCode() {
		Resource testFile = new FileSystemResource(testProjectDir.concat("simpleZip.zip"));
		Project resultProject = analyzer.analyze(testFile);
		Class parsedClass = resultProject.getPackages().get("ast").getFiles().get(0).getClasses().get(0);
		Method parsedParseMethod = parsedClass.getMethods().get(0);
		Method parsedEvaluateMethod = parsedClass.getMethods().get(1);
		String expectedParseSrc = "@Override\r\n" + "    public void parse() {\r\n"
				+ "        tokenizer.getAndCheckNext(\"new\");\r\n" + "        name = tokenizer.getNext();    }\r\n";
		String expectedEvaluateSrc = "@Override\r\n" + "    public Integer evaluate() {\r\n"
				+ "        System.out.println(\"Putting \" + this.name + \" into symbol table\");\r\n"
				+ "        Main.symbolTable.put(name,null); // no value yet; use null as a placeholder\r\n"
				+ "        return null;    }\r\n";
		assertEquals(expectedParseSrc, parsedParseMethod.getSrc());
		assertEquals(expectedEvaluateSrc, parsedEvaluateMethod.getSrc());
	}

	@Test
	void analyzeSimpleZipFileSuccess() {
		Resource testFile = new FileSystemResource(testProjectDir.concat("simpleZip.zip"));
		System.out.println(testFile);
		Project resultProject = analyzer.analyze(testFile);

		Project expectedProject = new Project();
		Package expectedPackage = expectedProject.getOrCreatePackage("ast");
		File expectedFile = new File();
		expectedPackage.addFile(expectedFile);
		expectedFile.addImport("ui.Main");
		Class expectedClass = new Class("DEC", "Class", "public", 15);
		expectedFile.addClass(expectedClass);
		expectedClass.addField(new Field("name", "String", "private"));
		expectedClass.addMethod(new Method("parse", "public", "void", ""));
		expectedClass.addMethod(new Method("evaluate", "public", "Integer", ""));
		assertEquals(expectedProject, resultProject);

	}

	@Test
	void analyzeInterfaceSuccess() {
		Resource testFile = new FileSystemResource(testProjectDir.concat("interface.zip"));
		Project resultProject = analyzer.analyze(testFile);

		Project expectedProject = new Project();
		Package expectedPackage = expectedProject.getOrCreatePackage("none");
		File expectedFile = new File();
		expectedPackage.addFile(expectedFile);
		Class expectedClass = new Class("Test", "Interface", "public", 3);
		expectedFile.addClass(expectedClass);
		expectedClass.addMethod(new Method("parse", "public", "void", ""));
		expectedClass.addMethod(new Method("evaluate", "public", "Integer", ""));
		assertEquals(expectedProject, resultProject);
	}

	@Test
	void analyzeAbstractClassSuccess() {
		Resource testFile = new FileSystemResource(testProjectDir.concat("abstractClass.zip"));
		Project resultProject = analyzer.analyze(testFile);

		Project expectedProject = new Project();
		Package expectedPackage = expectedProject.getOrCreatePackage("libs");
		File expectedFile = new File();
		expectedPackage.addFile(expectedFile);
		expectedFile.addImport("java.io.PrintWriter");
		Class expectedClass = new Class("Node", "Abstract Class", "public", 5);
		expectedFile.addClass(expectedClass);
		expectedClass.addField(new Field("tokenizer", "Tokenizer", "protected"));
		expectedClass.addMethod(new Method("parse", "public", "void", ""));
		expectedClass.addMethod(new Method("evaluate", "public", "Integer", ""));
		assertEquals(expectedProject, resultProject);
	}

	@Test
	void analyzeMultipleClassesSuccess() {
		Resource testFile = new FileSystemResource(testProjectDir.concat("multipleClasses.zip"));
		Project resultProject = analyzer.analyze(testFile);

		Project expectedProject = new Project();
		Package expectedPackage = expectedProject.getOrCreatePackage("ast");
		File expectedFile = new File();
		expectedPackage.addFile(expectedFile);
		expectedFile.addImport("ui.Main");
		Class expectedClass = new Class("DEC", "Class", "public", 15);
		expectedFile.addClass(expectedClass);
		expectedClass.addField(new Field("name", "String", "private"));
		expectedClass.addMethod(new Method("parse", "public", "void", ""));
		expectedClass.addMethod(new Method("evaluate", "public", "Integer", ""));

		Package expectedPackage2 = expectedProject.getOrCreatePackage("libs");
		File expectedFile2 = new File();
		expectedPackage2.addFile(expectedFile2);
		expectedFile2.addImport("java.io.PrintWriter");
		Class expectedClass2 = new Class("Node", "Abstract Class", "public", 5);
		expectedFile2.addClass(expectedClass2);
		expectedClass2.addField(new Field("tokenizer", "Tokenizer", "protected"));
		expectedClass2.addMethod(new Method("parse", "public", "void", ""));
		expectedClass2.addMethod(new Method("evaluate", "public", "Integer", ""));
		assertEquals(expectedProject, resultProject);
	}

	@Test
	void analyzeNoSrcDirectorySuccess() {
		Resource testFile = new FileSystemResource(testProjectDir.concat("noSrc.zip"));
		Project resultProject = analyzer.analyze(testFile);

		Project expectedProject = new Project();
		Package expectedPackage = expectedProject.getOrCreatePackage("ast");
		File expectedFile = new File();
		expectedPackage.addFile(expectedFile);
		expectedFile.addImport("ui.Main");
		Class expectedClass = new Class("DEC", "Class", "public", 15);
		expectedFile.addClass(expectedClass);
		expectedClass.addField(new Field("name", "String", "private"));
		expectedClass.addMethod(new Method("parse", "public", "void", ""));
		expectedClass.addMethod(new Method("evaluate", "public", "Integer", ""));
		assertEquals(expectedProject, resultProject);
	}

	@Test
	void analyzeWrongFileFormat() {
		Resource testFile = new FileSystemResource(testProjectDir.concat("test,java"));
		Project results = analyzer.analyze(testFile);
		assertEquals(new Project(), results);
	}

}
