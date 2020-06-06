package com.github.algobot76.surabaya.util;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum AccessModifier {

	@JsonProperty("public")
	PUBLIC, @JsonProperty("private")
	PRIVATE, @JsonProperty("protected")
	PROTECTED, @JsonProperty("unrecognized")
	UNRECOGNIZED;

	public static AccessModifier fromString(String s) {
		switch (s.toLowerCase().trim()) {
		case "public":
			return AccessModifier.PUBLIC;
		case "private":
			return AccessModifier.PRIVATE;
		case "protected":
			return AccessModifier.PROTECTED;
		default:
			System.out.printf("Access Modifier %s not recognized\n", s);
			return AccessModifier.UNRECOGNIZED;
		}

	}

}
