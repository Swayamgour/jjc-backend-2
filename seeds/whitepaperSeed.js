// seed/whitepaperSeed.js
// Run: node seed/whitepaperSeed.js
require("dotenv").config();
const mongoose = require("mongoose");
const Whitepaper = require("../models/Whitepaper.js");

const whitepapers = [
    // ===== DYNAMICS 365 BUSINESS CENTRAL PAPERS =====
    {
        platform: "business-central",
        service: "business-applications",
        industry: "manufacturing",
        icon: "erp",
        pages: 14,
        title: "The cost of deferring an ERP decision",
        description: "Deferral is a decision with a running cost. This paper quantifies where that cost accumulates and offers a framework for deciding whether to defer again.",
        publishedAt: new Date("2026-07-26"),
        readTime: "15 min read",
        subtitle: "What a mid-market manufacturer pays each year for a system it has decided not to replace yet",
        inThisPaper: [
            "An abstract and four numbered findings",
            "Analysis across 3 sections",
            "A framework you can apply: The deferral test",
            "Implications separated by role",
            "5 references to Microsoft documentation"
        ],
        abstractParagraphs: [
            "Every mid-market manufacturer we work with has, at some point, decided not to replace its ERP this year. That decision is almost always defensible in isolation and almost never costed.",
            "This paper sets out where the cost of deferral actually accumulates — in stale cost standards, in manual reconciliation, in decisions taken on figures nobody has validated — and offers a framework for making the next deferral deliberately rather than by default. Our position is not that every manufacturer should replace its ERP. It is that the decision should be made with the running cost of the alternative on the table."
        ],
        findings: [
            { number: 1, order: 1, title: "Deferral cost is dominated by mispricing, not by administration", description: "The visible cost of an ageing ERP is the manual effort around it. The material cost is quoting from a cost basis nobody has validated, which distorts every pricing and portfolio decision the business makes." },
            { number: 2, order: 2, title: "The cost is invisible because it is not a line item", description: "Nothing in the management accounts is labelled 'cost of stale standards'. It appears as variance, as margin below expectation, and as customers who are quietly unprofitable." },
            { number: 3, order: 3, title: "Capability that used to require enterprise ERP is now mid-market", description: "Actual costing, capacity posting and dimensional reporting are available at a licence cost a hundred-person manufacturer can defend. The barrier is no longer the technology." },
            { number: 4, order: 4, title: "Phasing changes the risk profile more than the timeline does", description: "A programme scoped to prove itself before the next phase is commissioned has a materially different failure mode from one that produces nothing for a year." }
        ],
        analysisBody: `<h2>Where the cost accumulates</h2>
<p>Ask a manufacturing finance director what a unit costs to make and you will get a confident answer. Ask when the standard was last reviewed and the conversation changes.</p>
<p>This is not negligence. Updating standards is disruptive, the variance analysis is uncomfortable, and there is never a good quarter to do it. So the number ages while sales continues to quote from it, and the gap between the standard and reality widens quietly.</p>
<p>The consequence appears in three places, in ascending order of expense. Work is lost that should have been won, because the standard is high. Work is won that should have been lost, because the standard is low. And the business cannot distinguish between the two, because variance is explained after the quarter rather than acted on during it.</p>
<ul>
<li>Quoting from a cost basis nobody has validated in recent memory</li>
<li>Reconciliation effort between the ERP and the spreadsheets that compensate for it</li>
<li>Month-end close consuming time proportional to the workarounds rather than to the transactions</li>
<li>Growth requiring proportional administrative hiring</li>
<li>Decisions about product and customer portfolio taken on numbers that cannot be defended</li>
</ul>
<h2>Why the technology argument has changed</h2>
<p>The barrier to actual costing was never conceptual. It was that capturing real labour, material and machine consumption at the operation required a system most mid-market manufacturers could not justify.</p>
<p>Business Central now carries production orders, routings, bills of material and cost accounting in the same application as the ledger. Microsoft's documentation sets costing method at item level rather than company level, which means a migration can be staged by item category rather than attempted as a single event — a materially different risk proposition from the one most manufacturers last evaluated.</p>
<p>The 2026 release direction adds agents into payables and expense processing, which matters disproportionately in a small finance team where routine document handling is a large share of the week.</p>
<h2>What deferral is actually buying</h2>
<p>Deferral buys three things, and they are worth naming honestly. It avoids disruption during a period the business cannot absorb it. It preserves capital for something with a clearer return. And it avoids a change programme the leadership team does not currently have the appetite to run.</p>
<p>All three are legitimate. The question this paper puts is whether they are worth the running cost, and whether that comparison has ever been made explicitly.</p>
<p>In our experience the answer varies genuinely by organization. A manufacturer with stable products, long runs and infrequent repricing carries a much lower deferral cost than one with high mix, frequent quoting and volatile input prices. The second should be considerably more anxious about this than the first.</p>`,
        frameworkLede: "Every paper in this series ends with a framework you can run internally. We would rather you used it and reached your own conclusion than took ours on trust.",
        frameworkName: "The deferral test",
        frameworkDescription: "Five questions to answer before deferring again. If three or more resolve against you, deferral is costing more than the programme would.",
        frameworkStages: [
            { number: 1, order: 1, title: "Validate", description: "When was the cost standard last reviewed against actual production, and by whom?" },
            { number: 2, order: 2, title: "Quantify", description: "What proportion of quotes are priced from that standard, and what revenue does it touch?" },
            { number: 3, order: 3, title: "Attribute", description: "Can you identify which customers or product families are unprofitable, and how confident are you?" },
            { number: 4, order: 4, title: "Compare", description: "What does the workaround estate cost annually in effort, and what would phase one cost?" },
            { number: 5, order: 5, title: "Decide", description: "Is deferral a decision this year, or the absence of one? Write down which." }
        ],
        implicationsLede: "The same argument lands differently across an executive team. These are the three versions worth separating.",
        implications: [
            { order: 1, role: "For the CFO", text: "The deferral cost is not in your accounts as a line item, so it will not appear in any comparison unless somebody constructs it. Building that number is a week of work and it changes the conversation from a capital request to a comparison of two running costs." },
            { order: 2, role: "For the COO", text: "The operational case is stronger than the financial one and is usually made less well. Weekly visibility of production cost against standard changes what the plant can act on, and that argument belongs in the business case." },
            { order: 3, role: "For the CIO", text: "Scope phase one to prove itself. The most common mid-market ERP failure is a programme so large it consumes a year before producing anything, by which point the sponsor has moved on." }
        ],
        referencesLede: "Microsoft's own documentation for the product behaviour described above. We would rather you verified the basis than accepted our summary of it.",
        references: [
            { number: 1, order: 1, title: "Design Details: Inventory Costing", source: "Dynamics 365 Business Central documentation — the technical basis for how cost flows through inventory" },
            { number: 2, order: 2, title: "Design Details: Costing Methods", source: "Dynamics 365 Business Central — how Standard, FIFO, Average and Specific differ in valuation base" },
            { number: 3, order: 3, title: "Setup Best Practices: Costing Method", source: "Dynamics 365 Business Central — Microsoft's guidance on selecting a method by item type" },
            { number: 4, order: 4, title: "Managing inventory costs", source: "Dynamics 365 Business Central — cost adjustment, expected cost posting and general ledger reconciliation" },
            { number: 5, order: 5, title: "Design Details: Changing Costing Methods for Items", source: "Dynamics 365 Business Central — why the method cannot simply be switched once value entries exist" }
        ],
        referencesNote: "On these references: each entry names a Microsoft Learn article or documentation area by title, because deep links change while titles are stable. Searching the title on learn.microsoft.com will reach the current version. Where we have cited a figure or a product behaviour, it is Microsoft's statement rather than ours; where we have given a number of our own it is labelled as such in the text.",
        ctaText: "If you would like the deferral cost calculated against your own figures rather than in the abstract, send us a bill of material, a routing and one closed period. We will construct the comparison and tell you honestly if deferral is the right answer."
    },
    {
        platform: "business-central",
        service: "business-applications",
        industry: "retail-distribution",
        icon: "erp",
        pages: 12,
        title: "Inventory accuracy as a working capital instrument",
        description: "Inventory accuracy is treated as a warehouse metric. It is a planning input, and the buffer carried to compensate for it is working capital.",
        publishedAt: new Date("2026-05-24"),
        readTime: "13 min read",
        subtitle: "Why distributors carry buffer stock to compensate for a number they could simply fix",
        inThisPaper: [
            "An abstract and four numbered findings",
            "Analysis across 3 sections",
            "A framework you can apply: The accuracy programme",
            "Implications separated by role",
            "5 references to Microsoft documentation"
        ],
        abstractParagraphs: [
            "A distributor operating at eighty-five per cent inventory accuracy carries buffer stock everywhere downstream to compensate. That buffer is working capital, it is measurable, and it is usually larger than the cost of the programme that would remove the need for it.",
            "This paper reframes inventory accuracy as a financial rather than an operational metric, examines why the capability to fix it is frequently already licensed and unused, and sets out the sequence that produces improvement without stopping shipments."
        ],
        findings: [
            { number: 1, order: 1, title: "Accuracy is a planning input, not a warehouse score", description: "Every downstream planning decision compensates for the error rate. The compensation is buffer stock, and buffer stock is cash." },
            { number: 2, order: 2, title: "The capability is usually already licensed", description: "Directed put-away and pick, wave planning and cycle counting ship inside Business Central Premium. Many distributors run the basic configuration without knowing the other exists." },
            { number: 3, order: 3, title: "The barrier is change management, not configuration", description: "Ten years of habit built around a paper process is a harder problem than the location setup flags, and it is what makes this get deferred." },
            { number: 4, order: 4, title: "Sequence determines whether the programme survives", description: "Receipts, then picking, then cycle counting. Attempting all three simultaneously in a live warehouse during peak is the version that becomes a cautionary story." }
        ],
        analysisBody: `<h2>The financial framing</h2>
<p>Ask a warehouse manager about inventory accuracy and you will get an operational answer. Ask a finance director what buffer stock costs and you will get a number.</p>
<p>These are the same conversation and they are almost never held together. Safety stock levels, reorder points and expediting frequency are all set to tolerate an error rate that nobody has costed, and the tolerance is carried permanently on the balance sheet.</p>
<p>Moving from roughly eighty-five per cent accuracy to ninety-eight releases that buffer. The mechanism is scanning and directed work rather than exhortation, and the return appears as working capital rather than as an operational efficiency.</p>
<h2>What is already available</h2>
<p>Business Central carries two distinct warehouse configurations, and most mid-market distributors are running the simpler one.</p>
<p>Directed put-away and pick has the system decide bin locations and sequence the picker's route. Warehouse receipts and shipments introduce a documented handling step that makes accuracy measurable in the first place. Wave picking consolidates multiple orders into one pass. Cycle counting by item velocity removes the need for an annual shutdown count. Bin policies keep forward pick locations replenished automatically.</p>
<p>None of this requires additional licensing for a Premium customer. It requires bin structure, item setup and a period of parallel operation, which is a project rather than a settings change — and that distinction is why it gets deferred.</p>
<ul>
<li>Directed put-away and pick, sequencing the picker along the physical route</li>
<li>Warehouse receipts and shipments as a documented handling step</li>
<li>Wave and batch picking consolidating orders into one pass</li>
<li>Cycle counting configured by item velocity rather than uniformly</li>
<li>Bin ranking and replenishment keeping forward pick locations stocked</li>
</ul>
<h2>Why implementations fail on the handheld</h2>
<p>This is where the programme succeeds or does not. If a put-away transaction is slow on the actual device in the actual aisle, it will be batched at the end of the shift or skipped, and accuracy will never recover.</p>
<p>Warehouse usability is a hard requirement rather than a preference. We test transaction time on the device the team will use, in the location they will use it, with the person who will do it, before rollout rather than after.</p>
<p>The second common failure is bin capacity checking configured against unreliable item dimension data. Capacity rules driven by wrong weights or cubes produce put-away suggestions the warehouse cannot follow, and confidence in the system evaporates within a week.</p>`,
        frameworkLede: "Every paper in this series ends with a framework you can run internally. We would rather you used it and reached your own conclusion than took ours on trust.",
        frameworkName: "The accuracy programme",
        frameworkDescription: "Five stages. The order is the whole method.",
        frameworkStages: [
            { number: 1, order: 1, title: "Measure", description: "Establish the current accuracy rate and cost the buffer carried to compensate for it." },
            { number: 2, order: 2, title: "Design", description: "Bin structure walked and numbered on the floor, in pick sequence, with the warehouse manager." },
            { number: 3, order: 3, title: "Receive", description: "Inbound accuracy first. Everything downstream inherits it." },
            { number: 4, order: 4, title: "Pick", description: "Directed picking second, tested on the actual handheld in the actual aisle." },
            { number: 5, order: 5, title: "Count", description: "Cycle counting last, once the underlying numbers are trustworthy enough to count against." }
        ],
        implicationsLede: "The same argument lands differently across an executive team. These are the three versions worth separating.",
        implications: [
            { order: 1, role: "For the finance director", text: "The business case is a working capital release, not an efficiency saving. Model it that way and it competes differently for capital." },
            { order: 2, role: "For the operations director", text: "Scanner transaction time is the make-or-break variable. Test it in the aisle before committing, and give the warehouse team a veto on the device." },
            { order: 3, role: "For the CIO", text: "Consider a new location for the transition rather than converting in place. Directed put-away and pick is difficult to reverse once enabled with stock present." }
        ],
        referencesLede: "Microsoft's own documentation for the product behaviour described above. We would rather you verified the basis than accepted our summary of it.",
        references: [
            { number: 1, order: 1, title: "Warehouse management overview", source: "Dynamics 365 Business Central documentation — basic and advanced warehouse configurations" },
            { number: 2, order: 2, title: "Design Details: Warehouse Management", source: "Business Central documentation — zones, bins, bin types and put-away templates" },
            { number: 3, order: 3, title: "Set up locations to use bins", source: "Business Central documentation — location setup flags and their implications" },
            { number: 4, order: 4, title: "Count, adjust and reclassify inventory", source: "Business Central documentation — physical inventory and cycle counting periods" },
            { number: 5, order: 5, title: "Design Details: Inventory Costing", source: "Business Central documentation — how accuracy affects valuation and cost adjustment" }
        ],
        referencesNote: "On these references: each entry names a Microsoft Learn article or documentation area by title, because deep links change while titles are stable. Searching the title on learn.microsoft.com will reach the current version. Where we have cited a figure or a product behaviour, it is Microsoft's statement rather than ours; where we have given a number of our own it is labelled as such in the text.",
        ctaText: "We will review your current warehouse configuration against what your licence already covers, and cost the buffer you are carrying, before you commit to any programme."
    },
    {
        platform: "business-central",
        service: "business-applications",
        industry: "small-mid-market",
        icon: "erp",
        pages: 11,
        title: "The mid-market ERP decision",
        description: "Nobody outgrows their accounting package on a particular Tuesday. It happens through a series of individually sensible workarounds until the workarounds are the process.",
        publishedAt: new Date("2026-02-22"),
        readTime: "12 min read",
        subtitle: "Four symptoms that indicate a system change, and two that look like it and are not",
        inThisPaper: [
            "An abstract and four numbered findings",
            "Analysis across 3 sections",
            "A framework you can apply: The mid-market decision",
            "Implications separated by role",
            "5 references to Microsoft documentation"
        ],
        abstractParagraphs: [
            "The difficulty in the mid-market ERP decision is knowing whether you have crossed the line, because from inside it always looks like you are one spreadsheet away from being fine.",
            "This paper sets out four symptoms that reliably indicate the system has become the constraint, two that are commonly mistaken for it, and the scoping principle that determines whether a mid-market implementation succeeds — which has almost nothing to do with the product selected."
        ],
        findings: [
            { number: 1, order: 1, title: "Four symptoms reliably indicate the system is the constraint", description: "A critical spreadsheet, duplicate data entry, a close slower than the period's relevance, and growth requiring proportional administrative hiring." },
            { number: 2, order: 2, title: "Two common triggers are not symptoms", description: "System age and reporting frustration. Replacing an ERP to fix a report is a very costly route to a dashboard." },
            { number: 3, order: 3, title: "Scope determines success more than product selection does", description: "The common mid-market failure is a programme so large it produces nothing for a year, by which point the sponsor has lost patience." },
            { number: 4, order: 4, title: "The reconciliation test is the honest measure of a migration", description: "If the new system cannot reproduce a period you have already closed and signed off, the migration is not finished." }
        ],
        analysisBody: `<h2>The four symptoms</h2>
<p>A spreadsheet has become critical infrastructure. Pricing, stock, scheduling or forecasting runs in a workbook one person maintains, and everybody knows it is fragile.</p>
<p>The same data is entered more than once. An order goes into the quoting tool, the accounting system and the shipping platform, and reconciling them costs more than the entry did.</p>
<p>Month end takes longer than the period it describes remains relevant. By the time management accounts arrive, the decisions they should have informed have been made.</p>
<p>Growth requires proportional administrative hiring. Every additional ten clients seems to need another coordinator, which caps the business at whatever headcount it can afford.</p>
<h2>The two that are not</h2>
<p>System age. Plenty of businesses run perfectly well on unfashionable software that does exactly what they need. Replacing something because it looks dated is an expensive aesthetic decision, and it is more common than owners admit.</p>
<p>Reporting frustration. It is real, and it is frequently a data or process problem rather than a system problem. We have seen several businesses propose an ERP replacement to solve a reporting complaint that turned out to be a chart of accounts and a dimension design issue, resolvable in weeks.</p>
<ul>
<li>A critical spreadsheet everybody knows is fragile</li>
<li>The same data entered into more than one system as routine</li>
<li>A close that outlasts the relevance of the period it describes</li>
<li>Growth requiring administrative hiring in proportion</li>
<li>Not: system age, and not: a report somebody wants that they cannot get</li>
</ul>
<h2>Scoping so phase one pays for phase two</h2>
<p>The most common mid-market ERP failure is not technical. It is a programme scoped so large that it consumes a year before producing anything, by which point the sponsor has lost patience and the business has lost interest.</p>
<p>A first phase that solves a specific, visible problem and proves itself changes the risk profile entirely. The organization gets a return before it commits further, and the second phase is authorised on evidence rather than on faith.</p>
<p>A supplier who cannot propose that structure is optimising for their own revenue rather than your outcome, and it is a reasonable question to ask directly during selection.</p>`,
        frameworkLede: "Every paper in this series ends with a framework you can run internally. We would rather you used it and reached your own conclusion than took ours on trust.",
        frameworkName: "The mid-market decision",
        frameworkDescription: "Five steps from symptom to signed-off migration.",
        frameworkStages: [
            { number: 1, order: 1, title: "Diagnose", description: "Test against the four symptoms. If only age or reporting applies, the answer is probably not ERP." },
            { number: 2, order: 2, title: "Quantify", description: "Cost the workaround estate — the spreadsheets, the duplicate entry, the close effort." },
            { number: 3, order: 3, title: "Scope", description: "A phase one that solves a visible problem and proves itself before phase two is commissioned." },
            { number: 4, order: 4, title: "Design", description: "Dimensions and posting groups before go-live. Adding a global dimension afterwards means reprocessing history." },
            { number: 5, order: 5, title: "Reconcile", description: "Reproduce a closed, signed-off period. Until that works, the migration is not finished." }
        ],
        implicationsLede: "The same argument lands differently across an executive team. These are the three versions worth separating.",
        implications: [
            { order: 1, role: "For the owner or managing director", text: "Ask any supplier to propose a phase one that proves itself. The answer tells you a great deal about whose outcome they are optimising for." },
            { order: 2, role: "For the finance director", text: "Dimension design constrains every report you will run for a decade. Spend the extra week on it before go-live rather than reprocessing history afterwards." },
            { order: 3, role: "For operations", text: "The reconciliation test is the one to insist on. It is uncomfortable, it is objective, and it catches the problems that otherwise appear in your first live month end." }
        ],
        referencesLede: "Microsoft's own documentation for the product behaviour described above. We would rather you verified the basis than accepted our summary of it.",
        references: [
            { number: 1, order: 1, title: "Dynamics 365 Business Central documentation", source: "Microsoft Learn — product capability and licensing tiers" },
            { number: 2, order: 2, title: "Work with dimensions", source: "Business Central documentation — global and shortcut dimensions and default dimension setup" },
            { number: 3, order: 3, title: "Financial reports and account schedules", source: "Business Central documentation — building management reporting from dimensions" },
            { number: 4, order: 4, title: "Data migration to Business Central", source: "Business Central documentation — migration tooling and opening balances" },
            { number: 5, order: 5, title: "Dynamics 365 2026 release wave plans", source: "Microsoft release plan documentation — agentic capability in finance processes" }
        ],
        referencesNote: "On these references: each entry names a Microsoft Learn article or documentation area by title, because deep links change while titles are stable. Searching the title on learn.microsoft.com will reach the current version. Where we have cited a figure or a product behaviour, it is Microsoft's statement rather than ours; where we have given a number of our own it is labelled as such in the text.",
        ctaText: "Send us a chart of accounts, an item list and a month of transactions. We will configure a demo with your own data and walk your finance lead through their own month end — including if it tells you not to change."
    },
    {
        platform: "business-central",
        service: "business-applications",
        industry: "manufacturing",
        icon: "erp",
        pages: 13,
        title: "From standard to actual: a costing transition",
        description: "The parallel quarter is the whole method. Switching without one produces an accurate number nobody trusts.",
        publishedAt: new Date("2025-11-23"),
        readTime: "14 min read",
        subtitle: "How to move quoting onto real production cost without disrupting a month end",
        inThisPaper: [
            "An abstract and four numbered findings",
            "Analysis across 3 sections",
            "A framework you can apply: The costing transition",
            "Implications separated by role",
            "5 references to Microsoft documentation"
        ],
        abstractParagraphs: [
            "Moving from standard to actual costing is technically straightforward and organizationally difficult, because the transition period is when finance has to trust two sets of numbers simultaneously.",
            "This paper sets out why the parallel quarter is not optional, why the comparison should be made by product family rather than by part, and what repricing looks like when the variance turns out to be concentrated in your longest-standing accounts."
        ],
        findings: [
            { number: 1, order: 1, title: "The parallel quarter is the method, not a precaution", description: "Comparing actual against standard across a full quarter is what makes the resulting repricing defensible internally." },
            { number: 2, order: 2, title: "Compare by product family, not by part", description: "Part-level noise obscures the pattern. Family-level variance is where the commercial decisions are." },
            { number: 3, order: 3, title: "Costing method is set per item, which makes staged migration possible", description: "Stable purchased components can remain on standard while manufactured items move. This is a legitimate mixed model." },
            { number: 4, order: 4, title: "The uncomfortable finding is usually concentrated in long-standing accounts", description: "Customers served at a loss are rarely new ones. That conversation is what the project is actually for." }
        ],
        analysisBody: `<h2>Why the parallel quarter matters</h2>
<p>The technical transition is a configuration exercise. The organizational transition is that finance has to accept a new set of numbers while still closing on the old ones, and that acceptance is earned rather than assumed.</p>
<p>Running both models across a full quarter produces a comparison against a period the business already understands, which is what allows the repricing conversation to happen on evidence rather than on assertion.</p>
<p>It also surfaces the operational problems — routings that describe an idealised process, work centre rates set when the equipment was installed — before they appear as unexplainable variance in a live costing model.</p>
<h2>Doing the comparison well</h2>
<p>Roll costs up by product family before looking at individual parts. Part-level variance is noisy and it obscures the pattern that matters commercially.</p>
<p>Compare a full quarter so seasonality and mix do not distort the picture. And separate the variance by type — material, capacity, subcontract — because a single combined variance account tells you that something moved and nothing about why.</p>
<p>Where a work centre covers genuinely different operations, split it before running the comparison. A blended rate across dissimilar work is the most common source of variance nobody can explain, and it will discredit the exercise.</p>
<ul>
<li>Costing method set per item category, staged rather than switched wholesale</li>
<li>Work centre and machine centre rates reviewed against current payroll and overhead</li>
<li>Variance accounts separated by material, capacity and subcontract</li>
<li>Comparison rolled up by product family across a full quarter</li>
<li>Work centres split where they cover dissimilar operations</li>
</ul>
<h2>The repricing conversation</h2>
<p>The finding is usually that a handful of long-standing accounts are being served at a loss, and that is the conversation nobody looks forward to and the one that pays for the project.</p>
<p>Reprice in sequence rather than across the board: hardest variance first, starting with the customer relationships strong enough to survive a conversation. A blanket price increase applied because a costing exercise produced numbers is how a technically correct project damages a commercial position.</p>
<p>Keep the standard cost populated during the parallel period for reporting continuity, and switch only once finance is ready. There is no prize for switching quickly.</p>`,
        frameworkLede: "Every paper in this series ends with a framework you can run internally. We would rather you used it and reached your own conclusion than took ours on trust.",
        frameworkName: "The costing transition",
        frameworkDescription: "Five stages. The middle one is the whole method.",
        frameworkStages: [
            { number: 1, order: 1, title: "Review", description: "Routings, bills of material and work centre rates before anything is switched." },
            { number: 2, order: 2, title: "Stage", description: "Costing method per item category, so migration happens by group rather than as an event." },
            { number: 3, order: 3, title: "Run parallel", description: "A full quarter with both models accumulating. This is not optional." },
            { number: 4, order: 4, title: "Compare", description: "By product family, with variance separated by material, capacity and subcontract." },
            { number: 5, order: 5, title: "Reprice", description: "In sequence, hardest variance first, with the relationships that can carry the conversation." }
        ],
        implicationsLede: "The same argument lands differently across an executive team. These are the three versions worth separating.",
        implications: [
            { order: 1, role: "For the CFO", text: "The parallel quarter is what makes the repricing defensible. Compressing it saves a quarter and costs you the evidence base for the conversation that follows." },
            { order: 2, role: "For the commercial director", text: "The finding will name accounts. Plan the sequence before the numbers are circulated rather than reacting once they are." },
            { order: 3, role: "For operations", text: "Actual costing does not fix inaccurate routings; it makes them visible as variance. Correct them before the parallel quarter or spend it investigating the wrong thing." }
        ],
        referencesLede: "Microsoft's own documentation for the product behaviour described above. We would rather you verified the basis than accepted our summary of it.",
        references: [
            { number: 1, order: 1, title: "Design Details: Inventory Costing", source: "Business Central documentation — how cost flows through inventory" },
            { number: 2, order: 2, title: "Design Details: Costing Methods", source: "Business Central documentation — valuation base by method" },
            { number: 3, order: 3, title: "Design Details: Variance", source: "Business Central documentation — variance types and their posting" },
            { number: 4, order: 4, title: "Setup Best Practices: Costing Method", source: "Business Central documentation — method selection by item type" },
            { number: 5, order: 5, title: "Design Details: Changing Costing Methods for Items", source: "Business Central documentation — why the method cannot simply be switched" }
        ],
        referencesNote: "On these references: each entry names a Microsoft Learn article or documentation area by title, because deep links change while titles are stable. Searching the title on learn.microsoft.com will reach the current version. Where we have cited a figure or a product behaviour, it is Microsoft's statement rather than ours; where we have given a number of our own it is labelled as such in the text.",
        ctaText: "Give us a real bill of material and routing for one product family and we will show you the cost roll-up in a demo environment using your own part numbers, before any commercial conversation."
    },

    // ===== MICROSOFT PURVIEW PAPERS =====
    {
        platform: "purview",
        service: "managed-it-security",
        industry: "healthcare",
        icon: "docs",
        pages: 16,
        title: "Information governance as an AI prerequisite",
        description: "An examination of why AI deployments in provider organizations pause, and what the sequencing should be instead.",
        publishedAt: new Date("2026-07-19"),
        readTime: "17 min read",
        subtitle: "Why healthcare AI programmes stall on permissions rather than on models",
        inThisPaper: [
            "An abstract and four numbered findings",
            "Analysis across 3 sections",
            "A framework you can apply: The readiness sequence",
            "Implications separated by role",
            "5 references to Microsoft documentation"
        ],
        abstractParagraphs: [
            "Almost every healthcare AI pilot we have seen paused was paused for the same reason, and it was never the model. It was a clinician asking a reasonable question and receiving a document they were technically permitted to open and had no business reading.",
            "This paper argues that information governance is not a parallel workstream to AI adoption but a prerequisite for it, sets out what the assessment should establish, and proposes a sequence that adds roughly six weeks to a programme and removes its most likely failure mode."
        ],
        findings: [
            { number: 1, order: 1, title: "AI does not create the permission problem; it audits it", description: "The oversharing was always present. What changed is that finding an overshared document used to require knowing it existed, and now it requires asking a reasonable question." },
            { number: 2, order: 2, title: "Exposure concentrates, which makes remediation tractable", description: "In every assessment we have run, a small number of sites carry a disproportionate share of the risk. Remediating those covers most of the exposure." },
            { number: 3, order: 3, title: "Site ownership is the binding constraint, not technology", description: "Orphaned sites block remediation entirely, because nobody can approve a permission change. This is administrative work and it is usually the longest part of the programme." },
            { number: 4, order: 4, title: "Retention is a governance control that AI makes urgent", description: "An assistant reasoning across your content will reason across superseded drafts and material you should have disposed of. Retention stops being a compliance obligation and becomes an accuracy one." }
        ],
        analysisBody: `<h2>Why healthcare estates overshare</h2>
<p>Clinical work is collaborative and urgent, and the sharing model rewards speed. A consultant needs a protocol at eleven at night, so somebody shares it with everyone in the organization because that link works immediately and a permissions request does not.</p>
<p>Repeat that across a decade and a merged estate that has absorbed two acquisitions, and the effective permissions bear no relationship to anyone's intent.</p>
<p>Microsoft's own tooling reflects how common this is. SharePoint Advanced Management now reports specifically on files shared with Everyone Except External Users — the exact pattern that causes most of it — and delivers the report as a downloadable export rather than a dashboard because the row counts defeat on-screen review.</p>
<h2>What the assessment should establish</h2>
<p>Not a list of sites. A list of content reachable by more people than the owner believes, weighted by how sensitive it is.</p>
<p>The distinction matters because volume is a poor proxy for risk. A site with ten thousand overshared documents that are all published policies is a lower priority than one with forty documents containing patient-identifiable material.</p>
<ul>
<li>Broad-access sharing links on libraries containing patient-identifiable data</li>
<li>Permission inheritance broken years ago and never reviewed since</li>
<li>Sites with no active owner, where nobody can approve a change</li>
<li>Content with no sensitivity label, in libraries where labelling was assumed automatic</li>
<li>Guest and external access that outlived the project justifying it</li>
</ul>
<h2>The sequence, and why reversing it fails</h2>
<p>Discovery first, remediation second, deployment third. Organizations that reverse the first two spend the pilot period arguing about individual documents instead of learning whether the technology helps.</p>
<p>There is a second reason the order matters. A pilot group given access during remediation will find the unremediated content, and the finding will reach leadership as an incident rather than as a planned discovery. The same fact, arriving in a different frame, produces a paused programme instead of a funded one.</p>
<p>Microsoft's data security posture management for AI now surfaces which AI applications are being used and what data they reach, which makes the assessment considerably cheaper to run than it was two years ago. That is an argument for running it, not for skipping it.</p>`,
        frameworkLede: "Every paper in this series ends with a framework you can run internally. We would rather you used it and reached your own conclusion than took ours on trust.",
        frameworkName: "The readiness sequence",
        frameworkDescription: "Five stages. The first three belong before any licence is assigned.",
        frameworkStages: [
            { number: 1, order: 1, title: "Discover", description: "Establish where sensitive content is and who can currently reach it, using governance reporting rather than assumption." },
            { number: 2, order: 2, title: "Prioritise", description: "Rank by content sensitivity, not by exposure volume. Ownership gaps come first because they block everything." },
            { number: 3, order: 3, title: "Remediate", description: "Fix the highest-risk sites with owners involved. Bulk action across the estate breaks something a ward relies on." },
            { number: 4, order: 4, title: "Deploy", description: "Pilot with a clinical function, not only with IT, and with a route to report a wrong answer." },
            { number: 5, order: 5, title: "Sustain", description: "Re-baseline on a cadence. Content keeps arriving and the position drifts within a year." }
        ],
        implicationsLede: "The same argument lands differently across an executive team. These are the three versions worth separating.",
        implications: [
            { order: 1, role: "For the CIO", text: "Budget for the delay. Six weeks of remediation before deployment is normal and it is the difference between a programme that proceeds and one that pauses publicly." },
            { order: 2, role: "For the Chief Medical Officer", text: "The clinical risk is not a wrong answer; it is a correct answer drawn from a document the clinician should not have seen. That is an information governance failure with clinical consequences and it belongs on your risk register." },
            { order: 3, role: "For the Privacy Officer", text: "You will get a defensible position out of this whether or not the AI programme proceeds. The assessment has standalone value and should be framed that way if the AI business case slips." }
        ],
        referencesLede: "Microsoft's own documentation for the product behaviour described above. We would rather you verified the basis than accepted our summary of it.",
        references: [
            { number: 1, order: 1, title: "Microsoft Purview data security posture management for AI", source: "Microsoft Purview documentation — visibility into AI application usage and the data reached" },
            { number: 2, order: 2, title: "SharePoint Advanced Management", source: "SharePoint documentation — governance reporting including sharing links and permission state" },
            { number: 3, order: 3, title: "Sensitivity labels in Microsoft Purview", source: "Microsoft Purview Information Protection — label taxonomy, auto-labelling and simulation mode" },
            { number: 4, order: 4, title: "Retention policies and retention labels", source: "Microsoft Purview Data Lifecycle Management — automatic application and disposition review" },
            { number: 5, order: 5, title: "Microsoft 365 Copilot data protection and security", source: "Microsoft 365 Copilot documentation — how Copilot honours existing permissions" }
        ],
        referencesNote: "On these references: each entry names a Microsoft Learn article or documentation area by title, because deep links change while titles are stable. Searching the title on learn.microsoft.com will reach the current version. Where we have cited a figure or a product behaviour, it is Microsoft's statement rather than ours; where we have given a number of our own it is labelled as such in the text.",
        ctaText: "We run the readiness assessment as a scoped, fixed-price engagement, and the findings report is yours whether or not you take the remediation work further with us — including if it tells you to delay."
    },
    {
        platform: "purview",
        service: "managed-it-security",
        industry: "public-sector",
        icon: "docs",
        pages: 13,
        title: "The cost of keeping everything",
        description: "Most agencies have a documented retention schedule and delete nothing. The bill arrives with the next records request.",
        publishedAt: new Date("2026-05-10"),
        readTime: "14 min read",
        subtitle: "Why public sector retention schedules exist and do not operate, and what that costs at disclosure",
        inThisPaper: [
            "An abstract and four numbered findings",
            "Analysis across 3 sections",
            "A framework you can apply: Making a schedule operate",
            "Implications separated by role",
            "5 references to Microsoft documentation"
        ],
        abstractParagraphs: [
            "There is a moment in every public records request where somebody realises the scope includes fifteen years of material that should have been disposed of a decade ago. The request is still valid, the material is still discoverable, and it all has to be reviewed.",
            "This paper examines why retention schedules reliably fail to operate, argues that the disclosure cost rather than the storage cost is the real business case, and sets out how to design disposal so that no individual has to make the decision that nobody wants to make."
        ],
        findings: [
            { number: 1, order: 1, title: "Deletion fails because the individual incentive runs the wrong way", description: "The downside of keeping something is diffuse; the downside of deleting something needed is immediate and personal. The rational individual choice is always to keep it." },
            { number: 2, order: 2, title: "Storage cost is the weakest argument and the one most often used", description: "Disclosure scope is the argument that moves agency leadership, because it converts a compliance obligation into an operational cost they already feel." },
            { number: 3, order: 3, title: "Event-based retention matches how public schedules are actually written", description: "Most series retain from case closure or contract end, not from creation. Calendar-based retention misapplies the schedule at scale." },
            { number: 4, order: 4, title: "Disposition review is what makes disposal defensible", description: "A named reviewer and a timestamp answer the question 'why was this destroyed' in a way that 'the policy did it' does not." }
        ],
        analysisBody: `<h2>Why schedules do not operate</h2>
<p>Applying a retention schedule requires a decision that nobody wants to make individually. Deletion is irreversible, the person who created the record has usually left, and the consequence of destroying something later needed lands on the person who approved it.</p>
<p>So the estate grows indefinitely, and it grows in a way that is invisible until a disclosure exercise forces somebody to look at it.</p>
<p>The design response is to remove the individual judgement and replace it with automatic application plus a review step. Labels applied by location and content type rather than by asking users to classify. Retention triggered by an event rather than a date. Disposition confirmed by a named records officer rather than happening silently.</p>
<ul>
<li>Retention labels applied automatically by location and content type</li>
<li>Event-based triggers on case closure, contract end or departure rather than on a date</li>
<li>A small label set grouped by retention behaviour rather than mirroring every series</li>
<li>Disposition review with named reviewers and deputies per series</li>
<li>Every disposal decision logged, with the log itself retained</li>
</ul>
<h2>The disclosure argument</h2>
<p>Storage cost falls, which is worth mentioning and rarely persuades anyone. The argument that lands with agency leadership is different.</p>
<p>A public records request scoped against a properly disposed estate is a fraction of the work. One agency we worked with reduced its response time from weeks to days purely because there was dramatically less material in scope; nothing about the review process itself changed.</p>
<p>That is a service-delivery argument and a cost argument simultaneously, and it is measurable in a way storage savings are not. It also answers the question members ask, which is not about efficiency but about whether the agency can meet its statutory obligations.</p>
<h2>The AI connection</h2>
<p>Retention is also the control that makes AI adoption defensible. An assistant that can reason across your content will reason across superseded drafts, working papers and material that should have been disposed of.</p>
<p>Agencies planning an AI deployment tend to discover retention as a prerequisite partway through, at which point it becomes an obstacle rather than a programme. Designing it first is considerably easier and it delivers the disclosure benefit regardless of whether the AI programme proceeds.</p>`,
        frameworkLede: "Every paper in this series ends with a framework you can run internally. We would rather you used it and reached your own conclusion than took ours on trust.",
        frameworkName: "Making a schedule operate",
        frameworkDescription: "Five stages. The first is the one agencies most often skip.",
        frameworkStages: [
            { number: 1, order: 1, title: "Review", description: "Confirm the schedule is current. Automating an obsolete schedule automates the wrong thing at scale." },
            { number: 2, order: 2, title: "Group", description: "Collapse records series into a small label set organised by retention behaviour, not by series." },
            { number: 3, order: 3, title: "Automate", description: "Apply by location and content type. Asking users to classify produces inconsistency." },
            { number: 4, order: 4, title: "Trigger", description: "Use event-based retention where the schedule is event-driven, which is most of it." },
            { number: 5, order: 5, title: "Review again", description: "Disposition review with named officers, so destruction is a recorded decision." }
        ],
        implicationsLede: "The same argument lands differently across an executive team. These are the three versions worth separating.",
        implications: [
            { order: 1, role: "For the Head of Information Governance", text: "Lead the business case with disclosure scope rather than storage. It is the argument that reaches leadership and it is the one you can evidence afterwards." },
            { order: 2, role: "For the CIO", text: "Automatic application by location is the highest-value, lowest-effort step. Manual classification at scale will not be sustained and produces a partially labelled estate." },
            { order: 3, role: "For the Monitoring Officer", text: "A disposal with a named reviewer and a timestamp is defensible. Silent policy deletion is technically simpler and considerably harder to explain." }
        ],
        referencesLede: "Microsoft's own documentation for the product behaviour described above. We would rather you verified the basis than accepted our summary of it.",
        references: [
            { number: 1, order: 1, title: "Retention policies and retention labels", source: "Microsoft Purview Data Lifecycle Management — policies, labels and precedence" },
            { number: 2, order: 2, title: "Automatically apply a retention label", source: "Microsoft Purview documentation — auto-application by location, content type and classifier" },
            { number: 3, order: 3, title: "Start retention when an event occurs", source: "Microsoft Purview documentation — event-based retention and asset identifiers" },
            { number: 4, order: 4, title: "Disposition of content", source: "Microsoft Purview Records Management — disposition review stages and evidence" },
            { number: 5, order: 5, title: "eDiscovery in Microsoft Purview", source: "Microsoft Purview documentation — holds, search scope and export" }
        ],
        referencesNote: "On these references: each entry names a Microsoft Learn article or documentation area by title, because deep links change while titles are stable. Searching the title on learn.microsoft.com will reach the current version. Where we have cited a figure or a product behaviour, it is Microsoft's statement rather than ours; where we have given a number of our own it is labelled as such in the text.",
        ctaText: "We will run a scoped retention review against one department, including what a records request currently pulls in and what it would pull in afterwards, so the disclosure argument is made with your own numbers."
    },
    {
        platform: "purview",
        service: "managed-it-security",
        industry: "financial-services",
        icon: "docs",
        pages: 14,
        title: "Evidence in the flow of work",
        description: "The decisions were made properly. The evidence just was not captured at the time, so it has to be reconstructed.",
        publishedAt: new Date("2026-03-15"),
        readTime: "15 min read",
        subtitle: "Why examination preparation is a symptom, and what changing the capture point does to it",
        inThisPaper: [
            "An abstract and four numbered findings",
            "Analysis across 3 sections",
            "A framework you can apply: Moving evidence into the workflow",
            "Implications separated by role",
            "5 references to Microsoft documentation"
        ],
        abstractParagraphs: [
            "Ask a compliance officer what examination preparation involves and you will hear about a project: several people, several weeks, pulled off their day jobs to assemble evidence that decisions were made properly.",
            "This paper argues that the preparation effort is a symptom of when evidence is captured rather than how hard the team works, identifies the four control points where capture determines everything downstream, and examines what AI adoption adds to the same problem."
        ],
        findings: [
            { number: 1, order: 1, title: "Examiners consistently ask four things, and all four are capture questions", description: "Who approved this, on what information, when, and did the control operate throughout the period. Each is instant if captured in workflow and expensive if reconstructed." },
            { number: 2, order: 2, title: "The blocker is that processes still run on email and shared drives", description: "Capturing evidence in the flow of work requires the workflow to exist in a system. Where it does not, no amount of documentation discipline compensates." },
            { number: 3, order: 3, title: "Exceptions become permanent by inattention", description: "An exception granted without an owner and an expiry is indistinguishable from a policy after eighteen months." },
            { number: 4, order: 4, title: "AI adds a second unevidenced surface unless designed for", description: "What an assistant reached and what was sent in a prompt are now examination-relevant questions." }
        ],
        analysisBody: `<h2>The four control points</h2>
<p>Approvals recorded in a system with a timestamp and the information the approver saw, rather than in an email thread. Access reviews performed on a schedule with the outcome recorded, including where access was left unchanged and why. Exceptions logged when granted, with an owner and an expiry. Screening and disposition results attached to the relationship record automatically rather than filed separately.</p>
<p>Each of these is answerable instantly if it happened in a workflow and expensive if it happened in a mailbox.</p>
<ul>
<li>Approvals with a timestamp and the evidence pack the approver actually saw</li>
<li>Access reviews with recorded outcomes, including the decision to change nothing</li>
<li>Exceptions with a named owner and an expiry date, reviewed before renewal</li>
<li>Screening results attached to the record automatically rather than filed</li>
<li>Communication supervision scoped to a stated obligation rather than broadly</li>
</ul>
<h2>Why this is a systems decision</h2>
<p>Compliance teams already know all of the above. What prevents it is that significant processes still run on email and shared drives, and capturing evidence in the flow of work requires the workflow to exist in a system first.</p>
<p>The fix is therefore to move those processes into a workflow with evidence as a by-product — not to ask people to document more carefully. Documentation discipline degrades under pressure, which is exactly when the evidence matters most.</p>
<p>The second-order benefit is the one that rarely appears in a business case: the compliance function stops spending its expertise on assembly and starts spending it on the questions that require judgement. Nobody counts what a compliance officer could have been doing instead.</p>
<h2>What AI adds</h2>
<p>Institutions deploying assistants and agents face a new version of the same question: what did the assistant reach, what was sent in a prompt, and can that be evidenced eighteen months later.</p>
<p>Microsoft's data security posture management for AI covers this specifically, which is a signal about how common the gap is. Institutions with mature evidence capture will find the extension straightforward. Institutions without it are adding a second unevidenced surface to an existing problem, and the examination question will be the same one they already cannot answer.</p>`,
        frameworkLede: "Every paper in this series ends with a framework you can run internally. We would rather you used it and reached your own conclusion than took ours on trust.",
        frameworkName: "Moving evidence into the workflow",
        frameworkDescription: "Five stages. The first is a mapping exercise and the last is what proves it.",
        frameworkStages: [
            { number: 1, order: 1, title: "Map", description: "Identify which regulated processes currently run on email and shared drives." },
            { number: 2, order: 2, title: "Move", description: "Put those processes into a workflow where the evidence is a by-product." },
            { number: 3, order: 3, title: "Bound", description: "Give every exception an owner and an expiry, and review before renewal." },
            { number: 4, order: 4, title: "Extend", description: "Cover AI interactions with the same discipline as the rest of the estate." },
            { number: 5, order: 5, title: "Rehearse", description: "Simulate an examination request and time the responses. The findings are the plan." }
        ],
        implicationsLede: "The same argument lands differently across an executive team. These are the three versions worth separating.",
        implications: [
            { order: 1, role: "For the Chief Compliance Officer", text: "The return is your team's expertise redirected from assembly to judgement. That is the argument for the investment and it is the one least often made." },
            { order: 2, role: "For the CIO", text: "Audit retention defaults are shorter than most regulatory windows. Verify by querying at the far edge before you rely on it." },
            { order: 3, role: "For the Chief Risk Officer", text: "Exceptions without expiry are the quiet failure. A periodic review that forces re-justification is cheap and it is what an examiner tests." }
        ],
        referencesLede: "Microsoft's own documentation for the product behaviour described above. We would rather you verified the basis than accepted our summary of it.",
        references: [
            { number: 1, order: 1, title: "Microsoft Purview Audit", source: "Microsoft Purview documentation — audit log retention policies and search" },
            { number: 2, order: 2, title: "Microsoft Purview Communication Compliance", source: "Microsoft Purview documentation — policy scope, sampling and reviewer roles" },
            { number: 3, order: 3, title: "Microsoft Purview data security posture management for AI", source: "Microsoft Purview documentation — prompt and response visibility" },
            { number: 4, order: 4, title: "Access reviews in Microsoft Entra ID Governance", source: "Microsoft Entra documentation — scheduled reviews and recorded outcomes" },
            { number: 5, order: 5, title: "Privileged Identity Management", source: "Microsoft Entra documentation — time-bound elevation with justification" }
        ],
        referencesNote: "On these references: each entry names a Microsoft Learn article or documentation area by title, because deep links change while titles are stable. Searching the title on learn.microsoft.com will reach the current version. Where we have cited a figure or a product behaviour, it is Microsoft's statement rather than ours; where we have given a number of our own it is labelled as such in the text.",
        ctaText: "We will review one control process end to end and show you what capturing the evidence in the flow of work would look like against your examination expectations."
    },
    {
        platform: "purview",
        service: "managed-it-security",
        industry: "professional-services",
        icon: "docs",
        pages: 12,
        title: "Client confidentiality at scale",
        description: "Professional services firms are increasingly losing time at procurement rather than at pitch, and the reason is a document nobody owns internally.",
        publishedAt: new Date("2025-12-28"),
        readTime: "13 min read",
        subtitle: "Why the security questionnaire became a sales gate, and what a standing answer set is worth",
        inThisPaper: [
            "An abstract and four numbered findings",
            "Analysis across 3 sections",
            "A framework you can apply: Turning a liability into a differentiator",
            "Implications separated by role",
            "5 references to Microsoft documentation"
        ],
        abstractParagraphs: [
            "A firm wins the pitch, agrees the commercials, and then receives a forty-page security questionnaire from the client's procurement team. Three weeks later the engagement is still not signed.",
            "This paper argues that questionnaire turnaround has become a genuine competitive factor for firms handling client data, that the delays come from questions with no internal owner rather than from technically difficult ones, and that most of the underlying capability is already licensed."
        ],
        findings: [
            { number: 1, order: 1, title: "The delays come from unowned questions, not hard ones", description: "Where is client data, how is access revoked, what happens at engagement end, do you use subcontractors. None is technically difficult; each lacks an owner." },
            { number: 2, order: 2, title: "A standing answer set converts three weeks into two days", description: "Maintained quarterly and owned by one person, rather than reconstructed per engagement by whoever is available." },
            { number: 3, order: 3, title: "Closing a gap beats writing carefully around it", description: "An evasive answer will be probed. A closed gap is one sentence and does not recur." },
            { number: 4, order: 4, title: "Most of the required capability is already inside existing licensing", description: "Conditional access, device compliance, classification, retention and audit logging are commonly held and not deployed." }
        ],
        analysisBody: `<h2>What changed</h2>
<p>Clients have been through their own supply chain incidents. Their insurers now ask about third-party risk. Regulated clients have obligations that flow down to their advisers.</p>
<p>The questionnaire is not procurement being difficult; it is procurement discharging a duty, and it is now routine rather than exceptional for any firm handling client data.</p>
<p>The firms that handle it well treat it as a standing capability rather than a per-deal scramble, and a meaningful number report closing faster as a direct result.</p>
<h2>The questions that cause delay</h2>
<p>Not the technically difficult ones. The ones nobody has an owner for.</p>
<p>Where is client data stored, in which country, and can that be evidenced. How is access to client data granted, reviewed and revoked. What happens to client data at the end of an engagement. Do you use subcontractors and are they bound by the same terms. Have you tested your incident response plan, and when. What certifications do you hold and are they current.</p>
<p>Each is answerable in a day by a firm that maintains a current answer set, and in three weeks by one that reconstructs it per engagement from several people who each hold part of the answer.</p>
<ul>
<li>Client data location, per engagement and per data type, evidenced not asserted</li>
<li>Access grant, review and revocation with recorded outcomes</li>
<li>End-of-engagement data return and deletion, with a stated timescale</li>
<li>Subcontractor use, disclosed and bound by equivalent terms</li>
<li>Incident response plan tested, with a date</li>
</ul>
<h2>The three habits that work</h2>
<p>Maintain a current answer set reviewed quarterly rather than reconstructed per deal. Make one person accountable for it. And close the gaps rather than writing careful answers around them.</p>
<p>The third is the one that pays. A gap answered evasively will be probed by a competent procurement team, and the probing costs more time than the remediation would have. A gap closed is a sentence and it does not recur.</p>
<p>The frequent finding when we run this exercise is not that the firm needs to buy something. It is that capability inside an existing subscription was never deployed, and the questionnaire is the first time anybody has been asked to demonstrate it.</p>`,
        frameworkLede: "Every paper in this series ends with a framework you can run internally. We would rather you used it and reached your own conclusion than took ours on trust.",
        frameworkName: "Turning a liability into a differentiator",
        frameworkDescription: "Five steps to a two-day turnaround.",
        frameworkStages: [
            { number: 1, order: 1, title: "Collect", description: "Gather the last five questionnaires you completed. The recurring questions are your scope." },
            { number: 2, order: 2, title: "Own", description: "One named person accountable for the answer set, reviewed quarterly." },
            { number: 3, order: 3, title: "Audit", description: "Establish which answers your existing licensing can already evidence. Usually more than expected." },
            { number: 4, order: 4, title: "Close", description: "Remediate gaps rather than writing around them. An evasive answer will be probed." },
            { number: 5, order: 5, title: "Evidence", description: "Attach the demonstration to each answer, so the response is a document rather than an assertion." }
        ],
        implicationsLede: "The same argument lands differently across an executive team. These are the three versions worth separating.",
        implications: [
            { order: 1, role: "For the managing partner", text: "Two-day turnaround is a competitive advantage against larger firms with slower processes, and it is achievable with a standing answer set and one owner." },
            { order: 2, role: "For the COO", text: "The delays are organizational rather than technical. Assigning ownership of the answer set is the single highest-return action available." },
            { order: 3, role: "For the IT director", text: "Run the licensing audit first. In most firms a meaningful share of the questionnaire is already covered by entitlements held and not deployed." }
        ],
        referencesLede: "Microsoft's own documentation for the product behaviour described above. We would rather you verified the basis than accepted our summary of it.",
        references: [
            { number: 1, order: 1, title: "Microsoft Purview Information Protection", source: "Microsoft Purview documentation — classification and sensitivity labelling" },
            { number: 2, order: 2, title: "Microsoft Purview Audit", source: "Microsoft Purview documentation — evidencing access over a defined period" },
            { number: 3, order: 3, title: "Microsoft Entra access reviews", source: "Microsoft Entra ID Governance — scheduled review with recorded outcomes" },
            { number: 4, order: 4, title: "Microsoft Purview Data Lifecycle Management", source: "Microsoft Purview documentation — retention and end-of-engagement disposal" },
            { number: 5, order: 5, title: "Microsoft Service Trust Portal", source: "Microsoft compliance documentation — certifications and audit reports for client questionnaires" }
        ],
        referencesNote: "On these references: each entry names a Microsoft Learn article or documentation area by title, because deep links change while titles are stable. Searching the title on learn.microsoft.com will reach the current version. Where we have cited a figure or a product behaviour, it is Microsoft's statement rather than ours; where we have given a number of our own it is labelled as such in the text.",
        ctaText: "Send us a questionnaire you have recently been asked to complete. We will map which answers your current environment can already evidence and what the remainder would take."
    },

    // ===== MICROSOFT FABRIC PAPERS =====
    {
        platform: "fabric",
        service: "data-ai-integration",
        industry: "financial-services",
        icon: "chart",
        pages: 18,
        title: "One version of the truth: what it costs and what it is worth",
        description: "Consolidation projects are usually justified on efficiency and delivered on hope. This paper examines where the value actually is and what the honest cost looks like.",
        publishedAt: new Date("2026-07-12"),
        readTime: "19 min read",
        subtitle: "An honest assessment of data platform consolidation in a regulated institution",
        inThisPaper: [
            "An abstract and four numbered findings",
            "Analysis across 3 sections",
            "A framework you can apply: The consolidation sequence",
            "Implications separated by role",
            "5 references to Microsoft documentation"
        ],
        abstractParagraphs: [
            "Every institution above a certain size has a data consolidation programme, a business case built on analyst productivity, and a set of extracts that continue to circulate regardless.",
            "This paper argues that the productivity case is the weakest available justification, that the real value is in traceability and decision speed, and that the cost most programmes underestimate is not engineering but the governance work of agreeing what words mean. It is written for institutions deciding whether to start, and for those wondering why a programme already underway has not yet changed anything."
        ],
        findings: [
            { number: 1, order: 1, title: "Definitional disagreement is the binding constraint", description: "Two functions that cannot agree what a customer is will never reconcile their reports, and no architecture resolves that. The governance work is the project; the engineering is the implementation." },
            { number: 2, order: 2, title: "Traceability is worth more than speed in a regulated setting", description: "An examiner asks who approved this, on what information, and whether the control operated throughout. A platform that answers those instantly is worth more than one that answers ordinary questions faster." },
            { number: 3, order: 3, title: "The extracts stop when the platform is trusted, not when it is complete", description: "Parallel spreadsheets persist until the governed number has survived being disputed. Building trust is a sequence of small public wins rather than a launch." },
            { number: 4, order: 4, title: "Consumption cost behaves differently from licensed software", description: "Capacity-based compute rewards efficient design and punishes inattention in a way perpetual licensing never did. Monitoring belongs with the first workload, not after the first invoice." }
        ],
        analysisBody: `<h2>What the technology changed and what it did not</h2>
<p>Microsoft Fabric puts every analytics workload over one logical lake, with data held in open table format so each workload reads the same copy rather than maintaining its own extract. Power BI reads it directly through Direct Lake without an import step, removing the refresh window that made reporting stale before anyone read it.</p>
<p>These are genuine architectural improvements and they solve the problem institutions least often have. The problem institutions most often have is that finance, risk and the front office each define margin differently, and each is defensible.</p>
<p>A single copy of the data does not settle that. It makes the disagreement more visible, which is useful, and it does not resolve it.</p>
<h2>Where the value actually is</h2>
<p>We would put it in three places, in order.</p>
<p>First, traceability. In a regulated institution the ability to trace a published figure back through every transformation to the originating record converts an internal report into something a board committee can act on. That capability is architectural and it is difficult to retrofit.</p>
<p>Second, decision latency. Not query speed — decision speed. A figure that arrives continuously rather than monthly changes which decisions are possible, and the value is entirely in what somebody does differently as a result.</p>
<p>Third, and least, analyst productivity. It is real, it is the easiest to model, and it is the argument most likely to be disputed by anybody who has seen a previous programme fail to deliver it.</p>
<ul>
<li>Lineage from published figure to source transaction, inspectable by a third party</li>
<li>Reconciliation to the general ledger built into the pipeline rather than performed afterwards</li>
<li>Row-level security sourced from the directory so entitlement is evidenced, not asserted</li>
<li>Definitions held once, in the model, so every report inherits them</li>
<li>Decision latency measured in days rather than reporting cycles</li>
</ul>
<h2>The cost most programmes underestimate</h2>
<p>Not engineering. Agreement.</p>
<p>Every institution we have worked with has underestimated the elapsed time required to get finance, risk and the business to sign up to one set of definitions. It is unglamorous, it involves people whose incentives differ, and it cannot be delegated to the data team without producing a platform the business disputes.</p>
<p>The second underestimate is capacity cost. Consumption-based compute is efficient when designed well and expensive when not, and the feedback arrives on an invoice a month later. An inefficient notebook or an over-refreshed model costs money in a way a perpetual licence never did.</p>`,
        frameworkLede: "Every paper in this series ends with a framework you can run internally. We would rather you used it and reached your own conclusion than took ours on trust.",
        frameworkName: "The consolidation sequence",
        frameworkDescription: "Five stages. Institutions that skip the first reliably rebuild it later.",
        frameworkStages: [
            { number: 1, order: 1, title: "Agree", description: "Definitions and owners for every metric that will be published, signed by the functions that use them." },
            { number: 2, order: 2, title: "Prove", description: "One workload end to end — ingestion to a report somebody uses — before the second starts." },
            { number: 3, order: 3, title: "Trace", description: "Lineage and reconciliation built in from the first workload, not added when an examiner asks." },
            { number: 4, order: 4, title: "Secure", description: "Row-level entitlement sourced from the directory, tested with real role accounts including one with no access." },
            { number: 5, order: 5, title: "Sustain", description: "Capacity monitoring, refresh alerting and a change process for definitions." }
        ],
        implicationsLede: "The same argument lands differently across an executive team. These are the three versions worth separating.",
        implications: [
            { order: 1, role: "For the CFO", text: "The productivity case is the one your board has heard before and seen underdelivered. Lead with traceability and decision latency; they are harder to model and considerably more defensible." },
            { order: 2, role: "For the Chief Risk Officer", text: "Lineage is the capability that matters to you and it is architectural. Requiring it from the first workload costs very little; retrofitting it after a finding is a programme." },
            { order: 3, role: "For the CDO", text: "The definitions workshop is your critical path, not your preliminary. Schedule it as such and resist starting engineering to demonstrate progress." }
        ],
        referencesLede: "Microsoft's own documentation for the product behaviour described above. We would rather you verified the basis than accepted our summary of it.",
        references: [
            { number: 1, order: 1, title: "What is OneLake?", source: "Microsoft Fabric documentation — the single logical data lake and open table format" },
            { number: 2, order: 2, title: "Direct Lake overview", source: "Power BI documentation — reading Delta tables without import or refresh" },
            { number: 3, order: 3, title: "Row-level security with Power BI", source: "Power BI documentation — static and dynamic role definition" },
            { number: 4, order: 4, title: "Microsoft Fabric capacity and licensing", source: "Microsoft Fabric documentation — how consumption is metered and monitored" },
            { number: 5, order: 5, title: "Data lineage in Microsoft Fabric", source: "Microsoft Fabric governance documentation — tracing items and their dependencies" }
        ],
        referencesNote: "On these references: each entry names a Microsoft Learn article or documentation area by title, because deep links change while titles are stable. Searching the title on learn.microsoft.com will reach the current version. Where we have cited a figure or a product behaviour, it is Microsoft's statement rather than ours; where we have given a number of our own it is labelled as such in the text.",
        ctaText: "If you are deciding whether to start, we will run the definitions workshop for one subject area and build that single workload end to end, so the decision is made on evidence from your own data."
    },
    {
        platform: "fabric",
        service: "data-ai-integration",
        industry: "healthcare",
        icon: "chart",
        pages: 15,
        title: "Service line economics and the allocation problem",
        description: "The annual service line dispute is not an arithmetic problem. It is a participation problem, and it has a structural solution.",
        publishedAt: new Date("2026-05-03"),
        readTime: "16 min read",
        subtitle: "Why health systems argue about the same numbers every year, and what would settle it",
        inThisPaper: [
            "An abstract and four numbered findings",
            "Analysis across 3 sections",
            "A framework you can apply: The allocation agreement",
            "Implications separated by role",
            "5 references to Microsoft documentation"
        ],
        abstractParagraphs: [
            "There is a meeting that happens once a year in most health systems. Finance presents service line performance, clinical directors dispute the allocation basis, and everybody leaves having agreed nothing except that the exercise was frustrating.",
            "This paper argues that the dispute is rarely about arithmetic and almost always about a model the clinical side had no part in building. It sets out why no allocation method is neutral, why that makes agreement rather than accuracy the objective, and what a data platform has to provide for the agreement to hold."
        ],
        findings: [
            { number: 1, order: 1, title: "No allocation method is neutral, so agreement is the objective", description: "Allocate theatre time by minutes and complex cases look expensive; allocate by case and short procedures look inefficient. Every method disadvantages somebody, which is why the model must be agreed rather than imposed." },
            { number: 2, order: 2, title: "A defensible model clinical leadership signed up to beats a superior one they dispute", description: "The technically better allocation that clinical directors did not help design will be re-litigated every year, and the exercise produces frustration rather than decisions." },
            { number: 3, order: 3, title: "Traceability is what converts a report into a decision", description: "Drill-through from service line margin to the underlying transaction is what stops a challenge becoming a stalemate." },
            { number: 4, order: 4, title: "Access design belongs before publication, not after", description: "Retrofitting row-level security onto a published semantic layer is disruptive and it always happens at the worst possible moment." }
        ],
        analysisBody: `<h2>Why the dispute recurs</h2>
<p>Shared costs — theatres, imaging, pathology, overhead — have to be attributed somehow. Each method is defensible and each produces winners and losers among the clinical directors in the room.</p>
<p>When the model is produced by finance and presented to clinical leadership, the presentation is the first time the affected parties encounter the assumptions. The predictable response is to challenge the assumptions rather than to act on the result, and the challenge is legitimate because they were not consulted.</p>
<p>The organizations that have broken this cycle did one thing differently: they ran the allocation design as a joint workshop before any engineering started, and they wrote down the reasoning for each driver rather than only the driver itself.</p>
<h2>What the platform has to provide</h2>
<p>Clinical volume sits in the electronic health record. Cost sits in finance. Payer performance sits in the revenue cycle system. Producing a joined view has historically meant a monthly extract exercise performed by one analyst, which is slow and, more importantly, unauditable.</p>
<p>Unifying these on a governed foundation changes both. The figure arrives continuously rather than monthly, and any published number can be traced back to source — which is what turns an internal report into something a board committee will act on.</p>
<p>The specific capabilities that matter are less exciting than the governance around them: an allocation reconciliation that proves total cost in equals total allocated out, a service line dimension built once rather than derived in report logic, and row-level security designed before publication.</p>
<ul>
<li>An allocation reconciliation with a zero residual, checked every run</li>
<li>A service line dimension built once in the model, not derived per report</li>
<li>Drill-through from margin to the encounter that produced it</li>
<li>Row-level security so a service line sees its own performance</li>
<li>Driver definitions published permanently alongside the numbers</li>
</ul>
<h2>The measurement discipline</h2>
<p>Health system data is seasonal and case-mix sensitive, which makes short-period conclusions unreliable in a particular way: they are usually directionally plausible and quantitatively wrong.</p>
<p>We baseline against a period the organization has already closed and signed off, and we compare across a full year before drawing conclusions about a service line's trajectory. This is slower and it is the only version that survives a second board committee.</p>`,
        frameworkLede: "Every paper in this series ends with a framework you can run internally. We would rather you used it and reached your own conclusion than took ours on trust.",
        frameworkName: "The allocation agreement",
        frameworkDescription: "Five stages. The first is the critical path, not the preliminary.",
        frameworkStages: [
            { number: 1, order: 1, title: "Convene", description: "Clinical and finance leadership together, before any engineering. Agree drivers per cost pool." },
            { number: 2, order: 2, title: "Record", description: "Write down the reasoning for each driver, not just the driver. It is what settles the challenge later." },
            { number: 3, order: 3, title: "Validate", description: "Show the model against a period both sides already understand and have signed off." },
            { number: 4, order: 4, title: "Trace", description: "Provide drill-through to the transaction, or the number will be disputed rather than used." },
            { number: 5, order: 5, title: "Govern", description: "A named owner for the definitions and an annual review with a change process." }
        ],
        implicationsLede: "The same argument lands differently across an executive team. These are the three versions worth separating.",
        implications: [
            { order: 1, role: "For the CFO", text: "The workshop is the project. Running engineering first to demonstrate progress produces a technically sound model that clinical leadership will not accept." },
            { order: 2, role: "For clinical directors", text: "Participating in the driver design is the mechanism by which the resulting number becomes usable. Declining to participate guarantees another year of the same meeting." },
            { order: 3, role: "For the CIO", text: "Design row-level access before publishing. Retrofitting it onto a published semantic layer is disruptive and always badly timed." }
        ],
        referencesLede: "Microsoft's own documentation for the product behaviour described above. We would rather you verified the basis than accepted our summary of it.",
        references: [
            { number: 1, order: 1, title: "What is OneLake?", source: "Microsoft Fabric documentation — the single logical lake and open table format" },
            { number: 2, order: 2, title: "Lakehouse and medallion architecture", source: "Microsoft Fabric documentation — bronze, silver and gold layer design" },
            { number: 3, order: 3, title: "Direct Lake overview", source: "Power BI documentation — reading Delta tables without an import step" },
            { number: 4, order: 4, title: "Row-level security with Power BI", source: "Power BI documentation — dynamic roles and entitlement tables" },
            { number: 5, order: 5, title: "Microsoft Cloud for Healthcare", source: "Microsoft industry cloud documentation — healthcare data model and connectors" }
        ],
        referencesNote: "On these references: each entry names a Microsoft Learn article or documentation area by title, because deep links change while titles are stable. Searching the title on learn.microsoft.com will reach the current version. Where we have cited a figure or a product behaviour, it is Microsoft's statement rather than ours; where we have given a number of our own it is labelled as such in the text.",
        ctaText: "We will build the cost model for one service line against your own data and walk your clinical and finance leads through it together, before anything wider is committed."
    },
    {
        platform: "fabric",
        service: "data-ai-integration",
        industry: "education",
        icon: "chart",
        pages: 14,
        title: "Student data and the institutional decision",
        description: "The pattern that predicts withdrawal is visible in hindsight in almost every case. The question is whether anybody saw it while there was still time.",
        publishedAt: new Date("2026-03-08"),
        readTime: "15 min read",
        subtitle: "Why early alert programmes fail on routing rather than on signal quality",
        inThisPaper: [
            "An abstract and four numbered findings",
            "Analysis across 3 sections",
            "A framework you can apply: Closing the alert loop",
            "Implications separated by role",
            "5 references to Microsoft documentation"
        ],
        abstractParagraphs: [
            "Institutions know a great deal about their students. Attendance, engagement, financial holds, early assessment performance — all captured, all in separate systems.",
            "This paper argues that early alert programmes fail on routing and ownership rather than on modelling, examines the ethical question that predictive analytics about students raises, and sets out what a data foundation has to provide for an advisor to trust a flag enough to act on it."
        ],
        findings: [
            { number: 1, order: 1, title: "The failure is routing, not detection", description: "Most projects concentrate on which signals predict risk. They fail when the alert reaches a dashboard nobody opens or an advisor with no capacity." },
            { number: 2, order: 2, title: "Traceability is what makes a flag actionable", description: "An advisor who questions why a student was flagged needs an answer traceable to source, not asserted by a model nobody can inspect." },
            { number: 3, order: 3, title: "Recording the intervention is what lets the institution learn", description: "Without it, the programme accumulates flags and no knowledge about which responses work." },
            { number: 4, order: 4, title: "Predictive analytics about students carries an ethical position that must be taken deliberately", description: "Predicting who will fail carries real risk of becoming self-fulfilling, and the institution should decide its position rather than inherit one." }
        ],
        analysisBody: `<h2>Why the loop does not close</h2>
<p>Four components are needed and the last two are usually missing.</p>
<p>Signals combined into one view rather than three systems. A named owner for every alert. An intervention record capturing what was tried and what happened. And effectiveness reporting so the institution learns which interventions actually change outcomes.</p>
<p>Programmes that build the first two and not the last two produce a dashboard, a sense of activity, and no institutional learning. After two cycles the programme is questioned, and there is no evidence with which to defend it.</p>
<ul>
<li>Academic, financial and engagement signals combined into one student view</li>
<li>Every alert routed to a specific advisor rather than to a report or a team inbox</li>
<li>Advisor capacity considered, so an alert lands with somebody who can act</li>
<li>The intervention and its outcome recorded against the student</li>
<li>Effectiveness measured by intervention type across a full cycle</li>
</ul>
<h2>The foundation the flag depends on</h2>
<p>Unifying student data across the student information system, the learning platform, finance and engagement tools is the unglamorous majority of the work.</p>
<p>The advantage of doing it properly on a governed platform is not speed. It is that when an advisor questions why a student was flagged, the answer is traceable back to source rather than asserted by a model nobody can inspect. An advisor who cannot interrogate a flag will stop acting on flags, and the programme quietly dies.</p>
<p>Access design is the other prerequisite. Legitimate educational interest has to be enforced through security roles rather than asserted in a policy document, and it should be designed before the first dashboard rather than retrofitted after a registrar raises it.</p>
<h2>The ethical position</h2>
<p>Predicting which students will struggle is useful and it carries a risk that deserves to be named: a flag can become self-fulfilling if it changes how staff treat a student.</p>
<p>Institutions should decide their position deliberately. What is the flag used for, who can see it, is the student told, and how is the institution checking that being flagged does not disadvantage anybody.</p>
<p>We raise this in every education engagement of this kind, not because it prevents the work but because a position taken deliberately is defensible and one inherited by default is not.</p>`,
        frameworkLede: "Every paper in this series ends with a framework you can run internally. We would rather you used it and reached your own conclusion than took ours on trust.",
        frameworkName: "Closing the alert loop",
        frameworkDescription: "Five stages. The last two are what most programmes omit.",
        frameworkStages: [
            { number: 1, order: 1, title: "Unify", description: "Combine academic, financial and engagement data on a governed foundation with lineage." },
            { number: 2, order: 2, title: "Secure", description: "Enforce legitimate educational interest by role before the first dashboard is published." },
            { number: 3, order: 3, title: "Route", description: "Every alert to a named advisor with the capacity to act, not to a dashboard." },
            { number: 4, order: 4, title: "Record", description: "The intervention and its outcome, so the institution accumulates knowledge." },
            { number: 5, order: 5, title: "Evaluate", description: "Effectiveness by intervention type, measured across a full academic cycle." }
        ],
        implicationsLede: "The same argument lands differently across an executive team. These are the three versions worth separating.",
        implications: [
            { order: 1, role: "For the Provost or DVC", text: "The ethical position needs an institutional decision. Taken deliberately it is defensible; inherited by default it becomes a problem when a student asks." },
            { order: 2, role: "For student services leadership", text: "Advisor capacity is a design input, not an implementation detail. Alerts routed to somebody with no time produce a record of missed interventions." },
            { order: 3, role: "For institutional research", text: "Measure across a full cycle. Education data is seasonal, and a conclusion drawn after one semester is usually wrong in a way that survives scrutiny for exactly one year." }
        ],
        referencesLede: "Microsoft's own documentation for the product behaviour described above. We would rather you verified the basis than accepted our summary of it.",
        references: [
            { number: 1, order: 1, title: "What is OneLake?", source: "Microsoft Fabric documentation — unifying institutional data sources" },
            { number: 2, order: 2, title: "Data lineage in Microsoft Fabric", source: "Microsoft Fabric governance — tracing a published figure to source" },
            { number: 3, order: 3, title: "Row-level security with Power BI", source: "Power BI documentation — enforcing access by role" },
            { number: 4, order: 4, title: "Microsoft Purview sensitivity labels", source: "Microsoft Purview — classifying special category student data" },
            { number: 5, order: 5, title: "Responsible AI standard and practices", source: "Microsoft Responsible AI documentation — fairness and transparency considerations" }
        ],
        referencesNote: "On these references: each entry names a Microsoft Learn article or documentation area by title, because deep links change while titles are stable. Searching the title on learn.microsoft.com will reach the current version. Where we have cited a figure or a product behaviour, it is Microsoft's statement rather than ours; where we have given a number of our own it is labelled as such in the text.",
        ctaText: "We will map your current signal sources and show what a combined advisor view would look like, including how the access model would satisfy your registrar."
    },
    {
        platform: "fabric",
        service: "data-ai-integration",
        industry: "nonprofits-associations",
        icon: "chart",
        pages: 12,
        title: "Outcome measurement as a funding instrument",
        description: "A programme can report that it delivered four thousand meals. The question funders now ask is what changed for the people who ate them.",
        publishedAt: new Date("2026-01-25"),
        readTime: "13 min read",
        subtitle: "Why funders stopped accepting activity data, and what a credible alternative requires",
        inThisPaper: [
            "An abstract and four numbered findings",
            "Analysis across 3 sections",
            "A framework you can apply: Sustainable outcome measurement",
            "Implications separated by role",
            "5 references to Microsoft documentation"
        ],
        abstractParagraphs: [
            "Activity data is a by-product of delivery, so it gets captured. Outcome data requires a separate act of measurement, usually after the person has left the programme, by staff who are already stretched.",
            "This paper examines why outcome measurement is designed retrospectively and then abandoned, argues that attribution honesty is a competitive advantage with sophisticated funders rather than a weakness, and sets out what sustainable measurement looks like for a small team."
        ],
        findings: [
            { number: 1, order: 1, title: "Outcome measurement fails on sustainability, not on methodology", description: "Ten measures produce no data. Two or three captured consistently produce something a funder can rely on." },
            { number: 2, order: 2, title: "The baseline has to be captured at intake or it does not exist", description: "You cannot evidence change without a starting point, and retrofitting one is not possible." },
            { number: 3, order: 3, title: "Non-response is data and omitting it damages credibility", description: "A 70% improvement among 30% of participants is a different claim. Volunteering the response rate builds trust with exactly the funders who matter." },
            { number: 4, order: 4, title: "Attribution honesty is persuasive rather than weak", description: "Claiming causation you cannot support damages trust with sophisticated funders. Describing your contribution and naming what you cannot isolate does the opposite." }
        ],
        analysisBody: `<h2>Why activity data dominates</h2>
<p>Somebody ran a session, so a session gets recorded. The data exists because the delivery happened.</p>
<p>An outcome requires deciding in advance what change you were trying to produce, capturing a baseline, and following up at a defined point. Every one of those is an additional act by somebody whose day is already full.</p>
<p>The predictable result is that outcome measurement gets designed retrospectively for a specific funder report, produces a partial and biased dataset, and is abandoned until the next report forces the exercise again.</p>
<h2>Designing measurement into delivery</h2>
<p>The practical approach for a small team is to pick a small number of outcomes and capture them as part of normal delivery rather than as a separate exercise.</p>
<p>Two or three per programme, not ten. Validated instruments where they exist for the domain, because a funder recognises them and an invented question set invites methodological challenge. A baseline captured during the intake conversation rather than sent afterwards. A follow-up point that is a scheduled step in the delivery pathway with an owner, not a task that appears when a report is due.</p>
<p>And recording who did not respond, explicitly, so the analysis is honest about its own coverage.</p>
<ul>
<li>Two or three outcomes per programme, chosen for sustainability</li>
<li>Validated instruments where they exist for the outcome domain</li>
<li>Baseline captured at intake, inside the intake conversation</li>
<li>Follow-up scheduled in the delivery pathway with a named owner</li>
<li>Non-response recorded with a reason where known</li>
</ul>
<h2>The attribution position</h2>
<p>A participant's circumstances improved. Your programme was one of several things happening in their life, and you cannot isolate your contribution without a comparison group you almost certainly do not have.</p>
<p>Claiming causation you cannot support is the fastest way to lose the confidence of a funder who understands evaluation, and those are disproportionately the funders whose money matters most.</p>
<p>Reporting the change, describing your contribution, and being explicit about what cannot be isolated is more persuasive than a confident claim that does not survive a question. We have seen this position win funding against organizations making stronger claims, precisely because the evaluator trusted the reporting.</p>`,
        frameworkLede: "Every paper in this series ends with a framework you can run internally. We would rather you used it and reached your own conclusion than took ours on trust.",
        frameworkName: "Sustainable outcome measurement",
        frameworkDescription: "Five decisions, made before the first participant is enrolled.",
        frameworkStages: [
            { number: 1, order: 1, title: "Choose", description: "Two or three outcomes per programme. Unsustainable measurement produces no data at all." },
            { number: 2, order: 2, title: "Validate", description: "Use recognised instruments where they exist. Invented questions invite methodological challenge." },
            { number: 3, order: 3, title: "Baseline", description: "Capture at intake, in the conversation. There is no retrofit for a missing baseline." },
            { number: 4, order: 4, title: "Schedule", description: "Follow-up as a step in the delivery pathway with a named owner, not a reporting task." },
            { number: 5, order: 5, title: "Disclose", description: "Report denominators, response rates and attribution limits as standard." }
        ],
        implicationsLede: "The same argument lands differently across an executive team. These are the three versions worth separating.",
        implications: [
            { order: 1, role: "For the executive director", text: "The attribution position is a strategic choice. Honesty here differentiates you with sophisticated funders and costs you nothing with the others." },
            { order: 2, role: "For programme managers", text: "Two measures captured consistently beat ten captured sporadically. Resist the temptation to measure everything the funder mentioned." },
            { order: 3, role: "For the finance lead", text: "Check nonprofit licensing before scoping the platform. The entitlements are substantial and routinely under-claimed." }
        ],
        referencesLede: "Microsoft's own documentation for the product behaviour described above. We would rather you verified the basis than accepted our summary of it.",
        references: [
            { number: 1, order: 1, title: "What is OneLake?", source: "Microsoft Fabric documentation — unifying participant, service and expenditure data" },
            { number: 2, order: 2, title: "Lakehouse and medallion architecture", source: "Microsoft Fabric documentation — layering for auditable transformation" },
            { number: 3, order: 3, title: "Power BI semantic models", source: "Power BI documentation — model design and measure descriptions" },
            { number: 4, order: 4, title: "Microsoft 365 and Azure nonprofit offers", source: "Microsoft nonprofit documentation — granted and discounted entitlements" },
            { number: 5, order: 5, title: "Microsoft Purview sensitivity labels", source: "Microsoft Purview — protecting participant and beneficiary data" }
        ],
        referencesNote: "On these references: each entry names a Microsoft Learn article or documentation area by title, because deep links change while titles are stable. Searching the title on learn.microsoft.com will reach the current version. Where we have cited a figure or a product behaviour, it is Microsoft's statement rather than ours; where we have given a number of our own it is labelled as such in the text.",
        ctaText: "Tell us about one programme and its funder requirements, and we will design the measurement model and show you the report pack it would produce."
    },

    // ===== MICROSOFT DEFENDER PAPERS =====
    {
        platform: "defender",
        service: "managed-it-security",
        industry: "small-mid-market",
        icon: "shield",
        pages: 13,
        title: "The insurability of the mid-market",
        description: "Insurers have quietly become the most effective security auditors in the mid-market. This paper examines what they ask, why, and what it means for how you prioritise.",
        publishedAt: new Date("2026-07-05"),
        readTime: "14 min read",
        subtitle: "How cyber insurance underwriting became the de facto security standard for organizations without a security function",
        inThisPaper: [
            "An abstract and four numbered findings",
            "Analysis across 3 sections",
            "A framework you can apply: The underwriting-led sequence",
            "Implications separated by role",
            "5 references to Microsoft documentation"
        ],
        abstractParagraphs: [
            "A cyber insurance renewal used to be a form and a premium. It is now a technical questionnaire with binary questions where answering one incorrectly changes the price or removes the cover.",
            "For mid-market organizations without a security function, this has had an unintended and largely positive consequence: the insurer has become the de facto security architect, and the list they ask about is a better prioritisation than most internal risk registers. This paper examines that list, why it looks the way it does, and how to work it."
        ],
        findings: [
            { number: 1, order: 1, title: "The underwriting list is actuarially weighted, which internal risk registers rarely are", description: "Insurers ask about the controls that correlate with claims. That is a different and more useful basis than a risk register built from a framework." },
            { number: 2, order: 2, title: "Answering aspirationally is the expensive mistake", description: "A claim declined because a control was represented as present and was not costs considerably more than a higher premium." },
            { number: 3, order: 3, title: "A substantial share of the list is already licensed and undeployed", description: "Conditional access, device compliance and endpoint protection commonly sit unconfigured inside a subscription being renewed annually." },
            { number: 4, order: 4, title: "Identity controls cover more attack paths than any other category", description: "Sequencing by estate coverage rather than by severity score puts identity first, and it is where the largest single reduction is available." }
        ],
        analysisBody: `<h2>What they actually ask, and why</h2>
<p>The questions vary by carrier and converge on a short list. Multi-factor authentication on every account including administrators. Endpoint detection and response across the estate. Backups that are tested, immutable and unreachable from the production domain. Privileged access separated from daily accounts. Email filtering with impersonation protection. A documented and rehearsed incident response plan.</p>
<p>There is nothing exotic there, and that is the point. These are the controls that correlate with claims not being made. An actuary has no interest in a control's theoretical elegance and a considerable interest in whether organizations that lack it file claims more often.</p>
<h2>Why the mid-market position is structurally different</h2>
<p>Large organizations have a security function whose job is to build a programme. Mid-market organizations have somebody who also does IT, and the question is not what a good programme looks like but what to do first with limited time.</p>
<p>That makes an externally imposed, evidence-weighted priority list unusually valuable. It is not a substitute for a security strategy. It is a better starting point than most organizations of this size would construct unaided.</p>
<p>The second structural difference is licensing. Microsoft 365 Business Premium and the E3 and E5 tiers include a substantial part of this list, and mid-market organizations routinely hold entitlements they have not deployed. Establishing what is already paid for is usually the first and cheapest piece of work, and it frequently funds the rest.</p>
<h2>Working the list rather than answering it</h2>
<p>Take the questions you answered no to and order them by how much of the estate they cover rather than by severity score.</p>
<p>Identity first, because multi-factor authentication and conditional access close more attack paths than any other single control available to an organization of this size. Then endpoint coverage, including the devices nobody has looked at in two years. Then backup validation — not whether backups run, but whether a restore has been rehearsed at scale. Then privileged access separation, which is cheap and consistently deferred. Then the incident response plan, rehearsed rather than written.</p>
<ul>
<li>Identity: MFA without exceptions, legacy authentication blocked, conditional access applied</li>
<li>Endpoints: detection deployed and reconciled against a real inventory, encryption verified</li>
<li>Backup: immutable, isolated from the production domain, and restore-rehearsed at scale</li>
<li>Privileged access: separate accounts, just-in-time elevation where licensed</li>
<li>Response: a plan that has been rehearsed, with somebody authorised to act out of hours</li>
</ul>`,
        frameworkLede: "Every paper in this series ends with a framework you can run internally. We would rather you used it and reached your own conclusion than took ours on trust.",
        frameworkName: "The underwriting-led sequence",
        frameworkDescription: "Five steps, in the order that reduces exposure fastest for an organization without a security function.",
        frameworkStages: [
            { number: 1, order: 1, title: "Answer honestly", description: "Complete the questionnaire as the position genuinely is. The gaps are your assessment." },
            { number: 2, order: 2, title: "Audit entitlements", description: "Establish what your existing licensing already covers. It is usually more than expected." },
            { number: 3, order: 3, title: "Close identity first", description: "MFA, legacy authentication and conditional access, in that order, with no exemptions." },
            { number: 4, order: 4, title: "Prove recovery", description: "Rehearse a restore at full scale. An untested backup is an assumption, not a control." },
            { number: 5, order: 5, title: "Rehearse response", description: "A written plan nobody has practised is a document. Run the exercise." }
        ],
        implicationsLede: "The same argument lands differently across an executive team. These are the three versions worth separating.",
        implications: [
            { order: 1, role: "For the managing director", text: "The questionnaire is a free, actuarially weighted gap analysis. Treat it as a planning input rather than as a procurement chore and it becomes the most useful security document you hold." },
            { order: 2, role: "For whoever owns IT", text: "Check licensing before buying anything. In most mid-market assessments we run, a meaningful share of the list is covered by entitlements already held and simply not deployed." },
            { order: 3, role: "For the finance director", text: "The cost comparison is not premium against premium. It is the premium difference against the cost of a declined claim, which is a different order of magnitude." }
        ],
        referencesLede: "Microsoft's own documentation for the product behaviour described above. We would rather you verified the basis than accepted our summary of it.",
        references: [
            { number: 1, order: 1, title: "Multifactor authentication in Microsoft Entra ID", source: "Microsoft Entra documentation — enforcement, exclusions and conditional access integration" },
            { number: 2, order: 2, title: "Block legacy authentication with Conditional Access", source: "Microsoft Entra Conditional Access documentation — the policy and its report-only mode" },
            { number: 3, order: 3, title: "Microsoft Defender for Endpoint onboarding", source: "Microsoft Defender documentation — deployment methods and device inventory reconciliation" },
            { number: 4, order: 4, title: "Microsoft 365 Business Premium security features", source: "Microsoft 365 documentation — what the mid-market tier includes" },
            { number: 5, order: 5, title: "Privileged Identity Management", source: "Microsoft Entra ID Governance — just-in-time elevation with approval and time limits" }
        ],
        referencesNote: "On these references: each entry names a Microsoft Learn article or documentation area by title, because deep links change while titles are stable. Searching the title on learn.microsoft.com will reach the current version. Where we have cited a figure or a product behaviour, it is Microsoft's statement rather than ours; where we have given a number of our own it is labelled as such in the text.",
        ctaText: "Send us your current questionnaire and your licence position. We will map which gaps are already covered by entitlements you hold and what the remainder would take, before you commit to anything."
    },
    {
        platform: "defender",
        service: "managed-it-security",
        industry: "manufacturing",
        icon: "shield",
        pages: 14,
        title: "Operational continuity as a security objective",
        description: "Ask a manufacturing executive what a security incident would cost and the answer involves stolen designs. Ask what a week of stopped production would cost and the number is immediate and much larger.",
        publishedAt: new Date("2026-04-26"),
        readTime: "15 min read",
        subtitle: "Why manufacturing security programmes should be designed around availability rather than confidentiality",
        inThisPaper: [
            "An abstract and four numbered findings",
            "Analysis across 3 sections",
            "A framework you can apply: The availability-led priority order",
            "Implications separated by role",
            "5 references to Microsoft documentation"
        ],
        abstractParagraphs: [
            "Manufacturing security conversations default to intellectual property. The event that actually stops the business is a line that will not start on Monday, and it is both more likely and more expensive.",
            "This paper argues that reframing the threat model around availability changes the priority order materially — segmentation and identity ahead of detection sophistication, recovery objectives expressed in shifts rather than days — and sets out what that reframing implies for a plant estate carrying equipment with decade-long lifecycles."
        ],
        findings: [
            { number: 1, order: 1, title: "In a plant, ransomware is an availability problem before it is a data problem", description: "An encrypted scheduling system or a domain controller that will not authenticate the early shift stops production as effectively as a machine failure." },
            { number: 2, order: 2, title: "Recovery objectives should be expressed in shifts", description: "Days is the unit IT uses. Shifts is the unit in which the cost accumulates, and stating it that way changes what leadership will fund." },
            { number: 3, order: 3, title: "Segmentation limits blast radius without touching equipment that cannot be touched", description: "It is the highest-value control available in a plant estate precisely because it does not require modifying certified equipment." },
            { number: 4, order: 4, title: "Correlation shortens the gap between compromise and discovery", description: "That gap is the single largest determinant of what an incident costs, and closing it is a consolidation problem rather than a detection one." }
        ],
        analysisBody: `<h2>Where plant estates are structurally exposed</h2>
<p>Not through negligence. Through the accumulated consequences of equipment lifecycles measured in decades.</p>
<p>Line controllers and human-machine interfaces running operating systems that cannot be patched without vendor certification. Flat networks where a compromised office endpoint can reach plant systems. Shared operator accounts, because individual logins slow a shift change. Remote access for equipment vendors granted years ago and never reviewed. Backup systems never tested against a full-plant restore.</p>
<p>Each of these was a reasonable local decision. Collectively they describe an estate where the most likely intrusion path runs from a phishing email to a production stoppage.</p>
<ul>
<li>Controllers and HMIs on operating systems that cannot be patched without vendor approval</li>
<li>Flat networks permitting lateral movement from corporate to plant systems</li>
<li>Shared operator accounts at the line, driven by shift-change practicality</li>
<li>Standing vendor remote access, granted for a commissioning that finished years ago</li>
<li>Backup systems that have never been restored at full plant scale</li>
</ul>
<h2>What the reframing changes</h2>
<p>If the objective is confidentiality, the priority is data classification and exfiltration prevention. If the objective is availability, the priority order changes.</p>
<p>Segmentation comes first, because it limits how far an intrusion in the corporate estate can travel and it does not require touching equipment under vendor certification. Identity comes second, because multi-factor authentication and conditional access close the most common entry path. Detection tuning comes third, because an untuned console is functionally the same as no detection and this is a tuning problem rather than a licensing one.</p>
<p>Recovery moves from a technical afterthought to a first-order design constraint, and it is where the reframing has the largest practical effect. A recovery objective agreed with operations and expressed in shifts produces different investment decisions from one expressed in days by IT.</p>
<h2>The automation boundary</h2>
<p>Automated response — isolating a device, disabling an account — is appropriate on standard user endpoints and rarely appropriate on plant-adjacent systems during a shift.</p>
<p>An automated isolation of the wrong host stops a line, and the incident will be remembered as an IT failure regardless of what the intrusion was doing. Agreeing the boundary in advance, in writing, with operations present, is the difference between a control that reduces risk and one that creates it.</p>
<p>This is a governance decision that looks like a configuration setting, which is why it is so often made by default.</p>`,
        frameworkLede: "Every paper in this series ends with a framework you can run internally. We would rather you used it and reached your own conclusion than took ours on trust.",
        frameworkName: "The availability-led priority order",
        frameworkDescription: "Five steps. The order is the argument.",
        frameworkStages: [
            { number: 1, order: 1, title: "Segment", description: "Separate corporate from plant networks. Highest value, and it touches no certified equipment." },
            { number: 2, order: 2, title: "Identify", description: "MFA and conditional access on every account including service and administrative ones." },
            { number: 3, order: 3, title: "Correlate", description: "Consolidate endpoint, identity, email and cloud signal into single incidents." },
            { number: 4, order: 4, title: "Bound", description: "Agree automated response limits with operations, in writing, before an incident." },
            { number: 5, order: 5, title: "Rehearse", description: "Full-scale recovery with plant management present, timed against the shift-based objective." }
        ],
        implicationsLede: "The same argument lands differently across an executive team. These are the three versions worth separating.",
        implications: [
            { order: 1, role: "For the operations director", text: "The recovery objective is yours to set, not IT's. Expressed in shifts it becomes a production planning number and it will be funded differently." },
            { order: 2, role: "For the CIO", text: "Segmentation is the control with the best return in a plant estate and the one most often deferred because it looks like a network project." },
            { order: 3, role: "For the CISO", text: "Document the un-onboardable systems as accepted risk with compensating controls. An undocumented gap on a diagram that looks covered is worse than a known one." }
        ],
        referencesLede: "Microsoft's own documentation for the product behaviour described above. We would rather you verified the basis than accepted our summary of it.",
        references: [
            { number: 1, order: 1, title: "Microsoft Defender for Endpoint documentation", source: "Microsoft Defender — onboarding, device groups and automation levels" },
            { number: 2, order: 2, title: "Microsoft Defender XDR incident correlation", source: "Microsoft Defender documentation — how alerts are grouped into incidents" },
            { number: 3, order: 3, title: "Configure device groups and automation", source: "Microsoft Defender for Endpoint — scoping automated investigation and response" },
            { number: 4, order: 4, title: "Manage exclusions for Microsoft Defender", source: "Microsoft Defender documentation — scoping exclusions to paths and device groups" },
            { number: 5, order: 5, title: "Azure Site Recovery and backup guidance", source: "Azure documentation — recovery objectives, immutability and restore testing" }
        ],
        referencesNote: "On these references: each entry names a Microsoft Learn article or documentation area by title, because deep links change while titles are stable. Searching the title on learn.microsoft.com will reach the current version. Where we have cited a figure or a product behaviour, it is Microsoft's statement rather than ours; where we have given a number of our own it is labelled as such in the text.",
        ctaText: "We will map your coverage including plant-adjacent systems, test the segmentation independently, and facilitate a recovery rehearsal with operations present."
    },
    {
        platform: "defender",
        service: "managed-it-security",
        industry: "public-sector",
        icon: "shield",
        pages: 13,
        title: "Third-party risk in public supply chains",
        description: "Public sector organizations work with many suppliers, and each one that reaches your systems extends the attack surface into an organization whose security you do not control.",
        publishedAt: new Date("2026-02-15"),
        readTime: "14 min read",
        subtitle: "Why the supplier access inventory is the finding, and what to do about the number",
        inThisPaper: [
            "An abstract and four numbered findings",
            "Analysis across 3 sections",
            "A framework you can apply: Managing third-party access",
            "Implications separated by role",
            "5 references to Microsoft documentation"
        ],
        abstractParagraphs: [
            "Most public sector organizations have never established how many third parties can reach their systems. Building the inventory from the directory rather than from procurement records is usually the finding in itself.",
            "This paper examines why supplier access accumulates invisibly, why procurement and IT jointly owning third-party risk reliably means neither does, and what a proportionate control set looks like for an organization with more suppliers than security staff."
        ],
        findings: [
            { number: 1, order: 1, title: "The directory and procurement records disagree, and the gap is the finding", description: "Access granted for a project that ended is the most common single entry, and the easiest to remediate." },
            { number: 2, order: 2, title: "Supplier accounts are frequently exempted from MFA for convenience", description: "They are also among the most targeted accounts in any estate, which makes this the exemption that matters most." },
            { number: 3, order: 3, title: "Time-bound access is the only kind that reliably expires", description: "Manual revocation depends on somebody remembering after a project ended and they have moved on." },
            { number: 4, order: 4, title: "Split ownership between procurement and IT means nobody reviews it", description: "Third-party risk needs one accountable person, and the split is the most common reason it goes unmanaged." }
        ],
        analysisBody: `<h2>Why it accumulates</h2>
<p>Access is granted for a reason, by somebody with authority, for a project with an end date that is not recorded anywhere the access system can see.</p>
<p>The project ends. The people involved move on. The access remains, because removing it requires somebody to notice it exists, establish that it is no longer needed, and take an action that has no deadline attached to it.</p>
<p>Add equipment vendors with standing remote support access granted at commissioning, suppliers who have granted their own subcontractors access on your behalf, and the estate extends considerably further than any diagram shows.</p>
<ul>
<li>A complete inventory built from the directory, not from procurement records</li>
<li>Every entry naming a supplier, a purpose and an internal owner</li>
<li>Access granted for concluded projects identified and removed</li>
<li>Supplier-to-supplier access surfaced, which is more common than expected</li>
<li>Equipment vendor remote maintenance access included in scope</li>
</ul>
<h2>Proportionate controls</h2>
<p>Multi-factor authentication without exception, because supplier accounts are heavily targeted and the exemption is almost always for convenience rather than for a technical reason.</p>
<p>Access scoped to the minimum required rather than to a general administrative role granted because it was quicker. Time-bound rather than standing, so expiry happens without anybody needing to act. Activity logged with retention, because you will need it during an incident and cannot create it retrospectively.</p>
<p>Conditional access restricting where and how third parties connect is proportionate and rarely implemented, and it is inexpensive relative to the exposure it addresses.</p>
<h2>The contractual half</h2>
<p>Security obligations in the contract rather than only in a policy the supplier has not signed. Breach notification requirements with a stated timescale — the clause most often missing. Subcontracting addressed and requiring your agreement, so you do not learn about a supplier's supplier from an audit log. A right to assurance evidence on a defined cadence. Exit provisions covering data return and access revocation with a timescale.</p>
<p>These are procurement's to write and IT's to enforce, which is precisely why the ownership question has to be settled first.</p>`,
        frameworkLede: "Every paper in this series ends with a framework you can run internally. We would rather you used it and reached your own conclusion than took ours on trust.",
        frameworkName: "Managing third-party access",
        frameworkDescription: "Five stages. The first produces a number that funds the rest.",
        frameworkStages: [
            { number: 1, order: 1, title: "Inventory", description: "Build from the directory. The gap against procurement records is your finding." },
            { number: 2, order: 2, title: "Own", description: "One accountable person for third-party risk. Split ownership means nobody reviews it." },
            { number: 3, order: 3, title: "Constrain", description: "MFA without exception, least privilege, and conditional access on location and device." },
            { number: 4, order: 4, title: "Time-bound", description: "Access that expires automatically, linked to contract end rather than to memory." },
            { number: 5, order: 5, title: "Contract", description: "Obligations, notification timescales, subcontracting consent and exit provisions in writing." }
        ],
        implicationsLede: "The same argument lands differently across an executive team. These are the three versions worth separating.",
        implications: [
            { order: 1, role: "For the CIO", text: "Build the inventory first. The number is usually larger than anyone expects and it makes the case for the rest without further argument." },
            { order: 2, role: "For procurement", text: "The clauses that matter are breach notification timescale, subcontracting consent and exit. All three are commonly absent and all three are cheap to add." },
            { order: 3, role: "For the Monitoring Officer or audit committee", text: "A supplier compromise is your incident if they hold or reach your data. It belongs in the incident response scenarios and it rarely is." }
        ],
        referencesLede: "Microsoft's own documentation for the product behaviour described above. We would rather you verified the basis than accepted our summary of it.",
        references: [
            { number: 1, order: 1, title: "Microsoft Entra External ID and B2B collaboration", source: "Microsoft Entra documentation — guest access and lifecycle" },
            { number: 2, order: 2, title: "Entitlement management and access packages", source: "Microsoft Entra ID Governance — time-bound access with approval and expiry" },
            { number: 3, order: 3, title: "Conditional Access policy design", source: "Microsoft Entra documentation — location, device and risk conditions" },
            { number: 4, order: 4, title: "Access reviews in Microsoft Entra ID Governance", source: "Microsoft Entra documentation — scheduled reviews with recorded outcomes" },
            { number: 5, order: 5, title: "Microsoft Defender for Cloud Apps", source: "Microsoft Defender documentation — visibility into third-party application access" }
        ],
        referencesNote: "On these references: each entry names a Microsoft Learn article or documentation area by title, because deep links change while titles are stable. Searching the title on learn.microsoft.com will reach the current version. Where we have cited a figure or a product behaviour, it is Microsoft's statement rather than ours; where we have given a number of our own it is labelled as such in the text.",
        ctaText: "We will build the third-party access inventory from your directory and produce a prioritised remediation list, which usually starts with a number nobody expected."
    },
    {
        platform: "defender",
        service: "managed-it-security",
        industry: "healthcare",
        icon: "shield",
        pages: 14,
        title: "Clinical continuity and the recovery objective",
        description: "The question is not how long until systems are restored. It is how long the organization can deliver safe care without them.",
        publishedAt: new Date("2025-11-30"),
        readTime: "15 min read",
        subtitle: "Why healthcare recovery planning starts with a clinical question rather than a technical one",
        inThisPaper: [
            "An abstract and four numbered findings",
            "Analysis across 3 sections",
            "A framework you can apply: Building recovery backwards",
            "Implications separated by role",
            "5 references to Microsoft documentation"
        ],
        abstractParagraphs: [
            "In most sectors a recovery time objective is a commercial decision. In healthcare it is a clinical one, and that changes both the number and who is entitled to set it.",
            "This paper argues that recovery planning should be built backwards from clinical downtime tolerance, examines why the restoration sequence must be agreed clinically in advance, and sets out why a rehearsal without clinical participation validates the technology and misses the point."
        ],
        findings: [
            { number: 1, order: 1, title: "The recovery objective is a clinical number, not an IT preference", description: "How long the organization can deliver safe care on paper is the constraint. IT should be told the number rather than choose it." },
            { number: 2, order: 2, title: "The restoration sequence must be agreed clinically before an incident", description: "Not everything restores at once, and deciding the order during an event wastes the hours that matter most." },
            { number: 3, order: 3, title: "Identity restores first, and this is routinely underestimated", description: "Nothing else can be restored until people can authenticate, and identity recovery is the least rehearsed part of most plans." },
            { number: 4, order: 4, title: "An IT-only rehearsal validates the technology and misses the point", description: "The exercise that produces useful findings runs the downtime procedures at realistic volume with clinical leadership present." }
        ],
        analysisBody: `<h2>Starting from the clinical procedure</h2>
<p>Every provider has downtime procedures — paper forms, manual processes, verbal handover. Most were written years ago, few have been rehearsed recently, and almost none have been tested at the scale a real event would require.</p>
<p>The recovery plan should be built backwards from these. How long can the organization deliver safe care without systems? That number, produced by clinical leadership, sets the recovery objective.</p>
<p>This inverts the usual sequence, in which IT proposes an objective based on what infrastructure can achieve and clinical leadership is asked to accept it. The inversion matters because a technically achievable target that does not match clinical tolerance is the wrong target regardless of how well it is delivered.</p>
<h2>The restoration sequence</h2>
<p>Not everything can be restored simultaneously, so the order has to be decided in advance and agreed clinically.</p>
<p>Identity first, because nothing else can be restored until people can authenticate — and because identity recovery is consistently the least rehearsed element of a recovery plan. Then the clinical record, and specifically the read-only access path to it. Then scheduling and patient flow, which determine whether the organization can operate at all. Then diagnostics and results routing, where delays translate directly to clinical risk. Then revenue cycle, which matters enormously and is genuinely not first.</p>
<p>Writing this down before an incident converts a series of contested decisions under pressure into an executed plan.</p>
<ul>
<li>Identity and authentication, rehearsed as a distinct step</li>
<li>The clinical record, including the read-only access path</li>
<li>Scheduling and patient flow</li>
<li>Diagnostics and results routing</li>
<li>Revenue cycle, which is important and is not first</li>
</ul>
<h2>What the rehearsal has to include</h2>
<p>An IT-only recovery exercise validates the technology and misses the point.</p>
<p>The exercise that produces useful findings involves clinical leadership, runs the downtime procedures for a realistic period, and tests whether the paper process works at volume rather than in principle. Every provider we have seen do this properly has found something significant, which is the argument for doing it deliberately rather than discovering it during an event.</p>
<p>The findings are usually not technical. They concern where the downtime forms are stored, whether staff have ever used them, whether a ward can actually operate on paper for the period the plan assumes, and who is authorised to declare an incident. All of these are cheap to fix on a planned Saturday and expensive to discover otherwise.</p>`,
        frameworkLede: "Every paper in this series ends with a framework you can run internally. We would rather you used it and reached your own conclusion than took ours on trust.",
        frameworkName: "Building recovery backwards",
        frameworkDescription: "Five stages, starting with a clinical question.",
        frameworkStages: [
            { number: 1, order: 1, title: "Ask", description: "Clinical leadership states how long safe care can continue without systems." },
            { number: 2, order: 2, title: "Sequence", description: "Agree the restoration order clinically, in advance, and write it down." },
            { number: 3, order: 3, title: "Protect", description: "Immutable backups isolated from the production domain, with identity recovery rehearsed." },
            { number: 4, order: 4, title: "Rehearse", description: "Run downtime procedures at realistic volume with clinical leadership present." },
            { number: 5, order: 5, title: "Fix", description: "Assign every finding an owner and a date. A rehearsal without follow-up was a training exercise." }
        ],
        implicationsLede: "The same argument lands differently across an executive team. These are the three versions worth separating.",
        implications: [
            { order: 1, role: "For the Chief Medical or Nursing Officer", text: "The recovery objective is yours to set. Delegating it to IT produces a number optimised for what infrastructure can achieve rather than for what care requires." },
            { order: 2, role: "For the CIO", text: "Rehearse identity restoration specifically. It is first in the sequence, it is the least practised, and it gates everything else." },
            { order: 3, role: "For the board", text: "A recovery objective that has never been tested at scale is a hypothesis. Asking when it was last rehearsed is a reasonable governance question." }
        ],
        referencesLede: "Microsoft's own documentation for the product behaviour described above. We would rather you verified the basis than accepted our summary of it.",
        references: [
            { number: 1, order: 1, title: "Microsoft Defender XDR incident response", source: "Microsoft Defender documentation — correlation, investigation and response" },
            { number: 2, order: 2, title: "Azure Backup immutable vaults", source: "Azure documentation — immutability and isolation from the production domain" },
            { number: 3, order: 3, title: "Microsoft Entra ID disaster recovery guidance", source: "Microsoft Entra documentation — identity resilience and emergency access" },
            { number: 4, order: 4, title: "Microsoft Sentinel incident management", source: "Microsoft Sentinel documentation — correlated detection and response playbooks" },
            { number: 5, order: 5, title: "Microsoft Cloud for Healthcare", source: "Microsoft industry cloud documentation — healthcare workload considerations" }
        ],
        referencesNote: "On these references: each entry names a Microsoft Learn article or documentation area by title, because deep links change while titles are stable. Searching the title on learn.microsoft.com will reach the current version. Where we have cited a figure or a product behaviour, it is Microsoft's statement rather than ours; where we have given a number of our own it is labelled as such in the text.",
        ctaText: "We run a coverage and recovery assessment across the estate and facilitate the rehearsal with your clinical and IT leadership together, which is the part that produces the useful findings."
    },

    // ===== AZURE PAPERS =====
    {
        platform: "azure",
        service: "strategy-transformation",
        industry: "public-sector",
        icon: "cloud",
        pages: 15,
        title: "Cloud economics in the public sector",
        description: "Public cloud programmes fail at procurement and governance far more often than at technical migration. This paper examines why and proposes a procurement approach that survives review.",
        publishedAt: new Date("2026-06-28"),
        readTime: "16 min read",
        subtitle: "Why consumption pricing and public procurement conflict, and what to do about it",
        inThisPaper: [
            "An abstract and four numbered findings",
            "Analysis across 3 sections",
            "A framework you can apply: Specifying cloud for public procurement",
            "Implications separated by role",
            "5 references to Microsoft documentation"
        ],
        abstractParagraphs: [
            "An agency plans a cloud migration carefully, selects sensibly, and then spends four months in a procurement process nobody anticipated because the requirement was written as though buying software.",
            "This paper examines the structural conflict between consumption-based pricing and a procurement model designed for capital purchase, and proposes a way of specifying cloud that a procurement officer can evaluate, a finance officer can budget against, and an elected member can scrutinise — without pretending the cost is fixed."
        ],
        findings: [
            { number: 1, order: 1, title: "The conflict is structural, not procedural", description: "Public procurement is built for a defined scope at a defined price. Cloud consumption is variable by design, and that variability is what makes the business case work." },
            { number: 2, order: 2, title: "Specifying a ceiling with governance beats estimating a total", description: "An estimate presented as a commitment will be exceeded and will become a governance failure. A ceiling with a documented approval path above it will not." },
            { number: 3, order: 3, title: "Cost attribution is an accountability problem before it is a technical one", description: "Spend nobody owns is spend nobody reduces. Tagging enforced at creation is the mechanism, and it is trivial before workloads land and a project afterwards." },
            { number: 4, order: 4, title: "The questions members ask are answerable, but only by design", description: "Where is the data, who can reach it, how do we know we are not overpaying, what is the exit route. Each is architectural and each is expensive to retrofit." }
        ],
        analysisBody: `<h2>Why the models conflict</h2>
<p>A capital procurement asks what you are buying, from whom, for how much, over what period. Every one of those questions has a stable answer for a server and an unstable answer for a cloud estate.</p>
<p>The instinct is to resolve the tension by producing an estimate and treating it as a commitment. This fails in both directions: if consumption comes in under the estimate the agency has over-procured, and if it comes in over, a routine technical outcome becomes a governance incident.</p>
<p>The alternative is to specify the shape of the spend rather than its total — a committed band, a ceiling, and a documented path for approving above it. This is harder to write and considerably easier to defend.</p>
<h2>What to put in the requirement</h2>
<p>Cost reporting and optimisation reviews should be contractual deliverables rather than goodwill. Exit provisions should cover the extraction format, the timescale and the cost, because that is the question elected members ask most reliably and the one least often answered before contract.</p>
<p>Residency should be specified per workload rather than organization-wide. A blanket statement produces either over-restriction — ruling out services you could have used — or an assurance that turns out not to hold for a specific data type.</p>
<ul>
<li>A committed consumption band with a defined ceiling and an approval path above it</li>
<li>Cost attribution and monthly reporting as contractual deliverables with a named recipient</li>
<li>Optimisation reviews at defined intervals with expected outcomes stated</li>
<li>Exit provisions covering data extraction format, timescale and cost</li>
<li>Knowledge transfer specified with acceptance criteria, not described as a principle</li>
</ul>
<h2>Governance as the enabling condition</h2>
<p>The landing zone work — management groups, policy, tagging, network design — costs very little before workloads arrive and is genuinely disruptive to retrofit onto a live estate.</p>
<p>The specific control that carries the most weight is tagging enforced by policy at creation. Untagged resources cannot be attributed, unattributed spend has no owner, and spend with no owner does not reduce. Every agency that has reported a durable reduction in cloud cost to us had done this first.</p>
<p>The second is region restriction enforced by policy rather than stated in a document. A written residency position without a technical control is a statement of intent, and it will be tested.</p>`,
        frameworkLede: "Every paper in this series ends with a framework you can run internally. We would rather you used it and reached your own conclusion than took ours on trust.",
        frameworkName: "Specifying cloud for public procurement",
        frameworkDescription: "Five elements. Together they produce a requirement that is evaluable, budgetable and defensible.",
        frameworkStages: [
            { number: 1, order: 1, title: "Band", description: "A committed consumption range with a ceiling, rather than a single estimate presented as a total." },
            { number: 2, order: 2, title: "Attribute", description: "Tagging enforced by policy so every pound is attributable to a workload and a named owner." },
            { number: 3, order: 3, title: "Report", description: "Cost reporting and optimisation reviews as contractual deliverables with defined cadence." },
            { number: 4, order: 4, title: "Constrain", description: "Region and service restrictions enforced by policy, matching a per-workload residency position." },
            { number: 5, order: 5, title: "Exit", description: "Extraction format, timescale, cost and knowledge transfer, with acceptance criteria." }
        ],
        implicationsLede: "The same argument lands differently across an executive team. These are the three versions worth separating.",
        implications: [
            { order: 1, role: "For the Section 151 or finance officer", text: "You can budget against a band with a ceiling. You cannot budget against an estimate that behaves like a forecast, and treating one as the other is where these programmes lose credibility." },
            { order: 2, role: "For the CIO", text: "Do the landing zone before the workloads. It is the cheapest week of the programme and the most expensive one to skip." },
            { order: 3, role: "For procurement", text: "The requirement needs to describe governance rather than quantity. We would rather help write that document than respond to one written for a capital purchase." }
        ],
        referencesLede: "Microsoft's own documentation for the product behaviour described above. We would rather you verified the basis than accepted our summary of it.",
        references: [
            { number: 1, order: 1, title: "Azure landing zones", source: "Microsoft Cloud Adoption Framework — management group hierarchy, subscription design and policy" },
            { number: 2, order: 2, title: "Azure Policy overview", source: "Azure governance documentation — audit, deny and deployIfNotExists effects" },
            { number: 3, order: 3, title: "Tag resources, resource groups and subscriptions", source: "Azure documentation — tagging strategy and policy enforcement" },
            { number: 4, order: 4, title: "Azure Cost Management and Billing", source: "Azure documentation — budgets, alerts and cost allocation" },
            { number: 5, order: 5, title: "Data residency in Azure", source: "Microsoft Trust Center — regional data storage commitments" }
        ],
        referencesNote: "On these references: each entry names a Microsoft Learn article or documentation area by title, because deep links change while titles are stable. Searching the title on learn.microsoft.com will reach the current version. Where we have cited a figure or a product behaviour, it is Microsoft's statement rather than ours; where we have given a number of our own it is labelled as such in the text.",
        ctaText: "We will help you write the technical requirement and the governance schedule in language that survives procurement review, before you go to market rather than after a process has stalled."
    },
    {
        platform: "azure",
        service: "strategy-transformation",
        industry: "healthcare",
        icon: "cloud",
        pages: 16,
        title: "Building for AI on regulated infrastructure",
        description: "An estate designed for hosting usually needs rework before it can support AI workloads safely. This paper sets out what changes and why designing for it now is cheaper.",
        publishedAt: new Date("2026-05-17"),
        readTime: "17 min read",
        subtitle: "What changes in an Azure estate when AI workloads arrive, and why retrofitting is expensive",
        inThisPaper: [
            "An abstract and four numbered findings",
            "Analysis across 3 sections",
            "A framework you can apply: Designing for what comes next",
            "Implications separated by role",
            "5 references to Microsoft documentation"
        ],
        abstractParagraphs: [
            "Most healthcare Azure estates were designed for hosting: move the workload, keep it running, keep it compliant. AI workloads change the requirements underneath in ways that are cheap to design for and expensive to retrofit.",
            "This paper examines what specifically changes — network, identity, data governance, residency and evidence — and argues that organizations with AI anywhere on a three-year plan should be making these decisions now, in the ordinary course of estate design, rather than as a separate programme later."
        ],
        findings: [
            { number: 1, order: 1, title: "AI workloads change the data governance requirement most sharply", description: "Hosting asks where data sits. AI asks what reached it, what was sent, and whether that can be evidenced eighteen months later." },
            { number: 2, order: 2, title: "Private networking is materially cheaper to design than to retrofit", description: "Retrofitting private endpoints onto a workload built with public access touches every connection string in every component." },
            { number: 3, order: 3, title: "Evidence has to be enforced by policy, not configured by hand", description: "Manual diagnostic settings cover what existed on the day somebody applied them and nothing created since, which is the resource that will matter." },
            { number: 4, order: 4, title: "Customer-managed keys are frequently assumed rather than required", description: "They add genuine operational burden including a recovery position most teams have not worked through. Confirm the obligation in writing." }
        ],
        analysisBody: `<h2>What actually changes</h2>
<p>A hosting estate answers a stable set of questions: is the workload available, is the data encrypted, is access controlled. An AI-supporting estate answers a moving set: what data did the model reach, what left the boundary, who authorised the connection, and can any of that be reconstructed later.</p>
<p>In a healthcare setting the last question is the one that determines whether the programme is defensible. Microsoft's data security posture management for AI exists precisely because organizations could not answer it, and its presence in the platform is an argument for designing the evidence layer deliberately rather than assuming it.</p>
<p>The practical consequences are network isolation, identity design that supports segregation of duties, data classification applied before AI reaches the content, and diagnostic logging enforced by policy with retention matched to the regulatory window rather than to the default.</p>
<ul>
<li>Private endpoints with resolved private DNS, and public network access denied by policy</li>
<li>Managed identities rather than stored credentials in application configuration</li>
<li>Data classification applied before AI workloads reach the content, not afterwards</li>
<li>Diagnostic settings enforced by policy, capturing data-plane as well as management-plane activity</li>
<li>Log retention matched to the regulatory window and query-tested at its far edge</li>
</ul>
<h2>The residency question, raised early</h2>
<p>Data residency requirements should be documented per workload rather than organization-wide. A blanket position produces either over-restriction — ruling out services the organization could have used — or an assurance that does not hold for a specific data type.</p>
<p>This should be raised in the first design conversation rather than at contract stage. It is far cheaper to design for than to retrofit, and it occasionally changes which services are viable at all, which is information you want before an architecture is committed.</p>
<h2>Why now rather than later</h2>
<p>The argument is not that every healthcare organization should deploy AI. It is that the estate decisions which make AI safe are the same decisions that make a regulated estate defensible generally, and they are being made anyway.</p>
<p>An organization choosing private networking, policy-enforced logging and proper classification today gets a better estate whether or not the AI programme proceeds. An organization deferring those choices and later deciding to proceed pays for the same decisions under time pressure, with workloads already in place.</p>
<p>That asymmetry is the whole argument of this paper.</p>`,
        frameworkLede: "Every paper in this series ends with a framework you can run internally. We would rather you used it and reached your own conclusion than took ours on trust.",
        frameworkName: "Designing for what comes next",
        frameworkDescription: "Five design decisions that pay whether or not the AI programme proceeds.",
        frameworkStages: [
            { number: 1, order: 1, title: "Isolate", description: "Private endpoints and private DNS from the start; public access denied by policy." },
            { number: 2, order: 2, title: "Identify", description: "Managed identities and just-in-time privileged elevation rather than standing access." },
            { number: 3, order: 3, title: "Classify", description: "Sensitivity applied to content before any AI workload reaches it." },
            { number: 4, order: 4, title: "Evidence", description: "Diagnostic settings by policy, data-plane included, retention matched to the regulatory window." },
            { number: 5, order: 5, title: "Map", description: "A control-to-configuration document linking each obligation to the setting implementing it." }
        ],
        implicationsLede: "The same argument lands differently across an executive team. These are the three versions worth separating.",
        implications: [
            { order: 1, role: "For the CIO", text: "These are estate decisions, not AI decisions. Making them now means the AI business case is not carrying the cost of infrastructure remediation." },
            { order: 2, role: "For the CISO", text: "The evidence layer is the one that will be tested. Policy-enforced diagnostic settings cover resources nobody told you about, which is the population that matters." },
            { order: 3, role: "For the Privacy Officer", text: "Raise residency per workload at design time. Discovering a constraint after workloads have landed can invalidate an architecture and occasionally a procurement." }
        ],
        referencesLede: "Microsoft's own documentation for the product behaviour described above. We would rather you verified the basis than accepted our summary of it.",
        references: [
            { number: 1, order: 1, title: "Azure Private Link and private endpoints", source: "Azure networking documentation — removing public network exposure from platform services" },
            { number: 2, order: 2, title: "Managed identities for Azure resources", source: "Azure documentation — eliminating stored credentials" },
            { number: 3, order: 3, title: "Azure Policy effects", source: "Azure governance documentation — deny and deployIfNotExists for enforceable controls" },
            { number: 4, order: 4, title: "Azure Monitor diagnostic settings", source: "Azure Monitor documentation — resource logs, categories and destinations" },
            { number: 5, order: 5, title: "Microsoft Purview data security posture management for AI", source: "Microsoft Purview documentation — visibility into AI usage and data reached" }
        ],
        referencesNote: "On these references: each entry names a Microsoft Learn article or documentation area by title, because deep links change while titles are stable. Searching the title on learn.microsoft.com will reach the current version. Where we have cited a figure or a product behaviour, it is Microsoft's statement rather than ours; where we have given a number of our own it is labelled as such in the text.",
        ctaText: "We will map your control obligations to a target Azure design and produce the evidence structure alongside it, before any AI workload is built."
    },
    {
        platform: "azure",
        service: "strategy-transformation",
        industry: "manufacturing",
        icon: "cloud",
        pages: 15,
        title: "The edge-to-cloud architecture decision",
        description: "Architectures that assume connectivity fail in exactly the places manufacturers need them most. This paper examines the design decision and the failure nobody plans for.",
        publishedAt: new Date("2026-04-12"),
        readTime: "16 min read",
        subtitle: "Designing for the plant link that is not always there",
        inThisPaper: [
            "An abstract and four numbered findings",
            "Analysis across 3 sections",
            "A framework you can apply: Designing for intermittent connectivity",
            "Implications separated by role",
            "5 references to Microsoft documentation"
        ],
        abstractParagraphs: [
            "A cloud analytics design that works in a demonstration meets its first real test in a plant with a congested link, a basement with no signal, and a shift that continues regardless of whether the network is available.",
            "This paper argues that the design question is not how to guarantee connectivity but what happens when there is none and for how long, examines the reconnection failure that most designs carry undetected, and proposes a boundary between reading operational data and writing to anything that controls a machine."
        ],
        findings: [
            { number: 1, order: 1, title: "Sorting workloads by disconnection tolerance is the architectural decision", description: "Everything else follows from it, and it has to be done with operations in the room rather than inferred by IT." },
            { number: 2, order: 2, title: "The reconnection path is where most designs fail in production", description: "The link returns, hours of buffered data flow in, and something double-counts or arrives out of order. The failure is silent until a monthly report is wrong." },
            { number: 3, order: 3, title: "Buffers should be sized for the worst realistic outage, not the typical one", description: "The outage that matters is the unusual one, and a buffer that overflows loses data quietly." },
            { number: 4, order: 4, title: "Reading and writing are different risk classes and should be treated as such", description: "Reading machine data to inform planning is straightforward. Writing to anything that controls a machine carries safety implications and deserves an explicit boundary." }
        ],
        analysisBody: `<h2>The sorting exercise</h2>
<p>Some things must continue through a disconnection: production execution, safety systems, quality holds, anything that stops a line. Others can wait: analytics, reporting, most integration, anything whose value is measured in days rather than minutes.</p>
<p>Sorting workloads into those two categories, explicitly and with operations present, is the architectural decision. It determines what runs locally, what runs in the cloud, and what the store-and-forward path between them has to guarantee.</p>
<p>Done by IT alone, this exercise reliably places things in the wrong category, because the question of what genuinely stops a line is operational knowledge rather than technical.</p>
<h2>The reconnection failure</h2>
<p>This is the part that produces production incidents months after go-live.</p>
<p>The link returns after an outage. Several hours of buffered messages flow into the cloud. Something double-counts, or arrives out of order, or overwrites a value that was already correct. Nobody notices, because everything appears to be working. The discovery comes weeks later when a monthly report disagrees with the floor, by which point nobody can reconstruct which period was affected.</p>
<p>The design response is idempotent message handling with a stable deduplication key, a defined window for accepting late arrival, and a quarantine for anything outside it. And then deliberate testing: disconnect for a realistic period, let the buffer fill, reconnect, and verify counts reconcile exactly. Then do it again with deliberately out-of-order delivery.</p>
<ul>
<li>A deduplication key stable across retransmission — device, sequence and event timestamp</li>
<li>Deduplication applied at ingestion rather than downstream</li>
<li>A defined late-arrival window with a monitored quarantine beyond it</li>
<li>Buffer depth alerting, because silent accumulation is the dangerous failure</li>
<li>Reconnection tested deliberately, including with out-of-order delivery</li>
</ul>
<h2>The boundary worth stating</h2>
<p>Reading machine data to inform planning, costing and analytics is straightforward and valuable. Writing back to anything that controls a machine is a different risk class entirely.</p>
<p>We treat that boundary as explicit and written down, and we are deliberately conservative about it. Any proposal that quietly crosses it deserves a direct question about who has assessed the safety implications and under what standard.</p>
<p>This is not a technical limitation. It is a position about where a technology consultancy's competence ends and a controls engineering discipline begins, and being clear about it is part of what a client is buying.</p>`,
        frameworkLede: "Every paper in this series ends with a framework you can run internally. We would rather you used it and reached your own conclusion than took ours on trust.",
        frameworkName: "Designing for intermittent connectivity",
        frameworkDescription: "Five decisions, in order.",
        frameworkStages: [
            { number: 1, order: 1, title: "Sort", description: "Workloads by disconnection tolerance, with operations in the room." },
            { number: 2, order: 2, title: "Size", description: "Edge buffers for the worst realistic outage plus margin, not the typical one." },
            { number: 3, order: 3, title: "Deduplicate", description: "A stable key applied at ingestion, so reconnection cannot double-count." },
            { number: 4, order: 4, title: "Test", description: "Disconnect deliberately, reconnect, and reconcile exactly. Then test out-of-order delivery." },
            { number: 5, order: 5, title: "Bound", description: "Write the read-only boundary into the design document and the contract." }
        ],
        implicationsLede: "The same argument lands differently across an executive team. These are the three versions worth separating.",
        implications: [
            { order: 1, role: "For the plant manager", text: "The sorting exercise needs you. What genuinely stops a line is operational knowledge, and a design built without it will place the wrong things in the cloud." },
            { order: 2, role: "For the CIO", text: "Budget for the reconnection test. It is the single most valuable half-day in the programme and it is routinely skipped because everything appears to work." },
            { order: 3, role: "For the CFO", text: "If AI workloads are on the three-year plan, the estate requirements change and designing for them now is materially cheaper than retrofitting." }
        ],
        referencesLede: "Microsoft's own documentation for the product behaviour described above. We would rather you verified the basis than accepted our summary of it.",
        references: [
            { number: 1, order: 1, title: "Azure IoT Edge documentation", source: "Azure IoT — local processing, store-and-forward and offline behaviour" },
            { number: 2, order: 2, title: "Microsoft Fabric Real-Time Intelligence", source: "Microsoft Fabric documentation — eventstream ingestion and eventhouse" },
            { number: 3, order: 3, title: "Azure Event Hubs", source: "Azure documentation — ingestion, partitioning and retention" },
            { number: 4, order: 4, title: "Idempotent message processing patterns", source: "Azure Architecture Center — handling duplicate and out-of-order delivery" },
            { number: 5, order: 5, title: "Azure Well-Architected Framework: Reliability", source: "Azure Architecture Center — designing for partial failure" }
        ],
        referencesNote: "On these references: each entry names a Microsoft Learn article or documentation area by title, because deep links change while titles are stable. Searching the title on learn.microsoft.com will reach the current version. Where we have cited a figure or a product behaviour, it is Microsoft's statement rather than ours; where we have given a number of our own it is labelled as such in the text.",
        ctaText: "We will assess one plant's connectivity profile and workload mix, and produce an edge-to-cloud design with the disconnection and reconnection behaviour specified and tested."
    },
    {
        platform: "azure",
        service: "strategy-transformation",
        industry: "legal",
        icon: "cloud",
        pages: 13,
        title: "Data sovereignty and the professional obligation",
        description: "For a firm holding client confidences across jurisdictions, residency is a professional obligation before it is a technical constraint.",
        publishedAt: new Date("2026-02-08"),
        readTime: "14 min read",
        subtitle: "Why residency questions reach law firms differently, and what to establish before the architecture is set",
        inThisPaper: [
            "An abstract and four numbered findings",
            "Analysis across 3 sections",
            "A framework you can apply: Establishing a defensible position",
            "Implications separated by role",
            "5 references to Microsoft documentation"
        ],
        abstractParagraphs: [
            "Most organizations treat data residency as a compliance box. For a law firm it is a professional obligation with regulatory consequences, and it arrives from clients rather than from regulators — usually in a procurement questionnaire, late.",
            "This paper argues that residency should be established per matter type rather than firm-wide, examines why the question is cheaper to answer at design time than at contract stage, and sets out what a firm should be able to evidence when a client asks."
        ],
        findings: [
            { number: 1, order: 1, title: "Residency requirements reach firms through clients, not regulators", description: "Which means they arrive at procurement stage on somebody else's timetable, and a firm that cannot answer quickly loses the engagement rather than failing an audit." },
            { number: 2, order: 2, title: "A firm-wide residency position is either over-restrictive or inaccurate", description: "Different matter types carry genuinely different obligations. A blanket statement rules out services unnecessarily or asserts something that does not hold." },
            { number: 3, order: 3, title: "Retrofitting private networking touches every connection in every component", description: "It is one of the clearest examples of a design decision that is cheap before workloads land and a project afterwards." },
            { number: 4, order: 4, title: "The evidence layer is what the client questionnaire actually tests", description: "Not whether the control exists, but whether the firm can demonstrate it operated over a period." }
        ],
        analysisBody: `<h2>Why the question arrives differently</h2>
<p>A bank asks its regulator what is required. A law firm is asked by its client, and the client's requirement derives from their regulator, their jurisdiction and their own risk appetite.</p>
<p>This means the requirement is not knowable in advance from any single source, arrives at procurement stage, and varies between clients in ways the firm cannot control. A firm that has established its position per matter type answers in a day. A firm that has not spends three weeks and occasionally loses the engagement.</p>
<p>It also means the answer has to be evidenced rather than asserted. 'Our data is held in the EU' is a claim; a documented control mapping showing which service holds what, in which region, enforced by which policy, is an answer.</p>
<h2>Establishing the position</h2>
<p>Per matter type rather than firm-wide. Litigation for a domestic client, cross-border corporate work, and matters involving regulated sectors carry different obligations and should carry different technical positions.</p>
<p>The architectural consequence is that region restriction has to be enforceable at a granularity below the tenant. Azure policy applied at management group scope, with matter environments landing in the group matching their requirement, achieves this without maintaining separate tenants.</p>
<p>The alternative — a single restrictive position applied firm-wide — is simpler and rules out services the firm could legitimately use for the majority of its work.</p>
<ul>
<li>Residency established per matter type with a written rationale</li>
<li>Region restriction enforced by policy rather than stated in a document</li>
<li>Private endpoints and private DNS so services carry no public surface</li>
<li>Diagnostic logging enforced by policy with retention matched to the longest obligation</li>
<li>A control mapping document linking each obligation to the configuration implementing it</li>
</ul>
<h2>What the questionnaire actually tests</h2>
<p>Client security questionnaires have become the point at which professional services engagements stall, and the questions that cause delay are rarely the technically difficult ones.</p>
<p>Where is client data stored, in which country, and can that be evidenced. How is access granted, reviewed and revoked. What happens to client data at the end of an engagement. Do you use subcontractors and are they bound by the same terms. Have you tested your incident response plan, and when.</p>
<p>Each is answerable in a day by a firm that maintains a standing answer set, and in three weeks by one that reconstructs it per engagement. Firms that can return a complete, evidenced questionnaire in two days close faster and occasionally win on that basis.</p>`,
        frameworkLede: "Every paper in this series ends with a framework you can run internally. We would rather you used it and reached your own conclusion than took ours on trust.",
        frameworkName: "Establishing a defensible position",
        frameworkDescription: "Five steps. The first is a legal exercise rather than a technical one.",
        frameworkStages: [
            { number: 1, order: 1, title: "Segment", description: "Establish residency obligations per matter type, with the reasoning written down." },
            { number: 2, order: 2, title: "Enforce", description: "Region restriction by policy at management group scope, not by convention." },
            { number: 3, order: 3, title: "Isolate", description: "Private endpoints and private DNS so no service carries a public surface." },
            { number: 4, order: 4, title: "Evidence", description: "Diagnostic settings by policy, retention matched to the longest obligation you carry." },
            { number: 5, order: 5, title: "Answer", description: "A standing questionnaire response set, reviewed quarterly, owned by one person." }
        ],
        implicationsLede: "The same argument lands differently across an executive team. These are the three versions worth separating.",
        implications: [
            { order: 1, role: "For the risk partner", text: "The position is yours to establish and it is a professional obligation question before it is an infrastructure one. IT can enforce what you decide; it cannot decide it." },
            { order: 2, role: "For the managing partner", text: "A two-day questionnaire turnaround is a competitive advantage against larger firms with slower processes, and it is achievable with a standing answer set." },
            { order: 3, role: "For the IT director", text: "Raise residency in the first design conversation. Discovering a constraint after workloads land can invalidate the architecture." }
        ],
        referencesLede: "Microsoft's own documentation for the product behaviour described above. We would rather you verified the basis than accepted our summary of it.",
        references: [
            { number: 1, order: 1, title: "Data residency in Azure", source: "Microsoft Trust Center — regional storage commitments by service" },
            { number: 2, order: 2, title: "Azure Policy: allowed locations", source: "Azure governance documentation — enforcing region restrictions by deny effect" },
            { number: 3, order: 3, title: "Azure Private Link and private endpoints", source: "Azure networking documentation — removing public network exposure" },
            { number: 4, order: 4, title: "Azure Monitor diagnostic settings", source: "Azure Monitor documentation — resource log categories and retention" },
            { number: 5, order: 5, title: "Microsoft Purview Audit", source: "Microsoft Purview documentation — audit retention and evidencing access over a period" }
        ],
        referencesNote: "On these references: each entry names a Microsoft Learn article or documentation area by title, because deep links change while titles are stable. Searching the title on learn.microsoft.com will reach the current version. Where we have cited a figure or a product behaviour, it is Microsoft's statement rather than ours; where we have given a number of our own it is labelled as such in the text.",
        ctaText: "Send us a questionnaire you have recently been asked to complete and we will map which answers your current environment can already evidence, and what the remainder would take."
    },

    // ===== DYNAMICS 365 SALES PAPERS =====
    {
        platform: "d365-sales",
        service: "business-applications",
        industry: "professional-services",
        icon: "sales",
        pages: 13,
        title: "Pipeline as a resourcing instrument",
        description: "In a services firm, pipeline is a resource demand forecast. Treating it only as a revenue forecast is why delivery cannot meet the dates sales commits to.",
        publishedAt: new Date("2026-06-21"),
        readTime: "14 min read",
        subtitle: "Why professional services firms forecast revenue and not capacity, and what it costs them",
        inThisPaper: [
            "An abstract and four numbered findings",
            "Analysis across 3 sections",
            "A framework you can apply: From pipeline to capacity",
            "Implications separated by role",
            "5 references to Microsoft documentation"
        ],
        abstractParagraphs: [
            "Ask a services firm how its forecast is produced and you will often hear a description of a meeting. Somebody presents, others push back, a number is agreed. It is a reasonable process among experienced people and it is not a forecast, which is why nobody can explain the variance afterwards.",
            "This paper argues that the more consequential failure is not forecast accuracy but the absence of a capacity forecast. Pipeline in a services business is a resource demand signal, and firms that instrument it as one consistently report more measurable value than those that pursue forecast accuracy alone."
        ],
        findings: [
            { number: 1, order: 1, title: "CRM data degrades because the system was built for reporting, not for selling", description: "Required fields exist because a report needs them, so they are completed at the last moment with minimal thought, and the forecast is built on that." },
            { number: 2, order: 2, title: "A negotiated number cannot produce explainable variance", description: "Which is why, in most firms, nobody explains it. The meeting becomes necessary because the data is poor, which further reduces the incentive to maintain the data." },
            { number: 3, order: 3, title: "Pipeline carries resource demand and almost nobody captures it", description: "An opportunity that records the roles and dates it will require lets resourcing plan against probable work. This change typically produces more value than the forecast improvement accompanying it." },
            { number: 4, order: 4, title: "Manager behaviour predicts adoption better than configuration", description: "If pipeline reviews are run from a spreadsheet, sellers correctly conclude the CRM does not matter. We train managers before sellers for this reason." }
        ],
        analysisBody: `<h2>The degradation cycle</h2>
<p>The system was configured to satisfy management reporting rather than to help the person selling. Nineteen mandatory fields exist because nineteen report columns exist. They get filled in at the last possible moment with the least possible thought.</p>
<p>Once the data is known to be poor, the pipeline meeting becomes necessary to correct it. That meeting produces a number, and the number's existence reduces the incentive to maintain the underlying data further. It is a stable equilibrium and an expensive one.</p>
<p>Breaking it requires making the system useful to the person entering the data, which in practice means three things: activity captured automatically rather than typed, mandatory fields justified individually, and a sales process configured around how the firm genuinely sells including where practices differ.</p>
<h2>The capacity forecast nobody builds</h2>
<p>An opportunity carries a value and a probability. In a services firm it also implies a demand: two consultants of a particular skill, starting in a particular month, for a particular duration.</p>
<p>Capturing that at the opportunity stage — lightly, at the level sales will actually complete — converts pipeline into a demand curve that resourcing can plan against. Weighted by probability and aggregated by role and month, it lets a firm soft-book against probable work rather than waiting for signature.</p>
<p>The obstacle is rarely technical. It is that sales and resourcing report to different people, meet separately, and have no shared artefact. The weekly conversation is the mechanism; the tooling only makes it possible.</p>
<ul>
<li>Role, skill, estimated effort and expected start captured on the opportunity</li>
<li>Stage probabilities derived from historic conversion rather than from confidence</li>
<li>Weighted demand aggregated by role and month, shown against available capacity</li>
<li>Soft booking possible against probable work, not only confirmed work</li>
<li>A weekly sales and resourcing conversation working from the same view</li>
</ul>
<h2>What the platform direction changes</h2>
<p>Microsoft's current direction for Dynamics 365 Sales is agentic: research conducted across CRM and external sources, records enriched automatically, next actions recommended rather than requested.</p>
<p>This raises rather than lowers the value of basic data discipline. An agent reasoning over a pipeline of placeholder values will produce confident recommendations built on nothing, and it will do so faster and more persuasively than a human analyst would.</p>
<p>The firms that benefit will be the ones whose data was already worth reasoning over. That is an argument for fixing capture now rather than waiting for the capability to arrive.</p>`,
        frameworkLede: "Every paper in this series ends with a framework you can run internally. We would rather you used it and reached your own conclusion than took ours on trust.",
        frameworkName: "From pipeline to capacity",
        frameworkDescription: "Five steps. The first two are usually skipped and the last is where the value lands.",
        frameworkStages: [
            { number: 1, order: 1, title: "Reduce", description: "Justify every mandatory field individually. We routinely take firms from nineteen to six." },
            { number: 2, order: 2, title: "Capture", description: "Activity from Outlook and Teams automatically, so recording is not retyping." },
            { number: 3, order: 3, title: "Extend", description: "Add role, effort and expected start to the opportunity — lightly, at a level sales will complete." },
            { number: 4, order: 4, title: "Weight", description: "Derive stage probabilities from historic conversion, not from seller confidence." },
            { number: 5, order: 5, title: "Meet", description: "A weekly sales and resourcing conversation from one view. Without this, nothing changes." }
        ],
        implicationsLede: "The same argument lands differently across an executive team. These are the three versions worth separating.",
        implications: [
            { order: 1, role: "For the managing partner", text: "The forecast accuracy conversation is the one you are having. The capacity conversation is the one that reduces the number of clients told a start date the firm cannot meet." },
            { order: 2, role: "For the resourcing lead", text: "You are currently planning against confirmed work only, which means reacting. Probability-weighted demand is the single change that lets you plan." },
            { order: 3, role: "For the sales director", text: "Adoption is a management behaviour before it is a configuration. If reviews run from a spreadsheet, no amount of system design will fix the data." }
        ],
        referencesLede: "Microsoft's own documentation for the product behaviour described above. We would rather you verified the basis than accepted our summary of it.",
        references: [
            { number: 1, order: 1, title: "Dynamics 365 Sales documentation", source: "Microsoft Learn — opportunity and business process flow configuration" },
            { number: 2, order: 2, title: "Dynamics 365 App for Outlook", source: "Dynamics 365 Sales documentation — capturing activity without leaving the mail client" },
            { number: 3, order: 3, title: "Forecasting in Dynamics 365 Sales", source: "Dynamics 365 Sales documentation — forecast configuration and rollup" },
            { number: 4, order: 4, title: "Dynamics 365 Project Operations resource management", source: "Project Operations documentation — resource requirements and fulfilment" },
            { number: 5, order: 5, title: "Dynamics 365 2026 release wave plans", source: "Microsoft release plan documentation — agentic capability across the Sales application" }
        ],
        referencesNote: "On these references: each entry names a Microsoft Learn article or documentation area by title, because deep links change while titles are stable. Searching the title on learn.microsoft.com will reach the current version. Where we have cited a figure or a product behaviour, it is Microsoft's statement rather than ours; where we have given a number of our own it is labelled as such in the text.",
        ctaText: "Describe how a deal actually moves through your firm and we will configure a demo around that process, then put it in front of the sellers and the resourcing lead together."
    },
    {
        platform: "d365-sales",
        service: "business-applications",
        industry: "financial-services",
        icon: "sales",
        pages: 13,
        title: "Relationship banking in a product-centric system",
        description: "Your core system knows about a checking account, a mortgage and a commercial loan. It does not know they belong to the same household.",
        publishedAt: new Date("2026-03-29"),
        readTime: "14 min read",
        subtitle: "Why institutions make relationship decisions on account-level data, and what closes the gap",
        inThisPaper: [
            "An abstract and four numbered findings",
            "Analysis across 3 sections",
            "A framework you can apply: Building the relationship layer",
            "Implications separated by role",
            "5 references to Microsoft documentation"
        ],
        abstractParagraphs: [
            "Retail and commercial relationships are held at account level because that is how transactions work. Commercial decisions are made at relationship level, and the gap between them is filled by an account manager's memory.",
            "This paper examines what that gap costs in pricing, concentration and cross-sell terms, argues that the answer is rarely core replacement, and sets out how relationship structure should be modelled so it survives the first person who belongs to two households."
        ],
        findings: [
            { number: 1, order: 1, title: "Core replacement is disproportionate as an answer to a relationship data problem", description: "The core is a transaction processor and an excellent one. Building the relationship layer beside it is the proportionate response." },
            { number: 2, order: 2, title: "Household definition is a compliance decision before it is a technical one", description: "Address-based, declared-relationship-based or a combination — each produces different aggregations and different regulatory implications." },
            { number: 3, order: 3, title: "Account hierarchy models ownership; connections model relationships", description: "Modelling households in the hierarchy breaks the first time a person belongs to two, which happens immediately in real data." },
            { number: 4, order: 4, title: "Rollup latency must be labelled or it will be misused", description: "A scheduled rollup used for a concentration decision is a decision made on stale data, and the field gives no indication." }
        ],
        analysisBody: `<h2>What the gap costs</h2>
<p>Three things, in ascending order of consequence. A household offered a product it already holds, which damages the relationship the campaign was meant to build. A concentration exposure nobody aggregated, which is a risk finding waiting to happen. And pricing decisions made without knowing the full relationship, which systematically undervalues the institution's best customers.</p>
<p>The account manager's memory closes the gap in practice, and it is genuinely effective until they leave, go on holiday, or the institution grows past the point where individual memory scales.</p>
<h2>Modelling it so it holds</h2>
<p>The account hierarchy is right for legal ownership structures — a parent company and its subsidiaries — and wrong for households, where the relationship is not ownership and a person can belong to more than one.</p>
<p>Connections handle what the hierarchy cannot: many-to-many, role-typed relationships recording that two contacts are spouses, that a contact is a director of an account, or that two accounts share a beneficial owner.</p>
<p>Effective dating matters more than institutions expect. Recording when a relationship started and ended lets you reconstruct the household as it stood at a past date, which is what a regulatory question about a historic decision actually requires.</p>
<ul>
<li>A household entity with a written definition agreed with compliance</li>
<li>A short connection role vocabulary — five roles applied consistently beats twenty applied loosely</li>
<li>Effective dating so historic structure can be reconstructed</li>
<li>Matching on a stable core system key rather than on name and address</li>
<li>Rollup fields with their latency stated explicitly in the field description</li>
</ul>
<h2>The definition problem</h2>
<p>Defining a household is genuinely difficult and it is a commercial and compliance decision rather than a technical one.</p>
<p>Address-based definitions capture people who live together and miss family relationships across addresses. Declared-relationship definitions capture what customers tell you and miss what they do not. A combination is usually right and needs a written rule for the cases where the two conflict.</p>
<p>Whatever is chosen, it should be written down, signed off by compliance, and reviewed annually with a change process. Aggregations built on an undocumented definition cannot be explained when questioned, and in a regulated institution being unable to explain an aggregation is itself a finding.</p>`,
        frameworkLede: "Every paper in this series ends with a framework you can run internally. We would rather you used it and reached your own conclusion than took ours on trust.",
        frameworkName: "Building the relationship layer",
        frameworkDescription: "Five stages. The first is the one that determines whether the rest is usable.",
        frameworkStages: [
            { number: 1, order: 1, title: "Define", description: "Household and relationship group in writing, with compliance sign-off and an annual review." },
            { number: 2, order: 2, title: "Separate", description: "Hierarchy for ownership, connections for everything else." },
            { number: 3, order: 3, title: "Date", description: "Effective dates on relationships so historic structure is reconstructable." },
            { number: 4, order: 4, title: "Key", description: "Match to the core on a stable identifier, never on name and address if avoidable." },
            { number: 5, order: 5, title: "Label", description: "State rollup latency on every aggregated field so nobody mistakes it for real time." }
        ],
        implicationsLede: "The same argument lands differently across an executive team. These are the three versions worth separating.",
        implications: [
            { order: 1, role: "For the head of retail or commercial", text: "The cross-sell case is the visible one. The concentration and pricing cases are larger and are the ones your risk function will care about." },
            { order: 2, role: "For compliance", text: "The household definition is a decision you should own rather than inherit. It determines what aggregations mean and how they can be defended." },
            { order: 3, role: "For the CIO", text: "Resist core replacement as the answer. Building the relationship layer beside the core is proportionate, and any adviser proposing otherwise should be asked why." }
        ],
        referencesLede: "Microsoft's own documentation for the product behaviour described above. We would rather you verified the basis than accepted our summary of it.",
        references: [
            { number: 1, order: 1, title: "Dynamics 365 Sales account and contact hierarchies", source: "Dynamics 365 documentation — parent-child relationships and their limits" },
            { number: 2, order: 2, title: "Connections and connection roles", source: "Dynamics 365 documentation — many-to-many typed relationships" },
            { number: 3, order: 3, title: "Rollup fields in Dataverse", source: "Microsoft Dataverse documentation — calculation frequency and limitations" },
            { number: 4, order: 4, title: "Duplicate detection rules", source: "Dynamics 365 documentation — matching configuration and review" },
            { number: 5, order: 5, title: "Microsoft Cloud for Financial Services", source: "Microsoft industry cloud documentation — the financial services data model" }
        ],
        referencesNote: "On these references: each entry names a Microsoft Learn article or documentation area by title, because deep links change while titles are stable. Searching the title on learn.microsoft.com will reach the current version. Where we have cited a figure or a product behaviour, it is Microsoft's statement rather than ours; where we have given a number of our own it is labelled as such in the text.",
        ctaText: "We will model one segment of your book against your household definition and show relationship managers the complete picture, before you commit to anything wider."
    },
    {
        platform: "d365-sales",
        service: "business-applications",
        industry: "education",
        icon: "sales",
        pages: 12,
        title: "The economics of the enrolment funnel",
        description: "The students who disappear between deposit and registration had already chosen you. Something in the following weeks made the decision reversible again.",
        publishedAt: new Date("2025-12-21"),
        readTime: "13 min read",
        subtitle: "Why institutions spend at the top of a funnel and lose students at the bottom",
        inThisPaper: [
            "An abstract and four numbered findings",
            "Analysis across 3 sections",
            "A framework you can apply: Managing the whole funnel",
            "Implications separated by role",
            "5 references to Microsoft documentation"
        ],
        abstractParagraphs: [
            "Enrolment teams spend heavily on generating enquiries and comparatively little on the stage where the most students are lost. Melt between deposit and registration is a well-documented phenomenon and, in most institutions, an unmanaged one.",
            "This paper examines why the largest loss goes unmanaged, argues that the constraint is visibility during the cycle rather than communication quality, and sets out the reallocation that frequently produces more improvement than any technology change."
        ],
        findings: [
            { number: 1, order: 1, title: "The largest loss is at the stage nobody owns", description: "Melt is treated as an outcome rather than as a stage with an owner, which makes it invisible until the intake report." },
            { number: 2, order: 2, title: "You cannot manage what you cannot see during the cycle", description: "Enquiries, applications and deposits sit in different systems with different definitions, so the picture is assembled after the intake number is fixed." },
            { number: 3, order: 3, title: "The content that works at this stage is practical, not promotional", description: "What happens next, when, who to contact, what other students found difficult. It reduces anxiety, which is what melt is made of." },
            { number: 4, order: 4, title: "Reallocating counsellor effort by measured yield often beats the communication work", description: "Most institutions allocate territory effort by history. Reallocation by yield costs nothing." }
        ],
        analysisBody: `<h2>What is happening in the gap</h2>
<p>Uncertainty, mostly. A student who has deposited has weeks or months before arrival, during which nothing much happens except administrative requests: a form to complete, a document to supply, a payment to arrange.</p>
<p>Institutions that manage this well fill the gap with communication that reduces anxiety rather than adding tasks. Institutions that do not fill it discover that the gap fills itself with second thoughts, competing offers and family conversations.</p>
<p>For first-generation students in particular, the value is in demystifying a process everybody else appears to understand. This is straightforward content to produce and it is rarely produced, because it falls between admissions, student services and marketing and nobody owns it.</p>
<h2>Why it goes unmanaged</h2>
<p>Melt cannot be managed if it cannot be seen in real time, and in most institutions it cannot. Enquiries sit in one system, applications in another, deposits in a third, and registration in the student information system. The picture is assembled after the cycle, at which point the intake number is whatever it is.</p>
<p>Instrumenting the funnel properly means modelling every stage rather than the three that are easy, setting registration automatically from the student information system, and treating deposited-not-registered as a named stage with a named owner and a weekly review.</p>
<p>That last point is the whole intervention. A metric with an owner and a weekly cadence gets acted on; the same metric on a dashboard does not.</p>
<ul>
<li>Every funnel stage modelled, with stage dates captured automatically</li>
<li>Registration set by integration from the student information system, not manually</li>
<li>Source and territory captured as controlled lists so attribution is possible</li>
<li>Melt measured as a named stage with a named owner and a weekly review</li>
<li>Communication triggered by behaviour, with non-response routing to a human</li>
</ul>
<h2>The reallocation nobody makes</h2>
<p>Instrumenting the funnel also reveals where counsellor time actually produces conversion, which is usually not where it is currently spent.</p>
<p>Most institutions allocate territory effort by history — the regions that have always been covered, at the intensity they have always been covered. Measured yield frequently tells a different story, and reallocating against it produces improvement at no additional cost.</p>
<p>We raise this because it is the finding institutions act on most readily and the one least often included in a technology business case. It is also the argument for instrumenting the funnel that survives a budget review most reliably.</p>`,
        frameworkLede: "Every paper in this series ends with a framework you can run internally. We would rather you used it and reached your own conclusion than took ours on trust.",
        frameworkName: "Managing the whole funnel",
        frameworkDescription: "Five steps. The third is where the recoverable value is.",
        frameworkStages: [
            { number: 1, order: 1, title: "Model", description: "Every stage from enquiry to registration, with dates captured on transition." },
            { number: 2, order: 2, title: "Integrate", description: "Registration set automatically from the student information system." },
            { number: 3, order: 3, title: "Own", description: "Melt as a named stage with an owner and a weekly review during the window." },
            { number: 4, order: 4, title: "Communicate", description: "Behaviour-triggered, practical content; non-response routes to a person." },
            { number: 5, order: 5, title: "Reallocate", description: "Counsellor effort by measured yield rather than by territory history." }
        ],
        implicationsLede: "The same argument lands differently across an executive team. These are the three versions worth separating.",
        implications: [
            { order: 1, role: "For the enrolment director", text: "Melt is the largest single recoverable loss and it needs an owner rather than a report. That change costs nothing and produces the most." },
            { order: 2, role: "For the CFO", text: "The reallocation finding usually produces more improvement than the technology, and it is free. That makes the instrumentation case easier to defend." },
            { order: 3, role: "For marketing", text: "The content that works at this stage is not marketing content. It is practical and reassuring, and it probably needs a different author." }
        ],
        referencesLede: "Microsoft's own documentation for the product behaviour described above. We would rather you verified the basis than accepted our summary of it.",
        references: [
            { number: 1, order: 1, title: "Dynamics 365 Sales business process flows", source: "Dynamics 365 documentation — modelling multi-stage processes with stage dates" },
            { number: 2, order: 2, title: "Dynamics 365 Customer Insights journeys", source: "Customer Insights documentation — behaviour-triggered communication" },
            { number: 3, order: 3, title: "Dataverse integration patterns", source: "Microsoft Dataverse documentation — integrating with a student information system" },
            { number: 4, order: 4, title: "Power BI semantic models", source: "Power BI documentation — real-time conversion reporting by stage" },
            { number: 5, order: 5, title: "Microsoft 365 Education licensing", source: "Microsoft Education documentation — academic pricing and eligibility" }
        ],
        referencesNote: "On these references: each entry names a Microsoft Learn article or documentation area by title, because deep links change while titles are stable. Searching the title on learn.microsoft.com will reach the current version. Where we have cited a figure or a product behaviour, it is Microsoft's statement rather than ours; where we have given a number of our own it is labelled as such in the text.",
        ctaText: "We will map your current funnel data sources and show what real-time stage conversion and melt tracking would look like, using your programmes and terminology, before a cycle opens."
    },
    {
        platform: "d365-sales",
        service: "business-applications",
        industry: "retail-distribution",
        icon: "sales",
        pages: 12,
        title: "The quote-to-cash chain",
        description: "Improvements to picking and replenishment help. They cannot repair a commitment that was wrong when it was given.",
        publishedAt: new Date("2025-12-14"),
        readTime: "13 min read",
        subtitle: "Why the promise made at the sales desk determines everything downstream",
        inThisPaper: [
            "An abstract and four numbered findings",
            "Analysis across 3 sections",
            "A framework you can apply: Fixing the promise",
            "Implications separated by role",
            "5 references to Microsoft documentation"
        ],
        abstractParagraphs: [
            "A customer asks whether you have forty units. The sales desk checks a number, says yes, and the order is accepted. The warehouse discovers on Thursday that eighteen were committed to another order on Tuesday. Everyone behaved correctly; the number was wrong before anybody looked at it.",
            "This paper argues that overselling is an architectural problem at the point of promise rather than an execution problem downstream, and examines the compounding cost that most distributors have never quantified."
        ],
        findings: [
            { number: 1, order: 1, title: "Availability is not on-hand stock", description: "Real availability is on hand, minus committed, minus allocated, plus inbound within the promise window, across every location." },
            { number: 2, order: 2, title: "One overselling incident consumes the margin on several good orders", description: "Expedited freight, partial shipment administration, a credit note, a customer call, and goodwill nobody prices." },
            { number: 3, order: 3, title: "Downstream improvement cannot repair an incorrect promise", description: "Better picking and faster replenishment help, and they operate after the commitment has been made." },
            { number: 4, order: 4, title: "Post-acceptance interventions are the measure nobody tracks", description: "Short shipments, substitutions, expedites and credits. The number is usually higher than expected and it moves fast once addressed." }
        ],
        analysisBody: `<h2>What availability actually means</h2>
<p>On hand is the easy part and the part most systems show. Real availability is on hand, minus committed, minus allocated, plus inbound within the promise window, across every location including stock in transit.</p>
<p>A distributor quoting from on-hand alone will oversell whenever demand concentrates — which is to say, on exactly the lines that matter most.</p>
<p>The architectural requirement is that quoting reads live availability rather than a periodic copy. One inventory pool shared by every channel, rather than separate copies synchronised overnight, which diverge by definition between syncs.</p>
<ul>
<li>Available-to-promise including committed, allocated and in-transit quantities</li>
<li>One inventory pool serving desk, web, EDI and store rather than synchronised copies</li>
<li>Contract pricing applied automatically so quotes are correct as well as deliverable</li>
<li>Credit position checked at quote rather than at despatch</li>
<li>Substitution offered at the point of quote rather than discovered at pick</li>
</ul>
<h2>The compounding cost</h2>
<p>A single overselling incident is not one cost. It is the expedited freight to cover the shortfall, the partial shipment and its administration, the credit note, the customer call, and the goodwill nobody puts a number on.</p>
<p>In thin-margin distribution one of these consumes the profit on several good orders, which makes it worth calculating your own figure before deciding this is a minor operational irritation.</p>
<p>The measure we recommend is the count of orders requiring an intervention after acceptance — a short shipment, a substitution, an expedite or a credit. Most distributors have never counted it. The number is usually higher than expected and it drops quickly once the promise is fixed.</p>
<h2>Why the desk is the right place to start</h2>
<p>Because it is where the promise is made. Improvements downstream help and they cannot repair a commitment that was wrong when it was given.</p>
<p>Connecting the sales desk to live availability and contract pricing changes the quality of every promise, and everything downstream inherits that improvement without further work.</p>
<p>It also changes the conversation with the customer. A substitution offered at the point of sale is a service; the same substitution discovered at the warehouse is a problem, and the difference is entirely one of timing.</p>`,
        frameworkLede: "Every paper in this series ends with a framework you can run internally. We would rather you used it and reached your own conclusion than took ours on trust.",
        frameworkName: "Fixing the promise",
        frameworkDescription: "Five steps, starting at the point of commitment.",
        frameworkStages: [
            { number: 1, order: 1, title: "Measure", description: "Count post-acceptance interventions. It quantifies a problem everybody knows and nobody has sized." },
            { number: 2, order: 2, title: "Unify", description: "One inventory pool across every channel rather than synchronised copies." },
            { number: 3, order: 3, title: "Calculate", description: "Available-to-promise including committed, allocated and inbound quantities." },
            { number: 4, order: 4, title: "Price", description: "Contract pricing and credit position applied at quote, not at despatch." },
            { number: 5, order: 5, title: "Offer", description: "Substitution at the point of sale, where it reads as service rather than failure." }
        ],
        implicationsLede: "The same argument lands differently across an executive team. These are the three versions worth separating.",
        implications: [
            { order: 1, role: "For the commercial director", text: "The intervention count is the number to put in front of the board. It converts an operational irritation into a quantified margin leak." },
            { order: 2, role: "For operations", text: "Downstream improvements are worth making and they operate after the commitment. Sequence the promise first." },
            { order: 3, role: "For the CIO", text: "Synchronised inventory copies diverge between syncs by definition. One pool is the architectural answer and it is a design decision rather than a tuning one." }
        ],
        referencesLede: "Microsoft's own documentation for the product behaviour described above. We would rather you verified the basis than accepted our summary of it.",
        references: [
            { number: 1, order: 1, title: "Dynamics 365 Sales quotes and orders", source: "Dynamics 365 documentation — quote to order to invoice flow" },
            { number: 2, order: 2, title: "Business Central item availability", source: "Business Central documentation — availability by location, event and period" },
            { number: 3, order: 3, title: "Business Central warehouse management", source: "Business Central documentation — reservation, allocation and picking" },
            { number: 4, order: 4, title: "Dataverse and Business Central integration", source: "Microsoft documentation — connecting customer engagement to the ERP" },
            { number: 5, order: 5, title: "Dynamics 365 pricing and discount management", source: "Dynamics 365 documentation — contract pricing and price lists" }
        ],
        referencesNote: "On these references: each entry names a Microsoft Learn article or documentation area by title, because deep links change while titles are stable. Searching the title on learn.microsoft.com will reach the current version. Where we have cited a figure or a product behaviour, it is Microsoft's statement rather than ours; where we have given a number of our own it is labelled as such in the text.",
        ctaText: "Send us an anonymised order file and your pricing rules for one customer segment, and we will demonstrate quoting against live availability using your own product data."
    },

    // ===== SHAREPOINT PAPERS =====
    {
        platform: "sharepoint",
        service: "modern-work-automation",
        industry: "legal",
        icon: "grid",
        pages: 15,
        title: "Knowledge management and the ethical wall",
        description: "Most firms have a conflicts policy and a matter site structure. Very few have tested whether the wall exists anywhere other than in the site.",
        publishedAt: new Date("2026-06-14"),
        readTime: "16 min read",
        subtitle: "Why law firms are structurally exposed to AI content discovery, and what the wall has to become",
        inThisPaper: [
            "An abstract and four numbered findings",
            "Analysis across 3 sections",
            "A framework you can apply: The four-layer wall",
            "Implications separated by role",
            "5 references to Microsoft documentation"
        ],
        abstractParagraphs: [
            "A firm creates a site per matter, restricts membership, and considers the ethical wall built. The problem is everything around the site: the email thread in personal mailboxes, the document saved to a partner's own storage, and the search result that returns a title and a snippet to somebody who cannot open the file.",
            "This paper argues that an ethical wall built only at the site level is not a wall, sets out the four layers that must agree for it to be one, and proposes a test firms can run themselves before their risk partner has to."
        ],
        findings: [
            { number: 1, order: 1, title: "A site-level wall leaks through search, email and personal storage", description: "None of these are configuration errors in isolation. Together they mean the wall exists in the site and nowhere else." },
            { number: 2, order: 2, title: "The search snippet is the most common and least expected leak", description: "It reveals the existence and subject of a matter without revealing the file, which is a confidentiality event in its own right." },
            { number: 3, order: 3, title: "Barriers built on Department reorganise when the firm does", description: "A dedicated directory attribute changes only when somebody deliberately changes it. Department changes for reasons unconnected to conflicts." },
            { number: 4, order: 4, title: "AI content discovery raises the stakes without changing the remediation", description: "The work required is identical whether or not you deploy an assistant. What changes is how quickly the gap is found and by whom." }
        ],
        analysisBody: `<h2>The four layers</h2>
<p>A defensible ethical wall in Microsoft 365 is not one control. It is four, and they have to be designed together rather than added in sequence.</p>
<p>Information barriers provide policy-level segmentation preventing communication and collaboration between defined groups, enforced across Teams, SharePoint and OneDrive. Access design drives matter site membership from the practice management system rather than maintaining it by hand. Sensitivity labels apply protection that travels with the document when it leaves the site. Retention aligns to matter lifecycle rather than to a calendar date, so closed matters actually close.</p>
<p>Firms that implement one of these and consider the wall built are the norm rather than the exception.</p>
<ul>
<li>Information barriers segmenting communication and collaboration by defined group</li>
<li>Matter site membership driven from the practice management system, not maintained by hand</li>
<li>Sensitivity labels applying protection that persists outside the tenant</li>
<li>Retention triggered by matter closure rather than by a calendar date</li>
<li>A maintained directory attribute that survives organizational change</li>
</ul>
<h2>Why firms are structurally exposed</h2>
<p>Three characteristics compound. Partnerships resist mandated process, so configuration that fights how partners work is worked around. Matter teams form and dissolve continuously, so membership drifts faster than in a corporate structure. And the content is unusually sensitive, so the consequence of a leak is professional rather than merely commercial.</p>
<p>Microsoft is investing heavily in making content discoverable and answerable by agents — automated metadata, stale content detection, assistants that reason over libraries. For a firm with a properly built wall this is straightforwardly useful. For a firm whose wall exists only at the site level, it is a considerably faster way to discover the gap.</p>
<p>The remediation work is the same either way. The question is only whether the firm does it deliberately or after an incident.</p>
<h2>The test</h2>
<p>The single most useful hour in this work is a deliberate attempt to breach your own wall.</p>
<p>Take an account on the wrong side of a barrier and try, methodically, to reach the material: search, direct URL, a link forwarded by a colleague, a document opened on a personal device, an export to a spreadsheet. Write down what worked.</p>
<p>In our experience the search result snippet surprises risk partners most often. It is not a permissions failure in the conventional sense — the file cannot be opened — and it still discloses that the firm is acting on a matter and what the matter concerns.</p>`,
        frameworkLede: "Every paper in this series ends with a framework you can run internally. We would rather you used it and reached your own conclusion than took ours on trust.",
        frameworkName: "The four-layer wall",
        frameworkDescription: "Five stages including the test. Firms that stop after stage two have a site, not a wall.",
        frameworkStages: [
            { number: 1, order: 1, title: "Attribute", description: "A dedicated directory attribute populated for 100% of users. Unpopulated users sit outside every policy." },
            { number: 2, order: 2, title: "Segment", description: "Barriers defined and membership signed off by the risk partner before enforcement." },
            { number: 3, order: 3, title: "Protect", description: "Sensitivity labels so protection travels with the document beyond the site." },
            { number: 4, order: 4, title: "Retain", description: "Retention triggered by matter closure, so closed matters leave the discoverable estate." },
            { number: 5, order: 5, title: "Breach", description: "Attempt to defeat your own wall, in writing, before anybody else does." }
        ],
        implicationsLede: "The same argument lands differently across an executive team. These are the three versions worth separating.",
        implications: [
            { order: 1, role: "For the risk partner", text: "The breach test is an hour and it is the only way to know whether the wall you designed is the wall you have. We would run it before, not after, any AI deployment decision." },
            { order: 2, role: "For the managing partner", text: "The remediation is required regardless of your AI position. Framing it as an AI prerequisite makes it fundable; framing it as a conflicts control makes it correct." },
            { order: 3, role: "For the IT director", text: "Do not build barriers on Department. It reorganises for business reasons and takes the ethical walls with it, silently." }
        ],
        referencesLede: "Microsoft's own documentation for the product behaviour described above. We would rather you verified the basis than accepted our summary of it.",
        references: [
            { number: 1, order: 1, title: "Information barriers in Microsoft Purview", source: "Microsoft Purview documentation — segments, policies and the barrier processor" },
            { number: 2, order: 2, title: "Information barriers and SharePoint", source: "SharePoint documentation — how barriers apply to sites and OneDrive" },
            { number: 3, order: 3, title: "Sensitivity labels in Microsoft Purview", source: "Microsoft Purview Information Protection — persistent protection and encryption" },
            { number: 4, order: 4, title: "Retention labels and event-based retention", source: "Microsoft Purview Data Lifecycle Management — triggering retention on matter closure" },
            { number: 5, order: 5, title: "SharePoint Advanced Management", source: "SharePoint documentation — oversharing and permission reporting" }
        ],
        referencesNote: "On these references: each entry names a Microsoft Learn article or documentation area by title, because deep links change while titles are stable. Searching the title on learn.microsoft.com will reach the current version. Where we have cited a figure or a product behaviour, it is Microsoft's statement rather than ours; where we have given a number of our own it is labelled as such in the text.",
        ctaText: "We will run a scoped information barrier review against one practice group, including the deliberate breach test, and give you the findings in writing whether or not you take the remediation further with us."
    },
    {
        platform: "sharepoint",
        service: "modern-work-automation",
        industry: "nonprofits-associations",
        icon: "grid",
        pages: 12,
        title: "The overhead ratio and the cost of information work",
        description: "Grant reporting is slow because evidence is assembled afterwards rather than captured as work happens. That is a design decision, not a resourcing problem.",
        publishedAt: new Date("2026-04-05"),
        readTime: "13 min read",
        subtitle: "Why nonprofit reporting consumes senior time, and what changing the capture point does to it",
        inThisPaper: [
            "An abstract and four numbered findings",
            "Analysis across 3 sections",
            "A framework you can apply: Moving the capture point",
            "Implications separated by role",
            "5 references to Microsoft documentation"
        ],
        abstractParagraphs: [
            "Every quarter, in most grant-funded organizations, two or three of the most capable people stop doing the mission and start assembling a report. The report is usually excellent; the process is the problem, and it repeats four times a year.",
            "This paper argues that the cost is structural rather than a matter of effort, examines why the evidence a funder wants and the data a programme captures are related but never aligned, and sets out what capturing funder requirements at the point of delivery changes — including for the overhead ratio the organization is judged on."
        ],
        findings: [
            { number: 1, order: 1, title: "The misalignment is structural and predictable", description: "Grant conditions are known in advance; intake forms were designed before the grant existed. Somebody bridges the gap manually every quarter." },
            { number: 2, order: 2, title: "The fix is a capture point change, not a reporting tool", description: "Tagging each service event with its programme, funding source and eligibility at the moment it is recorded removes the assembly step entirely." },
            { number: 3, order: 3, title: "Most of the capability is already licensed at nonprofit pricing", description: "Structured lists, metadata, retention, approval flows and reporting are included in tiers most grant-funded organizations already hold and have not deployed." },
            { number: 4, order: 4, title: "Programme capacity becomes visible before over-commitment rather than after", description: "This is the benefit programme managers mention afterwards, and it is rarely in the business case." }
        ],
        analysisBody: `<h2>Where the time actually goes</h2>
<p>Expenditure pulled from finance. Service delivery from a programme database. Outcomes from a spreadsheet. Photographs from somebody's phone. Then reconciliation, formatting and a review cycle.</p>
<p>None of this is inefficiency in the ordinary sense. Each step is necessary given how the data was captured, which is why exhorting the team to be faster produces nothing.</p>
<p>The overhead consequence is worth stating plainly: these are senior programme people, their time is charged somewhere, and an organization judged on its overhead ratio is paying for a design decision made years earlier by whoever built the intake form.</p>
<h2>What changes with the capture point</h2>
<p>Every service event tagged with its programme, its funding source and the eligibility criteria that qualified it — at the moment it is recorded, by the person recording it.</p>
<p>Expenditure coded to the funding source at entry rather than reallocated at period end. Outcome measures designed into the service record rather than added at reporting time. Supporting documents filed to the programme with metadata rather than to a personal drive.</p>
<p>The report then becomes a query rather than a project. More usefully, programme managers can see remaining grant capacity during delivery rather than discovering an over-commitment at the quarter end.</p>
<ul>
<li>Structured intake capturing funder-required fields as part of normal delivery</li>
<li>Expenditure coded to funding source at entry, not reallocated later</li>
<li>Outcome measures built into the service record with a scheduled follow-up point</li>
<li>Documents filed to the programme with metadata rather than to personal storage</li>
<li>A report pack generated from live data with drill-through to the underlying record</li>
</ul>
<h2>The licensing point</h2>
<p>Most nonprofits hold Microsoft 365 at nonprofit pricing, and a substantial share of what is needed here is included in that: structured lists, document libraries with metadata, retention, approval flows and Power BI reporting.</p>
<p>Building on entitlements you already own means the project cost is consulting time rather than consulting time plus a new subscription. For an organization judged on overhead ratio, that distinction is not a detail.</p>
<p>It is also worth checking eligibility annually rather than once. Programme terms change, your headcount changes, and organizations that verified three years ago are usually leaving something on the table.</p>`,
        frameworkLede: "Every paper in this series ends with a framework you can run internally. We would rather you used it and reached your own conclusion than took ours on trust.",
        frameworkName: "Moving the capture point",
        frameworkDescription: "Five stages, starting from the funder rather than from the system.",
        frameworkStages: [
            { number: 1, order: 1, title: "Read", description: "Start with the funder's actual reporting requirements, in writing." },
            { number: 2, order: 2, title: "Design", description: "Work backwards to the minimum metadata that would produce them." },
            { number: 3, order: 3, title: "Capture", description: "Build those fields into intake and delivery, not into a reporting step." },
            { number: 4, order: 4, title: "Code", description: "Expenditure to funding source at entry. Reallocation at year end is where the effort goes." },
            { number: 5, order: 5, title: "Generate", description: "Report pack from views and live data, with drill-through to the service record." }
        ],
        implicationsLede: "The same argument lands differently across an executive team. These are the three versions worth separating.",
        implications: [
            { order: 1, role: "For the executive director", text: "The saving is senior programme time, which shows up in the overhead ratio you are judged on. That framing funds the work more reliably than an efficiency argument." },
            { order: 2, role: "For the finance lead", text: "Coding expenditure at entry is a finance process change rather than a system project, and it removes most of the quarterly effort on its own." },
            { order: 3, role: "For programme managers", text: "The benefit you will notice is capacity visibility during delivery. Over-commitment discovered at quarter end is the problem this actually solves." }
        ],
        referencesLede: "Microsoft's own documentation for the product behaviour described above. We would rather you verified the basis than accepted our summary of it.",
        references: [
            { number: 1, order: 1, title: "SharePoint content types and site columns", source: "SharePoint documentation — publishing metadata definitions from a hub" },
            { number: 2, order: 2, title: "Managed metadata and the term store", source: "SharePoint documentation — consistent programme and funder terminology" },
            { number: 3, order: 3, title: "Power Automate approval flows", source: "Power Automate documentation — routing and recording approvals" },
            { number: 4, order: 4, title: "Microsoft 365 nonprofit offers", source: "Microsoft nonprofit documentation — granted and discounted licensing eligibility" },
            { number: 5, order: 5, title: "Power BI for nonprofits", source: "Power BI documentation — reporting over list and library data" }
        ],
        referencesNote: "On these references: each entry names a Microsoft Learn article or documentation area by title, because deep links change while titles are stable. Searching the title on learn.microsoft.com will reach the current version. Where we have cited a figure or a product behaviour, it is Microsoft's statement rather than ours; where we have given a number of our own it is labelled as such in the text.",
        ctaText: "Tell us about one programme and its funder requirements, and we will show you what capturing that evidence at the point of delivery would look like using licensing you already hold."
    },
    {
        platform: "sharepoint",
        service: "modern-work-automation",
        industry: "small-mid-market",
        icon: "grid",
        pages: 10,
        title: "The cost of not finding things",
        description: "The cost is invisible because it is distributed: a few minutes per person per day looking for things, and nobody adds it up.",
        publishedAt: new Date("2026-01-04"),
        readTime: "11 min read",
        subtitle: "Why a copied file server structure costs a growing business an hour a week per person",
        inThisPaper: [
            "An abstract and four numbered findings",
            "Analysis across 3 sections",
            "A framework you can apply: Redesigning the estate",
            "Implications separated by role",
            "5 references to Microsoft documentation"
        ],
        abstractParagraphs: [
            "Most growing businesses migrated a file server into SharePoint, kept the folder structure, and inherited a decade of decisions made for a different tool.",
            "This paper argues that the resulting cost is real, distributed and therefore never counted; that the new-starter test is the cheapest way to make it visible; and that the structural fix is a redesign around how teams actually work rather than a better search configuration."
        ],
        findings: [
            { number: 1, order: 1, title: "A copied file server structure encodes decisions made for a different tool", description: "Deep folder nesting made sense when folders were the only organising mechanism. They are not any more." },
            { number: 2, order: 2, title: "The cost is distributed, which is why nobody counts it", description: "A few minutes per person per day is invisible individually and substantial across a hundred people." },
            { number: 3, order: 3, title: "The new-starter test makes the cost visible in twenty minutes", description: "Ask somebody who joined recently to find five common documents and time them. It makes the business case better than any assessment." },
            { number: 4, order: 4, title: "Metadata solves what folders structurally cannot", description: "Folders encode one hierarchy. Most business documents legitimately belong in several, which is why copies proliferate." }
        ],
        analysisBody: `<h2>What was inherited and why it does not fit</h2>
<p>A file server offered one organising mechanism: nested folders. Every structural decision made over a decade was made within that constraint, and the constraint no longer applies.</p>
<p>The consequences are recognisable in almost every migrated estate. Folder depth beyond four levels, where documents become genuinely unfindable. Multiple copies of the same document because it belongs in two places. Permissions set on individual files as the residue of one-off requests. And a naming convention that exists in a policy document and not in the libraries.</p>
<p>None of this was a mistake at the time. All of it is a cost now.</p>
<h2>Making the cost visible</h2>
<p>The new-starter test is the cheapest diagnostic available. Ask somebody who joined in the last three months to find five documents everybody uses, and time them.</p>
<p>Whatever they cannot find is where to start, and the exercise makes the business case more effectively than any structural review because it produces evidence rather than opinion.</p>
<p>The second measure worth taking is duplicate prevalence. Multiple copies of the same document mean multiple versions, and eventually a decision made from the wrong one — which is the expensive failure this whole exercise prevents.</p>
<ul>
<li>Time a new starter finding five common documents</li>
<li>Count duplicate copies of frequently used documents</li>
<li>Check folder depth: beyond four levels, findability degrades sharply</li>
<li>Look for file-level permissions, which are unmaintainable and usually accidental</li>
<li>Establish whether business documents live in team sites or in personal storage</li>
</ul>
<h2>Designing for how teams actually work</h2>
<p>Sites mapped to teams or functions rather than mirroring an old drive. Metadata where a document legitimately belongs in more than one place. Permissions at site or library level rather than on individual files. Retention applied so old content is disposed of rather than accumulating indefinitely.</p>
<p>And an owner. An information architecture without an accountable owner degrades continuously toward the practices of whoever creates the most content, and the degradation is invisible until onboarding takes a week.</p>
<p>The review cadence matters too. Businesses change shape, and a structure that fitted forty people rarely fits a hundred without revision.</p>`,
        frameworkLede: "Every paper in this series ends with a framework you can run internally. We would rather you used it and reached your own conclusion than took ours on trust.",
        frameworkName: "Redesigning the estate",
        frameworkDescription: "Five steps, starting with evidence rather than with structure.",
        frameworkStages: [
            { number: 1, order: 1, title: "Test", description: "Run the new-starter test. It produces the evidence and makes the case." },
            { number: 2, order: 2, title: "Map", description: "Sites to teams and functions as they work now, not as the file server was organised." },
            { number: 3, order: 3, title: "Tag", description: "Metadata where documents belong in more than one place. Folders encode one hierarchy." },
            { number: 4, order: 4, title: "Simplify", description: "Permissions at site or library level. File-level permissions are unmaintainable." },
            { number: 5, order: 5, title: "Own", description: "A named owner and a review cadence, or it degrades back within two years." }
        ],
        implicationsLede: "The same argument lands differently across an executive team. These are the three versions worth separating.",
        implications: [
            { order: 1, role: "For the managing director", text: "The new-starter test costs twenty minutes and produces the business case. Run it before commissioning any assessment." },
            { order: 2, role: "For operations", text: "The expensive failure is not a lost document. It is a found document at the wrong version, and duplicate prevalence is the leading indicator." },
            { order: 3, role: "For whoever administers Microsoft 365", text: "File-level permissions are the residue of one-off requests and they are unauditable. Consolidating them is unglamorous and it is the highest-value tidy-up available." }
        ],
        referencesLede: "Microsoft's own documentation for the product behaviour described above. We would rather you verified the basis than accepted our summary of it.",
        references: [
            { number: 1, order: 1, title: "SharePoint information architecture guidance", source: "SharePoint documentation — site and hub design principles" },
            { number: 2, order: 2, title: "Managed metadata and the term store", source: "SharePoint documentation — consistent terminology across sites" },
            { number: 3, order: 3, title: "Sharing and permissions in SharePoint", source: "SharePoint documentation — inheritance and level-appropriate permissions" },
            { number: 4, order: 4, title: "Retention policies and labels", source: "Microsoft Purview Data Lifecycle Management — disposing of content that has aged out" },
            { number: 5, order: 5, title: "Microsoft Search in SharePoint", source: "Microsoft Search documentation — how metadata affects findability" }
        ],
        referencesNote: "On these references: each entry names a Microsoft Learn article or documentation area by title, because deep links change while titles are stable. Searching the title on learn.microsoft.com will reach the current version. Where we have cited a figure or a product behaviour, it is Microsoft's statement rather than ours; where we have given a number of our own it is labelled as such in the text.",
        ctaText: "We will run the new-starter test with somebody who joined recently and give you the findings, which usually make the case for the work more effectively than any assessment we could write."
    },
    {
        platform: "sharepoint",
        service: "modern-work-automation",
        industry: "construction-field-services",
        icon: "grid",
        pages: 11,
        title: "The revision that should not have been used",
        description: "Everybody involved was diligent. The structure they were working within made the mistake available.",
        publishedAt: new Date("2025-12-07"),
        readTime: "12 min read",
        subtitle: "Why the expensive document failure in construction is a found file rather than a lost one",
        inThisPaper: [
            "An abstract and four numbered findings",
            "Analysis across 3 sections",
            "A framework you can apply: Structuring revision control",
            "Implications separated by role",
            "5 references to Microsoft documentation"
        ],
        abstractParagraphs: [
            "The most expensive document management failure in construction is not a lost file. It is a found file — the wrong revision, opened confidently, built from.",
            "This paper argues that filename-encoded revision is a predictable consequence of a tool that did not carry versioning natively, examines why the site copy and the office copy are structurally different artefacts, and sets out what an issue register is worth when a variation claim turns on who had what."
        ],
        findings: [
            { number: 1, order: 1, title: "The site copy does not know it has been superseded", description: "A printed, emailed or downloaded drawing is a static artefact. The office library knows about the new revision; the copy in the van does not." },
            { number: 2, order: 2, title: "Filenames encoding revision are a symptom, not a discipline failure", description: "People encode version where the tool provides somewhere to put it. Moving revision into metadata removes the whole class of problem." },
            { number: 3, order: 3, title: "The default view is the control that matters most", description: "Filtering the default to current issued revisions removes most of the wrong-revision risk for very little effort." },
            { number: 4, order: 4, title: "The issue register is unglamorous and occasionally decisive", description: "When a variation claim turns on whether a subcontractor had current information, a timestamped distribution record settles it in minutes." }
        ],
        analysisBody: `<h2>Why revision control breaks on site</h2>
<p>The office has a document library with version history. The site has whatever was printed, emailed or downloaded, and that copy does not know it has been superseded.</p>
<p>Add a subcontractor working from a set issued three weeks ago and the failure is not merely possible; it is scheduled.</p>
<p>Distributing links rather than attachments is the structural fix, because a link always resolves to the current revision while an attachment is frozen at the moment it was sent. This is a small change in practice and a large one in consequence.</p>
<h2>What a working structure provides</h2>
<p>One place a current drawing lives, reachable in seconds on a phone. Revision held as metadata rather than in the filename. Major versions mapping to issued revisions, with all of them retained because superseded revisions are legally significant.</p>
<p>A default view filtered to current issued revisions, so what somebody sees by default is what they should be building from. Superseded revisions remain accessible in a clearly labelled separate view.</p>
<p>And an issue register recording which revision went to whom and when, populated automatically when a document's status changes rather than maintained by hand — because a manually maintained register is complete until somebody is busy.</p>
<ul>
<li>Revision as metadata, validated against your numbering convention</li>
<li>Major versions mapping to issued revisions, all retained</li>
<li>A default view filtered to current issued revisions only</li>
<li>An issue register populated automatically on status change</li>
<li>Distribution by link rather than attachment</li>
</ul>
<h2>The dispute dimension</h2>
<p>Issue records are unglamorous and occasionally decisive.</p>
<p>When a variation claim turns on whether a subcontractor was working from current information, a timestamped record of what was issued to whom settles it in minutes. Without one it becomes a matter of recollection, and recollection tends to favour whoever is more confident rather than whoever is right.</p>
<p>For a business where variation disputes are a routine commercial reality, this is a control with a directly quantifiable value, and it costs a Power Automate flow.</p>`,
        frameworkLede: "Every paper in this series ends with a framework you can run internally. We would rather you used it and reached your own conclusion than took ours on trust.",
        frameworkName: "Structuring revision control",
        frameworkDescription: "Five decisions. The third is the cheapest and most effective.",
        frameworkStages: [
            { number: 1, order: 1, title: "Meta", description: "Revision as metadata, not in the filename. Filenames are not version control." },
            { number: 2, order: 2, title: "Version", description: "Major versions mapped to issued revisions, with all majors retained." },
            { number: 3, order: 3, title: "Default", description: "The default view filtered to current issued revisions only." },
            { number: 4, order: 4, title: "Register", description: "Issue records populated automatically on status change, not by hand." },
            { number: 5, order: 5, title: "Link", description: "Distribute links rather than attachments, so recipients cannot hold a stale copy." }
        ],
        implicationsLede: "The same argument lands differently across an executive team. These are the three versions worth separating.",
        implications: [
            { order: 1, role: "For the commercial director", text: "The issue register has a directly quantifiable value in variation disputes, and it is the cheapest control on this list to implement." },
            { order: 2, role: "For the document controller", text: "Moving revision into metadata converts 'show me the current issue set' from an act of interpretation into a query." },
            { order: 3, role: "For site management", text: "Test the mobile experience on site with real conditions. A structure that works on a desktop can be unusable with gloves in sunlight." }
        ],
        referencesLede: "Microsoft's own documentation for the product behaviour described above. We would rather you verified the basis than accepted our summary of it.",
        references: [
            { number: 1, order: 1, title: "SharePoint content types and site columns", source: "SharePoint documentation — defining and publishing metadata schemas" },
            { number: 2, order: 2, title: "Versioning in SharePoint libraries", source: "SharePoint documentation — major and minor versions and retention limits" },
            { number: 3, order: 3, title: "Library views and filtering", source: "SharePoint documentation — default views and grouped display" },
            { number: 4, order: 4, title: "Power Automate SharePoint triggers", source: "Power Automate documentation — flows on item or status change" },
            { number: 5, order: 5, title: "SharePoint mobile app", source: "SharePoint documentation — offline access and content caching" }
        ],
        referencesNote: "On these references: each entry names a Microsoft Learn article or documentation area by title, because deep links change while titles are stable. Searching the title on learn.microsoft.com will reach the current version. Where we have cited a figure or a product behaviour, it is Microsoft's statement rather than ours; where we have given a number of our own it is labelled as such in the text.",
        ctaText: "We will restructure one live project's document library as a working demonstration, including the mobile experience under real site conditions."
    },

    // ===== POWER BI PAPERS =====
    {
        platform: "power-bi",
        service: "data-ai-integration",
        industry: "professional-services",
        icon: "chart",
        pages: 10,
        title: "The economics of one point of utilization",
        description: "Before evaluating any system, do this calculation. It usually settles the investment question faster than a vendor business case.",
        publishedAt: new Date("2026-06-07"),
        readTime: "11 min read",
        subtitle: "A short paper on the arithmetic most professional services firms never do",
        inThisPaper: [
            "An abstract and four numbered findings",
            "Analysis across 3 sections",
            "A framework you can apply: Making utilization usable",
            "Implications separated by role",
            "5 references to Microsoft documentation"
        ],
        abstractParagraphs: [
            "Take your billable headcount. Multiply by standard annual hours. Take one per cent. Multiply by your blended rate. That number is what a single point of utilization is worth annually, and in most firms it exceeds the entire cost of the systems being debated.",
            "This paper examines why firms rarely do that calculation, why the resulting number is usually distrusted, and what has to be true about definitions and capture before utilization can be used in an argument rather than reported and discounted."
        ],
        findings: [
            { number: 1, order: 1, title: "The number is large and almost nobody calculates it", description: "Ninety seconds of arithmetic reframes an investment debate from a cost comparison into a comparison against a value already established." },
            { number: 2, order: 2, title: "Utilization is distrusted because it is defined inconsistently", description: "Different practices define billable, non-billable and available differently, so the firm-wide figure means nothing and is quietly discounted by everybody who reads it." },
            { number: 3, order: 3, title: "The definition conversation is the project", description: "Fixing the model without fixing the definition produces a precise measurement of an approximation." },
            { number: 4, order: 4, title: "Capture quality bounds everything downstream", description: "Time reconstructed on Friday is a guess. Utilization, realization, project margin and revenue recognition are all built on whether two minutes a day works." }
        ],
        analysisBody: `<h2>Why the calculation is not done</h2>
<p>Partly because utilization is understood as an operational metric rather than a financial one, so it sits with operations rather than in the investment case.</p>
<p>Mostly because a number nobody trusts cannot be used in an argument. And utilization genuinely is untrustworthy in most firms: definitions vary by practice, time is recorded late and approximately, and non-billable work is categorised inconsistently. The figure is reported monthly and discounted by everybody who reads it.</p>
<p>The result is that a metric worth a great deal is excluded from exactly the decisions it should inform.</p>
<h2>What has to be settled first</h2>
<p>The denominator is the argument. Contracted hours, standard hours, or available hours net of leave — each produces a materially different number and each is defensible. What is not defensible is different practices using different denominators and comparing the results.</p>
<p>The activity classification matters almost as much. Billable, non-billable client work, business development, internal project, training and leave should sit in a hierarchy with defined parents, because a flat list will be classified inconsistently and new activity types will fall outside every measure.</p>
<p>Neither of these is a technology decision. Both are the least popular meeting in the engagement and the one that determines whether it succeeds.</p>
<ul>
<li>One definition of billable, non-billable and available, agreed across every practice</li>
<li>One denominator, firm-wide, with no practice-specific exceptions</li>
<li>Explicit treatment of business development, training and internal work</li>
<li>An activity hierarchy with an Unclassified member that is surfaced rather than hidden</li>
<li>The definition published alongside every report that uses the number</li>
</ul>
<h2>Then make the data worth reporting on</h2>
<p>Time captured at the point of work rather than reconstructed on Friday. Two minutes a day, from Teams, Outlook or a phone.</p>
<p>This single dependency bounds everything downstream, and a firm that fixes the definition but not the capture has built a precise measurement of an approximation.</p>
<p>Power BI's role here is a governed semantic model where the definition lives once and every report inherits it, with row-level security so practice leaders see their own book without exports circulating, and drill-through from the firm-wide figure to the individual time entry. The 2026 direction — Copilot answering questions directly against the semantic model — raises the value of a well-defined model and the risk of a poorly defined one.</p>`,
        frameworkLede: "Every paper in this series ends with a framework you can run internally. We would rather you used it and reached your own conclusion than took ours on trust.",
        frameworkName: "Making utilization usable",
        frameworkDescription: "Five steps, in order. The first is free and the second is the hard one.",
        frameworkStages: [
            { number: 1, order: 1, title: "Calculate", description: "One point of utilization at your headcount and blended rate. Ninety seconds." },
            { number: 2, order: 2, title: "Define", description: "One definition, one denominator, agreed across every practice and written down." },
            { number: 3, order: 3, title: "Capture", description: "Time recorded at the point of work. Everything downstream depends on this." },
            { number: 4, order: 4, title: "Model", description: "Definition held once in a governed semantic model, inherited by every report." },
            { number: 5, order: 5, title: "Publish", description: "The definition alongside every report, with drill-through to the time entry." }
        ],
        implicationsLede: "The same argument lands differently across an executive team. These are the three versions worth separating.",
        implications: [
            { order: 1, role: "For the managing partner", text: "Do the arithmetic before the vendor meeting. It changes the question from whether the system is worth its price to whether the change would move a number you have established is worth a great deal." },
            { order: 2, role: "For the finance director", text: "Resist practice-specific denominators. Each request is individually reasonable and collectively they destroy the firm-wide number." },
            { order: 3, role: "For practice leaders", text: "The measurement will be uncomfortable in the first period. That is the point, and it is also why the definition must be agreed before the number is produced rather than after." }
        ],
        referencesLede: "Microsoft's own documentation for the product behaviour described above. We would rather you verified the basis than accepted our summary of it.",
        references: [
            { number: 1, order: 1, title: "Power BI semantic models", source: "Power BI documentation — model design, measures and descriptions" },
            { number: 2, order: 2, title: "Row-level security with Power BI", source: "Power BI documentation — dynamic security using USERPRINCIPALNAME" },
            { number: 3, order: 3, title: "Create date tables in Power BI Desktop", source: "Power BI documentation — marking a date table and fiscal calendars" },
            { number: 4, order: 4, title: "Copilot in Power BI", source: "Power BI documentation — capacity requirements and semantic model readiness" },
            { number: 5, order: 5, title: "Dynamics 365 Project Operations", source: "Project Operations documentation — time capture and resource utilization" }
        ],
        referencesNote: "On these references: each entry names a Microsoft Learn article or documentation area by title, because deep links change while titles are stable. Searching the title on learn.microsoft.com will reach the current version. Where we have cited a figure or a product behaviour, it is Microsoft's statement rather than ours; where we have given a number of our own it is labelled as such in the text.",
        ctaText: "We will run the calculation with your actual headcount and rates, and tell you honestly whether the gap is worth a project. Sometimes it is not."
    },
    {
        platform: "power-bi",
        service: "data-ai-integration",
        industry: "retail-distribution",
        icon: "chart",
        pages: 13,
        title: "Cost to serve and the customer portfolio",
        description: "Every distributor can rank customers by revenue and margin. Almost none can rank them by what it costs to serve them, which is the ranking commercial decisions should use.",
        publishedAt: new Date("2026-04-19"),
        readTime: "14 min read",
        subtitle: "Why distributors rank customers by the wrong number, and what a defensible alternative looks like",
        inThisPaper: [
            "An abstract and four numbered findings",
            "Analysis across 3 sections",
            "A framework you can apply: Building a model that gets used",
            "Implications separated by role",
            "5 references to Microsoft documentation"
        ],
        abstractParagraphs: [
            "Cost to serve is everything between the order and the cash that is not the cost of the goods: order handling, picking complexity, freight, returns, payment terms and account management time.",
            "This paper argues that the reason it is rarely calculated is not analytical difficulty but organizational — the data sits in five places and nobody has been asked to join it up — and that the model's value depends more on the commercial team accepting the allocation basis than on the sophistication of the allocation itself."
        ],
        findings: [
            { number: 1, order: 1, title: "A defensible approximation the commercial team trusts beats a precise model they dispute", description: "Activity drivers people can count and verify produce a ranking that changes behaviour. A sophisticated allocation nobody can follow produces an argument." },
            { number: 2, order: 2, title: "Freight is usually the largest differentiator and the most commonly omitted", description: "It is omitted because the data is awkward, and a model without it ranks customers wrongly and confidently." },
            { number: 3, order: 3, title: "Account management time is the least evenly distributed cost", description: "Even a crude tiering by account class beats a flat allocation, which systematically flatters the most demanding accounts." },
            { number: 4, order: 4, title: "The productive responses are commercial, not a firing list", description: "Ordering minimums, delivery consolidation, terms changes and self-service channels. Most expensive customers do not know they are expensive." }
        ],
        analysisBody: `<h2>What the model has to include</h2>
<p>Order handling, where small orders cost nearly as much to process as large ones. Picking and packing complexity including special handling. Freight, particularly where a customer requires split deliveries or expedited shipping. Returns and credits, which concentrate heavily in a small number of accounts. Payment terms and collection effort, which are a real cost of capital. And account management time, which is the hardest to allocate and frequently the largest.</p>
<p>The technical build is not the difficult part. Getting the commercial team to accept the allocation basis is.</p>
<ul>
<li>Order processing driven by order count or line count where entry effort varies</li>
<li>Picking and packing weighted for special handling and custom labelling</li>
<li>Freight at consignment level where invoiced, driver-based where not</li>
<li>Returns as line count plus a fixed handling cost per return event</li>
<li>Account management tiered by account class rather than allocated flat</li>
</ul>
<h2>Designing for acceptance</h2>
<p>Our advice is to be conservative and transparent. Use activity drivers people recognise — number of order lines, number of deliveries, number of returns — rather than a sophisticated model nobody can follow.</p>
<p>Publish the drivers alongside the result so anybody can see why an account scored as it did. An account manager who can see the reasoning will argue about the driver, which is a productive conversation. One who cannot will reject the number entirely, and rejection is difficult to reverse.</p>
<p>Then sense-check the extremes with people who know the accounts. The most and least profitable customers in the model should be recognisable to the commercial team; if they are not, something in the allocation is wrong and it is better to find that before publication.</p>
<h2>What the model usually reveals</h2>
<p>Two things, reliably. A group of accounts that look healthy on gross margin and consume disproportionate resource. And a group of small accounts that are quietly excellent because they order predictably and never call.</p>
<p>Neither is actionable in isolation. The value is that the commercial conversation shifts from 'grow revenue' to 'grow the right revenue', which is a different and considerably more useful discussion.</p>
<p>It is worth being explicit that the productive responses are rarely to exit customers. Ordering minimums, delivery consolidation, a change to payment terms, a self-service channel for routine orders, or a straightforward price adjustment with the reasoning explained. Most customers who are expensive to serve do not know they are, and a proportion will change behaviour when asked.</p>`,
        frameworkLede: "Every paper in this series ends with a framework you can run internally. We would rather you used it and reached your own conclusion than took ours on trust.",
        frameworkName: "Building a model that gets used",
        frameworkDescription: "Five stages. The first and last are commercial rather than technical.",
        frameworkStages: [
            { number: 1, order: 1, title: "Agree", description: "Cost pools and drivers agreed with commercial and operations before any engineering." },
            { number: 2, order: 2, title: "Include", description: "Freight and returns, even where the data is awkward. Omitting them ranks customers wrongly." },
            { number: 3, order: 3, title: "Reconcile", description: "Total pooled cost in equals total allocated out. A non-zero residual is a finding." },
            { number: 4, order: 4, title: "Explain", description: "Publish drivers alongside results so an account manager can see the reasoning." },
            { number: 5, order: 5, title: "Sense-check", description: "Walk the extremes with people who know the accounts, before publication." }
        ],
        implicationsLede: "The same argument lands differently across an executive team. These are the three versions worth separating.",
        implications: [
            { order: 1, role: "For the commercial director", text: "This changes which customers you want, which is a strategy conversation rather than a reporting one. Expect it to be uncomfortable in the first quarter." },
            { order: 2, role: "For the finance director", text: "The reconciliation to the ledger is what makes the model credible. Build it as a visible measure rather than a validation step." },
            { order: 3, role: "For the CIO", text: "This is a good first governed semantic model, because the definitions are contested and the value of settling them is obvious to everybody." }
        ],
        referencesLede: "Microsoft's own documentation for the product behaviour described above. We would rather you verified the basis than accepted our summary of it.",
        references: [
            { number: 1, order: 1, title: "Power BI semantic models", source: "Power BI documentation — model design, relationships and measures" },
            { number: 2, order: 2, title: "Row-level security with Power BI", source: "Power BI documentation — restricting account managers to their own book" },
            { number: 3, order: 3, title: "Direct Lake overview", source: "Power BI documentation — reading current data without a refresh window" },
            { number: 4, order: 4, title: "What is OneLake?", source: "Microsoft Fabric documentation — unifying order, warehouse, freight and returns sources" },
            { number: 5, order: 5, title: "Dynamics 365 Business Central warehouse management", source: "Business Central documentation — the activity data behind picking drivers" }
        ],
        referencesNote: "On these references: each entry names a Microsoft Learn article or documentation area by title, because deep links change while titles are stable. Searching the title on learn.microsoft.com will reach the current version. Where we have cited a figure or a product behaviour, it is Microsoft's statement rather than ours; where we have given a number of our own it is labelled as such in the text.",
        ctaText: "We will build a cost-to-serve model against one customer segment using data you already have, and walk your commercial team through the extremes before anything is published."
    },
    {
        platform: "power-bi",
        service: "data-ai-integration",
        industry: "construction-field-services",
        icon: "chart",
        pages: 12,
        title: "Project margin visibility and the timing problem",
        description: "Contracting margin is not lost at close-out. It is lost during delivery and discovered at close-out, which is a timing problem rather than a reporting one.",
        publishedAt: new Date("2026-03-22"),
        readTime: "13 min read",
        subtitle: "Why contractors discover margin at close-out and what moving that discovery forward is worth",
        inThisPaper: [
            "An abstract and four numbered findings",
            "Analysis across 3 sections",
            "A framework you can apply: Closing the timing gap",
            "Implications separated by role",
            "5 references to Microsoft documentation"
        ],
        abstractParagraphs: [
            "A contractor can tell you precisely what a completed job earned. Ask about the job running right now and the answer is a feeling.",
            "This paper argues that the gap is a four-input timing problem — labour, material, equipment and subcontractors each arriving late for different reasons — and that closing it is worth more than any improvement in reporting accuracy, because it converts information into something somebody can still act on."
        ],
        findings: [
            { number: 1, order: 1, title: "Four inputs arrive late for four different reasons", description: "Labour on weekly tickets, material at invoice, equipment at period end, subcontractor applications whenever they arrive. Each needs its own fix." },
            { number: 2, order: 2, title: "Weekly visibility beats accurate monthly reporting", description: "A job drifting at twenty per cent complete can be recovered by a conversation. The same job discovered at ninety per cent can only be absorbed." },
            { number: 3, order: 3, title: "Purchase commitment closes the largest single gap", description: "Cost appearing at order rather than at invoice removes weeks of lag, and it requires a purchasing process change rather than a system one." },
            { number: 4, order: 4, title: "Uncaptured change orders erase the benefit of everything else", description: "Variations performed before they are priced are the largest recoverable leak in most contracting businesses, and it is a process problem." }
        ],
        analysisBody: `<h2>Why the lag exists</h2>
<p>Labour tickets arrive on paper at the end of the week. Material invoices arrive from suppliers on their own schedule, sometimes a month later. Equipment charges are allocated at period end. Subcontractor applications arrive when the subcontractor gets round to it.</p>
<p>By the time all four have landed in the same place, the job is finished. Nothing in that chain is anyone's fault, and collectively it means the office learns about a problem weeks after the site knew.</p>
<p>This is why exhorting the commercial team to report faster produces nothing. The information does not exist yet.</p>
<h2>What closing it changes</h2>
<p>Weekly job cost against budget, with a projected final position that updates as costs land. No new insight — just earlier.</p>
<p>Earlier is transformative in this sector because the response options change with time remaining. A job drifting at twenty per cent complete can be addressed through a conversation with the client, a change to sequencing, or a subcontractor discussion. The same drift discovered at ninety per cent can only be absorbed.</p>
<p>The reporting itself is straightforward once the inputs arrive on time. That ordering matters: organizations that build the reporting first end up with a precise weekly view of incomplete data.</p>
<ul>
<li>Labour captured at the point of work on a mobile device, not on a weekly paper ticket</li>
<li>Purchase orders committed against the job so material appears at order rather than invoice</li>
<li>Equipment allocated on a schedule the system applies automatically</li>
<li>Subcontractor applications with a defined cut-off inside the reporting cycle</li>
<li>A projected final cost published weekly to the person who can act on it</li>
</ul>
<h2>The change order discipline</h2>
<p>Everything above is undermined if variations are performed before they are priced.</p>
<p>In most contracting businesses this is the single largest recoverable leak, and it is a process problem rather than a commercial one. Capture the variation on site at the moment the client asks, price it against the contract, get approval before work starts.</p>
<p>Crews resist this less than owners expect. What they resist is a paper process that takes fifteen minutes at the point when a client is standing in front of them asking for something. A mobile capture that takes ninety seconds is accepted readily, and the difference between those two experiences determines whether the discipline holds.</p>`,
        frameworkLede: "Every paper in this series ends with a framework you can run internally. We would rather you used it and reached your own conclusion than took ours on trust.",
        frameworkName: "Closing the timing gap",
        frameworkDescription: "Five steps, in the order that produces the largest movement first.",
        frameworkStages: [
            { number: 1, order: 1, title: "Capture", description: "Labour at the point of work. The single largest timing gap and the one with the best return." },
            { number: 2, order: 2, title: "Commit", description: "Purchase orders coded to the job at order, which requires a purchasing process change." },
            { number: 3, order: 3, title: "Schedule", description: "Equipment allocation applied automatically rather than at period end." },
            { number: 4, order: 4, title: "Cut off", description: "A subcontractor application deadline inside the reporting cycle, agreed commercially." },
            { number: 5, order: 5, title: "Protect", description: "Change orders captured, priced and approved on site before work begins." }
        ],
        implicationsLede: "The same argument lands differently across an executive team. These are the three versions worth separating.",
        implications: [
            { order: 1, role: "For the commercial director", text: "The projected final position is the number that matters, and it should reach contracts managers rather than only finance. Finance can describe the drift; only the site can change it." },
            { order: 2, role: "For the finance director", text: "Standardising the cost code structure across jobs is what makes cross-job analysis and better estimating possible. Job-specific structures prevent both permanently." },
            { order: 3, role: "For operations", text: "The change order discipline is where the recoverable value is. Make the capture take ninety seconds and it will happen." }
        ],
        referencesLede: "Microsoft's own documentation for the product behaviour described above. We would rather you verified the basis than accepted our summary of it.",
        references: [
            { number: 1, order: 1, title: "Dynamics 365 Business Central project management", source: "Business Central documentation — jobs, tasks and planning lines" },
            { number: 2, order: 2, title: "Job WIP calculation methods", source: "Business Central documentation — recognition methods and their accounting treatment" },
            { number: 3, order: 3, title: "Power BI semantic models", source: "Power BI documentation — model design and measure definitions" },
            { number: 4, order: 4, title: "Row-level security with Power BI", source: "Power BI documentation — restricting contracts managers to their own jobs" },
            { number: 5, order: 5, title: "Power Apps mobile scenarios", source: "Power Apps documentation — offline-capable field data capture" }
        ],
        referencesNote: "On these references: each entry names a Microsoft Learn article or documentation area by title, because deep links change while titles are stable. Searching the title on learn.microsoft.com will reach the current version. Where we have cited a figure or a product behaviour, it is Microsoft's statement rather than ours; where we have given a number of our own it is labelled as such in the text.",
        ctaText: "Pick a job type and give us your cost code structure, and we will demonstrate weekly job costing with committed cost and a projected final position against it."
    },
    {
        platform: "power-bi",
        service: "data-ai-integration",
        industry: "nonprofits-associations",
        icon: "chart",
        pages: 11,
        title: "Transparency and the funding relationship",
        description: "Publishing a spending file satisfies an obligation. It does not make spending legible, and legibility is what actually builds funder confidence.",
        publishedAt: new Date("2026-01-18"),
        readTime: "12 min read",
        subtitle: "Why publishing more data does not build trust, and what does",
        inThisPaper: [
            "An abstract and four numbered findings",
            "Analysis across 3 sections",
            "A framework you can apply: Building reporting that survives its author",
            "Implications separated by role",
            "5 references to Microsoft documentation"
        ],
        abstractParagraphs: [
            "Nonprofits are asked for transparency and respond by publishing more data. Funders, trustees and the public then ask questions the published data technically answers and nobody can extract.",
            "This paper argues that legibility rather than volume is what builds confidence, that three audiences need three different views over one governed model, and that the most reliable indicator of a working reporting capability is whether a second person can maintain it."
        ],
        findings: [
            { number: 1, order: 1, title: "Volume and legibility are different things and only one builds trust", description: "Legible means somebody without technical skill can answer a reasonable question in under a minute." },
            { number: 2, order: 2, title: "Three audiences need three views, not one compromise", description: "Trustees need trend and comparison; staff need operational detail; funders need evidence against conditions." },
            { number: 3, order: 3, title: "Model logic outlives report logic, which matters most for a small team", description: "A calculation in the model is inherited everywhere. One in a report exists only there and cannot be changed by anybody except its author." },
            { number: 4, order: 4, title: "The maintainability test is the honest measure of the capability", description: "If a second person cannot make a routine change from the documentation, you have a dependency rather than a capability." }
        ],
        analysisBody: `<h2>What legibility requires</h2>
<p>That somebody without technical skill can answer a reasonable question quickly. How much did we spend on this programme this year. How does that compare to last year. Where did the increase come from.</p>
<p>None of those require sophisticated analytics. They require expenditure coded to programme and funding source at entry, consistent definitions agreed across the organization, and an interface designed for somebody who does not work in finance.</p>
<p>The first of those is a finance process change rather than a reporting project, and organizations that skip it and attempt to compensate in report logic produce something only its author can maintain.</p>
<h2>Three audiences, one model</h2>
<p>Trustees need trend, comparison against budget, and plain-language labels. Programme staff need operational detail with drill-through. Funders need evidence against specific grant conditions with the underlying records reachable.</p>
<p>Building three reports over one shared semantic model costs very little more than building one, and it serves all three considerably better than a compromise. Publishing through an app with per-audience permissions handles the access side without maintaining separate workspaces.</p>
<p>Every shared calculation belongs in the model. For an organization with one analyst, this is the decision that determines whether the estate is maintainable in two years.</p>
<ul>
<li>Expenditure coded to programme and funding source at entry, not reallocated</li>
<li>All shared calculations in the semantic model rather than in individual reports</li>
<li>Three reports for three audiences over one shared model</li>
<li>One app with per-audience permissions rather than three workspaces</li>
<li>Denominators and response rates displayed automatically on outcome figures</li>
</ul>
<h2>The maintainability test</h2>
<p>Ask a second person to make a routine change using only the documentation. Whatever they cannot do is what needs writing down.</p>
<p>This single test is the most revealing check available on a small-team reporting capability, and it is almost never run. Organizations discover the answer when the analyst leaves, which is the worst possible moment and entirely predictable.</p>
<p>Documentation should cover definitions, sources, refresh schedule and known limitations, and it should live where the next person will find it rather than on the current one's drive.</p>`,
        frameworkLede: "Every paper in this series ends with a framework you can run internally. We would rather you used it and reached your own conclusion than took ours on trust.",
        frameworkName: "Building reporting that survives its author",
        frameworkDescription: "Five steps for a one-analyst capability.",
        frameworkStages: [
            { number: 1, order: 1, title: "Code", description: "Expenditure to programme and funding source at entry. This is a finance change, not a reporting one." },
            { number: 2, order: 2, title: "Model", description: "Every shared calculation in the semantic model. No report-level measures in the first release." },
            { number: 3, order: 3, title: "Split", description: "Three views for trustees, staff and funders over one shared model." },
            { number: 4, order: 4, title: "Document", description: "Definitions, sources, refresh and limitations, stored where a successor will find them." },
            { number: 5, order: 5, title: "Test", description: "A second person makes a routine change from the documentation alone." }
        ],
        implicationsLede: "The same argument lands differently across an executive team. These are the three versions worth separating.",
        implications: [
            { order: 1, role: "For the executive director", text: "The trust benefit comes from legibility, not volume. Publishing more data without making it answerable produces compliance rather than confidence." },
            { order: 2, role: "For trustees", text: "Ask whether a second person could maintain the reporting. It is the question that surfaces a key-person dependency before it becomes a problem." },
            { order: 3, role: "For the analyst", text: "Resist report-level measures. They are quick and they are how an estate becomes something only you can change, which is not a position that serves you either." }
        ],
        referencesLede: "Microsoft's own documentation for the product behaviour described above. We would rather you verified the basis than accepted our summary of it.",
        references: [
            { number: 1, order: 1, title: "Power BI semantic models", source: "Power BI documentation — model design, measures and descriptions" },
            { number: 2, order: 2, title: "Power BI apps and audiences", source: "Power BI documentation — publishing curated content to different groups" },
            { number: 3, order: 3, title: "Row-level security with Power BI", source: "Power BI documentation — restricting data by role" },
            { number: 4, order: 4, title: "Create date tables in Power BI Desktop", source: "Power BI documentation — fiscal calendars and time intelligence" },
            { number: 5, order: 5, title: "Power BI usage metrics", source: "Power BI documentation — identifying reports nobody opens" }
        ],
        referencesNote: "On these references: each entry names a Microsoft Learn article or documentation area by title, because deep links change while titles are stable. Searching the title on learn.microsoft.com will reach the current version. Where we have cited a figure or a product behaviour, it is Microsoft's statement rather than ours; where we have given a number of our own it is labelled as such in the text.",
        ctaText: "Pick one question your funders or trustees ask that currently takes an afternoon to answer, and we will build the model and the three views for it against your structure."
    },

    // ===== MICROSOFT INTUNE PAPERS =====
    {
        platform: "intune",
        service: "managed-it-security",
        industry: "education",
        icon: "device",
        pages: 14,
        title: "The endpoint estate in a federated institution",
        description: "Institutions typically have less endpoint coverage than they believe, concentrated in devices owned by departments rather than by central IT.",
        publishedAt: new Date("2026-05-31"),
        readTime: "15 min read",
        subtitle: "Why university device management is a governance problem wearing technical clothing",
        inThisPaper: [
            "An abstract and four numbered findings",
            "Analysis across 3 sections",
            "A framework you can apply: Federated endpoint governance",
            "Implications separated by role",
            "5 references to Microsoft documentation"
        ],
        abstractParagraphs: [
            "University estates are federated by nature. Departments buy equipment, research groups run specialist systems, and central IT has authority over some of it and influence over the rest.",
            "This paper argues that the resulting coverage gap is a governance problem rather than a technical one, that the uncovered devices are disproportionately the interesting ones, and that the productive response is relationship-led rather than mandate-led. It also sets out why a single endpoint configuration across staff, shared and personal devices reliably satisfies nobody."
        ],
        findings: [
            { number: 1, order: 1, title: "Coverage is lower than institutions believe, and the gap is knowable", description: "Device discovery from onboarded endpoints routinely finds systems nobody had recorded. The number is generally larger than expected and the finding is the point." },
            { number: 2, order: 2, title: "Three device populations need three configurations", description: "One policy across staff, shared labs and personal devices is too restrictive for academics and too permissive for teaching spaces." },
            { number: 3, order: 3, title: "Research computing needs exclusions, and they must be scoped", description: "Specialist software and long-running computation interact badly with real-time scanning. Exclusions are legitimate; global exclusions are not." },
            { number: 4, order: 4, title: "Coverage drifts continuously, so it needs a standing metric", description: "Departments keep buying equipment. Without a monthly measure the position degrades within a year regardless of how good the initial deployment was." }
        ],
        analysisBody: `<h2>Why the federated model produces the gap</h2>
<p>Departments and research groups purchase equipment with their own budgets for their own reasons, and both practices are defensible academically. The consequence is an endpoint estate whose true size central IT does not know.</p>
<p>The devices outside the managed estate are not randomly distributed. They cluster in research computing, in departments with technical staff of their own, and in specialist teaching facilities — which is to say, in the places holding the most valuable and most sensitive material.</p>
<p>Mandating central control rarely works and frequently damages a relationship the institution needs for the rest of the programme. The productive approach establishes the position first, presents it as a finding rather than a failure, and negotiates coverage department by department.</p>
<h2>Designing for three populations</h2>
<p>Staff devices are assigned, trusted and managed like a corporate estate with conditional access and compliance policy. Shared student devices need fast user switching, no persistent local state and aggressive cleanup between sessions. Personal devices reaching institutional data should be handled with application protection rather than device management, because enrolment is a fight the institution does not need to have.</p>
<p>Assessment configuration is a fourth case and the highest-stakes one. A policy that half-applies on the morning of an exam is a genuine crisis, and the protections are procedural rather than technical: deploy well ahead, verify on the actual hardware in the actual room, and never let a policy apply for the first time on the day.</p>
<ul>
<li>Staff: assigned, Entra joined, conditional access and compliance policy applied</li>
<li>Shared student: shared device mode, cleanup between sessions, redirected storage</li>
<li>Personal: application protection without enrolment, with selective wipe</li>
<li>Assessment: separate profile, device-scoped, deployed and verified ahead of the window</li>
<li>Research: semi-automated response with scoped exclusions and a named risk owner</li>
</ul>
<h2>Provisioning as the operational constraint</h2>
<p>A large institution replaces or rebuilds devices continuously, and doing it by hand consumes a skilled team whose time has better uses.</p>
<p>Autopilot registration handled at the point of purchase means devices arrive ready, including loan equipment issued directly to students. This is a purchasing process change as much as a technical one, and it is the single largest operational saving available in most institutional estates.</p>
<p>The test is straightforward. Time a replacement from unboxing to a working, compliant device. If the answer is measured in days, provisioning is the constraint rather than the budget.</p>`,
        frameworkLede: "Every paper in this series ends with a framework you can run internally. We would rather you used it and reached your own conclusion than took ours on trust.",
        frameworkName: "Federated endpoint governance",
        frameworkDescription: "Five stages. The first is diagnostic and the last is what keeps it true.",
        frameworkStages: [
            { number: 1, order: 1, title: "Discover", description: "Run device discovery for a fortnight and reconcile against inventory. Present the gap as a finding." },
            { number: 2, order: 2, title: "Segment", description: "Create device groups before onboarding so devices land in the right policy on arrival." },
            { number: 3, order: 3, title: "Negotiate", description: "Approach departmental and research owners with the position, not with a mandate." },
            { number: 4, order: 4, title: "Provision", description: "Move registration to the point of purchase. Time a replacement end to end as a baseline." },
            { number: 5, order: 5, title: "Measure", description: "Report coverage monthly including the discovered-but-not-onboarded count." }
        ],
        implicationsLede: "The same argument lands differently across an executive team. These are the three versions worth separating.",
        implications: [
            { order: 1, role: "For the CIO", text: "Lead with the discovery number. It converts an argument about central control into a shared problem, and it is considerably more persuasive than a policy position." },
            { order: 2, role: "For research computing leadership", text: "Exclusions scoped to your device group with a named owner are a reasonable accommodation. A global exclusion is not, and it is what happens if the conversation does not take place." },
            { order: 3, role: "For the CISO", text: "Coverage is not a project outcome. Without a standing monthly metric it degrades continuously and the degradation is invisible until an incident." }
        ],
        referencesLede: "Microsoft's own documentation for the product behaviour described above. We would rather you verified the basis than accepted our summary of it.",
        references: [
            { number: 1, order: 1, title: "Device discovery in Microsoft Defender for Endpoint", source: "Microsoft Defender documentation — finding unmanaged devices from onboarded ones" },
            { number: 2, order: 2, title: "Windows Autopilot documentation", source: "Microsoft Intune — deployment profiles, registration and the Enrollment Status Page" },
            { number: 3, order: 3, title: "Shared device mode and shared PC configuration", source: "Microsoft Intune documentation — multi-user device configuration" },
            { number: 4, order: 4, title: "App protection policies", source: "Microsoft Intune documentation — protecting data on unenrolled personal devices" },
            { number: 5, order: 5, title: "Take a Test and assessment configuration", source: "Microsoft Education documentation — locked-down assessment on Windows devices" }
        ],
        referencesNote: "On these references: each entry names a Microsoft Learn article or documentation area by title, because deep links change while titles are stable. Searching the title on learn.microsoft.com will reach the current version. Where we have cited a figure or a product behaviour, it is Microsoft's statement rather than ours; where we have given a number of our own it is labelled as such in the text.",
        ctaText: "We will run device discovery and produce a coverage map with the gap quantified, which is usually the fastest way to turn an internal argument about control into a shared plan."
    },
    {
        platform: "intune",
        service: "managed-it-security",
        industry: "construction-field-services",
        icon: "device",
        pages: 12,
        title: "The field workforce technology gap",
        description: "A control that depends on crews behaving differently from how they demonstrably behave is not a control.",
        publishedAt: new Date("2026-03-01"),
        readTime: "13 min read",
        subtitle: "Why endpoint policy designed in an office is routed around within a fortnight",
        inThisPaper: [
            "An abstract and four numbered findings",
            "Analysis across 3 sections",
            "A framework you can apply: Designing for the field",
            "Implications separated by role",
            "5 references to Microsoft documentation"
        ],
        abstractParagraphs: [
            "Field devices fail differently from desk devices. They are used with gloves in sunlight, they spend hours with no connectivity, they are left in vehicles overnight, and they are operated by somebody who wants to be back in the truck.",
            "This paper examines the four office assumptions that break in the field, argues that the resulting workarounds are invisible and therefore dangerous, and sets out what a configuration designed for the actual conditions looks like."
        ],
        findings: [
            { number: 1, order: 1, title: "Four office assumptions break, and each produces a workaround", description: "Connectivity, patience, physical security and support hours. Each is reasonable in a corporate estate and wrong in the field." },
            { number: 2, order: 2, title: "Workarounds are invisible, which is what makes them a risk", description: "A policy nobody follows produces no error message. It produces a crew that has found another way to do the job." },
            { number: 3, order: 3, title: "Provisioning is usually the operational constraint rather than the budget", description: "Time a replacement from sealed box to productive. Days means the process is the problem." },
            { number: 4, order: 4, title: "Support hours mismatched to crew hours is a daily exposure window", description: "Crews start early. A service desk starting at nine is three hours a day of unmanaged risk, every day." }
        ],
        analysisBody: `<h2>The four assumptions</h2>
<p>Connectivity. Basements, plant rooms and rural sites have none, and policy that requires a connection to apply will not apply.</p>
<p>Patience. A compliance check adding ninety seconds to sign-in will be worked around within a fortnight, and the workaround will not be reported.</p>
<p>Physical security. Devices are left in vehicles overnight, which changes the encryption and remote wipe requirement materially.</p>
<p>Support hours. Crews start before the office does, so a device failing at six in the morning stops a day of billable work with nobody available to help.</p>
<ul>
<li>Compliance grace periods sized to real connectivity gaps rather than set to zero</li>
<li>Policy evaluation that tolerates delay rather than requiring immediate check-in</li>
<li>Encryption verified continuously and remote wipe tested rather than assumed</li>
<li>Provisioning that ships a configured device directly to a technician</li>
<li>Support coverage matched to crew start times rather than to office hours</li>
</ul>
<h2>Why the workaround is the risk</h2>
<p>A policy that blocks a technician mid-job does not produce a compliance failure that anybody sees. It produces a crew that finds another way — a personal device, a photograph sent by message, a form completed at home on an unmanaged laptop.</p>
<p>The organization's compliance reporting looks fine, because the managed devices are compliant. The work has simply moved somewhere the reporting does not reach.</p>
<p>This is why we insist on piloting with a real crew including the most sceptical technician. What they find is what would have killed the rollout, and it is information that does not exist in any dashboard.</p>
<h2>Personal devices, honestly</h2>
<p>Technicians will use their own phones for job updates and photographs. This is not a policy failure to be corrected; it is a working practice to be accommodated safely.</p>
<p>Application protection controls the corporate data inside the app — PIN, encryption, copy restrictions, selective wipe — without enrolling the device. It is the difference between asking a technician to hand over control of their phone, which they will resist, and protecting company data on it, which they will barely notice.</p>
<p>The departure scenario is where the arrangement proves itself, and demonstrating a selective wipe that removes company data and leaves personal photographs is what makes it acceptable.</p>`,
        frameworkLede: "Every paper in this series ends with a framework you can run internally. We would rather you used it and reached your own conclusion than took ours on trust.",
        frameworkName: "Designing for the field",
        frameworkDescription: "Five decisions that survive contact with a site.",
        frameworkStages: [
            { number: 1, order: 1, title: "Tolerate", description: "Grace periods and offline-capable policy sized to the worst realistic connectivity gap." },
            { number: 2, order: 2, title: "Ship", description: "Autopilot registration at purchase, direct to the technician, no depot visit." },
            { number: 3, order: 3, title: "Protect", description: "App protection on personal devices rather than a fight about enrolment." },
            { number: 4, order: 4, title: "Align", description: "Support and update windows matched to crew hours, not office hours." },
            { number: 5, order: 5, title: "Pilot", description: "One real crew including the sceptic. Fix what they find before extending." }
        ],
        implicationsLede: "The same argument lands differently across an executive team. These are the three versions worth separating.",
        implications: [
            { order: 1, role: "For the operations director", text: "The support hours question is commercial rather than technical. Three hours a day of exposure is a number you can decide to accept or close, but it should be decided." },
            { order: 2, role: "For the IT lead", text: "Time a provisioning end to end and use the number. It converts an argument about process into a measurable constraint." },
            { order: 3, role: "For the finance director", text: "Follow-the-sun coverage closes the early-morning gap without paying for an on-call rota, which is usually the cheaper of the two options." }
        ],
        referencesLede: "Microsoft's own documentation for the product behaviour described above. We would rather you verified the basis than accepted our summary of it.",
        references: [
            { number: 1, order: 1, title: "Compliance policy settings in Microsoft Intune", source: "Microsoft Intune documentation — grace periods and non-compliance actions" },
            { number: 2, order: 2, title: "Windows Autopilot deployment profiles", source: "Microsoft Intune documentation — user-driven mode and the Enrollment Status Page" },
            { number: 3, order: 3, title: "App protection policies", source: "Microsoft Intune documentation — protecting data on unenrolled devices" },
            { number: 4, order: 4, title: "Windows Update rings in Intune", source: "Microsoft Intune documentation — active hours, deferrals and deadlines" },
            { number: 5, order: 5, title: "BitLocker management with Intune", source: "Microsoft Intune documentation — silent enablement and key escrow" }
        ],
        referencesNote: "On these references: each entry names a Microsoft Learn article or documentation area by title, because deep links change while titles are stable. Searching the title on learn.microsoft.com will reach the current version. Where we have cited a figure or a product behaviour, it is Microsoft's statement rather than ours; where we have given a number of our own it is labelled as such in the text.",
        ctaText: "We will pilot the configuration with one of your crews, including your most difficult case, and report what they found before any wider rollout."
    },
    {
        platform: "intune",
        service: "managed-it-security",
        industry: "legal",
        icon: "device",
        pages: 11,
        title: "Confidentiality on devices you do not control",
        description: "A control that depends on partners behaving differently from how they demonstrably behave is not a control — and in a negligence context it is worse than none.",
        publishedAt: new Date("2026-02-01"),
        readTime: "12 min read",
        subtitle: "Why the personal device policy most firms hold is a liability rather than a protection",
        inThisPaper: [
            "An abstract and four numbered findings",
            "Analysis across 3 sections",
            "A framework you can apply: Protecting what you cannot manage",
            "Implications separated by role",
            "5 references to Microsoft documentation"
        ],
        abstractParagraphs: [
            "Every firm has a policy about personal devices. In most firms the policy is that they should not be used for client work, and the practice is that a partner in an airport reads a matter email on their own phone.",
            "This paper argues that the gap between policy and practice is itself a professional risk, that the productive response is to protect the data rather than manage the device, and that the departure scenario is where the arrangement proves its worth."
        ],
        findings: [
            { number: 1, order: 1, title: "An unfollowed policy is a liability in a professional negligence context", description: "It documents that the firm knew the risk and specifies a control that demonstrably did not operate." },
            { number: 2, order: 2, title: "Protecting the data avoids the fight about the device", description: "Application protection controls corporate data inside the app without enrolment, which is the difference between a control partners accept and one they resist." },
            { number: 3, order: 3, title: "The departure scenario is the strongest argument", description: "A partner leaving for a competitor with firm data on an unprotected personal phone is a problem with no good technical answer after the fact." },
            { number: 4, order: 4, title: "Protection status must be reported rather than assumed", description: "Policy says required; the compliance report says applied. The gap between them is usually meaningful and it is what an insurer asks about." }
        ],
        analysisBody: `<h2>The gap and why it matters professionally</h2>
<p>Partners read matter correspondence on personal phones. This is not going to stop, and a policy that pretends otherwise creates a specific professional risk: it establishes that the firm identified the exposure and relied on a control that was not operating.</p>
<p>Rewriting the policy to match observed behaviour, and then controlling that behaviour technically, converts a liability into a defensible position. It is also considerably easier to achieve than changing how senior people work.</p>
<p>The firms that handle this well include partners and senior staff in scope explicitly, because the exemption is usually where the most sensitive matters are.</p>
<h2>Protecting the data rather than the device</h2>
<p>Application protection policies apply controls to the corporate data inside an application — preventing copy to personal apps, requiring a PIN, encrypting the application's data, and allowing selective wipe of firm data without touching anything personal.</p>
<p>This is the difference between asking a partner to enrol their phone into firm management, which they will resist, and applying protection to firm data on it, which they will barely notice.</p>
<p>Five controls carry most of the benefit, and keeping the requirement proportionate matters: an aggressive PIN policy on a personal phone generates support tickets and workarounds rather than security.</p>
<ul>
<li>Copy and paste from firm applications to personal ones blocked</li>
<li>PIN or biometric required to open firm applications, with a proportionate timeout</li>
<li>Saving firm documents to personal cloud storage blocked</li>
<li>Firm data encrypted within the application container</li>
<li>Selective wipe enabled and tested on a real device</li>
</ul>
<h2>The departure scenario</h2>
<p>This is where the arrangement proves itself and it is the argument that persuades partners.</p>
<p>A partner leaves for a competitor. On an unprotected personal device, firm data remains on the phone and there is nothing to be done about it that does not involve lawyers and considerable awkwardness.</p>
<p>With application protection, firm data is removed and their photographs stay. The conversation is straightforward, there is a record that it happened, and the firm can evidence it to a client or an insurer who asks. Demonstrating that wipe on a real device before deployment is what makes partners comfortable with the arrangement in the first place.</p>`,
        frameworkLede: "Every paper in this series ends with a framework you can run internally. We would rather you used it and reached your own conclusion than took ours on trust.",
        frameworkName: "Protecting what you cannot manage",
        frameworkDescription: "Five steps, in the order that produces adoption.",
        frameworkStages: [
            { number: 1, order: 1, title: "Count", description: "Establish how many personal devices actually reach firm data. Not estimate — report." },
            { number: 2, order: 2, title: "Rewrite", description: "Align the policy with observed practice, including partners and senior staff." },
            { number: 3, order: 3, title: "Protect", description: "Application protection rather than enrolment. Five controls carry most of the benefit." },
            { number: 4, order: 4, title: "Demonstrate", description: "Show a selective wipe on a real device. This is what makes it acceptable." },
            { number: 5, order: 5, title: "Evidence", description: "Report protection status rather than assuming it, and check it matches your questionnaire answers." }
        ],
        implicationsLede: "The same argument lands differently across an executive team. These are the three versions worth separating.",
        implications: [
            { order: 1, role: "For the risk partner", text: "The unfollowed policy is the exposure. Aligning it with practice and controlling the practice technically is a materially stronger position than the one most firms currently hold." },
            { order: 2, role: "For the managing partner", text: "Partners will accept protection that leaves their personal content alone. They will resist enrolment. The distinction is the whole design." },
            { order: 3, role: "For the IT director", text: "Read the compliance report rather than the policy. The gap between required and applied is what an insurer and a client questionnaire will both test." }
        ],
        referencesLede: "Microsoft's own documentation for the product behaviour described above. We would rather you verified the basis than accepted our summary of it.",
        references: [
            { number: 1, order: 1, title: "App protection policies in Microsoft Intune", source: "Microsoft Intune documentation — protecting data on unenrolled devices" },
            { number: 2, order: 2, title: "App protection policy settings for iOS and Android", source: "Microsoft Intune documentation — data transfer, access and encryption settings" },
            { number: 3, order: 3, title: "Selective wipe in Microsoft Intune", source: "Microsoft Intune documentation — removing corporate data without affecting personal content" },
            { number: 4, order: 4, title: "Conditional Access app protection policy requirement", source: "Microsoft Entra documentation — requiring a protected app for access" },
            { number: 5, order: 5, title: "Microsoft Intune device compliance policies", source: "Microsoft Intune documentation — reporting and evidencing encryption state" }
        ],
        referencesNote: "On these references: each entry names a Microsoft Learn article or documentation area by title, because deep links change while titles are stable. Searching the title on learn.microsoft.com will reach the current version. Where we have cited a figure or a product behaviour, it is Microsoft's statement rather than ours; where we have given a number of our own it is labelled as such in the text.",
        ctaText: "We will assess your current position against what your professional indemnity insurer asks, and demonstrate application protection working on a real personal phone before you commit to anything."
    },
    {
        platform: "intune",
        service: "talent",
        industry: "small-mid-market",
        icon: "device",
        pages: 11,
        title: "Build or buy the IT function",
        description: "The instinct is to hire. It is not always right, and the reasoning matters more than the conclusion.",
        publishedAt: new Date("2026-01-11"),
        readTime: "12 min read",
        subtitle: "The decision every growing business faces around fifty people, and the questions that actually settle it",
        inThisPaper: [
            "An abstract and four numbered findings",
            "Analysis across 3 sections",
            "A framework you can apply: Settling the decision",
            "Implications separated by role",
            "5 references to Microsoft documentation"
        ],
        abstractParagraphs: [
            "Somewhere between forty and a hundred people, the arrangement where a capable person handles IT alongside their real job stops working. Laptops take a week to arrive configured, nobody is certain which devices are encrypted, and the person doing it has quietly stopped doing the job you hired them for.",
            "This paper sets out what one hire actually buys, what buying the capability buys instead, and the five questions that settle the decision — none of which is headcount."
        ],
        findings: [
            { number: 1, order: 1, title: "One hire covers five specialisms shallowly and creates key-person risk", description: "Endpoints, identity, network, applications, security and procurement. No individual is strong across all of them." },
            { number: 2, order: 2, title: "The real trade is responsiveness against depth, not cost against cost", description: "Both options cost roughly similar amounts at this scale. They fail differently, which is the more useful comparison." },
            { number: 3, order: 3, title: "The hybrid model scales without a re-decision at 150 people", description: "One internal person owning priorities and relationships, with specialist depth bought in behind them." },
            { number: 4, order: 4, title: "Fixing provisioning first often changes what the answer needs to be", description: "Zero-touch provisioning removes most of the skilled hours from every joiner and replacement, which frequently determines whether one person is enough." }
        ],
        analysisBody: `<h2>What one hire actually gets you</h2>
<p>A single competent generalist covering endpoints, identity, network, applications, security and procurement. That is five specialisms and no individual is strong in all of them.</p>
<p>It also gets you a single point of failure with holidays, a notice period, and a knowledge base that exists only in their head. For a fifty-person business that is a real risk, and it is the one most often discovered at the worst moment.</p>
<p>What it does get you, genuinely, is somebody in the building who knows your people by name and can walk to a desk. That is worth more than most managed service marketing admits.</p>
<h2>What buying the capability gets you</h2>
<p>Depth across all five areas and none of the key-person risk, at the cost of somebody who is not in your office and does not know your staff personally.</p>
<p>The honest trade is responsiveness for depth. A good managed service closes most of that gap with named contacts and agreed response times, and it does not close all of it. Any provider claiming otherwise is overselling.</p>
<p>The questions that settle it are not about headcount. How often do you need somebody physically present rather than reachable. Does your sector impose requirements — residency, vetting, on-site working — that need an employee. Is your estate standard or does it carry unusual applications only a dedicated person will learn. Do you want the capability to grow with you or to be replaced by an internal team in two years. And who covers the four weeks a year your hire is on leave.</p>
<ul>
<li>Presence: how often somebody must be physically in the building</li>
<li>Sector requirements: residency, vetting or on-site working that need an employee</li>
<li>Estate complexity: standard, or carrying applications only a dedicated person will learn</li>
<li>Trajectory: growing the capability, or replacing it with an internal team in two years</li>
<li>Continuity: who covers annual leave, illness and a notice period</li>
</ul>
<h2>Why provisioning changes the answer</h2>
<p>Whichever route you take, endpoint management determines how the arrangement feels day to day. Zero-touch provisioning through Autopilot removes most of the skilled hours from every joiner, replacement and rebuild.</p>
<p>That single change frequently determines whether one person is enough, which makes it worth doing before the hiring decision rather than after. A business spending a day per device on manual setup and a business spending twenty minutes have materially different staffing requirements, and the difference is a configuration exercise rather than a capability one.</p>
<p>The hybrid arrangement — one internal person owning priorities, relationships and anything requiring presence, with specialist depth bought in behind them — is the model we see work most consistently. It also scales without needing to be revisited at a hundred and fifty people, because the internal person stops being the IT function and becomes the person who directs it.</p>`,
        frameworkLede: "Every paper in this series ends with a framework you can run internally. We would rather you used it and reached your own conclusion than took ours on trust.",
        frameworkName: "Settling the decision",
        frameworkDescription: "Five questions. None of them is headcount.",
        frameworkStages: [
            { number: 1, order: 1, title: "Presence", description: "How often does somebody genuinely need to be in the building?" },
            { number: 2, order: 2, title: "Obligation", description: "Does your sector require an employee for residency, vetting or on-site work?" },
            { number: 3, order: 3, title: "Complexity", description: "Is the estate standard, or does it carry things only a dedicated person will learn?" },
            { number: 4, order: 4, title: "Trajectory", description: "Are you building a capability to keep, or bridging to an internal team?" },
            { number: 5, order: 5, title: "Continuity", description: "Who covers the four weeks a year your hire is not there?" }
        ],
        implicationsLede: "The same argument lands differently across an executive team. These are the three versions worth separating.",
        implications: [
            { order: 1, role: "For the managing director", text: "Fix provisioning before deciding. It is a configuration exercise that materially changes the staffing requirement and it is cheap either way." },
            { order: 2, role: "For the finance director", text: "The comparison is not cost against cost; the two are similar at this scale. It is how each option fails, and that is a risk conversation." },
            { order: 3, role: "For whoever currently does IT", text: "The hybrid model is usually better for you as well. It removes the parts nobody can be good at alone and keeps the parts that need somebody in the building." }
        ],
        referencesLede: "Microsoft's own documentation for the product behaviour described above. We would rather you verified the basis than accepted our summary of it.",
        references: [
            { number: 1, order: 1, title: "Windows Autopilot deployment", source: "Microsoft Intune documentation — zero-touch provisioning and supplier registration" },
            { number: 2, order: 2, title: "Microsoft Intune device compliance policies", source: "Microsoft Intune documentation — baseline compliance for a small estate" },
            { number: 3, order: 3, title: "BitLocker management with Intune", source: "Microsoft Intune documentation — silent enablement and key escrow" },
            { number: 4, order: 4, title: "Microsoft 365 Business Premium", source: "Microsoft 365 documentation — what the mid-market tier includes" },
            { number: 5, order: 5, title: "Microsoft Entra Conditional Access", source: "Microsoft Entra documentation — identity controls for organizations without a security team" }
        ],
        referencesNote: "On these references: each entry names a Microsoft Learn article or documentation area by title, because deep links change while titles are stable. Searching the title on learn.microsoft.com will reach the current version. Where we have cited a figure or a product behaviour, it is Microsoft's statement rather than ours; where we have given a number of our own it is labelled as such in the text.",
        ctaText: "We will assess your current estate and model both options honestly, including the case where hiring is clearly the right answer and we are not."
    }
];

const seedWhitepapers = async () => {
    try {
        if (!process.env.MONGO_URI) throw new Error("MONGO_URI not found in .env");

        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected...");

        await Whitepaper.deleteMany({});
        console.log("Old whitepapers cleared.");

        const inserted = await Whitepaper.insertMany(whitepapers, { ordered: true });
        console.log(`✅ ${inserted.length} whitepapers seeded successfully.`);

        process.exit(0);
    } catch (error) {
        console.error("❌ Whitepaper seeding failed:", error);
        process.exit(1);
    }
};

seedWhitepapers();