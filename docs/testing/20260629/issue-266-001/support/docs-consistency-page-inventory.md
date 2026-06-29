## AnyWayData - Data Table Editor & Generator

https://eviltester.github.io/grid-table-editor/site/

Headings: H1:AnyWayData - Data Table Editor & Generator | H3:Easy to Use | H3:Import and Export Data | H3:Random Data Generation | H2:Generate Test Data Using Faker

Relevant excerpts:
- Skip to main content AnyWayData App Docs Blog GitHub AnyWayData - Data Table Editor & Generator Edit and Generate Test Data in Your Browser Use The Application Easy to Use The Data Table Editor is designed to be easy to use and uses the Tabulator Data Grid to create an intuitive editing experience.
- Import and Export Data Any Data Grid of data can be converted to multiple table formats e.g.
- Random Data Generation You can Generate random data in a Data Grid to use for testing.
- Generate as many rows as your computer can handle.
- 1,000,000 sure, it might take 30 seconds or so, but if your computer can handle it, we can generate it.
- Generate Test Data Using Faker It is possible to easily generate random data into the Data Grid for editing or export.

Relevant code/examples:
- None captured

---

## About | AnyWayData - Data Table Editor & Generator

https://eviltester.github.io/grid-table-editor/site/docs/intro

Headings: H1:About Data Table Editor and Generator | H2:Main Editor Features:​ | H2:Import/Output Features:​ | H2:Test Data Generation Features​ | H2:CLI Version - Windows, Mac, Linux​ | H3:CLI on Mac​

Relevant excerpts:
- Skip to main content AnyWayData App Docs Blog GitHub Docs Documentation About Editing Data Editable Data Grid Import From File Text Editing Exporting Data Data Formats Generating Data Misc Related Tools Video Tutorials Faker Test Data Interfaces & Deployment Overview Web UI REST API MCP CLI (Node and Bun) DocsAbout About Data Table Editor and Generator A Simple Data Table Editor and Test Data Generator.
- Main Editor Features:​ Load Data into an editable Data Grid Sort and Filter Data in the grid Filter globally across all fields Edit data in the grid itself Add new columns Rename Columns Re-order columns Re-order rows Export Data to files Add new rows to the table Delete selected rows from the table Edit as text and import into the data grid Import/Output Features:​ Import Markdown Tables for editing Import CSV files for editing Import JSON files for editing Import Gherkin tables for editing Export Data Grid as Markdown Export Data Grid as CSV Export Data Grid as JSON Export Data Grid as Gherkin Table format Export Data Grid as HTML Export Data as File Export Data to Clipboard Drag and Drop files to import data Test Data Generation Features​ Define Columns in an editable Grid Define Test Data as Regular Expressions Define Test Data using Faker.js functions Define Test Data as Literal values Define Test Data as Enum values (comma-separated lists) Generate pairwise combinatorial test data for optimal coverage across enum parameters No limit to the number of rows you can generate CLI Version - Windows, Mac, Linux​ An experimental CLI version is available to download from the releases page on Github.
- given an input file called faker-regex.txt Company company.name Regex Generated Field [A-Z]{3,6}[0-9]{0,6} The following command would generate 3000 records into output.txt ./anywaydata generate –i ./company.txt -n 3000 –o output.txt Example output: "Company","Regex Generated Field" "Jones and Sons","QZRGC" "Kunze, Morissette and Daniel","YMHV89" "Cole, Padberg and Cronin","QGG" CLI on Mac​ For Mac you will need to give the application permissions to run.
- xattr -dr com.apple.quarantine "$(pwd)/anywaydata" Set as executable in command line: chmod +x anywaydata Built by Alan Richardson Using: Tabulator Data Grid RandExp.js Faker.js PapaParse [github source] Previous Documentation Next Editing Data Main Editor Features: Import/Output Features: Test Data Generation Features CLI Version - Windows, Mac, Linux CLI on Mac Docs Tutorial Privacy Policy About Contact Community Twitter More Blog GitHub Copyright © 2026 Compendium Developments Ltd.

Relevant code/examples:
- `Companycompany.nameRegex Generated Field[A-Z]{3,6}[0-9]{0,6}`
- `Companycompany.nameRegex Generated Field[A-Z]{3,6}[0-9]{0,6}`
- `./anywaydata generate –i ./company.txt -n 3000 –o output.txt`
- `./anywaydata generate –i ./company.txt -n 3000 –o output.txt`
- `"Company","Regex Generated Field""Jones and Sons","QZRGC""Kunze, Morissette and Daniel","YMHV89""Cole, Padberg and Cronin","QGG"`
- `"Company","Regex Generated Field""Jones and Sons","QZRGC""Kunze, Morissette and Daniel","YMHV89""Cole, Padberg and Cronin","QGG"`

---

## Generating Data | AnyWayData - Data Table Editor & Generator

