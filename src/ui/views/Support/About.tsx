import React from 'react';
import ReactMarkdown from 'react-markdown';

const about: string = `
### Recent History

In **late 2015** and **early 2016**, we became completely obsessed with **The DAO**. We were among the first 
participants in The DAO's discussion site, DaoHub and the Ninja Warrior Training. We created a number
of ancillary websites (now defunct): http://doadeepdive.com, http://whalewatch.io, http://daowatch.io, and during
this time, we released our first blockchain-based product, [EthSlurp™](http://ethslurp.io). While we spent countless
hours studying the DAO's smart contract, we completely missed the hack.

Since the **fall of 2016**, we’ve been working on the TrueBlocks™ system which is the software you are running here.
Our goal was to make understanding, visualizing, and analyzing smart contract data easier. During **2017**, we accomplished
the task of NOT doing an ICO, which means we are self funded through grants, tips, and your purchase of this software.

In **2018**, we received an [Ethereum Foundation grant](https://blog.ethereum.org/2018/10/15/ethereum-foundation-grants-update-wave-4/).
This allowed us to open source parts of our trueblocks-core repo. **Recently**, we received a
[Consensys Grant](https://consensys.net/grants/) which has helped us continue our work.

### Middle History

We spent a few years pursuing other passions ([poetry](http://stonylanepress.org) and
[furniture design](http://furniture.greathill.com) among them)

### Ancient History

**TrueBlocks, LLC** (formerly **Great Hill Corporation**) has been providing internet-based software since
prior to the World Wide Web. In 1996, we released the first version of [Calendars for the Web](http://calendarhost.com)™,
our popular, interactive, web-based calendaring/scheduling system. We’ve been delivering this monthly Software-as-a-Service
(SaaS) for nearly 25 years to 1,000s of clients who use it to coordinate shared resources such as medical equipment, meeting
rooms, and even trucking assignments among their many users.

![image](http://www.calendarhost.com/samples/calweb/cw_images/logo.gif)

Our claim to fame is that Calendars for the Web™ appears to be the longest, continually-running web-based software
product on the web. We've been profitable every years since 1997. Our dedication to delivering quality software and
customer support is reflected in our long, fruitful relationships with our many clients. We continue to sell this
same software today and serve many active daily users.
`;

export const About = () => (
    <div style={{width: "50%"}}>
      <ReactMarkdown>
        {about}
      </ReactMarkdown>
    </div>
);

/*
      */
