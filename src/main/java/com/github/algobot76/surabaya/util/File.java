package com.github.algobot76.surabaya.util;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class File {

	private final List<String> imports = new ArrayList<>();

	private final List<Class> classes = new ArrayList<>();

	public void addClass(Class k) {
		this.classes.add(k);
	}

	public void addImport(String i) {
		imports.add(i);
	}

}
