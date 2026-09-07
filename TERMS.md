# Terms of Service for GasketCase

**Effective Date:** September 6, 2026  
**Last Updated:** September 6, 2026

Welcome to **GasketCase** ("we", "us", "our"). These Terms of Service ("Terms") govern your access to and use of our web application (the "Service") located at [https://gasket-case.vercel.app](https://gasket-case.vercel.app), along with any associated software, source code, and services provided by developer Daniel Van Bueren via our [GitHub repository](https://github.com/danvanbueren/gasket-case).

**PLEASE READ THESE TERMS CAREFULLY BEFORE USING GASKETCASE. BY ACCESSING, BROWSING, CONNECTING YOUR GOOGLE ACCOUNT, OR USING THE SERVICE, YOU AGREE TO BE BOUND BY THESE TERMS. IF YOU DO NOT AGREE TO ALL OF THESE TERMS, DO NOT ACCESS OR USE GASKETCASE.**

---

## 1. Non-Custodial Architecture & Zero Server-Side Data Maintenance

A fundamental architectural and legal foundation of GasketCase is that **neither the Service, its servers, nor developer Daniel Van Bueren is a custodian of your data**:

1. **Zero Data Maintained by the Server:** We do not operate, host, curate, or maintain any centralized database, relational store, or persistent backend archive for your vehicle records, maintenance logs, mileage readings, or spreadsheets.
2. **Stateless Pass-Through Intermediary:** The application operates exclusively as a stateless user interface and processing pipeline. Requests to Google APIs are executed in-flight using your temporary Google OAuth token. Once an API call completes, no user records or spreadsheets remain on our serverless infrastructure.
3. **Sole User Custody:** You, the user, are the sole and exclusive custodian of your data. All maintenance logs, vehicle metadata, mileage entries, costs, and notes reside exclusively within files stored in your personal Google account (Google Sheets in Google Drive) or within your local web browser's storage (`localStorage`).
4. **No Bailment or Fiduciary Duty:** Your use of GasketCase does not create any bailment, custodial obligation, escrow, duty of care, or fiduciary relationship between you and Daniel Van Bueren.

---

## 2. "Use at Your Own Risk" & Automotive Advisory

**GASKETCASE IS PROVIDED STRICTLY ON A "USE AT YOUR OWN RISK" BASIS.**

### A. Mathematical Extrapolations and Predictive Estimates
* **Informational Estimates Only:** GasketCase calculates daily odometer velocity ($\Delta V$) and forecasts calendar dates for upcoming maintenance milestones based purely on mathematical linear extrapolation of user-supplied mileage readings and default threshold intervals. These forecasts are rough mathematical approximations intended solely for personal record-keeping and tracking convenience.
* **No Professional Advice:** GasketCase does **NOT** provide automotive, mechanical, engineering, safety, or legal advice.
* **No Guarantee Against Mechanical Failure:** GasketCase does not guarantee that following any calculated schedule or prediction will prevent vehicle breakdowns, mechanical failure, parts wear, accidents, safety hazards, or vehicle warranty invalidation.
* **User Inspection Responsibility:** You remain solely responsible for physically inspecting your vehicle, adhering to official vehicle manufacturer service manuals and technical bulletins, and consulting licensed, certified automotive mechanics.

---

## 3. Absolute Disclaimer of Liability for Data Loss

Because GasketCase maintains zero centralized databases and operates on a non-custodial model connecting to external services (Google Drive, Google Sheets) and client-side browser storage (`localStorage`):

* **Zero Liability for Data:** Under no circumstances shall Daniel Van Bueren, project maintainers, contributors, or hosting providers be liable for any loss of data, corrupted spreadsheets, failed writes, accidental overwrites, missing maintenance history, synchronization failures, unauthorized access to your Google account, or service outages.
* **No Duty to Preserve, Recover, or Restore:** The developer possesses no copies of your records and has no technical ability, duty, or obligation to retrieve, recover, restore, or reconstruct any lost or corrupted files.
* **User Backup Obligation:** You are solely and exclusively responsible for maintaining independent, periodic backups of your vehicle records, Google Sheets spreadsheets, and local browser data.

---

## 4. Disclaimer of Warranties

TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW:

GASKETCASE IS PROVIDED STRICTLY ON AN **"AS IS"** AND **"AS AVAILABLE"** BASIS, WITHOUT WARRANTIES, CONDITIONS, OR GUARANTEES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE.

THE DEVELOPER AND CONTRIBUTORS EXPLICITLY DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO:
1. IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, QUIET ENJOYMENT, AND NON-INFRINGEMENT.
2. ANY WARRANTIES THAT THE SERVICE WILL BE CONTINUOUS, UNINTERRUPTED, SECURE, BUG-FREE, OR ERROR-FREE.
3. ANY WARRANTIES REGARDING THE ACCURACY, RELIABILITY, OR COMPLETENESS OF ANY PREDICTIVE CALCULATIONS, ODONOMETER VELOCITIES, COST METRICS, OR TIMELINE DATES.

---

## 5. Limitation of Liability

**TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL DANIEL VAN BUEREN, THE PROJECT MAINTAINERS, CONTRIBUTORS, AFFILIATES, OR HOSTING PROVIDERS BE LIABLE UNDER ANY LEGAL THEORY (WHETHER IN CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY, WARRANTY, OR OTHERWISE) FOR ANY:**

1. **DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, PUNITIVE, OR CONSEQUENTIAL DAMAGES;**
2. **LOSS OF DATA, LOSS OF PROFITS, LOSS OF REVENUE, LOSS OF GOODWILL, OR BUSINESS INTERRUPTION;**
3. **VEHICLE DAMAGE, MECHANICAL BREAKDOWN, ENGINE FAILURE, ACCIDENTS, COSTS OF REPLACEMENT PARTS OR REPAIR SERVICES, OR PERSONAL INJURY;**

**ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF, INABILITY TO USE, OR RELIANCE UPON GASKETCASE, ITS PREDICTIVE ALGORITHMS, OR ITS THIRD-PARTY INTEGRATIONS, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.**

**BECAUSE NO DATA IS MAINTAINED BY THE SERVER OR DEVELOPER, THE DEVELOPER BEARS ZERO LIABILITY. IF APPLICABLE LAW DOES NOT PERMIT TOTAL EXCLUSION OF LIABILITY, OUR TOTAL AGGREGATE LIABILITY SHALL NOT EXCEED ONE UNITED STATES DOLLAR (\$1.00 USD).**

---

## 6. Google Accounts & Third-Party Services

1. **Google APIs and Terms:** GasketCase interacts with Google Drive and Google Sheets APIs. Your use of Google services is governed by the [Google Terms of Service](https://policies.google.com/terms) and [Google Privacy Policy](https://policies.google.com/privacy). We are not responsible for Google service availability, API deprecations, rate limiting, or account terminations.
2. **Scoped Authorization:** When connecting your Google account, you authorize GasketCase to access scoped permissions (`drive.file` and `spreadsheets`). You can disconnect the Service and revoke permissions at any time via your [Google Account Permissions](https://myaccount.google.com/permissions).
3. **Third-Party Hosting:** GasketCase is deployed on Vercel Inc. Your access to the web interface is subject to Vercel's network availability.

---

## 7. Privacy & Data Handling Practices

Your privacy and our data handling practices are governed by our **[Privacy Policy](PRIVACY.md)**. Please review the Privacy Policy for full disclosures regarding our non-custodial data flow, scoped Google OAuth permissions, compliance with the Google API Services User Data Policy (including Limited Use requirements), and your privacy rights under the GDPR and CCPA/CPRA.

---

## 8. Permitted Use & User Responsibilities

You agree that you will:
* Use GasketCase solely for lawful automotive maintenance tracking purposes in accordance with these Terms;
* Maintain the security of your own Google account credentials;
* Not attempt to probe, scan, or compromise the security of the application or underlying infrastructure;
* Not use GasketCase to transmit malware, abuse Google API quotas, or engage in automated scraping;
* Respect intellectual property rights and the project's [LICENSE.md](https://github.com/danvanbueren/gasket-case/blob/main/LICENSE.md).

---

## 9. Intellectual Property

All rights, title, and interest in and to the GasketCase codebase, design, trademarks, and user interface are owned by Daniel Van Bueren as set forth in [LICENSE.md](https://github.com/danvanbueren/gasket-case/blob/main/LICENSE.md). You are granted a limited, personal, revocable, non-exclusive, non-transferable license to access and use the hosted Service for your personal vehicle maintenance tracking.

---

## 10. Modifications to the Service and Terms

We reserve the right, at our sole discretion, to modify, update, suspend, or discontinue GasketCase (or any portion thereof) at any time without notice or liability.

We may also update these Terms periodically. When changes are made, the "Last Updated" date at the top of this document will be updated. Your continued use of the Service following any modifications constitutes your acceptance of the revised Terms.

---

## 11. Severability & Entire Agreement

If any provision of these Terms is found to be unlawful, void, or unenforceable, that provision shall be deemed severable and shall not affect the validity and enforceability of any remaining provisions. These Terms, together with our [Privacy Policy](PRIVACY.md) and [LICENSE.md](LICENSE.md), constitute the entire agreement between you and Daniel Van Bueren regarding GasketCase.

---

## 12. Contact Us

If you have questions, feedback, or concerns regarding these Terms of Service, we prefer contact through our GitHub repository issues, with email available as a backup:

* **Primary Channel (GitHub Issues):** [https://github.com/danvanbueren/gasket-case/issues](https://github.com/danvanbueren/gasket-case/issues)  
* **Backup Channel (Email):** [gasket-case@googlegroups.com](mailto:gasket-case@googlegroups.com)  
* **Developer & Maintainer:** Daniel Van Bueren  
* **Project Repository:** [https://github.com/danvanbueren/gasket-case](https://github.com/danvanbueren/gasket-case)
