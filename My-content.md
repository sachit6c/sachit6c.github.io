1
My Content — Navigation
FE | Side nav entry opens My content landing
• Given the user is on the dashboard, when they click on “My content” from side nav, then it opens a landing page for Content.<br>• Given the landing page loads, when network is slow, then show a loading state and do not render partial content list.
Frontend UI
2


2
My Content — Navigation
BE | Authorize access to My content
• Given a user is authenticated, when they call My content APIs, then access is allowed per role and tenant rules.<br>• Given a user is not authenticated, when they call My content APIs, then the system returns 401 and no data is exposed.
Backend (API)
1


3
My Content — Landing
BE | Fetch user-created contents list
• Given the user opens the landing page for Content, when the UI requests “my contents”, then the API returns only the user’s created contents (if exists).<br>• Given no contents exist for the user, when the API is called, then it returns an empty list (not an error).<br>• Given many contents exist, when the API is called, then it supports pagination/sorting (defaults defined).
Backend (API)
2


4
My Content — Landing
FE | Show contents list or empty state
• Given the user can view their created contents, when contents exist, then the UI renders the list with stable ordering (per API contract).<br>• Given no contents exist, when the landing page loads, then the user sees an empty state.
Frontend UI
2


5
My Content — Landing
FE | Create content CTA on top left
• Given the user is on Content landing page, when the page renders, then the user can see create content cta on top left.<br>• Given the user clicks the CTA, when navigation occurs, then the Create content flow opens.
Frontend UI
1


6
Content Creation — Data Model
Data | Content entity schema + ownership
• Given a content is created, when it is persisted, then it stores Title, Description, Brand, Type, Channel, HCP Segment, createdBy, createdAt, updatedAt, and status (draft/in-progress/etc. per rule).<br>• Given the system fetches “my contents”, when querying, then it filters by createdBy and tenant.
Backend (Data)
2


7
Content Creation — Form
FE | Create content form fields + validation
• Given the user clicks create content, when the form opens, then the user has to enter following fields: Title, Description, Brand dropdown, Type dropdown, Channel dropdown, HCP Segment dropdown.<br>• Given required fields are missing/invalid, when the user clicks Next, then inline validation shows what’s required and the user cannot proceed.<br>• Given the user clicks Cancel, when they confirm (if required), then they return to the landing page and no unintended content is created.
Frontend UI
3


8
Content Creation — Reference Data
BE | Dropdown values APIs for Brand/Type/Channel/HCP Segment
• Given the Create content form loads, when the UI requests dropdown values, then the API returns allowed values for Brand, Type, Channel, and HCP Segment.<br>• Given dropdown fields to be confirmed, when config changes, then the API reflects updated allowed values without UI code change (config-driven).
Backend (API)
2


9
Content Creation — Reference Data
Data | Store/configure dropdown reference data
• Given dropdown fields to be confirmed, when admins configure reference data, then Brand/Type/Channel/HCP Segment options are stored and versioned (if required).<br>• Given a value is deprecated, when content is viewed later, then existing content still renders the stored value.
Backend (Data)
2


10
Content Creation — Save & Resume
BE | Create draft content record on Next
• Given the user completes the form and clicks Next, when the request is valid, then a draft content record is created and a contentId is returned.<br>• Given the request is invalid, when Next is clicked, then the API returns validation errors and does not create a record.
Backend (API)
2


11
Content Creation — Path Selection
FE | Path selection screen (radio options)
• Given the user clicks Next from the form, when the screen loads, then they see 3 radio button options and based on the selection the below section changes it views:<br>• Radio Option - Adapt from similar asset<br>• Radio Option - Localize Global Asset<br>• Radio Option - Create New Asset<br>• Given the user switches radio options, when they change selection, then the below section updates without losing the saved contentId context.
Frontend UI
3


