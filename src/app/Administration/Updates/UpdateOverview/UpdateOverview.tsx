import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PageSection,
  Title,
  Breadcrumb,
  BreadcrumbItem,
  Stack,
  StackItem,
  Content,
  Button,
  ActionGroup,
  Alert,
  AlertActionCloseButton,
  Flex,
  FlexItem,
  ExpandableSection,
  Radio,
  Grid,
  GridItem,
  Select,
  SelectOption,
  Icon,
  Drawer,
  DrawerContent,
  DrawerPanelContent,
  DrawerPanelBody,
  DrawerHead,
  DrawerActions,
  DrawerCloseButton,
  Dropdown,
  DropdownList,
  DropdownItem,
  MenuToggle,
  Card,
  CardTitle,
  CardBody,
} from '@patternfly/react-core';
import { CheckCircleIcon, InfoCircleIcon } from '@patternfly/react-icons';

const UpdateOverview: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [upgradeNotificationDismissed, setUpgradeNotificationDismissed] = React.useState(false);
  const [clusterDetailsExpanded, setClusterDetailsExpanded] = React.useState(false);
  const [releaseChannelsExpanded, setReleaseChannelsExpanded] = React.useState(false);
  const [blockersExpanded, setBlockersExpanded] = React.useState(false);
  const [upgradeOption, setUpgradeOption] = React.useState('');
  const [nextReleaseVersion, setNextReleaseVersion] = React.useState('fast-4.20.01');
  const [latestReleaseVersion, setLatestReleaseVersion] = React.useState('fast-4.20.01');
  const [nextReleaseDropdownOpen, setNextReleaseDropdownOpen] = React.useState(false);
  const [latestReleaseDropdownOpen, setLatestReleaseDropdownOpen] = React.useState(false);
  const [tipsDrawerOpen, setTipsDrawerOpen] = React.useState(false);
  const [selectedTopic, setSelectedTopic] = React.useState('');
  const [topicDropdownOpen, setTopicDropdownOpen] = React.useState(false);

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
        <>
          <PageSection hasBodyWrapper={false}>
        <Breadcrumb>
          <BreadcrumbItem to="#" onClick={() => navigate('/administration/updates')}>
            Update overview
          </BreadcrumbItem>
          <BreadcrumbItem isActive>Cluster Updates</BreadcrumbItem>
        </Breadcrumb>
        <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }} alignItems={{ default: 'alignItemsCenter' }}>
          <FlexItem>
            <Title headingLevel="h1" size="lg" style={{ marginTop: 'var(--pf-t--global--spacer--md)' }}>
              Cluster Updates
            </Title>
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
      </PageSection>

      <PageSection hasBodyWrapper={false}>
        <Stack hasGutter>
          {/* Upgrade Completion Notification */}
          {!upgradeNotificationDismissed && (
            <StackItem>
              <Alert
                variant="success"
                title="Upgrade to 5.00.01 complete"
                actionClose={<AlertActionCloseButton onClose={() => setUpgradeNotificationDismissed(true)} />}
              >
                <Stack hasGutter>
                  <StackItem>
                    <Content>
                      <strong>Date:</strong> 2025-11-14 21:32:00
                    </Content>
                  </StackItem>
                  <StackItem>
                    <Content>
                      <strong>Cluster:</strong> 1c182977-5663-428d-92a3-3d2bdf3fffb6
                    </Content>
                  </StackItem>
                  <StackItem>
                    <Title headingLevel="h4" size="md">Issues detected</Title>
                    <Stack hasGutter style={{ marginTop: 'var(--pf-t--global--spacer--sm)' }}>
                      <StackItem>
                        <Content>Node worker-south cannot drain due to PodDisruptionBudget</Content>
                      </StackItem>
                      {blockersExpanded && (
                        <>
                          <StackItem>
                            <Content>Operator Another op 4 is degraded</Content>
                          </StackItem>
                          <StackItem>
                            <Content>Required image cannot be pulled</Content>
                          </StackItem>
                        </>
                      )}
                    </Stack>
                  </StackItem>
                  <StackItem>
                    <ExpandableSection
                      toggleText="Show all blockers"
                      isExpanded={blockersExpanded}
                      onToggle={() => setBlockersExpanded(!blockersExpanded)}
                    />
                  </StackItem>
                  <StackItem>
                    <ActionGroup>
                      <Button variant="secondary">View logs</Button>
                    </ActionGroup>
                  </StackItem>
                </Stack>
              </Alert>
            </StackItem>
          )}

          {/* Current Status Banner */}
          <StackItem>
            <Alert variant="info" isInline title="This cluster is running the latest stable version" />
          </StackItem>

          {/* Current Cluster Information */}
          <StackItem>
            <Grid hasGutter>
              <GridItem span={6}>
                <Stack hasGutter>
                  <StackItem>
                    <Title headingLevel="h3" size="md">Current cluster ID</Title>
                    <Content>1c182977-5663-428d-92a3-3d2bdf3fffb6</Content>
                  </StackItem>
                  <StackItem>
                    <ExpandableSection
                      toggleText="Show additional cluster details"
                      isExpanded={clusterDetailsExpanded}
                      onToggle={() => setClusterDetailsExpanded(!clusterDetailsExpanded)}
                    >
                      <Content>Additional cluster details would go here</Content>
                    </ExpandableSection>
                  </StackItem>
                </Stack>
              </GridItem>
              <GridItem span={6}>
                <Stack hasGutter>
                  <StackItem>
                    <Flex justifyContent={{ default: 'justifyContentFlexEnd' }}>
                      <ActionGroup>
                        <Button variant="secondary" isDisabled>
                          Upgrade preflight
                        </Button>
                        <Button variant="secondary" isDisabled>
                          Auto-upgrade with AI
                        </Button>
                      </ActionGroup>
                    </Flex>
                  </StackItem>
                  <StackItem>
                    <Title headingLevel="h3" size="md">Current version</Title>
                    <Content>fast-5.00.01</Content>
                  </StackItem>
                </Stack>
              </GridItem>
            </Grid>
          </StackItem>

          {/* Select an Upgrade Version */}
          <StackItem>
            <Title headingLevel="h3" size="md">Select an upgrade version</Title>
            <Grid hasGutter>
              <GridItem span={6}>
                <Radio
                  id="next-release-overview"
                  name="upgrade-option-overview"
                  label="Next release in your current stable channel"
                  isChecked={upgradeOption === 'next-release'}
                  onChange={() => setUpgradeOption('next-release')}
                />
                <div style={{ marginLeft: '24px', marginTop: '8px' }}>
                  <Select
                    toggle={(toggleRef) => (
                      <Button
                        ref={toggleRef}
                        variant="secondary"
                        onClick={() => setNextReleaseDropdownOpen(!nextReleaseDropdownOpen)}
                      >
                        {nextReleaseVersion}
                      </Button>
                    )}
                    isOpen={nextReleaseDropdownOpen}
                    onOpenChange={(isOpen: boolean) => setNextReleaseDropdownOpen(isOpen)}
                    selected={nextReleaseVersion}
                    onSelect={(_, value) => {
                      setNextReleaseVersion(value as string);
                      setNextReleaseDropdownOpen(false);
                    }}
                  >
                    <SelectOption value="fast-4.20.01">
                      <CheckCircleIcon style={{ color: 'var(--pf-t--global--success-color--100)', marginRight: '8px' }} />
                      fast-4.20.01
                    </SelectOption>
                  </Select>
                </div>
              </GridItem>
              <GridItem span={6}>
                <Radio
                  id="latest-release-overview"
                  name="upgrade-option-overview"
                  label="Latest supported release"
                  isChecked={upgradeOption === 'latest-release'}
                  onChange={() => setUpgradeOption('latest-release')}
                />
                <div style={{ marginLeft: '24px', marginTop: '8px' }}>
                  <Select
                    toggle={(toggleRef) => (
                      <Button
                        ref={toggleRef}
                        variant="secondary"
                        onClick={() => setLatestReleaseDropdownOpen(!latestReleaseDropdownOpen)}
                      >
                        {latestReleaseVersion}
                      </Button>
                    )}
                    isOpen={latestReleaseDropdownOpen}
                    onOpenChange={(isOpen: boolean) => setLatestReleaseDropdownOpen(isOpen)}
                    selected={latestReleaseVersion}
                    onSelect={(_, value) => {
                      setLatestReleaseVersion(value as string);
                      setLatestReleaseDropdownOpen(false);
                    }}
                  >
                    <SelectOption value="fast-4.20.01">
                      <CheckCircleIcon style={{ color: 'var(--pf-t--global--success-color--100)', marginRight: '8px' }} />
                      fast-4.20.01
                    </SelectOption>
                  </Select>
                </div>
              </GridItem>
            </Grid>
            <ExpandableSection
              toggleText="Show additional release channels"
              isExpanded={releaseChannelsExpanded}
              onToggle={() => setReleaseChannelsExpanded(!releaseChannelsExpanded)}
            >
              <Content>Additional release channels would go here</Content>
            </ExpandableSection>
          </StackItem>

          {/* Operators on this Cluster Status */}
          <StackItem>
            <Stack hasGutter>
              <StackItem>
                <Flex alignItems={{ default: 'alignItemsCenter' }}>
                  <FlexItem>
                    <Icon status="success">
                      <CheckCircleIcon />
                    </Icon>
                  </FlexItem>
                  <FlexItem>
                    <Title headingLevel="h3" size="md">Operators on this cluster status</Title>
                  </FlexItem>
                </Flex>
              </StackItem>
              <StackItem>
                <Card>
                  <CardBody>
                    <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }} alignItems={{ default: 'alignItemsCenter' }}>
                      <FlexItem>
                        <Content>4 operators installed are up-to-date</Content>
                      </FlexItem>
                      <FlexItem>
                        <Button variant="link" isInline>
                          See all operators
                        </Button>
                      </FlexItem>
                    </Flex>
                  </CardBody>
                </Card>
              </StackItem>
            </Stack>
          </StackItem>

          {/* Worker Node Pool Status */}
          <StackItem>
            <Stack hasGutter>
              <StackItem>
                <Flex alignItems={{ default: 'alignItemsCenter' }}>
                  <FlexItem>
                    <Icon status="success">
                      <CheckCircleIcon />
                    </Icon>
                  </FlexItem>
                  <FlexItem>
                    <Title headingLevel="h3" size="md">Worker node pool status</Title>
                  </FlexItem>
                </Flex>
              </StackItem>
              <StackItem>
                <Content>
                  Worker Node Pools show whether they can upgrade safely and without downtime. If a pool is paused, behind on
                  versions, or too full to drain, the upgrade may fail.
                </Content>
              </StackItem>
              <StackItem>
                <Card>
                  <CardBody>
                    <Content>All worker nodes are up-to-date</Content>
                  </CardBody>
                </Card>
              </StackItem>
            </Stack>
          </StackItem>
        </Stack>
      </PageSection>
        </>
      </DrawerContent>
    </Drawer>
  );
};

export { UpdateOverview };

