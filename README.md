# track-object-history

`track-object-history` provides a simple function with which you can wrap your object in a [proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) that automatically tracks mutations to said object.

It has a couple of use cases:

- debugging mutation-heavy code
- simple time travel capabilities

However, if you find yourself reaching for this package, you might want to consider rewriting your code in a immutable fashion instead.

## Installation

```bash
npm install track-object-history
```

## Usage

Supports the most common ways of mutating an object, i.e. reassigning, deleting and defining properties.

### Basic example

```javascript
import { trackObjectHistory } from "track-object-history";

const [form, history] = trackObjectHistory({
  firstName: "",
  lastName: ""
});

form.firstName = "John";
console.log(form); // { firstName: "John", lastName: "" }
console.log(history); // [{ firstName: "", lastName: "" }]

form.lastName = "Doe";

console.log(form); // { firstName: "John", lastName: "Doe" }
console.log(history); // [{ firstName: "John", lastName: "" }]
```
