import React, { useState } from 'react';
import { VersionListItem } from './VersionListItem';
import { Button } from '../ui/button';
import { useRouter } from '@/routing/Router';
import { PlusIcon } from 'lucide-react';
import { Text } from '../ui/Text';

// Lightweight types to avoid leaking project internals into this file.
export interface Version {
  name: string;
  unDo(): void;
  execute(): void;
}

const showSwitchingVersionOverlay = (versionName: string) => {
  const overlay = document.createElement('div');
  overlay.id = 'ux-painter-overlay';
  // Tailwind-like classes so the overlay looks similar to previous styling
  overlay.className =
    'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 text-white text-lg';
  overlay.textContent = `Switching to version ${versionName}`;
  document.body.appendChild(overlay);
  setTimeout(() => {
    const el = document.querySelector('#ux-painter-overlay');
    if (el && el.parentElement) el.parentElement.removeChild(el);
  }, 400);
};

const VersionList: React.FC = () => {
  //const manager = useRefactoringManager() as unknown as RefactoringManager;

  const router = useRouter();

  const version = {
    name: 'v1',
    unDo: () => {},
    execute: () => {},
  };

  const manager = {
    getCurrentVersion: () => version,
    getAllVersions: () => [version],
    setCurrentVersion: (v: Version) => {
      v;
    },
    getOriginalVersion: () => version,
    save: () => {},
  };

  const [currentVersion, setCurrentVersion] = useState<Version>(version);

  const switchToVersion = (selectedVersion: Version) => {
    showSwitchingVersionOverlay(selectedVersion.name);
    manager.getCurrentVersion().unDo();
    manager.setCurrentVersion(selectedVersion);
    selectedVersion.execute();
    manager.save();
    setCurrentVersion(selectedVersion);
  };

  const handleNewVersion = () => {
    // Implementation for creating a new version goes here
    router.show('VERSION', {
      version: manager.getOriginalVersion(),
    });
  };

  return (
    <>
      <Text className="text-center">Versions</Text>

      <div className="my-2">
        {manager.getAllVersions().map((version, i) => (
          <VersionListItem
            key={i}
            version={version}
            current={version.name === currentVersion.name}
            switchToVersion={switchToVersion}
          />
        ))}
      </div>

      <div className="flex justify-start mt-4">
        <Button variant={'outline'} onClick={handleNewVersion}>
          <PlusIcon /> New version
        </Button>
      </div>
    </>
  );
};

export default VersionList;
