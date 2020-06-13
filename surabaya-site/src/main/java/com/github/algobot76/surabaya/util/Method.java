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

	private final String src;

	private final List<Parameter> parameters = new ArrayList<>();

	public Method(String name, String accessModifier, String returnType, String src) {
		this.name = name;
		this.accessModifier = AccessModifier.fromString(accessModifier);
		this.returnType = returnType;
		this.src = src;
	}

	public void addParameter(Parameter p) {
		parameters.add(p);
	}

	@Override
	public boolean equals(Object o) {

		if (o == this)
			return true;
		if (!(o instanceof Method)) {
			return false;
		}

		Method method = (Method) o;

		boolean equalParams = method.getParameters().containsAll(parameters)
				&& method.getParameters().size() == parameters.size();
		return method.getName().equals(name) && method.getReturnType().equals(returnType)
				&& method.getAccessModifier() == accessModifier && equalParams;
	}

	@Override
	public int hashCode() {
		int result = 17;
		result = 31 * result + name.hashCode();
		result = 31 * result + accessModifier.hashCode();
		result = 31 * result + returnType.hashCode();

		for (Parameter p : parameters) {
			result = 31 * result + p.hashCode();
		}

		return result;
	}

}
