package com.github.algobot76.surabaya.util;

import com.github.algobot76.surabaya.SurabayaApplication;
import com.github.javaparser.ParseResult;
import com.github.javaparser.ast.CompilationUnit;
import com.github.javaparser.ast.visitor.VoidVisitor;
import com.github.javaparser.utils.CodeGenerationUtils;
import com.github.javaparser.utils.SourceRoot;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.util.List;

public class Analyzer {

	private static final Logger logger = LoggerFactory.getLogger(Analyzer.class);

	private static final String destpath = "unzipped";

	private Project project;

	private VoidVisitor<Project> staticAnalysisVisitor;

	public Analyzer() {
		project = new Project();
		staticAnalysisVisitor = new StaticAnalysisVisitor();
	}

	public Project analyze(Resource file) {
		FileUnzipper.unzip(file, destpath);
		SourceRoot sourceRoot = new SourceRoot(
				CodeGenerationUtils.mavenModuleRoot(SurabayaApplication.class).resolve("unzipped"));
		try {
			List<ParseResult<CompilationUnit>> results = sourceRoot.tryToParse();
			for (ParseResult result : results) {
				CompilationUnit cu = (CompilationUnit) result.getResult().get();
				staticAnalysisVisitor.visit(cu, project);
			}
		}
		catch (IOException e) {
			logger.error(e.getMessage());
		}
		return project;
	}

}
