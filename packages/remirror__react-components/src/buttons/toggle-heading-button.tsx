import React, {FC, useCallback} from 'react';
import { HeadingExtension, HeadingExtensionAttributes } from 'remirror/extensions';
import { useActive, useCommands } from '@remirror/react-core';

import { BaseCommandButton, BaseCommandButtonProps } from './base-command-button';

export interface ToggleHeadingButtonProps
  extends Omit<
    BaseCommandButtonProps,
    'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'
  > {
  attrs?: Partial<HeadingExtensionAttributes>;
}

export const ToggleHeadingButton: FC<ToggleHeadingButtonProps> = ({ attrs , ...rest }) => {
  const { toggleHeading } = useCommands<HeadingExtension>();

  const handleSelect = useCallback(() => {
    if (toggleHeading.enabled(attrs)) {
      toggleHeading(attrs);
    }
  }, [toggleHeading, attrs]);

  const active = useActive<HeadingExtension>().heading(attrs);
  const enabled = toggleHeading.enabled(attrs);

  return (
    <BaseCommandButton
      {...rest}
      commandName='toggleHeading'
      active={active}
      enabled={enabled}
      attrs={attrs}
      onSelect={handleSelect}
    />
  );
};
