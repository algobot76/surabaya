package ast;

import libs.Node;

import java.util.ArrayList;
import java.util.List;

public class PROGRAM extends Node{
    private List<STATEMENT> statements = new ArrayList<>();

    @Override
    public void parse() {
        while (tokenizer.moreTokens()) {
            STATEMENT s = null;
            if (tokenizer.checkToken("set")) {
                s = new SET();
            }
            else if (tokenizer.checkToken("new")){
                s = new DEC();
            }
            else if (tokenizer.checkToken("print")){
                s = new PRINT();
            }
            else {
                throw new RuntimeException("Unknown statement:" + tokenizer.getNext());
            }
            s.parse();
            statements.add(s);
        }

    }

    @Override
    public Integer evaluate() {
        for (STATEMENT s : statements){
            s.evaluate();
        }
        return null; // we only return a value for expressions (EXP); evaluation of programs/statements is via side-effects
    }
}
