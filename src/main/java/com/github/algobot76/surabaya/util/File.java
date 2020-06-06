package com.github.algobot76.surabaya.util;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(value = { "currentClass" })
@Data
public class File {

	private Class currentClass = null;

	private final List<String> imports = new ArrayList<>();

	private final List<Class> classes = new ArrayList<>();

	public void addClass(Class k) {
		this.classes.add(k);
		currentClass = k;
	}

	public void addImport(String i) {
		imports.add(i);
	}

}
