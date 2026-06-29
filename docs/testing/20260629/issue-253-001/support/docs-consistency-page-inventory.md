# Docs Consistency Page Inventory

Generated from deployed URLs only.

## https://eviltester.github.io/grid-table-editor/site/
- ok: true
- title: AnyWayData - Data Table Editor & Generator
- h1: AnyWayData - Data Table Editor & Generator
- h2: Generate Test Data Using Faker

## https://eviltester.github.io/grid-table-editor/site/app.html
- ok: true
- title: Test Data Generator and Table Editor for Markdown, CSV, JSON, Gherkin and HTML - AnyWayData

## https://eviltester.github.io/grid-table-editor/site/generator.html
- ok: true
- title: Data Generator - AnyWayData
- h1: Data Generator

## https://eviltester.github.io/grid-table-editor/generator.html
- ok: true
- title: Data Generator - AnyWayData
- h1: Data Generator

## https://eviltester.github.io/grid-table-editor/site/docs/intro/
- ok: true
- title: About | AnyWayData - Data Table Editor & Generator
- h1: About Data Table Editor and Generator
- h2: Main Editor Features:​ | Import/Output Features:​ | Test Data Generation Features​ | CLI Version - Windows, Mac, Linux​

## https://eviltester.github.io/grid-table-editor/site/docs/category/generating-data/
- ok: true
- title: Generating Data | AnyWayData - Data Table Editor & Generator
- h1: Generating Data
- h2: 📄️ Test Data Generation | 📄️ Data Grid Editable | 📄️ Generate to File | 📄️ Schema Definition | 📄️ Regex Based Data | 📄️ Literal Data | 📄️ Pairwise Testing | 📄️ N-Wise Testing | 🗃 Domain Test Data | 🗃 Faker Based Data

## https://eviltester.github.io/grid-table-editor/site/docs/test-data/test-data-generation/
- ok: true
- title: Test Data Generation | AnyWayData - Data Table Editor & Generator
- h1: Test Data Generation
- h2: Choose a Workflow​ | Data Types​ | Learn More About Rule Types​
- relevant code snippets:
  - `Literal`

## https://eviltester.github.io/grid-table-editor/site/docs/test-data/data-grid-editable/
- ok: true
- title: Data Grid Editable | AnyWayData - Data Table Editor & Generator
- h1: Data Grid Editable
- h2: What this page is best for​ | Test Data section in app.html​ | Grid to Enum Schema​ | Generate Modes in the Grid​ | Main grid context menu​ | Pairwise generation​ | Schema text area support​ | Schema constraints​ | Test Data Grid​ | Row count summary​
- relevant code snippets:
  - `Literal`
  - `Literal`

## https://eviltester.github.io/grid-table-editor/site/docs/test-data/generate-to-file/
- ok: true
- title: Generate to File | AnyWayData - Data Table Editor & Generator
- h1: Generate to File
- h2: What this page is best for​ | Typical workflow​ | Generation rule types​ | Pairwise generation​ | Relationship to app.html​
- relevant code snippets:
  - `Literal`

## https://eviltester.github.io/grid-table-editor/site/docs/test-data/Schema-Definition/
- ok: true
- title: Schema Definition | AnyWayData - Data Table Editor & Generator
- h1: Schema Definition
- h2: Basic schema format​ | Field rule examples​ | Switching text schemas back to the Schema UI​ | Comments and blank lines​ | Schema constraints​ | What constraints do​ | Parameter references​ | Supported operators​ | Logical operators​ | Constraint value types​
- relevant code snippets:
  - `Build literal(1.0.0)`
  - `Build literal(1.0.0)`
  - `literal(...)`

## https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker-test-data/
- ok: true
- title: Faker Based Data | AnyWayData - Data Table Editor & Generator
- h1: Faker Data Generation
- h2: Tips Video​ | Faker Scope​ | Faker API Reference​ | Direct Faker Examples​ | See Domain Examples​ | See Also​
- relevant code snippets:
  - `helpers.*`
  - `helpers.*`
  - `Sentence helpers.mustache("Hello {{name}}", { name: "Ada" })`
  - `Sentence helpers.mustache("Hello {{name}}", { name: "Ada" })`
  - `Sentence helpers.fake("Hi, my name is {{person.firstName}} {{person.lastName}}!")`
  - `Sentence helpers.fake("Hi, my name is {{person.firstName}} {{person.lastName}}!")`

## https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker/helpers/
- ok: true
- title: Faker Helpers | AnyWayData - Data Table Editor & Generator
- h1: Faker Helpers
- h2: Common Helper Examples​ | Helper Methods​ | Notes​ | Faker Reference​
- relevant code snippets:
  - `helpers.*`
  - `helpers.arrayElement(["red", "green", "blue"])`
  - `helpers.arrayElement(["red", "green", "blue"])`
  - `faker.helpers.arrayElement(["red", "green", "blue"])`
  - `faker.helpers.arrayElement(["red", "green", "blue"])`
  - `domain.helpers.arrayElement(["red", "green", "blue"])`
  - `domain.helpers.arrayElement(["red", "green", "blue"])`
  - `helpers.fake("Hi, my name is {{person.firstName}} {{person.lastName}}!")`
  - `helpers.fake("Hi, my name is {{person.firstName}} {{person.lastName}}!")`
  - `helpers.mustache("Hello {{name}}", { name: "Ada" })`