12
Content Creation — Parked Feature
FE | (Parked) Creative Brief Summary dropdown placeholder
• Given the path selection screen renders, when the UI is built, then a dropdown for “Creative Brief Summary” is present as a placeholder but the feature is parked for later (non-blocking, may be hidden behind a feature flag).<br>• Given the feature is parked, when disabled, then the user can complete the flow without selecting “Creative Brief Summary”.
Frontend UI
1


13
Content Creation — Reference Assets
BE | Find reference assets + match score (adapt/localize)
• Given the user selects “Adapt from similar asset”, when the UI requests reference assets, then AI finds the reference asset and returns “Reference Asset Available” items with a match score.<br>• Given the user selects “Localize Global Asset”, when the UI requests reference assets, then AI finds the reference asset and returns “Reference Asset Available” items with a match score.<br>• Given more than one reference is available, when the API responds, then it provides enough data for “View X More” where X means no of options available.
Backend (API)
4


14
Content Creation — Reference Assets
Data | Reference asset index for AI matching
• Given reference assets exist, when they are ingested/updated, then the system indexes them for similarity search and stores required metadata for match scoring.<br>• Given an asset is removed, when it is deleted/deactivated, then it no longer appears as “Reference Asset Available”.
Backend (Data)
4


15
Content Creation — Reference Assets UI
FE | Reference Asset Available list, chevron, selection
• Given the user selects “Adapt from similar asset”, when results are returned, then the view shows “Reference Asset Available” and a match score.<br>• Given more than one available, when results exceed initial visible count, then the UI shows a chevron arrow indicating “View X More” where X means no of options available.<br>• Given the user can pick an asset, when they click on required asset’s check box and click Next, then the selected reference assetId is captured and the user proceeds ahead.
Frontend UI
3


16
Content Creation — Templates
BE | Fetch preset templates by selected channel
• Given the user selects “Create New Asset”, when the UI requests templates, then the API returns preset templates of selected channel.<br>• Given the channel changes, when templates are requested again, then the returned templates reflect the new selected channel.
Backend (API)
2


17
Content Creation — Templates
Data | Template repository + channel mapping
• Given preset templates exist, when stored, then each template is mapped to one or more channels and is versioned (if required).<br>• Given a template is deprecated, when existing content uses it, then rendering remains stable for that content version.
Backend (Data)
3


18
Content Creation — Templates UI
FE | Template selection for Create New Asset
• Given the user selects “Create New Asset”, when templates load, then below the user can see preset templates of selected channel and can select either 1 and move on next.<br>• Given no templates exist for a channel, when templates load, then the UI shows an empty state and the Next CTA is disabled.
Frontend UI
2


19
Content Generation
BE | Start generation/localization job based on selection
• Given the user clicks Next after selecting a reference asset (adapt/localize) or a template (new), when the request is submitted, then the system starts generation/localization and returns a job status (or routes to the editor when ready per rule).<br>• Given generation fails, when the job ends, then the UI can display a user-friendly error and a retry action.
Backend (API)
4


20
Content Generation
Data | Store generated content versions + job status
• Given generation starts, when a job is created, then job status (Queued/Processing/Completed/Failed) is persisted and linked to contentId.<br>• Given generation completes, when content is produced, then a versioned generated content payload is stored and retrievable by contentId.
Backend (Data)
3


21
Content Editor — Shell
FE | Editor screen layout (70/30) + banner CTAs
• Given the user proceeds after selecting any radio option, when the editor opens, then on top there is a banner for Title view and CTAs - Reference, Preview, Add section, Recommended Edits, MLR Precheck, Export.<br>• Given the editor loads, when rendered, then left side of screen (70%) of real estate shows the generated content template and right side of screen (30%) shows a conversational chat interface.
Frontend UI
4


22
Content Editor — Load/Save
BE | Retrieve generated content + persist edits
• Given the editor opens, when the UI requests content by contentId, then the API returns the latest generated version plus metadata needed to render.<br>• Given the user makes changes (manual or AI), when changes are saved, then the API persists updates and returns the updated version info.
Backend (API)
3


