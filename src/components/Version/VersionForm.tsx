import React, { useState } from 'react';
import Version from '@/storage/Version';
import { Text } from '../ui/Text';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ArrowLeftCircle, Plus } from 'lucide-react';
import { Label } from '../ui/label';
import { useRouter } from '@/routing/Router';

interface VersionFormProps {
  version: Version;
}

const VersionForm: React.FC<VersionFormProps> = ({ version }) => {
  const manager = window.refactoringManager;
  const router = useRouter();

  const [versionName, setVersionName] = useState<string>(
    version.getName() !== manager.getOriginalVersionName()
      ? version.getName()
      : '',
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVersionName(e.target.value);
  };

  const handleBack = (): void => {
    router.show('VERSION_LIST');
  };

  const handleSubmit = (): void => {
    version.setName(versionName);
    if (
      version.getName() &&
      manager.getOriginalVersionName() !== version.getName()
    ) {
      manager.addVersion(version);
      manager.setCurrentVersion(version);
      manager.save();
    }
    router.show('VERSION_LIST');
  };

  return (
    <div className="flex flex-col gap-4">
      <Text variant="h3">New Version</Text>

      <Text variant="large">
        The version cannot be saved as
        <span className="font-semibold">
          {' '}
          {manager.getOriginalVersion().getName()}
        </span>{' '}
        because that is immutable
      </Text>

      <div>
        <Label>Name</Label>
        <Input value={versionName} onChange={handleChange} />
      </div>

      <div className="flex gap-4">
        <Button onClick={handleBack} variant="secondary">
          <ArrowLeftCircle /> Back
        </Button>
        <Button onClick={handleSubmit}>
          <Plus /> Create
        </Button>
      </div>
    </div>
  );
};

export default VersionForm;
