import React, { useState } from 'react';
import UXRefactoring from '@/refactorings/UXRefactoring';
import { Text } from '../ui/Text';
import { Button } from '../ui/button';
import { ArrowLeft, ArrowRight, PlusIcon } from 'lucide-react';
import { useRouter } from '@/routing/Router';

const AppliedRefactoring: React.FC<{ refactoring: UXRefactoring }> = ({
  refactoring,
}) => <p className="text-sm text-gray-700">{refactoring.print()}</p>;

const EditVersion: React.FC = () => {
  const manager = window.refactoringManager;

  const router = useRouter();

  const [appliedRefactorings, setAppliedRefactorings] = useState<
    UXRefactoring[]
  >(manager.getCurrentVersion().getRefactorings());

  const [dirtyRefactorings, setDirtyRefactorings] = useState<UXRefactoring[]>(
    manager.getDirtyRefactorings(),
  );

  const updateVersion = (): void => {
    (window as any).refactoringManager?.saveDirtyRefactorings();
    setAppliedRefactorings([...manager.getCurrentVersion().getRefactorings()]);
    setDirtyRefactorings([...manager.getDirtyRefactorings()]);
  };

  const handleBack = (): void => {
    router.show('VERSION_LIST');
  };

  const handleAddRefactoring = (): void => {
    router.show('REFACTORING_CATALOGUE');
  };

  return (
    <div className="flex flex-col gap-4">
      <Text className="text-center">
        Version {manager.getCurrentVersion().getName()}
      </Text>

      <div className="mx-2">
        <Text variant="h3">Refactorings Applied</Text>

        {appliedRefactorings.map((refactoring, i) => (
          <AppliedRefactoring refactoring={refactoring} key={i} />
        ))}

        <p className="text-base italic font-bold my-8">Unsaved Refactorings</p>

        {dirtyRefactorings.map((dirtyRefactoring, i) => (
          <AppliedRefactoring refactoring={dirtyRefactoring} key={i} />
        ))}

        {appliedRefactorings.length === 0 && dirtyRefactorings.length === 0 && (
          <Text variant="caption">This version has no refactorings.</Text>
        )}
      </div>

      <Button className="btn btn-warning" onClick={handleAddRefactoring}>
        <PlusIcon /> Add Refactoring
      </Button>

      <div className="flex gap-4">
        <Button variant={'outline'} onClick={handleBack}>
          <ArrowLeft /> Back
        </Button>
        <Button onClick={updateVersion}>
          Save <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default EditVersion;
