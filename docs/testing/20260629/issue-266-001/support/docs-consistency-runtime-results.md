# Docs Consistency Runtime Checks

## schema-enum-basic

Docs Schema Definition basic enum example.

Schema:
```
Status
enum("Open","In Progress","Closed")
```

Screenshot: docs-consistency-runtime-schema-enum-basic.png

Preview:
```
"Status"
"Closed"
"Open"
"Open"
"In Progress"
"Closed"
"Closed"
"Closed"
"In Progress"
"In Progress"
"In Progress"
```

Body excerpt:
- Schema
- Edit as Schema
- Load Schema File
- Save Schema File
- Managed Stored Schemas (0)
- Generate Rows

## schema-inline-enum

Docs compact inline enum example.

Schema:
```
Browser: Chrome,Firefox,Safari
Theme: Light,Dark
```

Screenshot: docs-consistency-runtime-schema-inline-enum.png

Preview:
```
"Browser","Theme"
"Chrome","Light"
"Firefox","Dark"
"Safari","Dark"
"Safari","Light"
"Safari","Dark"
"Safari","Light"
"Chrome","Dark"
"Safari","Dark"
"Safari","Dark"
"Safari","Light"
```

Body excerpt:
- Schema
- Edit as Schema
- Load Schema File
- Save Schema File
- Managed Stored Schemas (0)
- Generate Rows
- Browser

## schema-domain-datatype-enum

PR #243 domain datatype.enum bare-value drift probe.

Schema:
```
State
datatype.enum(active,inactive,pending)
```

Screenshot: docs-consistency-runtime-schema-domain-datatype-enum.png

Preview:
```
(empty)
```

Body excerpt:
- Schema
- State failed domain validation - Invalid keyword arguments: bare values are not allowed; wrap strings in quotes
- Edit as Schema
- Load Schema File
- Save Schema File
- Managed Stored Schemas (0)
- Generate Rows

## schema-domain-datatype-enum-csv

Documented PR #243 datatype.enum csv keyword form from pairwise docs.

Schema:
```
State
datatype.enum(csv="active,inactive,pending")
```

Screenshot: docs-consistency-runtime-schema-domain-datatype-enum-csv.png

Preview:
```
"State"
"active"
"inactive"
"active"
"active"
"inactive"
"pending"
"inactive"
"inactive"
"inactive"
"pending"
```

Body excerpt:
- Schema
- Edit as Schema
- Load Schema File
- Save Schema File
- Managed Stored Schemas (0)
- Generate Rows

## schema-domain-awd-datatype-enum-csv

Documented AWD-prefixed enum command form from pairwise docs.

Schema:
```
State
awd.datatype.enum(csv="active,inactive,pending")
```

Screenshot: docs-consistency-runtime-schema-domain-awd-datatype-enum-csv.png

Preview:
```
"State"
"inactive"
"pending"
"inactive"
"active"
"inactive"
"active"
"active"
"inactive"
"inactive"
"pending"
```

Body excerpt:
- Schema
- Edit as Schema
- Load Schema File
- Save Schema File
- Managed Stored Schemas (0)
- Generate Rows

## schema-faker-http-method

PR #247 command picker previous happy-path command.

Schema:
```
Method
internet.httpMethod(commonOnly=true)
```

Screenshot: docs-consistency-runtime-schema-faker-http-method.png

Preview:
```
"Method"
"POST"
"POST"
"PUT"
"GET"
"PUT"
"HEAD"
"PUT"
"HEAD"
"DELETE"
"POST"
```

Body excerpt:
- Schema
- Edit as Schema
- Load Schema File
- Save Schema File
- Managed Stored Schemas (0)
- Generate Rows

## schema-helper-unique-array

Deployed catalog usage example for helpers.uniqueArray.

Schema:
```
Colours
helpers.uniqueArray(["red", "green", "blue"], 2)
```

Screenshot: docs-consistency-runtime-schema-helper-unique-array.png

Preview:
```
[
	{
		"Colours": "[\"green\",\"blue\"]"
	},
	{
		"Colours": "[\"blue\",\"red\"]"
	},
	{
		"Colours": "[\"blue\",\"green\"]"
	},
	{
		"Colours": "[\"green\",\"red\"]"
	},
	{
		"Colours": "[\"blue\",\"red\"]"
	},
	{
		"Colours": "[\"red\",\"green\"]"
	},
	{
		"Colours": "[\"red\",\"green\"]"
	},
	{
		"Colours": "[\"blue\",\"red\"]"
	},
	{
		"Colours": "[\"red\",\"blue\"]"
	},
	{
		"Colours": "[\"blue\",\"red\"]"
	}
]
```

