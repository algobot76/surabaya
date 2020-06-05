package com.github.algobot76.surabaya.util;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Package {

	private final String name;

	private final List<Klass> classes = new ArrayList<>();

	public void addClass(Klass k) {
		this.classes.add(k);
	}

}
