package com.github.algobot76.surabaya.util;

import lombok.Data;

import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Data
@JsonIgnoreProperties(value = { "currentPackage" })
public class Project {

	private final Map<String, Package> packages = new HashMap<>();

	private Package currentPackage = null;

	public void addPackage(String name, Package p) {
		packages.putIfAbsent(name, p);
		currentPackage = packages.get(name);
	}

	public Package getPackage(String name) {
		return packages.get(name);
	}

}
