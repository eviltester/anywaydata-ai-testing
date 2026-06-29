# App Grid/Test-Data Interplay Check

Steps:
- import-csv-through-text-preview: success
- open-test-data-section: success
- grid-to-enum-schema: success
- confirm-build-schema: success

Schema text captured:
```
Browser
enum("Chrome","Firefox")
Device
enum("Desktop","Mobile","Tablet")
Theme
enum("Light","Dark")
```

Body excerpt:
- Add Row Add Rows Above Add Rows Below Delete Selected Rows Filter:  Clear Filters Clear Sort Reset Table  Unique Column Names
- Browser
- Device
- Theme
- Total rows: 3
- Generate
- Generate Combinations
- Grid to Enum Schema
- Created 3 enum schema rows.
- Load Schema File
- Save Schema File
- Schema Constraints (0)
- Managed Stored Schemas (0)
- Rows

Screenshots:
- docs-consistency-app-after-load-sample-data.png
- docs-consistency-app-grid-to-enum-schema.png
