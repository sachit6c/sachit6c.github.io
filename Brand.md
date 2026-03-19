Sr No.
EPIC
Ticket Name
Acceptance criteria (bulleted)
Ticket type
Effort (days)




1
Foundations
BE | Roles & permissions for Brand and Claims
• Given a user is authenticated, when they access Brand screens, then the system enforces role-based access (Admin/Approver/Viewer/Contributor) per brand.<br>• Given a user lacks Brand Admin role, when they attempt to create/edit a brand, then the action is blocked and an authorization message is shown.<br>• Given a user lacks Approver role, when they attempt to approve/reject a claim, then the action is blocked and logged.
Backend (API)
1


2
Foundations
FE | Roles & permissions for Brand and Claims
• Given a user is authenticated, when they access Brand screens, then the system enforces role-based access (Admin/Approver/Viewer/Contributor) per brand.<br>• Given a user lacks Brand Admin role, when they attempt to create/edit a brand, then the action is blocked and an authorization message is shown.<br>• Given a user lacks Approver role, when they attempt to approve/reject a claim, then the action is blocked and logged.
Frontend UI
1


3
Foundations
Data | Audit trail (brand + claims)
• Given a brand is created/updated, when the action completes, then the system stores who/when/what changed.<br>• Given a claim status changes (e.g., In Review → Approved), when it changes, then the system stores who/when/from-to status (and optional comment).
Backend (Data)
1


4
Foundations
BE | Audit trail (brand + claims)
• Given a brand is created/updated, when the action completes, then the system stores who/when/what changed.<br>• Given a claim status changes (e.g., In Review → Approved), when it changes, then the system stores who/when/from-to status (and optional comment).
Backend (API)
1


5
Brand Creation
Data | Create a new Brand (core fields)
• Given a Brand Admin is on “Create Brand”, when they enter required fields and click Save, then a brand is created and a unique Brand ID is generated.<br>• Given required fields are missing/invalid, when they click Save, then inline validation shows what’s required and the brand is not created.<br>• Given a brand name already exists for the same geography (rule configurable), when the admin tries to create a duplicate, then the system prevents creation and explains the conflict.<br>• Given an admin uploads a logo, when the file type/size is unsupported, then upload is rejected with constraints shown.<br>• Given a brand is created successfully, when Save completes, then the user is routed to the Brand Details page.
Backend (Data)
1


6
Brand Creation
BE | Create a new Brand (core fields)
• Given a Brand Admin is on “Create Brand”, when they enter required fields and click Save, then a brand is created and a unique Brand ID is generated.<br>• Given required fields are missing/invalid, when they click Save, then inline validation shows what’s required and the brand is not created.<br>• Given a brand name already exists for the same geography (rule configurable), when the admin tries to create a duplicate, then the system prevents creation and explains the conflict.<br>• Given an admin uploads a logo, when the file type/size is unsupported, then upload is rejected with constraints shown.<br>• Given a brand is created successfully, when Save completes, then the user is routed to the Brand Details page.
Backend (API)
1


7
Brand Creation
FE | Create a new Brand (core fields)
• Given a Brand Admin is on “Create Brand”, when they enter required fields and click Save, then a brand is created and a unique Brand ID is generated.<br>• Given required fields are missing/invalid, when they click Save, then inline validation shows what’s required and the brand is not created.<br>• Given a brand name already exists for the same geography (rule configurable), when the admin tries to create a duplicate, then the system prevents creation and explains the conflict.<br>• Given an admin uploads a logo, when the file type/size is unsupported, then upload is rejected with constraints shown.<br>• Given a brand is created successfully, when Save completes, then the user is routed to the Brand Details page.
Frontend UI
1


8
Brand Creation
BE | Indications selection
• Given the admin is creating a brand, when they search/select indications, then selected indications appear as tokens and persist on Save.<br>• Given the admin removes an indication, when they save, then the removed indication no longer appears on Brand Details.
Backend (API)
1


9
Brand Creation
FE | Indications selection
• Given the admin is creating a brand, when they search/select indications, then selected indications appear as tokens and persist on Save.<br>• Given the admin removes an indication, when they save, then the removed indication no longer appears on Brand Details.
Frontend UI
1


10
Brand Creation
BE | Geography selection
• Given the admin selects a geography, when they save, then the geography displays consistently on Brand Details and Brand Home filters.<br>• Given geography is mandatory, when it is not selected, then Save is blocked with validation.
Backend (API)
1


