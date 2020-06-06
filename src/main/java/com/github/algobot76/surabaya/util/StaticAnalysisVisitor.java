package com.github.algobot76.surabaya.util;

import java.util.Optional;

import com.github.javaparser.Range;
import com.github.javaparser.TokenRange;
import com.github.javaparser.ast.CompilationUnit;
import com.github.javaparser.ast.ImportDeclaration;
import com.github.javaparser.ast.PackageDeclaration;
import com.github.javaparser.ast.body.ClassOrInterfaceDeclaration;
import com.github.javaparser.ast.body.ConstructorDeclaration;
import com.github.javaparser.ast.body.FieldDeclaration;
import com.github.javaparser.ast.body.MethodDeclaration;
import com.github.javaparser.ast.body.VariableDeclarator;
import com.github.javaparser.ast.visitor.VoidVisitorAdapter;

public class StaticAnalysisVisitor extends VoidVisitorAdapter<Project> {

	private File currentFile;

	private Class currentClass;

	@Override
	public void visit(ClassOrInterfaceDeclaration n, Project project) {
		String type = "Class";
		if (n.isInterface()) {
			type = "Interface";
		}
		TokenRange tokenRange;
		int lineCount = 0;
		if (n.getTokenRange().isPresent()) {
			tokenRange = n.getTokenRange().get();
			Range beginRange = tokenRange.getBegin().getRange().get();
			Range endRange = tokenRange.getEnd().getRange().get();
			lineCount = endRange.begin.line - beginRange.begin.line;
		}
		Class newClass = new Class(n.getName().toString(), type, n.getModifiers().get(0).toString().trim(), lineCount);
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
		Package newPackage = new Package();
		project.addPackage(packageName, newPackage);
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
					n.getModifiers().get(0).toString());
			currentClass.addField(newField);
		}

	}

	@Override
	public void visit(MethodDeclaration n, Project project) {
		Method newMethod = new Method(n.getName().getIdentifier().trim(), n.getModifiers().get(0).toString(),
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
				n.getModifiers().get(0).toString());
		for (com.github.javaparser.ast.body.Parameter p : n.getParameters()) {
			Parameter param = new Parameter(p.getName().asString().trim(), p.getType().asString().trim());
			constructor.addParameter(param);
		}
		currentClass.addConstructor(constructor);

	}

}