## https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/domain-test-data/
- ok: true
- title: Domain Test Data | AnyWayData - Data Table Editor & Generator
- h1: Domain Test Data
- h2: Quick Examples​ | Migration​ | Domains​
- relevant code snippets:
  - `helpers.*`
  - `Num number.int(min=32, max=47)`
  - `Num number.int(min=32, max=47)`
  - `domain.helpers.fake("...")`
  - `faker.helpers.fake("...")`
  - `helpers.fake("...")`

## https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/number/
- ok: true
- title: number Domain | AnyWayData - Data Table Editor & Generator
- h1: number Domain
- h2: Faker Documentation​ | Methods​
- relevant code snippets:
  - `number.int`
  - `awd.domain.number.int`

## https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/autoIncrement/
- ok: true
- title: autoIncrement Domain | AnyWayData - Data Table Editor & Generator
- h1: autoIncrement Domain
- h2: Methods​
- relevant code snippets:
  - `autoIncrement.sequence`
  - `awd.domain.autoIncrement.sequence`
  - `autoIncrement.sequence()`
  - `autoIncrement.sequence()`
  - `autoIncrement.sequence(start=10, step=5)`
  - `autoIncrement.sequence(start=10, step=5)`
  - `autoIncrement.sequence(start=1, step=5, prefix="filename", suffix=".txt", zeropadding=3)`
  - `autoIncrement.sequence(start=1, step=5, prefix="filename", suffix=".txt", zeropadding=3)`
  - `autoIncrement.sequence(start=10)`
  - `autoIncrement.sequence(start=10)`

## https://eviltester.github.io/grid-table-editor/site/docs/test-data/auto-increment-sequences/
- ok: true
- title: Auto Increment Sequences | AnyWayData - Data Table Editor & Generator
- h1: Auto Increment Sequences
- h2: Basic Usage​ | Start and Step​ | Prefix, Suffix, and Zero Padding​ | Constraint-Aware Sequences​ | Parameters​ | See Also​
- relevant code snippets:
  - `autoIncrement.sequence`
  - `Id autoIncrement.sequence()`
  - `Id autoIncrement.sequence()`
  - `Build autoIncrement.sequence(start=10, step=5)`
  - `Build autoIncrement.sequence(start=10, step=5)`
  - `Filename autoIncrement.sequence(start=1, step=5, prefix="filename", suffix=".txt", zeropadding=3)`
  - `Filename autoIncrement.sequence(start=1, step=5, prefix="filename", suffix=".txt", zeropadding=3)`
  - `Ticket autoIncrement.sequence(prefix="T-", zeropadding=4) Priority High,Low Status Open,Closed IF [Priority] = "High" THEN [Status] = "Open";`
  - `Ticket autoIncrement.sequence(prefix="T-", zeropadding=4) Priority High,Low Status Open,Closed IF [Priority] = "High" THEN [Status] = "Open";`

## https://eviltester.github.io/grid-table-editor/site/docs/interfaces-and-deployment/web-ui/
- ok: true
- title: Web UI | AnyWayData - Data Table Editor & Generator
- h1: Web UI
- h2: When To Use This​ | Quick Start (Hosted)​ | Local Run​ | Docker Run​ | Notes​

## https://eviltester.github.io/grid-table-editor/site/docs/interfaces-and-deployment/rest-api/
- ok: true
- title: REST API | AnyWayData - Data Table Editor & Generator
- h1: REST API
- h2: When To Use This​ | Quick Start​ | Local Run​ | Docker Run​ | Common Endpoints​ | Generate vs FromSchema​ | Schema Formatting​ | API Examples​ | Notes​
- relevant code snippets:
  - `curl -X POST http://localhost:3000/v1/generate \ -H "Content-Type: application/json" \ -d '{ "textSpec": "# literal values\n\nName\nBob\n\n# lower-case city\nCity\nlondon", "rowCount": 3, "outputFormat": "json" }'`
  - `curl -X POST http://localhost:3000/v1/generate \ -H "Content-Type: application/json" \ -d '{ "textSpec": "# literal values\n\nName\nBob\n\n# lower-case city\nCity\nlondon", "rowCount": 3, "outputFormat": "json" }'`

## https://eviltester.github.io/grid-table-editor/site/docs/interfaces-and-deployment/cli-node-and-bun/
- ok: true
- title: CLI (Node and Bun) | AnyWayData - Data Table Editor & Generator
- h1: CLI (Node and Bun)
- h2: When To Use This​ | Node/npm CLI​ | Schema Formatting​ | Behavior Notes​ | Amend Examples​ | Bun CLI​ | Safe Faker Expressions​ | Choose CLI vs API/MCP​
