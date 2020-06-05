package com.github.algobot76.surabaya.util;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(value = { "currentClass" })
@Data
public class Package {

	private Klass currentClass = null;

	private final List<Class> classes = new ArrayList<>();

	public void addClass(Klass k) {
		this.classes.add(k);
		currentClass = k;
	}

}
