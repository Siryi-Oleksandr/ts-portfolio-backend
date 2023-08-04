function parseTechnicalStack(technicalStack: string): string[] {
  if (!technicalStack.trim()) {
    return [];
  }

  return technicalStack.split(",").map((tech) => {
    // Trim any leading or trailing spaces
    tech = tech.trim();

    // Check if the last character is not a letter
    if (!/^[a-zA-Z]$/.test(tech.slice(-1))) {
      // Remove the last character
      tech = tech.slice(0, -1);
    }

    return tech;
  });
}

export default parseTechnicalStack;
