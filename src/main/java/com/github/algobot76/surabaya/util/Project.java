package com.github.algobot76.surabaya.util;

import lombok.Data;

import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Data
@JsonIgnoreProperties(value = { "currentPackage" })
public class Project {

	private Map<String, Package> packages = new HashMap<>();

	public Package addPackage(String name, Package p) {
		packages.putIfAbsent(name, p);
		return packages.get(name);
	}

	public Package getPackage(String name) {
		return packages.get(name);
	}

}
