package com.github.algobot76.surabaya.controller;

import com.github.algobot76.surabaya.service.storage.StorageService;
import com.github.algobot76.surabaya.util.Analyzer;
import com.github.algobot76.surabaya.util.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.Path;
import java.util.Comparator;
import java.util.Optional;

@RestController
public class AnalysisController {

	private final StorageService storageService;

	@Autowired
	public AnalysisController(StorageService storageService) {
		this.storageService = storageService;
	}

	@GetMapping("/analysis")
	public Project analysis() {

		// Get the latest file according to the timestamp prefix
		Optional<Path> path = storageService.loadAll().max(Comparator.naturalOrder());

		if (path.isEmpty()) {
			return new Project();
		}

		Resource resource = storageService.loadAsResource(path.get().toString());
		Analyzer analyzer = new Analyzer();
		return analyzer.analyze(resource);
	}

}
