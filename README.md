barnowl-test
============

The easiest way to get started with barnowl!
--------------------------------------------

[barnowl is a Node.js package](https://www.npmjs.org/package/barnowl) that identifies and locates all the advertising wireless devices within a [Smart Space](http://context.reelyactive.com).  barnowl-test is a simple way to evaluate barnowl regardless of whether or not you have access to [reelyActive technology](http://context.reelyactive.com/technology.html).

But what will it do?
--------------------

barnowl-test will serve up a webpage that lets you see all of the wireless devices detected in a space.  It will also output to the console the real-time stream of detected wireless transmissions.  Don't have reelyActive hardware?  No worries, by default barnowl-test will simulate the presence of hardware!

Install and run
---------------

    > $ git clone https://github.com/reelyactive/barnowl-test.git barnowl-test
    > $ cd barnowl-test
    > $ npm install
    > $ sudo node barnowl-test

If you're unfamiliar with the first step, simply copy barnowl-test.js and package.json to a local folder and then complete the remaining steps.

Is it working?
--------------

Do you see lines being output to the console?  Good!
Point your browser to http://127.0.0.1 - does it display a table?  Good!
What you're seeing are simulated wireless device transmissions that include an identifier, a timestamp and a signal strength (RSSI).

Moving beyond the default
-------------------------

If you have reelyActive hardware, tweak the code in the Hardware Configuration section at the bottom of barnowl-test.js.

Don't like how the HTML table looks with our CSS code?  Make your own CSS!

Beyond the barn
---------------

We hope that barnowl-test provides a solid perch from which to experiment and build.  We'd love to hear about your projects: [keep in touch with reelyActive via social media or e-mail](http://context.reelyactive.com/contact.html).

License
-------

MIT License
Copyright (c) 2014 reelyActive

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
THE SOFTWARE.