11
Brand Creation
FE | Geography selection
• Given the admin selects a geography, when they save, then the geography displays consistently on Brand Details and Brand Home filters.<br>• Given geography is mandatory, when it is not selected, then Save is blocked with validation.
Frontend UI
1


12
Brand Creation (TBD)
BE | (TBD) Compound Name field — demarcated for later
• Given Compound Name is enabled, when the admin enters compound name and saves, then it displays on Brand Details and is available for search/filter (if required).<br>• Given Compound Name is disabled, when creating a brand, then the UI does not show the field and APIs ignore it.
Backend (API)
1


13
Brand Creation (TBD)
FE | (TBD) Compound Name field — demarcated for later
• Given Compound Name is enabled, when the admin enters compound name and saves, then it displays on Brand Details and is available for search/filter (if required).<br>• Given Compound Name is disabled, when creating a brand, then the UI does not show the field and APIs ignore it.
Frontend UI
1


14
Brand Details
BE | View Brand Details
• Given a user has access to a brand, when they open Brand Details, then they see brand name, geography, indications, logo (if any), and created/updated metadata.<br>• Given a brand ID does not exist, when a user navigates to it, then the system shows “Not found” and no data is exposed.<br>• Given the user lacks access to the brand, when they open Brand Details, then they receive an authorization error.
Backend (API)
1


15
Brand Details
FE | View Brand Details
• Given a user has access to a brand, when they open Brand Details, then they see brand name, geography, indications, logo (if any), and created/updated metadata.<br>• Given a brand ID does not exist, when a user navigates to it, then the system shows “Not found” and no data is exposed.<br>• Given the user lacks access to the brand, when they open Brand Details, then they receive an authorization error.
Frontend UI
1


16
Brand Details
BE | Edit Brand Details (Admin only)
• Given a Brand Admin is on Brand Details, when they edit editable fields and save, then changes persist and appear on refresh.<br>• Given the change violates validation (e.g., duplicate name rule), when saving, then save is blocked and the reason is shown.<br>• Given a logo is replaced, when the admin uploads a new logo, then the old logo is no longer displayed and the update is audit-logged.
Backend (API)
1


17
Brand Details
FE | Edit Brand Details (Admin only)
• Given a Brand Admin is on Brand Details, when they edit editable fields and save, then changes persist and appear on refresh.<br>• Given the change violates validation (e.g., duplicate name rule), when saving, then save is blocked and the reason is shown.<br>• Given a logo is replaced, when the admin uploads a new logo, then the old logo is no longer displayed and the update is audit-logged.
Frontend UI
1


18
Brand Home
BE | Brand Home shows brand-level sections + geography entries
• Given a brand has one or more geography-specific entries, when a user opens Brand Home, then they see the brand and the list/tiles of geography entries.<br>• Given there are no geography entries yet, when a user opens Brand Home, then they see an empty state with the next action (Admin: “Create geography entry”; others: “Contact admin”).
Backend (API)
1


19
Brand Home
FE | Brand Home shows brand-level sections + geography entries
• Given a brand has one or more geography-specific entries, when a user opens Brand Home, then they see the brand and the list/tiles of geography entries.<br>• Given there are no geography entries yet, when a user opens Brand Home, then they see an empty state with the next action (Admin: “Create geography entry”; others: “Contact admin”).
Frontend UI
1


20
Brand Home
BE | Filter brand homepage by Brand vs Geography
• Given multiple brands exist, when a user selects “Brand-wise” view, then the UI groups or lists items by brand.<br>• Given multiple geographies exist per brand, when a user selects “Geography-wise” view, then the UI groups or lists items by geography.<br>• Given a filter is applied, when the user refreshes or navigates away/back (within session requirement), then the filter state persists as designed (define: session-only vs saved preference).
Backend (API)
1


21
Brand Home
FE | Filter brand homepage by Brand vs Geography
• Given multiple brands exist, when a user selects “Brand-wise” view, then the UI groups or lists items by brand.<br>• Given multiple geographies exist per brand, when a user selects “Geography-wise” view, then the UI groups or lists items by geography.<br>• Given a filter is applied, when the user refreshes or navigates away/back (within session requirement), then the filter state persists as designed (define: session-only vs saved preference).
Frontend UI
1


