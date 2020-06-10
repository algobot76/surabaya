package com.github.algobot76.surabaya.util;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class Field {

	private final String name;

	private final String type;

	@JsonProperty("access_modifier")
	private final AccessModifier accessModifier;

	public Field(String name, String type, String accessModifier) {
		this.name = name;
		this.type = type;
		this.accessModifier = AccessModifier.fromString(accessModifier);
	}

}
