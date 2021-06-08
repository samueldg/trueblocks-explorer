import React from 'react';
import ReactMarkdown from 'react-markdown';

const contact: string = `#### Free Support
* Email support: [support@trueblocks.io](mailto:support@trueblocks.io)
* Online forums: [https:discord.gg/zGh6PdN](https:discord.gg/zGh6PdN)
* Free support during installation and setup

#### Per Incident Support

* $95 US per hour until resolved
* Pay in Ether for a 10% discount

#### Support Plans

* 5 per-incident issue packs (10% discount)
* Annual subscription (20% discount)
`;

export const Contact = () => (
  <div style={{width: '50%'}}>
    <ReactMarkdown>{contact}</ReactMarkdown>
  </div>
);
