package com.github.algobot76.surabaya;

import com.github.algobot76.surabaya.util.Project;
import com.github.algobot76.surabaya.util.StaticAnalysisVisitor;
import com.github.javaparser.ast.CompilationUnit;
import com.github.javaparser.ast.visitor.VoidVisitor;
import com.github.javaparser.utils.CodeGenerationUtils;
import com.github.javaparser.utils.SourceRoot;

public class SurabayaAnalyzer {

	private Project project;

	private VoidVisitor<Project> staticAnalysisVisitor;

	public SurabayaAnalyzer() {
		project = new Project();
		staticAnalysisVisitor = new StaticAnalysisVisitor();
	}

	public Project analyze(String filepath) {
		SourceRoot sourceRoot = new SourceRoot(
				CodeGenerationUtils.mavenModuleRoot(SurabayaApplication.class).resolve("src/test/testJavaProject/src"));
		CompilationUnit cu = sourceRoot.parse("ast", "DEC.java");
		staticAnalysisVisitor.visit(cu, project);
		System.out.println(project.toString());
		return project;
	}

}
