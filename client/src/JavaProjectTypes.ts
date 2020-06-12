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
  accessModifier: JavaAccessModifier;
};

export type JavaParameter = {
  name: string;
  type: string;
};

export type JavaMethod = {
  name: string;
  accessModifier: JavaAccessModifier;
  parameters: JavaParameter[];
  returnType: string;
};

export type JavaContructor = {
  name: string;
  accessModifier: JavaAccessModifier;
  parameters: JavaParameter[];
};

export type JavaClass = {
  name: string;
  type: JavaType;
  accessModifier: JavaAccessModifier;
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
  files: JavaFile[];
};

export type JavaProject = {
  name: string;
  packages: JavaPackage[];
};