https://eviltester.github.io/grid-table-editor/site/docs/category/generating-data

Headings: H1:Generating Data | H2:📄️Test Data Generation | H2:📄️Data Grid Editable | H2:📄️Generate to File | H2:📄️Schema Definition | H2:📄️Regex Based Data | H2:📄️Literal Data | H2:📄️Pairwise Testing | H2:📄️N-Wise Testing | H2:🗃Domain Test Data | H2:🗃Faker Based Data | H2:📄️Counterstrings | H2:📄️Auto Increment Sequences

Relevant excerpts:
- Skip to main content AnyWayData App Docs Blog GitHub Docs Documentation About Editing Data Editable Data Grid Import From File Text Editing Exporting Data Data Formats Generating Data Test Data Generation Data Grid Editable Generate to File Schema Definition Regex Based Data Literal Data Pairwise Testing N-Wise Testing Domain Test Data Faker Based Data Counterstrings Auto Increment Sequences Misc Related Tools Video Tutorials Faker Test Data Interfaces & Deployment Overview Web UI REST API MCP CLI (Node and Bun) DocsGenerating Data Generating Data The Data can be populated with randomly generated data using a data set definition with field types from Faker, Regular Expressions, or pairwise combinatorial testing for enum parameters.
- 📄️ Data Grid Editable Use app.html for interactive, grid-first test-data editing and generation.
- 📄️ Generate to File Use generator.html for schema-first data generation with output preview and direct file download.
- 📄️ Regex Based Data Generate data from Regex 📄️ Literal Data Generate static test data values using the Literal data option.
- Literal values are fixed text and are repeated for every generated row.
- 📄️ Pairwise Testing Generate efficient test data combinations using pairwise combinatorial testing 📄️ N-Wise Testing Generate n-wise combinatorial test data from enum columns, compare generation strategies, and choose a strategy based on coverage strength and row count.
- 📄️ Auto Increment Sequences Generate sequential values that only advance when a row is accepted.

Relevant code/examples:
- None captured

---

## Faker Based Data | AnyWayData - Data Table Editor & Generator

https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker-test-data

Headings: H1:Faker Data Generation | H2:Tips Video​ | H2:Faker Scope​ | H2:Faker API Reference​ | H2:Direct Faker Examples​ | H2:See Domain Examples​ | H2:See Also​

Relevant excerpts:
- Skip to main content AnyWayData App Docs Blog GitHub Docs Documentation About Editing Data Editable Data Grid Import From File Text Editing Exporting Data Data Formats Generating Data Test Data Generation Data Grid Editable Generate to File Schema Definition Regex Based Data Literal Data Pairwise Testing N-Wise Testing Domain Test Data Faker Based Data Faker Helpers Counterstrings Auto Increment Sequences Misc Related Tools Video Tutorials Faker Test Data Interfaces & Deployment Overview Web UI REST API MCP CLI (Node and Bun) DocsGenerating DataFaker Based Data Faker Data Generation Faker.js is a test data generation library for JavaScript.
- AnyWayData supports Faker commands directly via the faker source path, and also via a curated Domain abstraction.

Relevant code/examples:
- None captured

---

## Schema Definition | AnyWayData - Data Table Editor & Generator

https://eviltester.github.io/grid-table-editor/site/docs/test-data/Schema-Definition

Headings: H1:Schema Definition | H2:Basic schema format​ | H2:Field rule examples​ | H3:Literal values​ | H3:Enum values​ | H3:Regex values​ | H3:Domain and Faker-style methods​ | H2:Switching text schemas back to the Schema UI​ | H2:Comments and blank lines​ | H2:Schema constraints​ | H2:What constraints do​ | H2:Parameter references​ | H2:Supported operators​ | H3:Equality and comparison​ | H3:LIKE​ | H3:NOT LIKE​ | H3:IN​ | H3:NOT IN​ | H2:Logical operators​ | H3:AND example​ | H3:OR example​ | H3:NOT example​ | H2:Constraint value types​ | H3:Parameter-to-parameter comparison​ | H2:Validation rules for constraints​ | H3:Unknown columns are rejected​ | H3:Invalid enum values are rejected​ | H3:Invalid regex values are rejected​ | H3:Impossible literal comparisons are rejected​ | H2:Generation-time constraint failures​ | H2:Pairwise and n-wise constraints​ | H2:Copy-paste examples​ | H3:Example 1: Basic enum dependency​ | H3:Example 2: Multiple allowed trigger values with IN​ | H3:Example 3: NOT IN inverse rule​ | H3:Example 4: Regex-triggered routing​ | H3:Example 5: Combined conditions with AND​ | H3:Example 6: Grouped logic with OR and parentheses​ | H3:Example 7: Numeric comparison​ | H3:Example 8: Using ENDIF instead of semicolon​ | H2:Summary​