22
Claims & References
BE | Claims & References section is visible on Brand Details
• Given a user can view a brand, when they open Brand Details, then they see a “Claims & References” section.<br>• Given no claims or files exist, when the section loads, then an empty state appears with available actions (Admin: “Add file” / “Pull from source”; others: view-only).
Backend (API)
1


23
Claims & References
FE | Claims & References section is visible on Brand Details
• Given a user can view a brand, when they open Brand Details, then they see a “Claims & References” section.<br>• Given no claims or files exist, when the section loads, then an empty state appears with available actions (Admin: “Add file” / “Pull from source”; others: view-only).
Frontend UI
1


24
Claims & References
BE | Claims list shows key fields + statuses
• Given claims exist, when the list loads, then claims display with type and status badges.<br>• Given a claim is in “In Review”, when a viewer sees it, then they can view details but cannot approve unless Approver role.<br>• Given claims are loading or error occurs, when the API is slow/fails, then the UI shows loading states and actionable error messaging.
Backend (API)
1


25
Claims & References
FE | Claims list shows key fields + statuses
• Given claims exist, when the list loads, then claims display with type and status badges.<br>• Given a claim is in “In Review”, when a viewer sees it, then they can view details but cannot approve unless Approver role.<br>• Given claims are loading or error occurs, when the API is slow/fails, then the UI shows loading states and actionable error messaging.
Frontend UI
1


26
File Ingestion
Data | Brand Admin adds a file manually under Claims & References
• Given a Brand Admin is in Claims & References, when they click “Add file” and upload a supported file, then the file is stored, associated to the brand (and geography/indication context if selected), and appears in a “Files” list.<br>• Given a user uploads an unsupported type/oversized file, when they confirm upload, then upload is rejected with allowed types/limits.<br>• Given an upload is interrupted, when the network fails mid-upload, then the UI indicates failure and allows retry without duplicating partial records.
Backend (Data)
1


27
File Ingestion
BE | Brand Admin adds a file manually under Claims & References
• Given a Brand Admin is in Claims & References, when they click “Add file” and upload a supported file, then the file is stored, associated to the brand (and geography/indication context if selected), and appears in a “Files” list.<br>• Given a user uploads an unsupported type/oversized file, when they confirm upload, then upload is rejected with allowed types/limits.<br>• Given an upload is interrupted, when the network fails mid-upload, then the UI indicates failure and allows retry without duplicating partial records.
Backend (API)
1


28
File Ingestion
FE | Brand Admin adds a file manually under Claims & References
• Given a Brand Admin is in Claims & References, when they click “Add file” and upload a supported file, then the file is stored, associated to the brand (and geography/indication context if selected), and appears in a “Files” list.<br>• Given a user uploads an unsupported type/oversized file, when they confirm upload, then upload is rejected with allowed types/limits.<br>• Given an upload is interrupted, when the network fails mid-upload, then the UI indicates failure and allows retry without duplicating partial records.
Frontend UI
1


29
File Ingestion
Data | File metadata capture
• Given a file upload completes, when the file record is created, then metadata is stored and visible in the UI.<br>• Given the same file is uploaded twice, when duplication detection is enabled, then the system warns and allows admin to cancel or proceed (define expected behavior).
Backend (Data)
1


30
File Ingestion
FE | File metadata capture
• Given a file upload completes, when the file record is created, then metadata is stored and visible in the UI.<br>• Given the same file is uploaded twice, when duplication detection is enabled, then the system warns and allows admin to cancel or proceed (define expected behavior).
Frontend UI
1


31
External Sources
BE | Connect to external source and import files
• Given a Brand Admin has configured/authorized an external source connection, when they click “Pull from source”, then they can browse/search available documents and select one or more to import.<br>• Given the external source is unavailable, when the admin attempts to pull, then the system shows an error and does not create partial imports.<br>• Given documents are selected, when import completes, then each imported document appears in the Files list with source = External and a reference to origin (ID/URL if allowed).
Backend (API)
3


32
External Sources
FE | Connect to external source and import files
• Given a Brand Admin has configured/authorized an external source connection, when they click “Pull from source”, then they can browse/search available documents and select one or more to import.<br>• Given the external source is unavailable, when the admin attempts to pull, then the system shows an error and does not create partial imports.<br>• Given documents are selected, when import completes, then each imported document appears in the Files list with source = External and a reference to origin (ID/URL if allowed).
Frontend UI
1


