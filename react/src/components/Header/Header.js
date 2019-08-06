import React, { Component } from 'react'
import { Container } from 'reactstrap'

import { Button } from 'components/Button'
import { BREAKPOINTS } from 'config/constants'

import {
  Hamburger,
  StyledHeader,
  StyledSubMenu,
  StyledNavMenuItem,
  StyledLogo,
  StyledNav,
  StyledNavMenu,
} from './styles'

class Header extends Component {
  state = {
    menuOpen: false,
  }

  componentDidMount() {
    window.addEventListener('resize', this.closeMobileMenu)
  }

  closeMobileMenu = () => {
    if (document.body.clientWidth > parseInt(BREAKPOINTS.LARGE, 10)) {
      this.setState({ menuOpen: false })
    }
  }

  render() {
    const { floatingHeader } = this.props
    const { menuOpen } = this.state

    return (
        <StyledHeader open={menuOpen} floatingHeader={floatingHeader}>
          <Container>
            <StyledNav floatingHeader={floatingHeader}>
              <StyledLogo to="/">Armory</StyledLogo>

              <StyledNavMenu open={menuOpen}>
                <StyledNavMenuItem>
                  <span>Products</span>
                  <StyledSubMenu>
                    <a href="https://www.armory.io/products/installed-spinnaker/">
                      Installed Spinnaker
                    </a>
                    <a href="https://www.armory.io/products/pipelines-as-code/">
                      Pipelines as Code
                    </a>
                    <a href="https://www.armory.io/products/certified-pipelines/">
                      Certified Pipelines
                    </a>
                    <a href="https://www.armory.io/products/sla-dashboard/">SLA Dashboard</a>
                    <a href="https://www.armory.io/armory-integrations/">Integrations</a>
                  </StyledSubMenu>
                </StyledNavMenuItem>
                <StyledNavMenuItem>
                  <span>Solutions</span>
                  <StyledSubMenu>
                    <a href="https://www.armory.io/solutions/devops-security/">
                      Devops Security
                    </a>
                    <a href="https://www.armory.io/solutions/fedramp/">FedRAMP Compliance</a>
                  </StyledSubMenu>
                </StyledNavMenuItem>
                <StyledNavMenuItem>
                  <a href="https://www.armory.io/plans/">Plans</a>
                </StyledNavMenuItem>
                <StyledNavMenuItem>
                  <a href="https://www.armory.io/professional-services/">Services</a>
                </StyledNavMenuItem>
                <StyledNavMenuItem>
                  <span>Resources</span>
                  <StyledSubMenu>
                    <a href="https://www.armory.io/resources/webinars">Webinars</a>
                    <a href="https://www.armory.io/resources/whitepapers-and-books">
                      Whitepapers & eBooks
                    </a>
                    <a href="https://www.armory.io/resources/tutorials/">Tutorials</a>
                    <a
                      href="https://docs.armory.io"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Docs
                    </a>
                    <a
                      href="https://blog.armory.io"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Blog
                    </a>
                    <a
                      href="https://kb.armory.io"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Knowledge Base
                    </a>
                  </StyledSubMenu>
                </StyledNavMenuItem>
                <StyledNavMenuItem>
                  <span>About</span>
                  <StyledSubMenu>
                    <a href="https://www.armory.io/why-armory/">Why Armory</a>
                    <a href="https://www.armory.io/tribe/">Our Tribe</a>
                    <a
                      href="https://blog.armory.io/what-is-a-tribal-culture/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Tribe Culture
                    </a>
                    <a
                      href="https://jobs.lever.co/armory"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Careers
                    </a>
                  </StyledSubMenu>
                </StyledNavMenuItem>
              </StyledNavMenu>

              <Button color={Button.COLORS.LIGHT} to="https://www.armory.io/contact">
                Contact Us
              </Button>
              <Hamburger
                onClick={() => {
                  return this.setState(prevState => ({
                    menuOpen: !prevState.menuOpen,
                  }))
                }}
                open={menuOpen}
                floatingHeader={floatingHeader}
              />
            </StyledNav>
          </Container>
        </StyledHeader>
    )
  }
}

export default Header
