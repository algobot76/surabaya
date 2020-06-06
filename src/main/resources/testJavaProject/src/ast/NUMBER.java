package ast;

public class NUMBER extends EXP {
    private int value;

    public NUMBER() {
    }

    public NUMBER(int value) {
        this.value = value;
    }

    @Override
    public void parse() {
        value = Integer.parseInt(tokenizer.getAndCheckNext("[0-9]+"));
    }

    @Override
    public Integer evaluate() {
        return value; // Java auto-boxes this int as an Integer object
    }

    @Override
    public String toString() {
        return String.valueOf(value);
    }
}
