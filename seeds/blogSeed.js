// seed/blogSeed.js
// Run: node seed/blogSeed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import BlogPost from "../models/BlogPost.js";

dotenv.config();

const posts = [
    // 1. Copilot Oversharing - Healthcare
    {
        platform: "sharepoint",
        service: "modern-work-automation",
        industry: "healthcare",
        title: "The oversharing problem your Copilot rollout will find first",
        description: "Healthcare organizations have a decade of casually shared links sitting in SharePoint. Copilot does not create that problem — it audits it, in public, on day one.",
        publishedAt: new Date("2026-07-21"),
        readTime: "8 min read",
        type: "Challenges",
        icon: "docs",
        slug: "copilot-oversharing-healthcare-sharepoint",
        takeaways: [
            "Run a permission and oversharing assessment before assigning a single Copilot licence",
            "Expect the exposure to concentrate in a small number of sites — remediate those first",
            "Treat sensitivity labelling as a prerequisite, not a follow-up project",
            "Give every site an accountable owner before you give it an agent",
            "Budget for a delay: six weeks of remediation is normal and far cheaper than an incident"
        ],
        content: `<p class="stand">Almost every Copilot pilot we have paused was paused for the same reason, and it was never the model. It was a clinician typing a reasonable question and receiving a document they were technically permitted to open and had no business reading.</p><p>The permission debt was always there. What changed is that finding it used to require knowing the file existed.</p>
<h2>Why healthcare estates overshare more than most</h2>
<p>Clinical work is collaborative and urgent, and SharePoint's sharing model rewards speed. A consultant needs a protocol document at eleven at night, so somebody shares it with everyone in the organization because that link works immediately and a permissions request does not.</p>
<p>Repeat that for ten years across a merged estate that has absorbed two acquisitions and a handful of departmental site collections nobody has audited, and you have a document library where the effective permissions bear no relationship to anyone's intent.</p>
<p>Microsoft's own tooling now reflects how common this is. SharePoint Advanced Management has grown into a content governance suite with reporting for files shared with <em>Everyone Except External Users</em> — the specific pattern that causes most of this — because enough organizations needed it.</p>
<h2>What a readiness assessment actually looks for</h2>
<p>Not a list of sites. A list of content that is reachable by more people than the owner believes, weighted by how sensitive it is.</p>
<ul>
<li><svg><use href="#i-check"/></svg><span>Sites where broad-access sharing links have been used on libraries containing patient-identifiable material</span></li>
<li><svg><use href="#i-check"/></svg><span>Permission inheritance that was broken years ago and never reviewed</span></li>
<li><svg><use href="#i-check"/></svg><span>Sites with no active owner, where nobody can approve a change</span></li>
<li><svg><use href="#i-check"/></svg><span>Content with no sensitivity label, in libraries where labelling was assumed to be automatic</span></li>
<li><svg><use href="#i-check"/></svg><span>Guest and external access that outlived the project that justified it</span></li>
</ul>
<h2>The sequence that works</h2>
<p>Discovery first, remediation second, deployment third. Organizations that reverse the first two spend the pilot period arguing about individual documents instead of learning whether Copilot helps.</p>
<p>In practice, remediation is less painful than leadership expects. Most oversharing concentrates in a small number of sites, and fixing those covers the majority of the exposure. The work that takes time is the governance decision underneath — who is allowed to share broadly, and what happens when they leave.</p>
<h2>Where this is heading</h2>
<p>Microsoft is positioning SharePoint as the trusted content backbone for Copilot, with agents that clean up metadata, flag stale content and make libraries answerable. That direction only helps organizations whose permission model is already sound.</p>
<p>If your AI roadmap is ahead of your data governance, the two meet here. It is cheaper to find that out during an assessment than during a pilot.</p>
<div class="pull">
<h4>What to take away</h4>
<ul>
<li><svg><use href="#i-check"/></svg><span>Run a permission and oversharing assessment before assigning a single Copilot licence</span></li>
<li><svg><use href="#i-check"/></svg><span>Expect the exposure to concentrate in a small number of sites — remediate those first</span></li>
<li><svg><use href="#i-check"/></svg><span>Treat sensitivity labelling as a prerequisite, not a follow-up project</span></li>
<li><svg><use href="#i-check"/></svg><span>Give every site an accountable owner before you give it an agent</span></li>
<li><svg><use href="#i-check"/></svg><span>Budget for a delay: six weeks of remediation is normal and far cheaper than an incident</span></li>
</ul>
</div>
<h2>Where to go from here</h2>
<p>If Copilot is on your roadmap for this financial year, the readiness assessment belongs in this quarter's plan rather than next. We run these as a scoped, fixed-price piece of work and the output is yours whether or not you go further with us.</p>`
    },

    // 2. Standard Cost - Manufacturing
    {
        platform: "business-central",
        service: "business-applications",
        industry: "manufacturing",
        title: "Your standard cost is a story about last year",
        description: "Most manufacturers quote from a cost standard set years ago and updated rarely. The gap between that number and reality decides which orders you win and which quietly lose money.",
        publishedAt: new Date("2026-07-14"),
        readTime: "9 min read",
        type: "Challenges",
        icon: "erp",
        slug: "standard-cost-manufacturing-business-central",
        takeaways: [
            "Stale standards do not just misprice work — they hide which work is mispriced",
            "Business Central puts actual costing within reach of mid-market manufacturers",
            "Run actuals in parallel with the standard for a quarter before changing anything",
            "Analyse by product family first; part-level noise obscures the pattern",
            "Expect to find a small number of structurally unprofitable accounts"
        ],
        content: `<p class="stand">Ask a manufacturing finance director what a unit costs to make and you will get a confident answer. Ask when the standard was last reviewed and the conversation changes.</p>
<p>This is not negligence. Updating standards is disruptive, the variance analysis is uncomfortable, and there is never a good quarter to do it. So the number ages, and sales keeps quoting from it.</p>
<h2>What the gap actually costs</h2>
<p>Three things, in ascending order of expense. You lose work you should have won, because the standard is high and the quote is uncompetitive. You win work you should have lost, because the standard is low and the margin is not there. And you cannot tell the difference, because the variance is explained after the quarter rather than acted on during it.</p>
<p>The third is the real problem. A business that knows its standards are stale can compensate with judgement. A business that believes its standards are accurate makes portfolio decisions on them.</p>
<h2>Why Business Central changes the arithmetic</h2>
<p>The barrier to actual costing has never been conceptual. It has been that capturing real labour, material and machine consumption at the operation required a system most mid-market manufacturers could not justify.</p>
<p>That is no longer true. Business Central carries production orders, routings, bills of material and cost accounting in the same application as the ledger, at a licence cost a hundred-person manufacturer can defend. The data that used to require an enterprise ERP is now a configuration decision.</p>
<p>Microsoft's current direction adds to this: the 2026 release wave puts AI agents into payables and expense processing, which matters disproportionately in a small finance team where routine processing is a large share of the week.</p>
<h2>How to move quoting onto real cost without breaking the month end</h2>
<p>Do not switch. Run both.</p>
<p>Capture actuals alongside the existing standard for a full quarter. Compare them by product family rather than by part — the family-level pattern is where the decisions are. Then reprice deliberately, starting with the products where the variance is largest and the customer relationship is strongest enough to survive a conversation.</p>
<ul>
<li><svg><use href="#i-check"/></svg><span>Instrument actual labour, material and machine time at the operation, not at the job</span></li>
<li><svg><use href="#i-check"/></svg><span>Roll costs up by product family before you look at individual parts</span></li>
<li><svg><use href="#i-check"/></svg><span>Compare a full quarter, so seasonality and mix do not distort the picture</span></li>
<li><svg><use href="#i-check"/></svg><span>Reprice in sequence, hardest variance first, rather than across the board</span></li>
<li><svg><use href="#i-check"/></svg><span>Keep the standard for reporting continuity until finance is ready to switch</span></li>
</ul>
<h2>What good looks like afterwards</h2>
<p>Quotes built from a cost basis somebody can defend. Margin visible by job, customer and product line every week rather than at close. And the uncomfortable but valuable discovery that a handful of long-standing accounts are being served at a loss.</p>
<p>That last conversation is the one nobody looks forward to and the one that pays for the project.</p>
<div class="pull">
<h4>What to take away</h4>
<ul>
<li><svg><use href="#i-check"/></svg><span>Stale standards do not just misprice work — they hide which work is mispriced</span></li>
<li><svg><use href="#i-check"/></svg><span>Business Central puts actual costing within reach of mid-market manufacturers</span></li>
<li><svg><use href="#i-check"/></svg><span>Run actuals in parallel with the standard for a quarter before changing anything</span></li>
<li><svg><use href="#i-check"/></svg><span>Analyse by product family first; part-level noise obscures the pattern</span></li>
<li><svg><use href="#i-check"/></svg><span>Expect to find a small number of structurally unprofitable accounts</span></li>
</ul>
</div>
<h2>Where to go from here</h2>
<p>Give us a real bill of material and routing for one product family and we will show you the cost roll-up in a demo environment using your own part numbers — before any commercial conversation.</p>`
    },

    // 3. Cyber Insurance Questionnaire - SMB
    {
        platform: "cybersecurity",
        service: "managed-it-security",
        industry: "small-mid-market",
        title: "Your cyber insurance questionnaire is now your security roadmap",
        description: "Insurers have quietly become the most effective security auditors in the mid-market. The questions they ask are a better prioritisation list than most internal risk registers.",
        publishedAt: new Date("2026-07-06"),
        readTime: "7 min read",
        type: "Market trends",
        icon: "shield",
        slug: "cyber-insurance-questionnaire-smb-security",
        takeaways: [
            "Treat the insurance questionnaire as a free, actuarially weighted gap analysis",
            "Answer honestly; an aspirational answer creates a claims problem later",
            "Sequence remediation by estate coverage, not by severity rating",
            "Identity controls cover more attack paths than anything else you can deploy",
            "Check existing licensing before buying anything — much of the list is already included"
        ],
        content: `<p class="stand">A few years ago a cyber insurance renewal was a form and a premium. Now it is a technical questionnaire with binary questions, and answering one of them wrong changes the price or removes the cover.</p>
<p>For mid-market organizations without a security function, this has had an odd side effect: the insurer has become the de facto security architect.</p>
<h2>What they are actually asking</h2>
<p>The questions vary by carrier but converge on the same short list, and it is a good list. Multi-factor authentication on every account including administrators. Endpoint detection and response deployed across the estate. Backups that are tested, immutable and not reachable from the production domain. Privileged access separated from daily accounts. Email filtering with impersonation protection. A documented and rehearsed incident response plan.</p>
<p>There is nothing exotic there. What is notable is that these are also the controls that stop the attacks organizations actually experience, rather than the ones that appear in a threat briefing.</p>
<h2>Why answering honestly is worth more than answering well</h2>
<p>The temptation is to answer aspirationally — MFA is enabled, in the sense that it is available. This is a poor trade. A claim declined because a control was represented as present and was not is considerably more expensive than a higher premium.</p>
<p>It also wastes the diagnostic value. A questionnaire answered honestly is a gap analysis somebody else built for you, weighted by what an actuary thinks will actually cause a loss.</p>
<h2>Turning the form into a plan</h2>
<p>Take the questions you answered no to, and order them by how much of the estate they cover rather than by severity score.</p>
<ul>
<li><svg><use href="#i-check"/></svg><span>Identity first — MFA and conditional access cover more attack paths than any other single control</span></li>
<li><svg><use href="#i-check"/></svg><span>Then endpoint coverage, including the devices nobody has looked at in two years</span></li>
<li><svg><use href="#i-check"/></svg><span>Then backup validation: not whether backups run, but whether a restore has been rehearsed</span></li>
<li><svg><use href="#i-check"/></svg><span>Then privileged access separation, which is cheap and consistently deferred</span></li>
<li><svg><use href="#i-check"/></svg><span>Then the incident response plan, rehearsed rather than written</span></li>
</ul>
<h2>The part most organizations already own</h2>
<p>A significant share of this list is included in Microsoft 365 licensing that mid-market organizations already hold and have not deployed. Conditional access, device compliance and endpoint protection are frequently sitting unconfigured inside a subscription being renewed annually.</p>
<p>Establishing what is already paid for is usually the first and cheapest piece of work — and it often funds the rest.</p>
<div class="pull">
<h4>What to take away</h4>
<ul>
<li><svg><use href="#i-check"/></svg><span>Treat the insurance questionnaire as a free, actuarially weighted gap analysis</span></li>
<li><svg><use href="#i-check"/></svg><span>Answer honestly; an aspirational answer creates a claims problem later</span></li>
<li><svg><use href="#i-check"/></svg><span>Sequence remediation by estate coverage, not by severity rating</span></li>
<li><svg><use href="#i-check"/></svg><span>Identity controls cover more attack paths than anything else you can deploy</span></li>
<li><svg><use href="#i-check"/></svg><span>Check existing licensing before buying anything — much of the list is already included</span></li>
</ul>
</div>
<h2>Where to go from here</h2>
<p>Send us your current questionnaire and your licence position. We will map which gaps are already covered by entitlements you hold, and what the remainder would take.</p>`
    },

    // 4. Ethical Walls - Legal
    {
        platform: "sharepoint",
        service: "modern-work-automation",
        industry: "legal",
        title: "Ethical walls in Microsoft 365: how they should actually be built",
        description: "Information barriers, sensitivity labels and access design — and the common configuration that looks compliant to a risk partner but is not.",
        publishedAt: new Date("2026-06-29"),
        readTime: "10 min read",
        type: "How-to guide",
        icon: "docs",
        slug: "ethical-walls-legal-sharepoint",
        takeaways: [
            "A wall built only at the site level is not a wall — email, OneDrive and search all bypass it",
            "Information barriers, access design, labels and retention have to be designed together",
            "Drive matter site membership from your practice management system, not by hand",
            "Spend an hour trying to breach your own wall before you tell anyone it exists",
            "Search result snippets leak matter existence more often than firms expect"
        ],
        content: `<p class="stand">Every firm has a conflicts policy. Considerably fewer have a technical implementation of it that would survive being tested.</p>
<p>The gap matters more than it used to, because the tooling that surfaces content across a tenant has become very good at its job.</p>
<h2>The configuration that fails quietly</h2>
<p>A firm creates a site per matter, restricts membership, and considers the wall built. The problem is everything around the site: the email thread that discussed the matter and sits in personal mailboxes, the document a partner saved to their own OneDrive to work on at home, the search index that returns a title and a snippet to somebody who cannot open the file.</p>
<p>None of these are configuration errors in isolation. Together they mean the wall exists in the site and nowhere else.</p>
<h2>The four layers that have to agree</h2>
<p>A defensible ethical wall in Microsoft 365 is not one control. It is four, and they have to be designed together rather than added in sequence.</p>
<ul>
<li><svg><use href="#i-check"/></svg><span><strong>Information barriers</strong> — policy-level segmentation that prevents communication and collaboration between defined groups, enforced across Teams, SharePoint and OneDrive</span></li>
<li><svg><use href="#i-check"/></svg><span><strong>Access design</strong> — matter sites with membership driven by your practice management system rather than maintained by hand</span></li>
<li><svg><use href="#i-check"/></svg><span><strong>Sensitivity labels</strong> — protection that travels with the document when it leaves the site, including outside the tenant</span></li>
<li><svg><use href="#i-check"/></svg><span><strong>Retention and disposition</strong> — aligned to matter lifecycle rather than to a calendar date, so closed matters actually close</span></li>
</ul>
<h2>Test it before you rely on it</h2>
<p>The single most useful hour in this work is a deliberate attempt to breach your own wall. Take an account on the wrong side of a barrier and try, methodically, to reach the material: search, direct URL, a shared link forwarded by a colleague, a document opened on a personal device, an export to Excel.</p>
<p>Write down what worked. In our experience the search result snippet is the one that surprises risk partners most often, because it leaks the existence and subject of a matter without leaking the file.</p>
<h2>What is changing</h2>
<p>Microsoft is investing heavily in making SharePoint content discoverable and answerable by agents — automated metadata, stale content detection, agents that reason over libraries and lists. For a firm with a properly built wall, that is straightforwardly useful.</p>
<p>For a firm whose wall exists only at the site level, it is a considerably faster way to discover the gap. The remediation work is the same either way. The question is only whether you do it deliberately or after an incident.</p>
<div class="pull">
<h4>What to take away</h4>
<ul>
<li><svg><use href="#i-check"/></svg><span>A wall built only at the site level is not a wall — email, OneDrive and search all bypass it</span></li>
<li><svg><use href="#i-check"/></svg><span>Information barriers, access design, labels and retention have to be designed together</span></li>
<li><svg><use href="#i-check"/></svg><span>Drive matter site membership from your practice management system, not by hand</span></li>
<li><svg><use href="#i-check"/></svg><span>Spend an hour trying to breach your own wall before you tell anyone it exists</span></li>
<li><svg><use href="#i-check"/></svg><span>Search result snippets leak matter existence more often than firms expect</span></li>
</ul>
</div>
<h2>Where to go from here</h2>
<p>We will run a scoped information barrier review against one practice group, including the deliberate breach test, and give you the findings in writing whether or not you engage us further.</p>`
    },

    // 5. Row Level Security - Financial Services
    {
        platform: "power-bi",
        service: "data-ai-integration",
        industry: "financial-services",
        title: "One report, every branch, no exports",
        description: "Row-level security in Power BI is the difference between one governed report and forty spreadsheets circulating by email. Most institutions build the spreadsheets.",
        publishedAt: new Date("2026-06-22"),
        readTime: "8 min read",
        type: "How-to guide",
        icon: "chart",
        slug: "row-level-security-financial-services-power-bi",
        takeaways: [
            "The barrier to row-level security is specification, not implementation",
            "Model entitlements as data sourced from your directory, not as hard-coded rules",
            "Test with real role accounts, never with the designer's own permissions",
            "Publish the rule set where your auditor will look for it",
            "Copilot reasoning over your model will respect — and expose — the security you designed"
        ],
        content: `<p class="stand">There is a recognisable pattern in banks and credit unions. A central analyst produces a monthly performance pack, then produces a filtered copy for each region, then emails them. The copies immediately begin to diverge, and by week three nobody is certain which version anybody is quoting.</p>
<p>The technical fix has existed for years. The reason it is not used is almost always that nobody owned the decision about who should see what.</p>
<h2>What row-level security actually solves</h2>
<p>One report, published once, that shows each person only the rows they are entitled to. A branch manager opens it and sees their branch. A regional director opens the same report and sees their region. The chief executive sees everything.</p>
<p>No exports, no version drift, no reconciliation meeting. And — the part auditors care about — a single place where the entitlement rules live, rather than a distribution list somebody maintains.</p>
<h2>The design decision that has to come first</h2>
<p>Row-level security is trivially easy to implement and genuinely hard to specify. The question is not technical: it is who, in your institution, is entitled to see what.</p>
<p>Get this wrong in the permissive direction and you have published customer-level data to people who should not have it. Get it wrong in the restrictive direction and managers quietly go back to asking the analyst for a spreadsheet, which is where you started.</p>
<p>The rules should come from the business, be written down before anything is built, and be reviewable by whoever owns data governance.</p>
<h2>Building it properly</h2>
<p>Model the entitlement as data, not as a hard-coded rule.</p>
<ul>
<li><svg><use href="#i-check"/></svg><span>Hold the person-to-entity mapping in a table, sourced from your directory or HR system</span></li>
<li><svg><use href="#i-check"/></svg><span>Drive the security filter from that table so joiners and leavers are handled automatically</span></li>
<li><svg><use href="#i-check"/></svg><span>Test with real accounts from each role before publishing — not with the model designer's account</span></li>
<li><svg><use href="#i-check"/></svg><span>Document the rule set where your auditor will look for it</span></li>
<li><svg><use href="#i-check"/></svg><span>Review the mapping quarterly, because organizational change breaks it silently</span></li>
</ul>
<h2>Why this matters more in 2026</h2>
<p>Power BI is being engineered less as a standalone reporting tool and more as a governed layer over a broader data platform. Direct Lake reads data straight from OneLake without an import step, and Copilot experiences increasingly reason over your semantic model directly.</p>
<p>That raises the stakes on the semantic layer considerably. An AI assistant answering a question about performance will respect the security you designed — and will expose the gaps in it just as faithfully.</p>
<div class="pull">
<h4>What to take away</h4>
<ul>
<li><svg><use href="#i-check"/></svg><span>The barrier to row-level security is specification, not implementation</span></li>
<li><svg><use href="#i-check"/></svg><span>Model entitlements as data sourced from your directory, not as hard-coded rules</span></li>
<li><svg><use href="#i-check"/></svg><span>Test with real role accounts, never with the designer's own permissions</span></li>
<li><svg><use href="#i-check"/></svg><span>Publish the rule set where your auditor will look for it</span></li>
<li><svg><use href="#i-check"/></svg><span>Copilot reasoning over your model will respect — and expose — the security you designed</span></li>
</ul>
</div>
<h2>Where to go from here</h2>
<p>Pick one report that currently circulates as filtered exports. We will rebuild it with row-level security in a demo environment against your structure and show your risk team how the entitlement rules would be evidenced.</p>`
    },

    // 6. Job Cost - Construction
    {
        platform: "business-central",
        service: "business-applications",
        industry: "construction-field-services",
        title: "Job cost while the job is still running",
        description: "Construction businesses discover their margin at close-out, when every decision that determined it has already been made. Moving that discovery forward is the whole game.",
        publishedAt: new Date("2026-06-15"),
        readTime: "8 min read",
        type: "Solutions",
        icon: "erp",
        slug: "job-cost-construction-business-central",
        takeaways: [
            "Job cost lag is a four-input problem: labour, material, equipment and subcontractors",
            "Weekly visibility beats accurate monthly reporting, because it arrives while options exist",
            "Commit purchase orders against the job so cost appears at order, not at invoice",
            "Publish the projected final position to whoever can act on it, not just to finance",
            "Uncaptured change orders will erase the benefit of everything else"
        ],
        content: `<p class="stand">A contractor can tell you precisely what a completed job earned. Ask about the job running right now and the answer is a feeling.</p>
<p>That gap is not a reporting problem. It is a timing problem, and it is where contracting margin goes.</p>
<h2>Why the lag exists</h2>
<p>Labour tickets arrive on paper at the end of the week. Material invoices arrive from suppliers on their own schedule, sometimes a month later. Equipment charges are allocated at period end. Subcontractor applications arrive when the subcontractor gets round to it.</p>
<p>By the time all four have landed in the same place, the job is finished. Nothing in that chain is anyone's fault, and collectively it means the office learns about a problem weeks after the site knew.</p>
<h2>What changes when the lag closes</h2>
<p>Weekly job cost against budget, with a projected final position that updates as costs land. That is it — no new insight, just earlier.</p>
<p>But earlier is transformative in this sector. A job drifting at twenty per cent complete can be recovered by a conversation with the client, a change to sequencing, or a subcontractor discussion. The same job discovered at ninety per cent complete can only be absorbed.</p>
<h2>The practical build</h2>
<p>Business Central carries job costing, purchase commitments and progress billing in the same system as the ledger. The work is less about the software than about closing the four input gaps.</p>
<ul>
<li><svg><use href="#i-check"/></svg><span>Capture labour on the mobile app at the point of work, not on a paper ticket</span></li>
<li><svg><use href="#i-check"/></svg><span>Commit purchase orders against the job so material cost appears when ordered, not when invoiced</span></li>
<li><svg><use href="#i-check"/></svg><span>Allocate equipment on a schedule the system applies automatically</span></li>
<li><svg><use href="#i-check"/></svg><span>Bring subcontractor applications into the same job structure with a defined cut-off</span></li>
<li><svg><use href="#i-check"/></svg><span>Publish the projected final cost weekly to the person who can actually act on it</span></li>
</ul>
<h2>The change order conversation</h2>
<p>Everything above is undermined if variations are performed before they are priced. In most contracting businesses this is the single largest recoverable leak, and it is a process problem rather than a commercial one.</p>
<p>Capture the variation on site at the moment the client asks, price it against the contract, get approval before work starts. Crews resist this less than owners expect — what they resist is a paper process that takes fifteen minutes.</p>
<div class="pull">
<h4>What to take away</h4>
<ul>
<li><svg><use href="#i-check"/></svg><span>Job cost lag is a four-input problem: labour, material, equipment and subcontractors</span></li>
<li><svg><use href="#i-check"/></svg><span>Weekly visibility beats accurate monthly reporting, because it arrives while options exist</span></li>
<li><svg><use href="#i-check"/></svg><span>Commit purchase orders against the job so cost appears at order, not at invoice</span></li>
<li><svg><use href="#i-check"/></svg><span>Publish the projected final position to whoever can act on it, not just to finance</span></li>
<li><svg><use href="#i-check"/></svg><span>Uncaptured change orders will erase the benefit of everything else</span></li>
</ul>
</div>
<h2>Where to go from here</h2>
<p>Pick a job type and give us your cost code structure. We will demonstrate weekly job costing and change order capture against it, including how it behaves on a phone with no signal.</p>`
    },

    // 7. Device Estate - SMB
    {
        platform: "intune",
        service: "talent",
        industry: "small-mid-market",
        title: "Hire an IT person, or buy the capability?",
        description: "Every growing business hits this decision, usually around the fifty-person mark. The right answer depends on questions most owners do not think to ask.",
        publishedAt: new Date("2026-06-08"),
        readTime: "7 min read",
        type: "Best practices",
        icon: "device",
        slug: "device-estate-buy-or-hire-smb-intune",
        takeaways: [
            "One hire covers five specialisms shallowly and creates key-person risk",
            "The real trade is responsiveness against depth, not cost against cost",
            "Decide on presence, sector requirements and estate complexity — not headcount",
            "The hybrid model scales without needing to be revisited at 150 people",
            "Fix provisioning first; it often changes what the answer needs to be"
        ],
        content: `<p class="stand">Somewhere between forty and a hundred people, the arrangement where a capable person handles IT alongside their real job stops working. Laptops take a week to arrive configured, nobody is certain which devices are encrypted, and the person doing it has quietly stopped doing the job you hired them for.</p>
<p>The instinct is to hire. It is not always right, and the reasoning matters more than the conclusion.</p>
<h2>What one hire actually gets you</h2>
<p>A single competent generalist covering endpoints, identity, network, applications, security and procurement. That is five specialisms, and no individual is strong in all of them.</p>
<p>It also gets you a single point of failure with holidays, a notice period and a knowledge base that exists only in their head. For a fifty-person business that is a real risk, and it is the one most often discovered at the worst moment.</p>
<h2>What buying the capability gets you</h2>
<p>Depth across all five areas and none of the key-person risk, at the cost of somebody who is not sitting in your office and does not know your people by name.</p>
<p>The honest trade is responsiveness for depth. A good managed service closes most of that gap with named contacts and agreed response times, but it does not close all of it, and any provider claiming otherwise is overselling.</p>
<h2>The questions that actually decide it</h2>
<p>Not headcount. These.</p>
<ul>
<li><svg><use href="#i-check"/></svg><span>How often do you need somebody physically present, as opposed to reachable?</span></li>
<li><svg><use href="#i-check"/></svg><span>Does your sector impose requirements — residency, vetting, on-site working — that need an employee?</span></li>
<li><svg><use href="#i-check"/></svg><span>Is your estate standard, or does it carry unusual applications only a dedicated person will learn?</span></li>
<li><svg><use href="#i-check"/></svg><span>Do you want the capability to grow with you, or to be replaced by an internal team in two years?</span></li>
<li><svg><use href="#i-check"/></svg><span>Who covers the four weeks a year your hire is on leave?</span></li>
</ul>
<h2>The hybrid most businesses land on</h2>
<p>One internal person who owns the relationship, the priorities and the things that need somebody in the building — with the specialist depth bought in behind them.</p>
<p>This is the arrangement we see work most consistently, and it is also the one that scales without a re-decision at a hundred and fifty people. The internal person stops being the whole IT function and becomes the person who directs it.</p>
<h2>Where the endpoint estate fits</h2>
<p>Whichever route you take, endpoint management is the piece that decides how the arrangement feels day to day. Zero-touch provisioning through Intune and Autopilot removes most of the skilled hours from every joiner, replacement and rebuild.</p>
<p>That single change frequently determines whether one person is enough — which makes it worth doing before the hiring decision, not after.</p>
<div class="pull">
<h4>What to take away</h4>
<ul>
<li><svg><use href="#i-check"/></svg><span>One hire covers five specialisms shallowly and creates key-person risk</span></li>
<li><svg><use href="#i-check"/></svg><span>The real trade is responsiveness against depth, not cost against cost</span></li>
<li><svg><use href="#i-check"/></svg><span>Decide on presence, sector requirements and estate complexity — not headcount</span></li>
<li><svg><use href="#i-check"/></svg><span>The hybrid model scales without needing to be revisited at 150 people</span></li>
<li><svg><use href="#i-check"/></svg><span>Fix provisioning first; it often changes what the answer needs to be</span></li>
</ul>
</div>
<h2>Where to go from here</h2>
<p>We will assess your current estate and model both options honestly, including the case where hiring is clearly the right answer and we are not.</p>`
    },

    // 8. Grant Evidence - Nonprofits
    {
        platform: "sharepoint",
        service: "modern-work-automation",
        industry: "nonprofits-associations",
        title: "Grant evidence that assembles itself",
        description: "Funder reporting consumes weeks of senior time in most nonprofits, and it does so because the evidence is gathered afterwards rather than captured as work happens.",
        publishedAt: new Date("2026-06-01"),
        readTime: "7 min read",
        type: "Solutions",
        icon: "docs",
        slug: "grant-evidence-nonprofits-sharepoint",
        takeaways: [
            "Grant reporting is slow because evidence is assembled, not captured",
            "Tag every service event with programme, funder and eligibility at the point of delivery",
            "Code expenditure to the funding source at entry rather than reallocating later",
            "Most of what is needed is already inside nonprofit-priced Microsoft 365 licensing",
            "Programme capacity becomes visible before over-commitment, not after"
        ],
        content: `<p class="stand">Every quarter, in most grant-funded organizations, two or three of the most capable people stop doing the mission and start assembling a report. They pull expenditure from finance, service delivery from a programme database, outcomes from a spreadsheet, and photographs from somebody's phone.</p>
<p>The report is usually excellent. The process is the problem, and it repeats four times a year.</p>
<h2>The structural cause</h2>
<p>Grant conditions are known in advance. What gets collected during delivery is decided by whoever designed the intake form, usually before the grant existed. So the evidence a funder wants and the data a programme captures are related but not aligned, and somebody bridges the gap manually every quarter.</p>
<p>The fix is not a better reporting tool. It is capturing the funder's requirement at the point of service delivery.</p>
<h2>What that looks like in practice</h2>
<p>Every service event tagged with its programme, its funding source and the eligibility criteria that qualified it — at the moment it is recorded, by the person recording it.</p>
<ul>
<li><svg><use href="#i-check"/></svg><span>Structured intake that captures funder-required fields as part of normal delivery</span></li>
<li><svg><use href="#i-check"/></svg><span>Expenditure coded to the funding source at entry rather than reallocated later</span></li>
<li><svg><use href="#i-check"/></svg><span>Outcome measures designed into the service record, not added at reporting time</span></li>
<li><svg><use href="#i-check"/></svg><span>Supporting documents filed to the programme with metadata, not to a personal drive</span></li>
<li><svg><use href="#i-check"/></svg><span>A report pack generated from live data with drill-through to the underlying record</span></li>
</ul>
<h2>Why SharePoint rather than a bespoke system</h2>
<p>Most nonprofits already hold Microsoft 365 at nonprofit pricing, and a substantial share of what is needed here — structured lists, document libraries with metadata, retention, approval flows and Power BI reporting — is included in that.</p>
<p>Building this on entitlements you already own means the project cost is consulting time rather than consulting time plus a new subscription. For an organization judged on its overhead ratio, that distinction is not a detail.</p>
<h2>What changes for the executive director</h2>
<p>Quarterly reporting stops being a project. Programme managers can see remaining grant capacity before over-committing rather than after. And audit evidence exists continuously, which turns the annual audit from an event into a routine.</p>
<p>The staff time recovered is the headline number. The reduced anxiety about whether the figures reconcile is the one people actually mention afterwards.</p>
<div class="pull">
<h4>What to take away</h4>
<ul>
<li><svg><use href="#i-check"/></svg><span>Grant reporting is slow because evidence is assembled, not captured</span></li>
<li><svg><use href="#i-check"/></svg><span>Tag every service event with programme, funder and eligibility at the point of delivery</span></li>
<li><svg><use href="#i-check"/></svg><span>Code expenditure to the funding source at entry rather than reallocating later</span></li>
<li><svg><use href="#i-check"/></svg><span>Most of what is needed is already inside nonprofit-priced Microsoft 365 licensing</span></li>
<li><svg><use href="#i-check"/></svg><span>Programme capacity becomes visible before over-commitment, not after</span></li>
</ul>
</div>
<h2>Where to go from here</h2>
<p>Tell us about one programme and its funder requirements. We will show you what capturing that evidence at delivery would look like, using licensing you already hold.</p>`
    },

    // 9. Records Retention - Public Sector
    {
        platform: "sharepoint",
        service: "modern-work-automation",
        industry: "public-sector",
        title: "Retention that actually deletes something",
        description: "Most agencies have a documented retention schedule and, in practice, delete nothing. The consequences arrive with the next public records request.",
        publishedAt: new Date("2026-05-26"),
        readTime: "8 min read",
        type: "Best practices",
        icon: "docs",
        slug: "records-retention-public-sector-sharepoint",
        takeaways: [
            "Retention fails because individual deletion decisions are personally risky and collectively necessary",
            "Automate labelling by location and content type; do not ask users to classify",
            "Trigger on events rather than dates — case closure, contract end, departure",
            "Lead the business case with disclosure scope, not storage cost",
            "Retention is a prerequisite for defensible AI adoption, not a follow-up"
        ],
        content: `<p class="stand">There is a specific moment in every public records request where somebody realises the scope includes fifteen years of material that should have been disposed of a decade ago. The request is still valid. The material is still discoverable. And now it all has to be reviewed.</p>
<p>The retention schedule said seven years. Nothing enforced it.</p>
<h2>Why schedules do not get applied</h2>
<p>Because applying them requires a decision that nobody wants to make individually. Deleting a record is irreversible, the person who created it has usually left, and the downside of keeping something is diffuse while the downside of deleting something needed is immediate and personal.</p>
<p>So the rational individual choice is always to keep it, and the collective result is an estate that grows indefinitely and becomes a liability in every disclosure exercise.</p>
<h2>Designing so the decision is easy</h2>
<p>The trick is to remove the individual judgement and replace it with a policy plus a review step.</p>
<ul>
<li><svg><use href="#i-check"/></svg><span>Apply retention labels automatically by location and content type, not by asking users to classify</span></li>
<li><svg><use href="#i-check"/></svg><span>Use disposition review so deletion is confirmed by a records officer rather than happening silently</span></li>
<li><svg><use href="#i-check"/></svg><span>Trigger retention on an event — case closure, contract end, employee departure — rather than on a calendar date</span></li>
<li><svg><use href="#i-check"/></svg><span>Keep the label count small; a scheme with fifteen labels will be applied incorrectly</span></li>
<li><svg><use href="#i-check"/></svg><span>Log every disposition decision so the deletion itself is defensible</span></li>
</ul>
<h2>The disclosure benefit is the one to lead with</h2>
<p>Storage cost falls, which is worth mentioning and rarely persuades anyone. The argument that lands with agency leadership is different: a public records request scoped against a properly disposed estate is a fraction of the work.</p>
<p>One agency we worked with reduced its response time from weeks to days purely because there was dramatically less material in scope. Nothing about the review process changed.</p>
<h2>Where this connects to everything else</h2>
<p>Retention is also the control that makes AI adoption defensible. An assistant that can reason across your content will reason across material you should have deleted, including drafts and superseded versions.</p>
<p>Agencies planning Copilot deployment tend to discover retention as a prerequisite. It is considerably easier to design first.</p>
<div class="pull">
<h4>What to take away</h4>
<ul>
<li><svg><use href="#i-check"/></svg><span>Retention fails because individual deletion decisions are personally risky and collectively necessary</span></li>
<li><svg><use href="#i-check"/></svg><span>Automate labelling by location and content type; do not ask users to classify</span></li>
<li><svg><use href="#i-check"/></svg><span>Trigger on events rather than dates — case closure, contract end, departure</span></li>
<li><svg><use href="#i-check"/></svg><span>Lead the business case with disclosure scope, not storage cost</span></li>
<li><svg><use href="#i-check"/></svg><span>Retention is a prerequisite for defensible AI adoption, not a follow-up</span></li>
</ul>
</div>
<h2>Where to go from here</h2>
<p>We will run a scoped retention review against one department's content estate, including what a records request would currently pull in and what it would pull in afterwards.</p>`
    },

    // 10. Machine Data - Manufacturing
    {
        platform: "fabric",
        service: "data-ai-integration",
        industry: "manufacturing",
        title: "Joining machine data to the ledger",
        description: "The plant generates enormous quantities of data and almost none of it reaches the person deciding whether to accept an order at a given price.",
        publishedAt: new Date("2026-05-18"),
        readTime: "9 min read",
        type: "Solutions",
        icon: "chart",
        slug: "machine-data-to-ledger-manufacturing-fabric",
        takeaways: [
            "The plant already knows things the business systems do not — this is an integration gap",
            "OneLake lets telemetry and ERP transactions be queried together without duplicate copies",
            "Build one question end to end before building a platform",
            "Agree metric definitions with operations and finance jointly, before engineering",
            "Watch consumption cost from the first workload, not after the first invoice"
        ],
        content: `<p class="stand">Walk a modern plant and you will find run time, downtime, scrap, yield and operator activity being captured continuously. Walk into the finance meeting and you will find none of it.</p>
<p>Both facts are well known inside the business. What is less well understood is that closing the gap is now a data architecture problem rather than an equipment problem.</p>
<h2>Why the two worlds stayed separate</h2>
<p>Operational technology and business systems were built by different teams, on different timescales, for different questions. The MES answers 'what happened at this machine'. The ERP answers 'what did we earn'. Nobody built the layer that answers 'what did this machine's downtime cost us'.</p>
<p>Historically, building it meant a data warehouse project with a two-year horizon and a dedicated team. That is the part that has changed.</p>
<h2>What Fabric changes structurally</h2>
<p>One logical data lake for the whole organization, with workloads reading the same copy rather than each maintaining its own extract. Machine telemetry lands alongside ERP transactions in OneLake, in open table formats, and both are queryable together.</p>
<p>Real-time intelligence handles the operational stream where latency matters; the batch analytics handle the rest. Power BI reads it directly through Direct Lake without an import step, which removes the refresh window that used to make plant reporting stale by the time anyone read it.</p>
<h2>The sequence that produces value early</h2>
<p>Do not build the platform. Build one question end to end, then the next.</p>
<ul>
<li><svg><use href="#i-check"/></svg><span>Pick a question with a decision attached — 'which product families are we losing margin on' beats 'let us see all the data'</span></li>
<li><svg><use href="#i-check"/></svg><span>Agree the metric definitions with operations and finance together, before anything is engineered</span></li>
<li><svg><use href="#i-check"/></svg><span>Ingest only the sources that question needs, using shortcuts to reference data in place where copying is unnecessary</span></li>
<li><svg><use href="#i-check"/></svg><span>Deliver through to a report somebody actually uses before starting the second question</span></li>
<li><svg><use href="#i-check"/></svg><span>Instrument capacity cost from the first workload; consumption-based compute behaves differently from licensed software</span></li>
</ul>
<h2>The conversation this enables</h2>
<p>Once plant performance and product margin appear in the same view, the improvement conversation changes character. Operations stops arguing that its efficiency work is valuable and starts demonstrating where it landed in the accounts.</p>
<p>That is worth more than the reporting. It aligns two functions that, in most manufacturers, have spent years politely disagreeing about whose numbers are right.</p>
<h2>A note on writing back</h2>
<p>Reading machine data to inform planning and costing is straightforward and valuable. Writing back to anything that controls a machine is a different risk class entirely.</p>
<p>We are deliberately conservative about that boundary, and we will say so when a proposal has crossed it.</p>
<div class="pull">
<h4>What to take away</h4>
<ul>
<li><svg><use href="#i-check"/></svg><span>The plant already knows things the business systems do not — this is an integration gap</span></li>
<li><svg><use href="#i-check"/></svg><span>OneLake lets telemetry and ERP transactions be queried together without duplicate copies</span></li>
<li><svg><use href="#i-check"/></svg><span>Build one question end to end before building a platform</span></li>
<li><svg><use href="#i-check"/></svg><span>Agree metric definitions with operations and finance jointly, before engineering</span></li>
<li><svg><use href="#i-check"/></svg><span>Watch consumption cost from the first workload, not after the first invoice</span></li>
</ul>
</div>
<h2>Where to go from here</h2>
<p>Pick one measure your operations and finance teams currently disagree about. We will build the pipeline and semantic model for that single measure and show you the number with full lineage.</p>`
    },

    // 11. Forecast - Professional Services
    {
        platform: "d365-sales",
        service: "business-applications",
        industry: "professional-services",
        title: "If your forecast is negotiated, it is not a forecast",
        description: "The weekly pipeline meeting where numbers get adjusted by discussion is not forecasting. It is a confidence poll, and it is why variance is never explainable.",
        publishedAt: new Date("2026-05-11"),
        readTime: "8 min read",
        type: "Challenges",
        icon: "sales",
        slug: "forecast-negotiated-professional-services-sales",
        takeaways: [
            "A negotiated number cannot produce explainable variance",
            "Design for the seller; the reporting quality follows from the data quality",
            "Justify every mandatory field individually — each one is a tax on accuracy",
            "Treat pipeline as a resource demand forecast, not only a revenue forecast",
            "Agentic selling makes basic CRM discipline more valuable, not less"
        ],
        content: `<p class="stand">Ask a services firm how the forecast is produced and you will often hear a description of a meeting. Somebody presents, others push back, a number is agreed.</p>
<p>It is a reasonable process for a group of experienced people. It is not a forecast, and the giveaway is that nobody can explain the variance afterwards.</p>
<h2>Why CRM data degrades in services firms</h2>
<p>The system was configured to satisfy management reporting rather than to help the person selling. Required fields exist because a report needs them. So they get filled in at the last possible moment with the least possible thought, and the forecast is built on that.</p>
<p>Once the data is known to be poor, the meeting becomes necessary — which further reduces the incentive to maintain the data. It is a stable and expensive equilibrium.</p>
<h2>Breaking it from the seller's end</h2>
<p>The only durable fix is making the system useful to the person entering the data. In practice that means three things.</p>
<ul>
<li><svg><use href="#i-check"/></svg><span>Activity captured automatically from Outlook and Teams rather than typed in afterwards</span></li>
<li><svg><use href="#i-check"/></svg><span>Mandatory fields justified individually — we routinely reduce a firm's list from nineteen to six</span></li>
<li><svg><use href="#i-check"/></svg><span>The sales process configured around how the firm genuinely sells, including where practices differ</span></li>
<li><svg><use href="#i-check"/></svg><span>Relationship intelligence surfacing who actually knows a contact, before an approach is made</span></li>
<li><svg><use href="#i-check"/></svg><span>Pipeline that carries the skills and dates it will require, so resourcing can see it</span></li>
</ul>
<h2>The resourcing connection nobody instruments</h2>
<p>In a services firm, pipeline is not just a revenue forecast. It is a resource demand forecast, and treating it as the first without the second is why sales commits to start dates delivery cannot meet.</p>
<p>Opportunities that carry their required skills and dates let resourcing plan against probable work rather than confirmed work only. That single change tends to produce more measurable value than the forecast accuracy improvement it comes with.</p>
<h2>Where the platform is going</h2>
<p>Microsoft's current direction for Dynamics 365 Sales is agentic: research conducted across CRM data and external sources, records enriched automatically, next actions recommended rather than requested.</p>
<p>This raises rather than lowers the value of basic data discipline. An agent reasoning over a pipeline of placeholder values will produce confident recommendations built on nothing. The firms that benefit will be the ones whose data was already worth reasoning over.</p>
<h2>What manager behaviour decides</h2>
<p>More than any configuration choice. If pipeline reviews are run from a spreadsheet, sellers correctly conclude the CRM does not matter.</p>
<p>We train managers before we train sellers, for exactly this reason.</p>
<div class="pull">
<h4>What to take away</h4>
<ul>
<li><svg><use href="#i-check"/></svg><span>A negotiated number cannot produce explainable variance</span></li>
<li><svg><use href="#i-check"/></svg><span>Design for the seller; the reporting quality follows from the data quality</span></li>
<li><svg><use href="#i-check"/></svg><span>Justify every mandatory field individually — each one is a tax on accuracy</span></li>
<li><svg><use href="#i-check"/></svg><span>Treat pipeline as a resource demand forecast, not only a revenue forecast</span></li>
<li><svg><use href="#i-check"/></svg><span>Agentic selling makes basic CRM discipline more valuable, not less</span></li>
</ul>
</div>
<h2>Where to go from here</h2>
<p>Describe how a deal actually moves through your firm and we will configure a demo around that process, then put it in front of the sellers who would have to use it.</p>`
    },

    // 12. Early Alert - Education
    {
        platform: "fabric",
        service: "data-ai-integration",
        industry: "education",
        title: "Early alert signals that reach an advisor in time",
        description: "Retention programmes fail for a reason that has nothing to do with signal quality. Nobody owns the alert.",
        publishedAt: new Date("2026-05-04"),
        readTime: "8 min read",
        type: "Solutions",
        icon: "chart",
        slug: "early-alert-education-fabric",
        takeaways: [
            "Early alert programmes fail on routing and ownership, not on signal quality",
            "Every alert needs a named advisor, not a dashboard or a team inbox",
            "Record the intervention and its outcome, or the institution never learns",
            "Unify the data properly so a flag can be traced back to source",
            "Measure across a full academic cycle; one semester is noise"
        ],
        content: `<p class="stand">Institutions know a great deal about their students. Attendance, engagement with the learning platform, financial holds, early assessment performance — all of it captured, all of it in separate systems.</p>
<p>The pattern that predicts withdrawal is visible in hindsight in almost every case. The question is only whether anybody saw it while there was still time.</p>
<h2>The failure is routing, not detection</h2>
<p>Most early alert projects concentrate on the model — which signals predict risk, how to weight them, what threshold to use. This is the interesting part and it is rarely where the programme fails.</p>
<p>It fails when the alert arrives in a dashboard nobody has a reason to open, or reaches an advisor who has no capacity to act, or produces an intervention nobody records so the institution never learns what worked.</p>
<h2>Designing the loop so it closes</h2>
<p>Four components, and the last two are the ones usually missing.</p>
<ul>
<li><svg><use href="#i-check"/></svg><span><strong>Signals combined</strong> — academic, financial and engagement data in one view rather than three systems</span></li>
<li><svg><use href="#i-check"/></svg><span><strong>A named owner</strong> — every alert routed to a specific advisor, not to a team inbox or a report</span></li>
<li><svg><use href="#i-check"/></svg><span><strong>An intervention record</strong> — what was tried, by whom, and what happened</span></li>
<li><svg><use href="#i-check"/></svg><span><strong>Effectiveness reporting</strong> — so the institution learns which interventions actually change outcomes</span></li>
</ul>
<h2>Why the data foundation matters here</h2>
<p>Unifying student data across the student information system, the learning platform, finance and engagement tools is the unglamorous majority of this work. Fabric handles it by putting the sources into one governed layer rather than building four extracts that drift.</p>
<p>The advantage is not speed. It is that when an advisor questions why a student was flagged, the answer is traceable back to source rather than asserted by a model nobody can inspect.</p>
<h2>Measure across a full cycle</h2>
<p>Education outcomes are seasonal. Anyone claiming a retention result after one semester is measuring noise, and any partner who does not tell you that is either inexperienced or hoping you will not notice.</p>
<p>We baseline from institutional research data and measure across a full year before drawing conclusions. It is slower and it is the only version a cabinet will accept twice.</p>
<h2>The access question</h2>
<p>Student data carries specific obligations. Legitimate educational interest has to be enforced through security roles rather than asserted in a policy document, and the access model should be designed before the first dashboard is built rather than retrofitted after a registrar raises it.</p>
<div class="pull">
<h4>What to take away</h4>
<ul>
<li><svg><use href="#i-check"/></svg><span>Early alert programmes fail on routing and ownership, not on signal quality</span></li>
<li><svg><use href="#i-check"/></svg><span>Every alert needs a named advisor, not a dashboard or a team inbox</span></li>
<li><svg><use href="#i-check"/></svg><span>Record the intervention and its outcome, or the institution never learns</span></li>
<li><svg><use href="#i-check"/></svg><span>Unify the data properly so a flag can be traced back to source</span></li>
<li><svg><use href="#i-check"/></svg><span>Measure across a full academic cycle; one semester is noise</span></li>
</ul>
</div>
<h2>Where to go from here</h2>
<p>We will map your current signal sources and show what a combined advisor view would look like, including how the access model would satisfy your registrar.</p>`
    },

    // 13. Quoting from Stock - Retail
    {
        platform: "d365-sales",
        service: "business-applications",
        industry: "retail-distribution",
        title: "Quoting from stock you actually have",
        description: "Available-to-promise calculated from a nightly snapshot is not availability. It is a guess that the sales desk is contractually committing to.",
        publishedAt: new Date("2026-04-27"),
        readTime: "7 min read",
        type: "Features",
        icon: "sales",
        slug: "quoting-live-availability-retail-sales",
        takeaways: [
            "On-hand stock is not availability — committed, allocated and in-transit all matter",
            "One overselling incident costs the margin on several good orders",
            "Fix the promise at the point of quote; downstream improvements cannot repair it",
            "Share one inventory pool across every channel rather than syncing copies",
            "Count post-acceptance interventions; it is the measure nobody tracks"
        ],
        content: `<p class="stand">A customer asks whether you have forty units. The sales desk checks a number, says yes, and the order is accepted. The warehouse discovers on Thursday that eighteen of those units were committed to another order on Tuesday.</p>
<p>Everyone involved behaved correctly. The number was wrong before anybody looked at it.</p>
<h2>What availability has to account for</h2>
<p>On hand is the easy part and the part most systems show. Real availability is on hand, minus committed, minus allocated, plus inbound within the promise window, across every location including stock in transit.</p>
<p>A distributor quoting from on-hand alone will oversell whenever demand is concentrated — which is to say, on exactly the lines that matter.</p>
<h2>The cost of getting it wrong compounds</h2>
<p>A single overselling incident is not one cost. It is the expedited freight to cover the shortfall, the partial shipment and its administration, the credit note, the customer call, and the goodwill nobody puts a number on.</p>
<p>In thin-margin distribution, one of these consumes the profit on several good orders. It is worth calculating your own figure before deciding this is a minor problem.</p>
<h2>Connecting the quote to the truth</h2>
<p>The fix is architectural rather than procedural. Quoting has to read live availability rather than a periodic copy.</p>
<ul>
<li><svg><use href="#i-check"/></svg><span>One inventory pool shared by every channel — desk, web, EDI and store</span></li>
<li><svg><use href="#i-check"/></svg><span>Available-to-promise that includes committed, allocated and in-transit quantities</span></li>
<li><svg><use href="#i-check"/></svg><span>Contract pricing applied automatically so quotes are correct as well as deliverable</span></li>
<li><svg><use href="#i-check"/></svg><span>Fulfilment routed by cost and proximity, not by the channel that took the order</span></li>
<li><svg><use href="#i-check"/></svg><span>Substitution suggested at the point of quote rather than discovered at pick</span></li>
</ul>
<h2>Why the sales desk is the right place to start</h2>
<p>Because it is where the promise is made. Improvements downstream — better picking, faster replenishment — help, but they cannot repair a commitment that was wrong when it was given.</p>
<p>Connecting Dynamics 365 Sales to live availability and contract pricing changes the quality of the promise, and everything downstream inherits that.</p>
<h2>What to measure</h2>
<p>Fill rate and order accuracy are the obvious ones. The more revealing measure is the number of orders that required an intervention after acceptance — a short shipment, a substitution, an expedite, a credit.</p>
<p>Most distributors have never counted it. The number is usually higher than expected and it drops fast.</p>
<div class="pull">
<h4>What to take away</h4>
<ul>
<li><svg><use href="#i-check"/></svg><span>On-hand stock is not availability — committed, allocated and in-transit all matter</span></li>
<li><svg><use href="#i-check"/></svg><span>One overselling incident costs the margin on several good orders</span></li>
<li><svg><use href="#i-check"/></svg><span>Fix the promise at the point of quote; downstream improvements cannot repair it</span></li>
<li><svg><use href="#i-check"/></svg><span>Share one inventory pool across every channel rather than syncing copies</span></li>
<li><svg><use href="#i-check"/></svg><span>Count post-acceptance interventions; it is the measure nobody tracks</span></li>
</ul>
</div>
<h2>Where to go from here</h2>
<p>Send us an anonymised order file and your pricing rules for one customer segment, and we will demonstrate quoting against live availability using your product data.</p>`
    },

    // 14. Core Modernisation - Financial Services
    {
        platform: "azure",
        service: "strategy-transformation",
        industry: "financial-services",
        title: "Modernising around a core you are not going to replace",
        description: "Banking cores are decades old for defensible reasons. The interesting question is how much modern experience you can build without touching the middle.",
        publishedAt: new Date("2026-04-20"),
        readTime: "9 min read",
        type: "Future readiness",
        icon: "cloud",
        slug: "core-modernisation-financial-services-azure",
        takeaways: [
            "Customer experience does not have to live in the core, and mostly should not",
            "Build interfaces that are monitored, re-runnable and reconcilable from day one",
            "Guard against the experience layer becoming a second system of record",
            "Design for AI workloads now if they are on the three-year plan",
            "Decouple the modernisation conversation from the core replacement decision"
        ],
        content: `<p class="stand">Every few years a core replacement gets proposed, costed, and quietly deferred. The reasoning is usually sound: the risk is enormous, the horizon is multi-year, and the institution has more pressing problems.</p>
<p>What is less often examined is how much of the pressing problem could be solved without the replacement at all.</p>
<h2>What the core is actually good at</h2>
<p>Processing transactions correctly, at volume, with an audit trail, for decades. That is not nothing, and it is the reason these systems survive replacement cycles.</p>
<p>What they are poor at is everything a customer experiences: onboarding, servicing, communication, self-service and the relationship view that spans products. None of that has to live in the core, and in most institutions it partly does for historical reasons.</p>
<h2>The pattern that works</h2>
<p>Leave the system of record alone. Build the experience layer beside it on Azure, and integrate deliberately.</p>
<ul>
<li><svg><use href="#i-check"/></svg><span>Interfaces that are monitored, re-runnable and reconcilable — not fire-and-forget</span></li>
<li><svg><use href="#i-check"/></svg><span>A documented contract for every field that crosses the boundary</span></li>
<li><svg><use href="#i-check"/></svg><span>Read paths optimised separately from write paths, so customer-facing performance is not hostage to batch windows</span></li>
<li><svg><use href="#i-check"/></svg><span>An event-based approach where the core supports it, polling where it does not, and honesty about which you have</span></li>
<li><svg><use href="#i-check"/></svg><span>Reconciliation built into the interface design, because finance will not trust what it cannot reconcile</span></li>
</ul>
<h2>Where the architecture usually goes wrong</h2>
<p>Two failure modes, both common. The first is treating integration as a point-to-point problem and ending up with forty bespoke interfaces nobody can change. The second is building an experience layer that quietly becomes a second system of record, holding data that diverges from the core.</p>
<p>Both are avoidable with design decisions made early. Both are extremely expensive to unwind later.</p>
<h2>The AI dimension changes the calculation</h2>
<p>Azure is increasingly where institutions run AI workloads against their own data, and that raises the requirements on the estate underneath — network design, identity, data governance and residency.</p>
<p>An estate built purely for lift-and-shift hosting usually needs rework before it can support that safely. If AI is anywhere on your three-year plan, designing for it now is materially cheaper than retrofitting.</p>
<h2>What to tell the board</h2>
<p>That core replacement remains a strategic decision with its own business case, and that deferring it does not mean deferring modernisation.</p>
<p>The institutions that have handled this well decoupled the two conversations. The ones that struggled treated every customer experience improvement as contingent on a replacement that kept slipping.</p>
<div class="pull">
<h4>What to take away</h4>
<ul>
<li><svg><use href="#i-check"/></svg><span>Customer experience does not have to live in the core, and mostly should not</span></li>
<li><svg><use href="#i-check"/></svg><span>Build interfaces that are monitored, re-runnable and reconcilable from day one</span></li>
<li><svg><use href="#i-check"/></svg><span>Guard against the experience layer becoming a second system of record</span></li>
<li><svg><use href="#i-check"/></svg><span>Design for AI workloads now if they are on the three-year plan</span></li>
<li><svg><use href="#i-check"/></svg><span>Decouple the modernisation conversation from the core replacement decision</span></li>
</ul>
</div>
<h2>Where to go from here</h2>
<p>We will assess your current integration estate and produce a modernisation sequence that does not depend on a core decision — including where we think the core genuinely is the constraint.</p>`
    },

    // 15. Shared Devices - Education
    {
        platform: "intune",
        service: "managed-it-security",
        industry: "education",
        title: "Shared devices, exam mode, and a student body testing your controls",
        description: "Managing endpoints in education is unlike any other sector, because a portion of your user base treats your configuration as a challenge.",
        publishedAt: new Date("2026-04-13"),
        readTime: "8 min read",
        type: "How-to guide",
        icon: "device",
        slug: "shared-devices-education-intune",
        takeaways: [
            "Design three separate configurations: staff, shared student, and personal devices",
            "Never let an exam configuration apply for the first time on exam day",
            "Time a device replacement end to end; it exposes the real constraint",
            "Sequence cloud-native migration around hardware refresh, not as an event",
            "Put your hardest cases in the pilot group, not your most cooperative ones"
        ],
        content: `<p class="stand">Corporate endpoint management assumes users who want the device to work. Education cannot assume that. Some proportion of your users have time, curiosity and a genuine interest in finding out what your policy does not cover.</p>
<p>This is not a reason to lock everything down. It is a reason to design as though the configuration will be probed, because it will be.</p>
<h2>Three device populations, three designs</h2>
<p>Institutions routinely try to run one configuration across all of them and end up with a policy that is too restrictive for staff and too permissive for shared labs.</p>
<ul>
<li><svg><use href="#i-check"/></svg><span><strong>Staff devices</strong> — assigned, trusted, managed like a corporate estate with conditional access and compliance policy</span></li>
<li><svg><use href="#i-check"/></svg><span><strong>Shared student devices</strong> — fast user switching, no local state, aggressive cleanup between sessions, kiosk configurations where the use case is narrow</span></li>
<li><svg><use href="#i-check"/></svg><span><strong>Personal devices</strong> — unmanaged hardware reaching institutional data, handled with app protection rather than device management</span></li>
</ul>
<h2>The exam problem specifically</h2>
<p>Assessment configurations are the highest-stakes endpoint work an institution does, and they are also the most time-boxed. A policy that half-applies on the morning of an exam is a genuine crisis.</p>
<p>The practical protections are unglamorous: deploy the configuration well ahead, verify on the actual hardware in the actual room, have a documented fallback, and never rely on a policy applying for the first time on the day.</p>
<h2>Provisioning is where the hours go</h2>
<p>A large institution replaces or rebuilds devices constantly, and doing it by hand consumes a skilled team. Autopilot registration handled at the point of purchase means devices arrive ready, including for students receiving loan equipment.</p>
<p>The test is straightforward. Time a replacement from unboxing to a working, compliant device. If the answer is measured in days, the provisioning process is the constraint rather than the budget.</p>
<h2>Where cloud-native helps and where it does not</h2>
<p>Microsoft's direction is unambiguous: Entra join rather than domain join, policy from Intune rather than group policy, security signal into Defender. For a distributed institution with students working from anywhere, that removes the VPN dependency that makes traditional management painful.</p>
<p>It does not remove the need for a plan. Institutions running co-management alongside a legacy Configuration Manager estate should sequence the transition around hardware refresh rather than attempting it as an event.</p>
<h2>Include the awkward cases in the pilot</h2>
<p>The design lab with specialist software. The lecturer who travels constantly. The shared workstation in a room with poor connectivity. A pilot made up of cooperative office staff proves nothing you need to know.</p>
<div class="pull">
<h4>What to take away</h4>
<ul>
<li><svg><use href="#i-check"/></svg><span>Design three separate configurations: staff, shared student, and personal devices</span></li>
<li><svg><use href="#i-check"/></svg><span>Never let an exam configuration apply for the first time on exam day</span></li>
<li><svg><use href="#i-check"/></svg><span>Time a device replacement end to end; it exposes the real constraint</span></li>
<li><svg><use href="#i-check"/></svg><span>Sequence cloud-native migration around hardware refresh, not as an event</span></li>
<li><svg><use href="#i-check"/></svg><span>Put your hardest cases in the pilot group, not your most cooperative ones</span></li>
</ul>
</div>
<h2>Where to go from here</h2>
<p>Give us one hardware model and your application list and we will build an Autopilot profile for it, then demonstrate a device going from sealed box to compliant and usable.</p>`
    },

    // 16. Cost to Serve - Retail
    {
        platform: "power-bi",
        service: "data-ai-integration",
        industry: "retail-distribution",
        title: "Cost to serve: the number that changes which customers you want",
        description: "Gross margin by product is known in every distribution business. Cost to serve by customer is known in very few, and it is the more decision-useful number.",
        publishedAt: new Date("2026-04-06"),
        readTime: "9 min read",
        type: "How-to guide",
        icon: "chart",
        slug: "cost-to-serve-retail-power-bi",
        takeaways: [
            "Cost to serve is everything between order and cash that is not cost of goods",
            "Use activity drivers people recognise over a precise model they dispute",
            "Publish the drivers alongside the result so the score is explicable",
            "Expect to find healthy-looking accounts consuming disproportionate resource",
            "Act through terms, minimums and channels before considering price"
        ],
        content: `<p class="stand">Every distributor can rank customers by revenue. Most can rank them by gross margin. Almost none can rank them by what it actually costs to serve them, which is the ranking that should drive commercial decisions.</p>
<p>The gap is not analytical sophistication. It is that the cost data sits in five places and nobody has been asked to join it up.</p>
<h2>What cost to serve includes</h2>
<p>Everything between the order and the cash that is not the cost of the goods.</p>
<ul>
<li><svg><use href="#i-check"/></svg><span>Order handling — small orders cost nearly as much to process as large ones</span></li>
<li><svg><use href="#i-check"/></svg><span>Picking and packing complexity, including special handling and custom labelling</span></li>
<li><svg><use href="#i-check"/></svg><span>Freight, particularly where a customer requires split deliveries or expedited shipping</span></li>
<li><svg><use href="#i-check"/></svg><span>Returns and credits, which concentrate heavily in a small number of accounts</span></li>
<li><svg><use href="#i-check"/></svg><span>Payment terms and collection effort, which are a real cost of capital</span></li>
<li><svg><use href="#i-check"/></svg><span>Account management time, which is the hardest to allocate and often the largest</span></li>
</ul>
<h2>Building a model the business will accept</h2>
<p>The technical build is not the difficult part. Getting the commercial team to accept the allocation basis is.</p>
<p>Our advice is to be conservative and transparent. Use activity drivers people recognise — number of order lines, number of deliveries, number of returns — rather than a sophisticated model nobody can follow. A defensible approximation that sales trusts beats a precise model they dispute.</p>
<p>Publish the drivers alongside the result so anybody can see why an account scored as it did.</p>
<h2>What the model usually reveals</h2>
<p>Two things, reliably. A group of accounts that look healthy on gross margin and consume disproportionate resource. And a group of small accounts that are quietly excellent because they order predictably and never call.</p>
<p>Neither is actionable in isolation. The point is that the conversation shifts from 'grow revenue' to 'grow the right revenue', which is a different and considerably more valuable discussion.</p>
<h2>How to act on it without losing accounts</h2>
<p>Not by firing customers. In our experience the productive responses are ordering minimums, delivery consolidation, a change to payment terms, a self-service channel for routine orders, or a straightforward price adjustment with the reasoning explained.</p>
<p>Most customers who are expensive to serve do not know they are, and a proportion will change behaviour when asked.</p>
<h2>The Power BI dimension</h2>
<p>This is a good first workload for a governed semantic model, because the definitions are contested and the value of settling them is obvious. Build it once, with row-level security so account managers see their own book, and the argument about whose number is right stops.</p>
<div class="pull">
<h4>What to take away</h4>
<ul>
<li><svg><use href="#i-check"/></svg><span>Cost to serve is everything between order and cash that is not cost of goods</span></li>
<li><svg><use href="#i-check"/></svg><span>Use activity drivers people recognise over a precise model they dispute</span></li>
<li><svg><use href="#i-check"/></svg><span>Publish the drivers alongside the result so the score is explicable</span></li>
<li><svg><use href="#i-check"/></svg><span>Expect to find healthy-looking accounts consuming disproportionate resource</span></li>
<li><svg><use href="#i-check"/></svg><span>Act through terms, minimums and channels before considering price</span></li>
</ul>
</div>
<h2>Where to go from here</h2>
<p>We will build a cost-to-serve model against one customer segment using data you already have, and show it to your commercial team before you commit to anything.</p>`
    },

    // 17. Vehicle Devices - Construction
    {
        platform: "intune",
        service: "managed-it-security",
        industry: "construction-field-services",
        title: "Devices that live in vehicles",
        description: "Field endpoint management fails on assumptions made in an office: reliable connectivity, a desk, and a user who will wait for a progress bar.",
        publishedAt: new Date("2026-03-30"),
        readTime: "7 min read",
        type: "Best practices",
        icon: "device",
        slug: "vehicle-devices-construction-intune",
        takeaways: [
            "Field policy must survive no connectivity, gloves, sunlight and impatience",
            "Compliance evaluation should tolerate delay rather than require immediate check-in",
            "Devices left in vehicles change the encryption and remote wipe requirement",
            "Match support hours to crew hours, not to office hours",
            "Count tickets raised before the office opens; it exposes the coverage gap"
        ],
        content: `<p class="stand">A tablet that lives in a van has a different life to a laptop that lives on a desk. It gets dropped, it gets used in sunlight with gloves on, it spends hours with no signal, and it is operated by somebody who wants to be back in the truck.</p>
<p>Endpoint policies designed for the office arrive on that device and quietly stop being followed.</p>
<h2>The four assumptions that break</h2>
<p>Each of these is reasonable in a corporate estate and wrong in the field.</p>
<ul>
<li><svg><use href="#i-check"/></svg><span><strong>Connectivity</strong> — basements, plant rooms and rural sites have none, and policy that requires a connection to apply will not apply</span></li>
<li><svg><use href="#i-check"/></svg><span><strong>Patience</strong> — a compliance check that adds ninety seconds to sign-in will be worked around within a fortnight</span></li>
<li><svg><use href="#i-check"/></svg><span><strong>Physical security</strong> — devices are left in vehicles overnight, which changes the encryption and remote wipe requirements</span></li>
<li><svg><use href="#i-check"/></svg><span><strong>Support hours</strong> — crews start before the office does, so a device failing at six in the morning stops a day of billable work</span></li>
</ul>
<h2>Designing for the reality</h2>
<p>Cellular-capable devices where the work justifies it, and offline-tolerant policy where it does not. Compliance evaluation that works on a delay rather than requiring immediate check-in. Encryption verified continuously and remote wipe tested rather than assumed.</p>
<p>And enrolment that does not require a visit to head office. A field technician should be able to receive a replacement device at home and be working from it the same morning.</p>
<h2>The support window question</h2>
<p>This is the one most organizations get wrong, and it is a commercial decision rather than a technical one. If crews start at six, a service desk starting at nine is three hours of exposure every day.</p>
<p>Follow-the-sun coverage handles this without paying for an on-call rota, because somebody in another region is at their desk working a normal shift. It is worth checking what your current arrangement actually delivers at six in the morning rather than what it says on the contract.</p>
<h2>What to measure</h2>
<p>Provisioning time from unboxing to productive. Encryption coverage, verified rather than reported. Patch compliance within an agreed window. And the number of tickets that arrive before the office opens — which is the one that tells you whether your support model matches your workforce.</p>
<div class="pull">
<h4>What to take away</h4>
<ul>
<li><svg><use href="#i-check"/></svg><span>Field policy must survive no connectivity, gloves, sunlight and impatience</span></li>
<li><svg><use href="#i-check"/></svg><span>Compliance evaluation should tolerate delay rather than require immediate check-in</span></li>
<li><svg><use href="#i-check"/></svg><span>Devices left in vehicles change the encryption and remote wipe requirement</span></li>
<li><svg><use href="#i-check"/></svg><span>Match support hours to crew hours, not to office hours</span></li>
<li><svg><use href="#i-check"/></svg><span>Count tickets raised before the office opens; it exposes the coverage gap</span></li>
</ul>
</div>
<h2>Where to go from here</h2>
<p>We will pilot a field configuration with one crew, including your most sceptical technician, and report what they found before any wider rollout.</p>`
    },

    // 18. Cloud Skills - Public Sector
    {
        platform: "azure",
        service: "talent",
        industry: "public-sector",
        title: "Building cloud skills in an agency that cannot compete on salary",
        description: "Public sector technology teams lose people to private sector pay and cannot match it. The response that works is not a retention bonus.",
        publishedAt: new Date("2026-03-23"),
        readTime: "7 min read",
        type: "Best practices",
        icon: "cloud",
        slug: "cloud-skills-public-sector-azure",
        takeaways: [
            "Compete on scope, stability and meaning — not on the salary axis you cannot win",
            "Design an estate operable by the team size you can realistically retain",
            "Own direction internally, buy specialist depth, and make transfer contractual",
            "Ask any partner how they would hand over; vagueness is a warning",
            "A modern, well-automated estate retains engineers at the same salary"
        ],
        content: `<p class="stand">An agency trains an engineer on Azure, and eighteen months later a systems integrator hires them for a salary the agency structurally cannot offer. The obvious conclusion is that training is wasted.</p>
<p>It is the wrong conclusion, but the reasoning behind the right one takes a moment.</p>
<h2>What agencies can offer that the market cannot</h2>
<p>Scope, stability and meaning. A cloud engineer in a mid-sized agency touches identity, networking, data and security in a way that a specialist in a large consultancy does not for years. The work is visible, the mission is real, and the pace is survivable.</p>
<p>That is a genuine proposition for a particular kind of person. It is not a proposition for everyone, and the recruitment approach should reflect that rather than competing on the axis where you cannot win.</p>
<h2>Design the estate for the team you can actually staff</h2>
<p>This is the practical point most agencies miss. An architecture that requires three specialists to operate is a bad architecture for an organization that can retain one.</p>
<p>Managed services over self-managed where the trade is reasonable. Infrastructure as code so knowledge lives in a repository rather than in somebody's head. Documentation written as a deliverable rather than as an aspiration. Landing zone design that constrains what can go wrong rather than relying on operator vigilance.</p>
<h2>Buy the depth, own the direction</h2>
<p>The arrangement that works most consistently is an internal team that owns priorities, architecture decisions and the relationship, with specialist depth bought in behind them.</p>
<p>This is not outsourcing. The agency keeps the judgement and the institutional knowledge; the partner supplies the hands and the specialisms that are uneconomic to retain. Done properly it also transfers capability, which is the part to write into the contract explicitly.</p>
<h2>Make the knowledge transfer contractual</h2>
<p>Ask any partner how they would hand over. If the answer is vague, or if the documentation is theirs rather than yours, that is a lock-in arrangement described as a partnership.</p>
<p>We regard a client who no longer needs us for routine changes as a success. Agencies should expect that position from any supplier and should be sceptical of one who cannot articulate it.</p>
<h2>The retention effect nobody plans for</h2>
<p>Engineers stay longer where the work is interesting and the tooling is modern. An agency running a well-designed cloud estate with proper automation retains people better than one where the same team fights an ageing environment, at identical salaries.</p>
<p>Modernisation is a retention strategy. It rarely gets presented as one.</p>
<div class="pull">
<h4>What to take away</h4>
<ul>
<li><svg><use href="#i-check"/></svg><span>Compete on scope, stability and meaning — not on the salary axis you cannot win</span></li>
<li><svg><use href="#i-check"/></svg><span>Design an estate operable by the team size you can realistically retain</span></li>
<li><svg><use href="#i-check"/></svg><span>Own direction internally, buy specialist depth, and make transfer contractual</span></li>
<li><svg><use href="#i-check"/></svg><span>Ask any partner how they would hand over; vagueness is a warning</span></li>
<li><svg><use href="#i-check"/></svg><span>A modern, well-automated estate retains engineers at the same salary</span></li>
</ul>
</div>
<h2>Where to go from here</h2>
<p>We will review your Azure estate against the team you actually have, and tell you which parts should be simplified, which should be managed, and which your team should own outright.</p>`
    },

    // 19. Service Line Profitability - Healthcare
    {
        platform: "fabric",
        service: "data-ai-integration",
        industry: "healthcare",
        title: "Service-line profitability that clinicians and finance both accept",
        description: "Every health system produces service-line numbers. In most, the annual allocation argument consumes weeks and settles nothing.",
        publishedAt: new Date("2026-03-16"),
        readTime: "9 min read",
        type: "How-to guide",
        icon: "chart",
        slug: "service-line-profitability-healthcare-fabric",
        takeaways: [
            "The allocation dispute is about participation, not arithmetic",
            "Agree drivers with clinical and finance leadership jointly, before engineering",
            "Validate the model against a period both sides already understand",
            "Provide drill-through to the transaction, or the number will be disputed",
            "Design row-level access before publishing, not after somebody raises it"
        ],
        content: `<p class="stand">There is a meeting that happens once a year in most health systems. Finance presents service-line performance, clinical directors dispute the allocation basis, and everybody leaves having agreed nothing except that the exercise was frustrating.</p>
<p>The dispute is rarely about arithmetic. It is about a model the clinical side had no part in building.</p>
<h2>Why the allocation is contested</h2>
<p>Shared costs — theatres, imaging, pathology, overhead — have to be attributed somehow, and every method disadvantages somebody. Allocate theatre time by minutes and long complex cases look expensive. Allocate by case and short procedures look inefficient.</p>
<p>There is no neutral answer, which is exactly why the model has to be agreed rather than imposed. A defensible allocation that clinical leadership signed up to beats a technically superior one they dispute every year.</p>
<h2>Build the model with both sides in the room</h2>
<p>This is the step that determines whether the output gets used.</p>
<ul>
<li><svg><use href="#i-check"/></svg><span>Agree the allocation drivers jointly, before any engineering starts</span></li>
<li><svg><use href="#i-check"/></svg><span>Write down the reasoning for each driver, not just the driver itself</span></li>
<li><svg><use href="#i-check"/></svg><span>Show the model against a period both sides already understand, so the result can be sanity-checked</span></li>
<li><svg><use href="#i-check"/></svg><span>Provide drill-through from service-line margin to the underlying transaction</span></li>
<li><svg><use href="#i-check"/></svg><span>Publish the driver definitions alongside the numbers, permanently</span></li>
</ul>
<h2>Why the data platform matters</h2>
<p>Clinical volume sits in the EHR. Cost sits in finance. Payer performance sits in the revenue cycle system. Producing a joined view has historically meant a monthly extract exercise performed by one analyst, which is slow and — more importantly — unauditable.</p>
<p>Unifying these on a governed foundation changes both. The number arrives continuously rather than monthly, and any published figure can be traced back to source, which is what turns an internal report into something a board committee will act on.</p>
<h2>The access dimension</h2>
<p>Patient-identifiable data in an analytics platform requires deliberate design. Row-level security so a service line sees its own performance, minimum-necessary access applied through roles rather than policy, and an access log the compliance officer can actually review.</p>
<p>Design this before the first dashboard rather than after somebody notices. Retrofitting an access model onto a published semantic layer is disruptive and it always happens at the worst moment.</p>
<h2>What changes</h2>
<p>The annual argument stops. Portfolio decisions get made on a number both sides signed up to. And the clinical directors who were most sceptical tend to become the most active users, because for the first time the report reflects a model they helped build.</p>
<div class="pull">
<h4>What to take away</h4>
<ul>
<li><svg><use href="#i-check"/></svg><span>The allocation dispute is about participation, not arithmetic</span></li>
<li><svg><use href="#i-check"/></svg><span>Agree drivers with clinical and finance leadership jointly, before engineering</span></li>
<li><svg><use href="#i-check"/></svg><span>Validate the model against a period both sides already understand</span></li>
<li><svg><use href="#i-check"/></svg><span>Provide drill-through to the transaction, or the number will be disputed</span></li>
<li><svg><use href="#i-check"/></svg><span>Design row-level access before publishing, not after somebody raises it</span></li>
</ul>
</div>
<h2>Where to go from here</h2>
<p>We will build the cost model for one service line against your own data and walk your clinical and finance leads through it together, before anything is committed.</p>`
    },

    // 20. Intake Pipeline - Legal
    {
        platform: "d365-sales",
        service: "business-applications",
        industry: "legal",
        title: "Your intake pipeline is a spreadsheet, and here is what it costs",
        description: "Law firms are exceptional at legal work and, with striking consistency, under-instrumented at the business around it. Intake is where that shows first.",
        publishedAt: new Date("2026-03-09"),
        readTime: "8 min read",
        type: "Challenges",
        icon: "sales",
        slug: "intake-pipeline-legal-sales",
        takeaways: [
            "If nobody can size the intake leak, it cannot be managed",
            "The objective is a record and an owner, not a corporate sales process",
            "A workflow-based conflict check produces a record your insurer will value",
            "Capture from Outlook; fee earners who must switch applications will not record",
            "Pilot with the most sceptical practice group, not the most cooperative"
        ],
        content: `<p class="stand">Ask a managing partner how many enquiries the firm received last month, what they were worth, and what proportion converted. In most firms the honest answer is that nobody knows.</p>
<p>This is not a small gap. It means marketing spend cannot be evaluated, business development cannot be managed, and the firm's growth depends on the individual conscientiousness of whoever happened to answer the phone.</p>
<h2>How enquiries actually get lost</h2>
<p>An enquiry arrives by email to a partner who is in court. It sits. Three days later they respond, and the prospective client has already instructed someone else. Nobody records that this happened, so the firm never learns.</p>
<p>Multiply by every partner and every channel — web form, phone, referral, personal contact — and you have a leak nobody can size.</p>
<h2>What instrumenting intake actually involves</h2>
<p>Less than firms fear. The objective is not a corporate sales process; it is a record and an owner.</p>
<ul>
<li><svg><use href="#i-check"/></svg><span>Every enquiry captured with source, practice area, indicative value and a named owner</span></li>
<li><svg><use href="#i-check"/></svg><span>Conflict check run and permanently recorded as part of the intake workflow</span></li>
<li><svg><use href="#i-check"/></svg><span>Automated follow-up when an enquiry ages past an agreed threshold</span></li>
<li><svg><use href="#i-check"/></svg><span>Pitch and proposal tracking with win and loss reasons captured at the time</span></li>
<li><svg><use href="#i-check"/></svg><span>Referral source reporting, so the firm knows which relationships actually produce work</span></li>
</ul>
<h2>The conflicts record is the quiet win</h2>
<p>Most firms run conflict checks thoroughly and informally — a senior person is asked, they think carefully, they answer. The check is good. The record is a memory.</p>
<p>Making the check part of a workflow produces a searchable, timestamped record covering parties, matters and relationships. Your risk partner will value that more than the pipeline reporting, and your professional indemnity insurer may too.</p>
<h2>Adoption in a partnership</h2>
<p>The failure mode is well established: a system designed for management reporting, experienced by fee earners as administration, abandoned within a year.</p>
<p>The counter is to design where they already work. Capture from Outlook without leaving Outlook. Justify every mandatory field individually. And pilot with the practice group that least wants it, because they will find the friction that would have killed the rollout everywhere else.</p>
<h2>What the numbers look like afterwards</h2>
<p>Firms that instrument intake properly typically find conversion improves materially without anybody working harder — simply because enquiries stop going cold. And for the first time, marketing spend becomes attributable to matters actually opened.</p>
<div class="pull">
<h4>What to take away</h4>
<ul>
<li><svg><use href="#i-check"/></svg><span>If nobody can size the intake leak, it cannot be managed</span></li>
<li><svg><use href="#i-check"/></svg><span>The objective is a record and an owner, not a corporate sales process</span></li>
<li><svg><use href="#i-check"/></svg><span>A workflow-based conflict check produces a record your insurer will value</span></li>
<li><svg><use href="#i-check"/></svg><span>Capture from Outlook; fee earners who must switch applications will not record</span></li>
<li><svg><use href="#i-check"/></svg><span>Pilot with the most sceptical practice group, not the most cooperative</span></li>
</ul>
</div>
<h2>Where to go from here</h2>
<p>Pick a practice group and a matter type, and we will demonstrate intake, conflict check and matter opening against your terminology and checklist.</p>`
    },

    // 21. Utilization - Professional Services
    {
        platform: "power-bi",
        service: "data-ai-integration",
        industry: "professional-services",
        title: "One point of utilization: the arithmetic worth doing first",
        description: "Before evaluating any professional services system, do this calculation. It usually settles the investment question faster than a vendor business case.",
        publishedAt: new Date("2026-03-02"),
        readTime: "6 min read",
        type: "How-to guide",
        icon: "chart",
        slug: "utilization-arithmetic-professional-services-power-bi",
        takeaways: [
            "One point of utilization, calculated properly, usually dwarfs the system cost",
            "The definition conversation comes before any reporting work",
            "Resist practice-specific exceptions; they destroy the firm-wide number",
            "Precise measurement of badly captured time is still an approximation",
            "Do the arithmetic before the vendor meeting, not after"
        ],
        content: `<p class="stand">Take your billable headcount. Multiply by your standard annual hours. Take one per cent of that. Multiply by your blended rate.</p>
<p>That number is what a single point of utilization is worth to your firm annually. In most firms it is larger than the entire cost of the systems being debated, and it takes about ninety seconds to calculate.</p>
<h2>Why firms do not do this calculation</h2>
<p>Partly because utilization is understood as an operational metric rather than a financial one. Mostly because the number nobody trusts cannot be used in an argument.</p>
<p>And utilization genuinely is untrustworthy in most firms — different practices define it differently, time is recorded late and approximately, and non-billable work is categorised inconsistently. The figure gets reported monthly and quietly discounted by everybody who reads it.</p>
<h2>Fixing the definition before the reporting</h2>
<p>This is the least popular meeting in any professional services engagement and the one that determines whether it succeeds. Two practices measuring utilization differently produce a firm-wide number that means nothing, and no amount of good software repairs that.</p>
<ul>
<li><svg><use href="#i-check"/></svg><span>Agree one definition of billable, non-billable and available hours across every practice</span></li>
<li><svg><use href="#i-check"/></svg><span>Decide explicitly how business development, training and internal projects are treated</span></li>
<li><svg><use href="#i-check"/></svg><span>Set the denominator once — contracted hours, standard hours or available hours</span></li>
<li><svg><use href="#i-check"/></svg><span>Write the definition down and publish it with every report that uses it</span></li>
<li><svg><use href="#i-check"/></svg><span>Resist practice-specific exceptions; each one destroys the firm-wide number</span></li>
</ul>
<h2>Then make the data worth reporting on</h2>
<p>Time captured at the point of work rather than reconstructed on Friday. Two minutes a day, from Teams, Outlook or a phone. Everything downstream — utilization, realization, project margin, revenue recognition — is built on whether this one thing works.</p>
<p>A firm that fixes the definition but not the capture has a precise measurement of an approximation.</p>
<h2>What Power BI adds</h2>
<p>A single governed semantic model where the definition lives once and every report inherits it. Row-level security so practice leaders see their own book without exports circulating. And drill-through from the firm-wide number to the individual time entry, which is what makes it credible.</p>
<p>The 2026 direction here matters: Power BI is increasingly a governed layer over a broader data platform, with Copilot able to answer questions directly against the semantic model. A well-defined model becomes something the whole firm can query. A poorly defined one becomes a faster way to circulate a disputed number.</p>
<h2>Do the calculation before the vendor meeting</h2>
<p>It reframes the conversation. Instead of evaluating features against a price, you are evaluating whether a given change is likely to move a number you have already established is worth a great deal.</p>
<div class="pull">
<h4>What to take away</h4>
<ul>
<li><svg><use href="#i-check"/></svg><span>One point of utilization, calculated properly, usually dwarfs the system cost</span></li>
<li><svg><use href="#i-check"/></svg><span>The definition conversation comes before any reporting work</span></li>
<li><svg><use href="#i-check"/></svg><span>Resist practice-specific exceptions; they destroy the firm-wide number</span></li>
<li><svg><use href="#i-check"/></svg><span>Precise measurement of badly captured time is still an approximation</span></li>
<li><svg><use href="#i-check"/></svg><span>Do the arithmetic before the vendor meeting, not after</span></li>
</ul>
</div>
<h2>Where to go from here</h2>
<p>We will run the calculation with your actual headcount and rates, and tell you honestly whether the gap is worth a project.</p>`
    },

    // 22. Outcomes - Nonprofits
    {
        platform: "fabric",
        service: "data-ai-integration",
        industry: "nonprofits-associations",
        title: "Measuring outcomes rather than activities",
        description: "Funders increasingly want to know what changed, not how many sessions ran. Most nonprofits collect the second because the first was never designed in.",
        publishedAt: new Date("2026-02-23"),
        readTime: "8 min read",
        type: "How-to guide",
        icon: "chart",
        slug: "outcomes-not-activities-nonprofits-fabric",
        takeaways: [
            "Activity data is a by-product of delivery; outcome data has to be designed in",
            "Two or three sustainable measures beat ten that get abandoned",
            "Capture a baseline at intake and build follow-up into the pathway",
            "Be explicit about attribution limits; sophisticated funders respect it",
            "Start with one programme and let the approach spread by demand"
        ],
        content: `<p class="stand">A programme can report that it delivered four thousand meals, ran two hundred sessions, or supported six hundred participants. Those are activities, and they are what most systems capture.</p>
<p>The question funders now ask is what changed for those six hundred people. That is an outcome, and it requires having decided in advance what change you were trying to produce.</p>
<h2>Why activity data dominates</h2>
<p>Because it is a by-product of delivery. Somebody ran a session, so a session gets recorded. Outcomes require a separate act of measurement, usually after the person has left the programme, frequently by staff who are already stretched.</p>
<p>The result is that outcome measurement gets designed retrospectively, for a specific funder report, and then abandoned until the next one.</p>
<h2>Designing measurement into the service</h2>
<p>The practical approach for a small team is to pick a small number of outcome measures and capture them as part of normal delivery rather than as a separate exercise.</p>
<ul>
<li><svg><use href="#i-check"/></svg><span>Choose two or three outcomes per programme, not ten — unsustainable measurement produces no data at all</span></li>
<li><svg><use href="#i-check"/></svg><span>Capture a baseline at intake, as part of the intake conversation</span></li>
<li><svg><use href="#i-check"/></svg><span>Set a defined follow-up point and make it part of the delivery pathway, not an add-on</span></li>
<li><svg><use href="#i-check"/></svg><span>Use validated instruments where they exist rather than inventing questions</span></li>
<li><svg><use href="#i-check"/></svg><span>Record who did not respond, so the analysis is honest about coverage</span></li>
</ul>
<h2>Being honest about attribution</h2>
<p>This is where credibility is won or lost with a sophisticated funder. A participant's circumstances improved; your programme was one of several things happening in their life.</p>
<p>Claiming causation you cannot support damages trust with exactly the funders whose money matters most. Reporting the change, describing your contribution, and being explicit about what you cannot isolate is more persuasive than a confident claim that does not survive a question.</p>
<h2>Where the data platform helps</h2>
<p>Unifying participant records, service delivery, expenditure and outcomes into one governed layer means the funder report is generated rather than assembled, and every figure can be traced back to a service record.</p>
<p>For a small team, the time saved is the immediate benefit. The durable benefit is that programme managers can see what is working during delivery rather than at the end of the grant.</p>
<h2>Start with one programme</h2>
<p>Not the whole organization. Pick the programme with the most demanding funder, design the measurement properly there, and let the approach spread because staff in other programmes want the same clarity.</p>
<div class="pull">
<h4>What to take away</h4>
<ul>
<li><svg><use href="#i-check"/></svg><span>Activity data is a by-product of delivery; outcome data has to be designed in</span></li>
<li><svg><use href="#i-check"/></svg><span>Two or three sustainable measures beat ten that get abandoned</span></li>
<li><svg><use href="#i-check"/></svg><span>Capture a baseline at intake and build follow-up into the pathway</span></li>
<li><svg><use href="#i-check"/></svg><span>Be explicit about attribution limits; sophisticated funders respect it</span></li>
<li><svg><use href="#i-check"/></svg><span>Start with one programme and let the approach spread by demand</span></li>
</ul>
</div>
<h2>Where to go from here</h2>
<p>Tell us about one programme and its funder requirements, and we will show you what designing the outcome measurement into delivery would look like.</p>`
    },

    // 23. Production Continuity - Manufacturing
    {
        platform: "cybersecurity",
        service: "managed-it-security",
        industry: "manufacturing",
        title: "Protecting production continuity, not just data",
        description: "Manufacturing security conversations default to intellectual property. The event that actually stops the business is a line that will not start on Monday.",
        publishedAt: new Date("2026-02-16"),
        readTime: "9 min read",
        type: "Best practices",
        icon: "shield",
        slug: "production-continuity-manufacturing-cybersecurity",
        takeaways: [
            "In a plant, ransomware is an availability problem before it is a data problem",
            "Express recovery objectives in shifts, not days",
            "Segmentation and identity cover more real attack paths than anything else",
            "Correlated detection shortens the gap between compromise and discovery",
            "An untested recovery objective is a hypothesis, not a plan"
        ],
        content: `<p class="stand">Ask a manufacturing executive what a security incident would cost and the answer usually involves stolen designs. Ask what a week of stopped production would cost and the number is immediate, precise and much larger.</p>
<p>The second is the more likely event, and it is the one most security programmes are not designed around.</p>
<h2>The threat model that fits manufacturing</h2>
<p>Ransomware is not primarily a data theft problem in a plant. It is an availability problem. An encrypted scheduling system, a locked-out MES, or a domain controller that will not authenticate the operators on the early shift stops production as effectively as a machine failure.</p>
<p>This reframing changes priorities. Backup validation and recovery rehearsal matter more than they would in an office-only environment. Segmentation between business and plant networks matters enormously. And the recovery objective has to be expressed in shifts, not in days.</p>
<h2>Where plant estates are structurally exposed</h2>
<p>Not through negligence. Through the accumulated consequences of equipment lifecycles measured in decades.</p>
<ul>
<li><svg><use href="#i-check"/></svg><span>Line controllers and HMIs running operating systems that cannot be patched without vendor certification</span></li>
<li><svg><use href="#i-check"/></svg><span>Flat networks where a compromised office endpoint can reach plant systems</span></li>
<li><svg><use href="#i-check"/></svg><span>Shared operator accounts, because individual logins slow down a shift change</span></li>
<li><svg><use href="#i-check"/></svg><span>Remote access for equipment vendors, granted years ago and never reviewed</span></li>
<li><svg><use href="#i-check"/></svg><span>Backup systems that have never been tested against a full-plant restore</span></li>
</ul>
<h2>What to do first</h2>
<p>Segmentation and identity, in that order. Separating business and plant networks limits the blast radius of the most common intrusion path, and it does not require touching equipment that cannot be touched.</p>
<p>Then identity: multi-factor authentication and conditional access on every account including administrators, and privileged access separated from daily accounts. These two cover more real attack paths than any other pair of controls available to you.</p>
<h2>Correlation is what shortens detection</h2>
<p>A suspicious sign-in, an unusual email rule and an endpoint detection are three alerts in three consoles. Together they are an obvious account compromise. The gap between compromise and discovery is the single biggest determinant of what an incident costs.</p>
<p>Consolidating signal from endpoint, identity, email and cloud into correlated incidents is what closes it. Organizations that do this consistently report both fewer incidents and dramatically faster triage — not because detection improved, but because the story became visible.</p>
<h2>Rehearse the recovery</h2>
<p>A documented recovery objective that has never been tested is a hypothesis. Run the rehearsal in a planned window, with the plant's involvement, and expect to find a dependency nobody had mapped.</p>
<p>Finding it during a planned exercise costs a Saturday. Finding it during an incident costs a week of production.</p>
<div class="pull">
<h4>What to take away</h4>
<ul>
<li><svg><use href="#i-check"/></svg><span>In a plant, ransomware is an availability problem before it is a data problem</span></li>
<li><svg><use href="#i-check"/></svg><span>Express recovery objectives in shifts, not days</span></li>
<li><svg><use href="#i-check"/></svg><span>Segmentation and identity cover more real attack paths than anything else</span></li>
<li><svg><use href="#i-check"/></svg><span>Correlated detection shortens the gap between compromise and discovery</span></li>
<li><svg><use href="#i-check"/></svg><span>An untested recovery objective is a hypothesis, not a plan</span></li>
</ul>
</div>
<h2>Where to go from here</h2>
<p>We will map your current coverage across endpoint, identity, email and cloud — including the plant-adjacent systems — and give you a prioritised plan before any commitment.</p>`
    },

    // 24. Outgrown Accounting - SMB
    {
        platform: "business-central",
        service: "business-applications",
        industry: "small-mid-market",
        title: "The signs you have outgrown your accounting system",
        description: "Four symptoms that reliably indicate an ERP conversation, and two that look like it but are not.",
        publishedAt: new Date("2026-02-09"),
        readTime: "7 min read",
        type: "Challenges",
        icon: "erp",
        slug: "outgrown-accounting-system-smb-business-central",
        takeaways: [
            "Critical spreadsheets, duplicate entry, slow close and proportional hiring are the real signals",
            "System age and reporting frustration are not, on their own, reasons to replace",
            "Business Central puts full ERP within mid-market reach and timeframe",
            "Scope phase one to prove itself before phase two is commissioned",
            "Judge migration by whether it reproduces a period you already signed off"
        ],
        content: `<p class="stand">Nobody outgrows their accounting package on a particular Tuesday. It happens gradually, through a series of individually sensible workarounds, until one day the workarounds are the process.</p>
<p>The difficulty is knowing whether you have crossed the line, because from inside it always looks like you are one spreadsheet away from being fine.</p>
<h2>The four symptoms that matter</h2>
<p>These consistently indicate that the system is now the constraint rather than an inconvenience.</p>
<ul>
<li><svg><use href="#i-check"/></svg><span><strong>A spreadsheet has become critical infrastructure</strong> — pricing, stock, scheduling or forecasting runs in a workbook one person maintains, and everybody knows it is fragile</span></li>
<li><svg><use href="#i-check"/></svg><span><strong>The same data is entered more than once</strong> — an order goes into the quoting tool, the accounting system and the shipping platform, and reconciling them costs more than the entry did</span></li>
<li><svg><use href="#i-check"/></svg><span><strong>Month end takes longer than the period it describes is relevant</strong> — by the time management accounts arrive, decisions have already been made without them</span></li>
<li><svg><use href="#i-check"/></svg><span><strong>Growth requires proportional administrative hiring</strong> — every additional ten clients seems to need another coordinator</span></li>
</ul>
<h2>The two that look like it and are not</h2>
<p><strong>The system is old.</strong> Age is not a symptom. Plenty of businesses run perfectly well on unfashionable software that does exactly what they need. Replacing something because it looks dated is an expensive aesthetic decision.</p>
<p><strong>Somebody wants a better report.</strong> Reporting frustration is real, but it is frequently a data or process problem rather than a system problem. Replacing an ERP to fix a report is a very costly route to a dashboard.</p>
<h2>What Business Central changes</h2>
<p>It puts financials, sales, purchasing, inventory, projects and service in one system at a licence cost a mid-market business can defend, deployable in a sensible timeframe rather than as a multi-year programme.</p>
<p>The 2026 direction adds agents into payables and expense processing, which matters disproportionately in a small finance team where routine document handling is a large share of the week.</p>
<h2>Scope phase one so it pays for phase two</h2>
<p>The most common mid-market ERP failure is not technical. It is a programme scoped so large that it consumes a year before producing anything, by which point the sponsor has lost patience and the business has lost interest.</p>
<p>Scope a first phase that solves a specific, visible problem and proves itself. Then commission the next. A supplier who cannot propose that is optimising for their own revenue rather than your outcome.</p>
<h2>The reconciliation test</h2>
<p>Whatever you implement, judge the migration by one thing: can the new system reproduce a period you have already closed and signed off? If not, the migration is not finished, and discovering that in testing costs a fraction of discovering it in your first live month end.</p>
<div class="pull">
<h4>What to take away</h4>
<ul>
<li><svg><use href="#i-check"/></svg><span>Critical spreadsheets, duplicate entry, slow close and proportional hiring are the real signals</span></li>
<li><svg><use href="#i-check"/></svg><span>System age and reporting frustration are not, on their own, reasons to replace</span></li>
<li><svg><use href="#i-check"/></svg><span>Business Central puts full ERP within mid-market reach and timeframe</span></li>
<li><svg><use href="#i-check"/></svg><span>Scope phase one to prove itself before phase two is commissioned</span></li>
<li><svg><use href="#i-check"/></svg><span>Judge migration by whether it reproduces a period you already signed off</span></li>
</ul>
</div>
<h2>Where to go from here</h2>
<p>Send us a chart of accounts, an item list and a month of transactions. We will configure a demo with your own data and walk your finance lead through their own month end.</p>`
    }
];

const seedBlog = async () => {
    try {
        if (!process.env.MONGO_URI) throw new Error("MONGO_URI not found in .env");

        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected...");

        await BlogPost.deleteMany({});
        console.log("Old blog posts cleared.");

        const inserted = await BlogPost.insertMany(posts, { ordered: true });
        console.log(`✅ ${inserted.length} blog posts seeded successfully.`);

        process.exit(0);
    } catch (error) {
        console.error("❌ Blog seeding failed:", error);
        process.exit(1);
    }
};

seedBlog();