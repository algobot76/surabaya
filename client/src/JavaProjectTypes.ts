export enum JavaType {
  Interface = "Interface",
  Enum = "Enum",
  Abstract = "Abstract",
  Concrete = "Concrete",
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
  imports: string[];
  fields: JavaField[];
  methods: JavaMethod[];
  constructors: JavaContructor[];
};

export type JavaPackage = {
  name: string;
  classes: JavaClass[];
};

export type JavaProject = {
  packages: JavaPackage[];
};
