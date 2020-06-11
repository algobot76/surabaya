package com.github.algobot76.surabaya;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.github.algobot76.surabaya.util.Analyzer;
import com.github.algobot76.surabaya.util.Project;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;

@SpringBootTest
public class AnalyzerTests {

	static final String testProjectDir = "src/test/testProjects/";

	Analyzer analyzer;

	ObjectMapper mapper;

	@BeforeEach
	public void initialize() {
		analyzer = new Analyzer();
		mapper = new ObjectMapper();
	}

	@Test
	void analyzeSimpleZipFileSuccess() throws JsonProcessingException {
		Resource testFile = new FileSystemResource(testProjectDir.concat("simpleZip.zip"));
		Project results = analyzer.analyze(testFile);
		String resultsString = mapper.writeValueAsString(results);
		String expectedProjectString = "{\"packages\":{\"ast\":{\"files\":[{\"imports\":[\"Main\"],\"classes\":[{\"name\":\"DEC\",\"type\":\"Class\",\"fields\":[{\"name\":\"name\",\"type\":\"String\",\"access_modifier\":\"private\"}],\"methods\":[{\"name\":\"parse\",\"parameters\":[],\"access_modifier\":\"public\",\"return_type\":\"void\"},{\"name\":\"evaluate\",\"parameters\":[],\"access_modifier\":\"public\",\"return_type\":\"Integer\"}],\"constructors\":[],\"access_modifier\":\"public\",\"line_count\":15}]}]}}}";
		assertEquals(expectedProjectString, resultsString);
	}

	@Test
	void analyzeInterfaceSuccess() throws JsonProcessingException {
		Resource testFile = new FileSystemResource(testProjectDir.concat("interface.zip"));
		Project results = analyzer.analyze(testFile);
		String resultsString = mapper.writeValueAsString(results);
		String expectedProjectString = "{\"packages\":{\"none\":{\"files\":[{\"imports\":[],\"classes\":[{\"name\":\"Test\",\"type\":\"Interface\",\"fields\":[],\"methods\":[{\"name\":\"parse\",\"parameters\":[],\"access_modifier\":\"public\",\"return_type\":\"void\"},{\"name\":\"evaluate\",\"parameters\":[],\"access_modifier\":\"public\",\"return_type\":\"Integer\"}],\"constructors\":[],\"access_modifier\":\"public\",\"line_count\":3}]}]}}}";
		assertEquals(expectedProjectString, resultsString);
	}

	@Test
	void analyzeAbstractClassSuccess() throws JsonProcessingException {
		Resource testFile = new FileSystemResource(testProjectDir.concat("abstractClass.zip"));
		Project results = analyzer.analyze(testFile);
		String resultsString = mapper.writeValueAsString(results);
		String expectedProjectString = "{\"packages\":{\"libs\":{\"files\":[{\"imports\":[\"PrintWriter\"],\"classes\":[{\"name\":\"Node\",\"type\":\"Abstract Class\",\"fields\":[{\"name\":\"tokenizer\",\"type\":\"Tokenizer\",\"access_modifier\":\"protected\"}],\"methods\":[{\"name\":\"parse\",\"parameters\":[],\"access_modifier\":\"public\",\"return_type\":\"void\"},{\"name\":\"evaluate\",\"parameters\":[],\"access_modifier\":\"public\",\"return_type\":\"Integer\"}],\"constructors\":[],\"access_modifier\":\"public\",\"line_count\":5}]}]}}}";
		assertEquals(expectedProjectString, resultsString);
	}

	@Test
	void analyzeMultipleClassesSuccess() throws JsonProcessingException {
		Resource testFile = new FileSystemResource(testProjectDir.concat("multipleClasses.zip"));
		Project results = analyzer.analyze(testFile);
		String resultsString = mapper.writeValueAsString(results);
		String expectedProjectString = "{\"packages\":{\"ast\":{\"files\":[{\"imports\":[\"Main\"],\"classes\":[{\"name\":\"DEC\",\"type\":\"Class\",\"fields\":[{\"name\":\"name\",\"type\":\"String\",\"access_modifier\":\"private\"}],\"methods\":[{\"name\":\"parse\",\"parameters\":[],\"access_modifier\":\"public\",\"return_type\":\"void\"},{\"name\":\"evaluate\",\"parameters\":[],\"access_modifier\":\"public\",\"return_type\":\"Integer\"}],\"constructors\":[],\"access_modifier\":\"public\",\"line_count\":15}]},{\"imports\":[\"Node\",\"Tokenizer\"],\"classes\":[{\"name\":\"EXP\",\"type\":\"Abstract Class\",\"fields\":[],\"methods\":[{\"name\":\"makeExp\",\"parameters\":[{\"name\":\"tokenizer\",\"type\":\"Tokenizer\"}],\"access_modifier\":\"public\",\"return_type\":\"EXP\"}],\"constructors\":[],\"access_modifier\":\"public\",\"line_count\":13}]}]}}}";
		assertEquals(expectedProjectString, resultsString);
	}

