package com.github.algobot76.surabaya.util;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Method {

	private final String name;

	@JsonProperty("access_modifier")
	private final AccessModifier accessModifier;

	@JsonProperty("return_type")
	private final String returnType;

	private final List<Parameter> parameters = new ArrayList<>();

	public Method(String name, String accessModifier, String returnType) {
		this.name = name;
		this.accessModifier = AccessModifier.fromString(accessModifier);
		this.returnType = returnType;
	}

	public void addParameter(Parameter p) {
		parameters.add(p);
	}

}