33
External Sources
Data | Prevent duplicate imports
• Given a document was previously imported from the same source, when the admin selects it again, then the system detects duplication (by source ID/hash) and prevents or confirms import per rule.
Backend (Data)
1


34
External Sources
FE | Prevent duplicate imports
• Given a document was previously imported from the same source, when the admin selects it again, then the system detects duplication (by source ID/hash) and prevents or confirms import per rule.
Frontend UI
1


35
Agent Processing
BE | Automatically enqueue claim generation on file add/import
• Given a file is successfully added (manual or external), when processing is enabled, then the system creates a processing job with status (e.g., Queued/Processing/Completed/Failed).<br>• Given multiple files are added, when jobs are created, then each file has an independent processing status visible to the user.
Backend (API)
2


36
Agent Processing
FE | Automatically enqueue claim generation on file add/import
• Given a file is successfully added (manual or external), when processing is enabled, then the system creates a processing job with status (e.g., Queued/Processing/Completed/Failed).<br>• Given multiple files are added, when jobs are created, then each file has an independent processing status visible to the user.
Frontend UI
1


37
Agent Processing
Data | Claim generation results appear under Claims list
• Given the agent completes processing, when claims are produced, then new claims appear linked to the source file.<br>• Given claims are generated, when they first appear, then their initial status is set to In Review (or your chosen default) and is audit-logged.<br>• Given the agent fails, when processing ends, then the job shows Failed with a user-friendly reason and an option to retry (Admin only).
Backend (Data)
1


38
Agent Processing
BE | Claim generation results appear under Claims list
• Given the agent completes processing, when claims are produced, then new claims appear linked to the source file.<br>• Given claims are generated, when they first appear, then their initial status is set to In Review (or your chosen default) and is audit-logged.<br>• Given the agent fails, when processing ends, then the job shows Failed with a user-friendly reason and an option to retry (Admin only).
Backend (API)
2


39
Agent Processing
FE | Claim generation results appear under Claims list
• Given the agent completes processing, when claims are produced, then new claims appear linked to the source file.<br>• Given claims are generated, when they first appear, then their initial status is set to In Review (or your chosen default) and is audit-logged.<br>• Given the agent fails, when processing ends, then the job shows Failed with a user-friendly reason and an option to retry (Admin only).
Frontend UI
1


40
Agent Processing
BE | Traceability from claim → evidence (MLR-friendly)
• Given a claim exists, when a user opens claim details, then they can see which file(s) it came from and at least one evidence pointer (e.g., page/section/snippet) if available.<br>• Given evidence cannot be extracted, when the claim is created, then the system flags “Evidence unavailable” and keeps the claim In Review.
Backend (API)
2


41
Agent Processing
FE | Traceability from claim → evidence (MLR-friendly)
• Given a claim exists, when a user opens claim details, then they can see which file(s) it came from and at least one evidence pointer (e.g., page/section/snippet) if available.<br>• Given evidence cannot be extracted, when the claim is created, then the system flags “Evidence unavailable” and keeps the claim In Review.
Frontend UI
1


42
Approvals
Data | Claim status model + transitions
• Given a claim is In Review, when an Approver clicks Approve, then status becomes Approved and the approver + timestamp are stored.<br>• Given a claim is In Review, when an Approver clicks Reject and enters a reason (if required), then status becomes Rejected and the reason is stored.<br>• Given a claim is Approved/Rejected, when a non-Admin tries to edit the claim text, then editing is blocked (unless your policy allows edits + re-review).<br>• Given a claim is edited after being Approved (if allowed), when it changes, then status returns to In Review and prior approval remains in history.
Backend (Data)
1


43
Approvals
BE | Claim status model + transitions
• Given a claim is In Review, when an Approver clicks Approve, then status becomes Approved and the approver + timestamp are stored.<br>• Given a claim is In Review, when an Approver clicks Reject and enters a reason (if required), then status becomes Rejected and the reason is stored.<br>• Given a claim is Approved/Rejected, when a non-Admin tries to edit the claim text, then editing is blocked (unless your policy allows edits + re-review).<br>• Given a claim is edited after being Approved (if allowed), when it changes, then status returns to In Review and prior approval remains in history.
Backend (API)
1


