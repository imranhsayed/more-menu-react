import styled from 'styled-components';

// 1.MAIN HEADER
export const DesktopHeaderMain = styled.div`
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 49px;
  border-top: 1px solid #000;
  border-bottom: 3px solid #6b3e4f;
  border-bottom-width: 1px;

  .--hidden {
    display: none;
  }
`;

// 1a.Main Nav
export const DesktopNavContainer = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const DesktopNavWrap = styled.nav`
  width: 100%;
`;

export const DesktopNavList = styled.li`
  position: relative;
  margin: 0 5px 0 0;
  cursor: pointer;

  &:hover {
    .cts-primary-link {
      color: #ff6347;
    }
  }

  // When more element is hovered, show its submenu items
  &.-more:hover {
    .cts-more-element {
      color: #ff6347;
    }
    .-secondary {
      display: block;
    }
  }
`;

export const DesktopNavLink = styled.a`
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  white-space: nowrap;
  font-weight: 500;
  font-size: 15px;
  text-align: inherit;
  text-transform: uppercase;
  color: #444;
  padding: 0 9px;
  line-height: 48px;

  &,
  &:hover,
  &:focus {
    transition: all 0.4s ease;
  }

  &:before {
    content: '';
    display: block;
    width: 20%;
    height: 3px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
    visibility: hidden;
  }

  &.cts-more-element:after {
    display: inline-block;
    font-family: FontAwesome, sans-serif;
    font-style: normal;
    font-weight: 400;
    line-height: 26px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    content: '\\f107';
    margin-left: 6px;
    font-size: 13px;
  }
`;

// More Elements
export const DesktopMoreListContainer = styled.ul`
  position: absolute;
  width: 210px;
  margin: 0;
  padding: 0;
  list-style: none;
  z-index: 9999;
  box-shadow: 0 7px 7px rgba(0, 0, 0, 0.15);
  background-color: #fff;

  display: none;
`;

export const DesktopMoreListItem = styled.li`
  &,
  &:hover,
  &:focus {
    transition: all 0.4s ease;
  }

  &:hover {
    background-color: #ff6347;
    a {
      color: #fff;
    }
  }
`;

export const DesktopMoreListLink = styled.a`
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  white-space: nowrap;
  font-weight: 400;
  font-size: 14px;
  text-align: inherit;
  text-transform: none;
  display: inline-block;
  color: #444;
  width: 100%;
  height: auto;
  line-height: 2;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  padding: 8px 16px;
`;
