package com.github.algobot76.surabaya.util;

import lombok.Data;

import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Data
@JsonIgnoreProperties(value = { "currentPackage" })
public class Project {

	private final Map<String, Package> packages = new HashMap<>();

	public void addPackage(String name, Package p) {
		packages.putIfAbsent(name, p);
	}

	public Package getPackage(String name) {
		return packages.get(name);
	}

}