44
Approvals
FE | Claim status model + transitions
• Given a claim is In Review, when an Approver clicks Approve, then status becomes Approved and the approver + timestamp are stored.<br>• Given a claim is In Review, when an Approver clicks Reject and enters a reason (if required), then status becomes Rejected and the reason is stored.<br>• Given a claim is Approved/Rejected, when a non-Admin tries to edit the claim text, then editing is blocked (unless your policy allows edits + re-review).<br>• Given a claim is edited after being Approved (if allowed), when it changes, then status returns to In Review and prior approval remains in history.
Frontend UI
1


45
Approvals
BE | Status visibility and filtering readiness
• Given claims exist in multiple statuses, when the claims list loads, then each claim’s status is clearly visible and filterable.
Backend (API)
1


46
Approvals
FE | Status visibility and filtering readiness
• Given claims exist in multiple statuses, when the claims list loads, then each claim’s status is clearly visible and filterable.
Frontend UI
1


47
Claims Filtering
BE | Filter claims by Claim Type (e.g., RTE)
• Given claims have types, when the user selects a type filter (e.g., RTE), then the list shows only claims of that type.<br>• Given no claims match the filter, when the filter is applied, then the list shows an empty state and a “Clear filters” action.
Backend (API)
1


48
Claims Filtering
FE | Filter claims by Claim Type (e.g., RTE)
• Given claims have types, when the user selects a type filter (e.g., RTE), then the list shows only claims of that type.<br>• Given no claims match the filter, when the filter is applied, then the list shows an empty state and a “Clear filters” action.
Frontend UI
1


49
Claims Filtering
BE | Filter claims by Status
• Given claims have statuses, when the user selects a status filter (Approved/In Review/Rejected), then the list updates accordingly.<br>• Given both type and status filters are selected, when filters apply, then results reflect the intersection of filters.
Backend (API)
1


50
Claims Filtering
FE | Filter claims by Status
• Given claims have statuses, when the user selects a status filter (Approved/In Review/Rejected), then the list updates accordingly.<br>• Given both type and status filters are selected, when filters apply, then results reflect the intersection of filters.
Frontend UI
1


51
Claims Filtering
BE | Filter persistence and reset
• Given filters are applied, when the user navigates away/back within the brand, then filters persist per your chosen rule (session vs saved).<br>• Given filters are applied, when the user clicks “Reset”, then all filters clear and the full list returns.
Backend (API)
1


52
Claims Filtering
FE | Filter persistence and reset
• Given filters are applied, when the user navigates away/back within the brand, then filters persist per your chosen rule (session vs saved).<br>• Given filters are applied, when the user clicks “Reset”, then all filters clear and the full list returns.
Frontend UI
1


53
Non-functional
BE | Performance & pagination
• Given there are many claims/files, when the list loads, then it uses pagination or infinite scroll and remains responsive.<br>• Given a user changes filters, when results refresh, then response time meets agreed threshold (define target).
Backend (API)
1


54
Non-functional
FE | Performance & pagination
• Given there are many claims/files, when the list loads, then it uses pagination or infinite scroll and remains responsive.<br>• Given a user changes filters, when results refresh, then response time meets agreed threshold (define target).
Frontend UI
1


55
Non-functional
BE | Error handling and user messaging
• Given any API call fails, when the UI receives an error, then it shows a non-technical message and a retry path where safe.
Backend (API)
1


56
Non-functional
FE | Error handling and user messaging
• Given any API call fails, when the UI receives an error, then it shows a non-technical message and a retry path where safe.
Frontend UI
1


57
Claims Scoping & Geography
Data | Claims are brand-scoped with geography as an attribute
• Given a claim is created or generated, when it is saved, then it must be associated to exactly one Brand (brandId required).<br>• Given a claim is saved, when geography is not provided, then the system sets geography to “Unspecified/Global” (or blocks save—pick one rule and enforce consistently).<br>• Given a claim has one or more geographies, when a user filters the claims list by a geography, then only claims tagged to that geography (or “Global”, if included) are shown.
Backend (Data)
1


58
Claims Scoping & Geography
BE | Claims are brand-scoped with geography as an attribute
• Given a claim is created or generated, when it is saved, then it must be associated to exactly one Brand (brandId required).<br>• Given a claim is saved, when geography is not provided, then the system sets geography to “Unspecified/Global” (or blocks save—pick one rule and enforce consistently).<br>• Given a claim has one or more geographies, when a user filters the claims list by a geography, then only claims tagged to that geography (or “Global”, if included) are shown.
Backend (API)
1


