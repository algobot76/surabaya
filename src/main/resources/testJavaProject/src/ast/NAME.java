package ast;

import ui.Main;

public class NAME extends EXP {
    private String name;

    @Override
    public void parse() {
        name = tokenizer.getAndCheckNext("[a-z]+");
    }

    @Override
    public Integer evaluate() {
        return Main.symbolTable.get(name);
    }

    @Override
    public String toString() {
        return name;
    }
}
