import React from 'react';
import ReactMarkdown from 'react-markdown';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';

const l1: string = '#### Accessing Screens...';
const t1: string = `ts c     Open Dashboard screen
ts m     Open Dashboard screen
ts a     Open Accounts screen
ts n     Open Names screen
ts e     Open Explorer screen
ts s     Open Settings screen
ts u     Open Support screen
ts k     Show hotkeys (this screen)`;

const l2: string = '#### Showing / Hiding Panels...';
const t2: string = `q l      Hide panels but contents
q a      Expand all panels
q h      Show / hide help panel
q m      Show / hide menu panel
q c      Show / hide content panel
q s      Show / hide status panel`;

const l3: string = '#### In the Explorer...';
const t3: string = `e b      View blocks
e t      View transactions
e r      View receipts
e l      View logs
e c      View traces`;

const l4: string = '#### When Viewing Tables...';
const t4: string = `Home     Go to the first page of data
End      Go to the last page of data
Left     Go to the previous page
Right    Go to the next page`;

export const HotKeys = () => (
  <>
    <ReactMarkdown>{l1}</ReactMarkdown>
    <SyntaxHighlighter>{t1}</SyntaxHighlighter>

    <ReactMarkdown>{l2}</ReactMarkdown>
    <SyntaxHighlighter>{t2}</SyntaxHighlighter>

    <ReactMarkdown>{l3}</ReactMarkdown>
    <SyntaxHighlighter>{t3}</SyntaxHighlighter>

    <ReactMarkdown>{l4}</ReactMarkdown>
    <SyntaxHighlighter>{t4}</SyntaxHighlighter>
  </>
);
