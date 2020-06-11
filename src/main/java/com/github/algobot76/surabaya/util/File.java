package com.github.algobot76.surabaya.util;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class File {

	private final List<String> imports = new ArrayList<>();

	private final List<Class> classes = new ArrayList<>();

	public void addClass(Class k) {
		this.classes.add(k);
	}

	public void addImport(String i) {
		imports.add(i);
	}

	@Override
	public boolean equals(Object o) {

		if (o == this)
			return true;
		if (!(o instanceof File)) {
			return false;
		}

		File f = (File) o;

		boolean equalImports = f.getImports().containsAll(imports) && f.getImports().size() == imports.size();
		boolean equalClasses = f.getClasses().containsAll(classes) && f.getClasses().size() == classes.size();
		return equalImports && equalClasses;
	}

	@Override
	public int hashCode() {
		int result = 17;

		for (String i : imports) {
			result = 31 * result + i.hashCode();
		}

		for (Class c : classes) {
			result = 31 * result + c.hashCode();
		}

		return result;
	}

}