59
Claims Scoping & Geography
FE | Claims are brand-scoped with geography as an attribute
• Given a claim is created or generated, when it is saved, then it must be associated to exactly one Brand (brandId required).<br>• Given a claim is saved, when geography is not provided, then the system sets geography to “Unspecified/Global” (or blocks save—pick one rule and enforce consistently).<br>• Given a claim has one or more geographies, when a user filters the claims list by a geography, then only claims tagged to that geography (or “Global”, if included) are shown.
Frontend UI
1


60
Claims Scoping & Geography
BE | Ingestion sets geography correctly (manual and external)
• Given an admin uploads a file manually, when they select geography context during upload (optional/required per your rule), then all generated claims inherit that geography unless the agent extracts an explicit geography tag.<br>• Given an external source record includes geography/market metadata, when it is imported, then the file and generated claims are tagged to that geography automatically.<br>• Given geography metadata is missing from an external import, when claims are generated, then claims default to “Unspecified/Global” and are flagged for admin review (or require geography selection prior to approval—your choice).
Backend (API)
2


61
Claims Scoping & Geography
FE | Ingestion sets geography correctly (manual and external)
• Given an admin uploads a file manually, when they select geography context during upload (optional/required per your rule), then all generated claims inherit that geography unless the agent extracts an explicit geography tag.<br>• Given an external source record includes geography/market metadata, when it is imported, then the file and generated claims are tagged to that geography automatically.<br>• Given geography metadata is missing from an external import, when claims are generated, then claims default to “Unspecified/Global” and are flagged for admin review (or require geography selection prior to approval—your choice).
Frontend UI
1


62
Claims Scoping & Geography
BE | Geography filtering on Brand Home and Claims
• Given the user is on Brand Home, when they pick a geography in the brand-level filter, then all brand sections that are geography-sensitive (including claims) reflect that selection.<br>• Given a user is on Claims & References, when they change geography filter, then the claims list updates without leaving the page and shows an empty state if none match.
Backend (API)
1


63
Claims Scoping & Geography
FE | Geography filtering on Brand Home and Claims
• Given the user is on Brand Home, when they pick a geography in the brand-level filter, then all brand sections that are geography-sensitive (including claims) reflect that selection.<br>• Given a user is on Claims & References, when they change geography filter, then the claims list updates without leaving the page and shows an empty state if none match.
Frontend UI
1


64
Approvals (Option)
BE | Approval scope — Global approval (simpler MVP)
• Given a claim is tagged to multiple geographies, when an approver approves the claim, then it becomes Approved for the brand regardless of geography tags.<br>• Given an approved claim has its geography tags changed, when it is saved, then approval status remains Approved (unless claim text/evidence changes).
Backend (API)
1


65
Approvals (Option)
FE | Approval scope — Global approval (simpler MVP)
• Given a claim is tagged to multiple geographies, when an approver approves the claim, then it becomes Approved for the brand regardless of geography tags.<br>• Given an approved claim has its geography tags changed, when it is saved, then approval status remains Approved (unless claim text/evidence changes).
Frontend UI
1


66
Approvals (Option)
Data | Approval scope — Geo-specific approval (more complex, more precise)
• Given a claim is tagged to multiple geographies, when an approver approves it for one geography, then that geography’s approval status becomes Approved while others remain In Review.<br>• Given a user filters to a geography, when they view claim status, then the status shown is the geo-specific status for that geography.
Backend (Data)
2


67
Approvals (Option)
BE | Approval scope — Geo-specific approval (more complex, more precise)
• Given a claim is tagged to multiple geographies, when an approver approves it for one geography, then that geography’s approval status becomes Approved while others remain In Review.<br>• Given a user filters to a geography, when they view claim status, then the status shown is the geo-specific status for that geography.
Backend (API)
2


68
Approvals (Option)
FE | Approval scope — Geo-specific approval (more complex, more precise)
• Given a claim is tagged to multiple geographies, when an approver approves it for one geography, then that geography’s approval status becomes Approved while others remain In Review.<br>• Given a user filters to a geography, when they view claim status, then the status shown is the geo-specific status for that geography.
Frontend UI
1