Relevant excerpts:
- Skip to main content AnyWayData App Docs Blog GitHub Docs Documentation About Editing Data Editable Data Grid Import From File Text Editing Exporting Data Data Formats Generating Data Test Data Generation Data Grid Editable Generate to File Schema Definition Regex Based Data Literal Data Pairwise Testing N-Wise Testing Domain Test Data Faker Based Data Counterstrings Auto Increment Sequences Misc Related Tools Video Tutorials Faker Test Data Interfaces & Deployment Overview Web UI REST API MCP CLI (Node and Bun) DocsGenerating DataSchema Definition Schema Definition The schema editor in app.html and generator.html uses a plain text format.
- This page explains: how field rules are written how schema constraints are written which operators are supported how constraints affect generated data copy-paste examples you can use directly in the tool Basic schema format​ A schema is usually written as repeating two-line field definitions: Column Name rule definition Example: Status enum("Open","In Progress","Closed") This creates one output column called Status.
- You can also use a compact inline form when you prefer a PICT-style layout: Status: enum("Open","In Progress","Closed") For enum-heavy schemas, a shorter name: values form is also supported: Browser: Chrome,Firefox,Safari Theme: Light,Dark Both formats are supported, and you can mix them in the same schema.
- Field rule examples​ Literal values​ Use a literal when every generated row should contain the same value.
- Build literal(1.0.0) This always generates 1.0.0.
- Priority enum("High","Medium","Low") This generates one of High, Medium, or Low.
- Ticket Id regex([A-Z]{3}-\d{4}) This generates values such as ABC-1234.
- Raw regex patterns are still accepted for quick entry when the text does not look like a command.
- For example, GET,POST,PUT is treated as enum("GET","POST","PUT").
- Use regex(...) or enum(...) when you want the intent to be completely explicit.
- Command-like text is validated as a command before regex or literal shorthand is considered.
- A dotted identifier such as person.fullName, person.fullName(), person.notACommand, or person.notACommand() must resolve to a supported AnyWayData domain command or allowed Faker helper.
- Unknown command-like text is reported as a schema error instead of being interpreted as regex or literal text.
- To use command-looking text as data, wrap it explicitly with literal(...); to use it as a regex, wrap it explicitly with regex(...).
- Domain and Faker-style methods​ Use a domain method for realistic generated values.
- Customer Name person.fullName CreatedAt autoIncrement.timestamp(start="2026-06-12T12:39:23Z", step=1, type="seconds") The Customer Name example generates names such as Alice Smith.
- The CreatedAt example generates deterministic timestamps for time-ordered rows.
- Example: # Core workflow fields Priority enum("High","Medium","Low") # User-facing status Status enum("Open","Closed") Schema constraints​ Schema constraints restrict which combinations of values are allowed.
- For example: Priority enum("High","Low") Status enum("Open","Closed") IF [Priority] = "High" THEN [Status] = "Open"; Meaning: rows with Priority = High are only valid if Status = Open rows with Priority = Low can have either Open or Closed So High + Closed should never appear in generated output.
- Unknown columns are rejected​ This is invalid because [Severity] is not defined in the schema: Priority enum("High","Low") IF [Severity] = "Critical" THEN [Priority] = "High"; Invalid enum values are rejected​ This is invalid because Urgent is not in the enum: Priority enum("High","Medium","Low") IF [Priority] = "Urgent" THEN [Priority] = "High"; Invalid regex values are rejected​ This is invalid because bob does not match the regex: Ticket Id regex([A-Z]{3}-\d{4}) IF [Ticket Id] = "bob" THEN [Status] = "Open"; Impossible literal comparisons are rejected​ This is invalid because the only literal value is Closed: Status literal(Closed) IF [Status] = "Closed" THEN [Status] = "Open"; Generation-time constraint failures​ Some constraints are syntactically valid and can reference valid columns and values, but still make row generation impossible.
- Example: Status enum("Open","Closed") IF [Status] = "Open" THEN [Status] = "Closed"; IF [Status] = "Closed" THEN [Status] = "Open"; Illustrates: a schema that parses correctly constraints that use valid enum values a rule set that makes every possible row invalid Meaning: if Status is Open, the row is only valid when Status is Closed if Status is Closed, the row is only valid when Status is Open no generated row can satisfy both possibilities When this happens, the tool reports: Schema Constraints are impacting row generation - generated X rows, failed to generate Y rows.
- Important: this condition is only found and reported during generation care must be taken when writing constraints, especially when combining multiple rules a schema can be structurally valid but still impossible to generate data from Pairwise and n-wise constraints​ Constraints are supported during pairwise and n-wise generation only when every referenced constrained field is an enum column.
- That means: constrained pairwise and n-wise generation works best for enum-only decision tables if a constraint references non-enum fields such as regex, literal, or domain-generated values, normal random generation is supported, but combinatorial generation is not Copy-paste examples​ Each example below is complete and can be pasted directly into the tool.
- Example 1: Basic enum dependency​ Illustrates: enum fields simple equality constraint Priority enum("High","Medium","Low") Status enum("Open","Queued","Closed") IF [Priority] = "High" THEN [Status] = "Open"; Meaning: High priority rows must use Open Example 2: Multiple allowed trigger values with IN​ Illustrates: IN set-based trigger conditions Priority enum("Critical","High","Medium","Low") Escalated enum("Yes","No") IF [Priority] IN {"Critical","High"} THEN [Escalated] = "Yes"; Meaning: Critical and High rows must be escalated Example 3: NOT IN inverse rule​ Illustrates: NOT IN inverse constraint logic Priority enum("Critical","High","Medium","Low") Escalated enum("Yes","No") IF [Priority] NOT IN {"Critical","High"} THEN [Escalated] = "No"; Meaning: Medium and Low rows must not be escalated Example 4: Regex-triggered routing​ Illustrates: regex field definition LIKE Ticket Id regex([A-Z]{3}-\d{4}) Queue enum("Support","QA","Ops") IF [Ticket Id] LIKE "QA-*" THEN [Queue] = "QA"; Meaning: values starting with QA- must use the QA queue Example 5: Combined conditions with AND​ Illustrates: AND multiple field dependency Priority enum("High","Low") Status enum("Open","Closed") Owner enum("Alice","Bob","") IF [Priority] = "High" AND [Status] = "Open" THEN [Owner] <> ""; Meaning: a high-priority open item must have an owner Example 6: Grouped logic with OR and parentheses​ Illustrates: OR parentheses Region enum("UK","IE","US","CA") Currency enum("GBP","USD","CAD") IF ([Region] = "UK" OR [Region] = "IE") THEN [Currency] = "GBP"; Meaning: both UK and IE rows must use GBP Example 7: Numeric comparison​ Illustrates: numeric comparison >= Age number.int({"min": 16, "max": 21}) Access enum("Restricted","Adult") IF [Age] >= 18 THEN [Access] = "Adult"; Meaning: anyone aged 18 or older must have Adult access Example 8: Using ENDIF instead of semicolon​ Illustrates: ENDIF terminator Priority enum("High","Low") Status enum("Open","Closed") IF [Priority] = "High" THEN [Status] = "Open" ENDIF Meaning: same as the semicolon form the choice of terminator is author preference Summary​ Use schema constraints when generated rows need business rules, dependencies, or realistic combinations.
- terminate constraints with ; or ENDIF use <> rather than != use constraints to filter invalid rows, not to mutate rows after generation Previous Generate to File Next Regex Based Data Basic schema format Field rule examples Literal values Enum values Regex values Domain and Faker-style methods Switching text schemas back to the Schema UI Comments and blank lines Schema constraints What constraints do Parameter references Supported operators Equality and comparison LIKE NOT LIKE IN NOT IN Logical operators AND example OR example NOT example Constraint value types Parameter-to-parameter comparison Validation rules for constraints Unknown columns are rejected Invalid enum values are rejected Invalid regex values are rejected Impossible literal comparisons are rejected Generation-time constraint failures Pairwise and n-wise constraints Copy-paste examples Example 1: Basic enum dependency Example 2: Multiple allowed trigger values with IN Example 3: NOT IN inverse rule Example 4: Regex-triggered routing Example 5: Combined conditions with AND Example 6: Grouped logic with OR and parentheses Example 7: Numeric comparison Example 8: Using ENDIF instead of semicolon Summary Docs Tutorial Privacy Policy About Contact Community Twitter More Blog GitHub Copyright © 2026 Compendium Developments Ltd.

