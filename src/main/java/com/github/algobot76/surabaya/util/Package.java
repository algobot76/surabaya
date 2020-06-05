package com.github.algobot76.surabaya.util;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Package {

	private String name = "";

	private final List<Class> classes = new ArrayList<>();

	public Package(String n) {
		name = n;
	}

	public void addClass(Klass k) {
		this.classes.add(k);
	}

}
