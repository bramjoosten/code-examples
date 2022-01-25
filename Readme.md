# Code Examples
(for now just one)

# Stores CMS extension in Salesforce Commerce Cloud
This is an example a CMS extension, where a user would be able to edit store opening hours. It demonstrates client side React with hooks, and server side controller in Vanilla JS. This is how an extension would be built for Salesforce Commerce Cloud. Ive removed the client's name and references to obvious system functionality or code I have not written myself.

Breakdown
```bash
├── bm_extensions.xml       // Describes where the CMS extension goes
├── controllers
│   └── Stores.js           // Responsible for Start, getDetails and Save
├── static
│   └── default
│       ├── css
│       │   └── stores.css  // styling on top of styles already present in CMS
│       └── js
│           └── stores.js   // client side React js
└── templates
    ├── default
    │   └── listStores.isml // template, proprietary SFCC ISML templating language
    └── resources
        └── example.properties // translation file
```
bm_
(instructions It retreives the data through a controller, which passes the data to the template and gets picked up by a React-Dom implementation. One thing that could be improved is how the data is retreived: SFCC offers both an internal API as well as a REST API. In the example the internal one is used to get the initial data, where as the REST API is used to do the updates.