Relevant code/examples:
- `Status: enum("Open","In Progress","Closed")`
- `Status: enum("Open","In Progress","Closed")`
- `enum("GET","POST","PUT")`
- `enum(...)`
- `person.notACommand`
- `person.notACommand()`
- `Schema Constraints are impacting row generation - generated X rows, failed to generate Y rows. Consider changing constraints to improve row generation.`

---

## Data Grid Editable | AnyWayData - Data Table Editor & Generator

https://eviltester.github.io/grid-table-editor/site/docs/test-data/data-grid-editable

Headings: H1:Data Grid Editable | H2:What this page is best for​ | H2:Test Data section in app.html​ | H2:Grid to Enum Schema​ | H3:How it works​ | H2:Generate Modes in the Grid​ | H2:Main grid context menu​ | H2:Pairwise generation​ | H2:Schema text area support​ | H2:Schema constraints​ | H2:Test Data Grid​ | H2:Row count summary​ | H2:Types​ | H2:Number of Rows to Generate​ | H2:Generating Data​

Relevant excerpts:
- Skip to main content AnyWayData App Docs Blog GitHub Docs Documentation About Editing Data Editable Data Grid Import From File Text Editing Exporting Data Data Formats Generating Data Test Data Generation Data Grid Editable Generate to File Schema Definition Regex Based Data Literal Data Pairwise Testing N-Wise Testing Domain Test Data Faker Based Data Counterstrings Auto Increment Sequences Misc Related Tools Video Tutorials Faker Test Data Interfaces & Deployment Overview Web UI REST API MCP CLI (Node and Bun) DocsGenerating DataData Grid Editable Data Grid Editable The Data Grid Editable workflow is the main app at: https://anywaydata.com/app.html It is designed for interactive editing where generated data and manual edits happen in the same grid.
- By 'opening' the Test Data section in the GUI it is possible to Generate a Data Grid filled with Random Data.
- press Generate (or Generate Pairwise when applicable) Generated rows are inserted into the main editable data grid.
- Grid to Enum Schema​ The Grid to Enum Schema action scans the current main data grid and builds a schema definition from the values already in the table.
- The generated schema uses: one schema row per grid column the current column header as the schema row name Enum as the source type for every generated row unique values collected in first-seen row order How it works​ Open the Test Data section in app.html.
- Review the generated schema and press Generate or Generate Pairwise as needed.
- When accepted, the generated enum schema replaces the existing schema definition in the Test Data editor.
- Example source grid: Browser,Device,Theme Chrome,Desktop,Light Firefox,Mobile,Dark Chrome,Tablet,Dark Example generated enum schema: Browser enum("Chrome","Firefox") Device enum("Desktop","Mobile","Tablet") Theme enum("Light","Dark") Generate Modes in the Grid​ When generating in app.html, you can choose whether generation replaces data or amends existing rows: New Table clears/rebuilds the table from the schema and generates a fresh data set Amend Table updates the current table while preserving existing rows where possible Amend Selected applies generation only to selected rows in the main grid These modes are useful when you want to iteratively enrich existing data instead of always starting from a blank table.
- Schema text area support​ When you add rows using the data grid, you will see the information is also copied into the text area in the right.
- constraints to restrict which combinations of generated values are valid.
- Test Data Grid​ The Test Data Grid contains the 'schema' or 'template' to use to generate data for the grid.
- Each row represents a Column in the final data grid.
- The Type is the type of data that will be generated in the column.
- This can be a Literal (static text), a RegEx (Regular Expression), an Enum (comma-separated values), or one of the predefined random data types from Faker.
- When you have 2 or more Enum type columns, the Generate Pairwise button will appear, allowing you to generate optimal combinatorial test data with complete pairwise coverage.
- Row count summary​ The main data grid shows an always-visible total row count beneath the grid.
- Examples: Total rows: 125 Total rows: 125 | Filtered Visible: 12 This makes it easier to confirm the effect of import, filtering, amend operations, and generated data volumes at a glance.
- Number of Rows to Generate​ Configure how many rows of data to generate by typing the numeric value in the How Many?
- to generate 1000 rows of data enter 1000 in the How Many?
- Generating Data​ Press the [Generate] button to generate the data.
- The schema in the Column Definition Data Grid will be used to generate the data.
- All data generation happens in the browser so the amount of data you can generate is limited only by the performance and memory of your computer.
- Previous Test Data Generation Next Generate to File What this page is best for Test Data section in app.html Grid to Enum Schema How it works Generate Modes in the Grid Main grid context menu Pairwise generation Schema text area support Schema constraints Test Data Grid Row count summary Types Number of Rows to Generate Generating Data Docs Tutorial Privacy Policy About Contact Community Twitter More Blog GitHub Copyright © 2026 Compendium Developments Ltd.

