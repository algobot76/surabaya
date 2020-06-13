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

	private final String src;

	public Constructor(String name, String accessModifier, String src) {
		this.name = name;
		this.accessModifier = AccessModifier.fromString(accessModifier);
		this.src = src;
	}

	public void addParameter(Parameter p) {
		parameters.add(p);
	}

	@Override
	public boolean equals(Object o) {

		if (o == this)
			return true;
		if (!(o instanceof Constructor)) {
			return false;
		}

		Constructor c = (Constructor) o;

		boolean equalParams = c.getParameters().containsAll(parameters)
				&& c.getParameters().size() == parameters.size();
		return c.getName().equals(name) && c.getAccessModifier() == accessModifier && equalParams;
	}

	@Override
	public int hashCode() {
		int result = 17;
		result = 31 * result + name.hashCode();
		result = 31 * result + accessModifier.hashCode();

		for (Parameter p : parameters) {
			result = 31 * result + p.hashCode();
		}

		return result;
	}

}