	@Test
	void analyzeFullProjectSuccess() throws JsonProcessingException {
		Resource testFile = new FileSystemResource(testProjectDir.concat("complexZip.zip"));
		Project results = analyzer.analyze(testFile);
		String resultsString = mapper.writeValueAsString(results);
		String expectedProjectString = "{\"packages\":{\"ast\":{\"files\":[{\"imports\":[\"Node\"],\"classes\":[{\"name\":\"STATEMENT\",\"type\":\"Abstract Class\",\"fields\":[],\"methods\":[],\"constructors\":[],\"access_modifier\":\"public\",\"line_count\":1}]},{\"imports\":[],\"classes\":[{\"name\":\"PRINT\",\"type\":\"Class\",\"fields\":[{\"name\":\"printed\",\"type\":\"EXP\",\"access_modifier\":\"private\"}],\"methods\":[{\"name\":\"parse\",\"parameters\":[],\"access_modifier\":\"public\",\"return_type\":\"void\"},{\"name\":\"evaluate\",\"parameters\":[],\"access_modifier\":\"public\",\"return_type\":\"Integer\"}],\"constructors\":[],\"access_modifier\":\"public\",\"line_count\":15}]},{\"imports\":[\"Main\"],\"classes\":[{\"name\":\"SET\",\"type\":\"Class\",\"fields\":[{\"name\":\"name\",\"type\":\"String\",\"access_modifier\":\"private\"},{\"name\":\"exp\",\"type\":\"EXP\",\"access_modifier\":\"private\"}],\"methods\":[{\"name\":\"parse\",\"parameters\":[],\"access_modifier\":\"public\",\"return_type\":\"void\"},{\"name\":\"evaluate\",\"parameters\":[],\"access_modifier\":\"public\",\"return_type\":\"Integer\"}],\"constructors\":[],\"access_modifier\":\"public\",\"line_count\":22}]},{\"imports\":[\"Main\"],\"classes\":[{\"name\":\"DEC\",\"type\":\"Class\",\"fields\":[{\"name\":\"name\",\"type\":\"String\",\"access_modifier\":\"private\"}],\"methods\":[{\"name\":\"parse\",\"parameters\":[],\"access_modifier\":\"public\",\"return_type\":\"void\"},{\"name\":\"evaluate\",\"parameters\":[],\"access_modifier\":\"public\",\"return_type\":\"Integer\"}],\"constructors\":[],\"access_modifier\":\"public\",\"line_count\":15}]},{\"imports\":[\"Node\",\"ArrayList\",\"List\"],\"classes\":[{\"name\":\"PROGRAM\",\"type\":\"Class\",\"fields\":[{\"name\":\"statements\",\"type\":\"List<STATEMENT>\",\"access_modifier\":\"private\"}],\"methods\":[{\"name\":\"parse\",\"parameters\":[],\"access_modifier\":\"public\",\"return_type\":\"void\"},{\"name\":\"evaluate\",\"parameters\":[],\"access_modifier\":\"public\",\"return_type\":\"Integer\"}],\"constructors\":[],\"access_modifier\":\"public\",\"line_count\":32}]},{\"imports\":[],\"classes\":[{\"name\":\"NUMBER\",\"type\":\"Class\",\"fields\":[{\"name\":\"value\",\"type\":\"int\",\"access_modifier\":\"private\"}],\"methods\":[{\"name\":\"parse\",\"parameters\":[],\"access_modifier\":\"public\",\"return_type\":\"void\"},{\"name\":\"evaluate\",\"parameters\":[],\"access_modifier\":\"public\",\"return_type\":\"Integer\"},{\"name\":\"toString\",\"parameters\":[],\"access_modifier\":\"public\",\"return_type\":\"String\"}],\"constructors\":[{\"name\":\"NUMBER\",\"parameters\":[],\"access_modifier\":\"public\"},{\"name\":\"NUMBER\",\"parameters\":[{\"name\":\"value\",\"type\":\"int\"}],\"access_modifier\":\"public\"}],\"access_modifier\":\"public\",\"line_count\":24}]},{\"imports\":[\"Main\"],\"classes\":[{\"name\":\"NAME\",\"type\":\"Class\",\"fields\":[{\"name\":\"name\",\"type\":\"String\",\"access_modifier\":\"private\"}],\"methods\":[{\"name\":\"parse\",\"parameters\":[],\"access_modifier\":\"public\",\"return_type\":\"void\"},{\"name\":\"evaluate\",\"parameters\":[],\"access_modifier\":\"public\",\"return_type\":\"Integer\"},{\"name\":\"toString\",\"parameters\":[],\"access_modifier\":\"public\",\"return_type\":\"String\"}],\"constructors\":[],\"access_modifier\":\"public\",\"line_count\":17}]},{\"imports\":[\"Node\",\"Tokenizer\"],\"classes\":[{\"name\":\"EXP\",\"type\":\"Abstract Class\",\"fields\":[],\"methods\":[{\"name\":\"makeExp\",\"parameters\":[{\"name\":\"tokenizer\",\"type\":\"Tokenizer\"}],\"access_modifier\":\"public\",\"return_type\":\"EXP\"}],\"constructors\":[],\"access_modifier\":\"public\",\"line_count\":13}]}]},\"ui\":{\"files\":[{\"imports\":[\"PROGRAM\",\"EXP\",\"Tokenizer\",\"Arrays\",\"HashMap\",\"List\",\"Map\"],\"classes\":[{\"name\":\"Main\",\"type\":\"Class\",\"fields\":[{\"name\":\"symbolTable\",\"type\":\"Map<String, Integer>\",\"access_modifier\":\"public\"}],\"methods\":[{\"name\":\"main\",\"parameters\":[{\"name\":\"args\",\"type\":\"String[]\"}],\"access_modifier\":\"public\",\"return_type\":\"void\"}],\"constructors\":[],\"access_modifier\":\"public\",\"line_count\":14}]}]},\"libs\":{\"files\":[{\"imports\":[\"IOException\",\"Files\",\"Paths\",\"ArrayList\",\"Arrays\",\"List\"],\"classes\":[{\"name\":\"Tokenizer\",\"type\":\"Class\",\"fields\":[{\"name\":\"program\",\"type\":\"String\",\"access_modifier\":\"private\"},{\"name\":\"literals\",\"type\":\"List<String>\",\"access_modifier\":\"private\"},{\"name\":\"tokens\",\"type\":\"List<String>\",\"access_modifier\":\"private\"},{\"name\":\"currentToken\",\"type\":\"int\",\"access_modifier\":\"private\"},{\"name\":\"theTokenizer\",\"type\":\"Tokenizer\",\"access_modifier\":\"private\"}],\"methods\":[{\"name\":\"tokenize\",\"parameters\":[],\"access_modifier\":\"private\",\"return_type\":\"void\"},{\"name\":\"checkNext\",\"parameters\":[],\"access_modifier\":\"private\",\"return_type\":\"String\"},{\"name\":\"getNext\",\"parameters\":[],\"access_modifier\":\"public\",\"return_type\":\"String\"},{\"name\":\"checkToken\",\"parameters\":[{\"name\":\"regexp\",\"type\":\"String\"}],\"access_modifier\":\"public\",\"return_type\":\"boolean\"},{\"name\":\"getAndCheckNext\",\"parameters\":[{\"name\":\"regexp\",\"type\":\"String\"}],\"access_modifier\":\"public\",\"return_type\":\"String\"},{\"name\":\"moreTokens\",\"parameters\":[],\"access_modifier\":\"public\",\"return_type\":\"boolean\"},{\"name\":\"makeTokenizer\",\"parameters\":[{\"name\":\"filename\",\"type\":\"String\"},{\"name\":\"literals\",\"type\":\"List<String>\"}],\"access_modifier\":\"public\",\"return_type\":\"void\"},{\"name\":\"getTokenizer\",\"parameters\":[],\"access_modifier\":\"public\",\"return_type\":\"Tokenizer\"}],\"constructors\":[{\"name\":\"Tokenizer\",\"parameters\":[{\"name\":\"filename\",\"type\":\"String\"},{\"name\":\"literalsList\",\"type\":\"List<String>\"}],\"access_modifier\":\"private\"}],\"access_modifier\":\"public\",\"line_count\":127}]},{\"imports\":[\"PrintWriter\"],\"classes\":[{\"name\":\"Node\",\"type\":\"Abstract Class\",\"fields\":[{\"name\":\"tokenizer\",\"type\":\"Tokenizer\",\"access_modifier\":\"protected\"}],\"methods\":[{\"name\":\"parse\",\"parameters\":[],\"access_modifier\":\"public\",\"return_type\":\"void\"},{\"name\":\"evaluate\",\"parameters\":[],\"access_modifier\":\"public\",\"return_type\":\"Integer\"}],\"constructors\":[],\"access_modifier\":\"public\",\"line_count\":5}]}]}}}";
		assertEquals(expectedProjectString, resultsString);
	}

