package com.github.algobot76.surabaya.util;

import lombok.Data;

import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Data
@JsonIgnoreProperties(value = { "currentPackage" })
public class Project {

	private final Map<String, Package> packages = new HashMap<>();

	public Package getOrCreatePackage(String name) {
		packages.putIfAbsent(name, new Package());
		return packages.get(name);
	}

}
