import React, { useState } from 'react';
import { useFrame } from 'react-frame-component';
import { Button } from './ui/button';
import { ArrowDown, ArrowUp } from 'lucide-react';

const WindowControl: React.FC = () => {
  const [hidden, setHidden] = useState<boolean>(false);
  const frame = useFrame();

  const toggleView = (): void => {
    const root = document.querySelector(
      '#ux-painter-root',
    ) as HTMLElement | null;
    const container = frame.document?.querySelector(
      '#main-content',
    ) as HTMLElement | null;

    if (!root || !container) {
      console.error('Root or container element not found');
      return;
    }

    container.style.display = hidden ? '' : 'none';
    root.classList.toggle('opened');
    root.classList.toggle('closed');
    setHidden(!hidden);
  };

  return (
    <Button
      onClick={toggleView}
      className="m-2"
      aria-label={hidden ? 'Expand' : 'Collapse'}
      variant={'outline'}
      size={'icon'}
    >
      {hidden ? <ArrowDown /> : <ArrowUp />}
    </Button>
  );
};

export default WindowControl;
