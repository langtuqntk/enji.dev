/* eslint-disable react/no-array-index-key */
import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import { Children } from 'react';

import { Pre } from '@/components/mdx/custom-components/Pre';

import { formatLang } from '@/helpers/mdx';

import type { PreProps } from '@/components/mdx/custom-components/Pre';
import type { PropsWithChildren, ReactElement } from 'react';

function CBTabWindow({ children = null }: PropsWithChildren) {
  return (
    <Tab className={clsx('mdx-code-group__tab-window')}>
      {({ selected }) => (
        <div className={clsx('mdx-code-group__tab-window-content')}>
          {selected && (
            <>
              <div className={clsx('mdx-code-group__tab-window-bl')} />
              <div className={clsx('mdx-code-group__tab-window-br')} />
            </>
          )}
          {children}
        </div>
      )}
    </Tab>
  );
}

function CBTab({ children = null }: PropsWithChildren) {
  return <Tab className={clsx('mdx-code-group__tab')}>{children}</Tab>;
}

interface CodeGroupProps {
  children: ReactElement<PreProps> | ReactElement<PreProps>[];
  variant?: 'window' | 'tab';
}

function CodeGroup({ variant = 'tab', children }: CodeGroupProps) {
  const tab: Array<{
    icon: ReactElement;
    title: string;
    panel: ReactElement<PreProps>;
  }> = [];

  Children.forEach(children, (child) => {
    if (child.type === Pre) {
      const title = child.props['data-title'] || '';
      const language = child.props['data-language'] || '';

      const { icon } = formatLang(language, title);

      tab.push({
        icon,
        title,
        panel: child,
      });
    }
  });

  return (
    <div
      className={clsx('mdx-code-group', [
        variant === 'window' ? 'mdx-code-group--window' : 'mdx-code-group--tab',
      ])}
    >
      <Tab.Group manual>
        <div className={clsx('mdx-code-group__header')}>
          <Tab.List className={clsx('mdx-code-group__tabs')}>
            {tab.map(({ title, icon }, idx) =>
              variant === 'window' ? (
                <CBTabWindow key={idx}>
                  {icon}
                  {title}
                </CBTabWindow>
              ) : (
                <CBTab key={idx}>
                  {icon}
                  {title}
                </CBTab>
              )
            )}
          </Tab.List>
        </div>
        <Tab.Panels className={clsx('mdx-code-group__contents')}>
          {tab.map(({ panel }, idx) => (
            <Tab.Panel key={idx}>{panel}</Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default CodeGroup;