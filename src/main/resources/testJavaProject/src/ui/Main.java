package ui;

import ast.PROGRAM;
import ast.EXP;
import libs.Tokenizer;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Main {
    public static final Map<String, Integer> symbolTable = new HashMap<>(); // all values are integers

    public static void main(String[] args) {

        List<String> literals = Arrays.asList("def", "set", "print", "new", ",");
        Tokenizer.makeTokenizer("input.tvar",literals);
        PROGRAM p = new PROGRAM();
        p.parse();
        p.evaluate();
        System.out.println("completed successfully");
        System.out.println(symbolTable);
    }

}
