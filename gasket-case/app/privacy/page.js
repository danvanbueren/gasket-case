'use client'

import React from 'react'
import Link from 'next/link'
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Divider,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import SecurityIcon from '@mui/icons-material/Security'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import StorageIcon from '@mui/icons-material/Storage'
import GavelIcon from '@mui/icons-material/Gavel'
import WarningIcon from '@mui/icons-material/Warning'

export default function PrivacyPolicyPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0B0F19 0%, #111827 50%, #07152B 100%)',
        color: 'text.primary',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header bar */}
      <Box
        sx={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(16px)',
          backgroundColor: 'rgba(11, 15, 25, 0.7)',
          position: 'sticky',
          top: 0,
          zIndex: 1100,
          py: 2,
        }}
      >
        <Container
          maxWidth="md"
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box
              component={Link}
              href="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <DirectionsCarIcon
                sx={{
                  fontSize: '1.8rem',
                  color: 'primary.main',
                  filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.5))',
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  background: 'linear-gradient(90deg, #FFFFFF 0%, #06B6D4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                GasketCase
              </Typography>
            </Box>

            <Button
              component={Link}
              href="/"
              variant="outlined"
              size="small"
              startIcon={
                <ArrowBackIcon />
              }
              sx={{
                borderColor: 'rgba(255, 255, 255, 0.15)',
                color: '#F3F4F6',
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'rgba(6, 182, 212, 0.04)',
                },
              }}
            >
              Back to Home
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Main Content Area */}
      <Container
        maxWidth="md"
        sx={{
          py: 6,
          flexGrow: 1,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 6 },
            borderRadius: 3,
            backdropFilter: 'blur(12px)',
            backgroundColor: 'rgba(17, 24, 39, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          {/* Header Title */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              mb: 1.5,
            }}
          >
            <SecurityIcon
              sx={{
                fontSize: '2.4rem',
                color: 'primary.main',
              }}
            />
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 900,
                letterSpacing: '-0.02em',
              }}
            >
              Privacy Policy
            </Typography>
          </Box>

          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              mb: 4,
            }}
          >
            Effective Date: September 6, 2026 &bull; Last Updated: September 6, 2026
          </Typography>

          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.8,
              color: 'text.secondary',
              mb: 4,
            }}
          >
            Welcome to <strong style={{ color: '#F3F4F6' }}>GasketCase</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;). We are committed to protecting your privacy and ensuring you retain absolute custody of your automotive maintenance records. GasketCase operates under a strictly <strong>non-custodial, zero-storage backend</strong> architectural model: <strong>no user data, vehicle records, mileage logs, or spreadsheets are ever maintained, stored, or held in custody by our servers, hosting infrastructure, or the developer.</strong>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.8,
              color: 'text.secondary',
              mb: 4,
            }}
          >
            Because GasketCase is <strong>not a data custodian</strong> and maintains zero data on its servers, the developer possesses no copies of your records and bears <strong>no custodial responsibility or liability</strong> for your data.
          </Typography>

          <Divider
            sx={{
              borderColor: 'rgba(255, 255, 255, 0.08)',
              mb: 4,
            }}
          />

          {/* Section 1 */}
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: 700,
              color: '#F3F4F6',
              mb: 1.5,
            }}
          >
            1. Non-Custodial Software Developer &amp; Contact Information
          </Typography>
          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.7,
              color: 'text.secondary',
              mb: 3,
            }}
          >
            Because GasketCase maintains zero centralized databases and stores no user records on any server, the developer acts strictly as a <strong>non-custodial open-source software provider</strong>, not a data custodian, data repository, or cloud storage provider.
          </Typography>
          <Box
            sx={{
              p: 2.5,
              borderRadius: 2,
              backgroundColor: 'rgba(0, 0, 0, 0.25)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              mb: 4,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: '#E5E7EB',
                fontWeight: 600,
                mb: 0.5,
              }}
            >
              Daniel Van Bueren (Developer &amp; Maintainer)
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                mb: 0.5,
              }}
            >
              Primary Contact (Preferred):{' '}
              <Box
                component="a"
                href="https://github.com/danvanbueren/gasket-case/issues"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'primary.main',
                  textDecoration: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                GitHub Issues Tracker
              </Box>
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                mb: 0.5,
              }}
            >
              Backup Contact (Email):{' '}
              <Box
                component="a"
                href="mailto:gasket-case@googlegroups.com"
                sx={{
                  color: 'primary.main',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                gasket-case@googlegroups.com
              </Box>
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
              }}
            >
              GitHub Repository:{' '}
              <Box
                component="a"
                href="https://github.com/danvanbueren/gasket-case"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'primary.main',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                https://github.com/danvanbueren/gasket-case
              </Box>
            </Typography>
          </Box>

          {/* Section 2 */}
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: 700,
              color: '#F3F4F6',
              mb: 1.5,
            }}
          >
            2. Non-Custodial Architecture: No Data Maintained by Server or Custodian
          </Typography>
          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.7,
              color: 'text.secondary',
              mb: 2,
            }}
          >
            A fundamental tenet of GasketCase is that <strong>neither the server nor the developer is a custodian of your data</strong>:
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              mb: 4,
              color: 'text.secondary',
              '& li': {
                mb: 1,
                lineHeight: 1.7,
              },
            }}
          >
            <li>
              <strong style={{ color: '#F3F4F6' }}>Zero Server-Side Storage:</strong> We do not operate, host, or maintain any relational database, document store, or persistent cloud database for your maintenance logs or vehicle records.
            </li>
            <li>
              <strong style={{ color: '#F3F4F6' }}>Stateless Pass-Through Processing:</strong> Our serverless API routes act solely as a stateless, real-time intermediary, processing data in-flight using your temporary Google OAuth token to communicate directly with your Google Drive. Once an API call completes, no user data remains on the server.
            </li>
            <li>
              <strong style={{ color: '#F3F4F6' }}>Sole User Custody:</strong> You, the user, are the sole and exclusive custodian of your data. Your records exist solely in your personal Google account (Google Sheets) or inside your browser local storage. No custodial relationship, bailment, or fiduciary duty is created between you and Daniel Van Bueren.
            </li>
          </Box>

          {/* Section 3 */}
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: 700,
              color: '#F3F4F6',
              mb: 1.5,
            }}
          >
            3. Information We Collect and Process
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              mb: 4,
              color: 'text.secondary',
              '& li': {
                mb: 1.5,
                lineHeight: 1.7,
              },
            }}
          >
            <li>
              <strong style={{ color: '#F3F4F6' }}>Google OAuth Profile Details:</strong> When signing in with Google, we process your name, email address, and profile picture (via <code>openid</code>, <code>email</code>, and <code>profile</code> scopes) to authenticate your identity and display your avatar in the app navigation bar. This data is held strictly inside an encrypted JSON Web Token (JWT) session cookie in your browser.
            </li>
            <li>
              <strong style={{ color: '#F3F4F6' }}>Automotive Maintenance Records:</strong> Vehicle names, service dates, odometer readings, component names, costs, and notes. This data is written directly to Google Sheets spreadsheets in your Google Drive.
            </li>
            <li>
              <strong style={{ color: '#F3F4F6' }}>Guest Demo Mode Data:</strong> When testing GasketCase in Guest Demo Mode without signing in, sample vehicles and logs are stored exclusively in your browser&rsquo;s <code>localStorage</code>. Demo data never crosses the network or touches any server.
            </li>
            <li>
              <strong style={{ color: '#F3F4F6' }}>Cookies and Sessions:</strong> We use strictly necessary, encrypted HTTP-only session cookies managed by NextAuth to maintain authentication state. We never use advertising or third-party tracking cookies.
            </li>
            <li>
              <strong style={{ color: '#F3F4F6' }}>Performance Analytics:</strong> We use Vercel Web Analytics to measure aggregated, cookieless performance metrics (such as Core Web Vitals and general page views). Vercel Analytics does not collect personal identifiers, track IP addresses, or profile individual visitors across websites.
            </li>
          </Box>

          {/* Section 4 - Google API Limited Use Highlight */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              backgroundColor: 'rgba(6, 182, 212, 0.08)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              mb: 4,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                mb: 1.5,
              }}
            >
              <VerifiedUserIcon
                sx={{
                  color: 'primary.main',
                  fontSize: '1.6rem',
                }}
              />
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: 700,
                  color: '#F3F4F6',
                }}
              >
                4. Google API Services User Data Policy Compliance
              </Typography>
            </Box>

            <Typography
              variant="body2"
              sx={{
                lineHeight: 1.7,
                color: '#E0F2FE',
                mb: 2,
                fontWeight: 500,
              }}
            >
              GasketCase&rsquo;s use and transfer to any other app of information received from Google APIs will adhere to the{' '}
              <Box
                component="a"
                href="https://developers.google.com/terms/api-services-user-data-policy"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'primary.main',
                  textDecoration: 'underline',
                  fontWeight: 600,
                }}
              >
                Google API Services User Data Policy
              </Box>
              , including the <strong>Limited Use</strong> requirements.
            </Typography>

            <Typography
              variant="body2"
              sx={{
                lineHeight: 1.7,
                color: 'text.secondary',
                mb: 1.5,
              }}
            >
              <strong>Scopes Requested:</strong>
            </Typography>
            <Box
              component="ul"
              sx={{
                pl: 3,
                mb: 2,
                color: 'text.secondary',
                '& li': {
                  mb: 1,
                  lineHeight: 1.6,
                },
              }}
            >
              <li>
                <code>https://www.googleapis.com/auth/drive.file</code>: Strictly permits GasketCase to create and edit spreadsheets created by or opened with the application (prefixed with <code>GasketCase_</code>). GasketCase cannot access, read, or see any other files in your Google Drive.
              </li>
              <li>
                <code>https://www.googleapis.com/auth/spreadsheets</code>: Used solely to read and append vehicle maintenance rows to your log sheets.
              </li>
              <li>
                <code>openid</code>, <code>email</code>, <code>profile</code>: Used solely for identity authentication and session display.
              </li>
            </Box>

            <Typography
              variant="body2"
              sx={{
                lineHeight: 1.7,
                color: 'text.secondary',
                mb: 1,
              }}
            >
              <strong>Limited Use Affirmations:</strong>
            </Typography>
            <Box
              component="ul"
              sx={{
                pl: 3,
                color: 'text.secondary',
                '& li': {
                  mb: 0.8,
                  lineHeight: 1.6,
                },
              }}
            >
              <li>We only use Google user data to provide user-facing features prominently visible in the GasketCase UI.</li>
              <li>We do not transfer Google user data to third parties, except as strictly necessary to fulfill the application&rsquo;s core functions or comply with law.</li>
              <li>We do not use or transfer Google user data to serve advertisements, including personalized, retargeted, or interest-based ads.</li>
              <li>We never sell, rent, or monetize Google user data under any circumstances.</li>
              <li>We do not use Google user data to train, fine-tune, or validate generalized artificial intelligence (AI) or machine learning (ML) models.</li>
              <li>No humans are permitted to read your raw Google user data unless you have given affirmative consent for technical troubleshooting, it is necessary for security investigations, or required by law.</li>
            </Box>
          </Paper>

          {/* Section 5 */}
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: 700,
              color: '#F3F4F6',
              mb: 1.5,
            }}
          >
            5. Sharing and Third-Party Disclosures
          </Typography>
          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.7,
              color: 'text.secondary',
              mb: 2,
            }}
          >
            We do not sell, rent, or disclose your personal data to third parties, except in the following limited circumstances:
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              mb: 4,
              color: 'text.secondary',
              '& li': {
                mb: 1,
                lineHeight: 1.7,
              },
            }}
          >
            <li>
              <strong style={{ color: '#F3F4F6' }}>User-Initiated Sharing:</strong> When you use GasketCase&rsquo;s optional share dialog to share a vehicle log with a mechanic or co-owner, the app instructs the Google Drive API to share that specific spreadsheet directly via Google Drive permissions. You maintain full ownership and control over shared collaborators.
            </li>
            <li>
              <strong style={{ color: '#F3F4F6' }}>Infrastructure Hosting:</strong> GasketCase runs on Vercel Inc. API requests transit Vercel&rsquo;s routing layer statelessly.
            </li>
            <li>
              <strong style={{ color: '#F3F4F6' }}>Legal Compliance:</strong> We may disclose information if required by enforceable legal process, regulation, or law.
            </li>
          </Box>

          {/* Section 6 */}
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: 700,
              color: '#F3F4F6',
              mb: 1.5,
            }}
          >
            6. Non-Custodial Status, Data Storage, &amp; Deletion
          </Typography>
          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.7,
              color: 'text.secondary',
              mb: 2,
            }}
          >
            Because GasketCase does not maintain a central database and stores no records on its servers, <strong>we have no custody or possession of your data:</strong>
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              mb: 4,
              color: 'text.secondary',
              '& li': {
                mb: 1,
                lineHeight: 1.7,
              },
            }}
          >
            <li>
              <strong style={{ color: '#F3F4F6' }}>Zero Server-Side Custody:</strong> Neither our servers nor the developer hold, maintain, or back up your records. All data lives solely within your personal Google account or local browser cache.
            </li>
            <li>
              <strong style={{ color: '#F3F4F6' }}>No Server Data to Delete or Recover:</strong> Because no records are maintained by the server, GasketCase cannot delete, restore, recover, or alter your spreadsheets on your behalf.
            </li>
            <li>
              <strong style={{ color: '#F3F4F6' }}>Deleting Your Spreadsheets (Self-Service):</strong> You can permanently delete any vehicle log spreadsheet at any time by moving the file to trash in <a href="https://drive.google.com" target="_blank" rel="noopener noreferrer" style={{ color: '#06B6D4' }}>Google Drive</a>.
            </li>
            <li>
              <strong style={{ color: '#F3F4F6' }}>Clearing Guest Demo Mode:</strong> You can wipe all demo records instantly by clearing your browser local storage.
            </li>
            <li>
              <strong style={{ color: '#F3F4F6' }}>Revoking App Access:</strong> You can revoke GasketCase&rsquo;s authorization to connect to your Google account at any time via your <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer" style={{ color: '#06B6D4' }}>Google Account Permissions</a>. Once revoked, GasketCase loses all access to your Google account and files.
            </li>
          </Box>

          {/* Section 7 - Non-Custodial Architecture, Zero Custodial Liability, & "Use at Your Own Risk" */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              backgroundColor: 'rgba(245, 158, 11, 0.05)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              mb: 4,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                mb: 1.5,
              }}
            >
              <WarningIcon
                sx={{
                  color: 'warning.main',
                  fontSize: '1.6rem',
                }}
              />
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: 700,
                  color: '#F3F4F6',
                }}
              >
                7. Non-Custodial Architecture, Zero Custodial Liability, &amp; &ldquo;Use at Your Own Risk&rdquo;
              </Typography>
            </Box>

            <Typography
              variant="body2"
              sx={{
                lineHeight: 1.7,
                color: '#FEF3C7',
                mb: 2,
                fontWeight: 600,
              }}
            >
              PLEASE READ THIS SECTION CAREFULLY. IT GOVERNS THE NON-CUSTODIAL NATURE OF GASKETCASE AND ELIMINATES ALL LIABILITY OF THE DEVELOPER.
            </Typography>

            <Typography
              variant="body2"
              sx={{
                lineHeight: 1.7,
                color: 'text.secondary',
                mb: 2,
              }}
            >
              <strong style={{ color: '#F3F4F6' }}>A. Confirmation of Non-Custodial Status &amp; No Server-Side Maintenance:</strong> You explicitly acknowledge and agree that GasketCase, its server infrastructure, and developer Daniel Van Bueren do not maintain, store, hold, possess, back up, or curate any user data, vehicle records, or maintenance logs. GasketCase is NOT a data custodian, data repository, or fiduciary. No bailment, custodial duty, or fiduciary relationship is created. You are the sole and exclusive custodian of your records.
            </Typography>

            <Typography
              variant="body2"
              sx={{
                lineHeight: 1.7,
                color: 'text.secondary',
                mb: 2,
              }}
            >
              <strong style={{ color: '#F3F4F6' }}>B. Complete Absence of Liability for Data Loss:</strong> Because neither the server nor the developer maintains or holds custody of your data, the developer and maintainers have NO legal liability, NO duty of care, and NO obligation regarding any data loss, spreadsheet deletion, corruption, synchronization errors, or service interruptions. The developer owes no duty to preserve or restore your data. You are solely responsible for maintaining independent backups.
            </Typography>

            <Typography
              variant="body2"
              sx={{
                lineHeight: 1.7,
                color: 'text.secondary',
                mb: 2,
              }}
            >
              <strong style={{ color: '#F3F4F6' }}>C. &ldquo;As-Is&rdquo; Provision &amp; &ldquo;Use at Your Own Risk&rdquo;:</strong> GasketCase is provided strictly on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis, without warranties of any kind, whether express, implied, statutory, or otherwise. The developer and contributors disclaim all warranties, including implied warranties of merchantability, fitness for a particular purpose, non-infringement, accuracy, and title.
            </Typography>

            <Typography
              variant="body2"
              sx={{
                lineHeight: 1.7,
                color: 'text.secondary',
                mb: 2,
              }}
            >
              <strong style={{ color: '#F3F4F6' }}>D. Automotive Advisory &amp; Estimation Disclaimer:</strong> You acknowledge that odometer velocity (&Delta;V) and forecasted milestone dates are rough mathematical estimates for personal tracking only. GasketCase does NOT provide automotive, mechanical, safety, engineering, or legal advice, and does not guarantee that following any forecast will prevent breakdowns or parts wear. You remain solely responsible for consulting certified automotive technicians.
            </Typography>

            <Typography
              variant="body2"
              sx={{
                lineHeight: 1.7,
                color: 'text.secondary',
              }}
            >
              <strong style={{ color: '#F3F4F6' }}>E. Comprehensive Limitation of Liability:</strong> TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL DANIEL VAN BUEREN, CONTRIBUTORS, OR AFFILIATES BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, PUNITIVE, OR CONSEQUENTIAL DAMAGES WHATSOEVER (INCLUDING DAMAGES FOR LOSS OF DATA, LOSS OF PROFITS, VEHICLE DAMAGE, MECHANICAL FAILURE, REPAIR COSTS, PERSONAL INJURY, OR REPUTATIONAL HARM) ARISING OUT OF OR IN CONNECTION WITH THE USE OF OR INABILITY TO USE GASKETCASE, UNDER ANY THEORY OF LIABILITY. BECAUSE NO DATA IS MAINTAINED BY THE SERVER OR DEVELOPER, THE DEVELOPER BEARS ZERO LIABILITY. AGGREGATE LIABILITY SHALL NOT EXCEED ONE UNITED STATES DOLLAR ($1.00 USD).
            </Typography>
          </Paper>

          {/* Section 8 */}
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: 700,
              color: '#F3F4F6',
              mb: 1.5,
            }}
          >
            8. Security of Your Information
          </Typography>
          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.7,
              color: 'text.secondary',
              mb: 4,
            }}
          >
            All network communication between your browser, GasketCase serverless routes, and Google APIs is strictly encrypted using Transport Layer Security (TLS/HTTPS). We use short-lived OAuth 2.0 access tokens and never receive or store your Google account password. Scoped permissions (<code>drive.file</code>) prevent access to non-GasketCase documents.
          </Typography>

          {/* Section 9 */}
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: 700,
              color: '#F3F4F6',
              mb: 1.5,
            }}
          >
            9. Your Rights (GDPR &amp; CCPA/CPRA)
          </Typography>
          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.7,
              color: 'text.secondary',
              mb: 2,
            }}
          >
            Under applicable data protection laws (such as the GDPR and CCPA/CPRA), you possess several rights:
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              mb: 4,
              color: 'text.secondary',
              '& li': {
                mb: 1,
                lineHeight: 1.7,
              },
            }}
          >
            <li><strong style={{ color: '#F3F4F6' }}>Access &amp; Data Portability:</strong> You can export, download, or copy your complete vehicle logs at any time in CSV, Excel, or PDF formats directly from Google Sheets.</li>
            <li><strong style={{ color: '#F3F4F6' }}>Rectification:</strong> You can correct or update records through the app or by editing your Google Sheet directly.</li>
            <li><strong style={{ color: '#F3F4F6' }}>Erasure:</strong> You can delete any vehicle sheet directly in Google Drive.</li>
            <li><strong style={{ color: '#F3F4F6' }}>Withdrawal of Consent:</strong> You can disconnect GasketCase at any time via your Google security settings.</li>
            <li><strong style={{ color: '#F3F4F6' }}>California Privacy Notice:</strong> We do not sell or share personal information as defined by California law.</li>
          </Box>
          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.7,
              color: 'text.secondary',
              mb: 4,
            }}
          >
            To submit a request or exercise any of your rights, we prefer that you open an issue on our{' '}
            <Box
              component="a"
              href="https://github.com/danvanbueren/gasket-case/issues"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                fontWeight: 600,
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              GitHub Issues Tracker
            </Box>
            , or you may email us at{' '}
            <Box
              component="a"
              href="mailto:gasket-case@googlegroups.com"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                fontWeight: 600,
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              gasket-case@googlegroups.com
            </Box>
            .
          </Typography>

          {/* Section 10 */}
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: 700,
              color: '#F3F4F6',
              mb: 1.5,
            }}
          >
            10. Children&rsquo;s Privacy
          </Typography>
          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.7,
              color: 'text.secondary',
              mb: 4,
            }}
          >
            GasketCase is not intended for use by children under the age of 13 (or under 16 where required by local law). We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please open an issue on our{' '}
            <Box
              component="a"
              href="https://github.com/danvanbueren/gasket-case/issues"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                fontWeight: 600,
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              GitHub Issues Tracker
            </Box>
            {' '}or contact us at{' '}
            <Box
              component="a"
              href="mailto:gasket-case@googlegroups.com"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                fontWeight: 600,
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              gasket-case@googlegroups.com
            </Box>
            , and we will take immediate steps to assist in removing such information.
          </Typography>

          {/* Section 11 */}
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: 700,
              color: '#F3F4F6',
              mb: 1.5,
            }}
          >
            11. Changes to This Privacy Policy
          </Typography>
          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.7,
              color: 'text.secondary',
              mb: 4,
            }}
          >
            We may update this Privacy Policy periodically to reflect enhancements to our service or evolving regulatory standards. Any changes will be published here with an updated &ldquo;Last Updated&rdquo; date.
          </Typography>

          {/* Section 12 */}
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: 700,
              color: '#F3F4F6',
              mb: 1.5,
            }}
          >
            12. Contact Us
          </Typography>
          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.7,
              color: 'text.secondary',
              mb: 2,
            }}
          >
            If you have questions, feedback, or concerns regarding this Privacy Policy or our privacy practices, please contact us. We prefer contact through our GitHub Issues tracker, with email available as a backup:
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: 'text.secondary',
              '& li': {
                mb: 1,
                lineHeight: 1.7,
              },
            }}
          >
            <li>
              <strong style={{ color: '#F3F4F6' }}>Primary Channel (Preferred):</strong>{' '}
              <Box
                component="a"
                href="https://github.com/danvanbueren/gasket-case/issues"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'primary.main',
                  textDecoration: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                GitHub Issues Tracker
              </Box>
            </li>
            <li>
              <strong style={{ color: '#F3F4F6' }}>Backup Channel (Email):</strong>{' '}
              <Box
                component="a"
                href="mailto:gasket-case@googlegroups.com"
                sx={{
                  color: 'primary.main',
                  textDecoration: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                gasket-case@googlegroups.com
              </Box>
            </li>
            <li>
              <strong style={{ color: '#F3F4F6' }}>Developer &amp; Maintainer:</strong> Daniel Van Bueren
            </li>
            <li>
              <strong style={{ color: '#F3F4F6' }}>Project Repository:</strong>{' '}
              <Box
                component="a"
                href="https://github.com/danvanbueren/gasket-case"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'primary.main',
                  textDecoration: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                https://github.com/danvanbueren/gasket-case
              </Box>
            </li>
          </Box>
        </Paper>

        {/* Footer */}
        <Box
          sx={{
            py: 4,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
            }}
          >
            &copy; 2026 Daniel Van Bueren &bull; GasketCase Automotive Lifecycle Logging
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