	@Test
	void analyzeNoSrcDirectorySuccess() throws JsonProcessingException {
		Resource testFile = new FileSystemResource(testProjectDir.concat("noSrc.zip"));
		Project results = analyzer.analyze(testFile);
		String resultsString = mapper.writeValueAsString(results);
		String expectedProjectString = "{\"packages\":{\"ast\":{\"files\":[{\"imports\":[\"Main\"],\"classes\":[{\"name\":\"DEC\",\"type\":\"Class\",\"fields\":[{\"name\":\"name\",\"type\":\"String\",\"access_modifier\":\"private\"}],\"methods\":[{\"name\":\"parse\",\"parameters\":[],\"access_modifier\":\"public\",\"return_type\":\"void\"},{\"name\":\"evaluate\",\"parameters\":[],\"access_modifier\":\"public\",\"return_type\":\"Integer\"}],\"constructors\":[],\"access_modifier\":\"public\",\"line_count\":15}]}]}}}";
		assertEquals(expectedProjectString, resultsString);
	}

	@Test
	void analyzeWrongFileFormat() throws JsonProcessingException {
		Resource testFile = new FileSystemResource(testProjectDir.concat("test,java"));
		Project results = analyzer.analyze(testFile);
		String resultsString = mapper.writeValueAsString(results);
		assertEquals("{\"packages\":{}}", resultsString);
	}

}
