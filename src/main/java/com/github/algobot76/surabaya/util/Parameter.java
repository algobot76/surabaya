package com.github.algobot76.surabaya.util;

import lombok.Data;

@Data
public class Parameter {

	private final String name;

	private final String type;

	public Parameter(String name, String type) {
		this.name = name;
		this.type = type;
	}

}
