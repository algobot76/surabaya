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
	private final AccessModifier access_modifier;

	@JsonProperty("line_count")
	private final int lineCount;

	private final List<Field> fields = new ArrayList<>();

	private final List<Method> methods = new ArrayList<>();

	private final List<Constructor> constructors = new ArrayList<>();

	public void addField(Field f) {
		fields.add(f);
	}

	public void addMethod(Method m) {
		methods.add(m);
	}

	public void addConstructor(Constructor c) {
		constructors.add(c);
	}

}
