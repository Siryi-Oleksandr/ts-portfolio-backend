function parseTechnicalStack(technicalStack: string): string[] {
  return technicalStack.split(",").map((tech) => tech.trim());
}

export default parseTechnicalStack;
