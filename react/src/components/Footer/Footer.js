import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'

import MarketoForm from 'components/MarketoForm'
import TextHeader from 'components/TextHeader'
import { Button } from 'components/Button'
import { COLORS } from 'config/constants'

const StyledFooter = styled.div`
  background: ${COLORS.DARKBLUE};
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  margin-top: 2rem;
  padding: 0 0 3rem 0;
  position: relative;

  a {
    color: #fff;
    text-decoration: none;
  }
`

const FooterLogo = styled.a`
  display: block;
  margin-bottom: 2rem;
`

const List = styled(Col)`
  ul {
    list-style-type: none;
    margin: 0 0 2.5rem 0;
    padding: 0;
  }

  li {
    margin: 0.8rem 0;
  }

  a {
    color: #99a2ae;
    line-height: 1;
    font-weight: 500;
    transition: all 0.2s linear;

    &:hover {
      color: #fff;
    }
  }
`

const ListHeader = styled.h2`
  color: #fff;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 30px;
  margin: 0 0 0.5rem 0;
`

const ContactInfo = styled.div`
  margin-top: 2rem;

  a {
    display: block;
    margin-bottom: 1rem;

    &:hover {
      color: #ffffff;
    }
  }

  span {
    margin-left: 0.5rem;
  }
`

const Phone = styled.span`
  display: block;
  margin-bottom: 1rem;
  padding-left: 3rem;
  position: relative;

  &:before {
    content: '';
    display: inline-block;
    height: 100%;
    width: 2rem;
    position: absolute;
    top: 0;
    left: 0;
    background: url('/images/ico-phone-white.png') center center no-repeat;
  }
`

const Email = styled.a`
  display: block;
  padding-left: 3rem;
  position: relative;

  &:before {
    content: '';
    display: inline-block;
    height: 100%;
    width: 2rem;
    position: absolute;
    top: 0;
    left: 0;
    background: url('/images/ico-email-white.png') center center no-repeat;
  }
`

const LegalText = styled.div`
  color: #99a2ae;
  font-size: 0.75rem;
  margin-top: 3rem;

  a {
    color: #99a2ae !important;

    &:hover {
      color: #ffffff;
    }
  }
`

const NewsletterContainer = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  margin: 0 0 3rem 0;
  padding: 2rem 0;
