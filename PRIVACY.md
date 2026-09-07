# Privacy Policy for GasketCase

**Effective Date:** September 6, 2026  
**Last Updated:** September 6, 2026

Welcome to **GasketCase** ("we", "us", "our"). We are committed to protecting your privacy and ensuring you retain complete control over your personal and automotive maintenance data. GasketCase operates under a strictly **non-custodial, zero-storage backend** architectural model: **no user data, vehicle records, mileage logs, or spreadsheets are ever maintained, stored, or held in custody by our servers, hosting infrastructure, or the developer.**

Because GasketCase is **not a data custodian** and maintains no data on its servers, the developer possesses no copies of your records and bears **no custodial responsibility or liability** for your data.

This Privacy Policy explains how GasketCase accesses, uses, and facilitates user-owned storage when you use our web application (the "Service") located at [https://gasket-case.vercel.app](https://gasket-case.vercel.app) or when self-hosting the application from our [GitHub repository](https://github.com/danvanbueren/gasket-case).

---

## 1. Non-Custodial Software Developer & Contact Information

Because GasketCase maintains zero centralized databases and stores no user records on any server, the developer acts strictly as a **non-custodial open-source software provider**, not a data custodian, data repository, or cloud storage provider.

* **Developer & Maintainer:** Daniel Van Bueren  
* **Primary Contact (GitHub Issues):** [https://github.com/danvanbueren/gasket-case/issues](https://github.com/danvanbueren/gasket-case/issues)  
* **Backup Contact (Email / Google Group):** [gasket-case@googlegroups.com](mailto:gasket-case@googlegroups.com)  
* **Project Repository:** [https://github.com/danvanbueren/gasket-case](https://github.com/danvanbueren/gasket-case)

If you have any questions, concerns, or requests regarding this Privacy Policy or software operation, we prefer that you reach out by opening an issue on our [GitHub Issues](https://github.com/danvanbueren/gasket-case/issues) page. You may also contact us via email at [gasket-case@googlegroups.com](mailto:gasket-case@googlegroups.com) as a backup.

---

## 2. Non-Custodial Architecture: No Data Maintained by Server or Custodian

A fundamental tenet of GasketCase is that **neither the server nor the developer is a custodian of your data**:

1. **Zero Server-Side Storage:** We do not maintain, host, back up, or operate any relational database, document database, or persistent storage for your vehicle records, maintenance logs, or spreadsheets.
2. **Stateless Pass-Through Processing:** Serverless API routes operate purely as a stateless, real-time intermediary. Requests are processed in-flight using your temporary Google OAuth token to communicate directly with your own Google Drive. Once the HTTP request finishes, no user data remains on the server.
3. **Sole User Custody:** You, the user, are the sole and exclusive custodian of your data. Your records exist solely in your personal Google account (Google Sheets) or locally in your device's browser cache (`localStorage`). No custodial relationship, bailment, or fiduciary duty is created between you and Daniel Van Bueren.

---

## 3. Information We Collect and Process

### A. Google OAuth Profile Information
When you choose to sign in using Google OAuth 2.0, we request permission to access basic profile details:
* **Data Accessed:** Your name, email address, and profile picture (`openid`, `email`, `profile`).
* **Purpose:** To authenticate your identity, secure communication with Google APIs, and display your name and avatar in the application navigation bar.
* **Storage:** This information is retained solely in an encrypted, short-lived session cookie (JSON Web Token) in your browser. It is not written to any database on our servers.

### B. Vehicle Maintenance Records
When you create a vehicle profile or log a service entry:
* **Data Processed:** Vehicle name/model, service dates, odometer readings, component names (e.g., "Oil Change", "Brake Fluid Flush"), service costs, and notes.
* **Storage & Custody:** This data is written directly to structured Google Sheets spreadsheets created inside your personal Google Drive account. We do not store copies of your logs on external servers.

### C. Guest Demo Mode (Local Storage)
If you explore GasketCase using our Guest Demo Mode:
* **No Authentication Required:** You do not sign in or provide any personal credentials.
* **Data Storage:** All demonstration data (sample vehicles, maintenance entries, and custom intervals) is stored strictly within your web browser's `localStorage` (`gasketcase_demo_vehicles`, `gasketcase_demo_events_*`).
* **Network Isolation:** Demo mode data is never sent to our servers or any third-party cloud service.

### D. Cookies and Session Management
* **Essential Session Cookies:** We use standard, encrypted HTTP-only session cookies managed by NextAuth to maintain your authenticated session while using the application.
* **No Advertising Cookies:** We do not use third-party advertising cookies, cross-site trackers, or marketing pixels.

### E. Performance and Telemetry Data
* **Vercel Web Analytics:** We utilize Vercel Web Analytics to monitor application performance, page load times, and aggregated usage metrics (Core Web Vitals). Vercel Web Analytics is privacy-friendly and cookieless; it does not collect personal data, track IP addresses, or profile individual visitors across websites.

---

## 4. Google API Services User Data Policy Compliance

GasketCase accesses and interacts with Google APIs to deliver core functionality. 

> **Google API Limited Use Disclosure:**  
> GasketCase's use and transfer to any other app of information received from Google APIs will adhere to the [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy), including the **Limited Use** requirements.

### Scopes Requested and Purpose:
1. `https://www.googleapis.com/auth/drive.file`
   * **Purpose:** Allows GasketCase to create, view, and manage only the specific Google Sheets files that were created by GasketCase (files prefixed with `GasketCase_`) or that you explicitly open with the application.
   * **Limitation:** GasketCase has zero visibility or access to any of your other documents, photos, or files stored in Google Drive.
2. `https://www.googleapis.com/auth/spreadsheets`
   * **Purpose:** Enables reading existing maintenance rows and appending new maintenance logs to your vehicle log sheets.
3. `openid`, `email`, `profile`
   * **Purpose:** Verifies your Google identity and displays your profile information in the user interface.

### Limited Use Affirmations:
* **No Secondary Use:** We only use Google user data to provide user-facing features prominently displayed in the GasketCase interface (e.g., viewing maintenance timelines, calculating service forecasts, logging odometer readings).
* **No Advertising:** We do not use or transfer Google user data for serving advertisements, including personalized, retargeted, or interest-based ads.
* **No Sale of Data:** We never sell, rent, or monetize Google user data under any circumstances.
* **No AI/ML Model Training:** We do not use Google user data to train, fine-tune, or validate generalized artificial intelligence (AI) or machine learning (ML) models.
* **Strict Human Access Restrictions:** No humans are permitted to read your raw Google user data, except under the following narrow circumstances:
  * You have given explicit, affirmative consent for troubleshooting or support purposes;
  * It is strictly necessary for security purposes (such as investigating abuse or vulnerabilities);
  * It is required to comply with applicable laws, legal processes, or enforceable governmental requests; or
  * The data is aggregated and anonymized for internal technical operations.

---

## 5. Sharing and Third-Party Disclosures

We do not disclose your personal data to third parties, except in the following limited situations:

1. **User-Initiated Sharing:** GasketCase provides an optional sharing feature that allows you to share your vehicle log spreadsheets with mechanics, co-owners, or family members. When you use this feature, the application calls Google Drive's native permission APIs (`drive.permissions.create`) to grant access directly via Google Drive. You maintain control over who has access.
2. **Infrastructure Hosting:** Our web application and serverless API routes are hosted on Vercel Inc. Data in transit passes through Vercel's secure routing infrastructure to execute stateless requests.
3. **Legal Compliance:** We may disclose information if required to do so by law, regulation, subpoena, or valid legal order.

---

## 6. Non-Custodial Architecture, Data Storage, & Deletion

* **Zero Server-Side Custody:** Because GasketCase does not maintain a central database and stores no user records on its servers, **we have no custody or possession of your data.** Your maintenance records exist exclusively in your Google Drive or local browser storage.
* **No Server Data to Delete or Recover:** Because no records are maintained by the server, GasketCase cannot delete, restore, recover, or alter your data on your behalf.
* **Deleting Your Data (Self-Service):**
  * **Google Drive Sheets:** You can permanently delete any vehicle log spreadsheet at any time by moving the corresponding `GasketCase_...` file to the trash inside [Google Drive](https://drive.google.com).
  * **Guest Demo Mode:** You can remove all demo records at any time by clearing your browser's site data / local storage.
  * **Session Termination:** Signing out immediately terminates your active session and discards your access token from the browser cookie.
* **Revoking App Access:** You can revoke GasketCase's authorization to interact with your Google Account at any time through your [Google Account Security Settings](https://myaccount.google.com/permissions). Once revoked, GasketCase cannot access your Google Drive or read/write any spreadsheets.

---

## 7. Security of Your Information

We employ industry-standard technical measures to ensure your data remains secure:
* **Encryption in Transit:** All traffic between your browser, our serverless routes, and Google APIs is strictly encrypted using HTTPS / Transport Layer Security (TLS).
* **Token-Based Authorization:** GasketCase accesses Google APIs using short-lived OAuth 2.0 access tokens. We never receive or store your Google account password.
* **Scoped Least-Privilege Access:** We strictly request the minimal OAuth scopes necessary (`drive.file` rather than full Drive access), ensuring the app cannot access unrelated files.

---

## 8. Your Rights (GDPR & CCPA/CPRA)

Depending on your jurisdiction (including the European Economic Area, the UK, and California), you possess certain rights regarding your personal data:

* **Right to Access & Portability:** You have the right to access and obtain a portable copy of your data. Because all vehicle logs are stored directly as standard Google Sheets files in your Google Drive, you can export, download (in CSV, XLSX, or PDF formats), or copy your raw data at any time without restriction.
* **Right to Rectification:** You can edit or correct any maintenance entry either through the GasketCase interface or directly within the underlying Google Sheet.
* **Right to Erasure (Right to be Forgotten):** You can delete your records directly from Google Drive or clear your local browser storage.
* **Right to Withdraw Consent:** You can disconnect GasketCase at any time via your Google Account settings.
* **California Consumer Privacy Act (CCPA/CPRA):** We do not "sell" or "share" personal information as those terms are defined under California law. We do not discriminate against users for exercising any privacy rights.

To submit a request or exercise any of your privacy rights, we prefer that you open an issue on [GitHub Issues](https://github.com/danvanbueren/gasket-case/issues), or you can email us at [gasket-case@googlegroups.com](mailto:gasket-case@googlegroups.com).

---

## 9. Children's Privacy

GasketCase is not directed to individuals under the age of 13 (or under 16 where applicable by local law). We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please reach out via [GitHub Issues](https://github.com/danvanbueren/gasket-case/issues) or contact us at [gasket-case@googlegroups.com](mailto:gasket-case@googlegroups.com), and we will take immediate steps to assist in removing such information.

---

## 10. Relationship to Terms of Service

This Privacy Policy governs our privacy, data handling, and Google API compliance practices. Your access to and use of GasketCase is subject to our **[Terms of Service](TERMS.md)**, which sets forth the contractual terms between you and Daniel Van Bueren, including our non-custodial software model, "Use at Your Own Risk" automotive advisory, disclaimer of warranties, and comprehensive limitations of liability.

---

## 11. Changes to This Privacy Policy

We may update this Privacy Policy from time to time to reflect improvements in our architecture, changes in third-party integrations, or updates to applicable regulations. When changes are made, we will update the "Last Updated" date at the top of this policy. We encourage you to review this policy periodically.

---

## 12. Contact Us

If you have questions, feedback, or concerns regarding this Privacy Policy or our data practices, please contact us. We prefer contact through our GitHub Issues tracker, with email available as a backup:

* **Primary Channel (GitHub Issues):** [https://github.com/danvanbueren/gasket-case/issues](https://github.com/danvanbueren/gasket-case/issues)  
* **Backup Channel (Email):** [gasket-case@googlegroups.com](mailto:gasket-case@googlegroups.com)  
* **Developer & Maintainer:** Daniel Van Bueren  
* **Project Repository:** [https://github.com/danvanbueren/gasket-case](https://github.com/danvanbueren/gasket-case)
