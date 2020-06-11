package com.github.algobot76.surabaya.util;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Package {

	private final List<File> files = new ArrayList<>();

	public void addFile(File f) {
		this.files.add(f);
	}

	@Override
	public boolean equals(Object o) {

		if (o == this)
			return true;
		if (!(o instanceof Package)) {
			return false;
		}

		Package p = (Package) o;

		return p.getFiles().containsAll(files) && p.getFiles().size() == files.size();
	}

	@Override
	public int hashCode() {
		int result = 17;

		for (File f : files) {
			result = 31 * result + f.hashCode();
		}

		return result;
	}

}
