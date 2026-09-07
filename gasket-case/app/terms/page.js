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
import GavelIcon from '@mui/icons-material/Gavel'
import WarningIcon from '@mui/icons-material/Warning'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'

export default function TermsOfServicePage() {
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
            <GavelIcon
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
              Terms of Service
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
              mb: 2,
            }}
          >
            Welcome to <strong style={{ color: '#F3F4F6' }}>GasketCase</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;). These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of our web application located at <a href="https://gasket-case.vercel.app" style={{ color: '#06B6D4' }}>https://gasket-case.vercel.app</a> and the open-source software provided by developer Daniel Van Bueren via our <a href="https://github.com/danvanbueren/gasket-case" target="_blank" rel="noopener noreferrer" style={{ color: '#06B6D4' }}>GitHub repository</a>.
          </Typography>

          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.7,
              color: '#FBBF24',
              fontWeight: 600,
              mb: 4,
            }}
          >
            PLEASE READ THESE TERMS CAREFULLY. BY ACCESSING, BROWSING, CONNECTING YOUR GOOGLE ACCOUNT, OR USING GASKETCASE, YOU AGREE TO BE BOUND BY THESE TERMS. IF YOU DO NOT AGREE, DO NOT ACCESS OR USE GASKETCASE.
          </Typography>

          <Divider
            sx={{
              borderColor: 'rgba(255, 255, 255, 0.08)',
              mb: 4,
            }}
          />

          {/* Section 1 - Non-Custodial Architecture Highlight */}
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
                1. Non-Custodial Architecture &amp; Zero Server-Side Data Maintenance
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
              A fundamental architectural and legal foundation of GasketCase is that <strong>neither the Service, its servers, nor developer Daniel Van Bueren is a custodian of your data:</strong>
            </Typography>

            <Box
              component="ul"
              sx={{
                pl: 3,
                color: 'text.secondary',
                '& li': {
                  mb: 1,
                  lineHeight: 1.6,
                },
              }}
            >
              <li>
                <strong style={{ color: '#F3F4F6' }}>Zero Data Maintained by the Server:</strong> We do not operate, host, curate, or maintain any centralized database, relational store, or persistent backend archive for your vehicle records, maintenance logs, mileage readings, or spreadsheets.
              </li>
              <li>
                <strong style={{ color: '#F3F4F6' }}>Stateless Pass-Through Intermediary:</strong> The application operates exclusively as a stateless user interface and processing pipeline. Requests to Google APIs are executed in-flight using your temporary Google OAuth token. Once an API call completes, no user records remain on our serverless infrastructure.
              </li>
              <li>
                <strong style={{ color: '#F3F4F6' }}>Sole User Custody:</strong> You, the user, are the sole and exclusive custodian of your data. All maintenance logs, vehicle metadata, mileage entries, costs, and notes reside exclusively within files in your personal Google account (Google Sheets in Google Drive) or within your local web browser&rsquo;s storage (<code>localStorage</code>).
              </li>
              <li>
                <strong style={{ color: '#F3F4F6' }}>No Bailment or Fiduciary Duty:</strong> Your use of GasketCase does not create any bailment, custodial obligation, escrow, duty of care, or fiduciary relationship between you and Daniel Van Bueren.
              </li>
            </Box>
          </Paper>

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
            2. &ldquo;Use at Your Own Risk&rdquo; &amp; Automotive Advisory
          </Typography>
          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.7,
              color: 'text.secondary',
              mb: 2,
            }}
          >
            GasketCase is provided strictly on a <strong>&ldquo;USE AT YOUR OWN RISK&rdquo;</strong> basis:
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
              <strong style={{ color: '#F3F4F6' }}>Informational Estimates Only:</strong> GasketCase calculates daily odometer velocity (&Delta;V) and forecasts upcoming milestone dates based purely on mathematical linear extrapolation of user-supplied mileage readings and default threshold intervals. These forecasts are rough mathematical approximations intended solely for personal record-keeping and tracking convenience.
            </li>
            <li>
              <strong style={{ color: '#F3F4F6' }}>No Professional Advice:</strong> GasketCase does <strong>NOT</strong> provide automotive, mechanical, engineering, safety, or legal advice.
            </li>
            <li>
              <strong style={{ color: '#F3F4F6' }}>No Guarantee Against Mechanical Failure:</strong> GasketCase does not guarantee that following any calculated schedule or prediction will prevent vehicle breakdowns, mechanical failure, parts wear, accidents, safety hazards, or vehicle warranty invalidation.
            </li>
            <li>
              <strong style={{ color: '#F3F4F6' }}>User Inspection Responsibility:</strong> You remain solely responsible for physically inspecting your vehicle, adhering to official vehicle manufacturer service manuals and technical bulletins, and consulting licensed, certified automotive mechanics.
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
            3. Absolute Disclaimer of Liability for Data Loss
          </Typography>
          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.7,
              color: 'text.secondary',
              mb: 2,
            }}
          >
            Because GasketCase maintains zero centralized databases and operates on a non-custodial model connecting to external services (Google Drive, Google Sheets) and client-side browser storage (<code>localStorage</code>):
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
              <strong style={{ color: '#F3F4F6' }}>Zero Liability for Data:</strong> Under no circumstances shall Daniel Van Bueren, project maintainers, contributors, or hosting providers be liable for any loss of data, corrupted spreadsheets, failed writes, accidental overwrites, missing maintenance history, synchronization failures, unauthorized access to your Google account, or service outages.
            </li>
            <li>
              <strong style={{ color: '#F3F4F6' }}>No Duty to Preserve, Recover, or Restore:</strong> The developer possesses no copies of your records and has no technical ability, duty, or obligation to retrieve, recover, restore, or reconstruct any lost or corrupted files.
            </li>
            <li>
              <strong style={{ color: '#F3F4F6' }}>User Backup Obligation:</strong> You are solely and exclusively responsible for maintaining independent, periodic backups of your vehicle records, Google Sheets spreadsheets, and local browser data.
            </li>
          </Box>

          {/* Section 4 */}
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: 700,
              color: '#F3F4F6',
              mb: 1.5,
            }}
          >
            4. Disclaimer of Warranties
          </Typography>
          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.7,
              color: 'text.secondary',
              mb: 2,
            }}
          >
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW:
          </Typography>
          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.7,
              color: 'text.secondary',
              mb: 2,
            }}
          >
            GASKETCASE IS PROVIDED STRICTLY ON AN <strong>&ldquo;AS IS&rdquo;</strong> AND <strong>&ldquo;AS AVAILABLE&rdquo;</strong> BASIS, WITHOUT WARRANTIES, CONDITIONS, OR GUARANTEES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE.
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
            <li>Implied warranties of merchantability, fitness for a particular purpose, title, quiet enjoyment, and non-infringement are disclaimed.</li>
            <li>Any warranties that the Service will be continuous, uninterrupted, secure, bug-free, or error-free are disclaimed.</li>
            <li>Any warranties regarding the accuracy, reliability, or completeness of any predictive calculations, odometer velocities, cost metrics, or timeline dates are disclaimed.</li>
          </Box>

          {/* Section 5 - Limitation of Liability Highlight */}
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
                5. Limitation of Liability
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
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL DANIEL VAN BUEREN, THE PROJECT MAINTAINERS, CONTRIBUTORS, AFFILIATES, OR HOSTING PROVIDERS BE LIABLE UNDER ANY LEGAL THEORY (WHETHER IN CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY, OR OTHERWISE) FOR ANY:
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
              <li>DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, PUNITIVE, OR CONSEQUENTIAL DAMAGES;</li>
              <li>LOSS OF DATA, LOSS OF PROFITS, LOSS OF REVENUE, LOSS OF GOODWILL, OR BUSINESS INTERRUPTION;</li>
              <li>VEHICLE DAMAGE, MECHANICAL BREAKDOWN, ENGINE FAILURE, ACCIDENTS, COSTS OF REPLACEMENT PARTS OR REPAIR SERVICES, OR PERSONAL INJURY;</li>
            </Box>

            <Typography
              variant="body2"
              sx={{
                lineHeight: 1.7,
                color: '#FEF3C7',
                fontWeight: 500,
              }}
            >
              BECAUSE NO DATA IS MAINTAINED BY THE SERVER OR DEVELOPER, THE DEVELOPER BEARS ZERO LIABILITY. IF APPLICABLE LAW DOES NOT PERMIT TOTAL EXCLUSION OF LIABILITY, OUR TOTAL AGGREGATE LIABILITY SHALL NOT EXCEED ONE UNITED STATES DOLLAR ($1.00 USD).
            </Typography>
          </Paper>

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
            6. Google Accounts &amp; Third-Party Services
          </Typography>
          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.7,
              color: 'text.secondary',
              mb: 4,
            }}
          >
            GasketCase interacts with Google Drive and Google Sheets APIs. Your use of Google services is governed by the <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" style={{ color: '#06B6D4' }}>Google Terms of Service</a>. When connecting your account, you authorize scoped permissions (<code>drive.file</code> and <code>spreadsheets</code>). You can disconnect GasketCase at any time via your <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer" style={{ color: '#06B6D4' }}>Google Account Permissions</a>. GasketCase is deployed on Vercel Inc.
          </Typography>

          {/* Section 7 */}
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: 700,
              color: '#F3F4F6',
              mb: 1.5,
            }}
          >
            7. Permitted Use &amp; User Responsibilities
          </Typography>
          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.7,
              color: 'text.secondary',
              mb: 2,
            }}
          >
            You agree to use GasketCase solely for lawful automotive maintenance tracking purposes. You agree not to:
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
            <li>Probe, scan, test, or compromise the security of the application or underlying infrastructure;</li>
            <li>Transmit malware, viruses, or disruptive code through the application;</li>
            <li>Abuse Google API quotas or engage in automated scraping;</li>
            <li>Violate intellectual property rights as set forth in the project&rsquo;s <a href="https://github.com/danvanbueren/gasket-case/blob/main/LICENSE.md" target="_blank" rel="noopener noreferrer" style={{ color: '#06B6D4' }}>LICENSE.md</a>.</li>
          </Box>

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
            8. Intellectual Property
          </Typography>
          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.7,
              color: 'text.secondary',
              mb: 4,
            }}
          >
            All rights, title, and interest in and to the GasketCase codebase, design, trademarks, and user interface are owned by Daniel Van Bueren as set forth in <a href="https://github.com/danvanbueren/gasket-case/blob/main/LICENSE.md" target="_blank" rel="noopener noreferrer" style={{ color: '#06B6D4' }}>LICENSE.md</a>. You are granted a limited, personal, revocable, non-exclusive, non-transferable license to access and use the hosted Service for your personal vehicle maintenance tracking.
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
            9. Modifications to the Service and Terms
          </Typography>
          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.7,
              color: 'text.secondary',
              mb: 4,
            }}
          >
            We reserve the right to modify, update, suspend, or discontinue GasketCase (or any portion thereof) at any time without notice or liability. We may also update these Terms periodically. Your continued use of the Service following any modifications constitutes your acceptance of the revised Terms.
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
            10. Severability &amp; Entire Agreement
          </Typography>
          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.7,
              color: 'text.secondary',
              mb: 4,
            }}
          >
            If any provision of these Terms is found to be unlawful, void, or unenforceable, that provision shall be deemed severable and shall not affect the validity of remaining provisions. These Terms, together with our <Box component={Link} href="/privacy" sx={{ color: 'primary.main', textDecoration: 'underline' }}>Privacy Policy</Box> and <a href="https://github.com/danvanbueren/gasket-case/blob/main/LICENSE.md" target="_blank" rel="noopener noreferrer" style={{ color: '#06B6D4' }}>LICENSE.md</a>, constitute the entire agreement between you and Daniel Van Bueren regarding GasketCase.
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
            11. Contact Us
          </Typography>
          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.7,
              color: 'text.secondary',
              mb: 2,
            }}
          >
            If you have questions, feedback, or concerns regarding these Terms of Service, please contact us. We prefer contact through our GitHub Issues tracker, with email available as a backup:
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
                https://github.com/danvanbueren/gasket-case/issues
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
