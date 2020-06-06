package com.github.algobot76.surabaya.util;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Constructor {

	private final String name;

	@JsonProperty("access_modifier")
	private final AccessModifier accessModifier;

	private final List<Parameter> parameters = new ArrayList<>();

	public void addParameter(Parameter p) {
		parameters.add(p);
	}

}
