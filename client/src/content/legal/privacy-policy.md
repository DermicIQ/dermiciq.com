# **Privacy Policy**

*Last updated: October 2, 2026

&nbsp;

17576005 CANADA INC. doing business as DermicIQ Technologies ("DermicIQ," "we," "us," or "our"), a corporation existing under the laws of Canada, with its notice address in Ontario, Canada, respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, share, and safeguard your information when you use our website ([https://dermiciq.com](https://dermiciq.com)), our mobile application (available for download via the Apple App Store and Google Play Store), and any related services (collectively, the "Services").

&nbsp;

Your consent to the data practices described in this Privacy Policy is obtained separately from your acceptance of our Terms of Service and requires affirmative, explicit action on your part (such as checking a box or clicking a dedicated "I Consent" button). Acceptance of our Terms of Service does not constitute consent to the collection, use, or disclosure of your personal information as described in this Privacy Policy.

&nbsp;

You may withdraw your consent at any time by contacting us at [privacy@dermiciq.com](mailto:privacy@dermiciq.com) or adjusting your privacy preferences in your account settings. Withdrawal of consent may affect your ability to continue using certain features of the Services.

&nbsp;

The Services are not offered to residents of the European Union. Signup is blocked for EU IP addresses and EU addresses. If you are an EU resident, or if you attempt to sign up from an EU IP address or using an EU address, you must not use the Services. We do not direct marketing to EU users.

If you do not agree with any part of this Privacy Policy, you must not use the Services.

1. ### Introduction

DermicIQ is an AI-powered platform that provides personalized skincare analysis and recommendations. We help you understand your skin, track changes over time, and receive tailored product suggestions based on your unique profile.

We are a corporation existing under the laws of Canada, with our notice address in Ontario, Canada, and we operate in accordance with applicable Canadian privacy laws, including the Personal Information Protection and Electronic Documents Act (PIPEDA). PIPEDA sets out the ground rules for how businesses must handle personal information in the course of commercial activities.

For the purposes of this Privacy Policy, "personal information" means any information about an identifiable individual, as defined under PIPEDA.

2. ### Information We Collect

We collect information that you provide directly and information that is automatically collected when you use our Services.

**Information You Provide:**

* Account information: name, email address, and password;  
* **Skin Profile:** the collection of personal information you provide about your skin, including but not limited to skin type, skin conditions, concerns, sensitivities/allergies, current skincare routine, and product feedback; stored to provide ongoing personalization and to improve the Services;  
* Product feedback: ratings, reviews, and notes about products you have used;  
* **Label OCR data:** when you use a label-scan feature, a photo of a product label (not your skin) that you capture for product identification. The label photo is transmitted temporarily for optical character recognition (OCR) as described under **Label OCR (Product Labels)** below. We persist OCR text and derived product fields only—not the label photo;  
* **Camera & Image Data:** label-scan photos you capture for product identification (not skin photos). Processed transiently as described under **Camera & Image Data** and **Label OCR (Product Labels)** below; the image is discarded after processing and is never used to train third-party AI models; and  
* Communications: messages, feedback, or inquiries you send to our support team.

**Automatically Collected Information:**

* **Usage data:** how you interact with the app or website, features used, time spent, and actions taken;  
* **Device and technical data:** IP address, device type, operating system, browser type, app version, and unique device identifiers;  
* **Analytics data:** information about user trends, engagement, and app performance;  
* **Location data:** general geographic location derived from your IP address (we do not collect precise GPS location without your explicit consent);  
* **Search query processing:** product search terms processed as Essential / Strictly Necessary app and server operations for operational search metrics, without persistent user identifiers or tracking profiles (not analytics; no cookie or telemetry Accept/Reject required for this path); and  
* **Barcode data:** product barcode numbers (UPC/EAN) captured via on-device barcode scan for product identification. We retain the scanned barcode number, not a camera image of the barcode.

**Summary of Data Types Collected.** For transparency and to align with app store requirements, the table below summarizes the personal information we collect and why:

| Data type | Collected Directly or Automatically? | Purpose | Shared with Third Parties? |
| :---- | :---- | :---- | :---- |
| Name, email, password | Directly (account creation) | Account management, authentication | Yes (hosting, email providers) |
| Skin Profile (skin type, conditions, concerns, sensitivities/allergies, routine, product feedback) | Directly (user input) | Personalization, recommendations | Yes (directed service providers) |
| Product ratings, reviews, notes | Directly (user input) | Routine tracking, community features | No (unless you post publicly) |
| Usage data (features used, time spent) | Automatically | Analytics, product improvement | Yes (analytics providers) |
| Device/technical data (IP, OS, browser, device ID) | Automatically | Security, analytics, performance | Yes (hosting, security, analytics) |
| General location (from IP) | Automatically | Regional content, compliance | Yes (hosting, CDN) |
| Barcode numbers (UPC/EAN) | Automatically (on-device scan) | Product identification | Yes (directed service providers, as needed) |
| Label OCR text / derived product fields (from product-label photos) | Directly (user-initiated label scan) | Product identification (product-first and INCI backup paths) | Yes (Google Cloud Vision for OCR; other directed service providers as needed) |
| Camera & Image Data (label-scan photos) | Directly (user-initiated label scan) | Transient OCR for product identification; image discarded after processing; never used to train third-party AI models; no skin photos | Yes (Google Cloud Vision for OCR; raw image not persisted by DermicIQ) |

We do not collect precise GPS location, contact lists, call logs, or other sensitive device data without your explicit consent.

**Sensitive Information.** Your Skin Profile information (including skin type, skin conditions, concerns, and sensitivities/allergies) constitutes sensitive personal information under applicable privacy laws, including Québec Law 25 and CCPA. We do not collect or store photos of your skin, and we do not perform biometric skin-image processing.

**Skin Profile vs. label OCR.** Skin Profile data is information you enter about your skin (for example, skin type, conditions, concerns, and sensitivities/allergies). Separately, product-identification features may use (i) on-device barcode number scans and/or (ii) OCR of a product-label photo you capture. Label OCR processes text from product packaging—not images of your skin. We collect Skin Profile and related information only for the purposes described in this Privacy Policy and only with your explicit, separate consent. You are not required to share any information you are uncomfortable providing, and you may decline to provide certain information, though this may limit your ability to use certain features of the Services.

**Label OCR (Product Labels).** The Services offer two label-scan paths that share the same backend: (1) a **product-first** path that OCRs brand or product name text to match against our catalog (including Open Beauty Facts enrichments where applicable); and (2) an **INCI backup** path that OCRs an ingredients block for parsing and analysis. When you capture a product-label photo, that image leaves your device via HTTPS `POST /api/analyze-scan`, is held in app-server memory for the duration of the request, and is sent to **Google Cloud Vision** (`TEXT_DETECTION`) for OCR. The analyze-scan endpoint does not write the raw label image to Supabase, does not return the raw image to the client, and does not otherwise persist raw label images on a successful scan. We may persist OCR text and derived fields only (for example, raw ingredient text, product name, and related diary or history entries)—not the photo. Barcode number scanning may still be available alongside label OCR.

**Camera & Image Data.** This entry describes camera and image data from **label-scan photos** only (not skin photos), for Play / App Store transparency. When you capture a product-label photo for product identification, that image is transmitted via HTTPS `POST /api/analyze-scan` and processed by **Google Cloud Vision** for OCR, as described under **Label OCR (Product Labels)** above. The image is discarded after processing. We persist OCR text and derived product fields only—not the raw label image. Camera and image data from label scans are **never** used to train third-party AI models. We do not collect or store photos of your skin. This disclosure uses the same label-scan OCR path described above and does not describe any separate image-persistence practice.

We do not collect sensitive health data beyond what you voluntarily share for skincare personalization purposes. We do not collect information about your medical history, diagnoses, prescriptions, or clinical treatments unless you voluntarily provide it in communications with us.

**Purpose of Collection.** We collect your personal information for the following purposes, as required by PIPEDA's principle of identifying purposes:

* To create and maintain your account and provide the Services;  
* To generate personalized skincare insights and recommendations based on your Skin Profile and product-identification inputs;  
* To improve and optimize our AI models and algorithms using de-identified and aggregated data. We do not use your personal information to train our AI models unless you explicitly consent to such use in the future. If we introduce AI model training using personal data, we will update this Privacy Policy and obtain your separate, explicit consent before doing so;  
* To communicate with you about your account, updates, and important notices;  
* To respond to your inquiries and provide customer support;  
* To analyze usage trends and improve user experience, Services features, and performance;  
* To ensure the security and integrity of the Services; and  
* To comply with legal and regulatory obligations.

We use your personal information only for the purposes identified in this Privacy Policy. If we wish to use your information for a new purpose, we will document that purpose and obtain your consent before doing so.

**Legal Basis for Processing (Québec Law 25 and Other Applicable Canadian Law).** If you are a resident of Québec, we process your personal information based on the following legal grounds under Québec Law 25 and other applicable Canadian law:

* **Consent:** For non-essential cookies, marketing communications, and optional AI model training.  
* **Contractual Necessity:** To provide the Services (e.g., account creation, Skin Profile storage, personalized recommendations).  
* **Legitimate Interests:** For security, fraud prevention, analytics, and service improvement, where permitted by applicable law.  
* **Legal Obligation:** To comply with applicable laws and regulatory requirements.

You may withdraw your consent at any time without affecting the lawfulness of processing based on consent before its withdrawal.

3. ### How We Use Your Information

We use your information to provide, improve, and personalize our Services:

* Create and maintain your account and long-term Skin Profile;  
* Deliver personalized skincare analysis and recommendations based on your Skin Profile and product-identification inputs;  
* Track your skin progress over time and suggest adjustments to your routine;  
* Improve and optimize our overall service quality and user experience;  
* Communicate with you about your account, updates, and important notices;  
* Respond to your questions and provide customer support;  
* Conduct internal research, analytics, and product development;  
* Protect the security and integrity of our Services;  
* Detect, prevent, and address technical issues or fraudulent activity; and  
* Comply with legal and regulatory obligations.

**Essential / Functional App Operations.** Certain processing is **Essential / Strictly Necessary** to operate the Services and is **not** analytics. This includes **product search query processing**: we process search terms for operational search metrics **without** persistent user identifiers or tracking profiles. This path does **not** require a cookie or telemetry Accept/Reject choice. Error, crash, and performance monitoring through **Sentry** remains analytics / performance monitoring as described in Section 4 and is **not** reclassified as Essential by this disclosure. Technology-table detail for cookies and similar technologies lives in our Cookie Policy; this Privacy Policy disclosure does not add or rename Cookie categories.

**Limitation on Use.** We use your personal information only for the purposes identified in this Privacy Policy. If we wish to use your information for a new purpose that is not reasonably expected at the time of collection, we will document that purpose and obtain your explicit consent before doing so.

**Automated Decision-Making.** Our Services use algorithms to generate skincare insights and product recommendations based on your Skin Profile. These automated decisions are made using the data you provide and are intended for informational and wellness purposes only. You have the right to object to automated decision-making and to request human intervention by contacting us at [privacy@dermiciq.com](mailto:privacy@dermiciq.com). We do not make automated decisions that have legal or similarly significant effects on you.

**Marketing and Advertising.** We may use your email address and account information to send you promotional communications about DermicIQ features, updates, and related offerings that we believe may interest you. You may opt out of these marketing communications at any time by clicking the "unsubscribe" link in any email, adjusting your preferences in your account settings, or contacting us at [privacy@dermiciq.com](mailto:privacy@dermiciq.com). We do not direct marketing to EU users.

We do not share your personal information with third parties for their own marketing or advertising purposes. We never sell your personal data to third parties. We do not use your sensitive personal information (including Skin Profile data) for targeted advertising or any purpose other than providing and improving the Services.

**Consent for Marketing.** Where required by applicable law, including Québec Law 25, we will obtain your separate, explicit consent before sending you any marketing communications. You may withdraw this consent at any time using the methods described above.

4. ### How We Share Your Information

We are transparent about sharing and only do so in limited circumstances:

**Service Providers.** We may share information with trusted third-party service providers who help us operate the Services (e.g., cloud hosting, error/performance monitoring, email delivery, CDN/edge security, and other directed processing). All such providers are bound by strict contractual obligations to protect your data, use it only for the purposes we specify, and not retain, use, or disclose it for any other purpose. We take steps to monitor and enforce those obligations.

**Vendors / Processors.** This Privacy Policy is the single source of truth for our current service-provider / processor vendors. Other DermicIQ policies reference this section rather than duplicating the full table. Our current vendors include:

| Vendor | Role | Processing location |
| :---- | :---- | :---- |
| Supabase | App backend / database | Canada |
| Cloudflare | CDN / edge / security | Global |
| Sentry | Error / performance monitoring | United States |
| Resend | Transactional email | United States |
| Google Cloud Vision | Label OCR / text detection (`TEXT_DETECTION`) | United States |

For error, crash, and performance monitoring we use **Sentry**. For operational server and application logging we use **DermicIQ first-party logs**. We do not use Google Analytics.

We require these providers to maintain equivalent security safeguards and to use your data only for the specific processing we direct. We do not permit these providers to use your data to train their own models or for any purpose unrelated to providing the Services to you. If we engage additional directed processors, we will update this table.

**Cross-Border Data Transfers.** Some of our service providers may operate outside of Canada, including in the United States and other jurisdictions, as reflected in the vendor table above. When your personal information is transferred outside of Canada, we ensure that our contracts with these providers require a comparable level of protection for your data. However, your information may be subject to the laws of the country in which it is processed, including disclosure to law enforcement or regulatory authorities in that jurisdiction. If you have questions about the safeguards we use for cross-border transfers, please contact us at [privacy@dermiciq.com](mailto:privacy@dermiciq.com).

**Legal Requirements.** We may disclose information if required by law, regulation, or legal process (such as a court order or subpoena), or to protect our rights, safety, or property, including the security and integrity of the Services.

**Business Transfers.** In the event of a merger, acquisition, financing, or sale of all or a portion of our assets, your information may be transferred as part of that transaction. We will require any acquiring entity to handle your personal information in accordance with this Privacy Policy. If the transaction does not proceed, we will require the recipient to return or destroy your personal information.

**No Third-Party Marketing.** We do not sell, rent, or share your personal information with third parties for their own marketing or advertising purposes. We never sell your personal data to third parties.

**Third-Party Links.** The Services may contain links to third-party websites or services. This Privacy Policy does not apply to those third-party sites. We are not responsible for the privacy practices or content of such third parties. We encourage you to review the privacy policies of any third-party sites you visit.

**De-Identified Data.** We may share aggregated or de-identified data that does not reasonably identify you with third parties for research, analytics, or other lawful purposes. Such data is not personal information and is not subject to the restrictions in this Privacy Policy.

**AI and Machine Learning.** We use technology to support product identification and personalized recommendations based on information you provide, including your Skin Profile. Product identification may include on-device barcode number scanning and/or label OCR of a product-label photo you capture, as described under **Label OCR (Product Labels)** above. Label photos are processed transiently via `/api/analyze-scan` and **Google Cloud Vision** for text detection; we do not persist raw label images after the request, and we do not collect or store photos of your skin. Directed processing may be performed by the service providers listed in the vendor table above, under contractual obligations to use your data only for the processing we specify. We do not use your personal information or User Content to train our AI models. Any improvements to our technology are based on aggregated and de-identified data only, and we do not currently use your data for training purposes.

5. ### Data Storage and Security

Your data is stored on secure servers, primarily in Canada or other jurisdictions where our service providers operate (as described in the vendor table in Section 4). We implement reasonable administrative, technical, and physical safeguards to protect your personal information, including:

* Encryption for data in transit (using TLS/HTTPS) and data at rest;  
* Access controls that restrict access to personal information to authorized personnel only;  
* Regular security assessments and monitoring;  
* Secure data storage infrastructure; and  
* Contractual obligations requiring our service providers to maintain equivalent safeguards.

Under PIPEDA and Québec Law 25, organizations must protect personal information with security safeguards appropriate to the sensitivity of the information. We are committed to maintaining these standards.

**Retention.** We retain your Skin Profile and account information for as long as your account remains active, or as needed to provide the Services to you. DermicIQ does not retain raw product-label images after the analyze-scan request completes; any Google-side handling of images submitted to Google Cloud Vision is governed by Google's applicable Cloud / Vision terms and documentation, and we do not state a separate DermicIQ-controlled Google retention period. OCR text and derived product fields that we persist are retained with your account and related Service data as described in this section. After account termination, we will retain your personal information only for as long as reasonably necessary to:

* Comply with legal and regulatory obligations;  
* Resolve disputes;  
* Enforce our agreements; and  
* Detect and prevent fraud or security incidents.

**Analytics Retention.** Analytics data is retained for fourteen (14) months to support year-over-year and seasonal analysis. We aggregate or de-identify analytics data where possible. After that period, we delete or anonymize the analytics data in accordance with our retention schedule.

**Account Deletion.** When your account is deleted, we remove your personal identifiable information (PII). We may retain **pseudonymized** security logs, **consent history**, and **non-identifiable** audit records as required for law or system integrity. We do not claim complete erasure of all operational records.

After such a retention period, we will securely delete or anonymize your personal information, subject to the Account Deletion residual-records exception above. If we anonymize your data rather than delete it, we ensure that there is no serious possibility of re-identification through measures such as aggregation, scrambling, and organizational controls.

**Security Limitations.** No system is completely secure, and we cannot guarantee absolute security. You use the Services at your own risk. In the event of a security breach affecting your personal information, we will notify you and applicable regulatory authorities in accordance with applicable law, including PIPEDA and Québec Law 25\.

**Data Breach Notification.** If we become aware of a breach of security safeguards involving your personal information that creates a real risk of significant harm to you, we will notify you promptly and report the breach to the Office of the Privacy Commissioner of Canada and, if applicable, the Commission d'accès à l'information du Québec, as required by law.

You may request deletion of your data at any time (see "Your Rights" below). We will respond to such requests within thirty (30) days.

6. ### Your Rights

You have control over your personal information. Depending on your location and applicable law, you may have the following rights:

* **Access.** Request a copy of the personal information we hold about you. You have the right to know what personal information we have collected, how we use it, and with whom we share it.  
* **Correction.** Ask us to update or correct inaccurate or incomplete information. You may also update your profile information directly through your account settings.  
* **Deletion.** Request deletion of your account and personal data. Upon account deletion, we remove your personal identifiable information (PII). We will honor deletion requests unless we are required by law to retain certain information (such as to comply with legal obligations, resolve disputes, or enforce our agreements). We may retain **pseudonymized** security logs, **consent history**, and **non-identifiable** audit records as required for law or system integrity; we do not claim complete erasure of all operational records. If we cannot fully delete your data, we will inform you of the reasons.  
* **Withdrawal of Consent.** Withdraw your consent to our collection, use, or disclosure of your personal information at any time. Withdrawal of consent may affect your ability to continue using certain features of the Services.  
* **Objection/Restriction.** Object to or request limits on certain processing activities, including automated decision-making or processing for marketing purposes.  
* **Data Portability.** Receive your data in a structured, commonly used, and machine-readable format, and request that we transmit it to another organization where technically feasible.  
* Complaint to the OPC or CAI. If you are not satisfied with our response to your privacy concern, you have the right to file a complaint with the Office of the Privacy Commissioner of Canada (OPC).  
* If you are a resident of Québec, you may also file a complaint with the Commission d'accès à l'information du Québec (CAI). We encourage you to first attempt to resolve any issue directly with us before contacting a supervisory authority.

**How to Exercise Your Rights.** To exercise these rights, email us at [privacy@dermiciq.com](mailto:privacy@dermiciq.com) or adjust your preferences through your account settings. We will respond within thirty (30) days, as required by applicable law. We may need to verify your identity before fulfilling a request. If we need additional time to respond, we will notify you of the extension and the reasons for it.

Québec Residents – Additional Rights. If you are a resident of Québec, you have the following additional rights under Québec Law 25:

* The right to have personal information collected, used, or disclosed only for purposes that a reasonable person would consider appropriate in the circumstances;  
* The right to require us to cease disseminating your personal information or to de-index any hyperlink attached to your name that provides access to such information if the dissemination causes serious injury to your reputation or privacy;  
* The right to request the cessation of the use of your personal information for prospecting or commercial purposes; and  
* The right to be informed of the use of your personal information outside of Québec and to request that such use be ceased.

**California Residents** – Additional Rights. If you are a resident of California, you have the following additional rights under the California Consumer Privacy Act (CCPA):

* The right to know what personal information we have collected, used, disclosed, and sold about you;  
* The right to opt-out of the sale or sharing of your personal information (we do not sell your personal information);  
* The right to limit the use and disclosure of your sensitive personal information; and  
* The right to non-discrimination for exercising any of your privacy rights.

To exercise your California rights, please contact us at [privacy@dermiciq.com](mailto:privacy@dermiciq.com).

**No Sale of Personal Information.** We do not sell your personal information to third parties. As such, we do not offer a "Do Not Sell My Personal Information" opt-out mechanism. If our practices change, we will update this Privacy Policy and provide you with the ability to opt-out as required by law.

7. ### Cookies and Tracking Technologies

We use cookies, pixels, and similar tracking technologies to operate the Services, understand usage patterns, and improve your experience. Cookies are small text files that websites place on your device to remember your preferences, login status, and other information about your interaction with the Services. We may also use tracking technologies such as web beacons and pixels to collect information about how you interact with our Services.

We obtain your prior, informed, and unambiguous consent before placing any non-essential cookies, including analytics and personalization cookies, on your device. You have the right to **Accept** or **Reject** non-essential cookies at any time. You may manage your cookie preferences through our cookie consent banner, the Cookie Settings link in our website footer, your account settings (if logged in), or your browser or device settings.

When you first access our Services, we will present you with a cookie consent banner that lets you:

* **Accept** non-essential cookies; or  
* **Reject** non-essential cookies.

The banner does not offer on-banner category-by-category customization. No non-essential cookies will be placed on your device until you make an affirmative choice. For detailed information about cookie categories, purposes, retention periods, and providers, see our Cookie Policy. You are not required to accept non-essential cookies to access the general content of our Services. However, certain features may be unavailable if you refuse certain cookies.

**Cookie Policy and Categories.** For detailed information about the specific cookies we use, their purposes, retention periods, and the third-party providers involved, please see our separate Cookie Policy, which is incorporated by reference into this Privacy Policy and is available at [https://dermiciq.com/cookies](https://dermiciq.com/cookies)

**Third-Party Tracking.** Some of the tracking technologies used on our Services may be placed by third-party providers (such as error/performance monitoring providers listed in Section 4). We ensure that these providers comply with applicable privacy laws and that their cookies are subject to your consent preferences. We do not use Google Analytics.

**Withdrawal of Consent.** You may withdraw your consent to non-essential cookies at any time by using the Cookie Settings link in our website footer, updating your preferences through your account settings (if logged in), updating your browser settings, or contacting us at [privacy@dermiciq.com](mailto:privacy@dermiciq.com).

**Quebec Law 25 Compliance.** We collect and document your cookie consent as required by Quebec's Law 25, which mandates that consent be freely given, specific, informed, and unambiguous, and that you have the ability to withdraw consent as easily as you gave it. A record of your consent is maintained for compliance purposes.

**No Cookie Walls or Dark Patterns.** We do not use cookie walls (blocking access to content unless you accept cookies) or dark patterns (manipulative design) to obtain your consent. You have a genuine choice to accept or refuse non-essential cookies.

8. ### Third-Party Data Sources

To provide a comprehensive product catalog and enrich your skincare experience, the Services use product information sourced from third-party databases, including:

* Open Beauty Facts

We use product information from Open Beauty Facts ([https://world.openbeautyfacts.org](https://world.openbeautyfacts.org)), a collaborative, open database of cosmetic products.

**How We Use It:** When you search for or scan a product, we may query the Open Beauty Facts live API or retrieve data from a locally stored offline catalog derived from the official Open Beauty Facts Parquet data dump. This is done only for user-initiated queries and not for automated scraping.

**Attribution:** Product pages displayed through the Services include a link to the corresponding Open Beauty Facts product page.

**Data Usage:** We do not rehost or modify Open Beauty Facts images or product records beyond what is necessary to provide the Services. We do not use Open Beauty Facts data for medical purposes.

**License:** Open Beauty Facts data is licensed under the Open Database License (ODbL) and is provided "as is" without warranties of any kind.

* The Beauty API

We use product information from The Beauty API ([https://thebeautyapi.com](https://thebeautyapi.com)), a licensed dataset of skincare and beauty products.

**How We Use It:** We have licensed a static snapshot of the dataset, which includes product information, ingredient lists, safety ratings (irritancy and comedogenicity scores), and product images. The dataset is used solely to enrich the product catalog available through the Services.

**Data Usage:** We do not redistribute, resell, or publicly host the raw dataset files. We do not use The Beauty API data for medical purposes.

**License:** The Beauty API data is provided under a commercial license and is provided "as is." It is not guaranteed to be accurate, complete, or up-to-date.

**General Data Practices for Third-Party Sources**

**No Verification:** We do not verify the accuracy of third-party data and are not responsible for any errors or omissions in product information displayed through the Services.

**No Medical Use:** We do not use any third-party data for medical purposes, including diagnosis, treatment, or clinical decision-making.

**Recommendation:** You should always check product labels and packaging before using any skincare product and consult a qualified healthcare professional for medical advice.

**Third-Party Rights:** The product information displayed may be subject to intellectual property rights owned by third parties. Nothing in this Privacy Policy grants you any rights to such third-party intellectual property.

9. ### Children's Privacy

**Age Restriction.** Our Services are strictly limited to users who are 18 years of age or older (or the age of majority in their jurisdiction, if higher). By using the Services, you represent and warrant that you meet this age requirement. We do not allow users under 18 to access or use the Services under any circumstances, including with parental consent.

**No Collection from Minors.** We do not knowingly collect personal information from children or minors under the age of 18\. If we become aware that we have collected personal information from a user under 18, we will take immediate steps to delete it and terminate the associated account.

**Parental/Guardian Reporting.** If you are a parent or legal guardian and believe that your child under 18 has provided personal information to us or is using the Services without authorization, please contact us immediately at [privacy@dermiciq.com](mailto:privacy@dermiciq.com). We will investigate and take appropriate action, including account termination and data deletion.

**Age Verification.** Eligibility is confirmed by checkbox confirmation at signup only; we do not verify age by date of birth or government-issued identification.

**No Marketing to Minors.** We do not direct any marketing, advertising, or promotional content to individuals under 18\. We do not use tracking technologies for online behavioural advertising on any sections of our Services that are likely to be accessed by minors.

10. ### International Transfers

Since we are based in Canada, your information may be processed in Canada or other countries where our service providers operate, including as listed in the vendor table in Section 4\. These countries may have different data protection laws than your jurisdiction. Under PIPEDA, Canadian organizations are held accountable for the protection of personal information that is transferred to a third-party service provider located outside of Canada. We remain responsible for your data even when it is processed in another jurisdiction, and we use contractual means to ensure that our service providers provide a comparable level of protection while the information is being processed.

**Consent and Transparency.** The Office of the Privacy Commissioner of Canada (OPC) has taken the position that a transfer of personal information to a third party for processing constitutes a "disclosure" under PIPEDA, which requires consent. We therefore obtain your explicit consent before transferring your personal information outside of Canada for processing. When we obtain your consent, we inform you:

* That your personal information may be transferred to service providers located outside of Canada;  
* The countries in which your information may be processed; and  
* The risk that courts, law enforcement, and national security authorities in those countries may access your personal information.

If you have questions about the safeguards we use for cross-border transfers, please contact us at [privacy@dermiciq.com](mailto:privacy@dermiciq.com).

**Québec Residents.** If you are a resident of Québec, we are required to conduct a privacy impact assessment before transferring your personal information outside of Canada. We have documented these assessments and implemented mitigation measures to address identified risks. Our contracts with service providers who process Québec personal information outside Canada reflect Law 25 requirements, and we maintain monitoring mechanisms to verify ongoing compliance.

**Note on Applicable Law Changes.** If applicable federal privacy reform takes effect, we will update our practices and this Privacy Policy as needed to remain compliant.

11. ### Changes to This Privacy Policy

We may update this Privacy Policy from time to time to reflect changes in our practices, our Services, or applicable laws. We will notify you of material changes by:

* Posting the updated policy on our website and app, and updating the effective date;  
* If you have an account, sending you an email notification to the address associated with your account; and  
* Displaying a prominent notice within the Services before the changes take effect.

For material changes, you will be required to affirmatively re-accept the revised Privacy Policy before continuing to use the Services. Your continued use of the Services after the changes take effect without re-acceptance will not constitute acceptance of the revised Privacy Policy. If you do not agree to the revised Privacy Policy, you must stop using the Services and delete your account.

Changes to this Privacy Policy are effective immediately upon posting, except for material changes, which will be effective thirty (30) days after we notify you, unless we indicate otherwise or unless applicable law requires a different timeframe.

We will maintain a version history and change log for this Privacy Policy, which you may access upon request. We encourage you to review this policy periodically to stay informed about how we are protecting your information.

If you are a resident of Québec, we will provide you with notice of any material changes in a manner that complies with Law 25, and you may have additional rights to withdraw your consent or terminate the agreement if the changes are adverse to you and were not reasonably anticipated at the time you gave your consent.

12. ### Contact Us

If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, including exercising your rights under Section 6 (Your Rights), please contact us at:

**17576005 CANADA INC.** doing business as **DermicIQ Technologies**

2 Eva Rd, Etobicoke ON M9C 0A9

[https://dermiciq.com](https://dermiciq.com)

**Privacy Officer (Founder / Director)**

For data privacy, access, correction, deletion requests, or to withdraw your consent: [privacy@dermiciq.com](mailto:privacy@dermiciq.com)

We will respond to your request within thirty (30) days, as required by applicable law. If we need additional time to respond, we will notify you of the extension and the reasons for it. We may need to verify your identity before fulfilling a request.

If you are not satisfied with our response to a privacy concern, you have the right to file a complaint with the Office of the Privacy Commissioner of Canada (OPC). If you are a resident of Québec, you may also file a complaint with the Commission d'accès à l'information du Québec (CAI). We encourage you to first attempt to resolve any issue directly with us before contacting a supervisory authority.

Office of the Privacy Commissioner of Canada: [https://www.priv.gc.ca](https://www.priv.gc.ca)

Commission d'accès à l'information du Québec: [https://www.cai.gouv.qc.ca](https://www.cai.gouv.qc.ca)

We are committed to transparency, data responsibility, and helping you achieve healthier skin. Thank you for trusting DermicIQ with your skincare journey.