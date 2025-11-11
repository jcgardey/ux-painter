import React from 'react';
import { Button } from '../ui/button';
import { CopyIcon, EyeIcon, LockIcon, PencilIcon } from 'lucide-react';
import { Version } from './VersionList';
import { useRouter } from '@/routing/Router';
import { Text } from '../ui/Text';

interface Props {
  version: Version;
  current: boolean;
  switchToVersion: (v: Version) => void;
}

export const VersionListItem: React.FC<Props> = ({
  version,
  current,
  switchToVersion,
}) => {
  const router = useRouter();

  const manager = {
    getOriginalVersionName: () => 'v0',
  };

  const handleEdit = () => {
    switchToVersion(version);
    router.show('EDIT_VERSION', { versionName: version.name });
  };

  const handleCopy = () => {
    // Implement copy functionality here
  };

  return (
    <div className="flex justify-between m-2">
      <Text variant="h3">
        {version.name}{' '}
        {manager.getOriginalVersionName() === version.name && <LockIcon />}
      </Text>
      <div className="w-2/5 gap-2 flex items-center justify-end">
        <Button
          variant={'outline'}
          onClick={() => switchToVersion(version)}
          aria-label="Preview version"
          title="Preview version"
          size={'icon'}
          disabled={current}
        >
          <EyeIcon />
        </Button>

        <Button variant={'outline'} onClick={handleCopy} size={'icon'}>
          <CopyIcon />
        </Button>

        {manager.getOriginalVersionName() !== version.name && (
          <Button variant={'outline'} onClick={handleEdit} size={'icon'}>
            <PencilIcon />
          </Button>
        )}
      </div>
    </div>
  );
};

export default VersionListItem;