Body excerpt:
- Schema
- Edit as Schema
- Load Schema File
- Save Schema File
- Managed Stored Schemas (0)
- Generate Rows

## schema-helper-unique-array-callback

Callback-style helpers.uniqueArray path mentioned in prior runtime work.

Schema:
```
Words
helpers.uniqueArray(faker.word.sample, 3)
```

Screenshot: docs-consistency-runtime-schema-helper-unique-array-callback.png

Preview:
```
[
	{
		"Words": "[\"futon\",\"brr\",\"boo\"]"
	},
	{
		"Words": "[\"yowza\",\"boohoo\",\"woot\"]"
	},
	{
		"Words": "[\"astride\",\"ew\",\"unfortunately\"]"
	},
	{
		"Words": "[\"ha\",\"encouragement\",\"aw\"]"
	},
	{
		"Words": "[\"quick\",\"boo\",\"gloomy\"]"
	},
	{
		"Words": "[\"beyond\",\"highly\",\"request\"]"
	},
	{
		"Words": "[\"capitalise\",\"throughout\",\"hmph\"]"
	},
	{
		"Words": "[\"keenly\",\"represent\",\"powerless\"]"
	},
	{
		"Words": "[\"almost\",\"furthermore\",\"why\"]"
	},
	{
		"Words": "[\"patiently\",\"excluding\",\"lest\"]"
	}
]
```

Body excerpt:
- Schema
- Edit as Schema
- Load Schema File
- Save Schema File
- Managed Stored Schemas (0)
- Generate Rows

## schema-helper-unique-array-doc-this

Published Faker Helpers docs example using this.word.sample.

Schema:
```
Words
helpers.uniqueArray(this.word.sample, 5)
```

Screenshot: docs-consistency-runtime-schema-helper-unique-array-doc-this.png

Preview:
```
(empty)
```

Body excerpt:
- Schema
- Words failed faker validation - Invalid Faker API Call Unsafe faker rule syntax detected: requires complex argument parsing
- Edit as Schema
- Load Schema File
- Save Schema File
- Managed Stored Schemas (0)
- Generate Rows

## schema-legacy-lorem-flickr

Removed/deprecated Faker image command drift candidate.

Schema:
```
Image
image.urlLoremFlickr()
```

Screenshot: docs-consistency-runtime-schema-legacy-lorem-flickr.png

Preview:
```
(empty)
```

Body excerpt:
- Schema
- Image failed domain validation - Unknown keyword: image.urlLoremFlickr
- Edit as Schema
- Load Schema File
- Save Schema File
- Managed Stored Schemas (0)
- Generate Rows

## schema-unknown-command

Docs say unknown command-like text should be schema error.

Schema:
```
Bad
person.notACommand()
```

Screenshot: docs-consistency-runtime-schema-unknown-command.png

Preview:
```
(empty)
```

Body excerpt:
- Schema
- Bad failed domain validation - Unknown keyword: person.notACommand
- Edit as Schema
- Load Schema File
- Save Schema File
- Managed Stored Schemas (0)
- Generate Rows

## schema-basic-constraint

Docs copy-paste constraint example.

Schema:
```
Priority
enum("High","Low")
Status
enum("Open","Closed")
IF [Priority] = "High" THEN [Status] = "Open";
```

Screenshot: docs-consistency-runtime-schema-basic-constraint.png

Preview:
```
"Priority","Status"
"Low","Open"
"Low","Closed"
"High","Open"
"High","Open"
"Low","Open"
"High","Open"
"High","Open"
"Low","Closed"
"Low","Closed"
"Low","Closed"
```

Body excerpt:
- Schema
- Edit as Schema
- Load Schema File
- Save Schema File
- Managed Stored Schemas (0)
- Generate Rows

## method-picker-domain

Screenshot: docs-consistency-runtime-method-picker-domain.png

Body excerpt:
- enum
- domain
- faker
- Select domain command
- Select domain command
- datatype.boolean
- datatype.enum
- internet.domainName
- internet.domainSuffix
- internet.domainWord
- internet.httpMethod
- internet.httpStatusCode
- person.fullName
