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

}
