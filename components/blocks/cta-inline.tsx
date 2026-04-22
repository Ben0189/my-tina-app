import React from 'react';
import { TinaMarkdown, TinaMarkdownContent } from 'tinacms/dist/rich-text';
import type { Template } from 'tinacms';

export const Cta = (props: { text?: string }) => {
  return (
    <div className="my-6 rounded-xl border border-border bg-muted px-6 py-4 text-center">
      <p className="text-base font-medium">{props.text || 'Check this out!'}</p>
    </div>
  );
};

export const ctaInlineTemplate: Template = {
  name: 'Cta',
  label: 'Call to Action (Inline)',
  fields: [
    {
      name: 'text',
      label: 'Text',
      type: 'string',
    },
  ],
};
