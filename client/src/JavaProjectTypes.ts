export enum JavaType {
  Interface = "Interface",
  Abstract = "Abstract Class",
  Concrete = "Class",
}

export enum JavaAccessModifier {
  Private = "private",
  Public = "public",
  Protected = "protected",
}

export type JavaField = {
  name: string;
  type: string;
  access_modifier: JavaAccessModifier; // snake case to match JSON
};

export type JavaParameter = {
  name: string;
  type: string;
};

export type JavaMethod = {
  name: string;
  access_modifier: JavaAccessModifier; // snake case to match JSON
  parameters: JavaParameter[];
  returnType: string;
  src: string;
};

export type JavaContructor = {
  name: string;
  access_modifier: JavaAccessModifier; // snake case to match JSON
  parameters: JavaParameter[];
  src: string;
};

export type JavaClass = {
  name: string;
  type: JavaType;
  access_modifier: JavaAccessModifier; // snake case to match JSON
  lineCount: number;
  fields: JavaField[];
  methods: JavaMethod[];
  constructors: JavaContructor[];
};

export type JavaFile = {
  classes: JavaClass[];
  imports: string[];
};

export type JavaPackage = {
  name: string;
  files: JavaFile[];
};

export type JavaProject = {
  packages: JavaPackage[];
};
