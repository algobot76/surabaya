package com.github.algobot76.surabaya.util;

import java.io.IOException;
import java.util.List;

import com.github.algobot76.surabaya.SurabayaApplication;
import com.github.javaparser.ParseResult;
import com.github.javaparser.ast.CompilationUnit;
import com.github.javaparser.ast.visitor.VoidVisitor;
import com.github.javaparser.utils.CodeGenerationUtils;
import com.github.javaparser.utils.SourceRoot;

public class Analyzer {

	private static final String destpath = "unzipped";

	private Project project;

	private VoidVisitor<Project> staticAnalysisVisitor;

	public Analyzer() {
		project = new Project();
		staticAnalysisVisitor = new StaticAnalysisVisitor();
	}

	public Project analyze(String filepath) {
		FileUnzipper.unzip(filepath, destpath);
		SourceRoot sourceRoot = new SourceRoot(
				CodeGenerationUtils.mavenModuleRoot(SurabayaApplication.class).resolve("unzipped/src"));
		try {
			List<ParseResult<CompilationUnit>> results = sourceRoot.tryToParse();
			for (ParseResult result : results) {
				CompilationUnit cu = (CompilationUnit) result.getResult().get();
				staticAnalysisVisitor.visit(cu, project);
			}
		}
		catch (IOException e) {
			System.out.println(e.getMessage());
		}
		return project;
	}

}
