# JsonProvider

`JsonProvider` is a NodeJs library that allows the application developer and library to quickly manage their storage or configuration files.

## Documentation

```javascript
const Config = require('jsonprovider');
const config = new Config('./config.json');
config.load();
```

* Save a value
```javascript
config.set("Hello", "World!");
config.save();
```

* Get a value
```javascript
let result = config.get("Hello");

// Output: World!
```

* Remove a value
```javascript
config.remove("Hello");
config.save();
```

* Get all value
```javascript
var all = config.getAll();
```

* Set value with array
```javascript
config.setNested("Hello", "text", "World!");
config.setNested("Hello", "boolean", true);
config.setNested("Hello", "number", 50);
config.save();
/* Result:
{
    "Hello": {
        "text": "World!",
        "boolean": true,
        "number": 50
    }
}
 */
```

* Remove value in array
```javascript
config.removeNested("Hello", "text");
config.save();
/* Result:
{
    "Hello": {
        "boolean": true,
        "number": 50
    }
}
 */
```

## Installation

Install with npm
```text
npm install configprovider