Relevant code/examples:
- `Generate`
- `Generate Pairwise`
- `Generate`
- `Generate Pairwise`
- `Generate Pairwise`
- `[Generate]`

---

## Test Data Generation | AnyWayData - Data Table Editor & Generator

https://eviltester.github.io/grid-table-editor/site/docs/test-data/test-data-generation

Headings: H1:Test Data Generation | H2:Choose a Workflow​ | H3:Data Grid Editable (app.html)​ | H3:Generate to File (generator.html)​ | H2:Data Types​ | H2:Learn More About Rule Types​

Relevant excerpts:
- Skip to main content AnyWayData App Docs Blog GitHub Docs Documentation About Editing Data Editable Data Grid Import From File Text Editing Exporting Data Data Formats Generating Data Test Data Generation Data Grid Editable Generate to File Schema Definition Regex Based Data Literal Data Pairwise Testing N-Wise Testing Domain Test Data Faker Based Data Counterstrings Auto Increment Sequences Misc Related Tools Video Tutorials Faker Test Data Interfaces & Deployment Overview Web UI REST API MCP CLI (Node and Bun) DocsGenerating DataTest Data Generation Test Data Generation AnyWayData offers two main web UI workflows for generating and working with test data: Data Grid Editable (app.html) for interactive grid-first editing and generation Generate to File (generator.html) for schema-driven generation and direct file output Choose a Workflow​ Data Grid Editable (app.html)​ Use this when you want to: edit/import/export table data directly in a grid define generation rules and generate rows into the same editable grid refine data interactively before exporting See Data Grid Editable.
- Generate to File (generator.html)​ Use this when you want to: define a schema and preview generated rows configure output format-specific options generate and download output directly as a file See Generate to File.
- Data Types​ Both workflows support generation rules such as: Literal RegEx Faker Enum (including pairwise combinations when applicable) Learn More About Rule Types​ Literal Data Regex Based Data Faker Based Data Counterstrings Domain Test Data All Pairs Combinatorial Testing - Generate optimal test combinations from enum data Previous Generating Data Next Data Grid Editable Choose a Workflow Data Grid Editable (app.html) Generate to File (generator.html) Data Types Learn More About Rule Types Docs Tutorial Privacy Policy About Contact Community Twitter More Blog GitHub Copyright © 2026 Compendium Developments Ltd.

