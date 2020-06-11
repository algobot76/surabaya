package com.github.algobot76.surabaya.util;

import com.github.javaparser.Range;
import com.github.javaparser.TokenRange;
import com.github.javaparser.ast.CompilationUnit;
import com.github.javaparser.ast.ImportDeclaration;
import com.github.javaparser.ast.Modifier;
import com.github.javaparser.ast.PackageDeclaration;
import com.github.javaparser.ast.body.*;
import com.github.javaparser.ast.visitor.VoidVisitorAdapter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;

public class StaticAnalysisVisitor extends VoidVisitorAdapter<Project> {

	private static final Logger logger = LoggerFactory.getLogger(StaticAnalysisVisitor.class);

	private File currentFile;

	private Class currentClass;

	@Override
	public void visit(ClassOrInterfaceDeclaration n, Project project) {
		String type = "Class";
		if (n.isInterface()) {
			type = "Interface";
		}
		else if (checkAbstractModifier(n.getModifiers())) {
			type = "Abstract Class";
		}
		TokenRange tokenRange;
		int lineCount = 0;
		if (n.getTokenRange().isPresent()) {
			tokenRange = n.getTokenRange().get();
			Range beginRange = tokenRange.getBegin().getRange().get();
			Range endRange = tokenRange.getEnd().getRange().get();
			lineCount = endRange.begin.line - beginRange.begin.line;
		}
		logger.info(String.format("Parsing %s\n", n.getName()));
		Class newClass = new Class(n.getName().toString(), type, getAccessModifier(n.getModifiers()), lineCount);
		currentFile.addClass(newClass);
		currentClass = newClass;

		super.visit(n, project);
	}

	@Override
	public void visit(CompilationUnit n, Project project) {
		Optional<PackageDeclaration> packageDeclaration = n.getPackageDeclaration();
		String packageName = "none";
		if (packageDeclaration.isPresent()) {
			packageName = ((PackageDeclaration) packageDeclaration.get()).getName().toString();
		}
		Package newPackage = project.getOrCreatePackage(packageName);
		File newFile = new File();
		newPackage.addFile(newFile);
		currentFile = newFile;
		super.visit(n, project);
	}

	@Override
	public void visit(ImportDeclaration n, Project project) {
		currentFile.addImport(n.getName().getIdentifier());
	}

	@Override
	public void visit(FieldDeclaration n, Project project) {
		for (VariableDeclarator variable : n.getVariables()) {
			Field newField = new Field(variable.getName().getIdentifier().trim(), variable.getType().toString(),
					getAccessModifier(n.getModifiers()));
			currentClass.addField(newField);
		}

	}

	@Override
	public void visit(MethodDeclaration n, Project project) {
		Method newMethod = new Method(n.getName().getIdentifier().trim(), getAccessModifier(n.getModifiers()),
				n.getType().asString());
		for (com.github.javaparser.ast.body.Parameter p : n.getParameters()) {
			Parameter param = new Parameter(p.getName().asString().trim(), p.getType().asString().trim());
			newMethod.addParameter(param);
		}
		currentClass.addMethod(newMethod);
	}

	@Override
	public void visit(ConstructorDeclaration n, Project project) {
		Constructor constructor = new Constructor(n.getName().getIdentifier().trim(),
				getAccessModifier(n.getModifiers()));
		for (com.github.javaparser.ast.body.Parameter p : n.getParameters()) {
			Parameter param = new Parameter(p.getName().asString().trim(), p.getType().asString().trim());
			constructor.addParameter(param);
		}
		currentClass.addConstructor(constructor);

	}

	private String getAccessModifier(List<Modifier> modifiers) {
		for (Modifier modifier : modifiers) {
			String mod = modifier.toString().trim();
			if (mod.equals("public") || mod.equals("protected") || mod.equals("private")) {
				return mod;
			}
		}
		return "unrecognized";
	}

	private Boolean checkAbstractModifier(List<Modifier> modifiers) {
		for (Modifier modifier : modifiers) {
			String mod = modifier.toString().trim();
			if (mod.equals("abstract")) {
				return true;
			}
		}
		return false;
	}

}
