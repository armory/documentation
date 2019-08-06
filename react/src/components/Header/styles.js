import styled from 'styled-components'
import { BREAKPOINTS } from 'config/constants'

export const Hamburger = styled.div`
  background: rgba(0, 0, 0, 0.08) no-repeat center/60%;
  background-image: ${({ floatingHeader, open }) =>
    floatingHeader && !open
      ? 'url(/assets/img/icon-menu--light.png)'
      : 'url(/assets/img/icon-menu--dark.png)'};
  cursor: pointer;
  border-radius: 2px;
  display: none;
  height: 2.5rem;
  right: 1rem;
  position: absolute;
  transition: background-color 0.25s linear;
  width: 2.5rem;

  &:hover {
    background-color: ${({ open }) =>
      open ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
  }

  @media screen and (max-width: ${BREAKPOINTS.LARGE}) {
    background-color: ${({ open }) =>
      open ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'};
    display: block;
    position: ${({ open }) => (open ? 'fixed' : 'absolute')};
    top: ${({ open }) => (open ? '1rem' : 'auto')};
    z-index: ${({ open }) => (open ? 15 : 4)};
  }
`

export const StyledHeader = styled.div`
  background-color: ${({ floatingHeader }) =>
    floatingHeader ? 'transparent' : '#f7f7f8'};
  padding: 1rem 0;
  position: ${({ floatingHeader }) =>
    floatingHeader ? 'absolute' : 'relative'};
  top: 0;
  width: 100%;
  z-index: 4;

  div + & {
    padding-top: 3.3rem;
  }

  @media screen and (max-width: ${BREAKPOINTS.LARGE}) {
    z-index: ${props => (props.open ? 14 : 4)};
  }

  @media screen and (max-width: ${BREAKPOINTS.SMALL}) {
    top: auto;
    div + & {
      padding-top: 2.7rem;
    }
  }
`

export const StyledSubMenu = styled.div`
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  left: 50%;
  opacity: 0;
  padding: 0.7rem 0;
  position: absolute;
  top: 3rem;
  transform: translate3d(-50%, -0.5em, 0);
  transition: all 0.3s ease-in-out;
  visibility: hidden;
  width: 14rem;
  z-index: 4;

  &::before {
    background-color: white;
    border-radius: 2px;
    content: '';
    display: block;
    height: 1rem;
    left: 50%;
    margin-left: -0.5rem;
    position: absolute;
    top: -7px;
    transform: rotate(45deg);
    width: 1rem;
    z-index: -1;
  }

  a {
    color: #444;
    display: block;
    font-weight: 500;
    padding: 0.5rem 1rem;
    transition: background-color 0.25s linear, color 0.25s linear;

    &:hover {
      background-color: #25b0d6;
      color: white;
      text-decoration: none;
    }
  }

  @media screen and (max-width: ${BREAKPOINTS.LARGE}) {
    background: none;
    box-shadow: none;
    left: auto;
    opacity: 1;
    position: relative;
    top: auto;
    transform: none;
    transition: none;
    visibility: visible;

    &::before {
      display: none;
    }

    a {
      color: white;
      transition: none;

      &:hover {
        background: none;
      }
    }
  }
`

export const StyledNavMenuItem = styled.div`
  display: flex;
  margin: 0 1rem;
  padding: 1rem 0;
  position: relative;

  &:hover ${StyledSubMenu} {
    opacity: 1;
    transform: translate3d(-50%, 0, 0);
    visibility: visible;
  }

  & > a,
  & > span {
    color: white;
    display: block;
    font-weight: 600;
    font-size: 1rem;
    padding: 0 0.2rem;
    white-space: nowrap;

    &:hover {
      color: white;
      text-decoration: none;
    }
  }

  @media screen and (max-width: ${BREAKPOINTS.LARGE}) {
    flex-direction: column;
    text-align: center;

    &:hover ${StyledSubMenu} {
      transform: none;
    }

    & > a,
    & > span {
      font-size: 1.4rem;
      padding: 0 0.2rem;
    }
  }
`

export const StyledLogo = styled.a`
  background: no-repeat center top/contain;
  display: block;
  flex: 0 1 144px;
  height: 40px;
  overflow: hidden;
  text-indent: -9999px;
  width: 144px;
  z-index: 4;
`

export const StyledNav = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: ${BREAKPOINTS.LARGE}) {
    nav + a {
      display: none;
    }
  }

  ${StyledLogo} {
    background-image: ${({ floatingHeader }) =>
      floatingHeader
        ? 'url(/assets/img/logo-reversed.svg)'
        : 'url(/assets/img/logo.svg)'};
  }

  ${StyledNavMenuItem} > a,
  ${StyledNavMenuItem} > span {
    color: ${({ floatingHeader }) =>
      floatingHeader ? '#fff' : '#333!important'}
  }
`

export const StyledNavMenu = styled.nav`
  align-items: center;
  display: flex;
  justify-content: center;

  @media screen and (max-width: ${BREAKPOINTS.LARGE}) {
    background: rgba(0, 0, 0, 0.9);
    bottom: 0;
    display: ${props => (props.open ? 'flex' : 'none')};
    flex-direction: column;
    justify-content: flex-start;
    left: 0;
    overflow-y: scroll;
    padding: 3rem 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 15;

    ${StyledNavMenuItem} > a,
    ${StyledNavMenuItem} > span {
      color: ${props => (props.open ? '#ffffff' : '')}
    }
  }
`
