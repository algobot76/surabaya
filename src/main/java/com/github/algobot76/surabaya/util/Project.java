package com.github.algobot76.surabaya.util;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Project {

	private final List<Package> packages = new ArrayList<>();

	public void addPackage(Package p) {
		packages.add(p);
	}

}
