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
  Progress,
  ProgressMeasureLocation,
  Button,
  ActionGroup,
  Flex,
  FlexItem,
  ExpandableSection,
  Spinner,
  Grid,
  GridItem,
  Icon,
} from '@patternfly/react-core';
import { Table, Thead, Tbody, Tr, Th, Td } from '@patternfly/react-table';
import { ExclamationTriangleIcon, CheckCircleIcon, ClockIcon, PlayIcon, PauseIcon, StopIcon, FileAltIcon } from '@patternfly/react-icons';

const UpgradeProgress: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [updateDetailsExpanded, setUpdateDetailsExpanded] = React.useState(true);
  const [blockersExpanded, setBlockersExpanded] = React.useState(false);
  const [operatorsExpanded, setOperatorsExpanded] = React.useState(false);
  const [nodesExpanded, setNodesExpanded] = React.useState(false);

  const blockerColumns = ['Issue', 'Actions'];
  const allBlockerRows = [
    {
      issue: 'Node worker-south cannot drain PodDisruptionBudget',
      actions: (
        <ActionGroup>
          <Button variant="link" isInline>
            View logs
          </Button>
          <Button variant="link" isInline>
            Remediate
          </Button>
        </ActionGroup>
      ),
    },
    {
      issue: 'Operator Another op 4 is degraded',
      actions: (
        <ActionGroup>
          <Button variant="link" isInline>
            View logs
          </Button>
          <Button variant="link" isInline>
            Remediate
          </Button>
        </ActionGroup>
      ),
    },
    {
      issue: 'Required image cannot be pulled',
      actions: (
        <ActionGroup>
          <Button variant="link" isInline>
            View logs
          </Button>
          <Button variant="link" isInline>
            Remediate
          </Button>
        </ActionGroup>
      ),
    },
    {
      issue: 'Additional blocker 1',
      actions: (
        <ActionGroup>
          <Button variant="link" isInline>
            View logs
          </Button>
          <Button variant="link" isInline>
            Remediate
          </Button>
        </ActionGroup>
      ),
    },
  ];
  const blockerRows = blockersExpanded ? allBlockerRows : allBlockerRows.slice(0, 1);

  const operatorColumns = ['Operator', 'Status'];
  const allOperatorRows = [
    { operator: 'Another op 1', status: 'Progressing', statusIcon: <Spinner size="sm" /> },
    { operator: 'Another op 2', status: 'Available', statusIcon: <Icon status="success"><CheckCircleIcon /></Icon> },
    { operator: 'Another op 3', status: 'Progressing', statusIcon: <Spinner size="sm" /> },
    { operator: 'Another op 4', status: 'Available', statusIcon: <Icon status="success"><CheckCircleIcon /></Icon> },
  ];
  const operatorRows = operatorsExpanded ? allOperatorRows : allOperatorRows.slice(0, 2);

  const workerNodeColumns = ['Worker Node', 'Upgrade Stage'];
  const allWorkerNodeRows = [
    { node: 'worker-west', stage: 'Rebooting', stageIcon: <Spinner size="sm" /> },
    { node: 'worker-east', stage: 'Pending (Not Started)', stageIcon: <Icon><ClockIcon /></Icon> },
    { node: 'worker-north', stage: 'Rebooting', stageIcon: <Spinner size="sm" /> },
    { node: 'worker-south', stage: 'Pending (Not Started)', stageIcon: <Icon><ClockIcon /></Icon> },
  ];
  const workerNodeRows = nodesExpanded ? allWorkerNodeRows : allWorkerNodeRows.slice(0, 2);

  return (
    <>
      <PageSection hasBodyWrapper={false}>
        <Breadcrumb>
          <BreadcrumbItem to="#" onClick={() => navigate('/administration/updates')}>
            Update overview
          </BreadcrumbItem>
          <BreadcrumbItem isActive>Cluster Updates</BreadcrumbItem>
        </Breadcrumb>
        <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }} alignItems={{ default: 'alignItemsCenter' }} style={{ marginTop: 'var(--pf-t--global--spacer--md)' }}>
          <FlexItem>
            <Title headingLevel="h1" size="lg">
              Cluster Updates
            </Title>
          </FlexItem>
          <FlexItem>
            <ActionGroup>
              <Button variant="primary" icon={<PlayIcon />} onClick={() => navigate('/administration/updates/update-overview')}>
                Next
              </Button>
              <Button variant="secondary" icon={<PauseIcon />}>
                Pause upgrade
              </Button>
              <Button variant="secondary" icon={<StopIcon />}>
                Abort upgrade
              </Button>
              <Button variant="secondary" icon={<FileAltIcon />}>
                View logs
              </Button>
            </ActionGroup>
          </FlexItem>
        </Flex>
      </PageSection>

      <PageSection hasBodyWrapper={false}>
        <Stack hasGutter>
          {/* Upgrade Progress Section */}
          <StackItem>
            <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }} alignItems={{ default: 'alignItemsCenter' }}>
              <FlexItem>
                <Flex alignItems={{ default: 'alignItemsCenter' }}>
                  <FlexItem>
                    <Spinner size="md" />
                  </FlexItem>
                  <FlexItem>
                    <Title headingLevel="h2" size="md">Upgrade to 5.00.01 Progress</Title>
                  </FlexItem>
                </Flex>
              </FlexItem>
              <FlexItem>
                <Button
                  variant="link"
                  onClick={() => setUpdateDetailsExpanded(!updateDetailsExpanded)}
                  isInline
                >
                  {updateDetailsExpanded ? 'Collapse update details' : 'Expand update details'} {updateDetailsExpanded ? '▼' : '▶'}
                </Button>
              </FlexItem>
            </Flex>
            <Content style={{ marginTop: 'var(--pf-t--global--spacer--sm)' }}>
              Estimated time remaining: 84 min
            </Content>

            {updateDetailsExpanded && (
              <Grid hasGutter style={{ marginTop: 'var(--pf-t--global--spacer--md)' }}>
                <GridItem span={4}>
                  <Progress
                    value={100}
                    title="Control Plane"
                    measureLocation={ProgressMeasureLocation.inside}
                    label="Complete"
                    aria-label="Control Plane progress"
                  />
                </GridItem>
                <GridItem span={4}>
                  <Progress
                    value={56}
                    title="Core Operators"
                    measureLocation={ProgressMeasureLocation.inside}
                    aria-label="Core Operators progress"
                  />
                </GridItem>
                <GridItem span={4}>
                  <Progress
                    value={0}
                    title="Workers"
                    measureLocation={ProgressMeasureLocation.inside}
                    aria-label="Workers progress"
                    className="pf-v6-c-progress--zero-percent"
                  />
                </GridItem>
              </Grid>
            )}
          </StackItem>

          {/* Cluster Information */}
          <StackItem>
            <Grid hasGutter>
              <GridItem span={6}>
                <Content>
                  <strong>Cluster:</strong> 1c182977-5663-428d-92a3-3d2bdf3fffb6
                </Content>
              </GridItem>
              <GridItem span={6}>
                <Content>
                  <strong>Start time:</strong> 2025-11-14 21:32:00
                </Content>
              </GridItem>
            </Grid>
          </StackItem>

          {/* Current Blockers Section */}
          <StackItem>
            <Title headingLevel="h3" size="md">Current Blockers</Title>
            <Table style={{ marginTop: 'var(--pf-t--global--spacer--md)' }}>
              <Thead>
                <Tr>
                  {blockerColumns.map((column) => (
                    <Th key={column}>{column}</Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {blockerRows.map((row, index) => (
                  <Tr key={index}>
                    <Td>
                      <Flex>
                        <FlexItem>
                          <ExclamationTriangleIcon style={{ color: 'var(--pf-t--global--warning-color--100)' }} />
                        </FlexItem>
                        <FlexItem>{row.issue}</FlexItem>
                      </Flex>
                    </Td>
                    <Td>{row.actions}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <div style={{ marginTop: 'var(--pf-t--global--spacer--md)' }}>
              <ExpandableSection
                toggleText="Show all blockers"
                isExpanded={blockersExpanded}
                onToggle={() => setBlockersExpanded(!blockersExpanded)}
              />
            </div>
          </StackItem>

          {/* Operator Upgrade Details */}
          <StackItem>
            <Title headingLevel="h3" size="md">Operator upgrade details</Title>
            <Table style={{ marginTop: 'var(--pf-t--global--spacer--md)' }}>
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
                    <Td>{row.operator}</Td>
                    <Td>
                      <Flex alignItems={{ default: 'alignItemsCenter' }}>
                        <FlexItem>{row.statusIcon}</FlexItem>
                        <FlexItem>{row.status}</FlexItem>
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <div style={{ marginTop: 'var(--pf-t--global--spacer--md)' }}>
              <ExpandableSection
                toggleText="Show additional operators"
                isExpanded={operatorsExpanded}
                onToggle={() => setOperatorsExpanded(!operatorsExpanded)}
              />
            </div>
          </StackItem>

          {/* Worker Nodes Upgrade Details */}
          <StackItem>
            <Title headingLevel="h3" size="md">Worker nodes upgrade details</Title>
            <Table style={{ marginTop: 'var(--pf-t--global--spacer--md)' }}>
              <Thead>
                <Tr>
                  {workerNodeColumns.map((column) => (
                    <Th key={column}>{column}</Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {workerNodeRows.map((row, index) => (
                  <Tr key={index}>
                    <Td>{row.node}</Td>
                    <Td>
                      <Flex alignItems={{ default: 'alignItemsCenter' }}>
                        <FlexItem>{row.stageIcon}</FlexItem>
                        <FlexItem>{row.stage}</FlexItem>
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <div style={{ marginTop: 'var(--pf-t--global--spacer--md)' }}>
              <ExpandableSection
                toggleText="Show additional nodes"
                isExpanded={nodesExpanded}
                onToggle={() => setNodesExpanded(!nodesExpanded)}
              />
            </div>
          </StackItem>

        </Stack>
      </PageSection>
    </>
  );
};

export { UpgradeProgress };

