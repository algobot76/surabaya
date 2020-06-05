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

export type JavaFieldsMap = {
  [key: string]: JavaField[];
};

export type JavaParametersMap = {
  [key: string]: string;
};

export type JavaMethod =
  | {
      name: string;
      accessModifier: JavaAccessModifier;
      parameters: JavaParametersMap;
      returnType: string;
    }
  | {
      name: string;
      accessModifier: JavaAccessModifier;
      parameters: JavaParametersMap;
      returnType: null; //for constructor
    };

export type JavaClass = {
  name: string;
  type: JavaType;
  accessModifier: JavaAccessModifier;
  lineCount: number;
  imports: string[];
  fields: JavaFieldsMap;
  methods: JavaMethod[];
  constructors: JavaMethod[];
};

export type JavaPackage = {
  package_name: string;
  classes: JavaClass[];
};

export type JavaProject = {
  packages: JavaPackage[];
};
