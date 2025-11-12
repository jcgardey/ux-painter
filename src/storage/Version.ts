import UXRefactoring from '@/refactorings/UXRefactoring';

interface SerializedVersion {
  name: string;
  refactorings: Record<string, unknown>[];
}

class Version {
  name: string;
  refactorings: UXRefactoring[];

  constructor(aName: string) {
    this.refactorings = [];
    this.name = aName;
  }

  setName(aNamme: string) {
    this.name = aNamme;
  }

  getName() {
    return this.name;
  }

  getRefactorings() {
    return this.refactorings;
  }

  setRefactorings(refactorings: UXRefactoring[]) {
    this.refactorings = refactorings;
  }

  addRefactoring(aRefactoring: UXRefactoring) {
    this.refactorings.push(aRefactoring);
  }

  serialize() {
    let json: SerializedVersion = {} as SerializedVersion;
    json.name = this.name;
    json.refactorings = [];
    for (let i = 0; i < this.refactorings.length; i++) {
      json.refactorings.push(this.refactorings[i].serialize());
    }
    return json;
  }

  execute() {
    this.refactorings.map(function (refactoring) {
      if (refactoring.getURL() == document.location.href) {
        refactoring.execute();
      }
    });
  }

  unDo() {
    this.refactorings.map(function (refactoring) {
      if (refactoring.getURL() == document.location.href) {
        try {
          refactoring.unDo();
        } catch (e) {
          console.log(e);
        }
      }
    });
  }

  clone() {
    let version = new Version(this.name + ' copy');
    version.setRefactorings(this.getRefactorings().slice());
    return version;
  }

  static fromJSON(json: SerializedVersion) {
    let version = new Version(json.name);
    for (let i = 0; i < json.refactorings.length; i++) {
      version.addRefactoring(UXRefactoring.fromJSON(json.refactorings[i]));
    }
    return version;
  }
}

export default Version;
