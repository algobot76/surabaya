package com.github.algobot76.surabaya.util;

import lombok.Data;

@Data
public class Parameter {

	private final String name;

	private final String type;

	@Override
	public boolean equals(Object o) {

		if (o == this)
			return true;
		if (!(o instanceof Parameter)) {
			return false;
		}

		Parameter param = (Parameter) o;

		return param.getName().equals(name) && param.getType().equals(type);
	}

	@Override
	public int hashCode() {
		int result = 17;
		result = 31 * result + name.hashCode();
		result = 31 * result + type.hashCode();
		return result;
	}

}
