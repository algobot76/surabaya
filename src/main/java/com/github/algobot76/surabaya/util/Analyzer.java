package com.github.algobot76.surabaya.util;

import com.github.algobot76.surabaya.SurabayaApplication;
import com.github.javaparser.ast.CompilationUnit;
import com.github.javaparser.ast.visitor.VoidVisitor;
import com.github.javaparser.utils.CodeGenerationUtils;
import com.github.javaparser.utils.SourceRoot;

public class Analyzer {

	private Project project;

	private VoidVisitor<Project> staticAnalysisVisitor;

	public Analyzer() {
		project = new Project();
		staticAnalysisVisitor = new StaticAnalysisVisitor();
	}

	public Project analyze(String filepath) {
		SourceRoot sourceRoot = new SourceRoot(CodeGenerationUtils.mavenModuleRoot(SurabayaApplication.class)
				.resolve("src/main/resources/testJavaProject/src"));
		CompilationUnit cu = sourceRoot.parse("ui", "Main.java"); // TODO: Implement
																	// multifile parsing
		staticAnalysisVisitor.visit(cu, project);
		System.out.println(project.toString());
		return project;
	}

}
