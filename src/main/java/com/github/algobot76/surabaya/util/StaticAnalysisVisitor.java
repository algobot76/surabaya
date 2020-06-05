package com.github.algobot76.surabaya.util;

import java.util.Optional;

import com.github.javaparser.ast.CompilationUnit;
import com.github.javaparser.ast.PackageDeclaration;
import com.github.javaparser.ast.body.ClassOrInterfaceDeclaration;
import com.github.javaparser.ast.visitor.VoidVisitorAdapter;

public class StaticAnalysisVisitor extends VoidVisitorAdapter<Project> {

	@Override
	public void visit(ClassOrInterfaceDeclaration n, Project project) {
		System.out.println(n.getName());
	}

	@Override
	public void visit(CompilationUnit n, Project project) {
		Optional<PackageDeclaration> packageDeclaration = n.getPackageDeclaration();
		String packageName = "none";
		if (packageDeclaration.isPresent()) {
			packageName = ((PackageDeclaration) packageDeclaration.get()).getName().toString();
		}
		Package newPackage = new Package(packageName);
		project.addPackage(packageName, newPackage);
	}

}
