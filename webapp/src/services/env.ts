class Environment {
  private static instance: Environment
  private environmentVariables: any

  private constructor() {
    this.environmentVariables = (window as any)['env']
  }

  static getInstance() {
    if (!Environment.instance) {
      Environment.instance = new Environment()
    }
    return Environment.instance
  }

  get(variableName: string) {
    return this.environmentVariables[variableName]
  }
}

export default () => Environment.getInstance();