Relevant code/examples:
- None captured

---

## Web UI | AnyWayData - Data Table Editor & Generator

https://eviltester.github.io/grid-table-editor/site/docs/interfaces-and-deployment/web-ui

Headings: H1:Web UI | H2:When To Use This​ | H2:Quick Start (Hosted)​ | H2:Local Run​ | H2:Docker Run​ | H2:Notes​

Relevant excerpts:
- Skip to main content AnyWayData App Docs Blog GitHub Docs Documentation About Editing Data Editable Data Grid Import From File Text Editing Exporting Data Data Formats Generating Data Misc Related Tools Video Tutorials Faker Test Data Interfaces & Deployment Overview Web UI REST API MCP CLI (Node and Bun) DocsInterfaces & DeploymentWeb UI Web UI The Web UI is best for interactive editing, import/export, and conversion.
- You want generated/exported data without writing code.

Relevant code/examples:
- None captured

---

## REST API | AnyWayData - Data Table Editor & Generator

https://eviltester.github.io/grid-table-editor/site/docs/interfaces-and-deployment/rest-api

Headings: H1:REST API | H2:When To Use This​ | H2:Quick Start​ | H2:Local Run​ | H2:Docker Run​ | H2:Common Endpoints​ | H2:Generate vs FromSchema​ | H2:Schema Formatting​ | H2:API Examples​ | H2:Notes​

Relevant excerpts:
- Skip to main content AnyWayData App Docs Blog GitHub Docs Documentation About Editing Data Editable Data Grid Import From File Text Editing Exporting Data Data Formats Generating Data Misc Related Tools Video Tutorials Faker Test Data Interfaces & Deployment Overview Web UI REST API MCP CLI (Node and Bun) DocsInterfaces & DeploymentREST API REST API The REST API is best for HTTP automation, service integration, and schema-driven tooling.
- POST /v1/generate Main JSON endpoint for generation from a structured request body.
- POST /v1/generate/fromschema Generation endpoint for raw text schema input (text/plain) plus query parameters.
- POST /v1/generate/amend Import raw input data and amend rows using schema rules.
- GET /v1/generate/options/<format> Returns current export options for a format (for example json, csv, python).
- POST /v1/generate/options/<format> Sets export options for a format.
- POST /v1/generate/options/<format>/default Resets a format’s options back to defaults.
- Generate vs FromSchema​ POST /v1/generate is best when your caller already sends JSON.
- POST /v1/generate/fromschema is best when your source schema is raw text.
- Both endpoints generate data from the same schema language and output formats.
- POST /v1/generate/amend behavior: accepts textSpec, inputData, inputFormat, optional rowCount, outputFormat, responseFormat optional trimInput: true trims all imported field values before amend processing optional trimInputFieldsCsv: "Name,Email" trims only the listed imported field names defaults rowCount to imported row count if rowCount is provided and smaller, only first N rows are amended output always returns the full resulting dataset stream is accepted for compatibility and ignored inputFormat is normalized (trimmed and lower-cased), so values like " csv " are accepted Generation mode behavior: REST generation endpoints currently run in buffered mode.
- Stream-mode generation behavior is available via the core helper/CLI paths, not via /v1/generate.
- API Examples​ Health check: curl http://localhost:3000/health Generate JSON output with a JSON payload: curl -X POST http://localhost:3000/v1/generate \ -H "Content-Type: application/json" \ -d '{ "textSpec": "# literal values\n\nName\nBob\n\n# lower-case city\nCity\nlondon", "rowCount": 3, "outputFormat": "json" }' Generate CSV output with CSV-specific options: curl -X POST http://localhost:3000/v1/generate \ -H "Content-Type: application/json" \ -d '{ "textSpec": "# basic csv schema\n\nName\nBob", "rowCount": 2, "outputFormat": "csv", "options": { "quotes": true, "header": true, "quoteChar": "\"", "escapeChar": "\"" } }' Generate using raw schema text (fromschema): curl -X POST "http://localhost:3000/v1/generate/fromschema?outputFormat=markdown&rowCount=2" \ -H "Content-Type: text/plain" \ --data-binary $'# markdown sample\n\nName\nBob\n\n# numeric id\nId\n1' Amend imported data (CSV input to tab-delimited output): curl -X POST http://localhost:3000/v1/generate/amend \ -H "Content-Type: application/json" \ -d '{ "textSpec": "Name\nUpdated Name\nStatus\nActive", "inputData": "\"Name\",\"Age\"\n\"Alice\",\"30\"\n\"Eve\",\"40\"\n", "inputFormat": "csv", "rowCount": 2, "outputFormat": "dsv", "trimInputFieldsCsv": "Name", "responseFormat": "all", "stream": true }' Notes for this example: stream is ignored for amend and included only for compatibility.
- Get current options for a format: curl http://localhost:3000/v1/generate/options/json Set options for a format: curl -X POST http://localhost:3000/v1/generate/options/json \ -H "Content-Type: application/json" \ -d '{ "options": { "prettyPrint": true, "prettyPrintDelimiter": 2, "makeNumbersNumeric": true } }' Reset format options to defaults: curl -X POST http://localhost:3000/v1/generate/options/json/default OpenAPI and Swagger docs: curl http://localhost:3000/openapi.json # and open in browser: # http://localhost:3000/docs Notes​ If you run on a non-default port, replace 3000 in all examples.
- Previous Web UI Next MCP When To Use This Quick Start Local Run Docker Run Common Endpoints Generate vs FromSchema Schema Formatting API Examples Notes Docs Tutorial Privacy Policy About Contact Community Twitter More Blog GitHub Copyright © 2026 Compendium Developments Ltd.