`

class Footer extends Component {
  componentDidMount() {
    ;(function() {
      window.ldfdr = window.ldfdr || {}
      ;(function(d, s, ss, fs) {
        fs = d.getElementsByTagName(s)[0]
        function ce(src) {
          var cs = d.createElement(s)
          cs.src = src
          setTimeout(function() {
            fs.parentNode.insertBefore(cs, fs)
          }, 1)
        }
        ce(ss)
      })(
        document,
        'script',
        'https://lftracker.leadfeeder.com/lftracker_v1_9mDnrdyvnJ6E1KXM.js'
      )
    })()
  }

  render() {
    return (
      <StyledFooter>
        <Container>
          <NewsletterContainer>
            <Row>
              <Col sm={6} md={8}>
                <TextHeader
                  type={TextHeader.TYPES.MEDIUM}
                  color={TextHeader.COLORS.WHITE}
                  className="mb-0"
                >
                  Keep up to date with Armory
                </TextHeader>
                <TextHeader
                  type={TextHeader.TYPES.XSMALL}
                  color={TextHeader.COLORS.WHITE}
                  className="mb-0"
                  style={{ opacity: 0.5 }}
                >
                  Get monthly updates, unsubscribe anytime.
                </TextHeader>
              </Col>
              <Col sm={6} md={4}>
                <MarketoForm formId={1154} inline />
              </Col>
            </Row>
          </NewsletterContainer>
          <Row>
            <Col lg={3}>
              <FooterLogo href="https://www.armory.io" alt="Armory Logo">
                <img src="/assets/img/logo-reversed.svg" height="38" alt="Armory Logo" />
              </FooterLogo>
              <Button
                color={Button.COLORS.PRIMARY}
                to="http://go.Armory.io/install"
                external
              >
                Install Armory
              </Button>

              <ContactInfo>
                <a href="tel:18882223370">
                  <FontAwesomeIcon icon={faPhone} color="#ffffff" />
                  <span>1-888-222-3370</span>
                </a>

                <a href="mailto:info@armory.io">
                  <FontAwesomeIcon icon={faEnvelope} color="#ffffff" />
                  <span>info@armory.io</span>
                </a>
              </ContactInfo>
            </Col>

            <Col lg={9} className="mt-5 mt-lg-0">
              <Row>
                <List sm={6} lg={4}>
                  <ListHeader>Products & Services</ListHeader>
                  <ul>
                    <li>
                      <a href="https://www.armory.io/products/installed-spinnaker">
                        Installed Spinnaker
                      </a>
                    </li>
                    <li>
                      <a href="https://www.armory.io/products/pipelines-as-code">
                        Pipelines as Code
                      </a>
                    </li>
                    <li>
                      <a href="https://www.armory.io/armory-integrations">Integrations</a>
                    </li>

                    <li>
                      <a href="https://www.armory.io/products/certified-pipelines">
                        Certified Pipelines
                      </a>
                    </li>
                    <li>
                      <a href="https://www.armory.io/products/sla-dashboard">SLA Dashboard</a>
                    </li>
                  </ul>

                  <ListHeader>Solutions</ListHeader>
                  <ul>
                    <li>
                      <a href="https://www.armory.io/solutions/devops-security">
                        Devops Security
                      </a>
                    </li>
                    <li>
                      <a href="https://www.armory.io/solutions/fedramp/">FedRAMP Compliance</a>
                    </li>
                  </ul>
                </List>

                <List sm={6} lg={4}>
                  <ListHeader>About</ListHeader>
                  <ul>
                    <li>
                      <a href="https://www.armory.io/why-armory">Why Armory</a>
                    </li>
                    <li>
                      <a href="https://www.armory.io/tribe">Our Tribe</a>
                    </li>
                    <li>
                      <a
                        href="https://blog.armory.io/what-is-a-tribal-culture/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Tribe Culture
                      </a>
                    </li>
                    <li>
                      <a target="_blank" href="https://jobs.lever.co/armory" rel="noopener noreferrer">
                        Careers
                      </a>
                    </li>
                  </ul>

                  <ListHeader>Resources</ListHeader>
                  <ul>
                    <li>
                      <a href="https://www.armory.io/resources/webinars">Webinars</a>
                    </li>
                    <li>
                      <a href="https://www.armory.io/resources/whitepapers-and-books">
                        Whitepapers &amp; eBooks
                      </a>
                    </li>
                    <li>
                      <a href="https://www.armory.io/resources/tutorials/">Tutorials</a>
                    </li>
                    <li>
                      <a target="_blank" href="http://www.spinnaker.io/docs" rel="noopener noreferrer">
                        Spinnaker Docs
                      </a>
                    </li>
                    <li>
                      <a target="_blank" href="http://docs.armory.io" rel="noopener noreferrer">
                        Armory Docs
                      </a>
                    </li>
                    <li>
                      <a target="_blank" href="http://blog.armory.io" rel="noopener noreferrer">
                        Blog
                      </a>
                    </li>
                    <li>
                      <a target="_blank" href="http://kb.armory.io" rel="noopener noreferrer">
                        Knowledge Base
                      </a>
                    </li>
                  </ul>
                </List>

                <List sm={6} lg={4}>
                  <ListHeader>Community</ListHeader>
                  <ul>
                    <li>
                      <a target="_blank" href="http://join.spinnaker.io/" rel="noopener noreferrer">
                        Slack
                      </a>
                    </li>
                    <li>
                      <a target="_blank" href="https://github.com/armory-io" rel="noopener noreferrer">
                        Github
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        href="http://stackoverflow.com/search?q=spinnaker"
                        rel="noopener noreferrer"
                      >
                        StackOverflow
                      </a>
                    </li>
                    <li>
                      <a target="_blank" href="https://twitter.com/cloudarmory" rel="noopener noreferrer">
                        Twitter
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        href="https://www.linkedin.com/company/armory.io/"
                        rel="noopener noreferrer"
                      >
                        LinkedIn
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        href="https://www.youtube.com/channel/UC9ESNuSCMXLsdRdBDhjSzcA/featured"
                        rel="noopener noreferrer"
                      >
                        YouTube
                      </a>
                    </li>
                  </ul>
                </List>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col className="text-center">
              <LegalText>
                &copy;{new Date().getFullYear()} Armory Inc. All Rights
                Reserved.
                <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
                <a href="https://www.armory.io/privacy/">Privacy Policy</a>
                <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
                <a href="https://www.armory.io/terms">Terms &amp; Conditions</a>
              </LegalText>
            </Col>
          </Row>
        </Container>
      </StyledFooter>
    )
  }
}

export default Footer
