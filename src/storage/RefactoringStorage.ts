import Version from './Version';

class RefactoringStorage {
  private originalVersionName: string = 'Original';
  private currentVersion: Version | null = null;
  private versions: Version[] | null = null;

  getCurrentVersion(): Version {
    if (!this.currentVersion) {
      const storedVersion = localStorage.getItem('currentVersion');
      if (storedVersion) {
        const serializedVersion = JSON.parse(storedVersion);
        this.currentVersion = Version.fromJSON(serializedVersion);
      } else {
        this.currentVersion = this.getOriginalVersion();
      }
    }
    return this.currentVersion;
  }

  setCurrentVersion(aVersion: Version): void {
    this.currentVersion = aVersion;
  }

  getOriginalVersion(): Version {
    return new Version(this.originalVersionName);
  }

  getOriginalVersionName(): string {
    return this.originalVersionName;
  }

  getVersions(): Version[] {
    if (!this.versions) {
      this.versions = [];
      const storedVersions = localStorage.getItem('versions');
      if (storedVersions) {
        const allSerializedVersions = JSON.parse(storedVersions);
        for (let i = 0; i < allSerializedVersions.length; i++) {
          this.versions.push(Version.fromJSON(allSerializedVersions[i]));
        }
      }
    }
    return this.versions;
  }

  getAllVersions(): Version[] {
    return [this.getOriginalVersion()].concat(this.getVersions());
  }

  addVersion(aVersion: Version): void {
    const versions = this.getVersions();
    if (!this.getVersions().find((v) => v.getName() === aVersion.getName())) {
      versions.push(aVersion);
    }
  }

  getVersion(aName: string): Version | null {
    return this.getAllVersions().find((v) => v.getName() === aName) || null;
  }

  save(): void {
    const serializedVersions = this.getVersions().map((version: Version) => {
      return version.serialize();
    });
    localStorage.setItem('versions', JSON.stringify(serializedVersions));
    localStorage.setItem(
      'currentVersion',
      JSON.stringify(this.getCurrentVersion().serialize()),
    );
  }
}

export default RefactoringStorage;