Relevant code/examples:
- `POST /v1/generate`
- `POST /v1/generate/fromschema`
- `POST /v1/generate/amend`
- `GET /v1/generate/options/<format>`
- `POST /v1/generate/options/<format>`
- `POST /v1/generate/options/<format>/default`
- `POST /v1/generate`
- `POST /v1/generate/fromschema`
- `POST /v1/generate/amend`
- `/v1/generate`
- `curl -X POST http://localhost:3000/v1/generate \ -H "Content-Type: application/json" \ -d '{ "textSpec": "# literal values\n\nName\nBob\n\n# lower-case city\nCity\nlondon", "rowCount": 3, "outputFormat": "json" }'`
- `curl -X POST http://localhost:3000/v1/generate \ -H "Content-Type: application/json" \ -d '{ "textSpec": "# literal values\n\nName\nBob\n\n# lower-case city\nCity\nlondon", "rowCount": 3, "outputFormat": "json" }'`
- `curl -X POST http://localhost:3000/v1/generate \ -H "Content-Type: application/json" \ -d '{ "textSpec": "# basic csv schema\n\nName\nBob", "rowCount": 2, "outputFormat": "csv", "options": { "quotes": true, "header": true, "quoteChar": "\""...`
- `curl -X POST http://localhost:3000/v1/generate \ -H "Content-Type: application/json" \ -d '{ "textSpec": "# basic csv schema\n\nName\nBob", "rowCount": 2, "outputFormat": "csv", "options": { "quotes": true, "header": true, "quoteChar": "\""...`
- `curl -X POST "http://localhost:3000/v1/generate/fromschema?outputFormat=markdown&rowCount=2" \ -H "Content-Type: text/plain" \ --data-binary $'# markdown sample\n\nName\nBob\n\n# numeric id\nId\n1'`
- `curl -X POST "http://localhost:3000/v1/generate/fromschema?outputFormat=markdown&rowCount=2" \ -H "Content-Type: text/plain" \ --data-binary $'# markdown sample\n\nName\nBob\n\n# numeric id\nId\n1'`
- `curl -X POST http://localhost:3000/v1/generate/amend \ -H "Content-Type: application/json" \ -d '{ "textSpec": "Name\nUpdated Name\nStatus\nActive", "inputData": "\"Name\",\"Age\"\n\"Alice\",\"30\"\n\"Eve\",\"40\"\n", "inputFormat": "csv", ...`
- `curl -X POST http://localhost:3000/v1/generate/amend \ -H "Content-Type: application/json" \ -d '{ "textSpec": "Name\nUpdated Name\nStatus\nActive", "inputData": "\"Name\",\"Age\"\n\"Alice\",\"30\"\n\"Eve\",\"40\"\n", "inputFormat": "csv", ...`
- `curl http://localhost:3000/v1/generate/options/json`
- `curl http://localhost:3000/v1/generate/options/json`

---

## CLI (Node and Bun) | AnyWayData - Data Table Editor & Generator

https://eviltester.github.io/grid-table-editor/site/docs/interfaces-and-deployment/cli-node-and-bun

