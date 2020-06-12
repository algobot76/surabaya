package com.github.algobot76.surabaya.util;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Class {

	private final String name;

	private final String type;

	@JsonProperty("access_modifier")
	private final AccessModifier accessModifier;

	@JsonProperty("line_count")
	private final int lineCount;

	private final List<String> supertypes = new ArrayList<>();

	private final List<Field> fields = new ArrayList<>();

	private final List<Method> methods = new ArrayList<>();

	private final List<Constructor> constructors = new ArrayList<>();

	public Class(String name, String type, String accessModifier, int lineCount) {
		this.name = name;
		this.type = type;
		this.accessModifier = AccessModifier.fromString(accessModifier);
		this.lineCount = lineCount;
	}

	public void addSupertype(String type) {
		supertypes.add(type);
	}

	public void addField(Field f) {
		fields.add(f);
	}

	public void addMethod(Method m) {
		methods.add(m);
	}

	public void addConstructor(Constructor c) {
		constructors.add(c);
	}

	@Override
	public boolean equals(Object o) {

		if (o == this)
			return true;
		if (!(o instanceof Class)) {
			return false;
		}

		Class c = (Class) o;

		boolean equalFields = c.getFields().containsAll(fields) && c.getFields().size() == fields.size();
		boolean equalMethods = c.getMethods().containsAll(methods) && c.getMethods().size() == methods.size();
		boolean equalConstructors = c.getConstructors().containsAll(constructors)
				&& c.getConstructors().size() == constructors.size();
		boolean equalSupertypes = c.getSupertypes().containsAll(supertypes) && c.getSupertypes().size() == supertypes.size();
		return c.getName().equals(name) && c.getType().equals(type) && c.getLineCount() == lineCount
				&& c.getAccessModifier() == accessModifier && equalFields && equalMethods && equalConstructors;
	}

	@Override
	public int hashCode() {
		int result = 17;
		result = 31 * result + name.hashCode();
		result = 31 * result + accessModifier.hashCode();
		result = 31 * result + type.hashCode();
		result = 31 * result + lineCount;

		for (Field f : fields) {
			result = 31 * result + f.hashCode();
		}
		for (Method m : methods) {
			result = 31 * result + m.hashCode();
		}
		for (Constructor c : constructors) {
			result = 31 * result + c.hashCode();
		}

		return result;
	}

}
