package com.github.algobot76.surabaya.util;

import com.github.algobot76.surabaya.SurabayaApplication;
import com.github.javaparser.JavaParser;
import com.github.javaparser.ParseResult;
import com.github.javaparser.ast.CompilationUnit;
import com.github.javaparser.ast.visitor.VoidVisitor;
import com.github.javaparser.utils.CodeGenerationUtils;
import com.github.javaparser.utils.SourceRoot;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.DirectoryIteratorException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

public class Analyzer {

	private static final Logger logger = LoggerFactory.getLogger(Analyzer.class);

	private static final String destpath = "unzipped";

	private Project project;

	private StaticAnalysisVisitor staticAnalysisVisitor;

	public Analyzer() {
		project = new Project();
		staticAnalysisVisitor = new StaticAnalysisVisitor();
	}

	public Project analyze(Resource file) {
		FileUnzipper.unzip(file, destpath);
		JavaParser parser = new JavaParser();
		Path path = CodeGenerationUtils.mavenModuleRoot(SurabayaApplication.class).resolve("unzipped");
		try (Stream<Path> paths = Files.walk(path)) {
			paths.forEach(p -> {
				if (p.toString().endsWith(".java")) {
					try {
						String content = Files.readString(p, StandardCharsets.US_ASCII);
						ParseResult result = parser.parse(content);
						CompilationUnit cu = (CompilationUnit) result.getResult().get();
						String[] lines = content.lines().toArray(String[]::new);
						staticAnalysisVisitor.setFileSrc(lines);
						staticAnalysisVisitor.visit(cu, project);
					}
					catch (IOException e) {
						logger.error(e.getMessage());
					}
				}
			});
		}
		catch (IOException e) {
			logger.error(e.getMessage());
		}

		return project;
	}

}