Headings: H1:CLI (Node and Bun) | H2:When To Use This​ | H2:Node/npm CLI​ | H2:Schema Formatting​ | H2:Behavior Notes​ | H2:Amend Examples​ | H2:Bun CLI​ | H2:Safe Faker Expressions​ | H2:Choose CLI vs API/MCP​

Relevant excerpts:
- Skip to main content AnyWayData App Docs Blog GitHub Docs Documentation About Editing Data Editable Data Grid Import From File Text Editing Exporting Data Data Formats Generating Data Misc Related Tools Video Tutorials Faker Test Data Interfaces & Deployment Overview Web UI REST API MCP CLI (Node and Bun) DocsInterfaces & DeploymentCLI (Node and Bun) CLI (Node and Bun) Use the CLI for local scripting, CI steps, and one-off batch generation.
- When To Use This​ You want command-line generation from text specs.
- Node/npm CLI​ Global install: npm install -g @anywaydata/cli Run without installing: npx @anywaydata/cli --help Common examples: anywaydata --help anywaydata generate -i input.txt -n 10 -f csv anywaydata generate -i input.txt -n 10 -f json -o output.json anywaydata generate -i input.txt -n 10 -f markdown -t anywaydata amend --schema-file schema.txt --data-file input.csv --input-format csv -f json -o amended.json Parameter guide for the examples: generate: run the data generation command.
- -n, --numberOfLines: number of rows to generate.
- -t, --testMode: generate one row and print diagnostics for troubleshooting.
- amend always uses buffered generation; stream flags are ignored for this command.
- bun run apps/cli/src/bun-entry.js --help bun run apps/cli/src/bun-entry.js generate -i input.txt -n 10 -f csv bun run apps/cli/src/bun-entry.js generate -i input.txt -n 100000 -f jsonl -o output.jsonl --stream If your environment uses a Bun-built binary/workflow, follow the same argument pattern.
- To allow expression-style faker arguments, opt in explicitly: anywaydata generate -i input.txt -n 10 -f csv --unsafe-faker-expressions Choose CLI vs API/MCP​ Choose CLI for local scripts and shell pipelines.

Relevant code/examples:
- `anywaydata --helpanywaydata generate -i input.txt -n 10 -f csvanywaydata generate -i input.txt -n 10 -f json -o output.jsonanywaydata generate -i input.txt -n 10 -f markdown -tanywaydata amend --schema-file schema.txt --data-file input.csv ...`
- `anywaydata --helpanywaydata generate -i input.txt -n 10 -f csvanywaydata generate -i input.txt -n 10 -f json -o output.jsonanywaydata generate -i input.txt -n 10 -f markdown -tanywaydata amend --schema-file schema.txt --data-file input.csv ...`
- `generate`
- `bun run apps/cli/src/bun-entry.js --helpbun run apps/cli/src/bun-entry.js generate -i input.txt -n 10 -f csvbun run apps/cli/src/bun-entry.js generate -i input.txt -n 100000 -f jsonl -o output.jsonl --stream`
- `bun run apps/cli/src/bun-entry.js --helpbun run apps/cli/src/bun-entry.js generate -i input.txt -n 10 -f csvbun run apps/cli/src/bun-entry.js generate -i input.txt -n 100000 -f jsonl -o output.jsonl --stream`
- `anywaydata generate -i input.txt -n 10 -f csv --unsafe-faker-expressions`
- `anywaydata generate -i input.txt -n 10 -f csv --unsafe-faker-expressions`

---

## Test Data Generator and Table Editor for Markdown, CSV, JSON, Gherkin and HTML - AnyWayData

https://eviltester.github.io/grid-table-editor/site/app.html

Headings: 

Relevant excerpts:
- None captured

Relevant code/examples:
- `enum("Open","In Progress","Closed")`

---

## Data Generator - AnyWayData

https://eviltester.github.io/grid-table-editor/generator.html

Headings: H1:Data Generator

Relevant excerpts:
- Skip to main content Data Generator Data Generator Instructions Schema Edit as Text Load Schema File Save Schema File enum literal regex domain faker Schema Constraints (0) + Add Field Managed Stored Schemas (0) Generate Data and Options Generate Rows Output Format CSV JSON JSONL XML SQL MARKDOWN DSV HTML GHERKIN ASCIITABLE C# Java JavaScript Kotlin Perl PHP Python Ruby TypeScript JUnit4 JUnit5 JUnit6 TestNG PyTest unittest nose2 Jest Vitest Mocha xUnit NUnit MSTest RSpec Minitest PHPUnit Pest Kotest JUnit5 Kotlin Spek Test::More Test2::Suite Generate Data Settings Options Use Quotes Use Header Quote Char Escape Char Apply Preview Preview Items Count Preview Output Preview Data Table Preview ~preview

Relevant code/examples:
- None captured