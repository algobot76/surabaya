package com.github.algobot76.surabaya.controller;

import com.github.algobot76.surabaya.util.Class;
import com.github.algobot76.surabaya.util.Package;
import com.github.algobot76.surabaya.util.File;
import com.github.algobot76.surabaya.util.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AnalysisController {

	@GetMapping("/analysis")
	public Project analysis() {
		Project project = new Project();
		Package package1 = new Package();
		File file1 = new File();
		file1.addImport("import1");
		Class class1 = new Class("Class1", "Interface", "public", 100);
		class1.addField(new Field("foo", "String", "public"));
		class1.addField(new Field("bar", "boolean", "private"));
		Method method1 = new Method("method1", "public", "void");
		method1.addParameter(new Parameter("a", "int"));
		method1.addParameter(new Parameter("b", "String"));
		Method method2 = new Method("method2", "public", "int");
		method2.addParameter(new Parameter("x", "String"));
		class1.addMethod(method1);
		class1.addMethod(method2);
		Constructor constructor1 = new Constructor("Class1", "public");
		constructor1.addParameter(new Parameter("z", "double"));
		class1.addConstructor(constructor1);
		package1.addFile(file1);
		file1.addClass(class1);
		project.addPackage("package1", package1);
		return project;
	}

}
