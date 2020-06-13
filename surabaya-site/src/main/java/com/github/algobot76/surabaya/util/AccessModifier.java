package com.github.algobot76.surabaya.util;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public enum AccessModifier {

	@JsonProperty("public")
	PUBLIC, @JsonProperty("private")
	PRIVATE, @JsonProperty("protected")
	PROTECTED, @JsonProperty("unrecognized")
	UNRECOGNIZED;

	private static final Logger logger = LoggerFactory.getLogger(AccessModifier.class);

	public static AccessModifier fromString(String s) {
		switch (s.toLowerCase().trim()) {
		case "public":
			return AccessModifier.PUBLIC;
		case "private":
			return AccessModifier.PRIVATE;
		case "protected":
			return AccessModifier.PROTECTED;
		default:
			logger.error(String.format("Access Modifier %s not recognized\n", s));
			return AccessModifier.UNRECOGNIZED;
		}

	}

}
