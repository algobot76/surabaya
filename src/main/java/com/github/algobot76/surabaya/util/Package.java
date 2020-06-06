package com.github.algobot76.surabaya.util;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Package {

	private final String name;

	private final List<Class> classes = new ArrayList<>();

	public void addClass(Class k) {
		this.classes.add(k);
	}

}
