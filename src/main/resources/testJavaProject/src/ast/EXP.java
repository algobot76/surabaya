package ast;

import libs.Node;
import libs.Tokenizer;

public abstract class EXP extends Node {
    // Helper method to avoid repeating this if-else pattern in multiple parsing methods
    public static EXP makeExp(Tokenizer tokenizer) {
        if (tokenizer.checkToken("[a-z]+")) {
            return new NAME();
        }
        else if (tokenizer.checkToken("[0-9]+")) {
            return new NUMBER();
        }
        else {
            throw new RuntimeException("Unknown value: " + tokenizer.getNext());
        }
    }
}
