import React from 'react';
import ReactMarkdown from 'react-markdown';

const documentation: string = `
#### Documentation

* All of our documentation is on [this site](https://docs.trueblocks.io).
* Introductory text is [here](https://docs.trueblocks.io/docs/prologue/introduction/).
* Documentation about our command line tool **chifra** is [here](https://docs.trueblocks.io/docs/prologue/introducing-chifra/).
* Help for the TrueBlocks Account Explorer (this application) is [here](https://docs.trueblocks.io/docs/explorer/getting-started/).
* Our blog is [here](https://docs.trueblocks.io/blog/).
`;

export const Documentation = () => (
    <div style={{width: "50%"}}>
      <ReactMarkdown>
        {documentation}
      </ReactMarkdown>
    </div>
);
