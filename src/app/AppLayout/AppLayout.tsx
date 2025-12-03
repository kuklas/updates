import * as React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Button,
  Masthead,
  MastheadBrand,
  MastheadContent,
  MastheadLogo,
  MastheadMain,
  MastheadToggle,
  Nav,
  NavExpandable,
  NavItem,
  NavList,
  Page,
  PageSidebar,
  PageSidebarBody,
  SkipToContent,
  Flex,
  FlexItem,
  Dropdown,
  DropdownList,
  DropdownItem,
  MenuToggle,
} from '@patternfly/react-core';
import { IAppRoute, IAppRouteGroup, routes } from '@app/routes';
import { BarsIcon, BellIcon, PlusIcon, QuestionCircleIcon, CaretDownIcon } from '@patternfly/react-icons';
import redhatOpenshiftLogo from '@app/bgimages/redhatopenshift.svg';

interface IAppLayout {
  children: React.ReactNode;
}

const AppLayout: React.FunctionComponent<IAppLayout> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);

  const onUserMenuToggle = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const onUserMenuSelect = () => {
    setUserMenuOpen(false);
  };

  const masthead = (
    <Masthead style={{ paddingLeft: '24px', paddingRight: '24px' }}>
      <MastheadMain>
        <MastheadToggle>
          <Button
            icon={<BarsIcon />}
            variant="plain"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Global navigation"
          />
        </MastheadToggle>
        <MastheadBrand data-codemods>
          <MastheadLogo data-codemods>
            <img src={redhatOpenshiftLogo} alt="Red Hat OpenShift" height="40px" />
          </MastheadLogo>
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent>
        <Flex 
          style={{ 
            width: '100%', 
            justifyContent: 'flex-end'
          }}
        >
          <FlexItem>
            <Button
              variant="plain"
              icon={<BellIcon />}
              aria-label="Notifications"
            />
          </FlexItem>
          <FlexItem>
            <Button
              variant="plain"
              icon={<PlusIcon />}
              aria-label="Add"
            />
          </FlexItem>
          <FlexItem>
            <Button
              variant="plain"
              icon={<QuestionCircleIcon />}
              aria-label="Help"
            />
          </FlexItem>
          <FlexItem>
            <Dropdown
              isOpen={userMenuOpen}
              onSelect={onUserMenuSelect}
              onOpenChange={(isOpen: boolean) => setUserMenuOpen(isOpen)}
              toggle={(toggleRef) => (
                <MenuToggle
                  ref={toggleRef}
                  onClick={onUserMenuToggle}
                  isExpanded={userMenuOpen}
                  variant="plain"
                >
                  User Name
                  <CaretDownIcon />
                </MenuToggle>
              )}
            >
              <DropdownList>
                <DropdownItem>Profile</DropdownItem>
                <DropdownItem>Settings</DropdownItem>
                <DropdownItem>Logout</DropdownItem>
              </DropdownList>
            </Dropdown>
          </FlexItem>
        </Flex>
      </MastheadContent>
    </Masthead>
  );

  const location = useLocation();

  const renderNavItem = (route: IAppRoute, index: number) => (
    <NavItem key={`${route.label}-${index}`} id={`${route.label}-${index}`} isActive={route.path === location.pathname}>
      <NavLink
        to={route.path}
      >
        {route.label}
      </NavLink>
    </NavItem>
  );

  const renderNavGroup = (group: IAppRouteGroup, groupIndex: number) => {
    const isGroupActive = group.routes.some((route) => route.path === location.pathname);
    return (
      <NavExpandable
        key={`${group.label}-${groupIndex}`}
        id={`${group.label}-${groupIndex}`}
        title={group.label}
        isActive={isGroupActive}
        isExpanded={isGroupActive}
      >
        {group.routes.map((route, idx) => route.label && renderNavItem(route, idx))}
      </NavExpandable>
    );
  };

  const Navigation = (
    <Nav id="nav-primary-simple">
      <NavList id="nav-list-simple">
        {routes.map(
          (route, idx) => route.label && (!route.routes ? renderNavItem(route, idx) : renderNavGroup(route, idx)),
        )}
      </NavList>
    </Nav>
  );

  const Sidebar = (
    <PageSidebar>
      <PageSidebarBody>{Navigation}</PageSidebarBody>
    </PageSidebar>
  );

  const pageId = 'primary-app-container';

  const PageSkipToContent = (
    <SkipToContent
      onClick={(event) => {
        event.preventDefault();
        const primaryContentContainer = document.getElementById(pageId);
        primaryContentContainer?.focus();
      }}
      href={`#${pageId}`}
    >
      Skip to Content
    </SkipToContent>
  );
  return (
    <Page
      mainContainerId={pageId}
      masthead={masthead}
      sidebar={sidebarOpen && Sidebar}
      skipToContent={PageSkipToContent}
    >
      {children}
    </Page>
  );
};

export { AppLayout };
