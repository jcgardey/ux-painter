class UXRefactoring {
  serialize(): Record<string, unknown> {
    throw new Error('Method not implemented.');
  }

  execute(): void {
    throw new Error('Method not implemented.');
  }

  getURL(): string {
    throw new Error('Method not implemented.');
  }

  unDo(): void {
    throw new Error('Method not implemented.');
  }

  print(): string {
    return 'UX Refactoring';
  }

  static fromJSON(json: Record<string, unknown>): UXRefactoring {
    throw new Error('Method not implemented.' + json.toString());
  }
}

export default UXRefactoring;
