package com.github.algobot76.surabaya.util;

import java.util.Optional;

import com.github.javaparser.ast.CompilationUnit;
import com.github.javaparser.ast.PackageDeclaration;
import com.github.javaparser.ast.body.ClassOrInterfaceDeclaration;
import com.github.javaparser.ast.visitor.VoidVisitorAdapter;

public class StaticAnalysisVisitor extends VoidVisitorAdapter<Project> {

	@Override
	public void visit(ClassOrInterfaceDeclaration n, Project project) {
		Package currentPackage = project.getCurrentPackage();
		String type = "Class";
		if (n.isInterface()) {
			type = "Interface";
		}
		Klass newClass = new Klass(n.getName().toString(), type, n.getModifiers().get(0).toString().trim(), 100);
		currentPackage.addClass(newClass);

		System.out.println(n.getName());
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
		super.visit(n, project);
	}

}
