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

	@Override
	public boolean equals(Object o) {

		if (o == this)
			return true;
		if (!(o instanceof Project)) {
			return false;
		}

		Project p = (Project) o;

		return p.getPackages().equals(packages);
	}

	@Override
	public int hashCode() {
		int result = 17;

		result = 31 * result + packages.hashCode();

		return result;
	}

}
