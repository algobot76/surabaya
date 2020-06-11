package com.github.algobot76.surabaya.util;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class Field {

	private final String name;

	private final String type;

	@JsonProperty("access_modifier")
	private final AccessModifier accessModifier;

	@Override
	public boolean equals(Object o) {

		if (o == this)
			return true;
		if (!(o instanceof Field)) {
			return false;
		}

		Field field = (Field) o;

		return field.getName().equals(name) && field.getType().equals(type)
				&& field.getAccessModifier() == accessModifier;
	}

	// Idea from effective Java : Item 9
	@Override
	public int hashCode() {
		int result = 17;
		result = 31 * result + name.hashCode();
		result = 31 * result + type.hashCode();
		result = 31 * result + accessModifier.hashCode();
		return result;
	}

	public Field(String name, String type, String accessModifier) {
		this.name = name;
		this.type = type;
		this.accessModifier = AccessModifier.fromString(accessModifier);
	}

}
