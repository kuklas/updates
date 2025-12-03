import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PageSection,
  Title,
  Button,
  Alert,
  AlertActionCloseButton,
  ExpandableSection,
  Radio,
  Checkbox,
  Stack,
  StackItem,
  Flex,
  FlexItem,
  Card,
  CardTitle,
  CardBody,
  Content,
  ActionGroup,
  Grid,
  GridItem,
  Dropdown,
  DropdownList,
  DropdownItem,
  MenuToggle,
  Drawer,
  DrawerContent,
  DrawerPanelContent,
  DrawerPanelBody,
  DrawerHead,
  DrawerActions,
  DrawerCloseButton,
} from '@patternfly/react-core';
import { Table, Thead, Tbody, Tr, Th, Td } from '@patternfly/react-table';

const Updates: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [alertDismissed, setAlertDismissed] = React.useState(false);
  const [clusterDetailsExpanded, setClusterDetailsExpanded] = React.useState(true);
  const [releaseChannelsExpanded, setReleaseChannelsExpanded] = React.useState(true);
  const [upgradeOption, setUpgradeOption] = React.useState('next-release');
  const [includeOperators, setIncludeOperators] = React.useState(false);
  const [includeNodeUpdate, setIncludeNodeUpdate] = React.useState(false);
  const [nextReleaseVersion, setNextReleaseVersion] = React.useState('');
  const [latestReleaseVersion, setLatestReleaseVersion] = React.useState('');
  const [nextReleaseDropdownOpen, setNextReleaseDropdownOpen] = React.useState(false);
  const [latestReleaseDropdownOpen, setLatestReleaseDropdownOpen] = React.useState(false);
  const [tipsDrawerOpen, setTipsDrawerOpen] = React.useState(false);
  const [selectedTopic, setSelectedTopic] = React.useState('');
  const [topicDropdownOpen, setTopicDropdownOpen] = React.useState(false);

  const operatorColumns = ['Name', 'Version', 'Cluster compatibility', 'Support', 'Last updated', 'Status'];
  const operatorRows = [
    {
      name: 'Red Hat OpenShift Service Mesh',
      version: '2.4.0',
      compatibility: '4.18+',
      support: 'Supported',
      lastUpdated: '2024-01-15',
      status: 'Available',
    },
  ];

  const nodePoolColumns = ['Pool', 'Current version', 'Paused', 'Nodes', 'Version issues'];
  const nodePoolRows = [
    {
      pool: 'worker',
      currentVersion: '4.18.16',
      paused: 'No',
      nodes: '3',
      versionIssues: 'None',
    },
  ];

  const tipsCards = [
    {
      title: 'Preflight Check Best Practices',
      description: 'Always run a preflight check before upgrading to identify potential issues early and ensure a smooth upgrade process.',
    },
    {
      title: 'Operator Compatibility Verification',
      description: 'Verify all operators are compatible with the target version to avoid upgrade failures and ensure system stability.',
    },
    {
      title: 'Cluster Backup Strategy',
      description: 'Backup your cluster configuration before major upgrades to enable quick recovery if issues occur during the process.',
    },
    {
      title: 'Maintenance Window Planning',
      description: 'Schedule upgrades during maintenance windows to minimize impact on users and ensure adequate time for completion.',
    },
    {
      title: 'Node Capacity Requirements',
      description: 'Ensure sufficient node capacity is available before upgrading to prevent blocking issues during the upgrade process.',
    },
    {
      title: 'Health Monitoring Tips',
      description: 'Monitor cluster health continuously during upgrades to quickly identify and address any issues that may arise.',
    },
  ];

  const drawerPanelContent = (
    <DrawerPanelContent>
      <DrawerHead>
        <Title headingLevel="h2" size="lg">Tips and Tricks</Title>
        <DrawerActions>
          <DrawerCloseButton onClick={() => setTipsDrawerOpen(false)} />
        </DrawerActions>
      </DrawerHead>
      <DrawerPanelBody>
        <Stack hasGutter>
          <StackItem>
            <Dropdown
              isOpen={topicDropdownOpen}
              onSelect={(_, value) => {
                setSelectedTopic(value as string);
                setTopicDropdownOpen(false);
              }}
              onOpenChange={(isOpen: boolean) => setTopicDropdownOpen(isOpen)}
              toggle={(toggleRef) => (
                <MenuToggle
                  ref={toggleRef}
                  onClick={() => setTopicDropdownOpen(!topicDropdownOpen)}
                  isExpanded={topicDropdownOpen}
                  variant="default"
                  style={{ width: '100%' }}
                >
                  {selectedTopic || 'Select a topic'}
                </MenuToggle>
              )}
            >
              <DropdownList>
                <DropdownItem value="all-topics">All Topics</DropdownItem>
                <DropdownItem value="best-practices">Best Practices</DropdownItem>
                <DropdownItem value="troubleshooting">Troubleshooting</DropdownItem>
                <DropdownItem value="optimization">Optimization</DropdownItem>
              </DropdownList>
            </Dropdown>
          </StackItem>
          <StackItem>
            <Stack hasGutter>
              {tipsCards.map((card, index) => (
                <StackItem key={index}>
                  <Card>
                    <CardTitle>{card.title}</CardTitle>
                    <CardBody>
                      <Content style={{ 
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {card.description}
                      </Content>
                    </CardBody>
                  </Card>
                </StackItem>
              ))}
            </Stack>
          </StackItem>
        </Stack>
      </DrawerPanelBody>
    </DrawerPanelContent>
  );

  return (
    <Drawer isExpanded={tipsDrawerOpen} isInline>
      <DrawerContent panelContent={drawerPanelContent}>
        <PageSection hasBodyWrapper={false}>
      <Stack hasGutter>
        {/* Header with title and link button */}
        <StackItem>
          <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }} alignItems={{ default: 'alignItemsCenter' }}>
            <FlexItem>
              <Title headingLevel="h1" size="lg">Cluster Updates</Title>
            </FlexItem>
            <FlexItem>
              <ActionGroup>
                <Button variant="link" isInline>
                  Cluster upgrade history
                </Button>
                <Button variant="link" isInline style={{ marginLeft: 'var(--pf-t--global--spacer--md)' }} onClick={() => setTipsDrawerOpen(true)}>
                  Show tips and tricks
                </Button>
              </ActionGroup>
            </FlexItem>
          </Flex>
        </StackItem>

        {/* Dismissible alert */}
        {!alertDismissed && (
          <StackItem>
            <Alert
              variant="info"
              title="Updates available: 5.00.01 stable release available this cluster"
              actionClose={<AlertActionCloseButton onClose={() => setAlertDismissed(true)} />}
            />
          </StackItem>
        )}

        {/* Current cluster ID */}
        <StackItem>
          <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }} alignItems={{ default: 'alignItemsCenter' }}>
            <FlexItem>
              <Title headingLevel="h2" size="md">Current cluster ID</Title>
              <Content>ocp-cluster-abc123-def456-ghi789</Content>
            </FlexItem>
            <FlexItem>
              <ActionGroup>
                <Button variant="primary" onClick={() => navigate('/administration/updates/preflight-summary')}>
                  Start upgrade preflight
                </Button>
                <Button variant="secondary">Auto-upgrade with AI</Button>
              </ActionGroup>
            </FlexItem>
          </Flex>
        </StackItem>

        {/* Show additional cluster details - expanded */}
        <StackItem>
          <ExpandableSection
            toggleText="Show additional cluster details"
            isExpanded={clusterDetailsExpanded}
            onToggle={() => setClusterDetailsExpanded(!clusterDetailsExpanded)}
          >
            <Stack hasGutter>
              <StackItem>
                <Title headingLevel="h3" size="md">Current version</Title>
                <Content>4.18.16</Content>
              </StackItem>

              <StackItem>
                <Title headingLevel="h3" size="md">Select an upgrade version</Title>
                <Grid hasGutter>
                  <GridItem span={6}>
                    <Radio
                      id="next-release"
                      name="upgrade-option"
                      label="Next release in your current stable channel"
                      isChecked={upgradeOption === 'next-release'}
                      onChange={() => setUpgradeOption('next-release')}
                    />
                    <div style={{ marginLeft: '24px', marginTop: '8px' }}>
                      <Dropdown
                        isOpen={nextReleaseDropdownOpen}
                        onSelect={() => setNextReleaseDropdownOpen(false)}
                        onOpenChange={(isOpen: boolean) => setNextReleaseDropdownOpen(isOpen)}
                        toggle={(toggleRef) => (
                          <MenuToggle
                            ref={toggleRef}
                            onClick={() => setNextReleaseDropdownOpen(!nextReleaseDropdownOpen)}
                            isExpanded={nextReleaseDropdownOpen}
                            variant="default"
                          >
                            {nextReleaseVersion || 'Select version'}
                          </MenuToggle>
                        )}
                      >
                        <DropdownList>
                          <DropdownItem
                            onClick={() => {
                              setNextReleaseVersion('5.00.01');
                              setNextReleaseDropdownOpen(false);
                            }}
                          >
                            <Checkbox
                              id="version-5.00.01"
                              label="5.00.01"
                              isChecked={nextReleaseVersion === '5.00.01'}
                              onChange={() => {}}
                            />
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => {
                              setNextReleaseVersion('5.00.02');
                              setNextReleaseDropdownOpen(false);
                            }}
                          >
                            <Checkbox
                              id="version-5.00.02"
                              label="5.00.02"
                              isChecked={nextReleaseVersion === '5.00.02'}
                              onChange={() => {}}
                            />
                          </DropdownItem>
                        </DropdownList>
                      </Dropdown>
                    </div>
                  </GridItem>
                  <GridItem span={6}>
                    <Radio
                      id="latest-release"
                      name="upgrade-option"
                      label="Latest supported release"
                      isChecked={upgradeOption === 'latest-release'}
                      onChange={() => setUpgradeOption('latest-release')}
                    />
                    <div style={{ marginLeft: '24px', marginTop: '8px' }}>
                      <Dropdown
                        isOpen={latestReleaseDropdownOpen}
                        onSelect={() => setLatestReleaseDropdownOpen(false)}
                        onOpenChange={(isOpen: boolean) => setLatestReleaseDropdownOpen(isOpen)}
                        toggle={(toggleRef) => (
                          <MenuToggle
                            ref={toggleRef}
                            onClick={() => setLatestReleaseDropdownOpen(!latestReleaseDropdownOpen)}
                            isExpanded={latestReleaseDropdownOpen}
                            variant="default"
                          >
                            {latestReleaseVersion || 'Select version'}
                          </MenuToggle>
                        )}
                      >
                        <DropdownList>
                          <DropdownItem
                            onClick={() => {
                              setLatestReleaseVersion('5.01.00');
                              setLatestReleaseDropdownOpen(false);
                            }}
                          >
                            <Checkbox
                              id="version-5.01.00"
                              label="5.01.00"
                              isChecked={latestReleaseVersion === '5.01.00'}
                              onChange={() => {}}
                            />
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => {
                              setLatestReleaseVersion('5.02.00');
                              setLatestReleaseDropdownOpen(false);
                            }}
                          >
                            <Checkbox
                              id="version-5.02.00"
                              label="5.02.00"
                              isChecked={latestReleaseVersion === '5.02.00'}
                              onChange={() => {}}
                            />
                          </DropdownItem>
                        </DropdownList>
                      </Dropdown>
                    </div>
                  </GridItem>
                </Grid>
              </StackItem>
            </Stack>
          </ExpandableSection>
        </StackItem>

        {/* Show additional release channels - expanded */}
        <StackItem>
          <ExpandableSection
            toggleText="Show additional release channels"
            isExpanded={releaseChannelsExpanded}
            onToggle={() => setReleaseChannelsExpanded(!releaseChannelsExpanded)}
          >
            <Grid hasGutter>
              <GridItem span={6}>
                <Card>
                  <CardTitle>What's new in 4.20 release</CardTitle>
                  <CardBody>
                    <Content>
                      The 4.20 release includes enhanced security features, improved performance, and new operator capabilities.
                    </Content>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem span={6}>
                <Card>
                  <CardTitle>Update history</CardTitle>
                  <CardBody>
                    {/* Simple timeline with dots for previous versions */}
                    <div style={{ position: 'relative', padding: 'var(--pf-t--global--spacer--lg) 0', minHeight: '80px' }}>
                      {/* Horizontal line */}
                      <svg
                        style={{ position: 'absolute', top: '40px', left: '0', width: '100%', height: '2px', zIndex: 0 }}
                        viewBox="0 0 100 2"
                        preserveAspectRatio="none"
                      >
                        <line
                          x1="0"
                          y1="1"
                          x2="100"
                          y2="1"
                          stroke="#d2d2d2"
                          strokeWidth="2"
                        />
                      </svg>

                      {/* Version dots */}
                      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        {/* Version 4.20.0-rc.3 */}
                        <div style={{ textAlign: 'center', flex: '0 0 auto' }}>
                          <Content style={{ marginBottom: '8px' }}>4.20.0-rc.3</Content>
                          <div
                            style={{
                              width: '12px',
                              height: '12px',
                              borderRadius: '50%',
                              backgroundColor: '#d2d2d2',
                              margin: '0 auto',
                            }}
                          />
                        </div>

                        {/* Version 4.20.0 */}
                        <div style={{ textAlign: 'center', flex: '0 0 auto' }}>
                          <Content style={{ marginBottom: '8px' }}>4.20.0</Content>
                          <div
                            style={{
                              width: '12px',
                              height: '12px',
                              borderRadius: '50%',
                              backgroundColor: '#d2d2d2',
                              margin: '0 auto',
                            }}
                          />
                        </div>

                        {/* Version 4.19.0 */}
                        <div style={{ textAlign: 'center', flex: '0 0 auto' }}>
                          <Content style={{ marginBottom: '8px' }}>4.19.0</Content>
                          <div
                            style={{
                              width: '12px',
                              height: '12px',
                              borderRadius: '50%',
                              backgroundColor: '#d2d2d2',
                              margin: '0 auto',
                            }}
                          />
                        </div>

                        {/* Version 4.18.16 */}
                        <div style={{ textAlign: 'center', flex: '0 0 auto' }}>
                          <Content style={{ marginBottom: '8px' }}>4.18.16</Content>
                          <div
                            style={{
                              width: '12px',
                              height: '12px',
                              borderRadius: '50%',
                              backgroundColor: '#d2d2d2',
                              margin: '0 auto',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </GridItem>
            </Grid>
          </ExpandableSection>
        </StackItem>

        {/* Operators on this cluster status */}
        <StackItem>
          <Title headingLevel="h2" size="md">Operators on this cluster status</Title>
          <Stack hasGutter>
            <StackItem>
              <Checkbox
                id="include-operators"
                label="Include operator updates with this cluster upgrade"
                isChecked={includeOperators}
                onChange={(_, checked) => setIncludeOperators(checked)}
              />
            </StackItem>
            <StackItem>
              <Alert
                variant="warning"
                title="1 of 4 operators has new version available. Cluster may be upgraded without this update."
              />
            </StackItem>
            <StackItem>
              <Table>
                <Thead>
                  <Tr>
                    {operatorColumns.map((column) => (
                      <Th key={column}>{column}</Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  {operatorRows.map((row, index) => (
                    <Tr key={index}>
                      <Td>{row.name}</Td>
                      <Td>{row.version}</Td>
                      <Td>{row.compatibility}</Td>
                      <Td>{row.support}</Td>
                      <Td>{row.lastUpdated}</Td>
                      <Td>{row.status}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </StackItem>
            <StackItem>
              <ActionGroup>
                <Button variant="link" isInline>
                  See all operators installed on this cluster
                </Button>
                <Button variant="link" isInline>
                  See operator catalog
                </Button>
              </ActionGroup>
            </StackItem>
          </Stack>
        </StackItem>

        {/* Worker node pool status */}
        <StackItem>
          <Title headingLevel="h2" size="md">Worker node pool status</Title>
          <Content>
            Monitor and manage the status of worker node pools in your cluster. Ensure all pools are up to date before upgrading.
          </Content>
          <Stack hasGutter>
            <StackItem>
              <Checkbox
                id="include-node-update"
                label="Include node update with this cluster upgrade"
                isChecked={includeNodeUpdate}
                onChange={(_, checked) => setIncludeNodeUpdate(checked)}
              />
            </StackItem>
            <StackItem>
              <Alert
                variant="warning"
                title="1 of 4 pools required node update. Cluster can not be upgraded without this update."
              />
            </StackItem>
            <StackItem>
              <Table>
                <Thead>
                  <Tr>
                    {nodePoolColumns.map((column) => (
                      <Th key={column}>{column}</Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  {nodePoolRows.map((row, index) => (
                    <Tr key={index}>
                      <Td>{row.pool}</Td>
                      <Td>{row.currentVersion}</Td>
                      <Td>{row.paused}</Td>
                      <Td>{row.nodes}</Td>
                      <Td>{row.versionIssues}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </StackItem>
          </Stack>
        </StackItem>

      </Stack>
    </PageSection>
      </DrawerContent>
    </Drawer>
  );
};

export { Updates };
