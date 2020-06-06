package com.github.algobot76.surabaya.util;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(value = { "currentFile" })
@Data
public class Package {

	private final List<File> files = new ArrayList<>();

	public void addFile(File f) {
		this.files.add(f);
	}

}
