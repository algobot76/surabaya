package libs;

import java.io.PrintWriter;

public abstract class Node {
    protected Tokenizer tokenizer = Tokenizer.getTokenizer();

    abstract public void parse();
    abstract public Integer evaluate();
}