23
Chat Interface
FE | Conversational chat with “Edit mode” option
• Given the user is in the editor, when they use the chat interface, then the user can ask for a change and communicate with AI.<br>• Given the chat interface renders, when available, then the user can also see options like “Edit mode”.
Frontend UI
3


24
Chat Interface
BE | Chat endpoint with content context
• Given the user sends a chat message, when the request is made, then the backend receives message + content context and returns an AI response and any proposed edits (if applicable).<br>• Given chat history exists, when the editor reloads, then history is retrievable per contentId (or session rule).
Backend (API)
4


25
Edit Mode
FE | Edit Mode toggles to manual editing controls
• Given the user selects Edit Mode, when activated, then the generated content on left side turns to edit more and the user can change content copy, manually change colors, font size, alignment etc, upload new image or remove image.<br>• Given the user exits Edit Mode, when toggled off, then the UI returns to view mode and unsaved changes are handled per rule (prompt/save/discard).
Frontend UI
4


26
Assets (Images)
BE | Upload/remove image for content
• Given the user uploads new image in Edit Mode, when the upload succeeds, then the image is stored and linked to the content version.<br>• Given the user removes an image, when the action is saved, then the image is removed from the content layout (and underlying link is removed).
Backend (API)
3


27
Assets (Images)
Data | Store image asset metadata + linkage
• Given an image is uploaded, when persisted, then the system stores asset metadata (owner, contentId, version, mimeType, size) and a retrievable location reference.<br>• Given an image is removed, when persisted, then the linkage to content is removed and retention follows policy.
Backend (Data)
2


28
Citations & Evidence
FE | Highlight copy and request references/citations
• Given the user can highlight the content copy, when they ask user for references or citations via chat, then the chat interface on the right shows the files cited.<br>• Given files cited are shown, when the user clicks on it, then it opens that file in a new tab with that particular citation highlighted in that file.
Frontend UI
4


29
Citations & Evidence
BE | Generate citations + return deep links for highlighting
• Given the user requests references/citations for highlighted copy, when the backend processes it, then it returns the files cited plus enough locator data to highlight the particular citation in the file viewer.<br>• Given citations cannot be found, when the request completes, then the API returns a clear “no citations found” response and does not fabricate sources.
Backend (API)
4


30
Citations & Evidence
Data | Persist citation mappings (content ↔ source files)
• Given citations are generated, when stored, then each citation links contentId + content version + source file identifier + location pointer needed for highlight.<br>• Given content is edited, when citations are stale, then the system flags them for refresh (or invalidates per rule).
Backend (Data)
3


31
Banner CTAs
BE | Preview render for editor content
• Given the user clicks Preview, when requested, then the API returns a rendered preview artifact (or render model) for the current content version.<br>• Given preview fails, when an error occurs, then the API returns an actionable error message.
Backend (API)
3


32
Banner CTAs
BE | Export content
• Given the user clicks Export, when export is requested, then the API generates an export for the current content version (format(s) to be defined) and returns a retrievable link/token per security policy.<br>• Given export is requested, when content is invalid, then the API blocks export with validation details.
Backend (API)
4


33
Banner CTAs
BE | Recommended Edits + MLR Precheck actions
• Given the user clicks Recommended Edits, when requested, then the API returns a set of recommended edits tied to the current content version.<br>• Given the user clicks MLR Precheck, when requested, then the API runs precheck rules and returns pass/fail findings with locations (if available).
Backend (API)
4


34
Non-functional
FE | Error handling + empty/loading states across My content
• Given any My content call fails, when the UI receives an error, then it shows a non-technical message and a retry path where safe.<br>• Given lists are long, when rendering, then pagination/infinite scroll behaves consistently and remains responsive.
Frontend UI
2


35
Non-functional
BE | Audit trail for content changes
• Given a content is created/edited/exported, when the action completes, then the system logs who/when/what changed (including version transitions).<br>• Given audit records exist, when queried by authorized users, then they are retrievable for compliance/debugging.
Backend (API)
2